import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faClock,
    faCertificate,
    faUser,
    faSignOutAlt,
    faBars,
    faTimes,
    faCar,
    faTools,
    faAward,
    faQuoteLeft
} from '@fortawesome/free-solid-svg-icons';
import { 
    faWhatsapp, 
    faFacebookF, 
    faInstagram 
} from '@fortawesome/free-brands-svg-icons';

import './styles/ClientDashboard.css';

// Importar imágenes de servicios y productos
import imgFrenos from './Assets/servicios/revisionfrenos.jpg';
import imgAlineacion from './Assets/servicios/alineacion.jpg';
import imgTransmision from './Assets/servicios/transmision.jpg';
import imgCambioAceite from './Assets/servicios/cambioaceite.jpg';
import imgSuspension from './Assets/servicios/suspencion.png';
import imgMotor from './Assets/servicios/reparacionmotores.jpg';
import imgNeumaticos from './Assets/servicios/neumaticos.png';
import imgEscape from './Assets/servicios/escape.jpg';
import imgRefrigeracion from './Assets/servicios/enfriamiento.jpg';
import imgCarroceria from './Assets/servicios/pintura.png';
import imgAireAcondicionado from './Assets/servicios/aireacondicionado.jpg';
import imgLimpieza from './Assets/servicios/limpieza.jpg';

import imgPort100 from '../Components/Assets/productos/Pastillas.jpg';
import imgPort101 from '../Components/Assets/productos/bateria.jpg';
import imgPort102 from '../Components/Assets/productos/productoneumatico.jpg';
import imgPort103 from '../Components/Assets/productos/led.jpg';
import imgPort104 from '../Components/Assets/productos/anticongelante.jpg';
import imgPort105 from '../Components/Assets/productos/kit.png';
import imgPort106 from '../Components/Assets/productos/cambioaceite.jpg';
import imgPort109 from '../Components/Assets/productos/filtro.jpg';

import AOS from 'aos';
import 'aos/dist/aos.css';

import './styles/TallerMecanico.css';
import Slidebaraem from '../Components/empleado/Slidebaraem'

const centerModal = () => {
    const modal = document.querySelector('.service-modal-content');
    if (modal) {
        modal.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
};

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
    }
];


// Lista de productos destacados
const products = [
    {
        id: 1,
        img: imgPort102,
        title: "Neumáticos",
        description: "Neumáticos de alta calidad para todo tipo de vehículos",
        price: "$799.99"
    },
    {
        id: 2,
        img: imgPort103,
        title: "Luces LED",
        description: "Iluminación LED de última generación",
        price: "$149.99"
    },
    {
        id: 3,
        img: imgPort104,
        title: "Anticongelante",
        description: "Protección superior para el sistema de refrigeración",
        price: "$29.99"
    },
    {
        id: 4,
        img: imgPort105,
        title: "Kit de herramientas",
        description: "Set completo de herramientas profesionales",
        price: "$299.99"
    },
    {
        id: 5,
        img: imgPort106,
        title: "Aceite de motor",
        description: "Aceite sintético de alto rendimiento",
        price: "$49.99"
    },
    {
        id: 6,
        img: imgPort109,
        title: "Filtro de aceite",
        description: "Filtros de aceite de primera calidad",
        price: "$19.99"
    },
    {
        id: 7,
        img: imgPort100,
        title: "Pastillas de freno",
        description: "Pastillas de freno de alto rendimiento",
        price: "$89.99"
    },
    {
        id: 8,
        img: imgPort101,
        title: "Batería de automotriz",
        description: "Baterías de larga duración y alto rendimiento",
        price: "$199.99"
    }
];

// Lista de testimonios
const testimonials = [
    {
        text: "Excelente servicio, muy profesionales y precios justos. Totalmente recomendado.",
        author: "Juan Pérez",
        position: "Cliente desde 2020"
    },
    {
        text: "El mejor taller de la ciudad. Trabajo de calidad y atención personalizada.",
        author: "María González",
        position: "Cliente desde 2021"
    },
    {
        text: "Servicio rápido y eficiente. Los recomiendo ampliamente.",
        author: "Carlos Rodríguez",
        position: "Cliente desde 2019"
    }
];


// Componente Modal para Servicios
const ServiceModal = ({ service, onClose }) => {
    return (
        <div className="service-modal-overlay" onClick={onClose}>
            <div className="service-modal-content" onClick={e => e.stopPropagation()}>
                <button className="modal-close" onClick={onClose}>
                    <FontAwesomeIcon icon={faTimes} />
                </button>
                <div className="modal-image">
                    <img src={service.img} alt={service.title} />
                </div>
                <div className="modal-text">
                    <h3>{service.title}</h3>
                    <p>{service.description}</p>
                </div>
            </div>
        </div>
    );
};

// Componente Modal para Productos
const ProductModal = ({ product, onClose }) => {
    const [productDetails, setProductDetails] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProductDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:2071/api/productos/${product.id}`);
                setProductDetails(response.data);
            } catch (error) {
                console.error('Error al obtener los detalles del producto:', error);
            }
        };

        fetchProductDetails();
    }, [product.id]);


    return (
        <div className="service-modal-overlay" onClick={onClose}>
            <div className="service-modal-content" onClick={e => e.stopPropagation()}>
                <button className="modal-close" onClick={onClose}>
                    <FontAwesomeIcon icon={faTimes} />
                </button>
                <div className="modal-image">
                    <img src={product.img} alt={product.title} />
                </div>
                <div className="modal-text">
                    <h3>{product.title}</h3>
                    {productDetails ? (
                        <>
                            <p>{productDetails.descripcion}</p>
                            <p>Cantidad en stock: {productDetails.cantidad_en_stock}</p>
                            <p>Precio: ${productDetails.precio_compra}</p>
                        </>
                    ) : (
                        <p>Cargando detalles del producto...</p>
                    )}
                </div>
            </div>
        </div>
    );
};
// Header component con logout y opciones de menú
const Header = () => {
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/');
    };

    return (
        <nav className="taller-navbar">
                        <Slidebaraem />

            <a href="#" className="taller-logo">
                <img src={require('./Assets/servilogo.png')} alt="La Servitk Logo" className="logo-image" />
                La Servitk
            </a>
            <div 
                className={`taller-menu-toggle ${isMenuOpen ? 'active' : ''}`}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
                <FontAwesomeIcon icon={isMenuOpen ? faTimes : faBars} />
            </div>

            <ul className={`taller-nav-links ${isMenuOpen ? 'active' : ''}`}>
                <li><a href="#nosotros">Nosotros</a></li>
                <li><a href="#productos">Productos</a></li>
                <li><a href="#servicios">Servicios</a></li>
                <li><a href="#testimonios">Testimonios</a></li>
                <li><a href="#contacto">Contacto</a></li>
            </ul>
        </nav>
    );
};

const EmployeeDashboard = () => {
    const [selectedService, setSelectedService] = useState(null);
    const [selectedProduct, setSelectedProduct] = useState(null);

    useEffect(() => {
        AOS.init({
            duration: 1000,
            once: false,
            mirror: true,
        });
    }, []);

    useEffect(() => {
        if (selectedService || selectedProduct) {
            document.body.classList.add('modal-open');
            centerModal();
        } else {
            document.body.classList.remove('modal-open');
        }
    }, [selectedService, selectedProduct]);

    return (
        <div className="taller-container">
            {/* Imagen de fondo */}
            <div className="taller-background">
                <div className="taller-background-overlay">
                    ¡Bienvenido al panel de empleado!
                </div>
            </div>

            {/* Usar Header en vez de Navbar */}
            <Header />


            <section className="taller-description" id="nosotros" data-aos="fade-up">
    <div className="description-container">
        <div className="description-content">
            <h2>Bienvenidos a La Servitk</h2>
            <p>Con más de 15 años de experiencia, somos el taller de confianza para el mantenimiento y reparación de tu vehículo. Nuestro equipo de técnicos certificados utiliza tecnología de última generación para garantizar un servicio de calidad.</p>
            <div className="description-features">
                <div className="feature" data-aos="fade-right">
                    <FontAwesomeIcon icon={faTools} className="feature-icon" />
                    <h3>Experiencia</h3>
                    <p>15+ años en el mercado</p>
                </div>
                <div className="feature" data-aos="fade-right">
                    <FontAwesomeIcon icon={faCertificate} className="feature-icon" />
                    <h3>Certificados</h3>
                    <p>Personal calificado</p>
                </div>
                <div className="feature" data-aos="fade-right">
                    <FontAwesomeIcon icon={faAward} className="feature-icon" />
                    <h3>Garantía</h3>
                    <p>Satisfacción garantizada</p>
                </div>
            </div>
        </div>
        <div className="description-image" data-aos="fade-left">
            <img src={require('./Assets/2.jpg')} alt="La Servitk Taller" />
        </div>
    </div>
</section>



            {/* Productos Section */}
            <section className="taller-products" id="productos" data-aos="fade-up">
                <h2>Productos Destacados</h2>
                <div className="products-gallery">
                    {products.map((product, index) => (
                        <div 
                            key={index} 
                            className="gallery-item"
                            onClick={() => setSelectedProduct(product)}
                            data-aos="fade-up"
                        >
                            <img src={product.img} alt={product.title} />
                            <div className="gallery-item-overlay">
                                <span>{product.title}</span>
                            </div>
                        </div>
                    ))}
                </div>
                {selectedProduct && (
                    <ProductModal 
                        product={selectedProduct} 
                        onClose={() => setSelectedProduct(null)} 
                    />
                )}
            </section>

            {/* Servicios Section */}
            <section className="taller-services" id="servicios" data-aos="fade-up">
                <h2>Nuestros Servicios</h2>
                <div className="services-gallery">
                    {services.map((service, index) => (
                        <div 
                            key={index} 
                            className="gallery-item"
                            onClick={() => setSelectedService(service)}
                            data-aos="fade-up"
                        >
                            <img src={service.img} alt={service.title} />
                            <div className="gallery-item-overlay">
                                <span>{service.title}</span>
                            </div>
                        </div>
                    ))}
                </div>
                {selectedService && (
                    <ServiceModal 
                        service={selectedService} 
                        onClose={() => setSelectedService(null)} 
                    />
                )}
            </section>

            {/* Testimonios Section */}
            <section className="taller-testimonials" id="testimonios" data-aos="fade-up">
                <h2>Testimonios</h2>
                <div className="testimonials-container">
                    {testimonials.map((testimonial, index) => (
                        <div key={index} className="testimonial" data-aos="fade-up">
                            <FontAwesomeIcon icon={faQuoteLeft} className="quote-icon" />
                            <div className="testimonial-content">
                                <p>{testimonial.text}</p>
                                <h4>{testimonial.author}</h4>
                                <span>{testimonial.position}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Footer */}
           <footer className="taller-footer" id="contacto">
                <div className="footer-content">
                    <div className="footer-section">
                        <h3>
                            <FontAwesomeIcon icon={faCar} className="footer-title-icon" />
                            La Servitk
                        </h3>
                        <p>Tu taller de confianza para el mantenimiento y reparación de tu vehículo.</p>
                        <div className="social-links">
                            <button 
                                className="social-button"
                                onClick={() => window.open('https://wa.me/1234567890', '_blank')}
                                aria-label="WhatsApp"
                            >
                                <FontAwesomeIcon icon={faWhatsapp} />
                            </button>
                            <button 
                                className="social-button"
                                onClick={() => window.open('https://facebook.com/laservitk', '_blank')}
                                aria-label="Facebook"
                            >
                                <FontAwesomeIcon icon={faFacebookF} />
                            </button>
                            <button 
                                className="social-button"
                                onClick={() => window.open('https://instagram.com/laservitk', '_blank')}
                                aria-label="Instagram"
                            >
                                <FontAwesomeIcon icon={faInstagram} />
                            </button>
                        </div>
                    </div>
                    <div className="footer-section">
                        <h3>Contacto</h3>
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
                <div className="footer-bottom">
                    <p>&copy; 2024 LaServitk. Todos los derechos reservados.</p>
                </div>
            </footer>
        </div>
    );
};

export default EmployeeDashboard;