import React, { useState } from 'react';
import { 
  MessageSquare, 
  X, 
  Send, 
  Bot,
  ExternalLink
} from 'lucide-react';

export const WhatsAppBotWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Array<{ sender: 'bot' | 'user'; text: string; time: string }>>([
    {
      sender: 'bot',
      text: '¡Hola! Soy el Asistente Virtual Técnico de IDUR S.A. ⚡ ¿En qué puedo ayudarte hoy?',
      time: 'Ahora'
    }
  ]);
  const [inputValue, setInputValue] = useState('');

  const handleOptionClick = (optionText: string, botReply: string) => {
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setMessages(prev => [
      ...prev,
      { sender: 'user', text: optionText, time },
      { sender: 'bot', text: botReply, time }
    ]);
  };

  const handleSendCustomMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const userText = inputValue;
    setInputValue('');

    setMessages(prev => [
      ...prev,
      { sender: 'user', text: userText, time },
      { 
        sender: 'bot', 
        text: `Entendido. He registrado tu consulta sobre "${userText}". Puedes continuar la conversación directamente en WhatsApp con nuestro equipo comercial:`, 
        time 
      }
    ]);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      
      {/* Trigger Button */}
      {!isOpen && (
        <a
          href={`https://wa.me/${localStorage.getItem('idur_whatsapp_number') || '5491148004387'}`}
          target="_blank"
          rel="noreferrer"
          className="relative flex items-center gap-3 px-5 py-3.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-2xl hover:scale-105 transition-all group"
        >
          <span className="w-3 h-3 rounded-full bg-white animate-ping absolute -top-1 -right-1" />
          <MessageSquare className="w-5 h-5 fill-current" />
          <span className="hidden sm:inline font-bold">Asistente WhatsApp</span>
        </a>
      )}

      {/* Interactive Chat Box */}
      {isOpen && (
        <div className="w-80 sm:w-96 rounded-2xl bg-white border border-slate-300 shadow-2xl overflow-hidden flex flex-col h-[500px]">
          
          {/* Header */}
          <div className="p-4 bg-[#0A2540] text-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-blue-600/30 border border-blue-400 flex items-center justify-center text-cyan-300">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
                  IDUR Engineering Bot
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                </h4>
                <p className="text-[10px] text-slate-300 font-mono-tech">Consultas Técnicas & Alquileres</p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-lg text-slate-300 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50 text-xs">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[85%] p-3 rounded-2xl leading-relaxed ${
                    m.sender === 'user'
                      ? 'bg-[#0A2540] text-white rounded-br-none'
                      : 'bg-white text-slate-800 border border-slate-200 shadow-sm rounded-bl-none'
                  }`}
                >
                  {m.text}
                </div>
                <span className="text-[9px] font-mono-tech text-slate-400 mt-1">{m.time}</span>
              </div>
            ))}

            {/* Quick Action Buttons */}
            <div className="pt-2 space-y-1.5">
              <p className="text-[10px] font-mono-tech uppercase text-slate-500 font-bold">Opciones frecuentes:</p>
              <button
                onClick={() => handleOptionClick(
                  '¿Tienen disponible el CPC 100 para alquiler?',
                  'Sí, contamos con unidades OMICRON CPC 100 con calibración vigente listas para despacho a obra. ¿Cuántos días requerirías?'
                )}
                className="w-full text-left p-2 rounded-xl bg-white border border-slate-200 text-blue-900 font-medium hover:bg-blue-50 text-xs transition-colors shadow-sm"
              >
                ⚡ Consultar disponibilidad CPC 100
              </button>

              <button
                onClick={() => handleOptionClick(
                  'Solicitar Ficha Técnica en PDF',
                  'Te adjunto el catálogo técnico de OMICRON y b2 electronics. También puedes presionar el botón de WhatsApp abajo para recibirlo en tu teléfono.'
                )}
                className="w-full text-left p-2 rounded-xl bg-white border border-slate-200 text-blue-900 font-medium hover:bg-blue-50 text-xs transition-colors shadow-sm"
              >
                📄 Solicitar Ficha Técnica PDF
              </button>
            </div>
          </div>

          {/* Input Area */}
          <div className="p-3 bg-white border-t border-slate-200 space-y-2">
            <form onSubmit={handleSendCustomMessage} className="flex gap-2">
              <input
                type="text"
                placeholder="Escribe tu consulta..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="flex-1 px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:border-blue-600 focus:outline-none"
              />
              <button
                type="submit"
                className="p-2 rounded-xl bg-[#0A2540] text-white hover:bg-blue-900 font-bold"
              >
                <Send className="w-4 h-4 text-cyan-400" />
              </button>
            </form>

            <a
              href={`https://wa.me/${localStorage.getItem('idur_whatsapp_number') || '5491148004387'}`}
              target="_blank"
              rel="noreferrer"
              className="w-full flex items-center justify-center gap-1.5 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 text-[11px] font-bold transition-colors"
            >
              <span>Abrir chat directo en WhatsApp Web</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

        </div>
      )}

    </div>
  );
};
