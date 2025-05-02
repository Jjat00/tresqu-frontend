
import { Button } from "@/components/ui/button";

const testimonials = [
  {
    avatar: "J",
    name: "Juan García",
    tag: "Finanzas personales",
    title: "Necesito registrar mis gastos diarios",
    description: "Busco una forma sencilla de anotar mis gastos mientras estoy en movimiento sin tener que abrir aplicaciones complicadas.",
    location: "Madrid",
    price: "Gratis",
    time: "Uso diario"
  },
  {
    avatar: "T",
    name: "TechSolutions SL",
    tag: "Empresa tecnológica · Contabilidad",
    title: "Buscamos automatizar registro de gastos",
    description: "Necesitamos una solución simple para que nuestro equipo registre gastos de trabajo sin complicaciones.",
    location: "Remoto",
    price: "Plan Empresarial",
    time: "Integración completa"
  }
];

const RealExamples = () => {
  return (
    <section className="py-16 md:py-24 lg:py-32 overflow-hidden bg-gradient-to-br from-primary/5 via-background to-background">
      <div className="container">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">
          <div className="lg:w-1/2">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              <span className="text-success">Registra tus gastos</span> con la simplicidad de un mensaje
            </h1>
            <p className="text-muted-foreground text-lg mb-8">
              La plataforma donde personas, empresas y profesionales manejan sus finanzas de forma conversacional, sin aplicaciones complicadas.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-success hover:bg-success/90">
                Comenzar ahora
              </Button>
              <Button size="lg" variant="outline" className="border-success text-success hover:bg-success/10">
                Ver cómo funciona
              </Button>
            </div>
            <div className="flex items-center gap-2 mt-10">
              <div className="flex -space-x-3">
                {['A', 'B', 'C', 'D'].map((letter, i) => (
                  <div 
                    key={i} 
                    className="w-8 h-8 rounded-full flex items-center justify-center text-xs bg-success/20 border-2 border-background"
                  >
                    {letter}
                  </div>
                ))}
              </div>
              <span className="text-sm text-muted-foreground">+1000 usuarios activos</span>
            </div>
          </div>

          <div className="lg:w-1/2 relative">
            <div className="absolute -top-6 -left-6 w-64 h-64 bg-success/10 rounded-full blur-3xl opacity-50"></div>
            <div className="absolute -bottom-10 -right-10 w-80 h-80 bg-highlight/10 rounded-full blur-3xl opacity-30"></div>
            
            <div className="relative z-10 space-y-4">
              {testimonials.map((item, index) => (
                <div 
                  key={index} 
                  className="glass p-5 rounded-xl animate-fade-up"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg font-medium shrink-0 ${
                      index === 0 ? 'bg-highlight/20' : 'bg-success/20'
                    }`}>
                      {item.avatar}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-semibold">{item.name}</p>
                          <p className="text-xs text-muted-foreground">{item.tag}</p>
                        </div>
                        <span className="text-xs px-2 py-1 bg-success/10 text-success rounded">
                          {item.location}
                        </span>
                      </div>
                      
                      <div className="mt-3">
                        <p className="text-sm font-medium">{item.title}</p>
                        <p className="text-xs text-muted-foreground mt-1">{item.description}</p>
                      </div>
                      
                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center gap-4">
                          <span className="text-xs font-medium">{item.price}</span>
                          <span className="text-xs text-muted-foreground">{item.time}</span>
                        </div>
                        <Button variant="link" size="sm" className="text-success p-0 h-auto">
                          Ver más
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RealExamples;
