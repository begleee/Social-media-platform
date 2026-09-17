import React, { useEffect } from 'react'
import { useAuthStore } from '../store/authStore'
import { Navigate, Outlet } from 'react-router';
import ButtomTabBar from './ButtomTabBar';

export default function ProtectedRoute() {
    const user = useAuthStore(state => state.user);
    const loading = useAuthStore(state => state.loading);
    const checkAuth = useAuthStore(state => state.checkAuth);

    useEffect(() => {
        checkAuth();
    }, [checkAuth]);

    if(loading) {
        return <h1>Loading profile...</h1>
    }
    
    return user ? (
        <>
            <Outlet/>
            <ButtomTabBar/>
        </>
    ) : (
        <Navigate to="/login"/>
    )
};
