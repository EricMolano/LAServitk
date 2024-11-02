import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import '../styles/ProfileA.css';

const Profile = ({ showModal, closeModal }) => {
    const [userData, setUserData] = useState(null);
    const [loadingUser, setLoadingUser] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        axios.get('http://localhost:2071/api/user/data', {
            headers: { Authorization: `Bearer ${token}` }
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

    if (!showModal) return null;

    return (
        <div className="profileA-overlay" onClick={closeModal}>
            <div className="profileA-content" onClick={(e) => e.stopPropagation()}>
                {loadingUser ? (
                    <div className="loading-message">Cargando...</div>
                ) : (
                    <div className="profileA-modal">
                        <h1>Bienvenido a tu perfil</h1>
                        <table className="profileA-table">
                            <tbody>
                                <tr><th>Nombre</th><td>{userData.name}</td></tr>
                                <tr><th>Apellido</th><td>{userData.surname}</td></tr>
                                <tr><th>Correo Electrónico</th><td>{userData.email}</td></tr>
                                <tr><th>Dirección</th><td>{userData.address}</td></tr>
                                <tr><th>Teléfono</th><td>{userData.phone}</td></tr>
                            </tbody>
                        </table>
                    </div>
                )}
                <button className="profileA-close" onClick={closeModal}>
                    <FontAwesomeIcon icon={faTimes} />
                </button>
            </div>
        </div>
    );
};

export default Profile;
