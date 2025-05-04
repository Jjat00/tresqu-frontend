
import { useState, useEffect, useRef } from 'react';
import { useToast } from "@/components/ui/use-toast";

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

interface UseSpeechRecognitionProps {
  onTranscript: (transcript: string) => void;
  handleSendMessage: (message: string) => void;
}

export const useSpeechRecognition = ({ onTranscript, handleSendMessage }: UseSpeechRecognitionProps) => {
  const [isRecording, setIsRecording] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const { toast } = useToast();

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
          onTranscript(transcript);
          
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
  }, [toast, onTranscript, handleSendMessage]);

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

  return {
    isRecording,
    isListening,
    toggleRecording
  };
};
