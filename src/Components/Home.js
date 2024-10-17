import React , { useState }from 'react';
import { Outlet, Link , useNavigate  } from 'react-router-dom';

import imgPort1 from '../Components/Assets/2.jpg';
import imgPort2 from '../Components/Assets/3.jpg';
import imgPort3 from '../Components/Assets/alineacion.jpg';
import imgAlineacion from '../Components/Assets/alineacion.jpg';
import imgPort4 from '../Components/Assets/bateria.jpg';
import imgFace1 from '../Components/Assets/face1.jpg';
import imgFace2 from '../Components/Assets/face2.jpg';
import imgIcono1 from '../Components/Assets/icono1.png';
import imgIlustracion2 from '../Components/Assets/ilustracion2.svg';
import imgPort7 from '../Components/Assets/mecanico.jpg';
import imgPort6 from '../Components/Assets/reparacionmotores.jpg';
import imgFrenos from '../Components/Assets/revisionfrenos.jpg';
import imgPort8 from '../Components/Assets/suspencion.jpg';

import miImagen4 from '../Components/Assets/img4.jpeg';

import imgTransmision from '../Components/Assets/transmision.jpg';

//Produtos imagenes
import imgPort100 from '../Components/Assets/pastillas.jpg';
import imgPort101 from '../Components/Assets/automotriz.jpg';
import imgPort102 from '../Components/Assets/productoneumatico.jpg';
import imgPort103 from '../Components/Assets/led.jpg';
import imgPort104 from '../Components/Assets/anticongelante.jpg';
import imgPort105 from '../Components/Assets/kit.jpg';
import imgPort106 from '../Components/Assets/cambioaceite.png';
import imgPort109 from '../Components/Assets/filtro.jpg';
import carritoLogo from '../Components/Assets/carritoLogo.png';


import '../styles/Home2.css'; 

const Home = () => {
    return (
        <div>
            <Header />
            <Main />
            <Footer />
        </div>
    );
};
const Header = () => {
  return (
      <header>
          <nav>
              <div className='link'>
                  <Link to="/register" className='register-link'>Registrarse</Link>
                  <Link to="/login" className='login-link'>Ingresar</Link>
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
          description: "Neumáticos de alta calidad diseñados para brindar un excelente rendimiento y seguridad en la carretera. Disponibles en varios tamaños para adaptarse a diferentes modelos de vehículos.",
          usage: "Se utilizan para reemplazar neumáticos desgastados o dañados, mejorando la tracción y el control del vehículo. Se recomienda cambiarlos cada 50,000 km o según el desgaste.",
          features: "Tamaños disponibles: 195/65R15, 205/55R16, 225/45R17. Alta adherencia en superficies mojadas, resistencia al desgaste, tecnología de reducción de ruido, diseño optimizado para un manejo mejorado.",
          benefits: "Mejoran la seguridad al reducir la distancia de frenado y proporcionar un mejor agarre en condiciones climáticas adversas. También contribuyen a un manejo más suave y a una mayor eficiencia de combustible.",
      },
      {
          src: imgPort103,
          alt: "Imagen 13",
          text: "Luces LED",
          description: "Luces LED brillantes que mejoran significativamente la visibilidad durante la conducción nocturna. Ofrecen una iluminación más clara y eficiente en comparación con las bombillas halógenas.",
          usage: "Se instalan en el sistema de iluminación del vehículo, como faros delanteros o luces traseras. Se recomienda su instalación por un profesional para asegurar el correcto alineamiento.",
          features: "Potencia: 12W, Voltaje: 12V, Color de luz: Blanco frío (6000K). Larga duración de hasta 30,000 horas, resistente al agua y al polvo.",
          benefits: "Mejoran la seguridad durante la conducción nocturna al aumentar la visibilidad. Además, consumen menos energía, lo que puede ayudar a mejorar la eficiencia del combustible.",
      },
      {
          src: imgPort104,
          alt: "Imagen 14",
          text: "Anticongelante",
          description: "Anticongelante de alta eficiencia que protege tu motor en temperaturas extremas, evitando el sobrecalentamiento y el congelamiento.",
          usage: "Se mezcla con agua en el sistema de refrigeración del vehículo, en una proporción recomendada de 50/50 para asegurar una protección óptima. Cambiar cada 2 años o según el manual del vehículo.",
          features: "Presentación: 1 litro y 5 litros. Fórmula a base de etilenglicol, compatible con la mayoría de los sistemas de refrigeración, punto de congelación -37°C.",
          benefits: "Prolonga la vida útil del motor al evitar daños por temperaturas extremas y corrosión. Mejora la eficiencia del sistema de refrigeración, asegurando un rendimiento óptimo.",
      },
      {
          src: imgPort105,
          alt: "Imagen 15",
          text: "Kit de herramientas",
          description: "Kit completo de herramientas diseñado para el mantenimiento y reparación de vehículos. Incluye una variedad de herramientas esenciales.",
          usage: "Se utiliza para realizar reparaciones menores y ajustes en tu vehículo. Ideal para mecánicos aficionados y profesionales.",
          features: "Incluye: Llaves ajustables, destornilladores, pinzas, martillo, y un maletín de transporte. Total de 150 piezas, fabricadas en acero al carbono de alta resistencia.",
          benefits: "Facilita el mantenimiento del vehículo, permitiendo realizar reparaciones de forma rápida y eficiente. Ahorra tiempo y dinero en servicios mecánicos.",
      },
      {
          src: imgPort106,
          alt: "Imagen 5",
          text: "Aceite de motor",
          description: "Aceite de motor premium que asegura un rendimiento óptimo y prolonga la vida útil del motor.",
          usage: "Se utiliza en el motor para lubricar sus componentes internos. Cambiar cada 5,000 km o según las especificaciones del fabricante del vehículo.",
          features: "Viscosidad: 5W-30, cumple con las especificaciones API SN. Fórmula sintética, protege contra el desgaste y la corrosión.",
          benefits: "Prolonga la vida útil del motor, mejora su eficiencia y reduce el consumo de combustible. Ayuda a mantener el motor limpio y libre de depósitos.",
      },
      {
          src: imgPort109,
          alt: "Imagen 9",
          text: "Filtro de aceite",
          description: "Filtro de aceite de larga duración diseñado para mantener el aceite del motor limpio y libre de impurezas.",
          usage: "Se instala en el motor para filtrar las impurezas del aceite. Se recomienda cambiarlo junto con el aceite del motor cada 5,000 km.",
          features: "Compatible con la mayoría de motores de automóviles, con un sistema de filtrado de múltiples capas para mayor eficacia.",
          benefits: "Ayuda a prolongar la vida útil del motor al mantener el aceite limpio, mejorando su eficiencia y rendimiento.",
      },
      {
          src: imgPort100,
          alt: "Imagen 10",
          text: "Pastillas de freno",
          description: "Pastillas de freno de alta performance diseñadas para ofrecer una frenada eficaz y segura.",
          usage: "Se instalan en el sistema de frenos del vehículo. Recomendadas para reemplazo cada 30,000 km o cuando el indicador de desgaste se active.",
          features: "Compatible con vehículos de pasajeros, diseño optimizado para un rendimiento superior en condiciones de alta temperatura.",
          benefits: "Mejoran la seguridad al proporcionar una frenada efectiva y constante, aumentando la confianza durante la conducción.",
      },
      {
          src: imgPort101,
          alt: "Imagen 11",
          text: "Batería de automotriz",
          description: "Batería confiable diseñada para arranques seguros y proporcionar energía a todos los sistemas eléctricos del vehículo.",
          usage: "Se instala en el compartimento del motor para proporcionar energía eléctrica. Reemplazar cada 3 a 5 años o según el rendimiento.",
          features: "Capacidad: 75Ah, tipo: Batería de plomo-ácido, terminales de alta calidad para mejor conexión. Resistente a vibraciones.",
          benefits: "Asegura un arranque confiable, un funcionamiento óptimo del vehículo y prolonga la vida útil de los componentes eléctricos.",
      },
  ];
  

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const openModal = (product) => {
      setSelectedProduct(product);
      setModalOpen(true);
  };

  const closeModal = () => {
      setModalOpen(false);
      setSelectedProduct(null);
  };

  const redirectToLogin = () => {
      closeModal(); // Cierra el modal
      navigate("/login"); 
  };

  return (
      <section className="portafolio">
          <div className="contenedor">
              <h2 className="titulo">Inventario</h2>
              <div className="galeria-port">
                  {images.map((image, index) => (
                      <div className="imagen-port" key={index} onClick={() => openModal(image)}>
                          <img src={image.src} alt={image.alt} />
                          <div className="hover-galeria">
                              <img src={imgIcono1} alt="Icono" />
                              <p>{image.text}</p>
                          </div>
                      </div>
                  ))}
              </div>

              {/* Modal */}
              {modalOpen && (
                  <div className="modal-overlay">
                      <div className="modal">
                          <div className="modal-header">
                              <h3>{selectedProduct?.text}</h3>
                              <img src={carritoLogo} alt="Carrito" className="cart-icon" onClick={redirectToLogin} />
                          </div>
                          <p><strong>Descripción:</strong> {selectedProduct?.description}</p>
                          <p><strong>Uso:</strong> {selectedProduct?.usage}</p>
                          <p><strong>Características:</strong> {selectedProduct?.features}</p>
                          <p><strong>Beneficios:</strong> {selectedProduct?.benefits}</p>
                          <button onClick={closeModal} className="close-modal">✖ Cerrar</button>
                      </div>
                  </div>
              )}
          </div>
      </section>
  );
};

const Services = () => {
    const services = [
        {
            img: imgFrenos,
            title: "Revisión de Frenos",
        },
        {
            img: imgAlineacion,
            title: "Alineación y Balanceo",
        },
        {
            img: imgTransmision,
            title: "Reparación de Transmisión",
        },
    ];

    return (
        <section className="servicios">
            <div className="contenedor-servicios">
                <h2 className="titulo-servicios">Nuestros servicios</h2>
                <div className="galeria-serv">
                    {services.map((service, index) => (
                        <div className="imagen-serv" key={index}>
                            <img src={service.img} alt={service.title} />
                            <div className="hover-serv">
                                <h3>{service.title}</h3>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
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
            <div className="contenedor-footer">
                <div className="content-foo">
                    <h4>Phone</h4>
                    <p>3203565617</p>
                </div>
                <div className="content-foo">
                    <h4>hour</h4>
                    <p>Lunes a Viernes de 7AM - 7PM</p>
                </div>
                <div className="content-foo">
                    <h4>Location</h4>
                    <p>Calle 17A # 102 - 56, Fontibon</p>
                </div>
            </div>
            <h2 className="titulo-final">&copy; © 2024 LaServitk. Todos los derechos reservados.</h2>
        </footer>
    );
};

export default Home;
