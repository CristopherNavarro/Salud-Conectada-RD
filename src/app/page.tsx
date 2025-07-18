import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HandHelping, Stethoscope, HeartHandshake } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col min-h-dvh">
      <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-primary/10">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none font-headline">
                  Salud para todos, a un clic de distancia
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  Nuestra plataforma simplifica la solicitud de citas médicas y
                  conecta a pacientes con una red de voluntarios dedicados en
                  la República Dominicana.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button asChild size="lg">
                  <Link href="/citas">Solicitar Cita Médica</Link>
                </Button>
                <Button asChild size="lg" variant="secondary">
                  <Link href="/voluntarios">Quiero Ser Voluntario</Link>
                </Button>
              </div>
            </div>
            <Image
              src="https://placehold.co/600x400.png"
              width="600"
              height="400"
              alt="Hero"
              data-ai-hint="doctor patient community"
              className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last lg:aspect-square"
            />
          </div>
        </div>
      </section>

      <section id="como-funciona" className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">
                Cómo Funciona
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">
                Un Proceso Sencillo en 3 Pasos
              </h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Hemos diseñado un sistema fácil de usar para que puedas
                obtener la ayuda que necesitas o contribuir a tu comunidad sin
                complicaciones.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl items-start gap-8 sm:grid-cols-2 md:gap-12 lg:grid-cols-3 lg:gap-16 mt-12">
            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto bg-primary/20 rounded-full p-4 w-fit">
                   <Stethoscope className="w-8 h-8 text-primary" />
                </div>
                <CardTitle className="font-headline mt-4">1. Solicita</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Pide tu cita médica o regístrate como voluntario a través de
                  nuestros formularios simples y seguros.
                </p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto bg-primary/20 rounded-full p-4 w-fit">
                   <HandHelping className="w-8 h-8 text-primary" />
                </div>
                <CardTitle className="font-headline mt-4">2. Procesamos</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Nuestro sistema inteligente procesa tu solicitud y la dirige
                  al centro de salud o coordinador de voluntarios adecuado.
                </p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto bg-primary/20 rounded-full p-4 w-fit">
                  <HeartHandshake className="w-8 h-8 text-primary" />
                </div>
                <CardTitle className="font-headline mt-4">3. Conectamos</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Recibes confirmación y seguimiento por WhatsApp o email,
                  asegurando que recibas la ayuda o la oportunidad de ayudar.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
