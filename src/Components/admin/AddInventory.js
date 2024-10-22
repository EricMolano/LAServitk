import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
<<<<<<< HEAD
import Modal from './Modal'; // Importar el componente Modal
=======
import Modal from './Modal';  // Asegúrate de importar el componente Modal
import '../styles/AddInventory.css'; // Asegúrate de tener un archivo CSS para los estilos
>>>>>>> ac193e589a63740468e43d280a8d123f90545286

function AddInventory() {
    const [formData, setFormData] = useState({
        nombre: '',
        descripcion: '',
        cantidad_en_stock: '',
        precio_compra: '',
    });
    const [errorMessage, setErrorMessage] = useState(''); // Para el mensaje de error
    const [successMessage, setSuccessMessage] = useState(''); // Para el mensaje de éxito
    const [isModalOpen, setIsModalOpen] = useState(false); // Control del estado del modal
    const [isSuccess, setIsSuccess] = useState(false); // Control del estado de éxito o error
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleLogout = () => {
        // Elimina el token de autenticación
        localStorage.removeItem("token");
        // Redirige a la página de inicio
        navigate("/");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage(''); // Limpiar mensajes anteriores
        setSuccessMessage(''); // Limpiar mensajes anteriores
        setIsModalOpen(false); // Cerrar modal anterior

        // Validaciones
        if (!formData.nombre || !formData.cantidad_en_stock || !formData.precio_compra) {
            setErrorMessage('Todos los campos son obligatorios.'); // Mensaje de error
            setIsSuccess(false); // Indicar error
            setIsModalOpen(true); // Mostrar modal
            return;
        }

        if (formData.cantidad_en_stock < 0) {
            setErrorMessage('La cantidad en stock no puede ser negativa.'); // Mensaje de error
            setIsSuccess(false); // Indicar error
            setIsModalOpen(true); // Mostrar modal
            return;
        }

        if (formData.precio_compra <= 0) {
            setErrorMessage('El precio de compra debe ser un número positivo.'); // Mensaje de error
            setIsSuccess(false); // Indicar error
            setIsModalOpen(true); // Mostrar modal
            return;
        }

        try {
            await axios.post('http://localhost:2071/api/inventory', formData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            setSuccessMessage('Inventario agregado exitosamente.'); // Mensaje de éxito
            setIsSuccess(true); // Indicar éxito
            setIsModalOpen(true); // Mostrar modal
            // Redirigir después de un breve delay
            setTimeout(() => navigate('/AdminDashboard'), 2000); 
        } catch (error) {
            setErrorMessage('Error al agregar el inventario.'); // Mensaje de error
            setIsSuccess(false); // Indicar error
            setIsModalOpen(true); // Mostrar modal
        }
    };

    const closeModal = () => {
        setIsModalOpen(false); // Cerrar modal
        setErrorMessage(''); // Limpiar mensaje de error
        setSuccessMessage(''); // Limpiar mensaje de éxito
    };

    return (
        <div>
            <Navbar handleLogout={handleLogout} />
            <div className="add-inventory">
                <form onSubmit={handleSubmit} className="inventory-form">
                    <div className="form-row">
                        <div className="form-group">
                            <label>Nombre</label>
                            <input
                                type="text"
                                name="nombre"
                                value={formData.nombre}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Descripción</label>
                            <textarea
                                name="descripcion"
                                value={formData.descripcion}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group">
                            <label>Cantidad en Stock</label>
                            <input
                                type="number"
                                name="cantidad_en_stock"
                                value={formData.cantidad_en_stock}
                                onChange={handleChange}
                                min="0" // Limitar a valores no negativos
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Precio de Compra</label>
                            <input
                                type="number"
                                name="precio_compra"
                                value={formData.precio_compra}
                                onChange={handleChange}
                                step="0.01"
                                min="0" // Limitar a valores no negativos
                                required
                            />
                        </div>
                    </div>
                    <button type="submit">Agregar</button>
                </form>
            </div>

            {/* Modal para mostrar el error o éxito */}
            {isModalOpen && <Modal message={errorMessage || successMessage} onClose={closeModal} isSuccess={isSuccess} />}
        </div>
    );
}

function Navbar({ handleLogout }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
  
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <div className="navbar">
            <h1>Nuevo Servicio</h1>
            <div className="user-menu">
                <button className="user-btn" onClick={toggleMenu}>
                    ▼
                </button>
                {isMenuOpen && (
                    <div className="user-dropdown">
                        <ul>
                            <li>
                                <button className="logout-button" onClick={handleLogout}>
                                    Cerrar Sesión
                                </button>
                            </li>
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
}

export default AddInventory;