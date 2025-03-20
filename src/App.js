import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoadingSpinner from './Components/LoadingSpinner'; // Importa el componente de carga

/* PAGINAS NORMALES */
import Dashboard from './Components/Dashboard';
import AdminDashboard from './Components/AdminDashboard';
import ClientDashboard from './Components/ClientDashboard';
import EmployeeDashboard from './Components/EmployeeDashboard';
import Home from './Components/Home';
import Login from './Components/Login';
import Register from './Components/Register';
import Terminos from './Components/Terminos';
import ForgotPassword from './Components/ForgotPassword'; // Importa el componente de recuperación de contraseña
import ResetPassword from './Components/ResetPassword'; // Importa el componente de restablecimiento de contraseña
import VerCompras from './Components/VerCompras'; // Asegúrate de que la ruta sea correcta

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
import AgregarServicio from './Components/admin/AgregarServicio'; 
import VerSolicitudes from './Components/VerSolicitudes'; // Importa el componente VerSolicitudes

/* PAGINAS EMPLEADO */
import EditProfileE from './Components/empleado/EditProfileE';
import ProfileE from './Components/empleado/ProfileE'; 
import UsuariosE from './Components/empleado/UsuariosE'; 
import VehiculosE from './Components/empleado/VehiculosE'; 
import InventoryE from './Components/empleado/InventoryE'; 
import ServiciosE from './Components/empleado/ServiciosE'; 
import AgregarServicioE from './Components/empleado/AgregarServicioE'; 
import VerSolicitudesE from './Components/empleado/VerSolicitudesE'; // Importa el componente VerSolicitudes

/* PAGINAS CLIENTE */
import Profile from './Components/cliente/Profile';
import Vehicles from './Components/cliente/Vehicles';
import Inventario from './Components/cliente/Inventario'; 
import Services from './Components/cliente/Services';
import EditVehicle from './Components/cliente/EditVehicle';
import AddVehicle from './Components/cliente/AddVehicle';
import EditProfile from './Components/cliente/EditProfile';
import SolicitarProducto from './Components/SolicitarProducto'; // Importa el componente SolicitarProducto
import SlideBarPrueba from './Components/SlideBarPrueba'; // Importa el componente SlideBarPrueba

import './App.css';

// Componente para rutas privadas
const PrivateRoute = ({ element, userRole, requiredRole }) => {
    return userRole === requiredRole ? element : <Navigate to="/login" />;
};

function App() {
    const [userRole, setUserRole] = useState(null);
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            axios.get('https://laservitk-production.up.railway.app/api/user/data', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then(response => {
                setUserRole(response.data.rol_id);
                setUserData(response.data);
            })
            .catch(() => {
                setUserRole(null);
                setUserData(null);
            })
            .finally(() => {
                setLoading(false);
            });
        } else {
            setLoading(false);
        }
    }, []);

    if (loading) {
        return <LoadingSpinner />; // Usa el componente de carga aquí
    }

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login setUserRole={setUserRole} setUserData={setUserData} />} />
                <Route path="/register" element={<Register />} />
                <Route path="/terminos" element={<Terminos />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/reset-password/:token" element={<ResetPassword />} /> {/* Ruta para restablecimiento de contraseña */}
                <Route path="/VerSolicitudes" element={<VerSolicitudes />} />

                {/* Rutas públicas */}
                <Route path="/dashboard" element={<Dashboard userRole={userRole} userData={userData} />} />
                <Route path="/SlideBarPrueba" element={<SlideBarPrueba />} />
                
                {/* Rutas privadas */}
                <Route path="/AdminDashboard" element={<PrivateRoute element={<AdminDashboard />} userRole={userRole} requiredRole={3} />} />
                <Route path="/ClientDashboard" element={<PrivateRoute element={<ClientDashboard />} userRole={userRole} requiredRole={2} />} />
                <Route path="/EmployeeDashboard" element={<PrivateRoute element={<EmployeeDashboard />} userRole={userRole} requiredRole={1} />} />
                <Route path="/VerCompras" element={<PrivateRoute element={<VerCompras />} userRole={userRole} requiredRole={2} />} />

                {/* Rutas de admin */}
                <Route path="/update-servicio/:id" element={<PrivateRoute element={<UpdateServices />} userRole={userRole} requiredRole={3} />} />
                <Route path="/update-vehicle-user/:idvehiculo" element={<PrivateRoute element={<UpdateVehicleUser />} userRole={userRole} requiredRole={3} />} />
                <Route path="/info-usuario/:id" element={<PrivateRoute element={<InfoCliente />} userRole={userRole} requiredRole={3} />} />
                <Route path="/edit-profile-user/:id" element={<PrivateRoute element={<EditProfileUser />} userRole={userRole} requiredRole={3} />} />
                <Route path="/edit-profileA" element={<PrivateRoute element={<EditProfileA />} userRole={userRole} requiredRole={3} />} />
                <Route path="/add-inventory" element={<PrivateRoute element={<AddInventory />} userRole={userRole} requiredRole={3} />} />
                <Route path="/edit-inventory/:id" element={<PrivateRoute element={<EditInventory />} userRole={userRole} requiredRole={3} />} />
                <Route path="/ProfileA" element={<PrivateRoute element={<ProfileA />} userRole={userRole} requiredRole={3} />} />
                <Route path="/Usuarios" element={<PrivateRoute element={<Usuarios />} userRole={userRole} requiredRole={3} />} />
                <Route path="/Inventory" element={<PrivateRoute element={<Inventory />} userRole={userRole} requiredRole={3} />} />
                <Route path="/Vehiculos" element={<PrivateRoute element={<Vehiculos />} userRole={userRole} requiredRole={3} />} />
                <Route path="/Servicios" element={<PrivateRoute element={<Servicios />} userRole={userRole} requiredRole={3} />} />
                <Route path="/agregar-servicio" element={<PrivateRoute element={<AgregarServicio />} userRole={userRole} requiredRole={3} />} />
                <Route path="/VerSolicitudes" element={<PrivateRoute element={<VerSolicitudes />} userRole={userRole} requiredRole={3} />} /> {/* Ruta para ver solicitudes */}

                {/* Rutas de cliente */}
                <Route path="/Profile" element={<PrivateRoute element={<Profile />} userRole={userRole} requiredRole={2} />} />
                <Route path="/Vehicles" element={<PrivateRoute element={<Vehicles />} userRole={userRole} requiredRole={2} />} />
                <Route path="/Services" element={<PrivateRoute element={<Services />} userRole={userRole} requiredRole={2} />} />
                <Route path="/edit-vehicle/:id" element={<PrivateRoute element={<EditVehicle />} userRole={userRole} requiredRole={2} />} />
                <Route path="/add-vehicle" element={<PrivateRoute element={<AddVehicle />} userRole={userRole} requiredRole={2} />} />
                <Route path="/edit-profile" element={<PrivateRoute element={<EditProfile />} userRole={userRole} requiredRole={2} />} /> 
                <Route path="/Inventario" element={<PrivateRoute element={<Inventario />} userRole={userRole} requiredRole={2} />} />
                <Route path="/SolicitarProducto" element={<PrivateRoute element={<SolicitarProducto />} userRole={userRole} requiredRole={2} />} /> {/* Ruta para solicitar producto */}

                {/* Rutas de empleado */}
                <Route path="/ProfileE" element={<PrivateRoute element={<ProfileE />} userRole={userRole} requiredRole={1} />} />
                <Route path="/UsuariosE" element={<PrivateRoute element={<UsuariosE />} userRole={userRole} requiredRole={1} />} />
                <Route path="/VehiculosE" element={<PrivateRoute element={<VehiculosE />} userRole={userRole} requiredRole={1} />} />
                <Route path="/InventoryE" element={<PrivateRoute element={<InventoryE />} userRole={userRole} requiredRole={1} />} />
                <Route path="/edit-profileE" element={<PrivateRoute element={<EditProfileE />} userRole={userRole} requiredRole={1} />} />
                <Route path="/ServiciosE" element={<PrivateRoute element={<ServiciosE />} userRole={userRole} requiredRole={1} />} />
                <Route path="/VerSolicitudesE" element={<PrivateRoute element={<VerSolicitudesE />} userRole={userRole} requiredRole={1} />} /> {/* Ruta para ver solicitudes */}
                <Route path="/agregar-servicioE" element={<PrivateRoute element={<AgregarServicioE />} userRole={userRole} requiredRole={1} />} />
            </Routes>
        </Router>
    );
}

export default App;