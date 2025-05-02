
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MessageSquare } from "lucide-react";

const ChatBot = () => {
  const [showChat, setShowChat] = useState(false);
  const [messages, setMessages] = useState([
    { 
      type: 'bot', 
      content: '¡Hola! Soy CashBot, tu asistente financiero. ¿En qué puedo ayudarte hoy?' 
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');

  const handleSendMessage = () => {
    if (inputMessage.trim() === '') return;
    
    // Add user message
    setMessages([...messages, { type: 'user', content: inputMessage }]);
    
    // Simulate bot response (in a real app, this would be an API call)
    setTimeout(() => {
      let botResponse;
      const lowerCaseMessage = inputMessage.toLowerCase();
      
      if (lowerCaseMessage.includes('gasté') || lowerCaseMessage.includes('gaste')) {
        botResponse = '¡Registrado! He añadido este gasto a tu cuenta. ¿Quieres clasificarlo en alguna categoría específica?';
      } else if (lowerCaseMessage.includes('ingres') || lowerCaseMessage.includes('recib') || lowerCaseMessage.includes('cobr')) {
        botResponse = '¡Excelente! He registrado este ingreso. Tu balance mensual ha sido actualizado.';
      } else if (lowerCaseMessage.includes('deuda') || lowerCaseMessage.includes('préstamo') || lowerCaseMessage.includes('prestamo')) {
        botResponse = 'He registrado esta deuda. ¿Te gustaría que creara un plan de pagos optimizado para ella?';
      } else if (lowerCaseMessage.includes('gast') && lowerCaseMessage.includes('mes')) {
        botResponse = 'En este mes has gastado $7,850. Tus categorías principales son: Alimentación (45%), Transporte (25%) y Entretenimiento (15%).';
      } else {
        botResponse = 'Entiendo. ¿Hay algo más en lo que pueda ayudarte con tus finanzas?';
      }
      
      setMessages(prev => [...prev, { type: 'bot', content: botResponse }]);
    }, 1000);
    
    // Clear input
    setInputMessage('');
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {showChat && (
        <div className="absolute bottom-16 right-0 w-80 h-96 bg-card rounded-lg shadow-lg border border-border p-4 mb-4 flex flex-col animate-fade-in">
          <div className="flex justify-between items-center border-b pb-2 mb-2">
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-success/20 flex items-center justify-center">
                <MessageSquare className="h-4 w-4 text-success" />
              </div>
              <span className="font-medium text-sm ml-2">CashBot</span>
            </div>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => setShowChat(false)}>
              <span className="sr-only">Close</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
            </Button>
          </div>
          
          <div className="flex-1 overflow-auto mb-2 bg-muted/30 rounded-md p-2">
            {messages.map((msg, index) => (
              <div 
                key={index} 
                className={`mb-2 flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`p-2 rounded-lg inline-block max-w-[80%] text-sm ${
                    msg.type === 'user' 
                      ? 'bg-success text-success-foreground' 
                      : 'bg-card'
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}
          </div>
          
          <div className="flex">
            <input 
              type="text" 
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Escribe un mensaje..." 
              className="flex-1 bg-background border border-input rounded-l-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-success"
            />
            <Button 
              size="sm" 
              className="bg-success hover:bg-success/90 rounded-l-none"
              onClick={handleSendMessage}
            >
              <MessageSquare className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
      
      <Button 
        className="h-14 w-14 rounded-full bg-success hover:bg-success/90 shadow-lg"
        onClick={() => setShowChat(prev => !prev)}
      >
        <MessageSquare className="h-6 w-6" />
        <span className="sr-only">Chat con CashBot</span>
      </Button>
    </div>
  );
};

export default ChatBot;
