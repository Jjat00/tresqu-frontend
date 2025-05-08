
import React from "react";
import { Link } from "react-router-dom";
import Footer from "@/components/Footer";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const CookiePolicy = () => {
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
          <h1 className="text-3xl font-bold mb-6">Política de Cookies</h1>
          
          <div className="prose prose-slate max-w-none">
            <p>Esta Política de Cookies explica cómo Tresqu utiliza cookies y tecnologías similares para reconocerte cuando visitas nuestra aplicación web. Explica qué son estas tecnologías y por qué las usamos, así como tus derechos para controlarlas.</p>
            
            <h2 className="text-xl font-bold mt-6 mb-3">1. ¿Qué son las cookies?</h2>
            <p>Las cookies son pequeños archivos de datos que se almacenan en tu dispositivo cuando visitas un sitio web. Las cookies tienen muchos usos, pero principalmente permiten que un sitio web reconozca el dispositivo de un usuario.</p>
            
            <h2 className="text-xl font-bold mt-6 mb-3">2. ¿Cómo utilizamos las cookies?</h2>
            <p>Utilizamos cookies por varias razones, detalladas a continuación:</p>
            <ul className="list-disc pl-6 mb-4">
              <li>Cookies necesarias: Son esenciales para que puedas utilizar las funcionalidades básicas de nuestro sitio.</li>
              <li>Cookies de análisis: Nos permiten reconocer y contar el número de visitantes y ver cómo los usuarios se mueven por nuestro sitio.</li>
              <li>Cookies de funcionalidad: Se utilizan para reconocerte cuando vuelves a nuestro sitio y personalizar el contenido.</li>
              <li>Cookies de preferencias: Estas cookies permiten que nuestro sitio recuerde las opciones que eliges para proporcionarte una experiencia más personalizada.</li>
            </ul>
            
            <h2 className="text-xl font-bold mt-6 mb-3">3. Tipos específicos de cookies utilizadas</h2>
            <p>Utilizamos los siguientes tipos de cookies en nuestra aplicación web:</p>
            <ul className="list-disc pl-6 mb-4">
              <li>Cookies de sesión: Temporales que permanecen en el archivo de cookies de tu navegador hasta que abandonas el sitio.</li>
              <li>Cookies persistentes: Permanecen en tu navegador durante un período determinado o hasta que las elimines manualmente.</li>
              <li>Cookies de terceros: Establecidas por servicios externos como Google Analytics para el seguimiento y análisis del tráfico web.</li>
            </ul>
            
            <h2 className="text-xl font-bold mt-6 mb-3">4. Control de cookies</h2>
            <p>Puedes controlar y administrar las cookies de diversas maneras. Ten en cuenta que eliminar o bloquear cookies puede afectar a tu experiencia de usuario y es posible que no puedas acceder a determinadas partes de nuestro sitio web.</p>
            <p>La mayoría de los navegadores te permiten:</p>
            <ul className="list-disc pl-6 mb-4">
              <li>Ver las cookies que tienes y eliminarlas de forma individual.</li>
              <li>Bloquear cookies de terceros.</li>
              <li>Bloquear cookies de sitios web particulares.</li>
              <li>Bloquear la instalación de todas las cookies.</li>
              <li>Eliminar todas las cookies cuando cierras tu navegador.</li>
            </ul>
            
            <h2 className="text-xl font-bold mt-6 mb-3">5. Cambios en nuestra Política de Cookies</h2>
            <p>Podemos actualizar nuestra Política de Cookies periódicamente. Te animamos a visitar esta página con frecuencia para estar informado sobre cómo utilizamos las cookies.</p>
            
            <h2 className="text-xl font-bold mt-6 mb-3">6. Contacto</h2>
            <p>Si tienes alguna pregunta sobre nuestra Política de Cookies, no dudes en contactarnos:</p>
            <p>📧 <a href="mailto:contacto@tresqu.com" className="text-primary hover:underline">contacto@tresqu.com</a></p>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CookiePolicy;
