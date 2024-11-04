import React from 'react';

const ModalConfirmacionVehiculo = ({ isOpen, onClose, message }) => {
    if (!isOpen) return null; // Si no está abierto, no renderizar nada

    return (
        <div className="modal-vehicle">
            <div className="modal-content-vehicle">
                <h3></h3>
                <p>{message}</p>
                <button onClick={onClose}>Cerrar</button>
            </div>
        </div>
    );
};

export default ModalConfirmacionVehiculo;
