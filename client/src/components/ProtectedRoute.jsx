import React, { useEffect } from 'react'
import { useAuthStore } from '../store/authStore'
import { Navigate, Outlet } from 'react-router';
import { Spinner } from "#components/ui/spinner";

export default function ProtectedRoute() {
    const user = useAuthStore(state => state.user);
    const loading = useAuthStore(state => state.loading);
    const checkAuth = useAuthStore(state => state.checkAuth);

    useEffect(() => {
        if(!user) {
            checkAuth();
        }
    }, [user, checkAuth]);

    if(loading) {
        return <Spinner className='size-8'/>
    }
    
    return user ? (
        <div className="min-h-screen">
            <main className="mt-10">
                <Outlet/>
            </main>
        </div>
    ) : (
        <Navigate to="/login"/>
    )
};
