import { useEffect } from 'react'
import { useAuthStore } from '../store/authStore'
import { Navigate, Outlet } from 'react-router';
import { Spinner } from "#components/ui/spinner";
import { SidebarProvider } from './ui/sidebar';
import { AppSidebar } from './AppSideBar';

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
        <SidebarProvider defaultOpen={false}>
            <div className="flex min-h-screen min-w-screen">
                <AppSidebar/>
                <main className="min-w-full flex justify-center">
                    <div className="mt-10 w-full">
                        <Outlet/>
                    </div>
                </main>
            </div>
        </SidebarProvider>
    ) : (
        <Navigate to="/login"/>
    )
};
