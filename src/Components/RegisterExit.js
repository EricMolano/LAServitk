import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function RegisterExit({ usuarioId }) {
    const [fechaSalida, setFechaSalida] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:2071/api/asistencia/salida', {
                usuario_id: usuarioId,
                fecha: fechaSalida, // Asegúrate de que el nombre del campo sea correcto en tu API
                password: password
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            alert('Salida registrada exitosamente.');
            navigate('/asistencia'); // Redirige de vuelta a la página de asistencia
        } catch (error) {
            console.error('Error al registrar la salida:', error);
            alert('Hubo un error al registrar la salida.');
        }
    };

    return (
        <div className="form-container">
            <h2>Registrar Salida</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Fecha y Hora de Salida:
                    <input
                        type="datetime-local"
                        value={fechaSalida}
                        onChange={(e) => setFechaSalida(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Contraseña:
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </label>
                <button type="submit" className="submit-btn">Registrar Salida</button>
            </form>
        </div>
    );
}

export default RegisterExit;
