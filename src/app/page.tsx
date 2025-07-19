import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HandHelping, Stethoscope, HeartHandshake, Mail } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import ImageCarousel from "@/components/ImageCarousel";

export default function Home() {
  return (
    <div className="flex flex-col min-h-dvh">
      <section className="relative w-full h-screen overflow-hidden">
        <ImageCarousel />
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <div className="container px-4 md:px-6 text-center text-white z-10">
            <div className="space-y-4">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-6xl xl:text-7xl/none font-headline">
                Salud para todos, a un clic de distancia
              </h1>
              <p className="max-w-[700px] text-lg md:text-xl mx-auto">
                Nuestra plataforma simplifica la solicitud de citas médicas y
                conecta a pacientes con una red de voluntarios dedicados en la
                República Dominicana.
              </p>
            </div>
            <div className="flex flex-col gap-4 min-[400px]:flex-row justify-center mt-8">
              <Button asChild size="xl" className="px-8 py-6 text-lg">
                <Link href="/citas">Solicitar Cita Médica</Link>
              </Button>
              <Button asChild size="xl" variant="secondary" className="px-8 py-6 text-lg">
                <Link href="/voluntarios">Quiero Ser Voluntario</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Sección Sobre Nosotros */}
      <section id="sobre-nosotros" className="w-full py-12 md:py-24 lg:py-32" style={{ backgroundColor: '#f7f9fc' }}>
        <div className="container px-4 md:px-6">
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-16 items-center">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">
                Nuestra Misión: Tecnología con Propósito Humano
              </h2>
              <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Salud Conectada RD nació de la idea de que la tecnología puede y debe ser una herramienta para cerrar brechas sociales. Somos un equipo comprometido con mejorar el acceso a la salud en las comunidades más vulnerables de la República Dominicana. A través de la automatización y la creación de una red de solidaridad, conectamos a pacientes con la atención que necesitan y a voluntarios con la oportunidad de ayudar. Creemos en un futuro donde la salud sea un derecho accesible para todos, sin importar dónde vivan.
              </p>
            </div>
            <div className="relative h-[400px] w-full">
              <Image
                src="/image6.jpg"
                alt="Equipo de voluntarios de Salud Conectada RD"
                layout="fill"
                objectFit="cover"
                className="rounded-2xl shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Sección Cómo Funciona */}
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
            {/* Card 1 */}
            <Card className="text-center transition-all duration-300 ease-in-out hover:shadow-xl hover:-translate-y-2 rounded-xl border-none">
              <CardHeader>
                <div className="mx-auto bg-primary rounded-full p-4 w-fit">
                   <Stethoscope className="w-10 h-10 text-white" />
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
            {/* Card 2 */}
            <Card className="text-center transition-all duration-300 ease-in-out hover:shadow-xl hover:-translate-y-2 rounded-xl border-none">
              <CardHeader>
                <div className="mx-auto bg-primary rounded-full p-4 w-fit">
                   <HandHelping className="w-10 h-10 text-white" />
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
            {/* Card 3 */}
            <Card className="text-center transition-all duration-300 ease-in-out hover:shadow-xl hover:-translate-y-2 rounded-xl border-none">
              <CardHeader>
                <div className="mx-auto bg-primary rounded-full p-4 w-fit">
                  <HeartHandshake className="w-10 h-10 text-white" />
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

      {/* Sección Contáctanos */}
      <section id="contactanos" className="w-full py-12 md:py-24 lg:py-32 text-white text-center" style={{ backgroundColor: '#007bff' }}>
        <div className="container px-4 md:px-6 flex flex-col items-center">
          <h2 className="text-4xl font-bold tracking-tighter sm:text-5xl lg:text-6xl font-headline mb-4">
            ¿Tienes Preguntas o Sugerencias?
          </h2>
          <p className="max-w-[700px] text-lg md:text-xl mb-8">
            Estamos aquí para ayudarte. Si tienes cualquier duda sobre nuestro funcionamiento, quieres proponer una colaboración o necesitas soporte, no dudes en escribirnos.
          </p>
          <a
            href="mailto:saludconectadard@gmail.com"
            className="mt-4 inline-block px-8 py-4 border-2 border-white text-white text-lg font-semibold rounded-full transition-colors duration-300 hover:bg-white hover:text-[#007bff]"
          >
            saludconectadard@gmail.com
          </a>
        </div>
      </section>

      {/* Footer - Assuming Footer is a separate component rendered here */}
      {/* <Footer /> */}
    </div>
  );
}
