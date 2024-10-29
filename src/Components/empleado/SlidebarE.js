import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const navigate = useNavigate();

    const menuItems = [
        { name: 'Perfil', path: '/ProfileE' },
        { name: 'Usuarios', path: '/UsuariosE' },
        { name: 'Vehículos', path: '/VehiculosE' },
        { name: 'Servicios', path: '/ServiciosE' },
        { name: 'Inventario', path: '/InventoryE' },
        { name: 'Solicitudes', path: '/VerSolicitudesE' }
    ];

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate('/');
    };

    return (
        <div className="flex">
            {/* Sidebar */}
            <div className={`h-screen bg-white shadow-xl ${isCollapsed ? 'w-20' : 'w-64'} transition-all duration-300`}>
                <button
                    className="absolute top-4 right-[-20px] bg-blue-500 text-white rounded-full p-2 shadow-md focus:outline-none"
                    onClick={() => setIsCollapsed(!isCollapsed)}
                >
                    {isCollapsed ? '>' : '<'}
                </button>
                <h3 className="text-2xl font-bold text-center my-6 text-gray-800">Menú</h3>
                <nav className="px-4">
                    <ul className="space-y-6">
                        {menuItems.map((item) => (
                            <li key={item.name}>
                                <button
                                    className="flex items-center p-3 text-lg font-medium text-blue-600 hover:text-blue-800 w-full focus:outline-none transform hover:scale-105 transition duration-200 ease-in-out"
                                    onClick={() => navigate(item.path)}
                                >
                                    {item.name}
                                </button>
                            </li>
                        ))}
                    </ul>
                    <button
                        className="w-full mt-10 p-3 text-lg font-medium text-red-600 hover:text-red-800 focus:outline-none transform hover:scale-105 transition duration-200 ease-in-out"
                        onClick={handleLogout}
                    >
                        Cerrar Sesión
                    </button>
                </nav>
            </div>

            {/* Main Content */}
            <div className={`flex-1 p-8 bg-gray-50 min-h-screen transition-all duration-300 ${isCollapsed ? 'ml-20' : 'ml-64'}`}>
                <h1 className="text-3xl font-bold text-gray-700 mb-6">Dashboard</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Example of content cards */}
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-xl font-bold text-gray-800">Título</h2>
                        <p className="text-gray-600">Descripción del contenido.</p>
                    </div>
                    {/* Repeat for more cards as needed */}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;