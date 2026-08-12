# syntax=docker/dockerfile:1.7

# ──────────────────────────────────────────────────────────────────────────────
# Imagen de build/verificación para FireforgeRD.
#
# El build de Next.js necesita las credenciales de Firebase Admin: las rutas que
# leen Firestore (/, /clientes, /blog) resuelven sus datos durante el "collect
# page data", y src/lib/firebase-admin.ts lanza si faltan las variables.
#
# Se inyectan con un secret de BuildKit para que NO queden en el historial de
# capas de la imagen:
#
#   docker build --secret id=dotenv,src=.env.local -t fireforge:build .
#
# Para levantarlo después (las vars van en runtime, no en la imagen):
#
#   docker run --rm -p 3000:3000 --env-file .env.local fireforge:build
# ──────────────────────────────────────────────────────────────────────────────

FROM node:22-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci


FROM node:22-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# .env.local se monta solo durante este RUN; no persiste en la capa resultante.
RUN --mount=type=secret,id=dotenv,dst=/app/.env.local \
    npm run build


FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs \
 && adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/next.config.ts ./next.config.ts

USER nextjs
EXPOSE 3000
ENV PORT=3000
CMD ["npm", "run", "start"]
