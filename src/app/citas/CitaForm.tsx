"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState, useEffect, useTransition } from "react";
import { CalendarIcon, Loader2, AlertCircle, Sparkles } from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";

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
import { solicitarCita, detectAppointmentUrgency } from "@/lib/actions";
import { useDebounce } from "@/hooks/use-debounce";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import type { DetectAppointmentUrgencyOutput } from "@/ai/flows/detect-appointment-urgency";

export function CitaForm() {
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();
  const [isDetecting, startDetectingTransition] = useTransition();
  const [urgencyResult, setUrgencyResult] = useState<DetectAppointmentUrgencyOutput | null>(null);

  const form = useForm<CitaSchema>({
    resolver: zodResolver(citaSchema),
    defaultValues: {
      nombreCompleto: "",
      cedula: "",
      fechaNacimiento: "",
      telefono: "",
      email: "",
      centroSalud: "",
      motivoCita: "",
      necesitaAcompanante: false,
    },
  });

  const motivoCita = form.watch("motivoCita");
  const debouncedMotivo = useDebounce(motivoCita, 1000);

  useEffect(() => {
    if (debouncedMotivo && debouncedMotivo.length > 15) {
      startDetectingTransition(async () => {
        const result = await detectAppointmentUrgency(debouncedMotivo);
        setUrgencyResult(result);
      });
    } else {
      setUrgencyResult(null);
    }
  }, [debouncedMotivo]);

  function onSubmit(data: CitaSchema) {
    startTransition(async () => {
      const result = await solicitarCita(data);
      if (result.success) {
        toast({
          title: "¡Solicitud Enviada!",
          description:
            "Hemos recibido tu solicitud. Recibirás una confirmación por WhatsApp y correo electrónico pronto.",
        });
        form.reset();
        setUrgencyResult(null);
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
            <FormField
              control={form.control}
              name="fechaNacimiento"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Fecha de Nacimiento</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(new Date(field.value), "PPP", { locale: es })
                          ) : (
                            <span>Seleccione una fecha</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value ? new Date(field.value) : undefined}
                        onSelect={(date) => field.onChange(date?.toISOString())}
                        disabled={(date) =>
                          date > new Date() || date < new Date("1900-01-01")
                        }
                        initialFocus
                        locale={es}
                      />
                    </PopoverContent>
                  </Popover>
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
                  <FormDescription>
                    Esta información nos ayudará a entender la urgencia de su caso.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            {isDetecting && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Loader2 className="h-4 w-4 animate-spin" />
                Analizando urgencia...
              </div>
            )}
            
            {urgencyResult && (
              <Alert variant={urgencyResult.isUrgent ? "destructive" : "default"}>
                {urgencyResult.isUrgent ? <AlertCircle className="h-4 w-4" /> : <Sparkles className="h-4 w-4" />}
                <AlertTitle className="font-bold flex items-center gap-2">
                  Análisis de Urgencia por IA: {urgencyResult.isUrgent ? "Urgente" : "No Urgente"}
                </AlertTitle>
                <AlertDescription>
                  <p className="font-semibold">{urgencyResult.reason}</p>
                  {urgencyResult.suggestedAction && <p className="mt-2">{urgencyResult.suggestedAction}</p>}
                </AlertDescription>
              </Alert>
            )}

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
