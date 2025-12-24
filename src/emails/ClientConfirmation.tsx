import {
    Body,
    Container,
    Head,
    Heading,
    Html,
    Preview,
    Section,
    Text,
    Tailwind,
    Button,
    Hr,
    Link,
  } from "@react-email/components";
  import * as React from "react";
  
  interface ClientConfirmationProps {
    clientName: string;
    serviceType: string;
    plan?: string;
  }
  
  export const ClientConfirmation = ({
    clientName,
    serviceType,
    plan,
  }: ClientConfirmationProps) => {
    const previewText = `Hemos recibido tu solicitud para ${serviceType}`;
  
    return (
      <Html>
        <Head />
        <Preview>{previewText}</Preview>
        <Tailwind>
          <Body className="bg-[#F9F8F6] my-auto mx-auto font-sans">
            <Container className="bg-white border border-[#EAEAEA] rounded-lg my-[40px] mx-auto p-[40px] w-[465px] shadow-sm">
              {/* Header: Logo Minimalista */}
              <Section className="mt-[10px] mb-[30px]">
                <Heading className="text-[#1A1818] text-[24px] font-light text-center m-0">
                  Fireforge<span className="font-bold text-[#FF4D00]">RD</span>
                </Heading>
                <Text className="text-center text-xs text-gray-400 tracking-widest uppercase mt-2">
                  Digital Infrastructure
                </Text>
              </Section>
  
              {/* Mensaje Principal */}
              <Heading className="text-[#1A1818] text-[20px] font-medium text-center p-0 my-[20px] mx-0">
                Solicitud Recibida
              </Heading>
              
              <Text className="text-[#6F6B65] text-[15px] leading-[26px]">
                Hola <strong>{clientName}</strong>,
              </Text>
              
              <Text className="text-[#6F6B65] text-[15px] leading-[26px]">
                Hemos registrado correctamente tu interés en nuestros servicios de ingeniería. Tu solicitud ha entrado en nuestra cola de evaluación prioritaria.
              </Text>
  
              {/* Detalles de la Solicitud */}
              <Section className="bg-[#F9F8F6] p-6 rounded-lg my-6 border border-[#EAEAEA]">
                <Text className="m-0 text-xs font-bold text-[#1A1818] uppercase tracking-wider mb-1">
                  Servicio Solicitado
                </Text>
                <Text className="m-0 text-lg text-[#FF4D00] font-medium">
                  {serviceType}
                </Text>
                {plan && plan !== "N/A" && (
                  <Text className="m-0 text-sm text-[#6F6B65] mt-1">
                    Plan de interés: {plan}
                  </Text>
                )}
              </Section>
  
              {/* Próximos Pasos */}
              <Text className="text-[#6F6B65] text-[15px] leading-[26px]">
                <strong>¿Qué sigue?</strong> Un ingeniero de nuestro equipo analizará los requerimientos técnicos y te contactará vía WhatsApp o correo en las próximas 24 horas laborables.
              </Text>
  
              <Section className="text-center mt-[32px] mb-[32px]">
                <Button
                  className="bg-[#1A1818] rounded-full text-white text-[14px] font-bold no-underline text-center px-6 py-4"
                  href="https://fireforgerd.com"
                >
                  Volver al Sitio Web
                </Button>
              </Section>
  
              <Hr className="border-[#EAEAEA] my-[26px] mx-0 w-full" />
  
              {/* Footer */}
              <Text className="text-[#9C9890] text-[12px] leading-[20px] text-center">
                FireforgeRD — Santo Domingo, República Dominicana.<br />
                <Link href="https://wa.me/18094202288" className="text-[#9C9890] underline">
                  Contactar Soporte
                </Link>
              </Text>
            </Container>
          </Body>
        </Tailwind>
      </Html>
    );
  };
  
  export default ClientConfirmation;