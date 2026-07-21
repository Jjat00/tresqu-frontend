
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { applyLocaleRedirect } from '@/i18n';
import './index.css';

// Detección de idioma en primera visita, ANTES de montar React:
// BrowserRouter lee la URL ya corregida (cero flash, cero historial extra).
applyLocaleRedirect();

const container = document.getElementById("root");
if (!container) throw new Error('Root element not found');
const root = createRoot(container);
root.render(<App />);
