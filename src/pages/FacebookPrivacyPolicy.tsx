import LegalLayout from "@/components/LegalLayout";

const FacebookPrivacyPolicy = () => {
  return (
    <LegalLayout
      title="Política de Privacidad"
      updated="Fecha de última actualización: 17 de septiembre de 2025"
    >
      <p>
        Tu privacidad es importante para nosotros. Esta Política de
        Privacidad explica cómo recopilamos, usamos y protegemos tu
        información cuando utilizas nuestra aplicación y servicios,
        incluyendo aquellos que utilizan Facebook Login y Facebook Lead
        Ads.
      </p>

      <h2>1. Información que recopilamos</h2>
      <p>
        Podemos recopilar la siguiente información a través de Facebook:
      </p>
      <ul>
        <li>Nombre y apellidos</li>
        <li>Correo electrónico</li>
        <li>Otra información pública de tu perfil de Facebook</li>
        <li>
          Datos proporcionados a través de formularios de Facebook Lead
          Ads
        </li>
      </ul>

      <h2>2. Uso de la información</h2>
      <p>Utilizamos la información recopilada para:</p>
      <ul>
        <li>Proporcionar y mejorar nuestros servicios</li>
        <li>Comunicarnos contigo</li>
        <li>Personalizar tu experiencia</li>
      </ul>

      <h2>3. Compartir información</h2>
      <p>
        No compartimos tu información personal con terceros, excepto
        cuando sea necesario para cumplir con la ley o proteger nuestros
        derechos.
      </p>

      <h2>4. Seguridad</h2>
      <p>
        Tomamos medidas razonables para proteger tu información personal
        contra el acceso no autorizado, alteración, divulgación o
        destrucción.
      </p>

      <h2>5. Tus derechos</h2>
      <p>
        Puedes solicitar acceso, corrección o eliminación de tu
        información personal contactándonos a{" "}
        <a href="mailto:contacto@tresqu.com">
          contacto@tresqu.com
        </a>
        .
      </p>

      <h2>6. Cambios en la política</h2>
      <p>
        Nos reservamos el derecho de modificar esta política en cualquier
        momento. Los cambios serán publicados en esta página.
      </p>

      <h2>Contacto</h2>
      <p>
        Si tienes preguntas sobre esta política, puedes contactarnos en{" "}
        <a href="mailto:contacto@tresqu.com">
          contacto@tresqu.com
        </a>
      </p>
    </LegalLayout>
  );
};

export default FacebookPrivacyPolicy;
