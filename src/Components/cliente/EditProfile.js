import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Modal from '../cliente/ModalCliente'; // Import the modal
import '../styles/Edit.css'; // Ensure this path is correct

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
            <h1>Editar Perfil</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Nombre:
                    <input
                        type="text"
                        name="name"
                        value={userData.name}
                        onChange={handleChange}
                        maxLength={20}
                    />
                </label>
                <label>
                    Apellido:
                    <input
                        type="text"
                        name="surname"
                        value={userData.surname}
                        onChange={handleChange}
                        maxLength={20}
                    />
                </label>
                <label>
                    Tipo de Dirección:
                    <select
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
                </label>
                <label>
                    Detalle de Dirección:
                    <input
                        type="text"
                        name="addressDetail"
                        value={userData.addressDetail}
                        onChange={handleChange}
                        placeholder="Ej. 123, Ciudad"
                        required
                    />
                </label>
                <label>
                    Teléfono:
                    <input
                        type="text"
                        name="phone"
                        value={userData.phone}
                        onChange={handleChange}
                    />
                </label>
                <button type="submit">Actualizar Perfil</button>
            </form>
            <Modal isOpen={modalOpen} onClose={handleCloseModal} message={modalMessage} />
        </div>
    );
};

export default EditProfile;
