import { Link } from "react-router-dom";
import Footer from "@/components/Footer";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const LegalNotice = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="border-b">
        <div className="container p-4 flex items-center">
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
          <h1 className="text-3xl font-bold mb-6">
            Términos y Condiciones de Uso – Tresqu
          </h1>
          <p className="text-muted-foreground mb-8">
            Última actualización: 7 de mayo de 2025
          </p>

          <div className="prose prose-slate max-w-none">
            <p>
              Al acceder y utilizar Tresqu, aceptas cumplir con estos Términos y
              Condiciones de Uso. Si no estás de acuerdo con alguno de estos
              términos, por favor no utilices la App.
            </p>

            <h2 className="text-xl font-bold mt-6 mb-3">
              1. Descripción del Servicio
            </h2>
            <p>
              Tresqu es una aplicación diseñada para ayudarte a registrar,
              organizar y visualizar tus gastos personales, ofreciendo funciones
              como categorización automática, análisis de hábitos financieros y
              asistencia mediante inteligencia artificial.
            </p>

            <h2 className="text-xl font-bold mt-6 mb-3">
              2. Aceptación del Usuario
            </h2>
            <p>El uso de esta App implica que el usuario:</p>
            <p>Ha leído, entendido y aceptado estos términos.</p>

            <h2 className="text-xl font-bold mt-6 mb-3">
              3. Registro y Seguridad de la Cuenta
            </h2>
            <p>
              Para acceder a ciertas funciones, podrías necesitar registrarte o
              identificarte mediante un canal autorizado (por ejemplo, Telegram
              o WhatsApp). El usuario es responsable de mantener la
              confidencialidad de sus credenciales y de toda la actividad que
              ocurra bajo su cuenta.
            </p>

            <h2 className="text-xl font-bold mt-6 mb-3">4. Uso Permitido</h2>
            <p>El usuario se compromete a:</p>
            <p>No usar la App con fines fraudulentos o ilegales.</p>
            <p>No intentar acceder a sistemas o datos restringidos.</p>
            <p>No interferir con el funcionamiento técnico del servicio.</p>
            <p>
              Podremos suspender o cancelar el acceso si se detecta uso
              indebido.
            </p>

            <h2 className="text-xl font-bold mt-6 mb-3">
              5. Propiedad Intelectual
            </h2>
            <p>
              Todos los contenidos, marcas, interfaces y código fuente de esta
              App son propiedad de Tresqu o sus licenciantes, y están protegidos
              por las leyes de propiedad intelectual. El uso de la App no otorga
              ningún derecho de propiedad sobre su contenido.
            </p>

            <h2 className="text-xl font-bold mt-6 mb-3">
              5. Limitación de Responsabilidad
            </h2>
            <p>
              Brindamos la App "tal cual", sin garantías de funcionamiento
              ininterrumpido o libre de errores. No somos responsables por
              pérdidas económicas directas o indirectas causadas por el uso de
              la App o las decisiones que tomes con base en los datos que ella
              genera.
            </p>

            <h2 className="text-xl font-bold mt-6 mb-3">
              6. Integraciones de Terceros
            </h2>
            <p>
              La App puede incluir conexiones con servicios de terceros (por
              ejemplo: Supabase, OpenAI, Telegram). No nos responsabilizamos por
              el contenido, seguridad ni funcionamiento de estos servicios.
            </p>

            <h2 className="text-xl font-bold mt-6 mb-3">
              7. Cambios en el Servicio
            </h2>
            <p>
              Podemos modificar o descontinuar funciones en cualquier momento.
              Cualquier cambio relevante en el servicio gratuito o el
              lanzamiento de funciones Premium será comunicado previamente al
              usuario.
            </p>

            <h2 className="text-xl font-bold mt-6 mb-3">
              8. Legislación Aplicable
            </h2>
            <p>
              Estos términos se rigen por las leyes del país en el que resides o
              desde donde usas el servicio. En caso de disputa, se procurará una
              solución amistosa. Si no es posible, será resuelta por los
              tribunales competentes según la jurisdicción correspondiente.
            </p>

            <h2 className="text-xl font-bold mt-6 mb-3">
              9. Protección de Datos – Usuarios en la Unión Europea (GDPR)
            </h2>
            <p>
              Si resides en la Unión Europea, tienes los siguientes derechos
              según el Reglamento General de Protección de Datos (GDPR):
            </p>
            <p>Acceso, rectificación o eliminación de tus datos.</p>
            <p>Oposición o limitación al procesamiento.</p>
            <p>Portabilidad de tus datos a otro proveedor.</p>
            <p>
              Retiro del consentimiento sin afectar la legalidad del tratamiento
              previo.
            </p>
            <p>Para ejercer tus derechos, contáctanos a: contacto@tresqu.com</p>

            <h2 className="text-xl font-bold mt-6 mb-3">10. Contacto</h2>
            <p>Para soporte o notificaciones legales:</p>
            <p>
              📧{" "}
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

export default LegalNotice;
