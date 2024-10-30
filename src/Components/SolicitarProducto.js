import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import Modal from './cliente/ModalCliente'; // Importar el componente Modal
import './styles/SolicitarProducto.css'; // Asegúrate de tener un archivo CSS para los estilos

function SolicitarProducto() {
    const location = useLocation();
    const [productos, setProductos] = useState([]);
    const [productoSeleccionado, setProductoSeleccionado] = useState(location.state?.selectedProduct || '');
    const [cantidad, setCantidad] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProductos = async () => {
            try {
                const response = await axios.get('http://localhost:2071/api/productos', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
                setProductos(response.data);
            } catch (error) {
                console.error('Error al obtener los productos:', error);
            }
        };

        fetchProductos();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setErrorMessage('');
        setSuccessMessage('');
        setIsModalOpen(false);

        try {
            const response = await axios.post('http://localhost:2071/api/solicitar-producto', {
                id_producto: productoSeleccionado,
                cantidad
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });

            setSuccessMessage('Producto solicitado exitosamente.');
            setIsSuccess(true);
            setIsModalOpen(true);
            setTimeout(() => navigate('/ClientDashboard'), 2000);
        } catch (error) {
            console.error('Error al solicitar el producto:', error);
            setErrorMessage(error.response?.data?.message || 'Error al solicitar el producto');
            setIsSuccess(false);
            setIsModalOpen(true);
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setErrorMessage('');
        setSuccessMessage('');
    };

    return (
        <div className="solicitar-producto">
            <h2>Solicitar Producto</h2>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <form onSubmit={handleSubmit} className="solicitar-form">
                <div className="form-group">
                    <label htmlFor="producto">Producto:</label>
                    <select
                        id="producto"
                        value={productoSeleccionado}
                        onChange={(e) => setProductoSeleccionado(e.target.value)}
                        required
                    >
                        <option value="" disabled>Seleccione un producto</option> {/* Opción no elegible */}
                        {productos.map(producto => (
                            <option key={producto.id} value={producto.id}>
                                {producto.nombre}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="cantidad">Cantidad:</label>
                    <input
                        type="number"
                        id="cantidad"
                        value={cantidad}
                        onChange={(e) => setCantidad(e.target.value)}
                        min="0" // Prevenir valores negativos
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">Solicitar</button>
            </form>

            {isModalOpen && <Modal message={errorMessage || successMessage} onClose={closeModal} isSuccess={isSuccess} />}
        </div>
    );
}

export default SolicitarProducto;