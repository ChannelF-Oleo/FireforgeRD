import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";

interface QuizConfirmationProps {
  clientName: string;
  recommendation: string;
  recommendationDescription: string;
  benefits: string[];
  suggestedPlans: string[];
}

export function QuizConfirmation({
  clientName,
  recommendation,
  recommendationDescription,
  benefits,
  suggestedPlans,
}: QuizConfirmationProps) {
  return (
    <Html>
      <Head />
      <Preview>Tu diagnóstico tecnológico está listo - FireforgeRD</Preview>
      <Body style={main}>
        <Container style={container}>
          <div style={logoSection}>
            <Text style={logo}>🔥 FireforgeRD</Text>
          </div>

          <Heading style={h1}>¡Hola {clientName}!</Heading>

          <Text style={text}>
            Gracias por completar nuestro diagnóstico tecnológico. Basándonos en
            tus respuestas, hemos identificado la mejor solución para tu
            negocio.
          </Text>

          <Section style={recommendationBox}>
            <Text style={recommendationLabel}>Tu Recomendación</Text>
            <Heading style={recommendationTitle}>{recommendation}</Heading>
            <Text style={recommendationDesc}>{recommendationDescription}</Text>
          </Section>

          <Section style={section}>
            <Heading style={h3}>Lo que obtendrás:</Heading>
            {benefits.map((benefit, i) => (
              <Text key={i} style={benefitItem}>
                ✓ {benefit}
              </Text>
            ))}
          </Section>

          <Section style={section}>
            <Heading style={h3}>Planes recomendados para ti:</Heading>
            <div style={plansContainer}>
              {suggestedPlans.map((plan, i) => (
                <span key={i} style={planBadge}>
                  {plan}
                </span>
              ))}
            </div>
          </Section>

          <Section style={ctaSection}>
            <Text style={ctaText}>
              ¿Listo para dar el siguiente paso? Agenda una llamada gratuita con
              nuestro equipo para discutir tu proyecto.
            </Text>
            <Button style={ctaButton} href="https://fireforgerd.com/contacto">
              Solicitar Cotización
            </Button>
          </Section>

          <Hr style={hr} />

          <Text style={footer}>
            FireforgeRD - Ingeniería Digital
            <br />
            Santo Domingo, República Dominicana
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

const logoSection = {
  textAlign: "center" as const,
  marginBottom: "30px",
};

const logo = {
  fontSize: "24px",
  fontWeight: "700",
  color: "#1A1818",
  margin: "0",
};

const h1 = {
  color: "#1A1818",
  fontSize: "28px",
  fontWeight: "600",
  margin: "0 0 20px",
  textAlign: "center" as const,
};

const h3 = {
  color: "#1A1818",
  fontSize: "16px",
  fontWeight: "600",
  margin: "0 0 15px",
};

const section = {
  marginBottom: "25px",
};

const text = {
  color: "#3D3A36",
  fontSize: "16px",
  lineHeight: "1.6",
  margin: "0 0 25px",
  textAlign: "center" as const,
};

const recommendationBox = {
  backgroundColor: "#FFFFFF",
  borderRadius: "16px",
  padding: "25px",
  marginBottom: "25px",
  border: "2px solid #FF4D00",
};

const recommendationLabel = {
  color: "#FF4D00",
  fontSize: "12px",
  fontWeight: "700",
  textTransform: "uppercase" as const,
  letterSpacing: "1px",
  margin: "0 0 8px",
  textAlign: "center" as const,
};

const recommendationTitle = {
  color: "#1A1818",
  fontSize: "24px",
  fontWeight: "700",
  margin: "0 0 10px",
  textAlign: "center" as const,
};

const recommendationDesc = {
  color: "#6F6B65",
  fontSize: "15px",
  lineHeight: "1.5",
  margin: "0",
  textAlign: "center" as const,
};

const benefitItem = {
  color: "#3D3A36",
  fontSize: "15px",
  margin: "0 0 10px",
  paddingLeft: "5px",
};

const plansContainer = {
  display: "flex",
  flexWrap: "wrap" as const,
  gap: "8px",
};

const planBadge = {
  backgroundColor: "#F9F8F6",
  color: "#1A1818",
  fontSize: "13px",
  fontWeight: "500",
  padding: "8px 16px",
  borderRadius: "20px",
  display: "inline-block",
  marginRight: "8px",
  marginBottom: "8px",
};

const ctaSection = {
  backgroundColor: "#1A1818",
  borderRadius: "16px",
  padding: "30px",
  textAlign: "center" as const,
  marginTop: "30px",
};

const ctaText = {
  color: "#FFFFFF",
  fontSize: "15px",
  lineHeight: "1.6",
  margin: "0 0 20px",
};

const ctaButton = {
  backgroundColor: "#FF4D00",
  borderRadius: "8px",
  color: "#FFFFFF",
  fontSize: "14px",
  fontWeight: "600",
  textDecoration: "none",
  textAlign: "center" as const,
  padding: "14px 28px",
  display: "inline-block",
};

const hr = {
  borderColor: "#E5E5E5",
  margin: "30px 0",
};

const footer = {
  color: "#9C9890",
  fontSize: "13px",
  textAlign: "center" as const,
  lineHeight: "1.6",
};

export default QuizConfirmation;
