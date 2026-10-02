import { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageDots from "@/components/PageDots";
import "@/styles/noche.css";

// Turquesa de la marca Cent: identifica todo lo que es de la alianza.
const CENT = "#3bbcc8";

const centInsurance = [
  "Gastos médicos por accidente: Hasta $50,000 MXN",
  "Gastos funerarios por accidente: Hasta $50,000 MXN",
  "Asesoría funeraria 24/7 (por cualquier causa)",
  "Servicio funerario completo (cremación o inhumación)",
  "Asistencias médicas, legales, psicológicas, nutricionales",
  "Taxi seguro, laboratorio a domicilio, enfermera, asistencia dental y visual",
  "Videollamada médica de emergencia",
  "Planes dentales y visuales gratuitos (consultas, exámenes y descuentos)",
  "Descuentos en clínicas, hospitales, laboratorios y farmacias",
];

const tresquPlan = [
  "Registro automático de gastos vía Telegram",
  "Categorización inteligente de transacciones",
  "Reportes financieros automáticos",
  "Análisis de patrones de gasto",
  "Alertas y notificaciones inteligentes",
  "Dashboard de control financiero",
  "CENT asiste x Tresqu ilimitado",
];

const Dot = ({ color, small = false }: { color: string; small?: boolean }) => (
  <span
    aria-hidden="true"
    className={`${small ? "mt-[9px] h-1 w-1" : "mt-2 h-2 w-2"} shrink-0 rounded-full`}
    style={{ background: color }}
  />
);

/** Página de la alianza Cent × Tresqu (solo español), estilo «Noche de puntos». */
const TresquCent = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="tq-page">
      <Header />

      <main className="tq-cent">
        <PageDots />

        <div className="tq-wrap tq-cent-inner">
          {/* Encabezado centrado */}
          <div className="text-center mb-16">
            <span className="tq-cent-pill">
              <span
                aria-hidden="true"
                className="h-2 w-2 rounded-full animate-pulse"
                style={{ background: CENT }}
              />
              Alianza Estratégica
            </span>
            <h1>
              Convierte tu cambio en inversión y controla tus gastos con
              inteligencia
            </h1>
            <p className="tq-lead">
              Explora cómo Cent y Tresqu juntos te ayudan a alcanzar tus metas
              financieras
            </p>
            {/* Botón principal CTA */}
            <div className="tq-ctas">
              <a
                href="https://wa.me/525564654393?text=Hola%2C%20me%20gustar%C3%ADa%20controlar%20mis%20finanzas%20gratis%20con%20la%20alianza%20Cent%20x%20Tresqu"
                target="_blank"
                rel="noopener noreferrer"
                className="tq-btn tq-btn-wa"
              >
                Controla tus finanzas gratis
              </a>
            </div>
          </div>

          {/* Logos de alianza */}
          <div className="flex items-center justify-center gap-6 sm:gap-8 mb-16">
            <div className="flex items-center gap-3 sm:gap-4">
              <img
                src="/logo_teal.png"
                alt="Cent Logo"
                className="h-14 w-14 sm:h-16 sm:w-16 object-contain"
              />
              <span
                className="hidden sm:inline text-2xl font-semibold tracking-[-0.02em]"
                style={{ color: CENT }}
              >
                CENT
              </span>
            </div>

            <div className="text-[#6f7489] text-xl sm:text-2xl font-light">×</div>

            <div className="flex items-center gap-3 sm:gap-4">
              <img
                src="/3q.png"
                alt="Tresqu Logo"
                className="h-12 w-12 sm:h-14 sm:w-14 rounded-xl object-contain"
              />
              <span className="hidden sm:inline text-2xl font-semibold tracking-[-0.02em] text-[#00FF7F]">
                TRESQU
              </span>
            </div>
          </div>

          {/* Sección con dos tarjetas comparativas */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5 mb-16">
            {/* Tarjeta 1: Plan CENT */}
            <div className="tq-surface relative flex flex-col p-6 sm:p-8">
              {/* Etiqueta "Completo" */}
              <span
                className="absolute top-6 right-6 rounded-full px-3 py-1 text-xs font-semibold text-black"
                style={{ background: CENT }}
              >
                Completo
              </span>

              <div className="flex items-center gap-3 mb-6">
                <img
                  src="/logo_teal.png"
                  alt="Cent Logo"
                  className="h-10 w-10 object-contain"
                />
                <div>
                  <h3>Plan CENT</h3>
                  <p className="text-sm font-medium" style={{ color: CENT }}>
                    $200 MXN/mes
                  </p>
                </div>
              </div>

              <div className="space-y-2.5 mb-8 flex-grow text-[15px]">
                <div className="flex items-start gap-3">
                  <Dot color={CENT} />
                  <p className="text-[#c9cee0]">Inversiones ilimitadas en CETES</p>
                </div>
                <div className="flex items-start gap-3">
                  <Dot color="#ffcf6b" />
                  <p className="text-[#c9cee0]">
                    <span className="font-semibold text-[#ffcf6b]">
                      Seguro CENT:
                    </span>{" "}
                    Microseguros CENT x THONA
                  </p>
                </div>
                <div className="ml-5 space-y-1.5">
                  {centInsurance.map((item) => (
                    <div key={item} className="flex items-start gap-2.5">
                      <Dot color="#ffcf6b" small />
                      <p className="text-[13px] leading-relaxed text-[#8a90a6]">
                        {item}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="flex items-start gap-3">
                  <Dot color="#00FF7F" />
                  <p className="text-[#c9cee0]">CENT asiste x Tresqu ilimitado</p>
                </div>
              </div>

              <a
                href="https://wa.me/525564654393?text=Hola%2C%20me%20gustar%C3%ADa%20adquirir%20el%20Plan%20CENT%20por%20%24200%20MXN%2Fmes"
                target="_blank"
                rel="noopener noreferrer"
                className="tq-btn tq-btn-sm tq-btn-cent w-full"
              >
                Obtener Plan CENT
              </a>
            </div>

            {/* Tarjeta 2: Plan Tresqu */}
            <div className="tq-surface flex flex-col p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-6">
                <img
                  src="/3q.png"
                  alt="Tresqu Logo"
                  className="h-10 w-10 rounded-lg object-contain"
                />
                <div>
                  <h3>Plan Tresqu</h3>
                  <p className="text-sm font-medium text-[#00FF7F]">
                    $100 MXN/mes
                  </p>
                </div>
              </div>

              <div className="space-y-2.5 mb-8 flex-grow text-[15px]">
                {tresquPlan.map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <Dot color="#00FF7F" />
                    <p className="text-[#c9cee0]">{item}</p>
                  </div>
                ))}
              </div>

              <a
                href="https://wa.me/525564654393?text=Hola%2C%20me%20gustar%C3%ADa%20adquirir%20el%20Plan%20Tresqu%20por%20%24100%20MXN%2Fmes"
                target="_blank"
                rel="noopener noreferrer"
                className="tq-btn tq-btn-sm tq-btn-wa w-full"
              >
                Próximamente disponible
              </a>
            </div>
          </div>

          {/* Sección de flujo de trabajo */}
          <div className="tq-surface mb-16 p-6 sm:p-10">
            <h2 className="text-center mb-10 sm:mb-12">
              ¿Cómo funciona la alianza?
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="text-center">
                <div
                  className="relative mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full border-2 bg-[#05060c]"
                  style={{ borderColor: CENT }}
                >
                  <img
                    src="/logo_teal.png"
                    alt="Cent Logo"
                    className="w-10 h-10 object-contain"
                  />
                  <span
                    className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold text-black"
                    style={{ background: CENT }}
                  >
                    1
                  </span>
                </div>
                <h3 className="mb-2">Paga con Cent</h3>
                <p className="text-sm leading-relaxed text-[#8a90a6]">
                  Usa tu número de teléfono para pagar en tiendas afiliadas y
                  convierte el cambio en inversión
                </p>
              </div>
              <div className="text-center">
                <div className="relative mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full border-2 border-[#00FF7F] bg-[#05060c]">
                  <img
                    src="/3q.png"
                    alt="Tresqu Logo"
                    className="w-10 h-10 rounded-lg object-contain"
                  />
                  <span className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-[#00FF7F] text-xs font-bold text-black">
                    2
                  </span>
                </div>
                <h3 className="mb-2">Registra con Tresqu</h3>
                <p className="text-sm leading-relaxed text-[#8a90a6]">
                  Envía un mensaje por WhatsApp o Telegram y Tresqu registrará
                  automáticamente tu gasto
                </p>
              </div>
              <div className="text-center">
                <div className="relative mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full border-2 border-[#6b5bff] bg-[#05060c]">
                  <div className="flex -space-x-1">
                    <img
                      src="/logo_teal.png"
                      alt="Cent Logo"
                      className="w-6 h-6 object-contain"
                    />
                    <img
                      src="/3q.png"
                      alt="Tresqu Logo"
                      className="w-6 h-6 rounded object-contain"
                    />
                  </div>
                  <span className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-[#6b5bff] text-xs font-bold text-white">
                    3
                  </span>
                </div>
                <h3 className="mb-2">Obtén insights</h3>
                <p className="text-sm leading-relaxed text-[#8a90a6]">
                  Recibe reportes detallados y análisis inteligente de tus hábitos
                  financieros
                </p>
              </div>
            </div>
          </div>

          {/* Sección final explicativa */}
          <div className="tq-surface mx-auto max-w-3xl p-6 sm:p-8 text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <span
                aria-hidden="true"
                className="h-2 w-2 rounded-full bg-[#3aa7ff] animate-pulse"
              />
              <span className="text-sm font-medium text-[#3aa7ff]">
                Prueba Piloto Activa
              </span>
            </div>
            <p className="mb-4 text-[15px] leading-relaxed text-[#c9cee0]">
              Tresqu es un asistente inteligente que transforma tus mensajes de
              WhatsApp y Telegram en reportes financieros automáticos y
              organizados.
            </p>
            <p className="text-[13px] text-[#6f7489]">
              Estamos validando esta alianza con usuarios seleccionados de Cent
              para crear la mejor experiencia financiera integral.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default TresquCent;
