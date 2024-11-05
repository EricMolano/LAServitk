import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Modal from './Modal'; // Asegúrate de que la ruta sea correcta
import ModalConfirmacionVehiculo from '../cliente/ModalConfirmacionVehiculo';

const vehicleData = {
    Chevrolet: {
        Aveo: [2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022],
        Spark: [2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024],
        Tracker: [2020, 2021, 2022, 2023, 2024],
        Onix: [2019, 2020, 2021, 2022, 2023, 2024],
        Sail: [2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022],
    },
    Tesla: {
        Model_S: [2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024],
        Model_3: [2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024],
        Model_X: [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024],
        Model_Y: [2020, 2021, 2022, 2023, 2024],
    },
};

const colors = [
    'Rojo', 'Azul', 'Verde', 'Negro', 'Blanco', 'Gris', 'Amarillo',
    'Naranja', 'Rosa', 'Violeta', 'Marrón', 'Turquesa', 'Beige',
    'Dorado', 'Plateado', 'Cyan', 'Magenta', 'Lavanda', 'Oliva',
    'Verde claro', 'Verde oscuro', 'Rojo claro', 'Rojo oscuro',
    'Azul claro', 'Azul oscuro', 'Gris claro', 'Gris oscuro',
    'Marfil', 'Coral', 'Terracota', 'Mostaza', 'Fucsia'
];

const EditVehicle = ({ id, onClose }) => {
    const [vehicle, setVehicle] = useState({
        marca: '',
        modelo: '',
        año: '',
        color: '',
        placa: ''
    });
    const [modalMessage, setModalMessage] = useState('');
    const [modelosDisponibles, setModelosDisponibles] = useState([]);
    const [añosDisponibles, setAñosDisponibles] = useState([]);
    const [isConfirmacionOpen, setIsConfirmacionOpen] = useState(false); // Estado para ModalConfirmacionVehiculo
    const [confirmMessage, setConfirmMessage] = useState(''); // Mensaje para ModalConfirmacionVehiculo

    useEffect(() => {
        const fetchVehicle = async () => {
            try {
                const response = await axios.get(`http://localhost:2071/api/vehicles/${id}`);
                setVehicle(response.data);
                setModelosDisponibles(vehicleData[response.data.marca] ? Object.keys(vehicleData[response.data.marca]) : []);
                setAñosDisponibles(vehicleData[response.data.marca]?.[response.data.modelo] || []);
            } catch (error) {
            }
        };
        fetchVehicle();
    }, [id]);

    const handleMarcaChange = (e) => {
        const selectedMarca = e.target.value;
        setVehicle({ ...vehicle, marca: selectedMarca, modelo: '', año: '', color: '' });
        setModelosDisponibles(Object.keys(vehicleData[selectedMarca] || {}));
        setAñosDisponibles([]);
    };

    const handleModeloChange = (e) => {
        const selectedModelo = e.target.value;
        setVehicle({ ...vehicle, modelo: selectedModelo, año: '', color: '' });
        setAñosDisponibles(vehicleData[vehicle.marca][selectedModelo] || []);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setVehicle({ ...vehicle, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token'); // O de donde obtengas tu token
            await axios.put(`http://localhost:2071/api/vehicles/${id}`, vehicle, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setConfirmMessage('Vehículo actualizado exitosamente.'); // Mensaje de éxito
            setIsConfirmacionOpen(true); // Abre el modal de confirmación del vehículo
            onClose(); // Cierra el modal de edición
        } catch (error) {
            setModalMessage('Error al actualizar el vehículo. ' + error.response?.data?.message || error.message);
        }
    };

    return (
        <Modal onClose={onClose}>
            <h2>Editar Vehículo</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="marca">Marca:</label>
                    <select
                        id="marca"
                        name="marca"
                        value={vehicle.marca}
                        onChange={handleMarcaChange}
                        required
                    >
                        <option value="">Selecciona una marca</option>
                        {Object.keys(vehicleData).map((marca) => (
                            <option key={marca} value={marca}>{marca}</option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="modelo">Modelo:</label>
                    <select
                        id="modelo"
                        name="modelo"
                        value={vehicle.modelo}
                        onChange={handleModeloChange}
                        required
                        disabled={!modelosDisponibles.length}
                    >
                        <option value="">Selecciona un modelo</option>
                        {modelosDisponibles.map((modelo) => (
                            <option key={modelo} value={modelo}>{modelo}</option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="año">Año:</label>
                    <select
                        id="año"
                        name="año"
                        value={vehicle.año}
                        onChange={handleChange}
                        required
                        disabled={!añosDisponibles.length}
                    >
                        <option value="">Selecciona un año</option>
                        {añosDisponibles.map((year) => (
                            <option key={year} value={year}>{year}</option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="color">Color:</label>
                    <select
                        id="color"
                        name="color"
                        value={vehicle.color}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Selecciona un color</option>
                        {colors.map((color) => (
                            <option key={color} value={color}>{color}</option>
                        ))}
                    </select>
                </div>
                <button type="submit">Actualizar Vehículo</button>
            </form>
            {modalMessage && <p>{modalMessage}</p>}
            <ModalConfirmacionVehiculo
                isOpen={isConfirmacionOpen}
                onClose={() => setIsConfirmacionOpen(false)}
                message={confirmMessage}
            />
        </Modal>
    );
};

export default EditVehicle;
