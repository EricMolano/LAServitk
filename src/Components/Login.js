import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import email_icon from '../Components/Assets/email.png';
import password_icon from '../Components/Assets/password.png';
import logo from '../Components/Assets/logo.png'; // Importar el logo
import { login } from '../services/authService';
import Modal from './admin/Modal'; // Importar el Modal
import './styles/Login.css'; 
import logo1 from '../Components/Assets/servilogo.png'; // Importa la imagen
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'; // Importar el icono de volver

const Login = ({ setUserRole }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState(''); // Estado para manejar el mensaje de error
    const [successMessage, setSuccessMessage] = useState(''); // Estado para manejar el mensaje de éxito
    const [isModalOpen, setIsModalOpen] = useState(false); // Estado para manejar el modal
    const [isSuccess, setIsSuccess] = useState(false); // Estado para determinar si es éxito o error
    const navigate = useNavigate();

    // Validación del formato del correo
    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    // Validación de la longitud de la contraseña
    const validatePassword = (password) => {
        return password.length >= 6;
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setErrorMessage(''); // Limpiar mensajes de error anteriores
        setSuccessMessage(''); // Limpiar mensajes de éxito anteriores
        setIsModalOpen(false); // Cerrar modal

        // Validar email
        if (!validateEmail(email)) {
            setErrorMessage('Por favor, ingresa un correo válido.');
            setIsSuccess(false); // No es un éxito
            setIsModalOpen(true); // Mostrar modal
            return;
        }

        // Validar contraseña
        if (!validatePassword(password)) {
            setErrorMessage('La contraseña debe tener al menos 6 caracteres.');
            setIsSuccess(false); // No es un éxito
            setIsModalOpen(true); // Mostrar modal
            return;
        }

        // Intentar iniciar sesión si las validaciones pasan
        try {
            const data = await login(email, password);
            setUserRole(data.user.rol_id); // Establece el rol del usuario
            setSuccessMessage('Inicio de sesión exitoso.'); // Mensaje de éxito
            setIsSuccess(true); // Es un éxito
            setIsModalOpen(true); // Mostrar modal de éxito

            setTimeout(() => {
                navigate('/dashboard'); // Redirigir después de 2 segundos
            }, 2000);
        } catch (err) {
            setErrorMessage('Correo o contraseña incorrectos.');
            setIsSuccess(false); // No es un éxito
            setIsModalOpen(true); // Mostrar modal de error
        }
    };

    const closeModal = () => {
        setIsModalOpen(false); // Cerrar el modal
        setErrorMessage(''); // Limpiar mensaje de error
        setSuccessMessage(''); // Limpiar mensaje de éxito
    };

    return (
        <div className='registro-contenedor'>
            <button onClick={() => navigate('/')} className="volver-boton">
                <FontAwesomeIcon icon={faArrowLeft} /> Volver
            </button>
            <div className='registro-menu'>
                <img src={logo1} alt="Logo" className="logo" /> {/* Añadir el logo */}
                <h1>¡Qué gusto verte por aquí!</h1>
                <p>Inicia sesión para continuar.</p>
                <div className="registro-olvide">
                    ¿No tienes una cuenta?
                    <span><br />
                        <Link to="/register">Click Aquí</Link>
                    </span>
                </div>
            </div>
            <div className="registro-formulario">
                <form onSubmit={handleLogin}>
                    <div className="registro-header">
                        <div className="registro-titulo">Ingreso</div>
                    </div>
                    <div className="registro-entradas">
                        <div className="registro-entrada">
                            <label htmlFor="email">Correo</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="registro-entrada">
                            <label htmlFor="password">Contraseña</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="registro-olvide">
                        <Link to="/forgot-password">¿Olvidaste tu contraseña?</Link>
                    </div>
                    <div className="registro-enviar">
                        <button type="submit" className="registro-boton">Iniciar Sesión</button>
                    </div>
                    {successMessage && <p className="registro-exito">{successMessage}</p>}
                </form>
            </div>

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

export default Login;