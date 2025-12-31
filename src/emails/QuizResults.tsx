import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";

interface QuizResultsProps {
  clientName: string;
  clientEmail: string;
  recommendation: string;
  recommendationDescription: string;
  benefits: string[];
  suggestedPlans: string[];
  scores: Record<string, number>;
}

export function QuizResults({
  clientName,
  clientEmail,
  recommendation,
  recommendationDescription,
  benefits,
  suggestedPlans,
  scores,
}: QuizResultsProps) {
  return (
    <Html>
      <Head />
      <Preview>Nuevo diagnóstico completado - {clientName}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>🔥 Nuevo Diagnóstico Completado</Heading>

          <Section style={section}>
            <Text style={label}>Cliente</Text>
            <Text style={value}>{clientName}</Text>

            <Text style={label}>Email</Text>
            <Text style={value}>{clientEmail}</Text>
          </Section>

          <Hr style={hr} />

          <Section style={section}>
            <Heading style={h2}>Recomendación Principal</Heading>
            <Text style={highlight}>{recommendation}</Text>
            <Text style={text}>{recommendationDescription}</Text>
          </Section>

          <Section style={section}>
            <Heading style={h3}>Beneficios Clave</Heading>
            {benefits.map((benefit, i) => (
              <Text key={i} style={listItem}>
                ✓ {benefit}
              </Text>
            ))}
          </Section>

          <Section style={section}>
            <Heading style={h3}>Planes Sugeridos</Heading>
            <Text style={text}>{suggestedPlans.join(" • ")}</Text>
          </Section>

          <Hr style={hr} />

          <Section style={section}>
            <Heading style={h3}>Puntajes por Categoría</Heading>
            {Object.entries(scores).map(([key, score]) => (
              <Text key={key} style={scoreItem}>
                {key}: <strong>{score} pts</strong>
              </Text>
            ))}
          </Section>

          <Hr style={hr} />

          <Text style={footer}>
            Este lead viene del diagnóstico tecnológico de fireforgerd.com
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

// Styles
const main = {
  backgroundColor: "#F9F8F6",
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
};

const container = {
  margin: "0 auto",
  padding: "40px 20px",
  maxWidth: "560px",
};

const h1 = {
  color: "#1A1818",
  fontSize: "28px",
  fontWeight: "600",
  margin: "0 0 30px",
};

const h2 = {
  color: "#1A1818",
  fontSize: "20px",
  fontWeight: "600",
  margin: "0 0 15px",
};

const h3 = {
  color: "#1A1818",
  fontSize: "16px",
  fontWeight: "600",
  margin: "0 0 10px",
};

const section = {
  marginBottom: "25px",
};

const label = {
  color: "#6F6B65",
  fontSize: "12px",
  fontWeight: "600",
  textTransform: "uppercase" as const,
  letterSpacing: "0.5px",
  margin: "0 0 4px",
};

const value = {
  color: "#1A1818",
  fontSize: "16px",
  margin: "0 0 15px",
};

const text = {
  color: "#3D3A36",
  fontSize: "15px",
  lineHeight: "1.6",
  margin: "0",
};

const highlight = {
  color: "#FF4D00",
  fontSize: "22px",
  fontWeight: "600",
  margin: "0 0 10px",
};

const listItem = {
  color: "#3D3A36",
  fontSize: "14px",
  margin: "0 0 8px",
  paddingLeft: "5px",
};

const scoreItem = {
  color: "#6F6B65",
  fontSize: "14px",
  margin: "0 0 5px",
};

const hr = {
  borderColor: "#E5E5E5",
  margin: "25px 0",
};

const footer = {
  color: "#9C9890",
  fontSize: "12px",
  textAlign: "center" as const,
  margin: "30px 0 0",
};

export default QuizResults;
