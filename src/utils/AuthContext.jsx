import React, { createContext, useState, useContext, useEffect } from 'react';

export const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);

    const login = (token) => {
        // Decode token and set current user
        // For demonstration purposes, assume token contains user data
        setCurrentUser(token);
        // Save token to local storage or cookies
        localStorage.setItem('token', token);
    };

    const logout = () => {
        // Remove token from local storage or cookies
        localStorage.removeItem('token');
        setCurrentUser(null);
    };

    // Check if user is logged in on component mount
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            login(token);
        }
    }, []);

    return (
        <AuthContext.Provider value={{ currentUser, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
