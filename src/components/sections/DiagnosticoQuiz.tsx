"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Loader2,
  Sparkles,
  Target,
  Zap,
  Globe,
  ShoppingCart,
  Bot,
  Settings,
  Mail,
  User,
} from "lucide-react";
import { quizQuestions, solutionDescriptions } from "@/lib/quiz-questions";
import { submitQuizResults } from "@/app/actions";
import Link from "next/link";

type SolutionKey = keyof typeof solutionDescriptions;

const solutionIcons: Record<SolutionKey, React.ReactNode> = {
  landing: <Globe className="w-6 h-6" />,
  ecommerce: <ShoppingCart className="w-6 h-6" />,
  sistema: <Settings className="w-6 h-6" />,
  chatbot: <Bot className="w-6 h-6" />,
};

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

  const currentQuestion = quizQuestions[currentStep];
  const progress = ((currentStep + 1) / quizQuestions.length) * 100;
  const isLastQuestion = currentStep === quizQuestions.length - 1;

  const handleSingleAnswer = (value: string) => {
    setAnswers((prev) => ({ ...prev, [currentQuestion.id]: value }));
  };

  const handleMultipleAnswer = (value: string) => {
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
      chatbot: 0,
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

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const resetQuiz = () => {
    setCurrentStep(0);
    setAnswers({});
    setResults(null);
  };

  // Pantalla de resultados
  if (results) {
    const primarySolution = solutionDescriptions[results.primary];
    const sortedSolutions = (
      Object.entries(results.scores) as [SolutionKey, number][]
    )
      .sort((a, b) => b[1] - a[1])
      .filter(([_, score]) => score > 0);

    return (
      <section className="py-24 min-h-screen">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto"
          >
            {/* Header */}
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#FF4D00]/10 text-[#FF4D00] mb-6">
                <Sparkles className="w-8 h-8" />
              </div>
              <h1 className="font-display text-3xl md:text-4xl font-light text-[#1A1818] mb-4">
                Tu Diagnóstico{" "}
                <span className="text-[#FF4D00] font-medium">
                  Personalizado
                </span>
              </h1>
              <p className="text-[#6F6B65]">
                Basado en tus respuestas, esta es nuestra recomendación
              </p>
            </div>

            {/* Recomendación Principal */}
            <div className="bg-white rounded-3xl border-2 border-[#FF4D00]/20 p-8 mb-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#FF4D00]/5 rounded-full blur-3xl" />

              <div className="flex items-start gap-4 relative z-10">
                <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-[#FF4D00] text-white flex items-center justify-center">
                  {solutionIcons[results.primary]}
                </div>
                <div className="flex-1">
                  <span className="text-xs font-bold text-[#FF4D00] uppercase tracking-wider">
                    Recomendación Principal
                  </span>
                  <h2 className="font-display text-2xl font-medium text-[#1A1818] mt-1 mb-2">
                    {primarySolution.name}
                  </h2>
                  <p className="text-[#6F6B65] mb-4">
                    {primarySolution.description}
                  </p>

                  <div className="grid grid-cols-2 gap-2 mb-4">
                    {primarySolution.benefits.map((benefit, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-2 text-sm text-[#1A1818]"
                      >
                        <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
                        <span>{benefit}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {primarySolution.plans.map((plan) => (
                      <span
                        key={plan}
                        className="px-3 py-1 bg-[#F9F8F6] rounded-full text-xs font-medium text-[#1A1818]"
                      >
                        {plan}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Otras opciones */}
            {sortedSolutions.length > 1 && (
              <div className="mb-8">
                <h3 className="text-sm font-bold text-[#1A1818] uppercase tracking-wider mb-4">
                  También podrías considerar
                </h3>
                <div className="grid gap-3">
                  {sortedSolutions.slice(1, 3).map(([key, score]) => {
                    const solution = solutionDescriptions[key];
                    const maxScore = Math.max(...Object.values(results.scores));
                    const percentage = Math.round((score / maxScore) * 100);

                    return (
                      <div
                        key={key}
                        className="bg-white rounded-xl border border-[#1A1818]/5 p-4 flex items-center gap-4"
                      >
                        <div className="w-10 h-10 rounded-xl bg-[#F9F8F6] text-[#6F6B65] flex items-center justify-center">
                          {solutionIcons[key]}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-[#1A1818]">
                            {solution.name}
                          </h4>
                          <div className="flex items-center gap-2 mt-1">
                            <div className="flex-1 h-1.5 bg-[#F9F8F6] rounded-full overflow-hidden">
                              <div
                                className="h-full bg-[#FF4D00]/50 rounded-full"
                                style={{ width: `${percentage}%` }}
                              />
                            </div>
                            <span className="text-xs text-[#9C9890]">
                              {percentage}%
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/contacto"
                className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-[#1A1818] text-white rounded-xl font-medium hover:bg-[#FF4D00] transition-colors"
              >
                <Target className="w-5 h-5" />
                Solicitar Cotización
              </Link>
              <button
                onClick={resetQuiz}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-[#F9F8F6] text-[#1A1818] rounded-xl font-medium hover:bg-[#1A1818]/5 transition-colors"
              >
                <Zap className="w-5 h-5" />
                Repetir Diagnóstico
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    );
  }

  // Pantalla de captura de email
  if (showEmailCapture) {
    return (
      <section className="py-24 min-h-screen flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full mx-4"
        >
          <div className="bg-white rounded-3xl border border-[#1A1818]/5 p-8 shadow-lg">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-[#FF4D00]/10 text-[#FF4D00] mb-4">
                <Mail className="w-7 h-7" />
              </div>
              <h2 className="font-display text-2xl font-medium text-[#1A1818] mb-2">
                ¡Ya casi terminamos!
              </h2>
              <p className="text-[#6F6B65] text-sm">
                Ingresa tus datos para recibir tu diagnóstico personalizado por
                email
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold text-[#1A1818] uppercase tracking-wider block mb-2">
                  Tu Nombre
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9C9890]" />
                  <input
                    type="text"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder="Ej: Juan Pérez"
                    className="w-full pl-11 pr-4 py-3 rounded-xl bg-[#F9F8F6] border border-transparent focus:bg-white focus:border-[#FF4D00]/30 outline-none transition-all text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-[#1A1818] uppercase tracking-wider block mb-2">
                  Tu Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9C9890]" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="tu@email.com"
                    className="w-full pl-11 pr-4 py-3 rounded-xl bg-[#F9F8F6] border border-transparent focus:bg-white focus:border-[#FF4D00]/30 outline-none transition-all text-sm"
                  />
                </div>
              </div>
            </div>

            <button
              onClick={handleSubmitWithEmail}
              disabled={!clientName.trim() || !email.trim()}
              className="w-full mt-6 flex items-center justify-center gap-2 px-6 py-4 bg-[#1A1818] text-white rounded-xl font-medium hover:bg-[#FF4D00] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Sparkles className="w-5 h-5" />
              Ver Mi Diagnóstico
            </button>

            <button
              onClick={() => setShowEmailCapture(false)}
              className="w-full mt-3 text-sm text-[#6F6B65] hover:text-[#1A1818] transition-colors"
            >
              ← Volver a las preguntas
            </button>
          </div>
        </motion.div>
      </section>
    );
  }

  // Pantalla de cálculo
  if (isCalculating) {
    return (
      <section className="py-24 min-h-screen flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          <Loader2 className="w-12 h-12 animate-spin text-[#FF4D00] mx-auto mb-4" />
          <p className="text-[#6F6B65]">Analizando tus respuestas...</p>
        </motion.div>
      </section>
    );
  }

  // Quiz principal
  return (
    <section className="py-24 min-h-screen">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#1A1818]/5 mb-4">
              <Sparkles className="w-4 h-4 text-[#FF4D00]" />
              <span className="text-xs font-bold tracking-widest uppercase text-[#6F6B65]">
                Diagnóstico Gratuito
              </span>
            </div>
            <h1 className="font-display text-3xl md:text-4xl font-light text-[#1A1818] mb-4">
              Descubre qué{" "}
              <span className="text-[#FF4D00] font-medium">necesita</span> tu
              negocio
            </h1>
            <p className="text-[#6F6B65]">
              Responde algunas preguntas y te recomendaremos la mejor solución
            </p>
          </div>

          {/* Progress */}
          <div className="mb-8">
            <div className="flex justify-between text-sm text-[#6F6B65] mb-2">
              <span>
                Pregunta {currentStep + 1} de {quizQuestions.length}
              </span>
              <span>{Math.round(progress)}%</span>
            </div>
            <div className="h-2 bg-white rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-[#FF4D00] rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>

          {/* Question Card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-3xl border border-[#1A1818]/5 p-8 shadow-sm"
            >
              <span className="text-xs font-bold text-[#FF4D00] uppercase tracking-wider">
                {currentQuestion.category}
              </span>

              <h2 className="font-display text-xl md:text-2xl font-medium text-[#1A1818] mt-2 mb-6">
                {currentQuestion.question}
              </h2>

              {/* Options */}
              <div className="space-y-3">
                {currentQuestion.options?.map((option) => {
                  const isSelected =
                    currentQuestion.type === "multiple"
                      ? (
                          (answers[currentQuestion.id] as string[]) || []
                        ).includes(option.value)
                      : answers[currentQuestion.id] === option.value;

                  return (
                    <button
                      key={option.value}
                      onClick={() =>
                        currentQuestion.type === "multiple"
                          ? handleMultipleAnswer(option.value)
                          : handleSingleAnswer(option.value)
                      }
                      className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                        isSelected
                          ? "border-[#FF4D00] bg-[#FF4D00]/5"
                          : "border-[#1A1818]/5 hover:border-[#1A1818]/20 bg-[#F9F8F6]"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                            isSelected
                              ? "border-[#FF4D00] bg-[#FF4D00]"
                              : "border-[#9C9890]"
                          }`}
                        >
                          {isSelected && (
                            <CheckCircle2 className="w-3 h-3 text-white" />
                          )}
                        </div>
                        <span
                          className={`font-medium ${isSelected ? "text-[#1A1818]" : "text-[#6F6B65]"}`}
                        >
                          {option.label}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>

              {currentQuestion.type === "multiple" && (
                <p className="text-xs text-[#9C9890] mt-4">
                  Puedes seleccionar múltiples opciones
                </p>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex justify-between mt-8">
            <button
              onClick={handleBack}
              disabled={currentStep === 0}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${
                currentStep === 0
                  ? "text-[#9C9890] cursor-not-allowed"
                  : "text-[#1A1818] hover:bg-white"
              }`}
            >
              <ArrowLeft className="w-4 h-4" />
              Anterior
            </button>

            <button
              onClick={handleNext}
              disabled={!canProceed()}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${
                canProceed()
                  ? "bg-[#1A1818] text-white hover:bg-[#FF4D00]"
                  : "bg-[#1A1818]/20 text-[#9C9890] cursor-not-allowed"
              }`}
            >
              {isLastQuestion ? "Ver Resultados" : "Siguiente"}
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
