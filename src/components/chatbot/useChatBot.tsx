
import { useState, useRef, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { useSpeechRecognition } from "./useSpeechRecognition";
import { useTextToSpeech } from "./useTextToSpeech";

interface Message {
  type: 'bot' | 'user';
  content: string;
}

export const useChatBot = () => {
  const [showChat, setShowChat] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { 
      type: 'bot', 
      content: '¡Hola! Soy CashBot, tu asistente financiero. ¿En qué puedo ayudarte hoy?' 
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const messageEndRef = useRef<HTMLDivElement>(null);
  const chatBodyRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const { speakText } = useTextToSpeech();

  // Handle sending a message
  const handleSendMessage = (message = inputMessage) => {
    if (message.trim() === '') return;
    
    // Add user message
    setMessages(prev => [...prev, { type: 'user', content: message }]);
    setInputMessage('');
    setIsProcessing(true);
    
    // Simulate bot response
    simulateBotResponse(message);
  };

  // Speech recognition hook
  const { isRecording, isListening, toggleRecording } = useSpeechRecognition({
    onTranscript: setInputMessage,
    handleSendMessage
  });

  // Simulate bot response based on message content
  const simulateBotResponse = (message: string) => {
    setTimeout(() => {
      let botResponse;
      const lowerCaseMessage = message.toLowerCase();
      
      // Simulate bot intelligence with pattern matching
      if (lowerCaseMessage.includes('gasté') || lowerCaseMessage.includes('gaste') || lowerCaseMessage.includes('compré')) {
        const amountMatch = message.match(/\d+(\.\d+)?/);
        const amount = amountMatch ? amountMatch[0] : "una cantidad";
        
        let category = "compra";
        if (lowerCaseMessage.includes('comida') || lowerCaseMessage.includes('restaurante') || lowerCaseMessage.includes('supermercado')) {
          category = "alimentación";
        } else if (lowerCaseMessage.includes('uber') || lowerCaseMessage.includes('taxi') || lowerCaseMessage.includes('bus')) {
          category = "transporte";
        } else if (lowerCaseMessage.includes('netflix') || lowerCaseMessage.includes('cine') || lowerCaseMessage.includes('juego')) {
          category = "entretenimiento";
        } else if (lowerCaseMessage.includes('luz') || lowerCaseMessage.includes('agua') || lowerCaseMessage.includes('internet')) {
          category = "servicios";
        }
        
        botResponse = `¡Registrado! He añadido un gasto de $${amount} en la categoría "${category}". ¿Quieres añadir algún detalle adicional?`;
      } else if (lowerCaseMessage.includes('ingres') || lowerCaseMessage.includes('recib') || lowerCaseMessage.includes('cobr')) {
        const amountMatch = message.match(/\d+(\.\d+)?/);
        botResponse = amountMatch 
          ? `¡Excelente! He registrado un ingreso de $${amountMatch[0]}. Tu balance mensual ha sido actualizado.`
          : `¡Excelente! He registrado este ingreso. Tu balance mensual ha sido actualizado. ¿Puedes indicarme el monto exacto?`;
      } else if (lowerCaseMessage.includes('deuda') || lowerCaseMessage.includes('préstamo') || lowerCaseMessage.includes('prestamo')) {
        botResponse = 'He registrado esta deuda. ¿Te gustaría que creara un plan de pagos optimizado para ella?';
      } else if ((lowerCaseMessage.includes('gast') || lowerCaseMessage.includes('cuánto gasté')) && lowerCaseMessage.includes('mes')) {
        botResponse = 'En este mes has gastado $7,850. Tus categorías principales son: Alimentación (45%), Transporte (25%) y Entretenimiento (15%).';
      } else if (lowerCaseMessage.includes('ahorro') || lowerCaseMessage.includes('meta') || lowerCaseMessage.includes('ahorrar')) {
        botResponse = 'Basado en tus ingresos y gastos actuales, podrías ahorrar aproximadamente $3,200 cada mes. ¿Te gustaría crear una meta de ahorro?';
      } else if (lowerCaseMessage.includes('compara') || lowerCaseMessage.includes('comparación')) {
        botResponse = 'Comparado con el mes anterior, has gastado un 12% menos en Alimentación, pero un 15% más en Entretenimiento. Tu ahorro total ha mejorado un 5%.';
      } else if (lowerCaseMessage.includes('consejos') || lowerCaseMessage.includes('recomendación') || lowerCaseMessage.includes('sugerencia')) {
        botResponse = 'Te recomiendo aumentar tus pagos a la Tarjeta de Crédito para reducir los intereses. También podrías reducir tus gastos en restaurantes, que representan un 30% de tu presupuesto de alimentación.';
      } else {
        botResponse = 'Entiendo. ¿Hay algo específico en lo que pueda ayudarte con tus finanzas? Puedo registrar gastos, ingresos, crear planes de pago o analizar tus hábitos financieros.';
      }
      
      setMessages(prev => [...prev, { type: 'bot', content: botResponse }]);
      setIsProcessing(false);
      
      // Speak the response (text-to-speech)
      speakText(botResponse);
    }, 1500);
  };

  // Scroll to bottom when messages change
  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return {
    showChat,
    setShowChat,
    messages,
    inputMessage,
    setInputMessage,
    isProcessing,
    isRecording,
    isListening,
    messageEndRef,
    chatBodyRef,
    handleSendMessage,
    toggleRecording
  };
};
