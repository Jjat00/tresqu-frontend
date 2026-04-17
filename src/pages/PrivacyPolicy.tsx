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

          <div className="prose prose-slate max-w-none">
            <p>
              En Tresqu nos tomamos muy en serio tu privacidad. Esta Política de
              Privacidad describe cómo recopilamos, usamos, almacenamos,
              compartimos y protegemos tu información personal cuando utilizas
              nuestra aplicación. Aplicamos esta política conforme a las leyes
              de protección de datos aplicables en todas las jurisdicciones en
              las que operamos, incluyendo el Reglamento General de Protección
              de Datos (GDPR) de la Unión Europea y el California Consumer
              Privacy Act (CCPA) en EE.UU.
            </p>

            <h2 className="text-xl font-bold mt-6 mb-3">
              1. Información que Recopilamos
            </h2>
            <p>Recopilamos las siguientes categorías de información:</p>
            <ul className="list-disc pl-6 mb-4">
              <li>
                Información de identificación personal: Nombre, dirección de
                correo electrónico, número de teléfono (si se proporciona).
              </li>
              <li>
                Información financiera: Gastos ingresados, categorías, fechas,
                montos y cualquier nota asociada.
              </li>
              <li>
                Datos de uso: Interacciones con la app, funcionalidades
                utilizadas, preferencias del usuario.
              </li>
              <li>
                Información de mensajería: Texto o audios enviados al asistente
                virtual a través de Telegram, WhatsApp u otros canales
                habilitados.
              </li>
              <li>
                Datos de ubicación (opcional): Solo si se habilita
                explícitamente por el usuario.
              </li>
              <li>
                Datos de cuentas conectadas (opcional): Si el usuario habilita
                la integración con Gmail, accedemos a correos electrónicos con
                el único fin de detectar notificaciones de compra y registrar
                gastos automáticamente. Ver Sección 10 para el detalle
                completo.
              </li>
            </ul>

            <h2 className="text-xl font-bold mt-6 mb-3">
              2. Finalidades del Tratamiento
            </h2>
            <p>Utilizamos tus datos personales para:</p>
            <ul className="list-disc pl-6 mb-4">
              <li>Registrar y categorizar automáticamente tus gastos.</li>
              <li>
                Mostrar análisis, gráficas y reportes financieros
                personalizados.
              </li>
              <li>
                Mejorar el funcionamiento de la app mediante análisis anónimos
                de uso.
              </li>
              <li>
                Proporcionarte soporte técnico o responder a tus consultas.
              </li>
              <li>
                Enviar comunicaciones relevantes (solo si has otorgado
                consentimiento).
              </li>
              <li>Cumplir con nuestras obligaciones legales o regulatorias.</li>
            </ul>

            <h2 className="text-xl font-bold mt-6 mb-3">
              3. Base Legal del Tratamiento
            </h2>
            <p>
              Dependiendo de tu ubicación y la naturaleza de tu relación con
              nosotros, la base legal para el procesamiento de tus datos puede
              ser:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>Tu consentimiento explícito.</li>
              <li>
                La ejecución de un contrato, cuando el tratamiento sea necesario
                para prestarte el servicio.
              </li>
              <li>
                El interés legítimo de mejorar y proteger nuestra plataforma.
              </li>
              <li>El cumplimiento de una obligación legal.</li>
            </ul>

            <h2 className="text-xl font-bold mt-6 mb-3">
              4. Transferencias Internacionales de Datos
            </h2>
            <p>
              Podemos transferir tus datos personales a servidores ubicados en
              otros países. En caso de que estos países no tengan un nivel de
              protección equivalente, nos aseguramos de implementar garantías
              apropiadas, como cláusulas contractuales tipo aprobadas por
              autoridades regulatorias.
            </p>

            <h2 className="text-xl font-bold mt-6 mb-3">
              5. Retención de Datos
            </h2>
            <p>
              Tus datos personales se conservan mientras mantengas una cuenta
              activa. Si decides eliminar tu cuenta, todos tus datos serán
              borrados de manera segura dentro de un plazo razonable, salvo que
              la ley exija su conservación.
            </p>

            <h2 className="text-xl font-bold mt-6 mb-3">6. Seguridad</h2>
            <p>
              Adoptamos medidas técnicas y organizativas adecuadas para proteger
              tu información personal, incluyendo:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>Cifrado en tránsito y en reposo.</li>
              <li>
                Acceso restringido a datos por parte de personal autorizado.
              </li>
              <li>Monitoreo continuo de la seguridad y pruebas regulares.</li>
            </ul>

            <h2 className="text-xl font-bold mt-6 mb-3">
              7. Derechos del Usuario
            </h2>
            <p>
              De acuerdo con la legislación aplicable, puedes ejercer los
              siguientes derechos:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>Acceder a tus datos personales.</li>
              <li>Solicitar la corrección o eliminación de tus datos.</li>
              <li>
                Oponerte al tratamiento o solicitar la limitación del mismo.
              </li>
              <li>
                Portar tus datos a otro proveedor (derecho a la portabilidad).
              </li>
              <li>Retirar tu consentimiento en cualquier momento.</li>
              <li>
                Presentar una queja ante la autoridad competente en tu país.
              </li>
            </ul>
            <p>
              Para ejercer tus derechos, contáctanos en:{" "}
              <a
                href="mailto:contacto@tresqu.com"
                className="text-primary hover:underline"
              >
                contacto@tresqu.com
              </a>
            </p>

            <h2 className="text-xl font-bold mt-6 mb-3">
              8. Compartición de Datos con Terceros
            </h2>
            <p>
              No vendemos tu información personal. Solo compartimos datos con:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>
                Proveedores tecnológicos que nos asisten en el funcionamiento
                de la app, específicamente:
                <ul className="list-disc pl-6 mt-2">
                  <li>
                    <strong>OpenAI</strong> (procesamiento de lenguaje
                    natural): el contenido de los mensajes y correos se envía
                    de forma transitoria para extraer datos estructurados de
                    transacciones. OpenAI no utiliza estos datos para entrenar
                    sus modelos según sus términos para API.
                  </li>
                  <li>
                    <strong>Google Cloud / Gmail API</strong>: únicamente para
                    la integración opcional descrita en la Sección 10.
                  </li>
                  <li>
                    Proveedores de infraestructura cloud (bases de datos,
                    hosting).
                  </li>
                </ul>
              </li>
              <li>
                Autoridades competentes, si estamos legalmente obligados a
                hacerlo.
              </li>
            </ul>
            <p>
              Todos los terceros están sujetos a obligaciones contractuales de
              confidencialidad y seguridad.
            </p>

            <h2 className="text-xl font-bold mt-6 mb-3">
              9. Uso de Cookies y Tecnologías Similares
            </h2>
            <p>
              Si utilizas nuestra aplicación web, podemos utilizar cookies para:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>Recordar tus preferencias.</li>
              <li>Analizar el uso de la aplicación.</li>
              <li>Mejorar la experiencia de usuario.</li>
            </ul>
            <p>
              Puedes modificar tus preferencias de cookies en cualquier momento
              desde la configuración de tu navegador.
            </p>

            <h2 className="text-xl font-bold mt-6 mb-3">
              10. Integración con Google (Gmail)
            </h2>
            <p>
              Tresqu ofrece una funcionalidad opcional para detectar
              automáticamente compras a partir de correos de notificación
              enviados por bancos y comercios. Para habilitarla, el usuario
              debe otorgar acceso a su cuenta de Google mediante el flujo OAuth
              2.0 oficial de Google. Esta sección describe exactamente qué
              datos accedemos, cómo los usamos y cómo protegemos tu privacidad.
            </p>

            <h3 className="text-lg font-semibold mt-4 mb-2">
              10.1 Alcance del acceso solicitado
            </h3>
            <p>
              Solicitamos un único permiso (scope) de Google:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>
                <code>
                  https://www.googleapis.com/auth/gmail.readonly
                </code>{" "}
                — permite leer correos electrónicos y parámetros de
                configuración de la cuenta del usuario.
              </li>
            </ul>

            <h3 className="text-lg font-semibold mt-4 mb-2">
              10.2 Qué datos accedemos y cómo los usamos
            </h3>
            <ul className="list-disc pl-6 mb-4">
              <li>
                Leemos el cuerpo y los encabezados de correos que puedan ser
                notificaciones de compra (provenientes de bancos, tarjetas,
                plataformas de pago o comercios).
              </li>
              <li>
                El contenido del correo se procesa transitoriamente con un
                modelo de inteligencia artificial (OpenAI GPT) para extraer{" "}
                <strong>únicamente datos estructurados</strong> de la
                transacción: monto, fecha, nombre del comercio y tipo de
                transacción.
              </li>
              <li>
                Con esos datos creamos un registro de gasto en la cuenta del
                usuario dentro de Tresqu.
              </li>
            </ul>

            <h3 className="text-lg font-semibold mt-4 mb-2">
              10.3 Qué NO hacemos con tus datos de Gmail
            </h3>
            <ul className="list-disc pl-6 mb-4">
              <li>
                <strong>No almacenamos</strong> el cuerpo ni los encabezados
                originales del correo en nuestra base de datos.
              </li>
              <li>
                <strong>No leemos</strong> correos que no tengan indicios de
                ser notificaciones de compra.
              </li>
              <li>
                <strong>No usamos</strong> datos de Gmail para publicidad, ni
                para entrenar modelos de IA, ni para fines distintos a la
                funcionalidad aquí descrita.
              </li>
              <li>
                <strong>No vendemos ni transferimos</strong> datos de Gmail a
                terceros fuera de los proveedores técnicos estrictamente
                necesarios (OpenAI, para la extracción transitoria descrita en
                la sección 10.2).
              </li>
              <li>
                <strong>Ningún humano</strong> lee los correos, salvo que el
                usuario lo autorice explícitamente, que sea necesario por
                razones de seguridad, cumplimiento legal, o para operaciones
                internas agregadas y anonimizadas.
              </li>
            </ul>

            <h3 className="text-lg font-semibold mt-4 mb-2">
              10.4 Almacenamiento y retención
            </h3>
            <ul className="list-disc pl-6 mb-4">
              <li>
                Los tokens de OAuth del usuario se almacenan cifrados (Fernet /
                AES-128) en nuestra base de datos y nunca salen de nuestra
                infraestructura.
              </li>
              <li>
                Guardamos únicamente un identificador interno del correo
                procesado (<code>message_id</code>) para evitar procesar dos
                veces el mismo mensaje. Este identificador no contiene datos
                del contenido del correo.
              </li>
              <li>
                Los datos extraídos (monto, fecha, comercio) se almacenan junto
                con el resto de gastos del usuario, en una base de datos
                cifrada en reposo.
              </li>
              <li>
                Si el usuario elimina su cuenta o desconecta Gmail, los tokens
                y el historial de correos procesados se eliminan de forma
                inmediata.
              </li>
            </ul>

            <h3 className="text-lg font-semibold mt-4 mb-2">
              10.5 Cómo revocar el acceso a Gmail
            </h3>
            <p>
              El usuario puede revocar el acceso de Tresqu a Gmail en cualquier
              momento:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>
                Desde la app: <strong>Perfil → Conexiones → Desconectar Gmail</strong>.
              </li>
              <li>
                Desde Google directamente:{" "}
                <a
                  href="https://myaccount.google.com/permissions"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  https://myaccount.google.com/permissions
                </a>
              </li>
            </ul>
            <p>
              Al revocar el acceso, los tokens se eliminan, dejamos de procesar
              correos nuevos, y los gastos ya creados se mantienen en la
              cuenta del usuario porque son parte de su historial financiero.
            </p>

            <h3 className="text-lg font-semibold mt-4 mb-2">
              10.6 Cumplimiento con la política de Google
            </h3>
            <p>
              El uso y transferencia por parte de Tresqu de la información
              recibida desde las APIs de Google se adherirá a la{" "}
              <a
                href="https://developers.google.com/terms/api-services-user-data-policy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                Google API Services User Data Policy
              </a>
              , incluyendo los requisitos de{" "}
              <strong>Uso Limitado (Limited Use)</strong>. En particular:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>
                El uso de datos de Gmail está limitado a proveer la
                funcionalidad visible al usuario descrita en esta sección.
              </li>
              <li>
                Los datos no se transfieren a terceros salvo cuando es
                necesario para proveer o mejorar la funcionalidad, con el
                consentimiento expreso del usuario, o por obligación legal.
              </li>
              <li>Los datos no se usan para publicidad ni se venden.</li>
              <li>
                Los datos no son leídos por humanos, salvo las excepciones
                descritas en 10.3.
              </li>
            </ul>

            <h2 className="text-xl font-bold mt-6 mb-3">
              11. Cambios a Esta Política
            </h2>
            <p>
              Nos reservamos el derecho de modificar esta Política en cualquier
              momento. Te notificaremos de los cambios importantes a través de
              la app o por correo electrónico.
            </p>

            <h2 className="text-xl font-bold mt-6 mb-3">12. Contacto</h2>
            <p>
              Para cualquier consulta sobre esta Política de Privacidad, puedes
              contactarnos en:
            </p>
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

export default PrivacyPolicy;
