import { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const TresquCent = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="min-h-screen bg-background text-foreground relative overflow-hidden">
      {/* Efectos de fondo globales - combinando estilos de Cent y Tresqu */}
      <div className="fixed inset-0 z-[-2] opacity-50 pointer-events-none">
        <div
          className="absolute top-0 left-0 w-full h-full pointer-events-none"
          style={{
            background:
              "radial-gradient(circle at 25% 25%, rgba(59, 188, 200, 0.1), transparent 40%)",
          }}
        ></div>
        <div
          className="absolute bottom-0 right-0 w-full h-full pointer-events-none"
          style={{
            background:
              "radial-gradient(circle at 75% 75%, rgba(74, 222, 128, 0.1), transparent 40%)",
          }}
        ></div>
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none"
          style={{
            background:
              "radial-gradient(circle at center, rgba(96, 165, 250, 0.05), transparent 50%)",
          }}
        ></div>
      </div>

      {/* Patrón sutil de puntos o rejilla */}
      <div
        className="fixed inset-0 z-[-2] opacity-5 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(rgba(255, 255, 255, 0.15) 1px, transparent 1px)`,
          backgroundSize: "30px 30px",
        }}
      ></div>

      <Header />

      {/* Contenido principal */}
      <div className="container max-w-6xl mx-auto px-4 py-20 md:py-32">
        {/* Encabezado centrado */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-gray-800/50 backdrop-blur-sm border border-gray-700 px-4 py-2 rounded-full mb-6">
            <div className="w-3 h-3 bg-[#3bbcc8] rounded-full animate-pulse"></div>
            <span className="text-sm text-gray-300">Alianza Estratégica</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-6 leading-tight animate-fade-up">
            Convierte tu cambio en inversión y controla tus gastos con
            inteligencia
          </h1>
          <p className="text-gray-400 text-lg max-w-3xl mx-auto">
            Explora cómo Cent y Tresqu juntos te ayudan a alcanzar tus metas
            financieras
          </p>
        </div>

        {/* Logos de alianza */}
        <div className="flex items-center justify-center gap-6 sm:gap-8 mb-16">
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Logo Cent - usando el logo real */}
            <div className="w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center">
              <img
                src="/logo_teal.png"
                alt="Cent Logo"
                className="w-full h-full object-contain"
              />
            </div>
            <span className="hidden sm:inline text-2xl font-bold text-[#3bbcc8]">
              CENT
            </span>
          </div>

          <div className="text-gray-400 text-xl sm:text-2xl font-light">×</div>

          <div className="flex items-center gap-3 sm:gap-4">
            {/* Logo Tresqu - usando el logo real */}
            <div className="w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center">
              <img
                src="/3q.png"
                alt="Tresqu Logo"
                className="w-full h-full object-contain"
              />
            </div>
            <span className="hidden sm:inline text-2xl font-bold text-success">
              TRESQU
            </span>
          </div>
        </div>

        {/* Sección con dos tarjetas comparativas */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-16">
          {/* Tarjeta 1: Plan CENT */}
          <div className="bg-gray-800 p-4 sm:p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 border border-gray-700 hover:border-[#3bbcc8]/50 relative flex flex-col">
            {/* Etiqueta "Completo" */}
            <div className="absolute top-4 right-4 bg-[#3bbcc8] text-white text-xs font-semibold px-3 py-1 rounded-full">
              Completo
            </div>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 flex items-center justify-center">
                <img
                  src="/logo_teal.png"
                  alt="Cent Logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white">Plan CENT</h3>
                <p className="text-[#3bbcc8] text-sm font-medium">
                  $200 MXN/mes
                </p>
              </div>
            </div>

            <div className="space-y-2 mb-6 flex-grow">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-[#3bbcc8] rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-sm text-gray-300">
                  Inversiones ilimitadas en CETES
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-sm text-gray-300">
                  <span className="font-semibold text-yellow-400">
                    Seguro CENT:
                  </span>{" "}
                  Microseguros CENT x THONA
                </p>
              </div>
              <div className="ml-5 space-y-1">
                <div className="flex items-start gap-2">
                  <div className="w-1 h-1 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-xs text-gray-400">
                    Gastos médicos por accidente: Hasta $50,000 MXN
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-1 h-1 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-xs text-gray-400">
                    Gastos funerarios por accidente: Hasta $50,000 MXN
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-1 h-1 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-xs text-gray-400">
                    Asesoría funeraria 24/7 (por cualquier causa)
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-1 h-1 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-xs text-gray-400">
                    Servicio funerario completo (cremación o inhumación)
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-1 h-1 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-xs text-gray-400">
                    Asistencias médicas, legales, psicológicas, nutricionales
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-1 h-1 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-xs text-gray-400">
                    Taxi seguro, laboratorio a domicilio, enfermera, asistencia
                    dental y visual
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-1 h-1 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-xs text-gray-400">
                    Videollamada médica de emergencia
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-1 h-1 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-xs text-gray-400">
                    Planes dentales y visuales gratuitos (consultas, exámenes y
                    descuentos)
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-1 h-1 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-xs text-gray-400">
                    Descuentos en clínicas, hospitales, laboratorios y farmacias
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-success rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-sm text-gray-300">
                  CENT asiste x Tresqu ilimitado
                </p>
              </div>
            </div>

            <a
              href="https://play.google.com/store/apps/details?id=com.centapp.mx&hl=es_CO"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block w-full"
            >
              <button className="w-full bg-[#3bbcc8] hover:bg-[#3bbcc8]/80 text-white py-3 px-4 rounded-md transition-colors font-medium">
                Descargar Cent
              </button>
            </a>
          </div>

          {/* Tarjeta 2: Plan Tresqu */}
          <div className="bg-gray-800 p-4 sm:p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 border border-gray-700 hover:border-success/50 flex flex-col">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 flex items-center justify-center">
                <img
                  src="/3q.png"
                  alt="Tresqu Logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white">
                  Plan Tresqu
                </h3>
                <p className="text-success text-sm font-medium">$</p>
              </div>
            </div>

            <div className="space-y-3 mb-6 flex-grow">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-success rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-sm text-gray-300">
                  CENT asiste x Tresqu ilimitado
                </p>
              </div>
            </div>

            <Link to="/login" className="inline-block w-full">
              <button className="w-full bg-success hover:bg-success/80 text-white py-3 px-4 rounded-md transition-colors font-medium">
                Empezar Gratis
              </button>
            </Link>
          </div>
        </div>

        {/* Sección de flujo de trabajo */}
        <div className="mb-16 bg-gray-900/50 backdrop-blur-sm rounded-3xl p-4 sm:p-6 lg:p-8 border border-gray-700">
          <h2 className="text-xl sm:text-2xl font-bold text-white text-center mb-8 sm:mb-12">
            ¿Cómo funciona la alianza?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4 relative border-2 border-[#3bbcc8]">
                <img
                  src="/logo_teal.png"
                  alt="Cent Logo"
                  className="w-10 h-10 object-contain"
                />
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-[#3bbcc8] rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">1</span>
                </div>
              </div>
              <h3 className="text-base sm:text-lg font-semibold text-white mb-2">
                Paga con Cent
              </h3>
              <p className="text-gray-300 text-xs sm:text-sm">
                Usa tu número de teléfono para pagar en tiendas afiliadas y
                convierte el cambio en inversión
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4 relative border-2 border-success">
                <img
                  src="/3q.png"
                  alt="Tresqu Logo"
                  className="w-10 h-10 object-contain"
                />
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-success rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">2</span>
                </div>
              </div>
              <h3 className="text-base sm:text-lg font-semibold text-white mb-2">
                Registra con Tresqu
              </h3>
              <p className="text-gray-300 text-xs sm:text-sm">
                Envía un mensaje por Telegram y Tresqu registrará
                automáticamente tu gasto
                {/* Temporalmente solo disponible Telegram por problemas con WhatsApp */}
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4 relative border-2 border-purple-500">
                <div className="flex -space-x-1">
                  <img
                    src="/logo_teal.png"
                    alt="Cent Logo"
                    className="w-6 h-6 object-contain"
                  />
                  <img
                    src="/3q.png"
                    alt="Tresqu Logo"
                    className="w-6 h-6 object-contain"
                  />
                </div>
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">3</span>
                </div>
              </div>
              <h3 className="text-base sm:text-lg font-semibold text-white mb-2">
                Obtén insights
              </h3>
              <p className="text-gray-300 text-xs sm:text-sm">
                Recibe reportes detallados y análisis inteligente de tus hábitos
                financieros
              </p>
            </div>
          </div>
        </div>

        {/* Sección final explicativa */}
        <div className="text-center">
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700 max-w-3xl mx-auto">
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-blue-400">
                Prueba Piloto Activa
              </span>
            </div>
            <p className="text-gray-300 text-sm mb-4">
              Tresqu es un asistente inteligente que transforma tus mensajes de
              Telegram en reportes financieros automáticos y organizados.
              {/* Temporalmente solo disponible Telegram por problemas con WhatsApp */}
            </p>
            <p className="text-gray-400 text-xs">
              Estamos validando esta alianza con usuarios seleccionados de Cent
              para crear la mejor experiencia financiera integral.
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
};

export default TresquCent;
