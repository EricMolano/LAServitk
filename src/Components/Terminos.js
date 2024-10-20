import React from 'react';
import '../Components/styles/TerminosCondiciones.css'; // Asegúrate de que este archivo CSS esté importado

const TerminosCondiciones = () => {
  return (
    <div className="terms-container">
      <h1>Términos y Condiciones</h1>
      <p>
        Bienvenido a <span className="taller-name">LA ServitK</span>. Al utilizar nuestro sitio web y servicios, aceptas los siguientes términos y condiciones:
      </p>
      <h2>1. Introducción</h2>
      <p>
        Estos Términos y Condiciones rigen el uso de los servicios proporcionados por <span className="taller-name">LA ServtiK</span>, incluyendo cualquier sitio web, aplicaciones y otros servicios relacionados. Al acceder a nuestros servicios, aceptas cumplir con estos términos.
      </p>
      <h2>2. Servicios</h2>
      <p>
        <span className="taller-name">LA ServitK</span> ofrece servicios de mecánica automotriz que incluyen reparaciones, mantenimiento y asesoramiento. Nos reservamos el derecho de modificar o cancelar cualquier servicio sin previo aviso.
      </p>
      <h2>3. Responsabilidades del Usuario</h2>
      <p>
        Eres responsable de proporcionar información precisa y completa al utilizar nuestros servicios. Debes cumplir con todas las leyes aplicables y no utilizar nuestros servicios para fines ilegales.
      </p>
      <h2>4. Propiedad Intelectual</h2>
      <p>
        Todos los derechos de propiedad intelectual relacionados con el contenido del sitio web de <span className="taller-name">LA ServitK</span> son propiedad de <span className="taller-name">LA ServitK</span>. No puedes copiar, distribuir o utilizar dicho contenido sin nuestro permiso.
      </p>
      <h2>5. Limitación de Responsabilidad</h2>
      <p>
        <span className="taller-name">LA ServitK</span> no será responsable de ningún daño o pérdida que resulte del uso de nuestros servicios, excepto en la medida en que la ley lo exija. No garantizamos la exactitud o integridad de la información proporcionada en nuestro sitio web.
      </p>
      <h2>6. Modificaciones</h2>
      <p>
        Podemos actualizar estos Términos y Condiciones en cualquier momento. Te notificaremos sobre cualquier cambio importante y se considerará que has aceptado las nuevas condiciones si continúas utilizando nuestros servicios.
      </p>
      <h2>7. Contacto</h2>
      <p>
        Si tienes preguntas sobre estos Términos y Condiciones, puedes contactarnos en:
      </p>
      <address>
        <span className="taller-name">LA ServitK</span> <br />
        [Fontibon Calle 12 #32] <br />
        Teléfono: [3203525619] <br />
        Correo Electrónico: [laservitk@gmail.com]
      </address>
    </div>
  );
};

export default TerminosCondiciones;
