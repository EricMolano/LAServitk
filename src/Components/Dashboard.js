import React from 'react';
import { Navigate } from 'react-router-dom';

function Dashboard({ userRole }) {
    if (userRole === 1) {
        return <Navigate to="/EmployeeDashboard" />;
    } else if (userRole === 2) {
        return <Navigate to="/ClientDashboard" />;
    } else if (userRole === 3) {
        return <Navigate to="/AdminDashboard" />;
    } else {
        return <Navigate to="/login" />;
    }
}

export default Dashboard;
