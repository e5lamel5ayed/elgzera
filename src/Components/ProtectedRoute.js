// ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element }) => {
    const isAuthenticated = !!localStorage.getItem('token');

    if (isAuthenticated) {
        return element;
    }

    return <Navigate to="/" replace />;
};

export default ProtectedRoute;
