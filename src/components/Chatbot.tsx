"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Bot, Send, X, MessageSquare } from 'lucide-react';
import { cn } from '@/lib/utils';
import { handleChatSubmission } from '@/lib/actions';

// Definiendo el tipo para los mensajes
interface Message {
  text: string;
  sender: 'user' | 'bot';
}

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { text: "¡Hola! Soy VIA. ¿Cómo puedo ayudarte hoy?", sender: 'bot' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = { text: inputValue, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    const currentInput = inputValue;
    setInputValue('');
    setIsLoading(true);

    try {
      const botResponseText = await handleChatSubmission(currentInput);
      const botMessage: Message = { text: botResponseText, sender: 'bot' };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error("Error en el envío del chat:", error);
      const errorMessage: Message = { text: "Lo siento, algo salió mal. Por favor, intenta de nuevo.", sender: 'bot' };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };
  
  const BotIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="w-8 h-8 text-white"
    >
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
      <path d="M12 18c-2.21 0-4-1.79-4-4h2c0 1.1.9 2 2 2s2-.9 2-2h2c0 2.21-1.79 4-4 4zM7.5 12c-.83 0-1.5-.67-1.5-1.5S6.67 9 7.5 9s1.5.67 1.5 1.5S8.33 12 7.5 12zm9 0c-.83 0-1.5-.67-1.5-1.5S15.67 9 16.5 9s1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" />
    </svg>
  );

  return (
    <>
      <button
        onClick={toggleChat}
        className={cn(
          "fixed bottom-5 right-5 z-50 w-16 h-16 rounded-full text-white shadow-lg flex items-center justify-center transition-transform duration-300 ease-in-out hover:scale-110",
          "bg-gradient-to-br from-purple-600 to-blue-500"
        )}
        aria-label="Abrir chat"
      >
        {isOpen ? <X size={32} /> : <MessageSquare size={32} />}
      </button>

      <div
        className={cn(
          "fixed bottom-24 right-5 z-50 w-[calc(100%-40px)] max-w-sm h-[70vh] max-h-[600px] bg-white dark:bg-gray-900 rounded-2xl shadow-xl flex flex-col transition-all duration-300 ease-in-out",
          isOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"
        )}
      >
        <div className="p-4 rounded-t-2xl text-white bg-gradient-to-br from-purple-600 to-blue-500 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
              <BotIcon />
            </div>
            <div>
              <h3 className="font-bold text-lg">VIA</h3>
              <p className="text-xs opacity-80">Virtual Intelligent Assistant</p>
            </div>
          </div>
          <button onClick={toggleChat} className="p-2 rounded-full hover:bg-white/20" aria-label="Cerrar chat">
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 p-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
          <div className="flex flex-col gap-4">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={cn(
                  "flex items-start gap-3 max-w-[85%]",
                  msg.sender === 'user' ? "self-end flex-row-reverse" : "self-start"
                )}
              >
                {msg.sender === 'bot' && (
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-600 to-blue-500 flex items-center justify-center shrink-0">
                    <BotIcon />
                  </div>
                )}
                <div
                  className={cn(
                    "p-3 rounded-2xl text-sm",
                    msg.sender === 'user'
                      ? "bg-blue-500 text-white rounded-br-none"
                      : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-bl-none"
                  )}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex items-start gap-3 self-start">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-600 to-blue-500 flex items-center justify-center shrink-0">
                    <BotIcon />
                  </div>
                <div className="p-3 rounded-2xl bg-gray-200 dark:bg-gray-700 flex items-center gap-2">
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-0"></span>
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-150"></span>
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-300"></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>

        <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 rounded-b-2xl">
          <form onSubmit={handleSubmit} className="flex items-center gap-2">
            <input
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              placeholder="Escribe tu mensaje..."
              className="flex-1 w-full px-4 py-2 text-sm bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={isLoading}
            />
            <button
              type="submit"
              className="p-3 rounded-full bg-blue-500 text-white disabled:bg-gray-400 transition-colors"
              disabled={isLoading || !inputValue.trim()}
              aria-label="Enviar mensaje"
            >
              <Send size={18} />
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Chatbot;