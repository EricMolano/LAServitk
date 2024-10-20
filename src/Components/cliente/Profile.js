import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/Profile.css';

const Profile = () => {
    const [userData, setUserData] = useState(null);
    const [loadingUser, setLoadingUser] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        axios.get('http://localhost:2071/api/user/data', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(response => {
            setUserData(response.data);
            setLoadingUser(false);
        })
        .catch(error => {
            console.error('Error fetching user data:', error);
            setLoadingUser(false);
        });
    }, []);

    const handleEditProfile = () => {
        navigate('/edit-profile');
    };

    if (loadingUser) {
        return <div>Cargando...</div>;
    }

    return (
        <div className="profile-container">
            <h1>Bienvenido a tu perfil</h1>
            <table className="profile-table">
                <tbody>
                    <tr><th>Nombre</th><td>{userData.name}</td></tr>
                    <tr><th>Apellido</th><td>{userData.surname}</td></tr>
                    <tr><th>Correo Electrónico</th><td>{userData.email}</td></tr>
                    <tr><th>Dirección</th><td>{userData.address}</td></tr>
                    <tr><th>Teléfono</th><td>{userData.phone}</td></tr>
                </tbody>
            </table>
            <button onClick={handleEditProfile} className="profile-button">Editar Perfil</button>
        </div>
    );
};

export default Profile;
