import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('adminToken');
        const storedUser = localStorage.getItem('adminUser');
        if (token && storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

    const login = (email, password) => {
        // demo credentials: admin@example.com / admin123
        if (email === 'admin@example.com' && password === 'admin123') {
            const userData = { name: 'Admin User', email: 'admin@example.com', role: 'admin' };
            const token = 'mock-jwt-token-xyz';
            localStorage.setItem('adminToken', token);
            localStorage.setItem('adminUser', JSON.stringify(userData));
            setUser(userData);
            return { success: true };
        }
        return { success: false, error: 'Invalid credentials' };
    };

    const logout = () => {
        localStorage.removeItem('adminToken');
        localStorage.removeItem('adminUser');
        setUser(null);
    };

    const changePassword = (oldPassword, newPassword) => {
        // demo mock
        if (oldPassword === 'admin123') {
            // In real app, call API
            return { success: true };
        }
        return { success: false, error: 'Wrong current password' };
    };

    const value = { user, login, logout, changePassword, loading };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};