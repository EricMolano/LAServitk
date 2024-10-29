import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faWrench, 
    faOilCan, 
    faBolt, 
    faGears,
    faClock,
    faCheckCircle,
    faCertificate,
    faMapMarkerAlt,
    faPhone,
    faEnvelope,
    faUser,
    faSignInAlt,
    faUserPlus,
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

import './styles/TallerMecanico.css';
// Importar imágenes de servicios
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





// Lista de servicios
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
        img: imgCambioAceite,
        title: "Aceite Sintético Premium",
        description: "Aceite de alto rendimiento para motores modernos",
        price: "$299.99"
    },
    {
        img: imgFrenos,
        title: "Pastillas de Freno Premium",
        description: "Mayor durabilidad y rendimiento",
        price: "$199.99"
    },
    {
        img: imgNeumaticos,
        title: "Neumáticos Todo Terreno",
        description: "Máxima tracción y durabilidad",
        price: "$799.99"
    },
    {
        img: imgRefrigeracion,
        title: "Refrigerante de Alto Rendimiento",
        description: "Protección superior para tu motor",
        price: "$49.99"
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

// Componente Modal
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
                    <a href="/login" className="login-link">
                        Ingresa Ahora
                    </a>
                </div>
            </div>
        </div>
    );
};

const ProductModal = ({ product, onClose }) => {
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
                    <p>{product.description}</p>
                    <span className="product-price">{product.price}</span>
                    <a href="/login" className="login-link">
                        Ingresa Ahora
                    </a>
                </div>
            </div>
        </div>
    );
};

const TallerMecanico = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [selectedService, setSelectedService] = useState(null);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

    return (
        <div className="taller-container">
            {/* Navbar */}

            <nav className="taller-navbar">
    {/* Logo clickeable */}
    <a href="#" className="taller-logo">
        La Servitk
    </a>
    
    {/* Menú de Usuario */}
    <div className="user-menu-container">
        <button 
            className="user-menu-button"
            onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
        >
            <FontAwesomeIcon icon={faUser} />
        </button>
        <div className={`user-menu-dropdown ${isUserMenuOpen ? 'active' : ''}`}>
            <a href="/login" className="user-menu-item">
                <FontAwesomeIcon icon={faSignInAlt} />
                Ingreso
            </a>
            <a href="/register" className="user-menu-item">
                <FontAwesomeIcon icon={faUserPlus} />
                Registro
            </a>
        </div>
    </div>

    {/* Menú hamburguesa */}
    <div 
        className={`taller-menu-toggle ${isMenuOpen ? 'active' : ''}`}
        onClick={() => setIsMenuOpen(!isMenuOpen)}
    >
        <FontAwesomeIcon icon={isMenuOpen ? faTimes : faBars} />
    </div>

    {/* Links de navegación (sin el enlace de inicio) */}
    <ul className={`taller-nav-links ${isMenuOpen ? 'active' : ''}`}>
        <li><a href="#nosotros">Nosotros</a></li>
        <li><a href="#productos">Productos</a></li>
        <li><a href="#servicios">Servicios</a></li>
        <li><a href="#testimonios">Testimonios</a></li>
        <li><a href="#contacto">Contacto</a></li>
    </ul>
</nav>
            {/* Hero Section */}
            <main className="taller-hero" id="inicio">
                <div className="taller-hero-content">
                    <h1>Servicio Mecánico Profesional</h1>
                    <p>Reparación y mantenimiento experto para tu vehículo</p>
                    <div className="taller-cta-buttons">
                        <button className="taller-cta-primary">
                            <FontAwesomeIcon icon={faClock} className="button-icon" />
                            Agendar Cita
                        </button>
                        <button className="taller-cta-secondary">
                            <FontAwesomeIcon icon={faTools} className="button-icon" />
                            Ver Servicios
                        </button>
                    </div>
                </div>
            </main>

            {/* Descripción del Taller */}
            <section className="taller-description" id="nosotros">
                <div className="description-container">
                    <div className="description-content">
                        <h2>Bienvenidos a La Servitk</h2>
                        <p>Con más de 15 años de experiencia, somos el taller de confianza para el mantenimiento y reparación de tu vehículo. Nuestro equipo de técnicos certificados utiliza tecnología de última generación para garantizar un servicio de calidad.</p>
                        <div className="description-features">
                            <div className="feature">
                                <FontAwesomeIcon icon={faTools} className="feature-icon" />
                                <h3>Experiencia</h3>
                                <p>15+ años en el mercado</p>
                            </div>
                            <div className="feature">
                                <FontAwesomeIcon icon={faCertificate} className="feature-icon" />
                                <h3>Certificados</h3>
                                <p>Personal calificado</p>
                            </div>
                            <div className="feature">
                                <FontAwesomeIcon icon={faAward} className="feature-icon" />
                                <h3>Garantía</h3>
                                <p>Satisfacción garantizada</p>
                            </div>
                        </div>
                    </div>
                    <div className="description-image">
                        <img src="/taller-imagen.jpg" alt="La Servitk Taller" />
                    </div>
                </div>
            </section>

{/* Productos Section */}
<section className="taller-products" id="productos">
    <h2>Productos Destacados</h2>
    <div className="products-gallery">
        {products.map((product, index) => (
            <div 
                key={index} 
                className="gallery-item"
                onClick={() => setSelectedProduct(product)}
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
            <section className="taller-services" id="servicios">
                <h2>Nuestros Servicios</h2>
                <div className="services-gallery">
                    {services.map((service, index) => (
                        <div 
                            key={index} 
                            className="gallery-item"
                            onClick={() => setSelectedService(service)}
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
            <section className="taller-testimonials" id="testimonios">
                <h2>Lo que dicen nuestros clientes</h2>
                <div className="testimonials-grid">
                    {testimonials.map((testimonial, index) => (
                        <div key={index} className="testimonial-card">
                            <div className="testimonial-content">
                                <FontAwesomeIcon icon={faQuoteLeft} className="quote-icon" />
                                <p>{testimonial.text}</p>
                            </div>
                            <div className="testimonial-author">
                                <div className="author-info">
                                    <h4>{testimonial.author}</h4>
                                    <p>{testimonial.position}</p>
                                </div>
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
                        
                        <h3>Newsletter</h3>
                        <div className="newsletter-form">
                            <input type="email" placeholder="Tu correo electrónico" />
                            <button>
                                <FontAwesomeIcon icon={faEnvelope} className="button-icon" />
                                Suscribirse
                            </button>
                        </div>
                    </div>
                </div>
                <div className="footer-bottom">
                    <p>&copy; 2024 LaServitk. Todos los derechos reservados.</p>
                </div>
            </footer>
        </div>
    );
};

export default TallerMecanico;