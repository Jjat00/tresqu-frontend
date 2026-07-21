import type { Dict } from "../types";

export interface WhatsAppFeatureCopy {
  title: string;
  description: string;
  highlight: string;
}

export interface WhatsAppFeaturesCopy {
  sectionLabel: string;
  /** "{line1Pre} {line1Holo}, / {line2}" — estilos en el componente */
  title: { line1Pre: string; line1Holo: string; line2: string };
  intro: string;
  /** Mismo orden que el array estructural del componente */
  features: WhatsAppFeatureCopy[];
  mockups: {
    text: { userMsg: string; confirm: string; amount: string; category: string };
    voice: { transcript: string; result: string };
    image: {
      receiptLabel: string;
      caption: string;
      merchant: string;
      result: string;
    };
    investments: {
      userMsg: string;
      accountTitle: string;
      cashLabel: string;
      cashValue: string;
      investedLabel: string;
      investedValue: string;
      stocksLabel: string;
      closing: string;
    };
  };
  ctaMicro: string;
  ctaButton: string;
  whatsappUrl: string;
}

export const whatsappFeaturesCopy: Dict<WhatsAppFeaturesCopy> = {
  es: {
    sectionLabel: "01 · Disponible en WhatsApp",
    title: {
      line1Pre: "REGISTRA COMO",
      line1Holo: "PREFIERAS",
      line2: "CONSULTA LO QUE QUIERAS.",
    },
    intro:
      "Texto, voz o foto para registrar tus movimientos. Y cuando quieras, pregúntale a Tresqu por tus inversiones — todo desde WhatsApp, sin abrir nada más.",
    features: [
      {
        title: "Consulta tus inversiones",
        description:
          "Pregúntale a Tresqu por tu cuenta Wallbit: cuánto tienes libre, tus acciones y cómo van. Y cuando quieras, compra, vende o mueve fondos desde el chat.",
        highlight: "Inversiones",
      },
      {
        title: "Registra por texto",
        description:
          "Escribe como hablas. Sin formatos ni comandos. Tresqu entiende en lenguaje natural y categoriza al instante.",
        highlight: "Modo texto",
      },
      {
        title: "Registra por voz",
        description:
          "Manda un audio de WhatsApp. Tresqu transcribe, entiende y registra el movimiento en segundos.",
        highlight: "Modo voz",
      },
      {
        title: "Registra por foto",
        description:
          "Toma una foto al recibo o factura. Tresqu extrae monto, comercio y categoría sin que tipees nada.",
        highlight: "Modo foto",
      },
    ],
    mockups: {
      text: {
        userMsg: "anoche pagué 20k de cena",
        confirm: "Registrado",
        amount: "$20,000 COP",
        category: "Restaurantes",
      },
      voice: {
        transcript: '"Almuerzo con el equipo"',
        result: "Alimentación · $18,000",
      },
      image: {
        receiptLabel: "Recibo",
        caption: "Foto del recibo",
        merchant: "Tienda Nube",
        result: "Mercado · $47.500",
      },
      investments: {
        userMsg: "¿Cuánto tengo libre para invertir en Wallbit?",
        accountTitle: "Tu cuenta Wallbit",
        cashLabel: "Efectivo disponible",
        cashValue: "$1,250.00 USD",
        investedLabel: "En cuenta de inversión",
        investedValue: "$3,480.00 USD",
        stocksLabel: "Acciones",
        closing:
          "Dime si quieres comprar, vender o mover fondos y lo gestionamos. 🚀",
      },
    },
    ctaMicro: "Sin descargas · Sin configuraciones · Empieza en 30 segundos",
    ctaButton: "Probar en WhatsApp",
    whatsappUrl:
      "https://wa.me/573116534337?text=Hola%20Tresqu%2C%20quiero%20empezar",
  },
  en: {
    sectionLabel: "01 · Available on WhatsApp",
    title: {
      line1Pre: "LOG IT YOUR",
      line1Holo: "WAY",
      line2: "ASK FOR ANYTHING.",
    },
    intro:
      "Text, voice, or photo to log your transactions. And whenever you want, ask Tresqu about your investments — all from WhatsApp, without opening anything else.",
    features: [
      {
        title: "Check your investments",
        description:
          "Ask Tresqu about your Wallbit account: how much you have free, your stocks, and how they're doing. And whenever you're ready, buy, sell, or move funds from the chat.",
        highlight: "Investing",
      },
      {
        title: "Log by text",
        description:
          "Write the way you talk. No formats, no commands. Tresqu understands natural language and categorizes instantly.",
        highlight: "Text mode",
      },
      {
        title: "Log by voice",
        description:
          "Send a WhatsApp voice note. Tresqu transcribes, understands, and logs the transaction in seconds.",
        highlight: "Voice mode",
      },
      {
        title: "Log by photo",
        description:
          "Snap a photo of the receipt or invoice. Tresqu extracts the amount, merchant, and category without you typing a thing.",
        highlight: "Photo mode",
      },
    ],
    mockups: {
      text: {
        userMsg: "paid $14 for dinner last night",
        confirm: "Logged",
        amount: "$14.00 USD",
        category: "Restaurants",
      },
      voice: {
        transcript: '"Lunch with the team"',
        result: "Food · $12.50",
      },
      image: {
        receiptLabel: "Receipt",
        caption: "Photo of the receipt",
        merchant: "Corner Market",
        result: "Groceries · $47.50",
      },
      investments: {
        userMsg: "How much do I have free to invest in Wallbit?",
        accountTitle: "Your Wallbit account",
        cashLabel: "Available cash",
        cashValue: "$1,250.00 USD",
        investedLabel: "In investment account",
        investedValue: "$3,480.00 USD",
        stocksLabel: "Stocks",
        closing:
          "Tell me if you want to buy, sell, or move funds and we'll handle it. 🚀",
      },
    },
    ctaMicro: "No downloads · No setup · Start in 30 seconds",
    ctaButton: "Try it on WhatsApp",
    whatsappUrl:
      "https://wa.me/573116534337?text=Hi%20Tresqu%2C%20I%20want%20to%20get%20started",
  },
};
