import React , { useState }from 'react';
import { Outlet, Link , useNavigate  } from 'react-router-dom';
import Sidebar from './admin/Slidebara';

import imgPort1 from '../Components/Assets/2.jpg';
import imgPort2 from '../Components/Assets/3.jpg';
import imgPort4 from '../Components/Assets/bateria.jpg';
import imgFace1 from '../Components/Assets/face1.jpg';
import imgFace2 from '../Components/Assets/face2.jpg';
import imgIcono1 from '../Components/Assets/icono1.png';
import imgPort7 from '../Components/Assets/mecanico.jpg';
import imgPort8 from '../Components/Assets/suspencion.jpg';

import miImagen4 from '../Components/Assets/img4.jpeg';

//Redes 
import FacebookIcon from '../Components/Assets/redes/facebook.png';
import InstagramIcon from '../Components/Assets/redes/Instagram.png';
import WhatsappIcon from '../Components/Assets/redes/whatsapp.png';
import TiktokIcon from '../Components/Assets/redes/tiktok.jpg';

//Servicios imagenes
import imgFrenos from '../Components/Assets/servicios/revisionfrenos.jpg';
import imgAlineacion from '../Components/Assets/servicios/alineacion.jpg';
import imgTransmision from '../Components/Assets/servicios/transmision.jpg';
import imgMotor from  '../Components/Assets/servicios/reparacionmotores.jpg';
import imgCambioAceite from  '../Components/Assets/servicios/cambioaceite.jpg';
import imgSuspension from  '../Components/Assets/servicios/suspencion.png';
import imgNeumaticos from  '../Components/Assets/servicios/neumaticos.png';
import imgEscape from  '../Components/Assets/servicios/escape.jpg';
import imgAireAcondicionado from  '../Components/Assets/servicios/aireacondicionado.jpg';
import imgCarroceria from  '../Components/Assets/servicios/pintura.png';
import imgRefrigeracion from  '../Components/Assets/servicios/enfriamiento.jpg';
import imgLimpieza from  '../Components/Assets/servicios/limpieza.jpg';

//Produtos imagenes
import imgPort100 from '../Components/Assets/productos/Pastillas.jpg';
import imgPort101 from '../Components/Assets/productos/bateria.jpg';
import imgPort102 from '../Components/Assets/productos/productoneumatico.jpg';
import imgPort103 from '../Components/Assets/productos/led.jpg';
import imgPort104 from '../Components/Assets/productos/anticongelante.jpg';
import imgPort105 from '../Components/Assets/productos/kit.png';
import imgPort106 from '../Components/Assets/productos/cambioaceite.jpg';
import imgPort109 from '../Components/Assets/productos/filtro.jpg';
import carritoLogo from '../Components/Assets/carritoLogo.png';


import '../Components/styles/AdminDashboard.css'; 

const AdminDashboard = () => {
    return (
        <div className="home-container">
            <Sidebar /> {/* Agregar la barra lateral */}
            <div className="content">
                <Header />
                <Main />
                <Footer />
            </div>
        </div>
    );
};
const Header = () => {
  const navigate = useNavigate();

  // Función para manejar el cierre de sesión
  const handleLogout = () => {
      localStorage.removeItem('token');
      navigate('/');
  };
  return (
      <header>
          <nav>
          <div className='logout-container-1'>
            <button1 className='btn-cerrar-sesion-1 btn-base' onClick={handleLogout}>Cerrar Sesión</button1>
        </div>
          </nav>
          <section className="textos-header hidden">
              <h1>Bienvenido</h1>
              <h2>Con La Servitk puedes arreglar tu vehiculo</h2>
          </section>
          <div className="wave" style={{ height: '150px', overflow: 'hidden' }}>
              <svg viewBox="0 0 500 150" preserveAspectRatio="none" style={{ height: '100%', width: '100%' }}>
                  <path
                      d="M0.00,49.98 C150.00,150.00 349.20,-50.00 500.00,49.98 L500.00,150.00 L0.00,150.00 Z"
                      style={{ stroke: 'none', fill: '#fff' }}
                  />
              </svg>
          </div>
      </header>
  );
};


const Main = () => {
    return (
        <main>
            <AboutUs />
            <Portfolio />
            <Services />
            <Testimonials />
        </main>
    );
};

const AboutUs = () => {
    return (
        <section className="contenedor sobre-nosotros">
            <h2 className="titulo">Servicio Rápido y Eficiente para Tu Auto</h2>
            <div className="contenedor-sobre-nosotros">
                <img src={imgPort2} alt="imgPort2" className="imagen-about-us" />
                <div className="contenido-textos">
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
                    </p>
                </div>
            </div>
        </section>
    );
};
const Portfolio = () => {
  const navigate = useNavigate();
  const images = [
      {
          src: imgPort102,
          alt: "Imagen 12",
          text: "Neumáticos",
      },
      {
          src: imgPort103,
          alt: "Imagen 13",
          text: "Luces LED",
      },
      {
          src: imgPort104,
          alt: "Imagen 14",
          text: "Anticongelante",
      },
      {
          src: imgPort105,
          alt: "Imagen 15",
          text: "Kit de herramientas",
      },
      {
          src: imgPort106,
          alt: "Imagen 5",
          text: "Aceite de motor",
      },
      {
          src: imgPort109,
          alt: "Imagen 9",
          text: "Filtro de aceite",
      },
      {
          src: imgPort100,
          alt: "Imagen 10",
          text: "Pastillas de freno",
      },
      {
          src: imgPort101,
          alt: "Imagen 11",
          text: "Batería de automotriz",
      },
  ];

  return (
      <section className="portafolio">
          <div className="contenedor">
              <h2 className="titulo">Inventario</h2>
              <div className="galeria-port">
                  {images.map((image, index) => (
                      <div className="imagen-port" key={index}>
                          <img src={image.src} alt={image.alt} />
                          <div className="hover-galeria">
                              <img src={imgIcono1} alt="Icono" />
                              <p>{image.text}</p>
                          </div>
                      </div>
                  ))}
              </div>
          </div>
      </section>
  );
};




const Services = () => {
    // Estado para manejar el servicio seleccionado y el estado del modal
    const [selectedService, setSelectedService] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Lista de servicios con imagen, título y descripción
    const services = [
        {
            img: imgFrenos,
            title: "Revisión de Frenos",
            description: "Incluye la revisión de pastillas, discos, pinzas y el sistema ABS para asegurar un frenado óptimo y seguro."
        },
        {
            img: imgAlineacion,
            title: "Alineación y Balanceo",
            description: "Servicio de alineación de ruedas y balanceo para garantizar una conducción suave y el desgaste uniforme de los neumáticos."
        },
        {
            img: imgTransmision,
            title: "Reparación de Transmisión",
            description: "Diagnóstico y reparación de la caja de cambios, tanto manual como automática, para un cambio de marcha eficiente."
        },
        {
            img: imgCambioAceite,
            title: "Cambio de Aceite",
            description: "Cambio de aceite y filtro para mantener el motor en óptimas condiciones y prolongar su vida útil."
        },
        {
            img: imgSuspension,
            title: "Revisión de Suspensión",
            description: "Inspección y reparación de amortiguadores, struts, rótulas y otros componentes para una conducción estable."
        },
        {
            img: imgMotor,
            title: "Reparación de Motor",
            description: "Reparación completa del motor, incluyendo ajustes, cambio de bujías, correas de distribución y sistema de enfriamiento."
        },
        {
            img: imgNeumaticos,
            title: "Cambio de Neumáticos",
            description: "Reemplazo de neumáticos, reparación de pinchazos y rotación de neumáticos para asegurar una conducción segura."
        },
        {
            img: imgEscape,
            title: "Reparación de Escape",
            description: "Reparación o reemplazo del sistema de escape, catalizadores y silenciadores para reducir emisiones."
        },
        {
            img: imgRefrigeracion,
            title: "Sistema de Enfriamiento",
            description: "Revisión y reparación del radiador, mangueras, termostato y sistema de refrigeración del motor."
        },
        {
            img: imgCarroceria,
            title: "Carrocería y Pintura",
            description: "Reparación de golpes, abolladuras, pintura automotriz y restauración de la apariencia del vehículo."
        },
        {
            img: imgAireAcondicionado,
            title: "Revisión de Aire Acondicionado",
            description: "Revisión y recarga del sistema de aire acondicionado para asegurar su buen funcionamiento."
        },
        {
            img: imgLimpieza,
            title: "Limpieza Detallada de Vehículos",
            description: "Limpieza interior y exterior que incluye lavado, aspirado, encerado y detallado de componentes para mantener tu vehículo impecable."
        },
        
        // Agrega más servicios si es necesario
    ];

    // Función para abrir el modal y asignar el servicio seleccionado
    const openModal = (service) => {
        setSelectedService(service);
        setIsModalOpen(true);
    };

    // Función para cerrar el modal
    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedService(null);
    };

    return (
        <section className="servicios">
            <div className="contenedor-servicios">
                <h2 className="titulo-servicios">Nuestros servicios</h2>
                <div className="galeria-serv">
                    {services.map((service, index) => (
                        <div className="imagen-serv" key={index} onClick={() => openModal(service)}>
                            <img src={service.img} alt={service.title} />
                            <div className="hover-serv">
                                <h3>{service.title}</h3>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
                        {isModalOpen && (
                <div className="custom-modal">
                    <div className="custom-modal-content">
                        <span className="custom-close-modal" onClick={closeModal}>&times;</span>
                        <h3>{selectedService.title}</h3>
                        <p>{selectedService.description}</p>
                        <p style={{ marginTop: '10px', fontWeight: 'bold', color: '#c62828', fontSize: '1px' }}>
                        ¡Acércate al taller y pide tu servicio!
                        </p>
                    </div>
                </div>
            )}


        </section>
    );
};




const Testimonials = () => {
  const testimonials = [
      {
          name: "Maria Lopez",
          text: "Excelente servicio, me atendieron rápidamente y solucionaron el problema de mi auto!",
      },
      {
          name: "Luisa Bernal",
          text: "Gran calidad en los servicios y precios competitivos. Definitivamente volveré.",
      },
      {
        name: "Nelson Ballen",
        text: "Fue especial el trato que se me dio al arreglar mi auto, quede satisfecho. Volvere mas seguido.",
    },
  ];
  return (
    <section className="clientes contenedor">
        <h2 className="titulo">Que dicen nuestros clientes</h2>
        <div className="cards">
            {testimonials.map((testimonial, index) => (
                <div className="card" key={index}>
                    <div className="contenido-texto-card">
                        <h4>{testimonial.name}</h4>
                        <p>{`"${testimonial.text}"`}</p>
                    </div>
                </div>
            ))}
        </div>
    </section>
);
};

const Footer = () => {
    return (
        <footer>
            <div className="footer-container">
                {/* Sección Superior */}
                <div className="footer-section">
                    <h4>Horario</h4>
                    <p>Lunes a Viernes</p>
                    <p>7AM - 7PM</p>
                </div>
                
                <div className="footer-section">
                    <h4>Localidad</h4>
                    <p>Calle 17A # 102 - 56, Fontibón</p>
                </div>

                <div className="footer-section">
                    <h4>Términos</h4>
                    <a href="/terminos">Términos y Condiciones</a>
                </div>
            </div>

            {/* Redes Sociales and Mapa Section */}
            <div className="footer-bottom">
                <div className="footer-bottom-right footer-section">
                    <h4>Redes Sociales</h4>
                    <div className="social-icons">
                        <a href="https://www.facebook.com/LASERVITK" target="_blank" rel="noopener noreferrer" className="social-icon facebook">
                            <img src={FacebookIcon} alt="Facebook" />
                            <span>Facebook</span>
                        </a>
                        <a href="https://www.instagram.com/laservitk/" target="_blank" rel="noopener noreferrer" className="social-icon instagram">
                            <img src={InstagramIcon} alt="Instagram" />
                            <span>Instagram</span>
                        </a>
                        <a href="https://wa.me/3012507273" target="_blank" rel="noopener noreferrer" className="social-icon whatsapp">
                            <img src={WhatsappIcon} alt="Whatsapp" />
                            <span>Whatsapp</span>
                        </a>
                        <a href="https://www.tiktok.com/@laservitklaservit" target="_blank" rel="noopener noreferrer" className="social-icon tiktok">
                            <img src={TiktokIcon} alt="Tiktok" />
                            <span>Tiktok</span>
                        </a>
                    </div>
                </div>

                <div className="footer-bottom-left footer-section">
                    <h4>Mapa</h4>
                    <iframe
                        src="https://maps.google.com/maps?q=Calle%2017A%20%23102%20-%2056,%20Fontib%C3%B3n&t=&z=13&ie=UTF8&iwloc=&output=embed"
                        width="100%"
                        height="200"
                        frameBorder="0"
                        style={{ border: 0, borderRadius: '8px' }} // Bordes redondeados
                        allowFullScreen
                        aria-hidden="false"
                        tabIndex="0"
                    ></iframe>
                </div>
            </div>

            <div className="footer-final">
                <h2 className="titulo-final">&copy; 2024 LaServitk. Todos los derechos reservados.</h2>
            </div>
        </footer> 
    );
};

export default AdminDashboard;
