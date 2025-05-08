
import React from "react";
import { Link } from "react-router-dom";
import Footer from "@/components/Footer";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const PrivacyPolicy = () => {
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
          <h1 className="text-3xl font-bold mb-6">Política de Privacidad</h1>
          
          <div className="prose prose-slate max-w-none">
            <p>En Tresqu nos tomamos muy en serio tu privacidad. Esta Política de Privacidad describe cómo recopilamos, usamos, almacenamos, compartimos y protegemos tu información personal cuando utilizas nuestra aplicación. Aplicamos esta política conforme a las leyes de protección de datos aplicables en todas las jurisdicciones en las que operamos, incluyendo el Reglamento General de Protección de Datos (GDPR) de la Unión Europea y el California Consumer Privacy Act (CCPA) en EE.UU.</p>
            
            <h2 className="text-xl font-bold mt-6 mb-3">1. Información que Recopilamos</h2>
            <p>Recopilamos las siguientes categorías de información:</p>
            <ul className="list-disc pl-6 mb-4">
              <li>Información de identificación personal: Nombre, dirección de correo electrónico, número de teléfono (si se proporciona).</li>
              <li>Información financiera: Gastos ingresados, categorías, fechas, montos y cualquier nota asociada.</li>
              <li>Datos de uso: Interacciones con la app, funcionalidades utilizadas, preferencias del usuario.</li>
              <li>Información de mensajería: Texto o audios enviados al asistente virtual a través de Telegram, WhatsApp u otros canales habilitados.</li>
              <li>Datos de ubicación (opcional): Solo si se habilita explícitamente por el usuario.</li>
            </ul>
            
            <h2 className="text-xl font-bold mt-6 mb-3">2. Finalidades del Tratamiento</h2>
            <p>Utilizamos tus datos personales para:</p>
            <ul className="list-disc pl-6 mb-4">
              <li>Registrar y categorizar automáticamente tus gastos.</li>
              <li>Mostrar análisis, gráficas y reportes financieros personalizados.</li>
              <li>Mejorar el funcionamiento de la app mediante análisis anónimos de uso.</li>
              <li>Proporcionarte soporte técnico o responder a tus consultas.</li>
              <li>Enviar comunicaciones relevantes (solo si has otorgado consentimiento).</li>
              <li>Cumplir con nuestras obligaciones legales o regulatorias.</li>
            </ul>
            
            <h2 className="text-xl font-bold mt-6 mb-3">3. Base Legal del Tratamiento</h2>
            <p>Dependiendo de tu ubicación y la naturaleza de tu relación con nosotros, la base legal para el procesamiento de tus datos puede ser:</p>
            <ul className="list-disc pl-6 mb-4">
              <li>Tu consentimiento explícito.</li>
              <li>La ejecución de un contrato, cuando el tratamiento sea necesario para prestarte el servicio.</li>
              <li>El interés legítimo de mejorar y proteger nuestra plataforma.</li>
              <li>El cumplimiento de una obligación legal.</li>
            </ul>
            
            <h2 className="text-xl font-bold mt-6 mb-3">4. Transferencias Internacionales de Datos</h2>
            <p>Podemos transferir tus datos personales a servidores ubicados en otros países. En caso de que estos países no tengan un nivel de protección equivalente, nos aseguramos de implementar garantías apropiadas, como cláusulas contractuales tipo aprobadas por autoridades regulatorias.</p>
            
            <h2 className="text-xl font-bold mt-6 mb-3">5. Retención de Datos</h2>
            <p>Tus datos personales se conservan mientras mantengas una cuenta activa. Si decides eliminar tu cuenta, todos tus datos serán borrados de manera segura dentro de un plazo razonable, salvo que la ley exija su conservación.</p>
            
            <h2 className="text-xl font-bold mt-6 mb-3">6. Seguridad</h2>
            <p>Adoptamos medidas técnicas y organizativas adecuadas para proteger tu información personal, incluyendo:</p>
            <ul className="list-disc pl-6 mb-4">
              <li>Cifrado en tránsito y en reposo.</li>
              <li>Acceso restringido a datos por parte de personal autorizado.</li>
              <li>Monitoreo continuo de la seguridad y pruebas regulares.</li>
            </ul>
            
            <h2 className="text-xl font-bold mt-6 mb-3">7. Derechos del Usuario</h2>
            <p>De acuerdo con la legislación aplicable, puedes ejercer los siguientes derechos:</p>
            <ul className="list-disc pl-6 mb-4">
              <li>Acceder a tus datos personales.</li>
              <li>Solicitar la corrección o eliminación de tus datos.</li>
              <li>Oponerte al tratamiento o solicitar la limitación del mismo.</li>
              <li>Portar tus datos a otro proveedor (derecho a la portabilidad).</li>
              <li>Retirar tu consentimiento en cualquier momento.</li>
              <li>Presentar una queja ante la autoridad competente en tu país.</li>
            </ul>
            <p>Para ejercer tus derechos, contáctanos en: <a href="mailto:contacto@tresqu.com" className="text-primary hover:underline">contacto@tresqu.com</a></p>
            
            <h2 className="text-xl font-bold mt-6 mb-3">8. Compartición de Datos con Terceros</h2>
            <p>No vendemos tu información personal. Solo compartimos datos con:</p>
            <ul className="list-disc pl-6 mb-4">
              <li>Proveedores tecnológicos que nos asisten en el funcionamiento de la app (por ejemplo, servicios de nube, bases de datos, IA).</li>
              <li>Autoridades competentes, si estamos legalmente obligados a hacerlo.</li>
            </ul>
            <p>Todos los terceros están sujetos a obligaciones contractuales de confidencialidad y seguridad.</p>
            
            <h2 className="text-xl font-bold mt-6 mb-3">9. Uso de Cookies y Tecnologías Similares</h2>
            <p>Si utilizas nuestra aplicación web, podemos utilizar cookies para:</p>
            <ul className="list-disc pl-6 mb-4">
              <li>Recordar tus preferencias.</li>
              <li>Analizar el uso de la aplicación.</li>
              <li>Mejorar la experiencia de usuario.</li>
            </ul>
            <p>Puedes modificar tus preferencias de cookies en cualquier momento desde la configuración de tu navegador.</p>
            
            <h2 className="text-xl font-bold mt-6 mb-3">10. Cambios a Esta Política</h2>
            <p>Nos reservamos el derecho de modificar esta Política en cualquier momento. Te notificaremos de los cambios importantes a través de la app o por correo electrónico.</p>
            
            <h2 className="text-xl font-bold mt-6 mb-3">11. Contacto</h2>
            <p>Para cualquier consulta sobre esta Política de Privacidad, puedes contactarnos en:</p>
            <p>📧 <a href="mailto:contacto@tresqu.com" className="text-primary hover:underline">contacto@tresqu.com</a></p>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
