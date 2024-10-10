import React, { useState  } from 'react';
import { Link } from 'react-router-dom';
import { register } from '../services/authService';
import Modal from './Modal'; 
import '../styles/Registro.css';

function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [terms, setTerms] = useState(false);
    const [errorMessage, setErrorMessage] = useState(''); 
    const [successMessage, setSuccessMessage] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false); // Manejo del modal
    const [isSuccess, setIsSuccess] = useState(false); // Estado de éxito o error


    const validateForm = () => {
        let newError = '';

        if (!name) newError = '¡El nombre debe ser obligatorio!';
        else if (!surname) newError = '¡El apellido debe ser obligatorio!';
        else if (!address) newError = '¡La dirección debe ser obligatoria!';
        else if (!/^((Avenida|Calle|Transversal)\s).*/i.test(address)) {
            newError = '¡La dirección debe empezar con Avenida, Calle o Transversal!';
        } else if (!phone) {
            newError = '¡El número debe ser obligatorio!';
        } else if (!/^3\d{9}$/.test(phone)) {
            newError = '¡El número debe tener 9 dígitos y comenzar con 3!';
        } else if (!email) {
            newError = '¡El email debe ser obligatorio!';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            newError = '¡El correo debe ser válido y contener "@"!';
        } else if (!password) {
            newError = '¡La contraseña es obligatoria!';
        } else if (password.length < 6) {
            newError = '¡La contraseña debe tener al menos 6 caracteres, incluir una letra mayúscula, una letra minúscula y un número!';
        } else if (!/[A-Z]/.test(password) || !/[a-z]/.test(password) || !/[0-9]/.test(password)) {
            newError = '¡La contraseña debe incluir al menos una letra mayúscula, una letra minúscula y un número!';
        } else if (password !== confirmPassword) {
            newError = '¡Las contraseñas deben coincidir!';
        } else if (!terms) {
            newError = '¡Debes aceptar los términos y condiciones!';
        }

        return newError;
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setErrorMessage(''); // Limpiar errores anteriores
        setSuccessMessage(''); // Limpiar mensajes anteriores
        setIsModalOpen(false); // Cerrar modal

        const validationError = validateForm();
        if (validationError) {
            setErrorMessage(validationError); // Asignar el mensaje de error
            setIsSuccess(false); // No es un éxito
            setIsModalOpen(true); // Mostrar modal
            return; // Detener si hay error
        }

        try {
            const response = await register({ email, password, name, surname, address, phone });
            if (response.message === 'Usuario registrado exitosamente') {
                setSuccessMessage('Registro exitoso.');
                setIsSuccess(true); // Es un éxito
                setIsModalOpen(true); // Mostrar modal de éxito
            } else {
                setErrorMessage('Error: ' + response.message); // Mostrar mensaje de error en modal
                setIsSuccess(false); // No es un éxito
                setIsModalOpen(true); // Mostrar modal en caso de error
            }
        } catch (error) {
            setErrorMessage('¡Este correo se encuentra en uso!');
            setIsSuccess(false); // No es un éxito
            setIsModalOpen(true); // Mostrar modal en caso de error
            console.log("Error: ", error);
        }
    };

    const closeModal = () => {
        setIsModalOpen(false); // Cerrar modal
        setErrorMessage(''); // Limpiar mensaje de error
        setSuccessMessage(''); // Limpiar mensaje de éxito
    };

    return (
        <div  className='login-wraper'>
            <div className='Menu'>
                <h1>¡Qué gusto verte por aquí!</h1>
            </div>
            <div className="container">
                <form onSubmit={handleRegister}>
                    <div className="header">
                        <div className="text">Registro</div>
                     
                    </div>
                    <div className="inputs">
                        <div className="input">
                            <input
                                type="text"
                                name="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder='Nombre'
                                
                            />
                        </div>
                        <div className="input">
                            <input
                                type="text"
                                name="surname"
                                value={surname}
                                onChange={(e) => setSurname(e.target.value)}
                                placeholder='Apellido'
                                
                            />
                        </div>
                        <div className="input">
                            <input
                                type="text"
                                name="address"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                placeholder='Dirección'
                                
                            />
                        </div>
                        <div className="input">
                            <input
                                type="tel"
                                name="phone"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                placeholder='Teléfono'
                                pattern="[0-9]*" // Solo permite números
                                
                            />
                        </div>
                        <div className="input">
                            <input
                                type="email"
                                name="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder='Correo'
                                
                            />
                        </div>
                        <div className="input">
                            <input
                                type="password"
                                name="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder='Contraseña'
                                
                            />
                        </div>
                        <div className="input">
                            <input
                                type="password"
                                name="confirmPassword"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder='Confirmar Contraseña'
                                
                            />
                        </div>
                    </div>
                    <div className="terms-container">
                        <label>
                            <input
                                type="checkbox"
                                checked={terms}
                                onChange={() => setTerms(!terms)}
                                required
                            />
                            Acepto los <a href="/terminos" target="_blank" rel="noopener noreferrer">Términos y Condiciones</a>
                        </label>
                    </div>
                    <div className="submit-container">
                        <button type="submit" className="submit">Registrarse</button>
                    </div>
                    {successMessage && <p className="success-message">{successMessage}</p>}
                    <div className="forgot-password">
                        ¿Ya tienes una cuenta?
                        <span><br />
                            <Link to="/login">Click Aquí</Link>
                        </span>
                    </div>
                </form>
            </div>

            {/* Modal para mostrar el error o éxito */}
            {isModalOpen && <Modal message={errorMessage || successMessage} onClose={closeModal} isSuccess={isSuccess} />}
        </div>
    );
}

export default Register;
