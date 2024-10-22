import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { resetPassword } from '../services/authService'; // Asegúrate de implementar esta función en authService.js
import Modal from './admin/Modal'; // Importar el Modal

const ResetPassword = () => {
    const { token } = useParams();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const navigate = useNavigate();

    const handleResetPassword = async (e) => {
        e.preventDefault();
        setErrorMessage('');
        setSuccessMessage('');
        setIsModalOpen(false);

        if (password !== confirmPassword) {
            setErrorMessage('Las contraseñas no coinciden.');
            setIsSuccess(false);
            setIsModalOpen(true);
            return;
        }

        try {
            await resetPassword(token, password);
            setSuccessMessage('Contraseña restablecida exitosamente.');
            setIsSuccess(true);
            setIsModalOpen(true);

            setTimeout(() => {
                navigate('/login');
            }, 2000);
        } catch (err) {
            setErrorMessage('Error al restablecer la contraseña.');
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
        <div className="reset-password-container">
            <h1>Restablecer Contraseña</h1>
            <form onSubmit={handleResetPassword}>
                <div className="form-group">
                    <label htmlFor="password">Nueva Contraseña</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="confirmPassword">Confirmar Nueva Contraseña</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="submit-button">Restablecer Contraseña</button>
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

export default ResetPassword;