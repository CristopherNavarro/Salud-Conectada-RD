"use server";

import { z } from "zod";
import { detectAppointmentUrgency as detectAppointmentUrgencyFlow } from "@/ai/flows/detect-appointment-urgency";
import { citaSchema, donacionSchema, voluntarioSchema } from "./schemas";

type FormState = {
  success: boolean;
  message: string;
};

const n8nWebhookUrls = {
    nuevaCita: "https://kirki.app.n8n.cloud/webhook-test/pacientes",
    nuevoVoluntario: "https://kirki.app.n8n.cloud/webhook-test/voluntarios",
    nuevaDonacion: "https://kirki.app.n8n.cloud/webhook-test/donaciones",
};

async function postToWebhook(url: string, data: unknown): Promise<FormState> {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      console.error("Webhook response not OK", { status: response.status, body: await response.text() });
      return { success: false, message: "Hubo un problema al enviar su solicitud. Por favor, intente de nuevo." };
    }
    
    return { success: true, message: "Solicitud enviada con éxito." };
  } catch (error) {
    console.error("Error posting to webhook:", error);
    return { success: false, message: "Error de conexión. Por favor, verifique su conexión a internet." };
  }
}

export async function solicitarCita(
  data: z.infer<typeof citaSchema>
): Promise<FormState> {
  const parsedData = citaSchema.safeParse(data);
  if (!parsedData.success) {
    return { success: false, message: "Datos del formulario inválidos." };
  }
  return postToWebhook(n8nWebhookUrls.nuevaCita, parsedData.data);
}

export async function registrarVoluntario(
  data: z.infer<typeof voluntarioSchema>
): Promise<FormState> {
  const parsedData = voluntarioSchema.safeParse(data);
  if (!parsedData.success) {
    return { success: false, message: "Datos del formulario inválidos." };
  }
  return postToWebhook(n8nWebhookUrls.nuevoVoluntario, parsedData.data);
}

export async function registrarDonacion(
  data: z.infer<typeof donacionSchema>
): Promise<FormState> {
  const parsedData = donacionSchema.safeParse(data);
  if (!parsedData.success) {
    return { success: false, message: "Datos del formulario inválidos." };
  }
  return postToWebhook(n8nWebhookUrls.nuevaDonacion, parsedData.data);
}


export async function detectAppointmentUrgency(issueDescription: string) {
  "use server";
  if (!issueDescription || issueDescription.trim().length < 10) {
    return null;
  }
  try {
    const urgency = await detectAppointmentUrgencyFlow({ issueDescription });
    return urgency;
  } catch (error) {
    console.error("Error detecting urgency:", error);
    return null;
  }
}