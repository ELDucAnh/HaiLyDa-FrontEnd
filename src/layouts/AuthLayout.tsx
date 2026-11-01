import { Outlet, useLocation } from "react-router-dom";

export default function AuthLayout() {
    const { pathname } = useLocation();

    return (
        <div className="auth-body min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
            {/* Animated background elements from app.css */}
            <div className="auth-bg-shape auth-bg-shape-1" />
            <div className="auth-bg-shape auth-bg-shape-2" />
            <div className="auth-bg-shape auth-bg-shape-3" />

            {/* Inner content with smooth fade-in animation on route change and load */}
            <div key={pathname} className="animate-fadeIn w-full flex items-center justify-center relative z-10">
                <Outlet />
            </div>
        </div>
    );
}

