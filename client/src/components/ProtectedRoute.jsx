import { useAuthStore } from '../store/authStore'
import { Navigate, Outlet } from 'react-router';
import { SidebarProvider } from './ui/sidebar';
import { AppSidebar } from './AppSideBar';

export default function ProtectedRoute() {
    const user = useAuthStore(state => state.user);
    
    return user ? (
        <SidebarProvider defaultOpen={false}>
            <div className="flex min-h-screen w-screen">
                <AppSidebar/>
                <main className="min-w-full flex justify-center mt-10">
                    <div className="w-full">
                        <Outlet/>
                    </div>
                </main>
            </div>
        </SidebarProvider>
    ) : (
        <Navigate to="/login"/>
    )
};
