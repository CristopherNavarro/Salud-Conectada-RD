import { z } from "zod";

// MODIFICADO: Se actualiza el esquema de citas
export const citaSchema = z.object({
  nombreCompleto: z.string().min(3, "El nombre es requerido."),
  // CORREGIDO: Expresión regular para la cédula
  cedula: z.string().regex(/^(\d{3}-?\d{7}-?\d{1}|\d{11})$/, "Cédula inválida."),
  // MODIFICADO: Se cambia 'fechaNacimiento' por 'edad'
  edad: z.string().min(1, "La edad es requerida."),
  telefono: z.string().min(10, "El número de teléfono es requerido."),
  email: z.string().email("Correo electrónico inválido."),
  centroSalud: z.string().min(1, "Debe seleccionar un centro de salud."),
  // AÑADIDO: Nuevos campos para la fecha y hora de la cita
  fechaCita: z.string().regex(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/, "Formato de fecha debe ser DD/MM/AAAA."),
  horaCita: z.string().min(1, "La hora de la cita es requerida."),
  motivoCita: z.string().min(10, "El motivo de la cita es muy corto."),
  necesitaAcompanante: z.boolean().default(false),
});

export type CitaSchema = z.infer<typeof citaSchema>;

// --- El resto del archivo no cambia ---

export const voluntarioSchema = z.object({
  nombreCompleto: z.string().min(3, "El nombre es requerido."),
  // CORREGIDO: Expresión regular para la cédula
  cedula: z.string().regex(/^(\d{3}-?\d{7}-?\d{1}|\d{11})$/, "Cédula inválida."),
  telefono: z.string().min(10, "El número de teléfono es requerido."),
  email: z.string().email("Correo electrónico inválido."),
  areasInteres: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "Debes seleccionar al menos un área de interés.",
  }),
  disponibilidad: z.string().min(1, "La disponibilidad es requerida."),
});

export type VoluntarioSchema = z.infer<typeof voluntarioSchema>;

export const donacionSchema = z.object({
  nombreDonante: z.string().min(3, "El nombre del donante es requerido."),
  telefonoContacto: z.string().min(10, "El número de teléfono es requerido."),
  email: z.string().email("Correo electrónico inválido.").optional(),
  descripcionInsumo: z.string().min(5, "La descripción es muy corta."),
});

export type DonacionSchema = z.infer<typeof donacionSchema>;