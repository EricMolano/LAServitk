import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Modal from '../admin/ModalAdmin'; // Asegúrate de tener un componente Modal para mostrar errores
import '../styles/AgregarServicio.css'; // Import the CSS file

function AgregarServicio() {
    const [nombre_empleado, setNombreEmpleado] = useState('');
    const [nombre_cliente, setNombreCliente] = useState('');
    const [placa_vehiculo, setPlacaVehiculo] = useState('');
    const [nombre_servicio, setNombreServicio] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [costo, setCosto] = useState('');
    const [error, setError] = useState('');
    const [modalOpen, setModalOpen] = useState(false); // Estado para controlar el modal
    const navigate = useNavigate();

    const servicios = [
        "Revisión de Frenos",
        "Alineación y Balanceo",
        "Reparación de Transmisión",
        "Cambio de Aceite",
        "Revisión de Suspensión",
        "Reparación de Motor",
        "Cambio de Neumáticos",
        "Reparación de Escape",
        "Sistema de Enfriamiento",
        "Carrocería y Pintura",
        "Revisión de Aire Acondicionado",
        "Limpieza Detallada de Vehículos"
    ];

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Validaciones
        if (!nombre_empleado || !nombre_cliente || !placa_vehiculo || !nombre_servicio || !costo) {
            setError('Todos los campos son obligatorios.');
            setModalOpen(true);
            return;
        }

        if (isNaN(costo) || costo <= 0) {
            setError('El costo debe ser un número positivo.');
            setModalOpen(true);
            return;
        }

        try {
            const response = await axios.post('https://laservitk-production.up.railway.app/api/servicios', {
                nombre_empleado,
                nombre_cliente,
                placa_vehiculo,
                nombre_servicio,
                descripcion,
                costo
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });

            // Redirigir al usuario después de agregar el servicio
            navigate('/AdminDashboard');
        } catch (error) {
            console.error('Error al agregar el servicio:', error);
            setError(error.response?.data?.message || 'Error al agregar el servicio');
            setModalOpen(true);
        }
    };

    const handleCloseModal = () => {
        setModalOpen(false);
        setError(''); // Limpiar el error al cerrar el modal
    };

    return (
        <div className="agregar-servicio-container">
            <h2>Agregar Nuevo Servicio</h2>
            <form onSubmit={handleSubmit} className="agregar-servicio-form">
                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="nombre_empleado">Nombre del Empleado:</label>
                        <input
                            type="text"
                            id="nombre_empleado"
                            value={nombre_empleado}
                            onChange={(e) => setNombreEmpleado(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="nombre_cliente">Nombre del Cliente:</label>
                        <input
                            type="text"
                            id="nombre_cliente"
                            value={nombre_cliente}
                            onChange={(e) => setNombreCliente(e.target.value)}
                            required
                        />
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="placa_vehiculo">Placa del Vehículo:</label>
                        <input
                            type="text"
                            id="placa_vehiculo"
                            value={placa_vehiculo}
                            onChange={(e) => setPlacaVehiculo(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="nombre_servicio">Nombre del Servicio:</label>
                        <select
                            id="nombre_servicio"
                            value={nombre_servicio}
                            onChange={(e) => setNombreServicio(e.target.value)}
                            required
                        >
                            <option value="">Selecciona un servicio</option>
                            {servicios.map((servicio, index) => (
                                <option key={index} value={servicio}>{servicio}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="descripcion">Descripción:</label>
                        <textarea
                            id="descripcion"
                            value={descripcion}
                            onChange={(e) => setDescripcion(e.target.value)}
                        ></textarea>
                    </div>
                    <div className="form-group">
                        <label htmlFor="costo">Costo:</label>
                        <input
                            type="number"
                            id="costo"
                            value={costo}
                            onChange={(e) => setCosto(e.target.value)}
                            required
                        />
                    </div>
                </div>
                <button type="submit">Agregar Servicio</button>
            </form>

            {/* Modal para mostrar errores */}
            <Modal isOpen={modalOpen} onClose={handleCloseModal} message={error} />
        </div>
    );
}

export default AgregarServicio;