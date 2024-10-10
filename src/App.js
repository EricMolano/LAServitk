import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import AddInventory from './Components/AddInventory'; 
import AddVehicle from './Components/AddVehicle';
import AdminDashboard from './Components/AdminDashboard';
import AgregarServicio from './Components/AgregarServicio'; // Importa el nuevo componente para agregar servicios
import ClientDashboard from './Components/ClientDashboard';
import Dashboard from './Components/Dashboard';
import EditInventory from './Components/EditInventory'; 
import EditProfile from './Components/EditProfile';
import EditProfileA from './Components/EditProfileA';
import EditProfileE from './Components/EditProfileE';
import EditProfileUser from './Components/EditProfileUser'; // Importa el nuevo componente
import EditVehicle from './Components/EditVehicle';
import EmployeeDashboard from './Components/EmployeeDashboard';
import Home from './Components/Home';
import InfoCliente from './Components/InfoCliente'; // Asegúrate de importar el componente
import Login from './Components/Login';
import Register from './Components/Register';
import Terminos from './Components/Terminos';
import UpdateServices from './Components/UpdateServices'; // Importa el nuevo componente para agregar servicios
import UpdateVehicleUser from './Components/UpdateVehicleUser'; // Importa el componente del formulario de actualización

import './App.css';

function App() {
    const [userRole, setUserRole] = useState(null);
    const [userData, setUserData] = useState(null); // Nuevo estado para datos del usuario
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            axios.get('http://localhost:5000/api/user/data', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then(response => {
                setUserRole(response.data.rol_id);
                setUserData(response.data); // Establece los datos del usuario
            })
            .catch(() => {
                setUserRole(null);
                setUserData(null); // Limpia los datos del usuario si la sesión no es válida
            })
            .finally(() => {
                setLoading(false);
            });
        } else {
            setLoading(false);
        }
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login setUserRole={setUserRole} setUserData={setUserData} />} />
                <Route path="/register" element={<Register />} />
                <Route path="/dashboard" element={<Dashboard userRole={userRole} userData={userData} />} />
                <Route path="/EmployeeDashboard" element={<EmployeeDashboard />} />
                <Route path="/ClientDashboard" element={<ClientDashboard />} />
                <Route path="/AdminDashboard" element={<AdminDashboard />} />
                <Route path="/terminos" element={<Terminos />} />
                <Route path="/edit-profile" element={<EditProfile />} /> 
                <Route path="/edit-profileE" element={<EditProfileE />} /> 
                <Route path="/edit-profileA" element={<EditProfileA />} /> 
                <Route path="/add-vehicle" element={<AddVehicle />} />
                <Route path="/edit-vehicle/:id" element={<EditVehicle />} />
                <Route path="/add-inventory" element={<AddInventory />} />
                <Route path="/edit-inventory/:id" element={<EditInventory />} />
                <Route path="/info-usuario/:id" element={<InfoCliente />} />
                <Route path="/edit-profile-user/:id" element={<EditProfileUser />} />
                <Route path="/update-vehicle-user/:idvehiculo" element={<UpdateVehicleUser />} /> 
                <Route path="/agregar-servicio" element={<AgregarServicio />} /> {/* Nueva ruta para agregar servicio */}
                <Route path="/update-servicio/:id" element={<UpdateServices />} />

            </Routes>
        </Router>
    );
}

export default App;