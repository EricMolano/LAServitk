import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

/* PAGINAS NORMALES */
import Dashboard from './Components/Dashboard';
import AdminDashboard from './Components/AdminDashboard';
import ClientDashboard from './Components/ClientDashboard';
import EmployeeDashboard from './Components/EmployeeDashboard';
import Home from './Components/Home';
import Login from './Components/Login';
import Register from './Components/Register';
import Terminos from './Components/Terminos';

/* PAGINAS ADMIN */
import UpdateServices from './Components/admin/UpdateServices'; 
import UpdateVehicleUser from './Components/admin/UpdateVehicleUser'; 
import InfoCliente from './Components/admin/InfoCliente'; 
import EditProfileUser from './Components/admin/EditProfileUser'; 
import EditProfileA from './Components/admin/EditProfileA';
import AddInventory from './Components/admin/AddInventory'; 
import EditInventory from './Components/admin/EditInventory'; 
import ProfileA from './Components/admin/ProfileA'; 
import Usuarios from './Components/admin/Usuarios'; 
import Inventory from './Components/admin/Inventory'; 
import Vehiculos from './Components/admin/Vehiculos'; 
import Servicios from './Components/admin/Servicios'; 

/* PAGINAS EMPLEADO */
import AgregarServicio from './Components/empleado/AgregarServicio'; 
import EditProfileE from './Components/empleado/EditProfileE';
import ProfileE from './Components/empleado/ProfileE'; 
import UsuariosE from './Components/empleado/UsuariosE'; 
import VehiculosE from './Components/empleado/VehiculosE'; 
import InventoryE from './Components/empleado/InventoryE'; 

/* PAGINAS CLIENTE */
import Profile from './Components/cliente/Profile';
import Vehicles from './Components/cliente/Vehicles';
import Services from './Components/cliente/Services';
import EditVehicle from './Components/cliente/EditVehicle';
import AddVehicle from './Components/cliente/AddVehicle';
import EditProfile from './Components/cliente/EditProfile';

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

                
                <Route path="/Profile" element={<Profile />} />
                <Route path="/Vehicles" element={<Vehicles />} />
                <Route path="/Services" element={<Services />} />

                <Route path="/ProfileA" element={<ProfileA />} />
                <Route path="/Usuarios" element={<Usuarios />} />
                <Route path="/Inventory" element={<Inventory />} />
                <Route path="/Vehiculos" element={<Vehiculos />} />
                <Route path="/Servicios" element={<Servicios />} />

                <Route path="/ProfileE" element={<ProfileE />} />
                <Route path="/UsuariosE" element={<UsuariosE />} />
                <Route path="/VehiculosE" element={<VehiculosE />} />
                <Route path="/InventoryE" element={<InventoryE />} />

                
            </Routes>
        </Router>
    );
}

export default App;