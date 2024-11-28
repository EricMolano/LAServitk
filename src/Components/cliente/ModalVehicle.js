
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import '../styles/AddVehicle.css';

const ModalVehicle = ({ children, onClose }) => {
    const navigate = useNavigate();

    const handleClose = () => {
        if (onClose) {
            onClose();
        }
        navigate('/vehicles');
    };

    return (
        <div className="modal-overlay123" onClick={handleClose}>
            <div className="modal-content123" onClick={(e) => e.stopPropagation()}>
                <button className="button2" onClick={handleClose}>
                    <FontAwesomeIcon icon={faTimes} />
                </button>
                {children}
            </div>
        </div>
    );
};

export default ModalVehicle;