import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Modal from '../cliente/ModalCliente'; // Import the modal
import '../styles/AddVehicle.css'; // Import the CSS file

const vehicleData = {
    // ... (data remains the same)
};

const colors = [
    // ... (colors remain the same)
];

const AddVehicle = () => {
    const [marca, setMarca] = useState('');
    const [modelo, setModelo] = useState('');
    const [año, setAño] = useState('');
    const [color, setColor] = useState('');
    const [placa, setPlaca] = useState('');
    const [error, setError] = useState('');
    const [modelosDisponibles, setModelosDisponibles] = useState([]);
    const [añosDisponibles, setAñosDisponibles] = useState([]);
    const [modalOpen, setModalOpen] = useState(false); // Modal state
    const [modalMessage, setModalMessage] = useState(''); // Message for the modal
    const navigate = useNavigate();

    useEffect(() => {
        if (marca) {
            setModelosDisponibles(Object.keys(vehicleData[marca] || {}));
            setModelo(''); // Reinicia el modelo al cambiar de marca
            setAñosDisponibles([]); // Reinicia los años al cambiar de marca
        }
    }, [marca]);

    useEffect(() => {
        if (marca && modelo) {
            setAñosDisponibles(vehicleData[marca][modelo] || []);
            setAño(''); // Reinicia el año al cambiar de modelo
        }
    }, [modelo, marca]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validación de placa
        const placaRegex = /^[A-Z]{3}\d{3}$/;
        const placaPublicaRegex = /^([A-Z]{3}\d{3}|[A-Z]{2}[A-Z]{2}\d{3}|[A-Z]{2}\d{4})$/; 
        if (!placaRegex.test(placa) && !placaPublicaRegex.test(placa)) {
            setModalMessage('La placa debe seguir el formato ABC123 o XX1234.');
            setModalOpen(true);
            return;
        }

        const token = localStorage.getItem('token');
        if (!token) {
            console.error('No se ha encontrado el token de autenticación.');
            setModalMessage('No se ha encontrado el token de autenticación.');
            setModalOpen(true);
            return;
        }

        try {
            await axios.post('http://localhost:2071/api/vehicles', {
                marca,
                modelo,
                año,
                color,
                placa
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            setModalMessage('Vehículo agregado exitosamente.');
            setModalOpen(true);
            // Optionally, you can navigate after a short delay
            setTimeout(() => {
                navigate('/ClientDashboard');
            }, 2000);
        } catch (error) {
            console.error('Error al agregar el vehículo:', error.response?.data || error.message);
            setModalMessage('Error al agregar el vehículo. Intenta nuevamente.');
            setModalOpen(true);
        }
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };

    return (
        <div className="add-vehicle-container">
            <h1>Agregar Vehículo</h1>
            <form onSubmit={handleSubmit} className="form-container">
                <div className="form-group">
                    <label htmlFor="marca">Marca:</label>
                    <select
                        id="marca"
                        value={marca}
                        onChange={(e) => setMarca(e.target.value)}
                        required
                    >
                        <option value="">Selecciona una marca</option>
                        {Object.keys(vehicleData).map((marca) => (
                            <option key={marca} value={marca}>{marca}</option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="modelo">Modelo:</label>
                    <select
                        id="modelo"
                        value={modelo}
                        onChange={(e) => setModelo(e.target.value)}
                        required
                        disabled={!modelosDisponibles.length}
                    >
                        <option value="">Selecciona un modelo</option>
                        {modelosDisponibles.map((modelo) => (
                            <option key={modelo} value={modelo}>{modelo}</option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="año">Año:</label>
                    <select
                        id="año"
                        value={año}
                        onChange={(e) => setAño(e.target.value)}
                        required
                        disabled={!añosDisponibles.length}
                    >
                        <option value="">Selecciona un año</option>
                        {añosDisponibles.map((year) => (
                            <option key={year} value={year}>{year}</option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="color">Color:</label>
                    <select
                        id="color"
                        value={color}
                        onChange={(e) => setColor(e.target.value)}
                        required
                    >
                        <option value="">Selecciona un color</option>
                        {colors.map((color) => (
                            <option key={color} value={color}>{color}</option>
                        ))}
                    </select>
                </div>
                <div className="form-group-full">
                    <label htmlFor="placa">Placa:</label>
                    <input
                        type="text"
                        id="placa"
                        value={placa}
                        onChange={(e) => setPlaca(e.target.value)}
                        required
                        placeholder="Ej: ABC123"
                    />
                </div>
                {error && <p className="error-message">{error}</p>}
                <div className="form-group-full">
                    <button type="submit">Agregar Vehículo</button>
                </div>
            </form>
            <Modal isOpen={modalOpen} onClose={handleCloseModal} message={modalMessage} />
        </div>
    );
};

export default AddVehicle;