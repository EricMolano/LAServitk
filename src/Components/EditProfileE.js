import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/Edit.css';


const EditProfileE = () => {
    const [userData, setUserData] = useState({
        name: '',
        surname: '',
        address: '',
        phone: '',
    });
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');

        axios.get('http://localhost:2071/api/user/data', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        .then(response => {
            setUserData({
                name: response.data.name,
                surname: response.data.surname,
                address: response.data.adrres,
                phone: response.data.phone,
            });
        })
        .catch(error => console.error('Error fetching user data:', error));
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');

        axios.put('http://localhost:2071/api/user/update-profile', userData, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        .then(response => {
            console.log('Perfil actualizado exitosamente:', response.data);
            navigate('/EmployeeDashboard'); // Redirige al dashboard o a donde desees
        })
        .catch(error => {
            setError('Error al actualizar perfil');
            console.error('Error al actualizar perfil:', error);
        });
    };

    return (
        <div className="edit-profile-container">
            <h1>Editar Perfil</h1>
            {error && <p className="error-message">{error}</p>}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Nombre</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={userData.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="surname">Apellido</label>
                    <input
                        type="text"
                        id="surname"
                        name="surname"
                        value={userData.surname}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="address">Dirección</label>
                    <input
                        type="text"
                        id="address"
                        name="address"
                        value={userData.address}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="phone">Teléfono</label>
                    <input
                        type="text"
                        id="phone"
                        name="phone"
                        value={userData.phone}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit" className="submit-button">Actualizar</button>
            </form>
        </div>
    );
};

export default EditProfileE;
