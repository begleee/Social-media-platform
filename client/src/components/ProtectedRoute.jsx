import React from 'react'
import { useAuthStore } from '../store/authStore'
import { Navigate, Outlet } from 'react-router';

export default function ProtectedRoute() {
    const user = useAuthStore(state => state.user);
    const loading = useAuthStore(state => state.loading);

    if(loading) (<h1>Loading profile...</h1>)
        
    return user ? (
        <Outlet/>
    ) : (
        <Navigate to="/login"/>
    )
};
