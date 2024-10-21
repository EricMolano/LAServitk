import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AgregarServicio() {
    const [nombre_empleado, setNombreEmpleado] = useState('');
    const [nombre_cliente, setNombreCliente] = useState('');
    const [placa_vehiculo, setPlacaVehiculo] = useState('');
    const [nombre_servicio, setNombreServicio] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [costo, setCosto] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post('http://localhost:2071/api/servicios', {
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
            navigate('/EmployeeDashboard');
        } catch (error) {
            console.error('Error al agregar el servicio:', error);
            setError(error.response?.data?.message || 'Error al agregar el servicio');
        }
    };

    return (
        <div className="formulario-servicio">
            <h2>Agregar Nuevo Servicio</h2>
            {error && <p className="error-message">{error}</p>}
            <form onSubmit={handleSubmit}>
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
                    <input
                        type="text"
                        id="nombre_servicio"
                        value={nombre_servicio}
                        onChange={(e) => setNombreServicio(e.target.value)}
                        required
                    />
                </div>
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
                <button type="submit" className="btn btn-primary">Agregar Servicio</button>
            </form>
        </div>
    );
}

export default AgregarServicio;