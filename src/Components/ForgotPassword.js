import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { forgotPassword } from '../services/authService'; // Asegúrate de que esta función esté implementada en authService.js
import Modal from './admin/Modal'; // Importar el Modal

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const navigate = useNavigate();

    const handleForgotPassword = async (e) => {
        e.preventDefault();
        setErrorMessage('');
        setSuccessMessage('');
        setIsModalOpen(false);

        try {
            await forgotPassword(email);
            setSuccessMessage('Se ha enviado un enlace de recuperación a tu correo electrónico.');
            setIsSuccess(true);
            setIsModalOpen(true);
        } catch (err) {
            setErrorMessage('Error al enviar el enlace de recuperación.');
            setIsSuccess(false);
            setIsModalOpen(true);
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setErrorMessage('');
        setSuccessMessage('');
    };

    return (
        <div className="forgot-password-container">
            <h1>Recuperar Contraseña</h1>
            <form onSubmit={handleForgotPassword}>
                <div className="form-group">
                    <label htmlFor="email">Correo Electrónico</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="submit-button">Enviar Enlace de Recuperación</button>
            </form>

            {/* Modal para mostrar mensajes de error o éxito */}
            {isModalOpen && (
                <Modal
                    message={errorMessage || successMessage}
                    onClose={closeModal}
                    isSuccess={isSuccess}
                />
            )}
        </div>
    );
};

export default ForgotPassword;