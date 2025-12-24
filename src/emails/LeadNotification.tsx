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
    Hr,
  } from "@react-email/components";
  import * as React from "react";
  
  interface LeadNotificationProps {
    clientName: string;
    companyName: string;
    serviceType: string;
    email: string;
    whatsapp: string;
    notes?: string;
  }
  
  export const LeadNotification = ({
    clientName,
    companyName,
    serviceType,
    email,
    whatsapp,
    notes,
  }: LeadNotificationProps) => {
    const previewText = `Nuevo Lead: ${companyName} interesado en ${serviceType}`;
  
    return (
      <Html>
        <Head />
        <Preview>{previewText}</Preview>
        <Tailwind>
          <Body className="bg-white my-auto mx-auto font-sans">
            <Container className="border border-solid border-[#eaeaea] rounded my-[40px] mx-auto p-[20px] w-[465px]">
              <Section className="mt-[32px]">
                <Heading className="text-black text-[24px] font-normal text-center p-0 my-[30px] mx-0">
                  🔥 <strong>FireforgeRD</strong> Lead
                </Heading>
              </Section>
              
              <Text className="text-black text-[14px] leading-[24px]">
                Hola Admin, tienes una nueva solicitud de servicio:
              </Text>
  
              <Section className="bg-gray-50 p-4 rounded-md border border-gray-100">
                <Text className="m-0 text-sm font-bold text-gray-500 uppercase">Cliente</Text>
                <Text className="m-0 text-lg font-medium text-gray-900 mb-4">
                  {clientName} <span className="text-gray-400">({companyName})</span>
                </Text>
  
                <Text className="m-0 text-sm font-bold text-gray-500 uppercase">Servicio</Text>
                <Text className="m-0 text-lg font-medium text-[#FF4D00] mb-4">
                  {serviceType}
                </Text>
  
                <Hr className="border-gray-200 my-4" />
  
                <Text className="m-0 text-sm font-bold text-gray-500 uppercase">Contacto</Text>
                <Text className="m-0 text-base text-gray-800">
                  📧 <a href={`mailto:${email}`} className="text-blue-600 underline">{email}</a>
                </Text>
                <Text className="m-0 text-base text-gray-800 mb-4">
                  📱 <a href={`https://wa.me/${whatsapp.replace(/\D/g,'')}`} className="text-blue-600 underline">{whatsapp}</a>
                </Text>
  
                {notes && (
                  <>
                    <Text className="m-0 text-sm font-bold text-gray-500 uppercase">Notas</Text>
                    <Text className="m-0 text-gray-600 italic">"{notes}"</Text>
                  </>
                )}
              </Section>
            </Container>
          </Body>
        </Tailwind>
      </Html>
    );
  };
  
  export default LeadNotification;