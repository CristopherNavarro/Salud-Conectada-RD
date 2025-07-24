"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState, useTransition } from "react";
import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { citaSchema, CitaSchema } from "@/lib/schemas";
import { handleAppointmentSubmission } from "@/lib/actions";

// ELIMINADO: Ya no se usan los imports para la IA ni el calendario de nacimiento
// import { CalendarIcon, AlertCircle, Sparkles } from "lucide-react";
// import { format } from "date-fns";
// import { es } from "date-fns/locale";
// import { useDebounce } from "@/hooks/use-debounce";
// import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
// import { Calendar } from "@/components/ui/calendar";
// import { cn } from "@/lib/utils";
// import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
// import type { DetectAppointmentUrgencyOutput } from "@/ai/flows/detect-appointment-urgency";

export function CitaForm() {
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();
  // ELIMINADO: Estados relacionados con la IA
  // const [isDetecting, startDetectingTransition] = useTransition();
  // const [urgencyResult, setUrgencyResult] = useState<DetectAppointmentUrgencyOutput | null>(null);

  const form = useForm<CitaSchema>({
    resolver: zodResolver(citaSchema),
    // MODIFICADO: Valores por defecto actualizados
    defaultValues: {
      nombreCompleto: "",
      cedula: "",
      edad: "",
      telefono: "",
      email: "",
      centroSalud: "",
      fechaCita: "",
      horaCita: "",
      motivoCita: "",
      necesitaAcompanante: false,
    },
  });

  // ELIMINADO: Lógica y useEffect para detectar urgencia con IA
  // const motivoCita = form.watch("motivoCita");
  // const debouncedMotivo = useDebounce(motivoCita, 1000);
  // useEffect(() => { ... });

  function onSubmit(data: CitaSchema) {
    startTransition(async () => {
      const result = await handleAppointmentSubmission(null, data);
      if (result.status === 'success') {
        toast({
          title: "¡Solicitud Enviada!",
          description: "Hemos recibido tu solicitud. Recibirás una confirmación por WhatsApp y correo electrónico pronto.",
        });
        form.reset();
        // ELIMINADO: Limpieza del estado de la IA
        // setUrgencyResult(null);
      } else {
        toast({
          variant: "destructive",
          title: "Error al enviar",
          description: result.message,
        });
      }
    });
  }

  return (
    <Card className="max-w-2xl mx-auto mt-8">
      <CardHeader>
        <CardTitle>Formulario de Solicitud</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="nombreCompleto"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre Completo</FormLabel>
                  <FormControl>
                    <Input placeholder="Ej. Juan Pérez" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="cedula"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cédula de Identidad</FormLabel>
                  <FormControl>
                    <Input placeholder="Ej. 001-1234567-8" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* MODIFICADO: Campo de Fecha de Nacimiento cambiado por Edad */}
            <FormField
              control={form.control}
              name="edad"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Edad</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccione su edad" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {Array.from({ length: 100 }, (_, i) => i + 1).map(age => (
                        <SelectItem key={age} value={String(age)}>
                          {age} años
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="telefono"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Número de Teléfono (WhatsApp)</FormLabel>
                  <FormControl>
                    <Input type="tel" placeholder="Ej. 809-123-4567" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Correo Electrónico</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="ejemplo@correo.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="centroSalud"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Centro de Salud</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccione un centro" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Centro Comunitario A">Centro Comunitario A</SelectItem>
                      <SelectItem value="Clínica Rural B">Clínica Rural B</SelectItem>
                      <SelectItem value="Hospital Municipal C">Hospital Municipal C</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* AÑADIDO: Nuevos campos para Fecha y Hora de la cita */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="fechaCita"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Fecha de la Cita</FormLabel>
                    <FormControl>
                      <Input placeholder="DD/MM/AAAA" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="horaCita"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Hora de la Cita</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccione una hora" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="08:00 AM">08:00 AM</SelectItem>
                        <SelectItem value="09:00 AM">09:00 AM</SelectItem>
                        <SelectItem value="10:00 AM">10:00 AM</SelectItem>
                        <SelectItem value="11:00 AM">11:00 AM</SelectItem>
                        <SelectItem value="02:00 PM">02:00 PM</SelectItem>
                        <SelectItem value="03:00 PM">03:00 PM</SelectItem>
                        <SelectItem value="04:00 PM">04:00 PM</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="motivoCita"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Motivo de la Cita</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describa su problema de salud..."
                      {...field}
                      rows={4}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            {/* ELIMINADO: Sección completa de análisis de urgencia por IA */}

            <FormField
              control={form.control}
              name="necesitaAcompanante"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>
                      ¿Necesita un voluntario para acompañamiento?
                    </FormLabel>
                    <FormDescription>
                      Marque esta casilla si necesita que un voluntario le
                      acompañe a su cita.
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Enviar Solicitud
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}