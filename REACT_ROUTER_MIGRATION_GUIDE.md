# Kế Hoạch & Ma Trận Chuyển Đổi Sang React Router (MilktyWay Chain)

Tài liệu này chuẩn bị cấu trúc định tuyến và kiến trúc component sẵn sàng cho giai đoạn chuyển đổi toàn bộ hệ thống giao diện HTML tĩnh sang **React (Vite + React Router v6 / v7)**.

---

## 1. Cấu Trúc Bố Cục (Layout Architecture)

Trong HTML tĩnh hiện tại, layout dùng chung được tiêm thông qua `app.js` (`getSidebarHTML()` và `getHeaderHTML()`). Khi chuyển sang React Router, kiến trúc sẽ được tổ chức thành 2 layout chính:

```
src/
├── layouts/
│   ├── MainLayout.jsx       # Layout có Sidebar + Header + ToastContainer
│   └── AuthLayout.jsx       # Layout đăng nhập / xác thực (nền mờ, không sidebar)
├── components/
│   ├── shared/
│   │   ├── Sidebar.jsx      # Chuyển đổi từ getSidebarHTML()
│   │   ├── Header.jsx       # Chuyển đổi từ getHeaderHTML()
│   │   ├── GlobalSearch.jsx # Ô tìm kiếm nhanh món, nguyên liệu, hóa đơn
│   │   ├── NotificationDropdown.jsx
│   │   └── UserDropdown.jsx
│   └── ui/
│       ├── StatCard.jsx
│       ├── DataTable.jsx
│       ├── Badge.jsx
│       └── Modal.jsx
```

---

## 2. Ma Trận Đường Dẫn Định Tuyến (Route Mapping)

### 2.1. Nhóm Xác Thực (AuthLayout)
| Trang HTML Cũ | Đường Dẫn React Route | Component Đích | Quyền Truy Cập |
| :--- | :--- | :--- | :--- |
| `pages/login.html` | `/login` | `<LoginPage />` | Công khai |
| `pages/register.html` | `/register` | `<RegisterPage />` | Công khai |
| `pages/forgot-password.html` | `/forgot-password` | `<ForgotPasswordPage />` | Công khai |
| `pages/reset-password.html` | `/reset-password` | `<ResetPasswordPage />` | Công khai |
| `404.html` / `pages/404.html` | `*` | `<NotFoundPage />` | Tất cả |

### 2.2. Nhóm Bảng Điều Khiển & Nghiệp Vụ Chính (MainLayout)
| Trang HTML Cũ | Đường Dẫn React Route | Component Đích | Phụ Trách |
| :--- | :--- | :--- | :--- |
| `index.html` | `/` | Chuyển hướng `<Navigate to="/dashboard" />` | Chung |
| `dashboard.html` | `/dashboard` | `<DashboardPage />` | Người 1 |
| `pages/profile.html` | `/profile` | `<ProfilePage />` | Người 3 |

### 2.3. Module Bán Hàng & POS (Sales) — Người 1
| Trang HTML Cũ | Đường Dẫn React Route | Component Đích |
| :--- | :--- | :--- |
| `sales/sales.html` | `/sales` | `<SalesListPage />` |
| `sales/add-sale.html` | `/sales/pos` | `<PosTerminalPage />` |
| `sales/sales-returns.html` | `/sales/returns` | `<SalesReturnsPage />` |
| `sales/shifts.html` | `/sales/shifts` | `<ShiftsPage />` |
| `sales/preparation.html` | `/sales/barista-queue` | `<PreparationQueuePage />` |
| `customers/customers.html` | `/customers` | `<CustomersPage />` |
| `marketing/promotions.html` | `/promotions` | `<PromotionsPage />` |

### 2.4. Module Kho, Sản Xuất & Phân Phối (Inventory & Purchases) — Người 2
| Trang HTML Cũ | Đường Dẫn React Route | Component Đích |
| :--- | :--- | :--- |
| `inventory/products.html` | `/inventory/products` | `<ProductsPage />` |
| `inventory/ingredients.html` | `/inventory/ingredients` | `<IngredientsPage />` |
| `inventory/add-product.html` | `/inventory/products/new` | `<AddProductPage />` |
| `inventory/product-details.html`| `/inventory/products/:id` | `<ProductDetailsPage />` |
| `inventory/categories.html` | `/inventory/categories` | `<CategoriesPage />` |
| `inventory/branches.html` | `/inventory/branches` | `<BranchesPage />` |
| `inventory/units.html` | `/inventory/units` | `<UnitsPage />` |
| `inventory/stock-adjustment.html`| `/inventory/adjustments` | `<StockAdjustmentPage />` |
| `purchases/purchases.html` | `/purchases` | `<PurchasesPage />` |
| `purchases/add-purchase.html` | `/purchases/new` | `<AddPurchasePage />` |
| `purchases/receipts.html` | `/purchases/receipts` | `<GoodsReceiptsPage />` |
| `purchases/stock-transfers.html`| `/purchases/transfers` | `<StockTransfersPage />` |
| `production/recipes.html` | `/production/recipes` | `<RecipesPage />` |
| `production/batches.html` | `/production/batches` | `<BatchesPage />` |
| `distribution/planning.html` | `/distribution/planning` | `<DistributionPlanningPage />` |
| `stores/ingredients.html` | `/stores/branch-stock` | `<BranchStockPage />` |
| `stores/shift-reconciliation.html`| `/stores/shift-audit` | `<ShiftReconciliationPage />` |

### 2.5. Module Báo Cáo, Quản Trị & Hệ Thống (Người 3)
| Trang HTML Cũ | Đường Dẫn React Route | Component Đích | Ghi Chú |
| :--- | :--- | :--- | :--- |
| `invoices/invoices.html` | `/invoices` | `<InvoicesPage />` | Bảng tra cứu toàn chuỗi |
| `invoices/invoice-details.html` | `/invoices/:id` | `<InvoiceDetailsPage />` | Hỗ trợ in bill K80 / K57 |
| `suppliers/suppliers.html` | `/suppliers` | `<SuppliersPage />` | Danh bạ NCC & ATVSTP |
| `expenses/expenses.html` | `/expenses` | `<ExpensesPage />` | Sổ chi phí vận hành |
| `reports/sales-report.html` | `/reports/sales` | `<SalesReportPage />` | Biểu đồ doanh thu chuỗi |
| `reports/inventory-report.html` | `/reports/inventory` | `<InventoryReportPage />` | Cảnh báo FEFO cận date |
| `reports/profit-loss.html` | `/reports/profit-loss` | `<ProfitLossReportPage />` | Điểm hòa vốn chi nhánh |
| `reports/customer-report.html` | `/reports/customers` | `<CustomerReportPage />` | Phân hạng hội viên VIP |
| `reports/purchase-report.html` | `/reports/purchases` | `<PurchaseReportPage />` | Báo cáo nhập hàng |
| `reports/supplier-report.html` | `/reports/suppliers` | `<SupplierReportPage />` | Bảng đánh giá NCC |
| `users/users.html` | `/users` | `<UsersPage />` | Danh sách nhân viên |
| `users/roles.html` | `/users/roles` | `<RolesMatrixPage />` | Ma trận phân quyền 4 vai trò |
| `settings/general.html` | `/settings/general` | `<GeneralSettingsPage />` | Cài đặt thông tin chuỗi |
| `settings/inventory.html` | `/settings/inventory` | `<InventorySettingsPage />` | Cài đặt kho & FEFO |
| `settings/sales.html` | `/settings/sales` | `<SalesSettingsPage />` | Cài đặt bán hàng POS |
| `settings/purchases.html` | `/settings/purchases` | `<PurchasesSettingsPage />` | Cài đặt kiểm nghiệm thu mua |
| `settings/notifications.html` | `/settings/notifications`| `<NotificationsSettingsPage />` | Cấu hình kênh cảnh báo |
| `settings/offline-sync.html` | `/settings/offline-sync` | `<OfflineSyncPage />` | Giám sát đồng bộ ngoại tuyến |

---

## 3. Bản Mẫu Khởi Tạo Bộ Định Tuyến (AppRoutes.jsx)

```jsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import AuthLayout from './layouts/AuthLayout';

// Auth Pages
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import ForgotPasswordPage from './pages/auth/ForgotPasswordPage';
import ResetPasswordPage from './pages/auth/ResetPasswordPage';
import NotFoundPage from './pages/NotFoundPage';

// Người 3 Pages
import InvoicesPage from './pages/invoices/InvoicesPage';
import InvoiceDetailsPage from './pages/invoices/InvoiceDetailsPage';
import SuppliersPage from './pages/suppliers/SuppliersPage';
import ExpensesPage from './pages/expenses/ExpensesPage';
import SalesReportPage from './pages/reports/SalesReportPage';
import InventoryReportPage from './pages/reports/InventoryReportPage';
import ProfitLossReportPage from './pages/reports/ProfitLossReportPage';
import CustomerReportPage from './pages/reports/CustomerReportPage';
import PurchaseReportPage from './pages/reports/PurchaseReportPage';
import SupplierReportPage from './pages/reports/SupplierReportPage';
import UsersPage from './pages/users/UsersPage';
import RolesPage from './pages/users/RolesPage';
import GeneralSettingsPage from './pages/settings/GeneralSettingsPage';
import InventorySettingsPage from './pages/settings/InventorySettingsPage';
import SalesSettingsPage from './pages/settings/SalesSettingsPage';
import PurchasesSettingsPage from './pages/settings/PurchasesSettingsPage';
import NotificationsSettingsPage from './pages/settings/NotificationsSettingsPage';
import OfflineSyncPage from './pages/settings/OfflineSyncPage';
import ProfilePage from './pages/ProfilePage';

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Auth Routes */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
        </Route>

        {/* Protected App Routes */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/profile" element={<ProfilePage />} />

          {/* Invoices */}
          <Route path="/invoices" element={<InvoicesPage />} />
          <Route path="/invoices/:id" element={<InvoiceDetailsPage />} />

          {/* Suppliers & Expenses */}
          <Route path="/suppliers" element={<SuppliersPage />} />
          <Route path="/expenses" element={<ExpensesPage />} />

          {/* Reports */}
          <Route path="/reports/sales" element={<SalesReportPage />} />
          <Route path="/reports/inventory" element={<InventoryReportPage />} />
          <Route path="/reports/profit-loss" element={<ProfitLossReportPage />} />
          <Route path="/reports/customers" element={<CustomerReportPage />} />
          <Route path="/reports/purchases" element={<PurchaseReportPage />} />
          <Route path="/reports/suppliers" element={<SupplierReportPage />} />

          {/* Users & Roles */}
          <Route path="/users" element={<UsersPage />} />
          <Route path="/users/roles" element={<RolesPage />} />

          {/* Settings Sub-routes */}
          <Route path="/settings">
            <Route index element={<Navigate to="/settings/general" replace />} />
            <Route path="general" element={<GeneralSettingsPage />} />
            <Route path="inventory" element={<InventorySettingsPage />} />
            <Route path="sales" element={<SalesSettingsPage />} />
            <Route path="purchases" element={<PurchasesSettingsPage />} />
            <Route path="notifications" element={<NotificationsSettingsPage />} />
            <Route path="offline-sync" element={<OfflineSyncPage />} />
          </Route>
        </Route>

        {/* 404 Catch-all */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}
```

---

## 4. Danh Sách Kiểm Tra Khi Tích Hợp (Checklist)

- [x] Toàn bộ liên kết tương đối (`href="../..."`) đã được chuẩn hóa và sẵn sàng chuyển đổi thành `<NavLink to="...">`.
- [x] Trạng thái `active` trên menu thanh bên (Sidebar) sẽ tự động kích hoạt dựa trên `useLocation().pathname`.
- [x] Quản lý state thông báo (Toast) và hộp thoại xác nhận (Modal) có thể chuyển thành React Context Hook: `useToast()` và `useModal()`.
- [x] Trạng thái đăng nhập và phân quyền 4 vai trò (`owner`, `manager`, `cashier`, `warehouse`) được quản lý qua `AuthContext`.

