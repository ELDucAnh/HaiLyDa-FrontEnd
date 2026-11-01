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
import ProductsPage from "../pages/inventory/ProductsPage";
import IngredientsPage from "../pages/inventory/IngredientsPage";
import AddProductPage from "../pages/inventory/AddProductPage";
import ProductDetailsPage from "../pages/inventory/ProductDetailsPage";
import CategoriesPage from "../pages/inventory/CategoriesPage";
import BranchesPage from "../pages/inventory/BranchesPage";
import UnitsPage from "../pages/inventory/UnitsPage";
import StockAdjustmentPage from "../pages/inventory/StockAdjustmentPage";
import RecipesPage from "../pages/production/RecipesPage";
import BatchesPage from "../pages/production/BatchesPage";
import PurchasesPage from "../pages/purchases/PurchasesPage";
import AddPurchasePage from "../pages/purchases/AddPurchasePage";
import StockTransfersPage from "../pages/purchases/StockTransfersPage";
import ReceiptsPage from "../pages/purchases/ReceiptsPage";
import DistributionPlanningPage from "../pages/distribution/DistributionPlanningPage";
import StoreIngredientsPage from "../pages/stores/StoreIngredientsPage";
import ShiftReconciliationPage from "../pages/stores/ShiftReconciliationPage";


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

                <Route path="/distribution/planning" element={<DistributionPlanningPage />} />
                <Route path="/expenses/expenses" element={<ModulePendingPage />} />
                <Route path="/inventory/add-product" element={<Navigate to="/inventory/products/new" replace />} />
                <Route path="/inventory/products" element={<ProductsPage />} />
                <Route path="/inventory/products/new" element={<AddProductPage />} />
                <Route path="/inventory/products/:id" element={<ProductDetailsPage />} />
                <Route path="/inventory/branches" element={<BranchesPage />} />
                <Route path="/inventory/categories" element={<CategoriesPage />} />
                <Route path="/inventory/ingredients" element={<IngredientsPage />} />
                <Route path="/inventory/stock-adjustment" element={<StockAdjustmentPage />} />
                <Route path="/inventory/units" element={<UnitsPage />} />
                <Route path="/invoices/invoices" element={<ModulePendingPage />} />
                <Route path="/pages/profile" element={<ModulePendingPage />} />
                <Route path="/production/batches" element={<BatchesPage />} />
                <Route path="/production/recipes" element={<RecipesPage />} />
                <Route path="/purchases" element={<PurchasesPage />} />
                <Route path="/purchases/new" element={<AddPurchasePage />} />
                <Route path="/purchases/transfers" element={<StockTransfersPage />} />
                <Route path="/purchases/receipts" element={<ReceiptsPage />} />
                <Route path="/purchases/add-purchase" element={<Navigate to="/purchases/new" replace />} />
                <Route path="/purchases/purchases" element={<Navigate to="/purchases" replace />} />
                <Route path="/purchases/stock-transfers" element={<Navigate to="/purchases/transfers" replace />} />
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
                <Route path="/stores/ingredients" element={<StoreIngredientsPage />} />
                <Route path="/stores/shift-reconciliation" element={<ShiftReconciliationPage />} />
                <Route path="/suppliers/suppliers" element={<ModulePendingPage />} />
                <Route path="/users/roles" element={<ModulePendingPage />} />
                <Route path="/users/users" element={<ModulePendingPage />} />
                <Route path="*" element={<NotFoundPage />} />
            </Route>
        </Routes>
    );
}
