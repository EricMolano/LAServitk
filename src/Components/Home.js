import React, { useEffect } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import '../styles/Home.css';
import miImagen1 from '../Components/Assets/mecanico.jpg';
import miImagen2 from '../Components/Assets/2.jpg';
import miImagen3 from '../Components/Assets/3.jpg';
import miImagen4 from '../Components/Assets/moto.jpg';
import miImagen5 from '../Components/Assets/logosvtk.png';
// Imágenes para el portafolio
import imgPort12 from '../Components/Assets/neumaticos.jpg';
import imgPort13 from '../Components/Assets/led.jpg';
import imgPort14 from '../Components/Assets/anticongelante.jpg';
import imgPort15 from '../Components/Assets/kit.jpg';
import imgPort5 from '../Components/Assets/cambioaceite.png';
import imgPort9 from '../Components/Assets/filtro.jpg';
import imgPort10 from '../Components/Assets/pastillas.jpg';
import imgPort11 from '../Components/Assets/automotriz.jpg';
import imgPort20 from '../Components/Assets/pintura.png';

// Imágenes para los servicios
import imgReparacion from '../Components/Assets/reparacionmotores.jpg';
import imgAceite from '../Components/Assets/cambioaceite.png';
import imgFrenos from '../Components/Assets/revisionfrenos.jpg';
import imgTransmision from '../Components/Assets/transmision.jpg';
import imgAlineacion from '../Components/Assets/alineacion.jpg';
import imgBaterias from '../Components/Assets/bateria.jpg';

function Home() {
  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css';
    document.head.appendChild(link);

    return () => {
      document.head.removeChild(link);
    };
  }, []);

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="home-container">
      <header className="home-header">
        <div className="home-logo-text" onClick={() => scrollToSection('inicio')}>
          <img src={miImagen5} alt="Logo pequeño" className="home-logo" />
          <div className="home-text">La Servitk</div>
        </div>
        <nav className="home-nav">
          <ul>
            <li>
              <Link to="/register">Registrarse</Link>
            </li>
            <li>
              <Link to="/login">Ingresar</Link>
            </li>
          </ul>
        </nav>
      </header>

      <div id="inicio" className="home-content">

        <div className="text-image-container">
          <div className="text-space">
            <div className="text-content">
              <h2>Servicio Rápido y Eficiente para Tu Auto</h2>
              <p>
                En La Servitk, nos especializamos en ofrecer un servicio integral para tu vehículo. 
                Desde reparaciones rápidas hasta mantenimiento completo, nuestro equipo de expertos está 
                listo para atender tus necesidades automotrices con la mayor eficiencia y profesionalismo.
              </p>
              <p>
                Además, contamos con una amplia gama de repuestos de alta calidad para asegurar que tu auto 
                funcione de la mejor manera. Ya sea que necesites un cambio de aceite, revisión de frenos, 
                o repuestos específicos, en La Servitk tenemos lo que buscas.
              </p>
              <p>
                No pierdas tiempo en largos períodos de espera en otros talleres. Con nosotros, puedes 
                estar seguro de que recibirás un servicio rápido, confiable y a precios competitivos. 
                Visítanos y comprueba la calidad de nuestro servicio por ti mismo. 
                <Link to="/register" className="highlight">¡Regístrate ahora!</Link>
              </p>
            </div>
          </div>
          <div className="additional-image">
            <img src={miImagen4} alt="Descripción de la nueva imagen" />
          </div>
        </div>

        <section id="servicios" className="services-section">
          <h2 className="services-title">Nuestros Servicios</h2>
          <div className="services-container">
            <div className="service-card">
              <h3>Reparación de Motores</h3>
              <p>Diagnóstico y reparación de motores para asegurar un rendimiento óptimo.</p>
              <img src={imgReparacion} alt="Reparación de Motores" className="service-image" />
            </div>
            <div className="service-card">
              <h3>Cambio de Aceite</h3>
              <p>Cambio de aceite y filtros para mantener tu motor en excelentes condiciones.</p>
              <img src={imgAceite} alt="Cambio de Aceite" className="service-image" />
            </div>
            <div className="service-card">
              <h3>Revisión de Frenos</h3>
              <p>Chequeo y reparación del sistema de frenos para garantizar tu seguridad.</p>
              <img src={imgFrenos} alt="Revisión de Frenos" className="service-image" />
            </div>
            <div className="service-card">
              <h3>Transmisión</h3>
              <p>Servicio completo para la transmisión de tu vehículo, incluyendo reparaciones.</p>
              <img src={imgTransmision} alt="Reparación de Transmisión" className="service-image" />
            </div>
            <div className="service-card">
              <h3>Alineación y Balanceo</h3>
              <p>Alineación y balanceo de ruedas para una conducción más suave, segura y apta.</p>
              <img src={imgAlineacion} alt="Alineación y Balanceo" className="service-image" />
            </div>
            <div className="service-card">
              <h3>Chequeo de Baterías</h3>
              <p>Revisión y reemplazo de baterías para evitar problemas de encendido.</p>
              <img src={imgBaterias} alt="Chequeo de Baterías" className="service-image" />
            </div>
          </div>
        </section>

        {/* Nueva sección de Portafolio */}
        <section id="portafolio" className="portfolio-section">
          <h2 className="portfolio-title">Nuestro Portafolio</h2>
          <div className="portfolio-container">
            <div className="portfolio-card">
              <img src={imgPort12} alt="Neumáticos" className="portfolio-image" />
              <h3>Neumáticos</h3>
            </div>
            <div className="portfolio-card">
              <img src={imgPort13} alt="LED" className="portfolio-image" />
              <h3>LED</h3>
            </div>
            <div className="portfolio-card">
              <img src={imgPort14} alt="Anticongelante" className="portfolio-image" />
              <h3>Anticongelante</h3>
            </div>
            <div className="portfolio-card">
              <img src={imgPort15} alt="Kit de Herramientas" className="portfolio-image" />
              <h3>Kit de Herramientas</h3>
            </div>
            <div className="portfolio-card">
              <img src={imgPort5} alt="Cambio de Aceite" className="portfolio-image" />
              <h3>Aceite</h3>
            </div>
            <div className="portfolio-card">
              <img src={imgPort9} alt="Filtro" className="portfolio-image" />
              <h3>Filtro</h3>
            </div>
            <div className="portfolio-card">
              <img src={imgPort10} alt="Pastillas" className="portfolio-image" />
              <h3>Pastillas</h3>
            </div>
            <div className="portfolio-card">
              <img src={imgPort11} alt="Automotriz" className="portfolio-image" />
              <h3>Motor</h3>
            </div>
            <div className="portfolio-card">
              <img src={imgPort20} alt="pintura" className="portfolio-image" />
              <h3>Pinturas</h3>
            </div>
          </div>
        </section>

        {/* Sección de Testimonios */}
        <section id="testimonios" className="testimonials-section">
          <h2 className="testimonials-title">Testimonios</h2>
          <div className="testimonials-container">
            <div className="testimonial-card">
              <p>"Excelente servicio, me atendieron rápidamente y solucionaron el problema de mi auto!"</p>
              <h4>- Juan Pérez</h4>
            </div>
            <div className="testimonial-card">
              <p>"Muy satisfecho con la atención al cliente y el trabajo realizado. ¡Recomiendo ampliamente!"</p>
              <h4>- María López</h4>
            </div>
            <div className="testimonial-card">
              <p>"Gran calidad en los servicios y precios competitivos. Definitivamente volveré."</p>
              <h4>- Carlos Gómez</h4>
            </div>
          </div>
        </section>
      </div>

      <footer className="home-footer">
        <div className="footer-content"> 
          <div className="footer-section contact-info">
            <h4>Contacto</h4>
            <div className="contact-item">
              <i className="fas fa-map-marker-alt"></i>
              <p>Calle 17A # 102 - 56, Fontibón</p>
            </div>
            <div className="contact-item">
              <i className="fas fa-phone"></i>
              <p>3203565617</p>
            </div>
            <div className="contact-item">
              <i className="fas fa-clock"></i>
              <p>Lunes a Viernes de 7AM - 7PM</p>
            </div>
          </div>

          <div className="footer-section map">
            <h4>Visítanos</h4>
            <iframe
              src="https://www.google.com/maps/embed/v1/place?key=AIzaSyCZYOFtmDTCHduH5bVOR97wwRhyGCbIPB8&q=La+servitk,+Bogotá"
              allowFullScreen
              loading="lazy"
              title="Ubicación"
              className="map-iframe"
            ></iframe>
          </div>

          <div className="footer-section social-media">
            <h4>Síguenos en redes sociales</h4>
            <div className="social-icons">
              <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-facebook"></i>
              </a>
              <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-twitter"></i>
              </a>
            </div>
          </div>
        </div>
      </footer>

      <Outlet />
    </div>
  );
}

export default Home;
