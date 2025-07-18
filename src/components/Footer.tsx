import { Facebook, Instagram, Twitter } from "lucide-react";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="border-t py-8">
      <div className="container flex flex-col md:flex-row items-center justify-between gap-4">
        <Logo />
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} Salud Conectada RD. Todos los derechos reservados.
        </p>
        <div className="flex gap-4">
          <a href="#" aria-label="Facebook" className="text-muted-foreground hover:text-primary">
            <Facebook size={20} />
          </a>
          <a href="#" aria-label="Twitter" className="text-muted-foreground hover:text-primary">
            <Twitter size={20} />
          </a>
          <a href="#" aria-label="Instagram" className="text-muted-foreground hover:text-primary">
            <Instagram size={20} />
          </a>
        </div>
      </div>
    </footer>
  );
}
