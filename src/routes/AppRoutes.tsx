import type { ComponentType } from "react";
import DashboardPage from "../pages/sales/DashboardPage";
import PosTerminalPage from "../pages/sales/PosTerminalPage";
import SalesListPage from "../pages/sales/SalesListPage";
import SalesReturnsPage from "../pages/sales/SalesReturnsPage";
import ShiftsPage from "../pages/sales/ShiftsPage";
import PreparationQueuePage from "../pages/sales/PreparationQueuePage";
import CustomersPage from "../pages/sales/CustomersPage";
import PromotionsPage from "../pages/sales/PromotionsPage";
import { Navigate, Route, Routes } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import ModulePendingPage from "../pages/ModulePendingPage";
import NotFoundPage from "../pages/NotFoundPage";
import { navigationItems } from "./navigation";


const salesPages: Record<string, ComponentType> = {
 "/dashboard": DashboardPage,
 "/sales/pos": PosTerminalPage,
 "/sales": SalesListPage,
 "/sales/returns": SalesReturnsPage,
 "/sales/shifts": ShiftsPage,
 "/sales/preparation": PreparationQueuePage,
 "/customers": CustomersPage,
 "/marketing/promotions": PromotionsPage,
};

export default function AppRoutes() {
    return (
        <Routes>
            <Route element={<MainLayout />}>
                <Route index element={<Navigate to="/dashboard" replace />} />

                {navigationItems.map((item) => {
                    const Page = salesPages[item.path] ?? ModulePendingPage;
                    return (
                    <Route
                        key={item.path}
                        path={item.path}
                        element={<Page />}
                    />
                    );
                })}

                <Route path="/distribution/planning" element={<ModulePendingPage />} />
                <Route path="/expenses/expenses" element={<ModulePendingPage />} />
                <Route path="/inventory/add-product" element={<ModulePendingPage />} />
                <Route path="/inventory/branches" element={<ModulePendingPage />} />
                <Route path="/inventory/categories" element={<ModulePendingPage />} />
                <Route path="/inventory/ingredients" element={<ModulePendingPage />} />
                <Route path="/inventory/products" element={<ModulePendingPage />} />
                <Route path="/inventory/stock-adjustment" element={<ModulePendingPage />} />
                <Route path="/inventory/units" element={<ModulePendingPage />} />
                <Route path="/invoices/invoices" element={<ModulePendingPage />} />
                <Route path="/pages/profile" element={<ModulePendingPage />} />
                <Route path="/production/batches" element={<ModulePendingPage />} />
                <Route path="/production/recipes" element={<ModulePendingPage />} />
                <Route path="/purchases/add-purchase" element={<ModulePendingPage />} />
                <Route path="/purchases/purchases" element={<ModulePendingPage />} />
                <Route path="/purchases/receipts" element={<ModulePendingPage />} />
                <Route path="/purchases/stock-transfers" element={<ModulePendingPage />} />
                <Route path="/reports/customer-report" element={<ModulePendingPage />} />
                <Route path="/reports/inventory-report" element={<ModulePendingPage />} />
                <Route path="/reports/profit-loss" element={<ModulePendingPage />} />
                <Route path="/reports/purchase-report" element={<ModulePendingPage />} />
                <Route path="/reports/sales-report" element={<ModulePendingPage />} />
                <Route path="/reports/supplier-report" element={<ModulePendingPage />} />
                <Route path="/settings/general" element={<ModulePendingPage />} />
                <Route path="/settings/inventory" element={<ModulePendingPage />} />
                <Route path="/settings/notifications" element={<ModulePendingPage />} />
                <Route path="/settings/offline-sync" element={<ModulePendingPage />} />
                <Route path="/settings/purchases" element={<ModulePendingPage />} />
                <Route path="/settings/sales" element={<ModulePendingPage />} />
                <Route path="/stores/ingredients" element={<ModulePendingPage />} />
                <Route path="/stores/shift-reconciliation" element={<ModulePendingPage />} />
                <Route path="/suppliers/suppliers" element={<ModulePendingPage />} />
                <Route path="/users/roles" element={<ModulePendingPage />} />
                <Route path="/users/users" element={<ModulePendingPage />} />
                <Route path="*" element={<NotFoundPage />} />
            </Route>
        </Routes>
    );
}