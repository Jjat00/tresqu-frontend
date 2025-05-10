import {
  Check,
  X,
  Mail,
  Linkedin,
  Facebook,
  MessageCircle,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const PricingFeature = ({
  included,
  text,
}: {
  included: boolean;
  text: string;
}) => {
  return (
    <div className="flex items-center gap-2 text-sm">
      {included ? (
        <Check className="h-4 w-4 text-success" />
      ) : (
        <X className="h-4 w-4 text-muted-foreground" />
      )}
      <span
        className={
          included ? "text-foreground font-medium" : "text-muted-foreground"
        }
      >
        {text}
      </span>
    </div>
  );
};

const Pricing = () => {
  return (
    <section
      id="pricing"
      className="relative overflow-hidden py-16 md:py-24 lg:py-28 gradient-bg"
    >
      <div className="container max-w-7xl mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-3 font-display high-contrast-text-purple">
            Planes para todo tipo de usuario
          </h2>
          <p className="text-foreground text-lg md:text-xl max-w-2xl mx-auto text-shadow-sm">
            Elige el plan que mejor se adapte a tus necesidades financieras
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Plan Básico */}
          <Card className="glass-card backdrop-blur-sm relative flex flex-col transform transition-all duration-300 hover:translate-y-[-8px] hover:shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl md:text-2xl text-foreground text-shadow-sm">
                Plan Básico
              </CardTitle>
              <CardDescription className="text-foreground/90">
                Para usuarios que inician
              </CardDescription>
              <div className="mt-4">
                <span className="text-3xl font-bold high-contrast-text-highlight">
                  Gratis
                </span>
                <span className="text-foreground/90"> - para siempre</span>
              </div>
            </CardHeader>
            <CardContent className="flex-grow">
              <div className="space-y-3">
                <PricingFeature
                  included={true}
                  text="Registro de ingresos y gastos básico"
                />
                <PricingFeature included={true} text="Estadísticas básicas" />
                <PricingFeature
                  included={true}
                  text="Interacción por texto en WhatsApp/Telegram"
                />
                <PricingFeature included={false} text="Registro por audio" />
                <PricingFeature included={false} text="Registro múltiple" />
                <PricingFeature included={false} text="Reportes detallados" />
                <PricingFeature included={false} text="Visualización gráfica" />
                <PricingFeature included={false} text="Análisis por periodos" />
                <PricingFeature included={false} text="Memoria contextual" />
                <PricingFeature included={false} text="Exportación de datos" />
                <PricingFeature included={false} text="Soporte prioritario" />
              </div>
            </CardContent>
            <CardFooter>
              <Button
                variant="outline"
                className="w-full relative overflow-hidden group font-medium"
                size="lg"
              >
                <span className="absolute inset-0 bg-white/5 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
                <span className="relative z-10 text-foreground">
                  Comenzar Gratis
                </span>
              </Button>
            </CardFooter>
          </Card>

          {/* Plan Premium */}
          <Card className="gradient-border relative flex flex-col transform transition-all duration-300 hover:translate-y-[-8px] hover:glow">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-20">
              <Badge className="bg-success-dark text-white hover:bg-success/90 shadow-md font-medium">
                Recomendado
              </Badge>
            </div>
            <div className="glass-card backdrop-blur-sm h-full">
              <CardHeader>
                <CardTitle className="text-xl md:text-2xl text-foreground text-shadow-sm">
                  Plan Premium
                </CardTitle>
                <CardDescription className="text-foreground/90">
                  Para usuarios avanzados
                </CardDescription>
                <div className="mt-4 space-y-1">
                  <div>
                    <span className="text-3xl font-bold high-contrast-text-success">
                      $5
                    </span>
                    <span className="text-foreground/90"> / mes</span>
                  </div>
                  <div className="text-sm text-foreground/80">
                    ó $50 anual (20% descuento)
                  </div>
                  <div className="text-sm text-success-dark font-medium mt-2">
                    ¡Prueba gratis por 1 mes!
                  </div>
                </div>
              </CardHeader>
              <CardContent className="flex-grow">
                <div className="space-y-3">
                  <PricingFeature
                    included={true}
                    text="Registro de ingresos y gastos en lenguaje natural"
                  />
                  <PricingFeature
                    included={true}
                    text="Registro por audio para ingresos y gastos"
                  />
                  <PricingFeature
                    included={true}
                    text="Registro múltiple en un solo mensaje"
                  />
                  <PricingFeature
                    included={true}
                    text="Modificación y eliminación de registros"
                  />
                  <PricingFeature
                    included={true}
                    text="Análisis por periodos: diario, semanal, mensual"
                  />
                  <PricingFeature
                    included={true}
                    text="Reportes detallados con gráficos"
                  />
                  <PricingFeature
                    included={true}
                    text="Visualización gráfica: dona, barras y líneas"
                  />
                  <PricingFeature
                    included={true}
                    text="Memoria contextual y reconocimiento de tiempo"
                  />
                  <PricingFeature
                    included={true}
                    text="Dashboard con análisis comparativo"
                  />
                  <PricingFeature included={true} text="Exportación a Excel" />
                  <PricingFeature
                    included={true}
                    text="Soporte técnico prioritario"
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  className="w-full relative overflow-hidden group font-medium"
                  size="lg"
                  style={{
                    background:
                      "linear-gradient(45deg, var(--color-success-dark), var(--color-cyan))",
                  }}
                  onClick={() => (window.location.href = "/login")}
                >
                  <span className="absolute inset-0 bg-black/10 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
                  <span className="relative z-10 text-shadow-sm">
                    Comenzar Prueba Gratuita
                  </span>
                </Button>
              </CardFooter>
            </div>
          </Card>

          {/* Plan Empresas */}
          <Card className="glass-card backdrop-blur-sm relative flex flex-col transform transition-all duration-300 hover:translate-y-[-8px] hover:shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl md:text-2xl text-foreground text-shadow-sm">
                Plan Empresas
              </CardTitle>
              <CardDescription className="text-foreground/90">
                Para equipos y empresas
              </CardDescription>
              <div className="mt-4">
                <span className="text-3xl font-bold high-contrast-text-purple">
                  $200
                </span>
                <span className="text-foreground/90"> / usuario al año</span>
                <div className="text-sm text-foreground/80 mt-1">
                  Descuentos por volumen disponibles
                </div>
              </div>
            </CardHeader>
            <CardContent className="flex-grow">
              <div className="space-y-3">
                <PricingFeature
                  included={true}
                  text="Todo lo del Plan Premium"
                />
                <PricingFeature included={true} text="Acceso multiusuario" />
                <PricingFeature
                  included={true}
                  text="Reportes financieros personalizados"
                />
                <PricingFeature
                  included={true}
                  text="Control centralizado de gastos"
                />
                <PricingFeature
                  included={true}
                  text="Análisis financiero avanzado"
                />
                <PricingFeature
                  included={true}
                  text="Integración con sistemas contables"
                />
                <PricingFeature included={true} text="API personalizada" />
                <PricingFeature
                  included={true}
                  text="Licencia anual con renovación automática"
                />
                <PricingFeature
                  included={true}
                  text="Prioridad en nuevas funcionalidades"
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button
                variant="outline"
                className="w-full relative overflow-hidden group font-medium"
                size="lg"
                onClick={() =>
                  document
                    .getElementById("contacto")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                <span className="absolute inset-0 bg-white/5 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
                <span className="relative z-10 text-foreground">
                  Contactar Ventas
                </span>
              </Button>
            </CardFooter>
          </Card>
        </div>

        <div className="text-center mt-12">
          <p className="text-foreground mb-6 text-shadow-sm">
            ¿Tienes preguntas sobre nuestros planes?
            <a
              href="#contacto"
              className="text-success-dark hover:text-success/90 ml-1 font-medium"
            >
              Contáctanos
            </a>
          </p>
        </div>
      </div>

      {/* Overlay para mejorar contraste */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/50 to-background/80 pointer-events-none z-[1]"></div>

      {/* Background gradient effects */}
      <div
        className="absolute -bottom-40 -right-40 w-80 md:w-96 h-80 md:h-96 rounded-full blur-3xl opacity-20 animate-pulse-glow"
        style={{
          background:
            "radial-gradient(circle at center, var(--color-purple), transparent 70%)",
        }}
      ></div>
      <div
        className="absolute -top-40 -left-40 w-80 md:w-96 h-80 md:h-96 rounded-full blur-3xl opacity-20 animate-pulse-glow"
        style={{
          background:
            "radial-gradient(circle at center, var(--color-highlight), transparent 70%)",
          animationDelay: "1.5s",
        }}
      ></div>
    </section>
  );
};

export default Pricing;
