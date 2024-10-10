import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function RegisterEntry({ usuarioId }) {
    const [fechaHoraEntrada, setFechaHoraEntrada] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:2071/api/asistencia/entrada', {
                usuario_id: usuarioId,
                fechaHora: fechaHoraEntrada, // Asegúrate de que el nombre del campo sea correcto en tu API
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            alert('Entrada registrada exitosamente.');
            navigate('/asistencia'); // Redirige de vuelta a la página de asistencia
        } catch (error) {
            console.error('Error al registrar la entrada:', error);
            alert('Hubo un error al registrar la entrada.');
        }
    };

    return (
        <div className="form-container">
            <h2>Registrar Entrada</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Fecha y Hora de Entrada:
                    <input
                        type="datetime-local"
                        value={fechaHoraEntrada}
                        onChange={(e) => setFechaHoraEntrada(e.target.value)}
                        required
                    />
                </label>
                <button type="submit" className="submit-btn">Registrar Entrada</button>
            </form>
        </div>
    );
}

export default RegisterEntry;
