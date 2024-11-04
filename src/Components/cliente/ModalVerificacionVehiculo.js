import React from 'react';

const ModalVerificacionVehiculo = ({ isOpen, onClose, onConfirm, marca, modelo, año, color, placa }) => {
    if (!isOpen) return null; // Si no está abierto, no renderizar nada

    return (
        <div className="modal-vehicle">
            <div className="modal-content-vehicle">
                <h3>Verificación de Datos del Vehículo</h3>
                <p>Marca: {marca}</p>
                <p>Modelo: {modelo}</p>
                <p>Año: {año}</p>
                <p>Color: {color}</p>
                <p>Placa: {placa}</p>
                <button onClick={onConfirm}>Confirmar</button>
                <button onClick={onClose}>Cancelar</button>
            </div>
        </div>
    );
};

export default ModalVerificacionVehiculo;
