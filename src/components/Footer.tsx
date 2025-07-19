import { Instagram } from "lucide-react";
import { Logo } from "./Logo";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t py-8">
      <div className="container flex flex-col md:flex-row items-center justify-between gap-4">
        <Logo />
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} Salud Conectada RD. Todos los derechos reservados.
        </p>
        <div className="flex gap-4">
          <Link href="https://www.instagram.com/saludconectadard/?utm_source=ig_web_button_share_sheet" aria-label="Instagram" className="text-muted-foreground hover:text-primary" target="_blank" rel="noopener noreferrer">
            <Instagram size={20} />
          </Link>
        </div>
      </div>
    </footer>
  );
}
