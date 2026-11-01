import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "../components/shared/Header";
import Sidebar from "../components/shared/Sidebar";
import Footer from "../components/shared/Footer";
import { useTheme } from "../hooks/useTheme";

export default function MainLayout() {
    const [collapsed, setCollapsed] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const { pathname } = useLocation();
    const { isDark, toggleTheme } = useTheme();

    useEffect(() => {
        setMobileOpen(false);
    }, [pathname]);

    useEffect(() => {
        const media = window.matchMedia("(min-width: 1024px)");

        function handleChange() {
            if (media.matches) setMobileOpen(false);
        }

        media.addEventListener("change", handleChange);
        return () => media.removeEventListener("change", handleChange);
    }, []);

    useEffect(() => {
        if (!mobileOpen) return;

        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";

        function handleKeyDown(event: KeyboardEvent) {
            if (event.key === "Escape") setMobileOpen(false);
        }

        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.body.style.overflow = previousOverflow;
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [mobileOpen]);

    return (
        <div className="sales-ui">
            <Sidebar
                mobileOpen={mobileOpen}
                collapsed={collapsed}
                onNavigate={() => setMobileOpen(false)}
            />

            <div id="main-wrapper" className={collapsed ? "sidebar-collapsed" : ""}>
                <Header
                    mobileOpen={mobileOpen}
                    isDark={isDark}
                    onToggleSidebar={() => window.matchMedia("(min-width: 1024px)").matches ? setCollapsed(v => !v) : setMobileOpen(v => !v)}
                    onToggleTheme={toggleTheme}
                />

                <main className="min-w-0 flex-1 p-4 md:p-6">
                    {/* Inner content animation on route change & reload (Excludes Header and Sidebar) */}
                    <div key={pathname} className="animate-fadeIn min-w-0 flex-1">
                        <Outlet />
                    </div>
                </main>

                <Footer />
            </div>

            {mobileOpen && (
                <button
                    id="mobile-overlay"
                    type="button"
                    className="show border-0 p-0"
                    aria-label="Đóng thanh điều hướng"
                    onClick={() => setMobileOpen(false)}
                />
            )}
        </div>
    );
}
