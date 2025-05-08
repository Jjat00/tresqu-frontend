
import React from "react";
import { Link } from "react-router-dom";
import Footer from "@/components/Footer";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const LegalNotice = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="border-b">
        <div className="container py-4 flex items-center">
          <Link to="/">
            <Button variant="ghost" size="sm" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Volver al inicio
            </Button>
          </Link>
        </div>
      </header>
      
      <main className="container py-8 flex-grow">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Aviso Legal</h1>
          
          <div className="prose prose-slate max-w-none">
            <p>Este Aviso Legal regula el uso del servicio del sitio web y aplicación móvil Tresqu, que Tresqu pone a disposición de los usuarios de Internet.</p>
            
            <h2 className="text-xl font-bold mt-6 mb-3">1. Información General</h2>
            <p>Tresqu es una aplicación web y móvil para la gestión de finanzas personales, operada por Tresqu, S.L., con domicilio social en España.</p>
            
            <h2 className="text-xl font-bold mt-6 mb-3">2. Condiciones de Uso</h2>
            <p>El acceso y utilización de esta aplicación otorga la condición de usuario, aceptando estas condiciones de uso. Si no estás de acuerdo con estas condiciones, deberás abstenerte de acceder o utilizar la aplicación.</p>
            
            <h2 className="text-xl font-bold mt-6 mb-3">3. Propiedad Intelectual e Industrial</h2>
            <p>Todos los contenidos de la aplicación, incluyendo textos, gráficos, imágenes, logotipos, iconos, software y cualquier otro material, son propiedad de Tresqu o de terceros que han autorizado su uso, y están protegidos por las leyes de propiedad intelectual e industrial.</p>
            
            <h2 className="text-xl font-bold mt-6 mb-3">4. Limitación de Responsabilidad</h2>
            <p>Tresqu no garantiza la disponibilidad y continuidad del funcionamiento de la aplicación. No será responsable por los daños y perjuicios causados al usuario como consecuencia de la indisponibilidad, fallos de acceso y falta de continuidad de la aplicación.</p>
            
            <h2 className="text-xl font-bold mt-6 mb-3">5. Política de Enlaces</h2>
            <p>La aplicación puede incluir enlaces a otras páginas web o servicios. Tresqu no ejerce ningún control sobre dichos sitios y contenidos, por lo que no asumirá responsabilidad alguna por los contenidos de algún enlace perteneciente a un sitio web ajeno.</p>
            
            <h2 className="text-xl font-bold mt-6 mb-3">6. Legislación Aplicable y Jurisdicción</h2>
            <p>Las presentes condiciones se rigen por la legislación española. Para la resolución de cualquier controversia que pudiera derivarse del acceso o la utilización de la aplicación, el usuario y Tresqu se someten a los Juzgados y Tribunales del domicilio del usuario.</p>
            
            <h2 className="text-xl font-bold mt-6 mb-3">7. Contacto</h2>
            <p>Para cualquier consulta relacionada con este Aviso Legal, puedes contactarnos en:</p>
            <p>📧 <a href="mailto:contacto@tresqu.com" className="text-primary hover:underline">contacto@tresqu.com</a></p>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default LegalNotice;
