# Tresqu - Asistente Financiero Inteligente

Tresqu es una plataforma de gestión financiera personal potenciada por **Inteligencia Artificial**, diseñada para ayudarte a controlar tus gastos e ingresos de forma automática e inteligente.

## Features de IA - Vistas Públicas

### Página Principal (`/`)
- **Información sobre Tresqu**: Descripción del asistente inteligente
- **CTA (Call-to-Action)**: Acceso directo al servicio financiero
- **Características IA Destacadas**:
  - Registro automático de gastos vía Telegram/WhatsApp con IA
  - Categorización inteligente de transacciones automática
  - Reportes financieros automáticos generados por IA
  - Análisis de patrones de gasto con machine learning
  - Alertas inteligentes personalizadas
  - Insights financieros basados en datos

---

## Features de IA - Vistas Privadas (Dashboard)

### Chat Inteligente (Asistente Tresqu)
Accesible desde cualquier página del dashboard:

#### Capacidades de Reconocimiento y Síntesis
- **Reconocimiento de Voz**: Envía comandos mediante voz
- **Síntesis de Texto**: El asistente responde con audio
- **Interfaz Natural**: Conversación fluida y natural

#### Análisis y Categorización Automática
- **Detección de Gastos**: Entiende automáticamente cuando registras un gasto
  - Ejemplo: "Gasté $500 en comida" → Categoriza como "Alimentación"
- **Identificación de Ingresos**: Reconoce registros de ingresos
  - Ejemplo: "Recibí $2,000 de mi sueldo"
- **Clasificación Inteligente**: Categoriza transacciones por contexto
  - Transporte: Uber, taxi, bus
  - Alimentación: comida, restaurante, supermercado
  - Entretenimiento: Netflix, cine, juegos
  - Servicios: luz, agua, internet

#### Análisis Financiero Avanzado
- **Resumen de Gastos Mensuales**: "¿Cuánto gasté este mes?"
- **Desglose por Categorías**: Análisis automático de dónde va tu dinero
- **Cálculo de Ahorros**: Estimación inteligente de potencial de ahorro
- **Planes de Pago Optimizados**: Sugerencias para deudas y préstamos
- **Comparativas de Períodos**: Análisis comparativo mes a mes

#### Inteligencia Predictiva
- **Patrones de Gasto**: Análisis automático de hábitos financieros
- **Recomendaciones Personalizadas**:
  - Reducción de gastos en categorías específicas
  - Estrategias de pago de deudas
  - Oportunidades de ahorro
- **Benchmarking**: Comparación con el mes anterior
- **Metas Financieras**: Creación de planes de ahorro personalizados

### Dashboard Analítico
- **Gráficos Inteligentes**: Visualización automática de datos
  - Gráficos de pastel por categorías
  - Gráficos de línea de tendencias
  - Gráficos de barras comparativos
- **Colores Personalizados**: Cada categoría tiene su propia identidad visual
- **Estadísticas en Tiempo Real**: Métricas actualizadas automáticamente

### Categorías Personalizadas con IA
- **Categorización Híbrida**: Sistema predefinido + categorías personalizadas
- **Categorías Inteligentes**: El asistente sugiere categorías basadas en el contexto
- **Gestión Automática**:
  - Crear categorías personalizadas
  - Editar propiedades (nombre, color, descripción)
  - Estadísticas de uso automáticas
  - Búsqueda en tiempo real

### Análisis de Ingresos y Gastos
- **Predicción de Tendencias**: Basada en patrones históricos
- **Distribución Automática**: Análisis de dónde va tu dinero
- **Alertas Inteligentes**: Notificaciones cuando se sobrepasan límites
- **Reportes Automáticos**: Generados por IA, listos para revisar

### Perfil Personalizado
- **Preferencias de IA**: Configuración de recomendaciones
- **Historial Inteligente**: Registro automático de todas tus transacciones
- **Sincronización**: Datos consistentes en todos los dispositivos

---

## Cómo Usar los Features de IA

### Chatbot Inteligente
1. Abre el chat desde cualquier página (ícono en esquina inferior)
2. Habla o escribe: "Gasté $300 en comida"
3. El asistente automáticamente:
   - Categoriza la transacción
   - Registra el gasto
   - Actualiza los gráficos
   - Proporciona análisis

### Recibir Análisis
- Pregunta al asistente: "¿En qué gasté más este mes?"
- El asistente analiza automáticamente tus datos y proporciona:
  - Desglose por categorías
  - Comparativa con el mes anterior
  - Recomendaciones personalizadas

### Crear Planes Financieros
- Pregunta: "¿Cuánto puedo ahorrar?"
- El asistente calcula automáticamente tu potencial de ahorro

---

## Integración Gmail

La app permite conectar una cuenta de Gmail para detectar compras automáticamente:

- **Conexión OAuth2**: Desde Perfil > Conexiones, conectar cuenta de Google
- **Tab Integraciones**: Nuevo tab en Dashboard mostrando servicios conectados, compras detectadas y pendientes de categorizar
- **Perfil - Conexiones**: Gestión completa de la conexión Gmail (conectar, desconectar, sincronizar, ver estadísticas)

### Archivos principales

| Archivo | Función |
|---------|---------|
| `src/types/gmail.ts` | Interfaces TypeScript para Gmail |
| `src/services/gmail/gmail.ts` | Servicio de API para Gmail |
| `src/hooks/useGmailStatus.ts` | Hooks TanStack Query (status, disconnect, sync) |
| `src/components/dashboard/IntegrationsTab.tsx` | Tab de integraciones en Dashboard |
| `src/pages/Profile.tsx` | Tab "Conexiones" con gestión de Gmail |
| `src/pages/Dashboard.tsx` | Tab "Integraciones" agregado |

---

## Stack Tecnológico

Este proyecto está construido con:

- **Frontend**: React + TypeScript + Vite
- **UI**: shadcn-ui + Tailwind CSS
- **Inteligencia Artificial**:
  - Web Speech API (Reconocimiento de Voz)
  - Web Audio API (Síntesis de Texto)
  - NLP Patterns (Procesamiento de Lenguaje Natural)
  - Analytics Engine (Análisis de Datos)
- **Estado**: Zustand Store
- **API**: Axios + Interceptores
- **Integraciones**: Google Gmail API (OAuth2 + Pub/Sub)

---

## Cómo Editar el Código

### Usar Lovable (Editor Visual)

Visita el [Proyecto Lovable](https://lovable.dev/projects/35591135-3d7e-4f7c-9059-cdd6137fb0f5) y comienza a prompts.

Los cambios se sincronizarán automáticamente.

### Usar tu IDE Preferido

Requisito: Node.js & npm instalados ([instalar con nvm](https://github.com/nvm-sh/nvm#installing-and-updating))

```sh
# Paso 1: Clonar el repositorio
git clone <YOUR_GIT_URL>

# Paso 2: Navegar al directorio
cd chat-finance-bot

# Paso 3: Instalar dependencias
npm i

# Paso 4: Iniciar servidor de desarrollo
npm run dev
```

### Editar en GitHub
- Navega al archivo deseado
- Haz clic en el botón "Edit" (ícono de lápiz)
- Realiza tus cambios y commit

### Usar GitHub Codespaces
- Click en el botón "Code" (botón verde)
- Selecciona la pestaña "Codespaces"
- Click en "New codespace"
- Edita y realiza commits

---

## Estructura del Proyecto (IA)

```
src/
├── components/
│   ├── chatbot/                    # Asistente IA
│   │   ├── useChatBot.tsx         # Lógica principal del chat
│   │   ├── useSpeechRecognition.tsx # Reconocimiento de voz
│   │   ├── useTextToSpeech.tsx    # Síntesis de texto
│   │   ├── ChatBody.tsx
│   │   ├── ChatHeader.tsx
│   │   ├── ChatInput.tsx
│   │   └── ChatMessage.tsx
│   ├── dashboard/
│   │   ├── CategoriesTab.tsx      # Gestión de categorías
│   │   ├── IntegrationsTab.tsx    # Tab de integraciones
│   │   └── (análisis y reportes)
├── services/
│   ├── expenses/                   # Análisis de gastos
│   │   ├── expenses.ts
│   │   ├── lineChart.ts
│   │   ├── PieChart.ts
│   │   └── BarStackedChart.ts
│   ├── incomes/                    # Análisis de ingresos
│   │   ├── incomes.ts
│   │   ├── stats.ts
│   │   ├── lineChart.ts
│   │   ├── pieChart.ts
│   │   └── barStackedChart.ts
│   ├── gmail/                     # Integración Gmail
│   │   └── gmail.ts
│   └── categories/                 # Categorización IA
│       ├── expenseCategories.ts
│       └── incomeCategories.ts
├── hooks/
│   ├── useGmailStatus.ts         # Hooks Gmail
│   └── useExpenseCategories.ts    # Hooks de categorías
└── types/
    └── categories.ts              # Tipos de datos IA
```

---

## Próximas Características IA

- Predicción de gastos futuros
- Chatbot más avanzado con procesamiento NLP mejorado
- Categorización automática de compras por email con IA avanzada
- Detección de patrones de compra recurrentes
- Notificaciones inteligentes en tiempo real
- Metas financieras con IA predictiva
- Recomendaciones de inversión personalizadas

---

## Licencia

Este proyecto es parte de la alianza estratégica Cent × Tresqu para la gestión financiera personal inteligente.
