// src/components/privateRoute/PrivateRoute.jsx

import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
    const { isAuthenticated } = useSelector((state) => state.auth);

    // यदि isAuthenticated true है, तो children (protected content) दिखाओ, 
    // अन्यथा, /login पेज पर भेजो।
    return isAuthenticated ? children : <Navigate to="/login" />;
};

export default PrivateRoute;