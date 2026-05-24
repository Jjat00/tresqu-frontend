# Tresqu — Asistente Financiero Inteligente

Frontend web de Tresqu: dashboard, chatbot de voz, gestión de transacciones e integraciones (Gmail + **Wallbit**). Construido con React 19 + TypeScript + Vite y desplegado en Cloudflare Pages en [tresqu.com](https://tresqu.com).

---

## Tabla de contenidos

- [¿Qué hace Tresqu?](#qué-hace-tresqu)
- [Arquitectura](#arquitectura)
- [Stack tecnológico](#stack-tecnológico)
- [Setup local paso a paso](#setup-local-paso-a-paso)
- [Features](#features)
  - [Chatbot inteligente](#chatbot-inteligente)
  - [Dashboard analítico](#dashboard-analítico)
  - [Integración Gmail](#integración-gmail)
  - [Integración Wallbit (nuevo)](#integración-wallbit-nuevo)
- [Estructura del proyecto](#estructura-del-proyecto)
- [Scripts disponibles](#scripts-disponibles)

---

## ¿Qué hace Tresqu?

Tresqu es un copiloto financiero conversacional. Desde el dashboard puedes:

- Hablar (literal, con micrófono) o escribirle al chatbot para registrar gastos/ingresos
- Visualizar todo tu dinero en gráficos: torta por categoría, líneas de tendencia, barras apiladas
- Crear categorías personalizadas y metas de ahorro
- Conectar tu **Gmail** para que detecte compras en correos automáticamente
- **(nuevo)** Conectar tu cuenta de **Wallbit** y operar desde WhatsApp/Telegram con flujo de confirmación

---

## Arquitectura

### Topología

```mermaid
flowchart LR
    subgraph User["Usuario"]
        BROWSER[Navegador]
        MIC[Micrófono]
    end

    subgraph Frontend["Frontend (este repo)"]
        SPA[React 19 SPA<br/>Vite + TS]
        ZS[Zustand<br/>authStore]
        RQ[TanStack Query<br/>cache]
        AX[Axios + interceptores<br/>JWT auto-refresh]
    end

    subgraph Backend["Backend (cashbot-api)"]
        API[Django REST API<br/>api.tresqu.com]
    end

    subgraph Bots["Canales conversacionales"]
        TG[Telegram Bot]
        WA[WhatsApp Bot]
    end

    BROWSER --> SPA
    MIC -->|Web Speech API| SPA
    SPA <--> ZS
    SPA <--> RQ
    RQ --> AX
    AX -->|HTTPS + JWT| API
    API <--> TG
    API <--> WA
```

### Flujo de datos del dashboard

```mermaid
flowchart TB
    PAGE[Dashboard.tsx] --> TAB{Tab activo}
    TAB --> EXP[ExpensesTab]
    TAB --> INC[IncomeTab]
    TAB --> CAT[CategoriesTab]
    TAB --> SAV[SavingsGoalsTab]
    TAB --> DEB[DebtTab]
    TAB --> INT[IntegrationsTab<br/>Gmail + Wallbit]

    EXP --> HE[useExpenseCategories]
    INC --> HI[useIncomeSummary]
    INT --> HG[useGmailStatus]
    INT --> HW[useWallbitStatus]

    HE --> RQS[(TanStack Query cache)]
    HI --> RQS
    HG --> RQS
    HW --> RQS

    RQS --> SVC[services/*]
    SVC --> AX[Axios client]
    AX -->|api.tresqu.com| BACKEND[(Django API)]
```

### Flujo de conexión + confirmación Wallbit

```mermaid
sequenceDiagram
    participant U as Usuario (web)
    participant W as WallbitCard
    participant API as Tresqu API
    participant WB as Wallbit API
    participant BOT as WhatsApp/Telegram

    U->>W: Pega API key
    W->>API: POST /api/wallbit/connect
    API->>WB: GET /balance/checking (validar)
    WB-->>API: 200 OK
    API->>API: encrypt + persist
    API-->>W: 200 connected
    W-->>U: badge "Conectada"

    Note over U,BOT: ...más tarde, en otro canal...

    U->>BOT: "compra USD 100 de AAPL"
    BOT->>API: agente propone wallbit_place_trade
    API->>API: limits + kill switch + AgentDecision
    API-->>BOT: preview + confirmation_id
    BOT-->>U: botón "Confirmar"
    U->>BOT: confirma
    BOT->>API: POST /api/wallbit/agent/confirm/:id
    API->>WB: POST /transactions
    WB-->>API: tx ok
    API-->>BOT: ejecutada
    BOT-->>U: "Listo, compré USD 100 de AAPL"
```

---

## Stack tecnológico

| Capa | Tecnologías |
|------|-------------|
| Framework | React 19, TypeScript 5.5, Vite 6 |
| Estilos | Tailwind CSS 4, shadcn/ui (Radix UI) |
| Estado servidor | TanStack React Query 5 |
| Estado cliente | Zustand 5 (con persist) |
| HTTP | Axios con interceptores (auto-refresh JWT) |
| Routing | React Router DOM 6 |
| Formularios | React Hook Form + Zod |
| Charts | Chart.js (react-chartjs-2) y Recharts |
| Voz | Web Speech API (STT) + Web Audio API (TTS) |
| Despliegue | Cloudflare Pages — autodeploy en push a `main` |

---

## Setup local paso a paso

### Requisitos

- **Node.js 18+** y npm. Recomendado vía [nvm](https://github.com/nvm-sh/nvm#installing-and-updating)
- Backend Tresqu corriendo en `http://localhost:8000` (ver [`cashbot-api/README.md`](../cashbot-api/README.md))

### 1. Clonar e instalar dependencias

```bash
git clone <repo-url>
cd chat-finance-bot
npm i
```

### 2. Configurar variables de entorno

Crea un `.env` en la raíz del proyecto:

```dotenv
VITE_API_URL=http://localhost:8000
```

> Para producción ya está apuntando a `https://api.tresqu.com` desde la configuración de Cloudflare Pages.

### 3. Arrancar el servidor de desarrollo

```bash
npm run dev
```

Abre [http://localhost:5173](http://localhost:5173). El hot reload está activo.

### 4. Build de producción (opcional, para verificar)

```bash
npm run build
npm run preview
```

---

## Features

### Chatbot inteligente

Disponible como widget flotante en todo el dashboard.

- **Reconocimiento de voz** vía Web Speech API
- **Síntesis de voz** vía Web Audio API
- **Registro natural**: "Gasté $500 en almuerzo" → categoriza y guarda
- **Consultas analíticas**: "¿En qué gasté más este mes?", "¿Cuánto puedo ahorrar?"
- **Comparativas** mes vs mes
- **Sugerencias personalizadas** de reducción de gasto y planes de pago

### Dashboard analítico

- Gráfico de torta por categoría
- Líneas de tendencia mes a mes
- Barras apiladas comparativas
- Balance acumulado
- Filtros por rango de fechas
- Gestión de categorías custom con color e ícono

### Integración Gmail

Desde **Perfil → Conexiones**:

- Conectar cuenta vía OAuth2
- Ver compras detectadas y pendientes de categorizar
- Sincronizar manualmente
- Ver estadísticas de la integración

| Archivo | Función |
|---------|---------|
| `src/types/gmail.ts` | Interfaces TypeScript |
| `src/services/gmail/gmail.ts` | Llamadas a `/api/gmail/*` |
| `src/hooks/useGmailStatus.ts` | Hooks Query (status, disconnect, sync) |
| `src/components/dashboard/IntegrationsTab.tsx` | Tab del dashboard |

### Integración Wallbit (nuevo)

Tresqu se conecta a la cuenta Wallbit del usuario para consultar saldos y transacciones, y para que el agente conversacional pueda **proponer operaciones** (compra/venta, movimientos entre cuentas DEFAULT ↔ INVESTMENT, depósitos/retiros de Robo Advisor, congelar tarjetas).

#### Lo que ya está en la UI

- **`WallbitCard`** (en Integraciones): conectar/desconectar, ver scope, fecha de conexión y último sync.
- **Inputs seguros**: la API key se envía cifrada por HTTPS, **nunca queda en el cliente**.
- **Mensajes de error inline**: 401 / 403 / IP whitelist se muestran claros.

#### Archivos clave

| Archivo | Función |
|---------|---------|
| `src/types/wallbit.ts` | Interfaces TypeScript (status, connect payload) |
| `src/services/wallbit/wallbit.ts` | Llamadas a `/api/wallbit/*` |
| `src/hooks/useWallbitStatus.ts` | Hooks Query (status, connect, disconnect) |
| `src/components/dashboard/WallbitCard.tsx` | Card de conexión en Integraciones |

#### Flujo de confirmación (donde ocurre)

El usuario interactúa con el agente Wallbit principalmente por **WhatsApp y Telegram**. Cuando propone una operación con dinero, el backend persiste una `AgentDecision(requires_confirmation=True)` y manda al canal un preview con botón "Confirmar". El frontend web hoy es el panel de control (conectar, ver estado); el panel de **límites** y el **historial de decisiones** quedan como follow-up de UI (los endpoints ya existen: `/api/wallbit/limits/` y `/api/wallbit/agent/decisions/`).

#### Seguridad — por qué importa

- La API key se valida contra Wallbit antes de persistirla; si no es válida, no se guarda
- Se cifra con Fernet en el backend antes de tocar disco
- Tresqu **nunca** te la muestra de vuelta — para reemplazarla, pegás una nueva
- Desconectar activa un **kill switch** que bloquea cualquier operación durante 365 días
- Hay **límites por usuario** (monto por trade, tope diario, allow/block lists, umbral two-step) configurables vía API

---

## Estructura del proyecto

```
src/
├── App.tsx                       # Rutas con react-router-dom
├── main.tsx                      # Entrypoint + QueryClientProvider
├── pages/
│   ├── Index.tsx                 # Landing
│   ├── Dashboard.tsx             # Dashboard con tabs
│   ├── Login.tsx
│   └── Profile.tsx               # Perfil + conexiones
├── layouts/                      # Wrappers de página
├── components/
│   ├── chatbot/                  # Widget de chat con voz
│   │   ├── useChatBot.tsx
│   │   ├── useSpeechRecognition.tsx
│   │   ├── useTextToSpeech.tsx
│   │   ├── ChatBody.tsx
│   │   ├── ChatHeader.tsx
│   │   ├── ChatInput.tsx
│   │   └── ChatMessage.tsx
│   ├── dashboard/
│   │   ├── ExpensesTab.tsx
│   │   ├── IncomeTab.tsx
│   │   ├── CategoriesTab.tsx
│   │   ├── SavingsGoalsTab.tsx
│   │   ├── DebtTab.tsx
│   │   ├── IntegrationsTab.tsx   # Gmail + Wallbit
│   │   ├── WallbitCard.tsx       # ← nuevo
│   │   ├── DashboardSummary.tsx
│   │   ├── DashboardSidebar.tsx
│   │   ├── CumulativeBalanceChart.tsx
│   │   ├── charts/
│   │   ├── data/
│   │   └── dateRangePicker/
│   └── ui/                       # shadcn/ui primitives
├── services/
│   ├── api.ts                    # Axios + interceptores JWT
│   ├── authService.ts
│   ├── expenses/
│   ├── incomes/
│   ├── categories/
│   ├── currencies/
│   ├── gmail/
│   ├── users/
│   ├── wallbit/                  # ← nuevo (wallbit.ts)
│   └── whatsappAuthService.ts
├── hooks/
│   ├── useExpenseCategories.ts
│   ├── useIncomeSummary.ts
│   ├── useGmailStatus.ts
│   ├── useWallbitStatus.ts       # ← nuevo
│   ├── useStatsIncome.ts
│   ├── useCumulativeBalance.ts
│   └── ...
├── store/                        # Zustand stores
├── types/
│   ├── categories.ts
│   ├── gmail.ts
│   └── wallbit.ts                # ← nuevo
├── utils/                        # date helpers, color utils
└── lib/                          # shadcn utils
```

---

## Scripts disponibles

```bash
npm run dev          # Dev server con HMR (http://localhost:5173)
npm run build        # Build de producción → dist/
npm run build:dev    # Build sin minificar (debug en prod)
npm run lint         # ESLint
npm run preview      # Sirve el build de dist/ para inspección
```

---

## Próximas características

- Panel web para gestionar **`AgentLimits`** (montos, allow/block lists)
- Historial completo de **`AgentDecision`** con filtros
- Vista de **`WallbitTxMirror`** con búsqueda semántica (RAG)
- Botones inline de confirmación en el chat web (hoy viven en WhatsApp/Telegram)
- Predicción de gastos futuros con ML
- Notificaciones push inteligentes

---

## Licencia

Proyecto privado — Tresqu, alianza estratégica Cent × Tresqu.
