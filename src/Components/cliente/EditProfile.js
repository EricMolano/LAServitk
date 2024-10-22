import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Modal from '../cliente/ModalCliente'; // Import the modal
import '../styles/EditProfile.css'; // Ensure this path is correct

const API_URL = 'http://localhost:2071/api';

const EditProfile = () => {
    const [userData, setUserData] = useState({
        name: '',
        surname: '',
        addressType: '',
        addressDetail: '',
        phone: '',
    });
    const [error, setError] = useState(null);
    const [modalOpen, setModalOpen] = useState(false); // Modal state
    const [modalMessage, setModalMessage] = useState(''); // Message for the modal
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`${API_URL}/user/data`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setUserData({
                    name: response.data.name,
                    surname: response.data.surname,
                    addressType: response.data.addressType || '',
                    addressDetail: response.data.addressDetail || '',
                    phone: response.data.phone,
                });
            } catch (error) {
                console.error('Error fetching user data:', error);
                setModalMessage('Error al obtener los datos del usuario');
                setModalOpen(true);
            }
        };

        fetchUserData();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const validatePhone = (phone) => {
        const phonePattern = /^3\d{9}$/;
        return phonePattern.test(phone);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');

        // Validaciones
        if (!userData.name) {
            setModalMessage('¡El nombre debe ser obligatorio!');
            setModalOpen(true);
            return;
        }
        if (!userData.surname) {
            setModalMessage('¡El apellido debe ser obligatorio!');
            setModalOpen(true);
            return;
        }
        if (!userData.addressDetail) {
            setModalMessage('¡La dirección debe ser obligatoria!');
            setModalOpen(true);
            return;
        }
        
        if (!userData.phone) {
            setModalMessage('¡El número debe ser obligatorio!');
            setModalOpen(true);
            return;
        }
        if (!validatePhone(userData.phone)) {
            setModalMessage('¡El número debe tener 9 dígitos y comenzar con 3!');
            setModalOpen(true);
            return;
        }

        try {
            const response = await axios.put(`${API_URL}/user/update-profile`, {
                ...userData,
                address: `${userData.addressType} ${userData.addressDetail}`,
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log('Perfil actualizado exitosamente:', response.data);
            navigate('/ClientDashboard');
        } catch (error) {
            setModalMessage('Error al actualizar perfil');
            console.error('Error al actualizar perfil:', error.response?.data || error.message);
            setModalOpen(true);
        }
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };

    return (
        <div className="edit-profile-container">
            <h2>Editar Perfil</h2>
            {error && <p className="error-message">{error}</p>}
            <form onSubmit={handleSubmit} className="edit-profile-form">
                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="name">Nombre:</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={userData.name}
                            onChange={handleChange}
                            maxLength={20}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="surname">Apellido:</label>
                        <input
                            type="text"
                            id="surname"
                            name="surname"
                            value={userData.surname}
                            onChange={handleChange}
                            maxLength={20}
                            required
                        />
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="addressType">Tipo de Dirección:</label>
                        <select
                            id="addressType"
                            name="addressType"
                            value={userData.addressType}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Selecciona un tipo de dirección</option>
                            <option value="Calle">Calle</option>
                            <option value="Avenida">Avenida</option>
                            <option value="Carrera">Carrera</option>
                            <option value="Diagonal">Diagonal</option>
                            <option value="Transversal">Transversal</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="addressDetail">Detalle de Dirección:</label>
                        <input
                            type="text"
                            id="addressDetail"
                            name="addressDetail"
                            value={userData.addressDetail}
                            onChange={handleChange}
                            placeholder="Ej. 123, Ciudad"
                            required
                        />
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="phone">Teléfono:</label>
                        <input
                            type="text"
                            id="phone"
                            name="phone"
                            value={userData.phone}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>
                <button type="submit">Actualizar Perfil</button>
            </form>
            <Modal isOpen={modalOpen} onClose={handleCloseModal} message={modalMessage} />
        </div>
    );
};

export default EditProfile;