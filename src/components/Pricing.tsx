import { Check, X } from "lucide-react";
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
import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();

  const navigateToLogin = () => {
    navigate("/login");
  };

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
            Control financiero inteligente con IA avanzada
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
                Prueba Tresqu y descubre el control financiero inteligente
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
                  text="Registro Limitado: 20 gastos + 20 ingresos por mes"
                />
                <PricingFeature
                  included={true}
                  text="Bot Básico: Solo mensajes de texto (sin voz)"
                />
                <PricingFeature
                  included={true}
                  text="Estadísticas Simples: Totales mensuales básicos"
                />
                <PricingFeature
                  included={true}
                  text="Categorías Fijas: Solo categorías predefinidas"
                />
                <PricingFeature
                  included={true}
                  text="Multi-plataforma: WhatsApp + Telegram"
                />
                <PricingFeature
                  included={true}
                  text="Exportación Limitada: Solo datos del mes actual"
                />
                <PricingFeature
                  included={true}
                  text="Soporte Estándar: Respuesta en 48-72 horas"
                />
                <PricingFeature included={false} text="Metas de ahorro" />
                <PricingFeature included={false} text="Mensajes de voz" />
                <PricingFeature
                  included={false}
                  text="Procesamiento de fotos/facturas"
                />
                <PricingFeature
                  included={false}
                  text="Estadísticas avanzadas"
                />
                <PricingFeature
                  included={false}
                  text="Categorías personalizadas"
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button
                variant="outline"
                className="w-full relative overflow-hidden group font-medium"
                size="lg"
                onClick={navigateToLogin}
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
                ⭐ MÁS POPULAR
              </Badge>
            </div>
            <div className="glass-card backdrop-blur-sm h-full">
              <CardHeader>
                <CardTitle className="text-xl md:text-2xl text-foreground text-shadow-sm">
                  Plan Premium
                </CardTitle>
                <CardDescription className="text-foreground/90">
                  Control financiero completo sin límites + IA avanzada
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
                </div>
              </CardHeader>
              <CardContent className="flex-grow">
                <div className="space-y-3">
                  <div className="text-sm font-semibold text-success-dark mb-2">
                    TODO LO DEL BÁSICO +
                  </div>
                  <PricingFeature
                    included={true}
                    text="Registros Ilimitados: Sin límites mensuales"
                  />
                  <PricingFeature
                    included={true}
                    text="Metas de Ahorro: Sistema completo con 25+ funcionalidades"
                  />
                  <PricingFeature
                    included={true}
                    text="Mensajes de Voz: Transcripción automática con IA"
                  />
                  <PricingFeature
                    included={true}
                    text="Procesamiento de Fotos: Sube fotos de recibos y facturas"
                  />
                  <PricingFeature
                    included={true}
                    text="Extracción de Facturas: IA extrae monto, fecha y concepto"
                  />
                  <PricingFeature
                    included={true}
                    text="Análisis de Documentos: Procesa PDFs de estados de cuenta"
                  />

                  <PricingFeature
                    included={true}
                    text="Analytics Avanzados: Tendencias, patrones y recomendaciones"
                  />
                  <PricingFeature
                    included={true}
                    text="Categorías Personalizadas: Crea tus propias categorías"
                  />
                  <PricingFeature
                    included={true}
                    text="Exportación Completa: TODO tu historial en múltiples formatos"
                  />
                  <PricingFeature
                    included={true}
                    text="Búsqueda Inteligente: Encuentra gastos similares con IA"
                  />
                  <PricingFeature
                    included={true}
                    text="Soporte Prioritario: Respuesta en 4-8 horas"
                  />
                  <PricingFeature
                    included={true}
                    text="Reportes Detallados: Análisis profundo de tus finanzas"
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
                    Comenzar Premium
                  </span>
                </Button>
              </CardFooter>
            </div>
          </Card>

          {/* Plan Business */}
          <Card className="glass-card backdrop-blur-sm relative flex flex-col transform transition-all duration-300 hover:translate-y-[-8px] hover:shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl md:text-2xl text-foreground text-shadow-sm">
                Plan Business
              </CardTitle>
              <CardDescription className="text-foreground/90">
                Gestión financiera para equipos y empresas + IA empresarial
              </CardDescription>
              <div className="mt-4">
                <span className="text-3xl font-bold high-contrast-text-purple">
                  $25
                </span>
                <span className="text-foreground/90"> / mes</span>
                <div className="text-sm text-foreground/80 mt-1">
                  Hasta 5 usuarios incluidos
                </div>
              </div>
            </CardHeader>
            <CardContent className="flex-grow">
              <div className="space-y-3">
                <div className="text-sm font-semibold text-success-dark mb-2">
                  TODO LO DEL PREMIUM +
                </div>
                <PricingFeature
                  included={true}
                  text="Hasta 5 Usuarios: Gestión de equipos completa"
                />
                <PricingFeature
                  included={true}
                  text="Organizaciones: Crea y administra tu empresa"
                />
                <PricingFeature
                  included={true}
                  text="Reportes Corporativos: Consolidados de todo el equipo"
                />
                <PricingFeature
                  included={true}
                  text="Invitaciones: Gestión de miembros por email"
                />
                <PricingFeature
                  included={true}
                  text="Analytics Empresariales: Métricas de equipo y departamentos"
                />
                <PricingFeature
                  included={true}
                  text="Metas Grupales: Objetivos de ahorro compartidos"
                />
                <PricingFeature
                  included={true}
                  text="Soporte VIP: Respuesta en 1-2 horas + llamadas"
                />
                <PricingFeature
                  included={true}
                  text="Seguridad Avanzada: Roles y permisos granulares"
                />
                <PricingFeature
                  included={true}
                  text="Reportes Personalizados: Diseña reportes específicos"
                />
                <PricingFeature
                  included={true}
                  text="Procesamiento Masivo: Múltiples facturas simultáneamente"
                />
                <PricingFeature
                  included={true}
                  text="Validación Cruzada: IA detecta duplicados entre miembros"
                />
                <PricingFeature
                  included={true}
                  text="Auditoría Inteligente: Detecta gastos inusuales"
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
                  Comenzar Prueba Business
                </span>
              </Button>
            </CardFooter>
          </Card>
        </div>

        <div className="text-center mt-12">
          <p className="text-foreground mb-6 text-shadow-sm">
            <strong>Funcionalidad Exclusiva de IA:</strong> "Foto y Listo" -
            Toma foto al recibo, la IA hace el resto
          </p>
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
