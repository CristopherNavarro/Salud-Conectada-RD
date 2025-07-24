import { z } from "zod";

export const citaSchema = z.object({
  nombreCompleto: z.string().min(3, "El nombre es requerido."),
  cedula: z.string().regex(/^d{3}-?d{7}-?d{1}$/, "Cédula inválida."),
  fechaNacimiento: z.string().min(1, "La fecha de nacimiento es requerida."),
  telefono: z.string().min(10, "El número de teléfono es requerido."),
  email: z.string().email("Correo electrónico inválido."),
  centroSalud: z.string().min(1, "Debe seleccionar un centro de salud."),
  motivoCita: z.string().min(10, "El motivo de la cita es muy corto."),
  necesitaAcompanante: z.boolean().default(false),
});

export type CitaSchema = z.infer<typeof citaSchema>;

export const voluntarioSchema = z.object({
  nombreCompleto: z.string().min(3, "El nombre es requerido."),
  cedula: z.string().regex(/^d{3}-?d{7}-?d{1}$/, "Cédula inválida."),
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
  email: z.string().email("Correo electrónico inválido.").optional(), // Added email field as optional initially
  descripcionInsumo: z.string().min(5, "La descripción es muy corta."),
});

export type DonacionSchema = z.infer<typeof donacionSchema>;
