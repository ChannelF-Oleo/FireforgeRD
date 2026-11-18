"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { motion, AnimatePresence, MotionConfig } from "framer-motion";
import {
  ArrowRight,
  ArrowLeft,
  Check,
  Loader2,
  RotateCcw,
  Globe,
  ShoppingCart,
  MapPin,
  Settings,
  type LucideIcon,
} from "lucide-react";
import { quizQuestions, solutionDescriptions } from "@/lib/quiz-questions";
import { submitQuizResults } from "@/app/actions";
import Link from "next/link";
import { SectionHeader } from "@/components/ds/SectionHeader";
import { container, ctaAccent, ctaSecondary, focusRing, heading } from "@/components/ds/ui";

type SolutionKey = keyof typeof solutionDescriptions;

const solutionIcons: Record<SolutionKey, LucideIcon> = {
  landing: Globe,
  ecommerce: ShoppingCart,
  sistema: Settings,
  presencia: MapPin,
};

// Estilos locales del quiz (Swiss: radio 0, bordes de 1px, sin sombras).
const eyebrowText = "text-xs font-semibold uppercase tracking-wider text-(--ds-primary-text)";
const fieldError = "mt-2 text-sm font-medium text-(--ds-destructive)";
const inputBase = `min-h-11 w-full border bg-(--ds-card) px-4 py-3 text-base text-(--ds-fg) placeholder:text-(--ds-muted-fg) ${focusRing}`;
const disabledBtn =
  "disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-(--ds-fg)";

const EMAIL_RE = /^\S+@\S+\.\S+$/;

export function DiagnosticoQuiz() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({});
  const [isCalculating, setIsCalculating] = useState(false);
  const [showEmailCapture, setShowEmailCapture] = useState(false);
  const [clientName, setClientName] = useState("");
  const [email, setEmail] = useState("");
  const [results, setResults] = useState<{
    primary: SolutionKey;
    scores: Record<SolutionKey, number>;
  } | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  // Validación en línea: solo se muestra tras intentar avanzar o enviar.
  const [showStepError, setShowStepError] = useState(false);
  const [triedSubmit, setTriedSubmit] = useState(false);

  const questionHeadingRef = useRef<HTMLHeadingElement>(null);
  const hasNavigated = useRef(false);

  const currentQuestion = quizQuestions[currentStep];
  const progress = ((currentStep + 1) / quizQuestions.length) * 100;
  const isLastQuestion = currentStep === quizQuestions.length - 1;

  const screen = results ? "results" : showEmailCapture ? "email" : isCalculating ? "calculating" : "quiz";

  // Al cambiar de pantalla, volver arriba para que se vea el inicio.
  useEffect(() => {
    if (!hasNavigated.current) return;
    window.scrollTo({ top: 0 });
  }, [screen]);

  // Al cambiar de pregunta, llevar el foco al enunciado (lectores de pantalla y teclado).
  useEffect(() => {
    if (!hasNavigated.current) return;
    questionHeadingRef.current?.focus({ preventScroll: true });
  }, [currentStep]);

  const handleSingleAnswer = (value: string) => {
    setShowStepError(false);
    setAnswers((prev) => ({ ...prev, [currentQuestion.id]: value }));
  };

  const handleMultipleAnswer = (value: string) => {
    setShowStepError(false);
    const current = (answers[currentQuestion.id] as string[]) || [];
    const updated = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value];
    setAnswers((prev) => ({ ...prev, [currentQuestion.id]: updated }));
  };

  const canProceed = () => {
    const answer = answers[currentQuestion.id];
    if (!currentQuestion.required) return true;
    if (Array.isArray(answer)) return answer.length > 0;
    return !!answer;
  };

  const calculateResults = () => {
    const scores: Record<SolutionKey, number> = {
      landing: 0,
      ecommerce: 0,
      sistema: 0,
      presencia: 0,
    };

    // Calcular puntajes basados en respuestas
    Object.entries(answers).forEach(([questionId, answer]) => {
      const question = quizQuestions.find((q) => q.id === questionId);
      if (!question?.options) return;

      const answerArray = Array.isArray(answer) ? answer : [answer];

      answerArray.forEach((ans) => {
        const option = question.options?.find((o) => o.value === ans);
        if (option?.weight) {
          Object.entries(option.weight).forEach(([key, value]) => {
            if (key in scores) {
              scores[key as SolutionKey] += value;
            }
          });
        }
      });
    });

    // Encontrar la solución principal
    const primary = (Object.entries(scores) as [SolutionKey, number][]).sort(
      (a, b) => b[1] - a[1],
    )[0][0];

    return { primary, scores };
  };

  const handleNext = async () => {
    if (!canProceed()) {
      setShowStepError(true);
      return;
    }
    hasNavigated.current = true;
    setShowStepError(false);
    if (isLastQuestion) {
      // Mostrar captura de email antes de resultados
      setShowEmailCapture(true);
    } else {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleSubmitWithEmail = async () => {
    if (!clientName.trim() || !email.trim()) return;

    setIsCalculating(true);
    setSubmitError(null);
    const calculatedResults = calculateResults();

    // Guardar en Firebase y enviar emails
    const primarySolution = solutionDescriptions[calculatedResults.primary];

    try {
      const result = await submitQuizResults({
        clientName,
        email,
        answers,
        recommendation: primarySolution.name,
        recommendationDescription: primarySolution.description,
        benefits: primarySolution.benefits,
        suggestedPlans: primarySolution.plans,
        scores: calculatedResults.scores,
      });

      if (!result.success) {
        console.error("Error del servidor:", result.message);
        setSubmitError(result.message);
        // Aún mostramos resultados aunque falle el guardado
      }
    } catch (error) {
      console.error("Error guardando quiz:", error);
      setSubmitError(
        "Error de conexión. Tus resultados se mostrarán pero no se guardaron.",
      );
    }

    setResults(calculatedResults);
    setShowEmailCapture(false);
    setIsCalculating(false);
  };

  const nameError = !clientName.trim() ? "Escribe tu nombre." : null;
  const emailError = !email.trim()
    ? "Escribe tu email."
    : !EMAIL_RE.test(email.trim())
      ? "Revisa el email: debe tener el formato tu@email.com."
      : null;

  const onEmailSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setTriedSubmit(true);
    if (nameError || emailError) {
      const firstInvalid = nameError ? "quiz-name" : "quiz-email";
      document.getElementById(firstInvalid)?.focus();
      return;
    }
    hasNavigated.current = true;
    void handleSubmitWithEmail();
  };

  const handleBack = () => {
    if (currentStep > 0) {
      hasNavigated.current = true;
      setShowStepError(false);
      setCurrentStep((prev) => prev - 1);
    }
  };

  const resetQuiz = () => {
    hasNavigated.current = true;
    setCurrentStep(0);
    setAnswers({});
    setResults(null);
  };

  let content: React.ReactNode;

  // Pantalla de resultados
  if (results) {
    const primarySolution = solutionDescriptions[results.primary];
    const PrimaryIcon = solutionIcons[results.primary];
    const sortedSolutions = (
      Object.entries(results.scores) as [SolutionKey, number][]
    )
      .sort((a, b) => b[1] - a[1])
      .filter(([, score]) => score > 0);
    const maxScore = Math.max(...Object.values(results.scores));

    content = (
      <motion.div
        key="results"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
      >
        <SectionHeader
          as="h1"
          id="diagnostico-title"
          eyebrow="Tu resultado"
          title="Tu diagnóstico personalizado"
          intro="Según tus respuestas, esta es la solución que más le conviene a tu negocio."
        />

        <div className="mt-12 grid gap-6 md:grid-cols-12">
          <div className="md:col-span-9 md:col-start-4">
            {submitError && (
              <p role="alert" className="mb-6 border border-(--ds-destructive) bg-(--ds-card) p-4 text-sm text-(--ds-fg)">
                <span className="font-semibold text-(--ds-destructive)">No pudimos guardar tu diagnóstico.</span>{" "}
                {submitError}
              </p>
            )}

            {/* Recomendación principal */}
            <article
              aria-labelledby="recomendacion-title"
              className="border-2 border-(--ds-primary) bg-(--ds-card) p-6 sm:p-8"
            >
              <p className="inline-flex items-center gap-1 bg-(--ds-accent) px-2 py-1 text-xs font-semibold uppercase tracking-wider text-(--ds-on-accent)">
                Recomendación principal
              </p>
              <div className="mt-4 flex items-start gap-4">
                <span className="flex size-12 shrink-0 items-center justify-center border border-(--ds-primary) text-(--ds-primary)">
                  <PrimaryIcon className="size-6" aria-hidden />
                </span>
                <div className="min-w-0">
                  <h2 id="recomendacion-title" className={`${heading} text-2xl font-semibold tracking-tight text-balance`}>
                    {primarySolution.name}
                  </h2>
                  <p className="mt-2 leading-relaxed text-(--ds-muted-fg)">{primarySolution.description}</p>
                </div>
              </div>

              <ul className="mt-6 grid gap-3 border-t border-(--ds-border) pt-6 text-sm sm:grid-cols-2">
                {primarySolution.benefits.map((benefit) => (
                  <li key={benefit} className="flex gap-2">
                    <Check className="mt-0.5 size-4 shrink-0 text-(--ds-primary)" aria-hidden />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-6 border-t border-(--ds-border) pt-6">
                <h3 className="text-sm font-medium text-(--ds-muted-fg)">Planes sugeridos</h3>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {primarySolution.plans.map((plan) => (
                    <li key={plan} className="border border-(--ds-border) bg-(--ds-muted) px-3 py-1 text-sm font-medium">
                      {plan}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link href="/contacto" className={ctaAccent}>
                  Solicitar cotización
                  <ArrowRight className="size-4" aria-hidden />
                </Link>
                <button type="button" onClick={resetQuiz} className={ctaSecondary}>
                  <RotateCcw className="size-4" aria-hidden />
                  Repetir diagnóstico
                </button>
              </div>
            </article>

            {/* Otras opciones */}
            {sortedSolutions.length > 1 && (
              <section aria-labelledby="alternativas-title" className="mt-12">
                <h2 id="alternativas-title" className={`${heading} text-xl font-semibold`}>
                  También podrías considerar
                </h2>
                <ul className="mt-4 border-t border-(--ds-fg)">
                  {sortedSolutions.slice(1, 3).map(([key, score]) => {
                    const solution = solutionDescriptions[key];
                    const Icon = solutionIcons[key];
                    const percentage = Math.round((score / maxScore) * 100);

                    return (
                      <li key={key} className="flex items-center gap-4 border-b border-(--ds-border) py-4">
                        <Icon className="size-5 shrink-0 text-(--ds-primary)" aria-hidden />
                        <div className="min-w-0 flex-1">
                          <div className="flex items-baseline justify-between gap-4">
                            <h3 className="font-medium">{solution.name}</h3>
                            <span className="text-sm tabular-nums text-(--ds-muted-fg)">
                              {percentage}%<span className="sr-only"> de afinidad</span>
                            </span>
                          </div>
                          <div className="mt-2 h-1 bg-(--ds-muted)" aria-hidden>
                            <div className="h-full bg-(--ds-primary)" style={{ width: `${percentage}%` }} />
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </section>
            )}
          </div>
        </div>
      </motion.div>
    );
  } else if (showEmailCapture) {
    // Pantalla de captura de email
    const showNameError = triedSubmit && !!nameError;
    const showEmailError = triedSubmit && !!emailError;

    content = (
      <motion.div
        key="email"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
      >
        <SectionHeader
          as="h1"
          id="diagnostico-title"
          eyebrow="Último paso"
          title="¡Ya casi terminamos!"
          intro="Déjanos tus datos y te enviamos el diagnóstico personalizado por email."
        />

        <div className="mt-12 grid md:grid-cols-12">
          <form
            noValidate
            onSubmit={onEmailSubmit}
            aria-labelledby="diagnostico-title"
            className="border border-(--ds-border) bg-(--ds-card) p-6 sm:p-8 md:col-span-7 md:col-start-4"
          >
            <div>
              <label htmlFor="quiz-name" className="block text-sm font-medium">
                Tu nombre
              </label>
              <input
                id="quiz-name"
                type="text"
                autoComplete="name"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                placeholder="Ej: Juan Pérez"
                aria-invalid={showNameError || undefined}
                aria-describedby={showNameError ? "quiz-name-error" : undefined}
                className={`mt-2 ${inputBase} ${showNameError ? "border-(--ds-destructive)" : "border-(--ds-border)"}`}
              />
              {showNameError && (
                <p id="quiz-name-error" className={fieldError}>
                  {nameError}
                </p>
              )}
            </div>

            <div className="mt-6">
              <label htmlFor="quiz-email" className="block text-sm font-medium">
                Tu email
              </label>
              <input
                id="quiz-email"
                type="email"
                inputMode="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@email.com"
                aria-invalid={showEmailError || undefined}
                aria-describedby={showEmailError ? "quiz-email-error" : undefined}
                className={`mt-2 ${inputBase} ${showEmailError ? "border-(--ds-destructive)" : "border-(--ds-border)"}`}
              />
              {showEmailError && (
                <p id="quiz-email-error" className={fieldError}>
                  {emailError}
                </p>
              )}
            </div>

            <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
              <button
                type="button"
                onClick={() => setShowEmailCapture(false)}
                disabled={isCalculating}
                className={`${ctaSecondary} ${disabledBtn}`}
              >
                <ArrowLeft className="size-4" aria-hidden />
                Volver a las preguntas
              </button>
              <button
                type="submit"
                disabled={isCalculating}
                aria-busy={isCalculating || undefined}
                className={`${ctaAccent} disabled:cursor-wait disabled:opacity-70`}
              >
                {isCalculating ? (
                  <>
                    <Loader2 className="size-4 animate-spin motion-reduce:animate-none" aria-hidden />
                    Analizando tus respuestas...
                  </>
                ) : (
                  <>
                    Ver mi diagnóstico
                    <ArrowRight className="size-4" aria-hidden />
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </motion.div>
    );
  } else if (isCalculating) {
    // Pantalla de cálculo
    content = (
      <div key="calculating" role="status" className="flex min-h-[50vh] flex-col items-center justify-center gap-4 text-center">
        <Loader2 className="size-10 animate-spin text-(--ds-primary) motion-reduce:animate-none" aria-hidden />
        <p className="text-(--ds-muted-fg)">Analizando tus respuestas...</p>
      </div>
    );
  } else {
    // Quiz principal
    const isMultiple = currentQuestion.type === "multiple";
    const errorId = `${currentQuestion.id}-error`;
    const hintId = `${currentQuestion.id}-hint`;
    const questionId = `${currentQuestion.id}-question`;
    const describedBy = [isMultiple ? hintId : null, showStepError ? errorId : null].filter(Boolean).join(" ") || undefined;

    content = (
      <div key="quiz">
        <SectionHeader
          as="h1"
          id="diagnostico-title"
          eyebrow="Diagnóstico gratuito"
          title="Descubre qué necesita tu negocio"
          intro="Responde unas preguntas rápidas y te recomendamos la solución que mejor le queda."
        />

        <div className="mt-12 grid md:grid-cols-12">
          <div className="md:col-span-9 md:col-start-4">
            {/* Progreso */}
            <div>
              <div className="flex items-baseline justify-between gap-4 text-sm">
                <p aria-live="polite" className="font-medium">
                  Pregunta {currentStep + 1} de {quizQuestions.length}
                </p>
                <p className="tabular-nums text-(--ds-muted-fg)" aria-hidden>
                  {Math.round(progress)}%
                </p>
              </div>
              <div
                role="progressbar"
                aria-label="Progreso del diagnóstico"
                aria-valuemin={1}
                aria-valuemax={quizQuestions.length}
                aria-valuenow={currentStep + 1}
                aria-valuetext={`Pregunta ${currentStep + 1} de ${quizQuestions.length}`}
                className="mt-2 h-1 bg-(--ds-border)"
              >
                <div
                  className="h-full bg-(--ds-primary) transition-[width] duration-300 ease-out motion-reduce:transition-none"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            {/* Pregunta */}
            <AnimatePresence mode="wait" initial={false}>
              <motion.fieldset
                key={currentStep}
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -12 }}
                transition={{ duration: 0.15 }}
                aria-labelledby={questionId}
                aria-describedby={describedBy}
                className="mt-8 border border-(--ds-border) bg-(--ds-card) p-6 sm:p-8"
              >
                <p className={eyebrowText}>{currentQuestion.category}</p>
                <h2
                  id={questionId}
                  ref={questionHeadingRef}
                  tabIndex={-1}
                  className={`${heading} mt-2 text-xl font-semibold tracking-tight text-balance focus:outline-none sm:text-2xl`}
                >
                  {currentQuestion.question}
                </h2>
                {isMultiple && (
                  <p id={hintId} className="mt-2 text-sm text-(--ds-muted-fg)">
                    Puedes elegir varias opciones.
                  </p>
                )}

                <ul className="mt-6 grid gap-3">
                  {currentQuestion.options?.map((option) => {
                    const isSelected = isMultiple
                      ? ((answers[currentQuestion.id] as string[]) || []).includes(option.value)
                      : answers[currentQuestion.id] === option.value;
                    const inputId = `${currentQuestion.id}-${option.value}`;

                    return (
                      <li key={option.value}>
                        <label
                          htmlFor={inputId}
                          className={`flex min-h-14 cursor-pointer items-center gap-3 p-4 transition-colors duration-150 has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-(--ds-ring) ${
                            isSelected
                              ? "border-2 border-(--ds-primary) bg-(--ds-muted) p-[15px]"
                              : "border border-(--ds-border) hover:border-(--ds-fg)"
                          }`}
                        >
                          <input
                            id={inputId}
                            type={isMultiple ? "checkbox" : "radio"}
                            name={currentQuestion.id}
                            value={option.value}
                            checked={isSelected}
                            onChange={() =>
                              isMultiple ? handleMultipleAnswer(option.value) : handleSingleAnswer(option.value)
                            }
                            className="sr-only"
                          />
                          {/* Indicador con check: el estado no depende solo del color */}
                          <span
                            aria-hidden
                            className={`flex size-5 shrink-0 items-center justify-center border ${isSelected ? "border-(--ds-primary) bg-(--ds-primary) text-(--ds-on-primary)" : "border-(--ds-muted-fg)"}`}
                          >
                            {isSelected && <Check className="size-3.5" strokeWidth={3} aria-hidden />}
                          </span>
                          <span className={isSelected ? "font-semibold" : "font-medium text-(--ds-fg)"}>
                            {option.label}
                          </span>
                        </label>
                      </li>
                    );
                  })}
                </ul>

                {showStepError && (
                  <p id={errorId} role="alert" className={fieldError}>
                    {isMultiple ? "Elige al menos una opción para continuar." : "Elige una opción para continuar."}
                  </p>
                )}
              </motion.fieldset>
            </AnimatePresence>

            {/* Navegación */}
            <div className="mt-8 flex justify-between gap-3">
              <button
                type="button"
                onClick={handleBack}
                disabled={currentStep === 0}
                className={`${ctaSecondary} ${disabledBtn}`}
              >
                <ArrowLeft className="size-4" aria-hidden />
                Anterior
              </button>

              <button type="button" onClick={handleNext} className={ctaAccent}>
                {isLastQuestion ? "Ver resultados" : "Siguiente"}
                <ArrowRight className="size-4" aria-hidden />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <MotionConfig reducedMotion="user">
      <section aria-labelledby="diagnostico-title" className="min-h-screen py-16 md:py-24">
        <div className={container}>{content}</div>
      </section>
    </MotionConfig>
  );
}
