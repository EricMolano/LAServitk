import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Modal from './Modal'; // Importar el componente Modal
import '../styles/Edit.css';

function EditInventory() {
    const { id } = useParams();
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

    useEffect(() => {
        const fetchInventory = async () => {
            try {
                const response = await axios.get(`http://localhost:2071/api/inventory/${id}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
                setFormData(response.data);
            } catch (error) {
                setErrorMessage('Error al obtener el inventario.'); // Mostrar mensaje de error
                setIsSuccess(false); // No es un éxito
                setIsModalOpen(true); // Mostrar modal
                console.error('Error al obtener el inventario:', error);
            }
        };
        fetchInventory();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage(''); // Limpiar mensajes anteriores
        setSuccessMessage(''); // Limpiar mensajes anteriores
        setIsModalOpen(false); // Cerrar modal anterior

        try {
            await axios.put(`http://localhost:2071/api/inventory/${id}`, formData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            setSuccessMessage('Inventario actualizado exitosamente.'); // Mensaje de éxito
            setIsSuccess(true); // Indicar éxito
            setIsModalOpen(true); // Mostrar modal
            // Redirigir después de un breve delay
            setTimeout(() => navigate('/AdminDashboard'), 2000); 
        } catch (error) {
            setErrorMessage('Error al actualizar el inventario.'); // Mensaje de error
            setIsSuccess(false); // Indicar error
            setIsModalOpen(true); // Mostrar modal
            console.error('Error al actualizar el inventario:', error);
        }
    };

    const closeModal = () => {
        setIsModalOpen(false); // Cerrar modal
        setErrorMessage(''); // Limpiar mensaje de error
        setSuccessMessage(''); // Limpiar mensaje de éxito
    };

    return (
        <div className="edit-inventory">
            <h2>Editar Inventario</h2>
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
                <button type="submit">Actualizar</button>
            </form>

            {/* Modal para mostrar el error o éxito */}
            {isModalOpen && <Modal message={errorMessage || successMessage} onClose={closeModal} isSuccess={isSuccess} />}
        </div>
    );
}

export default EditInventory;