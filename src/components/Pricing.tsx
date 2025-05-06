
import React from "react";
import { Check, X } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const PricingFeature = ({ included, text }: { included: boolean; text: string }) => {
  return (
    <div className="flex items-center gap-2 text-sm">
      {included ? (
        <Check className="h-4 w-4 text-success" />
      ) : (
        <X className="h-4 w-4 text-muted-foreground" />
      )}
      <span className={included ? "text-foreground" : "text-muted-foreground"}>
        {text}
      </span>
    </div>
  );
};

const Pricing = () => {
  return (
    <section id="pricing" className="relative overflow-hidden py-16 md:py-24 lg:py-28">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-3 font-display">
            Planes para todo tipo de usuario
          </h2>
          <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto">
            Elige el plan que mejor se adapte a tus necesidades financieras
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Plan Básico */}
          <Card className="border-border bg-card/50 backdrop-blur-sm relative flex flex-col">
            <CardHeader>
              <CardTitle className="text-xl md:text-2xl">Plan Básico</CardTitle>
              <CardDescription>Para usuarios que inician</CardDescription>
              <div className="mt-4">
                <span className="text-3xl font-bold">Gratis</span>
                <span className="text-muted-foreground"> - para siempre</span>
              </div>
            </CardHeader>
            <CardContent className="flex-grow">
              <div className="space-y-3">
                <PricingFeature included={true} text="Registro de ingresos y gastos " />
                <PricingFeature included={true} text="Estadísticas básicas" />                                                              
                <PricingFeature included={true} text="Interacción por texto en WhatsApp/Telegram" />
                <PricingFeature included={false} text="Exportación de datos" />
                <PricingFeature included={false} text="Interacción por voz" />
                <PricingFeature included={false} text="Soporte prioritario" />
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full" size="lg">
                Comenzar Gratis
              </Button>
            </CardFooter>
          </Card>

          {/* Plan Premium */}
          <Card className="border-success/20 bg-gradient-to-b from-background/90 to-background/80 backdrop-blur-sm shadow-lg shadow-success/5 relative flex flex-col">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <Badge className="bg-success text-white hover:bg-success/90">Recomendado</Badge>
            </div>
            <CardHeader>
              <CardTitle className="text-xl md:text-2xl">Plan Premium</CardTitle>
              <CardDescription>Para usuarios avanzados</CardDescription>
              <div className="mt-4 space-y-1">
                <div>
                  <span className="text-3xl font-bold">$5</span>
                  <span className="text-muted-foreground"> / mes</span>
                </div>
                <div className="text-sm text-muted-foreground">
                  ó $50 anual (20% descuento)
                </div>
              </div>
            </CardHeader>
            <CardContent className="flex-grow">
              <div className="space-y-3">
                <PricingFeature included={true} text="analisis financiero con IA " />
                <PricingFeature included={true} text="Registro de ingresos, gastos , deudas y ahorros " />
                <PricingFeature included={true} text="Estadísticas detalladas y avanzadas" />
                <PricingFeature included={true} text="Reportes semanales, mensuales y anuales" />
                <PricingFeature included={true} text="Sin límite de registros" />
                <PricingFeature included={true} text="Planificación de deudas con alertas" />
                <PricingFeature included={true} text="Seguimiento de metas de ahorro" />
                <PricingFeature included={true} text="Exportación a PDF y Excel" />
                <PricingFeature included={true} text="Interacción por voz con el bot" />
                <PricingFeature included={true} text="Soporte técnico prioritario" />
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full bg-success hover:bg-success/90" size="lg">
                Suscribirse
              </Button>
            </CardFooter>
          </Card>

          {/* Plan Empresas */}
          <Card className="border-border bg-card/50 backdrop-blur-sm relative flex flex-col">
            <CardHeader>
              <CardTitle className="text-xl md:text-2xl">Plan Empresas</CardTitle>
              <CardDescription>Para equipos y empresas</CardDescription>
              <div className="mt-4">
                <span className="text-3xl font-bold">$200</span>
                <span className="text-muted-foreground"> / usuario al año</span>
                <div className="text-sm text-muted-foreground mt-1">
                  Descuentos por volumen disponibles
                </div>
              </div>
            </CardHeader>
            <CardContent className="flex-grow">
              <div className="space-y-3">
                <PricingFeature included={true} text="Todo lo del Plan Premium" />
                <PricingFeature included={true} text="Acceso multiusuario" />
                <PricingFeature included={true} text="Informes financieros personalizados" />
                <PricingFeature included={true} text="Control centralizado de gastos" />
                <PricingFeature included={true} text="Licencia anual con renovación automática" />
                <PricingFeature included={true} text="Prioridad en nuevas funcionalidades" />
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full" size="lg">
                Contactar Ventas
              </Button>
            </CardFooter>
          </Card>
        </div>

        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-6">
            ¿Tienes preguntas sobre nuestros planes? 
            <a href="#contacto" className="text-success hover:text-success/90 ml-1">Contáctanos</a>
          </p>
        </div>
      </div>

      {/* Background gradient effects */}
      <div className="absolute -bottom-40 -right-40 w-60 md:w-80 h-60 md:h-80 bg-highlight/20 rounded-full blur-3xl opacity-20"></div>
    </section>
  );
};

export default Pricing;
