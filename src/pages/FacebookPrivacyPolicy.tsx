import { Link } from "react-router-dom";
import Footer from "@/components/Footer";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const FacebookPrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="border-b">
        <div className="container py-4 flex items-center">
          <Link to="/">
            <Button
              variant="ghost"
              size="sm"
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Volver al inicio
            </Button>
          </Link>
        </div>
      </header>

      <main className="container p-8 flex-grow">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Política de Privacidad</h1>
          <p className="text-muted-foreground mb-8">
            Fecha de última actualización: 17 de septiembre de 2025
          </p>

          <div className="prose prose-slate max-w-none">
            <p>
              Tu privacidad es importante para nosotros. Esta Política de
              Privacidad explica cómo recopilamos, usamos y protegemos tu
              información cuando utilizas nuestra aplicación y servicios,
              incluyendo aquellos que utilizan Facebook Login y Facebook Lead
              Ads.
            </p>

            <h2 className="text-xl font-bold mt-6 mb-3">
              1. Información que recopilamos
            </h2>
            <p>
              Podemos recopilar la siguiente información a través de Facebook:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>Nombre y apellidos</li>
              <li>Correo electrónico</li>
              <li>Otra información pública de tu perfil de Facebook</li>
              <li>
                Datos proporcionados a través de formularios de Facebook Lead
                Ads
              </li>
            </ul>

            <h2 className="text-xl font-bold mt-6 mb-3">
              2. Uso de la información
            </h2>
            <p>Utilizamos la información recopilada para:</p>
            <ul className="list-disc pl-6 mb-4">
              <li>Proporcionar y mejorar nuestros servicios</li>
              <li>Comunicarnos contigo</li>
              <li>Personalizar tu experiencia</li>
            </ul>

            <h2 className="text-xl font-bold mt-6 mb-3">
              3. Compartir información
            </h2>
            <p>
              No compartimos tu información personal con terceros, excepto
              cuando sea necesario para cumplir con la ley o proteger nuestros
              derechos.
            </p>

            <h2 className="text-xl font-bold mt-6 mb-3">4. Seguridad</h2>
            <p>
              Tomamos medidas razonables para proteger tu información personal
              contra el acceso no autorizado, alteración, divulgación o
              destrucción.
            </p>

            <h2 className="text-xl font-bold mt-6 mb-3">5. Tus derechos</h2>
            <p>
              Puedes solicitar acceso, corrección o eliminación de tu
              información personal contactándonos a{" "}
              <a
                href="mailto:contacto@tresqu.com"
                className="text-primary hover:underline"
              >
                contacto@tresqu.com
              </a>
              .
            </p>

            <h2 className="text-xl font-bold mt-6 mb-3">
              6. Cambios en la política
            </h2>
            <p>
              Nos reservamos el derecho de modificar esta política en cualquier
              momento. Los cambios serán publicados en esta página.
            </p>

            <h2 className="text-xl font-bold mt-6 mb-3">Contacto</h2>
            <p>
              Si tienes preguntas sobre esta política, puedes contactarnos en{" "}
              <a
                href="mailto:contacto@tresqu.com"
                className="text-primary hover:underline"
              >
                contacto@tresqu.com
              </a>
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default FacebookPrivacyPolicy;
