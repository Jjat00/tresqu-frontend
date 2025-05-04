
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useToast } from "@/components/ui/use-toast";
import { MessageSquare, Mic, MicOff, Send, X, Volume2, ChevronDown } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

// Add Web Speech API type declarations
declare global {
  interface SpeechRecognition extends EventTarget {
    continuous: boolean;
    interimResults: boolean;
    lang: string;
    maxAlternatives: number;
    onstart: (event: Event) => void;
    onresult: (event: SpeechRecognitionEvent) => void;
    onerror: (event: SpeechRecognitionErrorEvent) => void;
    onend: (event: Event) => void;
    start(): void;
    stop(): void;
    abort(): void;
  }

  interface SpeechRecognitionErrorEvent extends Event {
    error: string;
    message: string;
  }

  interface SpeechRecognitionEvent extends Event {
    resultIndex: number;
    results: SpeechRecognitionResultList;
  }

  interface SpeechRecognitionResultList {
    readonly length: number;
    item(index: number): SpeechRecognitionResult;
    [index: number]: SpeechRecognitionResult;
  }

  interface SpeechRecognitionResult {
    readonly isFinal: boolean;
    readonly length: number;
    item(index: number): SpeechRecognitionAlternative;
    [index: number]: SpeechRecognitionAlternative;
  }

  interface SpeechRecognitionAlternative {
    readonly transcript: string;
    readonly confidence: number;
  }

  interface Window {
    SpeechRecognition: new () => SpeechRecognition;
    webkitSpeechRecognition: new () => SpeechRecognition;
  }
}

interface Message {
  type: 'bot' | 'user';
  content: string;
}

const ChatBot = () => {
  const [showChat, setShowChat] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { 
      type: 'bot', 
      content: '¡Hola! Soy CashBot, tu asistente financiero. ¿En qué puedo ayudarte hoy?' 
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const messageEndRef = useRef<HTMLDivElement>(null);
  const chatBodyRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const isMobile = useIsMobile();
  
  // Speech recognition setup
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  
  useEffect(() => {
    // Initialize speech recognition if supported
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
      const SpeechRecognitionAPI = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognitionAPI();
      
      if (recognitionRef.current) {
        recognitionRef.current.lang = 'es-ES';
        recognitionRef.current.continuous = true;
        recognitionRef.current.interimResults = false;
        
        recognitionRef.current.onstart = () => {
          setIsListening(true);
        };
        
        recognitionRef.current.onresult = (event) => {
          const transcript = event.results[event.results.length - 1][0].transcript;
          setInputMessage(transcript);
          
          // Automatically send message when voice input ends
          if (transcript.trim()) {
            setTimeout(() => {
              handleSendMessage(transcript);
            }, 500);
          }
        };
        
        recognitionRef.current.onend = () => {
          setIsListening(false);
          setIsRecording(false);
        };
        
        recognitionRef.current.onerror = (event) => {
          console.error('Speech recognition error', event.error);
          setIsListening(false);
          setIsRecording(false);
          toast({
            title: "Error de reconocimiento de voz",
            description: "No se pudo capturar el audio. Por favor, intenta de nuevo.",
            variant: "destructive"
          });
        };
      }
    }
  }, [toast]);

  useEffect(() => {
    // Scroll to bottom when messages change
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const toggleRecording = () => {
    if (!recognitionRef.current) {
      toast({
        title: "Reconocimiento de voz no soportado",
        description: "Tu navegador no soporta el reconocimiento de voz.",
        variant: "destructive"
      });
      return;
    }
    
    if (isRecording) {
      recognitionRef.current.stop();
    } else {
      try {
        recognitionRef.current.start();
        setIsRecording(true);
      } catch (error) {
        console.error('Speech recognition error', error);
        toast({
          title: "Error",
          description: "No se pudo iniciar el reconocimiento de voz.",
          variant: "destructive"
        });
      }
    }
  };

  const handleSendMessage = (message = inputMessage) => {
    if (message.trim() === '') return;
    
    // Stop recording if active
    if (isRecording && recognitionRef.current) {
      recognitionRef.current.stop();
    }
    
    // Add user message
    setMessages(prev => [...prev, { type: 'user', content: message }]);
    setInputMessage('');
    setIsProcessing(true);
    
    // Simulate bot response (in a real app, this would be an API call)
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
      if ('speechSynthesis' in window && botResponse) {
        const speech = new SpeechSynthesisUtterance(botResponse);
        speech.lang = 'es-ES';
        speech.rate = 1.0;
        speech.pitch = 1.0;
        window.speechSynthesis.speak(speech);
      }
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {showChat && (
        <div className={`absolute ${isMobile ? 'bottom-16 right-0 left-0 mx-2' : 'bottom-16 right-0'} ${isMobile ? 'w-auto' : 'w-full sm:w-96'} h-[30rem] bg-card rounded-lg shadow-lg border border-border p-3 sm:p-4 mb-4 flex flex-col animate-fade-in`}>
          <div className="flex justify-between items-center border-b pb-2 mb-2">
            <div className="flex items-center">
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-success/20 flex items-center justify-center">
                <MessageSquare className="h-3 w-3 sm:h-4 sm:w-4 text-success" />
              </div>
              <span className="font-medium text-xs sm:text-sm ml-2">CashBot</span>
            </div>
            <div className="flex items-center">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="sm" className="h-7 w-7 sm:h-8 sm:w-8 p-0" onClick={() => setShowChat(false)}>
                      <ChevronDown className="h-3 w-3 sm:h-4 sm:w-4" />
                      <span className="sr-only">Minimizar</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="text-xs">Minimizar chat</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="sm" className="h-7 w-7 sm:h-8 sm:w-8 p-0">
                      <Volume2 className="h-3 w-3 sm:h-4 sm:w-4" />
                      <span className="sr-only">Activar/desactivar voz</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="text-xs">Activar/desactivar voz</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              
              <Button variant="ghost" size="sm" className="h-7 w-7 sm:h-8 sm:w-8 p-0" onClick={() => setShowChat(false)}>
                <span className="sr-only">Cerrar</span>
                <X className="h-3 w-3 sm:h-4 sm:w-4" />
              </Button>
            </div>
          </div>
          
          <div ref={chatBodyRef} className="flex-1 overflow-auto mb-2 bg-muted/30 rounded-md p-1 sm:p-2 space-y-1 sm:space-y-2">
            {messages.map((msg, index) => (
              <div 
                key={index} 
                className={`mb-1 sm:mb-2 flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`p-1.5 sm:p-2 rounded-lg inline-block max-w-[85%] text-xs sm:text-sm ${
                    msg.type === 'user' 
                      ? 'bg-success text-success-foreground' 
                      : 'bg-card'
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}
            {isProcessing && (
              <div className="flex justify-start mb-1 sm:mb-2">
                <div className="bg-card p-1.5 sm:p-2 rounded-lg inline-block max-w-[85%]">
                  <div className="flex items-center gap-1">
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "600ms" }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messageEndRef} />
          </div>
          
          <div className="flex items-end gap-1 sm:gap-2">
            <div className="flex-1 bg-background border border-input rounded-md overflow-hidden">
              <textarea
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={isListening ? "Escuchando..." : "Escribe un mensaje o habla..."}
                className="w-full bg-transparent px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm resize-none focus:outline-none min-h-[36px] max-h-[100px]"
                rows={1}
                disabled={isListening}
              />
            </div>
            
            <div className="flex">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button 
                      variant={isRecording ? "destructive" : "secondary"}
                      size={isMobile ? "sm" : "icon"}
                      className={`${isRecording ? "animate-pulse" : ""} h-8 w-8 sm:h-10 sm:w-10 p-1 sm:p-2`}
                      onClick={toggleRecording}
                    >
                      {isRecording ? <MicOff className="h-3 w-3 sm:h-4 sm:w-4" /> : <Mic className="h-3 w-3 sm:h-4 sm:w-4" />}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="text-xs">{isRecording ? "Detener grabación" : "Hablar"}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              
              <Button 
                className="ml-1 bg-success hover:bg-success/90 h-8 w-8 sm:h-10 sm:w-10 p-1 sm:p-2"
                onClick={() => handleSendMessage()}
                disabled={inputMessage.trim() === '' || isProcessing}
              >
                <Send className="h-3 w-3 sm:h-4 sm:w-4" />
              </Button>
            </div>
          </div>
          
          <div className="mt-2 text-center">
            <p className="text-[10px] sm:text-xs text-muted-foreground">
              Prueba diciendo: "Gasté $1,500 en supermercado" o "¿Cuánto gasté este mes?"
            </p>
          </div>
        </div>
      )}
      
      <Button 
        className={`${isMobile ? 'h-12 w-12' : 'h-14 w-14'} rounded-full bg-success hover:bg-success/90 shadow-lg`}
        onClick={() => setShowChat(prev => !prev)}
      >
        <MessageSquare className={`${isMobile ? 'h-5 w-5' : 'h-6 w-6'}`} />
        <span className="sr-only">Chat con CashBot</span>
      </Button>
    </div>
  );
};

export default ChatBot;
