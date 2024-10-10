import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { updateService } from '../services/authService'; // Ajusta la ruta según tu estructura

function ActualizarServicio() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [servicio, setServicio] = useState({
        nombre_empleado: '',
        nombre_cliente: '',
        placa_vehiculo: '',
        nombre_servicio: '',
        descripcion: '',
        costo: ''
    });

    useEffect(() => {
        const fetchServicio = () => {
            axios.get(`http://localhost:2071/api/servicios/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            .then(response => setServicio(response.data))
            .catch(error => console.error("Error al obtener el servicio:", error));
        };

        fetchServicio();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setServicio(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        updateService(id, servicio)
            .then(() => navigate('/AdminDashboard '))
            .catch(error => console.error("Error al actualizar el servicio:", error));
    };

    return (
        <div className="update-service-form">
            <h2>Actualizar Servicio</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Nombre del Empleado</label>
                    <input
                        type="text"
                        name="nombre_empleado"
                        value={servicio.nombre_empleado}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Nombre del Cliente</label>
                    <input
                        type="text"
                        name="nombre_cliente"
                        value={servicio.nombre_cliente}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Placa del Vehículo</label>
                    <input
                        type="text"
                        name="placa_vehiculo"
                        value={servicio.placa_vehiculo}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Nombre del Servicio</label>
                    <input
                        type="text"
                        name="nombre_servicio"
                        value={servicio.nombre_servicio}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Descripción</label>
                    <textarea
                        name="descripcion"
                        value={servicio.descripcion}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Costo</label>
                    <input
                        type="number"
                        name="costo"
                        value={servicio.costo}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">Actualizar Servicio</button>
            </form>
        </div>
    );
}

export default ActualizarServicio;
