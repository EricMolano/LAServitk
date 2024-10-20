import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { register } from '../services/authService';
import Modal from './admin/Modal'; 
import '../Components/styles/Registro.css';

function Registro() {
    const [correo, setCorreo] = useState('');
    const [contraseña, setContraseña] = useState('');
    const [confirmarContraseña, setConfirmarContraseña] = useState('');
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [tipoDireccion, setTipoDireccion] = useState('');
    const [detallesDireccion, setDetallesDireccion] = useState('');
    const [telefono, setTelefono] = useState('');
    const [terminos, setTerminos] = useState(false);
    const [mensajeError, setMensajeError] = useState(''); 
    const [mensajeExito, setMensajeExito] = useState('');
    const [modalAbierto, setModalAbierto] = useState(false); 
    const [registroExitoso, setRegistroExitoso] = useState(false); 

    const validarFormulario = () => {
        let nuevoError = '';

        if (!nombre) nuevoError = '¡El nombre debe ser obligatorio!';
        else if (nombre.length > 20) nuevoError = '¡El nombre no puede superar los 20 caracteres!';
        else if (!apellido) nuevoError = '¡El apellido debe ser obligatorio!';
        else if (apellido.length > 20) nuevoError = '¡El apellido no puede superar los 20 caracteres!';
        else if (!tipoDireccion) {
            nuevoError = '¡Debes seleccionar un tipo de dirección!';
        } else if (!detallesDireccion) {
            nuevoError = '¡La dirección debe ser obligatoria!';
        } else if (!/^3\d{9}$/.test(telefono)) {
            nuevoError = '¡El número debe tener 9 dígitos y comenzar con 3!';
        } else if (!correo) {
            nuevoError = '¡El correo debe ser obligatorio!';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo)) {
            nuevoError = '¡El correo debe ser válido y contener "@"!';
        } else if (!contraseña) {
            nuevoError = '¡La contraseña es obligatoria!';
        } else if (contraseña.length < 6) {
            nuevoError = '¡La contraseña debe tener al menos 6 caracteres, incluir una letra mayúscula, una letra minúscula y un número!';
        } else if (!/[A-Z]/.test(contraseña) || !/[a-z]/.test(contraseña) || !/[0-9]/.test(contraseña)) {
            nuevoError = '¡La contraseña debe incluir al menos una letra mayúscula, una letra minúscula y un número!';
        } else if (contraseña !== confirmarContraseña) {
            nuevoError = '¡Las contraseñas deben coincidir!';
        } else if (!terminos) {
            nuevoError = '¡Debes aceptar los términos y condiciones!';
        }

        return nuevoError;
    };

    const manejarRegistro = async (e) => {
        e.preventDefault();
        setMensajeError('');
        setMensajeExito('');
        setModalAbierto(false);

        const errorValidacion = validarFormulario();
        if (errorValidacion) {
            setMensajeError(errorValidacion);
            setRegistroExitoso(false);
            setModalAbierto(true);
            return;
        }

        const direccionCompleta = `${tipoDireccion} ${detallesDireccion}`;

        try {
            const respuesta = await register({ correo, contraseña, nombre, apellido, direccion: direccionCompleta, telefono });
            if (respuesta.message === 'Usuario registrado exitosamente') {
                setMensajeExito('Registro exitoso.');
                setRegistroExitoso(true);
                setModalAbierto(true);
            } else {
                setMensajeError('Error: ' + respuesta.message);
                setRegistroExitoso(false);
                setModalAbierto(true);
            }
        } catch (error) {
            setMensajeError('¡Este correo se encuentra en uso!');
            setRegistroExitoso(false);
            setModalAbierto(true);
            console.log("Error: ", error);
        }
    };

    const cerrarModal = () => {
        setModalAbierto(false);
        setMensajeError('');
        setMensajeExito('');
    };

    return (
        <div className='registro-contenedor'>
            <div className='registro-menu'>
                <h1>Laservitk</h1>
                <p>Planifica tus actividades y controla tu progreso en línea. Únete a nuestra comunidad hoy mismo.</p>
                <div className="registro-olvide">
                    <span>
                        ¿Ya tienes una cuenta? 
                        <Link to="/login"> Inicia sesión aquí</Link>
                    </span>
                </div>
            </div>
            <div className="registro-formulario">
                <form onSubmit={manejarRegistro}>
                    <div className="registro-header">
                        <div className="registro-titulo">Registrarse</div>
                    </div>
                    <div className="registro-entradas">
                        <div className="registro-entrada">
                            <input
                                type="text"
                                name="nombre"
                                value={nombre}
                                onChange={(e) => setNombre(e.target.value)}
                                placeholder='Nombre Completo'
                                maxLength={20}
                            />
                        </div>
                        <div className="registro-entrada">
                            <input
                                type="text"
                                name="apellido"
                                value={apellido}
                                onChange={(e) => setApellido(e.target.value)}
                                placeholder='Apellido'
                                maxLength={20}
                            />
                        </div>
                        <div className="registro-entrada">
                            <select
                                name="tipoDireccion"
                                value={tipoDireccion}
                                onChange={(e) => setTipoDireccion(e.target.value)}
                                required
                                className="tipo-direccion"
                            >
                                <option value="">Tipo de dirección</option>
                                <option value="Calle">Calle</option>
                                <option value="Avenida">Avenida</option>
                                <option value="Carrera">Carrera</option>
                                <option value="Diagonal">Diagonal</option>
                                <option value="Transversal">Transversal</option>
                            </select>
                        </div>
                        <div className="registro-entrada">
                            <input
                                type="text"
                                name="detallesDireccion"
                                value={detallesDireccion}
                                onChange={(e) => setDetallesDireccion(e.target.value)}
                                placeholder='Detalles de la dirección'
                            />
                        </div>
                        <div className="registro-entrada">
                            <input
                                type="tel"
                                name="telefono"
                                value={telefono}
                                onChange={(e) => setTelefono(e.target.value)}
                                placeholder='Número de Teléfono'
                                pattern="[0-9]*"
                            />
                        </div>
                        <div className="registro-entrada">
                            <input
                                type="email"
                                name="correo"
                                value={correo}
                                onChange={(e) => setCorreo(e.target.value)}
                                placeholder='Correo Electrónico'
                            />
                        </div>
                        <div className="registro-entrada">
                            <input
                                type="password"
                                name="contraseña"
                                value={contraseña}
                                onChange={(e) => setContraseña(e.target.value)}
                                placeholder='Contraseña'
                            />
                        </div>
                        <div className="registro-entrada">
                            <input
                                type="password"
                                name="confirmarContraseña"
                                value={confirmarContraseña}
                                onChange={(e) => setConfirmarContraseña(e.target.value)}
                                placeholder='Confirmar Contraseña'
                            />
                        </div>
                    </div>
                    <div className="registro-terminos">
                        <label>
                            <input
                                type="checkbox"
                                checked={terminos}
                                onChange={() => setTerminos(!terminos)}
                                required
                                className="terminos-checkbox"
                            />
                            <span>Acepto los <a href="/terminos" target="_blank" rel="noopener noreferrer">Términos y Condiciones</a></span>
                        </label>
                    </div>
                    <div className="registro-enviar">
                        <button type="submit" className="registro-boton">Registrarse</button>
                    </div>
                    {mensajeExito && <p className="registro-exito">{mensajeExito}</p>}
                </form>
            </div>

            {modalAbierto && <Modal message={mensajeError || mensajeExito} onClose={cerrarModal} isSuccess={registroExitoso} />}
        </div>
    );
}

export default Registro;
