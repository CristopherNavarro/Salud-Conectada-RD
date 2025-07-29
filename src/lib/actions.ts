"use server";

import { chat } from "@/ai/flows/chat";

// --- NOTA DE PRODUCCIÓN ---
// Reemplaza las siguientes URLs de placeholder con tus URLs de producción reales de n8n.
const N8N_URL_BASE = "https://monkey-adapting-cub.ngrok-free.app"; // O tu dominio

const WEBHOOK_URLS = {
  citas: `${N8N_URL_BASE}/webhook/pacientes`,
  voluntarios: `${N8N_URL_BASE}/webhook/voluntarios`,
  donaciones: `${N8N_URL_BASE}/webhook/donaciones`,
};

// --- Funciones de Formulario ---

export async function handleAppointmentSubmission(prevState: any, data: any) {
  try {
    const formattedPhone = `1${data.telefono.replace(/\D/g, '')}`;
    const dataToSend = { ...data, telefono: formattedPhone };
    const response = await fetch(WEBHOOK_URLS.citas, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dataToSend),
    });
    if (response.ok) {
      return { message: '¡Gracias! Tu cita ha sido registrada.', status: 'success' };
    } else {
      return { message: 'Hubo un error al registrar tu cita. Inténtalo de nuevo.', status: 'error' };
    }
  } catch (error) {
    console.error('Error submitting appointment form:', error);
    return { message: 'Hubo un error al registrar tu cita. Inténtalo de nuevo.', status: 'error' };
  }
}

export async function handleVolunteerSubmission(prevState: any, data: any) {
  try {
    const formattedPhone = `1${data.telefono.replace(/\D/g, '')}`;
    const dataToSend = { ...data, telefono: formattedPhone };
    const response = await fetch(WEBHOOK_URLS.voluntarios, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dataToSend),
    });
    if (response.ok) {
      return { message: '¡Gracias por tu interés! Hemos recibido tu información.', status: 'success' };
    } else {
      return { message: 'Hubo un error al enviar tu información. Inténtalo de nuevo.', status: 'error' };
    }
  } catch (error) {
    console.error('Error submitting volunteer form:', error);
    return { message: 'Hubo un error al enviar tu información. Inténtalo de nuevo.', status: 'error' };
  }
}

export async function handleDonationSubmission(prevState: any, data: any) {
  try {
    const formattedPhone = `1${data.telefonoContacto.replace(/\D/g, '')}`;
    const dataToSend = { ...data, telefonoContacto: formattedPhone };
    const response = await fetch(WEBHOOK_URLS.donaciones, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dataToSend),
    });
    if (response.ok) {
      return { message: '¡Gracias por tu donación!', status: 'success' };
    } else {
      return { message: 'Hubo un error al procesar tu donación. Inténtalo de nuevo.', status: 'error' };
    }
  } catch (error) {
    console.error('Error submitting donation form:', error);
    return { message: 'Hubo un error al procesar tu donación. Inténtalo de nuevo.', status: 'error' };
  }
}


// --- Función del Chatbot (Versión con Genkit) ---

export async function handleChatSubmission(userMessage: string): Promise<string> {
  try {
    const response = await chat({ message: userMessage });
    return response.response;
  } catch (error) {
    console.error('Error al contactar el flow de chat:', error);
    return "Tuve un problema técnico. Por favor, intenta más tarde.";
  }
}
