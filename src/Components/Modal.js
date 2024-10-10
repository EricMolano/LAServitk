import React from 'react';
import '../styles/Modal.css';

const Modal = ({ message, onClose, isSuccess }) => {
    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>{isSuccess ? 'Éxito' : 'Error'}</h2>
                <p>{message}</p>
                <button onClick={onClose}>Cerrar</button>
            </div>
        </div>
    );
};

export default Modal;
