import React from 'react';
import '../styles/Modal.css'; // You can style the modal here

const ModalCliente = ({ isOpen, onClose, message }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <p>{message}</p>
                <button onClick={onClose}>Cerrar</button>
            </div>
        </div>
    );
};

export default ModalCliente;
