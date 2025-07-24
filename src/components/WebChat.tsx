"use client";

import { useEffect } from 'react';
import Script from 'next/script';

const WebChat = () => {
  // Usamos useEffect para asegurarnos de que el código se ejecuta solo en el navegador
  useEffect(() => {
    // A veces, los scripts de chat necesitan que una variable global esté lista.
    // Aunque este script no lo pida explícitamente, es una buena práctica.
    if (window) {
      // Puedes añadir configuraciones aquí si el chat las necesitara en el futuro
    }
  }, []);

  return (
    <Script
      id="n8n-chat-script"
      src="https://kirki.app.n8n.cloud/webhook/ea4c87e7-61f7-4266-937f-3f6c3047c2f3/chat"
      strategy="afterInteractive" // Cambiamos la estrategia para asegurar que cargue después de que la página sea interactiva
    />
  );
};

export default WebChat;