import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/EditProfile.css';

const API_URL = 'http://localhost:2071/api';

const EditCliente = ({ onClose }) => {
    const [userData, setUserData] = useState({
        name: '',
        surname: '',
        addressType: '',
        addressDetail: '',
        phone: '',
    });
    const [modalValidationMessage, setModalValidationMessage] = useState('');
    const [modalConfirmationMessage, setModalConfirmationMessage] = useState('');
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
                setModalValidationMessage('Error al obtener los datos del usuario');
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

        // Validations
        if (!userData.name || !userData.surname || !userData.addressDetail || !userData.phone) {
            setModalValidationMessage('Todos los campos son obligatorios');
            return;
        }
        
        if (!validatePhone(userData.phone)) {
            setModalValidationMessage('¡El número debe tener 10 dígitos y comenzar con 3!');
            return;
        }

        try {
            await axios.put(`${API_URL}/user/update-profile`, {
                ...userData,
                address: `${userData.addressType} ${userData.addressDetail}`,
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            onClose(); // Cerrar el primer modal antes de abrir el segundo
            setModalConfirmationMessage('Perfil actualizado exitosamente');
            setTimeout(() => {
                navigate('/ClientDashboard');
            }, 2000);
        } catch (error) {
            setModalConfirmationMessage('Error al actualizar perfil');
            console.error('Error al actualizar perfil:', error.response?.data || error.message);
        }
    };

    const handleCloseModalValidation = () => {
        setModalValidationMessage('');
    };

    const handleCloseModalConfirmation = () => {
        setModalConfirmationMessage('');
        navigate('/ClientDashboard');
    };

    return (
        <div className="cliente-modal-overlay">
            <div className="cliente-modal-content">
                <h2>Editar Perfil</h2>
                <form onSubmit={handleSubmit} className="edit-cliente-form">
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
                    <button type="submit" className="cliente-submit-button">Actualizar</button>
                </form>
                
                {/* Modal for validation messages */}
                {modalValidationMessage && (
                    <div className="modalValidacion">
                        <p>{modalValidationMessage}</p>
                        <button onClick={handleCloseModalValidation}>Cerrar</button>
                    </div>
                )}

                {/* Modal for confirmation or error messages */}
                {modalConfirmationMessage && (
                    <div className="modalConfirmacion">
                        <p>{modalConfirmationMessage}</p>
                        <button onClick={handleCloseModalConfirmation}>Cerrar</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default EditCliente;