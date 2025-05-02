
import { CheckCircle } from "lucide-react";

const benefits = [
  {
    title: "Sin descargas adicionales",
    description: "Usa las aplicaciones que ya tienes. No necesitas instalar nada nuevo en tu teléfono."
  },
  {
    title: "100% conversacional",
    description: "Olvídate de formularios tediosos. Escribe como hablas normalmente."
  },
  {
    title: "Compatible con tus apps favoritas",
    description: "Funciona con WhatsApp y Telegram, las apps que ya usas todos los días."
  },
  {
    title: "Estadísticas automáticas",
    description: "Visualiza tus gastos y comprende tus hábitos financieros de forma sencilla."
  }
];

const Benefits = () => {
  return (
    <section id="beneficios" className="section-padding">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Beneficios clave</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Gestiona tus finanzas de forma natural, sin cambiar tus hábitos
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {benefits.map((benefit, index) => (
            <div 
              key={index} 
              className="glass p-6 animate-fade-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex gap-4">
                <CheckCircle className="h-6 w-6 text-success shrink-0" />
                <div>
                  <h3 className="text-lg font-semibold mb-2">{benefit.title}</h3>
                  <p className="text-sm text-muted-foreground">{benefit.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Benefits;
