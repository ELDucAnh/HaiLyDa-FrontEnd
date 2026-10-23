/* ============================================
   Invenza — Core Application JavaScript
   Layout Injection + Interactive Behaviors
   ============================================ */

'use strict';

/* ============================================
   Configuration
   ============================================ */
const BASE_PATH = window.BASE_PATH || './';

/* ============================================
   Sidebar HTML Template
   ============================================ */
function getSidebarHTML() {
  const bp = BASE_PATH;
  return `
<a href="${bp}dashboard.html" id="sidebar-logo" class="flex items-center h-16 px-4 border-b" style="border-color:var(--border);flex-shrink:0;text-decoration:none;transition:background 0.15s;" onmouseover="this.style.background='var(--background)'" onmouseout="this.style.background='transparent'">
  <div class="flex items-center gap-3 min-w-0">
    <div class="flex-shrink-0 w-10 h-10 flex items-center justify-center" style="background:linear-gradient(135deg,#22B573 0%,#16A34A 100%);border-radius:12px;box-shadow:0 2px 8px rgba(34,181,115,0.3);">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2L3 7v10l9 5 9-5V7l-9-5z" fill="white" fill-opacity="0.2"/>
        <path d="M12 2L3 7v10l9 5 9-5V7l-9-5z" stroke="white" stroke-width="1.5" stroke-linejoin="round"/>
        <path d="M12 22V12" stroke="white" stroke-width="1.5" stroke-linejoin="round"/>
        <path d="M3 7l9 5 9-5" stroke="white" stroke-width="1.5" stroke-linejoin="round"/>
        <circle cx="12" cy="12" r="2.5" fill="white" stroke="white" stroke-width="0.5"/>
      </svg>
    </div>
    <div class="sidebar-label" style="border-left:1px solid var(--border);padding-left:12px;">
      <div style="font-size:16px;font-weight:700;color:var(--text);line-height:1.1;letter-spacing:-0.3px;">Invenza</div>
      <div style="font-size:9.5px;color:var(--primary);font-weight:600;letter-spacing:0.8px;text-transform:uppercase;margin-top:2px;">Inventory Management</div>
    </div>
  </div>
</a>

<nav id="sidebar-nav" class="flex-1 overflow-y-auto py-3 px-3" style="gap:2px;">

  <div class="sidebar-section-label">MAIN</div>

  <a href="${bp}dashboard.html" class="nav-item" data-page="dashboard">
    <svg class="flex-shrink-0" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
    <span class="sidebar-label flex-1">Dashboard</span>
  </a>

  <div class="sidebar-section-label">INVENTORY</div>

  <!-- Inventory submenu -->
  <div class="submenu-group" data-submenu="inventory">
    <button class="nav-item submenu-toggle" data-page-group="inventory">
      <svg class="flex-shrink-0" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>
      <span class="sidebar-label flex-1 text-left">Inventory</span>
      <span class="nav-toggle-icon sidebar-label">
        <svg class="icon-plus" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
        <svg class="icon-minus" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:none;"><line x1="5" y1="12" x2="19" y2="12"/></svg>
      </span>
    </button>
    <div class="submenu" id="submenu-inventory">
      <a href="${bp}inventory/products.html" class="submenu-item" data-page="products">Products</a>
      <a href="${bp}inventory/add-product.html" class="submenu-item" data-page="add-product">Add Product</a>
      <a href="${bp}inventory/categories.html" class="submenu-item" data-page="categories">Categories</a>
      <a href="${bp}inventory/brands.html" class="submenu-item" data-page="brands">Brands</a>
      <a href="${bp}inventory/units.html" class="submenu-item" data-page="units">Units</a>
      <a href="${bp}inventory/stock-adjustment.html" class="submenu-item" data-page="stock-adjustment">Stock Adjustment</a>
    </div>
  </div>

  <!-- Purchases submenu -->
  <div class="submenu-group" data-submenu="purchases">
    <button class="nav-item submenu-toggle" data-page-group="purchases">
      <svg class="flex-shrink-0" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
      <span class="sidebar-label flex-1 text-left">Purchases</span>
      <span class="nav-toggle-icon sidebar-label">
        <svg class="icon-plus" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
        <svg class="icon-minus" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:none;"><line x1="5" y1="12" x2="19" y2="12"/></svg>
      </span>
    </button>
    <div class="submenu" id="submenu-purchases">
      <a href="${bp}purchases/purchases.html" class="submenu-item" data-page="purchases">All Purchases</a>
      <a href="${bp}purchases/add-purchase.html" class="submenu-item" data-page="add-purchase">Add Purchase</a>
      <a href="${bp}purchases/purchase-returns.html" class="submenu-item" data-page="purchase-returns">Purchase Returns</a>
    </div>
  </div>

  <!-- Sales submenu -->
  <div class="submenu-group" data-submenu="sales">
    <button class="nav-item submenu-toggle" data-page-group="sales">
      <svg class="flex-shrink-0" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
      <span class="sidebar-label flex-1 text-left">Sales</span>
      <span class="nav-toggle-icon sidebar-label">
        <svg class="icon-plus" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
        <svg class="icon-minus" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:none;"><line x1="5" y1="12" x2="19" y2="12"/></svg>
      </span>
    </button>
    <div class="submenu" id="submenu-sales">
      <a href="${bp}sales/sales.html" class="submenu-item" data-page="sales">All Sales</a>
      <a href="${bp}sales/add-sale.html" class="submenu-item" data-page="add-sale">Point of Sale</a>
      <a href="${bp}sales/sales-returns.html" class="submenu-item" data-page="sales-returns">Sales Returns</a>
    </div>
  </div>

  <a href="${bp}invoices/invoices.html" class="nav-item" data-page="invoices">
    <svg class="flex-shrink-0" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
    <span class="sidebar-label flex-1">Invoices</span>
  </a>

  <div class="sidebar-section-label">CRM</div>

  <a href="${bp}customers/customers.html" class="nav-item" data-page="customers">
    <svg class="flex-shrink-0" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
    <span class="sidebar-label flex-1">Customers</span>
  </a>

  <a href="${bp}suppliers/suppliers.html" class="nav-item" data-page="suppliers">
    <svg class="flex-shrink-0" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>
    <span class="sidebar-label flex-1">Suppliers</span>
  </a>

  <a href="${bp}expenses/expenses.html" class="nav-item" data-page="expenses">
    <svg class="flex-shrink-0" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>
    <span class="sidebar-label flex-1">Expenses</span>
  </a>

  <div class="sidebar-section-label">ANALYTICS</div>

  <!-- Reports submenu -->
  <div class="submenu-group" data-submenu="reports">
    <button class="nav-item submenu-toggle" data-page-group="reports">
      <svg class="flex-shrink-0" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>
      <span class="sidebar-label flex-1 text-left">Reports</span>
      <span class="nav-toggle-icon sidebar-label">
        <svg class="icon-plus" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
        <svg class="icon-minus" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:none;"><line x1="5" y1="12" x2="19" y2="12"/></svg>
      </span>
    </button>
    <div class="submenu" id="submenu-reports">
      <a href="${bp}reports/sales-report.html" class="submenu-item" data-page="sales-report">Sales Report</a>
      <a href="${bp}reports/purchase-report.html" class="submenu-item" data-page="purchase-report">Purchase Report</a>
      <a href="${bp}reports/inventory-report.html" class="submenu-item" data-page="inventory-report">Inventory Report</a>
      <a href="${bp}reports/profit-loss.html" class="submenu-item" data-page="profit-loss">Profit &amp; Loss</a>
      <a href="${bp}reports/customer-report.html" class="submenu-item" data-page="customer-report">Customer Report</a>
      <a href="${bp}reports/supplier-report.html" class="submenu-item" data-page="supplier-report">Supplier Report</a>
    </div>
  </div>

  <div class="sidebar-section-label">ADMIN</div>

  <!-- Users submenu -->
  <div class="submenu-group" data-submenu="users">
    <button class="nav-item submenu-toggle" data-page-group="users">
      <svg class="flex-shrink-0" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
      <span class="sidebar-label flex-1 text-left">Users</span>
      <span class="nav-toggle-icon sidebar-label">
        <svg class="icon-plus" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
        <svg class="icon-minus" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:none;"><line x1="5" y1="12" x2="19" y2="12"/></svg>
      </span>
    </button>
    <div class="submenu" id="submenu-users">
      <a href="${bp}users/users.html" class="submenu-item" data-page="users-list">All Users</a>
      <a href="${bp}users/roles.html" class="submenu-item" data-page="roles">Roles &amp; Permissions</a>
    </div>
  </div>

  <!-- Settings submenu -->
  <div class="submenu-group" data-submenu="settings">
    <button class="nav-item submenu-toggle" data-page-group="settings">
      <svg class="flex-shrink-0" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.07 4.93l-1.41 1.41M5.34 18.66l-1.41 1.41M2 12h2M20 12h2M6.34 5.34L4.93 4.93M19.07 19.07l-1.41-1.41M12 2v2M12 20v2M18.66 6.34l-1.41 1.41M6.34 18.66l-1.41 1.41"/></svg>
      <span class="sidebar-label flex-1 text-left">Settings</span>
      <span class="nav-toggle-icon sidebar-label">
        <svg class="icon-plus" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
        <svg class="icon-minus" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:none;"><line x1="5" y1="12" x2="19" y2="12"/></svg>
      </span>
    </button>
    <div class="submenu" id="submenu-settings">
      <a href="${bp}settings/general.html" class="submenu-item" data-page="settings-general">General</a>
      <a href="${bp}settings/inventory.html" class="submenu-item" data-page="settings-inventory">Inventory</a>
      <a href="${bp}settings/sales.html" class="submenu-item" data-page="settings-sales">Sales</a>
      <a href="${bp}settings/purchases.html" class="submenu-item" data-page="settings-purchases">Purchases</a>
      <a href="${bp}settings/notifications.html" class="submenu-item" data-page="settings-notifications">Notifications</a>
    </div>
  </div>
</nav>

<!-- Sidebar User Profile -->
<div id="sidebar-user" class="p-3 border-t" style="border-color:var(--border);flex-shrink:0;">
  <a href="${bp}pages/profile.html" class="flex items-center gap-3 p-2 rounded-xl hover:bg-[var(--background)] transition-colors" style="text-decoration:none;">
    <div class="flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center text-white font-semibold text-sm" style="background:var(--primary);">JS</div>
    <div class="sidebar-label min-w-0">
      <div style="font-size:13px;font-weight:600;color:var(--text);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">John Smith</div>
      <div style="font-size:11px;color:var(--muted);">Administrator</div>
    </div>
  </a>
</div>
  `;
}

/* ============================================
   Header HTML Template
   ============================================ */
function getHeaderHTML() {
  const bp = BASE_PATH;
  return `
<button id="sidebar-toggle-btn" class="p-2 rounded-lg hover:bg-[var(--background)] transition-colors" style="color:var(--muted);border:none;background:none;cursor:pointer;flex-shrink:0;" aria-label="Toggle Sidebar">
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
</button>

<!-- Global Search -->
<div class="flex-1 max-w-md relative search-box" id="global-search-box">
  <svg class="search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
  <input id="global-search-input" type="text" placeholder="Search products, customers, invoices..."
    class="form-input" style="height:40px;font-size:13px;background:var(--background);"
    autocomplete="off">
  <div id="global-search-dropdown" class="global-search-dropdown" style="display:none;"></div>
</div>

<div class="flex items-center gap-2 ml-auto">
  <!-- Dark Mode Toggle -->
  <button id="dark-mode-btn" class="p-2 rounded-lg hover:bg-[var(--background)] transition-colors" style="color:var(--muted);border:none;background:none;cursor:pointer;" aria-label="Toggle dark mode">
    <svg id="dark-mode-icon-moon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
    <svg id="dark-mode-icon-sun" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:none;"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
  </button>

  <!-- Notifications -->
  <div class="relative" id="notification-dropdown-wrapper">
    <button id="notification-btn" class="p-2 rounded-lg hover:bg-[var(--background)] transition-colors relative" style="color:var(--muted);border:none;background:none;cursor:pointer;" aria-label="Notifications">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
      <span class="absolute top-1 right-1 w-2 h-2 rounded-full" style="background:#EF4444;"></span>
    </button>
    <div id="notification-dropdown" class="dropdown-menu" style="display:none;right:0;width:340px;max-height:440px;">
      <div style="padding:14px 16px;border-bottom:1px solid var(--border);display:flex;align-items:center;justify-content:space-between;">
        <span style="font-size:15px;font-weight:600;color:var(--text);">Notifications</span>
        <span class="badge badge-danger">4 New</span>
      </div>
      <div style="overflow-y:auto;max-height:320px;">
        <div class="notification-item unread">
          <div class="stat-icon icon-bg-warning flex-shrink-0" style="width:36px;height:36px;border-radius:10px;">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
          </div>
          <div style="flex:1;min-width:0;">
            <div style="font-size:13px;font-weight:600;color:var(--text);">Low Stock Alert</div>
            <div style="font-size:12px;color:var(--muted);margin-top:2px;">Wireless Mouse has only 3 items remaining.</div>
            <div style="font-size:11px;color:var(--muted);margin-top:4px;">5 min ago</div>
          </div>
        </div>
        <div class="notification-item unread">
          <div class="stat-icon icon-bg-success flex-shrink-0" style="width:36px;height:36px;border-radius:10px;">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
          </div>
          <div style="flex:1;min-width:0;">
            <div style="font-size:13px;font-weight:600;color:var(--text);">New Sale Created</div>
            <div style="font-size:12px;color:var(--muted);margin-top:2px;">INV-000125 was created for $845.00.</div>
            <div style="font-size:11px;color:var(--muted);margin-top:4px;">18 min ago</div>
          </div>
        </div>
        <div class="notification-item unread">
          <div class="stat-icon icon-bg-info flex-shrink-0" style="width:36px;height:36px;border-radius:10px;">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>
          </div>
          <div style="flex:1;min-width:0;">
            <div style="font-size:13px;font-weight:600;color:var(--text);">Payment Received</div>
            <div style="font-size:12px;color:var(--muted);margin-top:2px;">$1,250 payment received from John Smith.</div>
            <div style="font-size:11px;color:var(--muted);margin-top:4px;">1 hr ago</div>
          </div>
        </div>
        <div class="notification-item unread">
          <div class="stat-icon icon-bg-danger flex-shrink-0" style="width:36px;height:36px;border-radius:10px;">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
          </div>
          <div style="flex:1;min-width:0;">
            <div style="font-size:13px;font-weight:600;color:var(--text);">Invoice Overdue</div>
            <div style="font-size:12px;color:var(--muted);margin-top:2px;">INV-000119 is past due date.</div>
            <div style="font-size:11px;color:var(--muted);margin-top:4px;">2 hrs ago</div>
          </div>
        </div>
        <div class="notification-item">
          <div class="stat-icon icon-bg-primary flex-shrink-0" style="width:36px;height:36px;border-radius:10px;">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>
          </div>
          <div style="flex:1;min-width:0;">
            <div style="font-size:13px;font-weight:600;color:var(--text);">Stock Adjusted</div>
            <div style="font-size:12px;color:var(--muted);margin-top:2px;">Mechanical Keyboard stock adjusted by +50 units.</div>
            <div style="font-size:11px;color:var(--muted);margin-top:4px;">Yesterday</div>
          </div>
        </div>
      </div>
      <div style="padding:12px 16px;border-top:1px solid var(--border);text-align:center;">
        <a href="#" style="font-size:13px;color:var(--primary);font-weight:500;text-decoration:none;">View all notifications</a>
      </div>
    </div>
  </div>

  <!-- User Menu -->
  <div class="relative" id="user-dropdown-wrapper">
    <button id="user-menu-btn" class="flex items-center gap-2 px-2 py-1.5 rounded-xl hover:bg-[var(--background)] transition-colors" style="border:none;background:none;cursor:pointer;">
      <img src="${bp}assets/img/avator/1.jpg" alt="John Smith" class="w-8 h-8 rounded-full flex-shrink-0" style="object-fit:cover;">
      <div class="text-left hidden sm:block">
        <div style="font-size:13px;font-weight:600;color:var(--text);line-height:1.2;">John Smith</div>
        <div style="font-size:11px;color:var(--muted);">Admin</div>
      </div>
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="color:var(--muted);"><polyline points="6 9 12 15 18 9"/></svg>
    </button>
    <div id="user-dropdown" class="dropdown-menu" style="display:none;right:0;min-width:200px;">
      <div style="padding:12px 16px;border-bottom:1px solid var(--border);">
        <div style="font-size:13px;font-weight:600;color:var(--text);">John Smith</div>
        <div style="font-size:12px;color:var(--muted);">john@invenza.com</div>
      </div>
      <a href="${bp}pages/profile.html" class="dropdown-item">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
        My Profile
      </a>
      <a href="${bp}settings/general.html" class="dropdown-item">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.07 4.93l-1.41 1.41M5.34 18.66l-1.41 1.41M2 12h2M20 12h2M6.34 5.34L4.93 4.93M19.07 19.07l-1.41-1.41M12 2v2M12 20v2"/></svg>
        Settings
      </a>
      <div class="dropdown-divider"></div>
      <a href="${bp}pages/login.html" class="dropdown-item danger">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
        Sign Out
      </a>
    </div>
  </div>
</div>
  `;
}

/* ============================================
   Layout Initialization
   ============================================ */
function initLayout() {
  const sidebarContainer = document.getElementById('sidebar-container');
  const headerContainer  = document.getElementById('header-container');

  if (sidebarContainer) {
    const aside = document.createElement('aside');
    aside.id = 'sidebar';
    aside.innerHTML = getSidebarHTML();
    document.body.insertBefore(aside, document.body.firstChild);
  }

  if (headerContainer) {
    const header = document.createElement('header');
    header.id = 'app-header';
    header.innerHTML = getHeaderHTML();
    headerContainer.appendChild(header);
  }

  // Mobile overlay
  let overlay = document.getElementById('mobile-overlay');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.id = 'mobile-overlay';
    document.body.appendChild(overlay);
    overlay.addEventListener('click', closeMobileSidebar);
  }

  initSidebar();
  initDarkMode();
  initDropdowns();
  initSearch();
  setActiveNav();
}

/* ============================================
   Sidebar Functionality
   ============================================ */
function initSidebar() {
  const sidebar = document.getElementById('sidebar');
  const mainWrapper = document.getElementById('main-wrapper');
  const toggleBtn = document.getElementById('sidebar-toggle-btn');

  if (!sidebar) return;

  // Restore state
  let collapsed = false;
  try { collapsed = localStorage.getItem('sf_sidebar_collapsed') === 'true'; } catch (e) {}
  if (collapsed) {
    sidebar.classList.add('collapsed');
    mainWrapper && mainWrapper.classList.add('sidebar-collapsed');
  }

  // Toggle button
  toggleBtn && toggleBtn.addEventListener('click', () => {
    const isCollapsed = sidebar.classList.contains('collapsed');
    if (window.innerWidth < 1024) {
      toggleMobileSidebar();
    } else {
      if (isCollapsed) {
        sidebar.classList.remove('collapsed');
        mainWrapper && mainWrapper.classList.remove('sidebar-collapsed');
        try { localStorage.setItem('sf_sidebar_collapsed', 'false'); } catch (e) {}
      } else {
        sidebar.classList.add('collapsed');
        mainWrapper && mainWrapper.classList.add('sidebar-collapsed');
        try { localStorage.setItem('sf_sidebar_collapsed', 'true'); } catch (e) {}
      }
    }
  });

  // Submenu toggles
  document.querySelectorAll('.submenu-toggle').forEach(btn => {
    btn.addEventListener('click', function() {
      const group = this.closest('.submenu-group');
      if (!group) return;
      const submenuId = 'submenu-' + group.dataset.submenu;
      const submenu = document.getElementById(submenuId);
      if (!submenu) return;

      const isOpen = submenu.classList.contains('open');
      const iconPlus = this.querySelector('.icon-plus');
      const iconMinus = this.querySelector('.icon-minus');

      // Close all other submenus
      document.querySelectorAll('.submenu.open').forEach(sm => {
        if (sm !== submenu) {
          sm.classList.remove('open');
          const sibBtn = sm.previousElementSibling;
          if (sibBtn) {
            const sibPlus = sibBtn.querySelector('.icon-plus');
            const sibMinus = sibBtn.querySelector('.icon-minus');
            if (sibPlus) sibPlus.style.display = 'block';
            if (sibMinus) sibMinus.style.display = 'none';
          }
        }
      });

      submenu.classList.toggle('open', !isOpen);

      // Toggle +/- icons
      if (iconPlus && iconMinus) {
        iconPlus.style.display = isOpen ? 'block' : 'none';
        iconMinus.style.display = isOpen ? 'none' : 'block';
      }
    });
  });
}

function toggleMobileSidebar() {
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('mobile-overlay');
  sidebar && sidebar.classList.toggle('mobile-open');
  overlay && overlay.classList.toggle('show');
}

function closeMobileSidebar() {
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('mobile-overlay');
  sidebar && sidebar.classList.remove('mobile-open');
  overlay && overlay.classList.remove('show');
}

/* ============================================
   Active Navigation
   ============================================ */
function setActiveNav() {
  const currentPage = window.CURRENT_PAGE || '';
  if (!currentPage) return;

  // Direct nav items
  const directLink = document.querySelector(`[data-page="${currentPage}"]`);
  if (directLink) {
    directLink.classList.add('active');
    return;
  }

  // Submenu items
  const submenuLink = document.querySelector(`.submenu-item[data-page="${currentPage}"]`);
  if (submenuLink) {
    submenuLink.classList.add('active');
    // Open parent submenu
    const submenu = submenuLink.closest('.submenu');
    if (submenu) {
      submenu.classList.add('open');
      const toggleBtn = submenu.previousElementSibling;
      toggleBtn && toggleBtn.classList.add('active');
      // Toggle +/- icons
      const iconPlus = toggleBtn && toggleBtn.querySelector('.icon-plus');
      const iconMinus = toggleBtn && toggleBtn.querySelector('.icon-minus');
      if (iconPlus) iconPlus.style.display = 'none';
      if (iconMinus) iconMinus.style.display = 'block';
    }
  }
}

/* ============================================
   Dark Mode & Chart Theming
   ============================================ */
function applyChartTheme(isDark) {
  if (typeof Chart !== 'undefined') {
    try {
      Chart.defaults.color = isDark ? '#94A3B8' : '#6B7280';
      Chart.defaults.borderColor = isDark ? 'rgba(51,65,85,0.8)' : 'rgba(232,237,241,0.8)';
      if (Chart.instances) {
        Object.values(Chart.instances).forEach(chart => {
          try {
            if (chart.options && chart.options.scales) {
              Object.values(chart.options.scales).forEach(scale => {
                if (scale.ticks) scale.ticks.color = isDark ? '#94A3B8' : '#6B7280';
                if (scale.grid && scale.grid.display !== false) {
                  scale.grid.color = isDark ? 'rgba(51,65,85,0.8)' : 'rgba(232,237,241,0.8)';
                }
              });
            }
            if (chart.options && chart.options.plugins && chart.options.plugins.legend) {
              chart.options.plugins.legend.labels = chart.options.plugins.legend.labels || {};
              chart.options.plugins.legend.labels.color = isDark ? '#F1F5F9' : '#17212B';
            }
            chart.update();
          } catch(e) {}
        });
      }
    } catch(e) {}
  }
}

function initDarkMode() {
  let savedTheme = 'light';
  try { savedTheme = localStorage.getItem('sf_theme') || 'light'; } catch (e) {}
  const isDark = savedTheme === 'dark';
  if (isDark) {
    document.documentElement.classList.add('dark');
    updateDarkModeIcon(true);
  } else {
    document.documentElement.classList.remove('dark');
    updateDarkModeIcon(false);
  }
  applyChartTheme(isDark);

  const btn = document.getElementById('dark-mode-btn');
  if (btn && !btn._hasDarkModeListener) {
    btn._hasDarkModeListener = true;
    btn.addEventListener('click', () => {
      const isDarkNow = document.documentElement.classList.toggle('dark');
      try { localStorage.setItem('sf_theme', isDarkNow ? 'dark' : 'light'); } catch (e) {}
      updateDarkModeIcon(isDarkNow);
      applyChartTheme(isDarkNow);
      // Notify charts + other components to refresh colors
      document.dispatchEvent(new CustomEvent('themechange', { detail: { dark: isDarkNow } }));
    });
  }
}

function updateDarkModeIcon(isDark) {
  const moon = document.getElementById('dark-mode-icon-moon');
  const sun  = document.getElementById('dark-mode-icon-sun');
  if (moon) moon.style.display = isDark ? 'none' : 'block';
  if (sun)  sun.style.display  = isDark ? 'block' : 'none';
}

// Apply dark mode immediately (before layout injection to avoid flash)
(function() {
  var isDark = false;
  try { isDark = localStorage.getItem('sf_theme') === 'dark'; } catch (e) {}
  if (isDark) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
  if (typeof Chart !== 'undefined' && typeof applyChartTheme === 'function') {
    applyChartTheme(isDark);
  }
})();

/* ============================================
   Dropdowns
   ============================================ */
function initDropdowns() {
  // Close all dropdowns on outside click
  document.addEventListener('click', (e) => {
    if (!e.target.closest('#notification-dropdown-wrapper')) {
      document.getElementById('notification-dropdown') && (document.getElementById('notification-dropdown').style.display = 'none');
    }
    if (!e.target.closest('#user-dropdown-wrapper')) {
      document.getElementById('user-dropdown') && (document.getElementById('user-dropdown').style.display = 'none');
    }
    if (!e.target.closest('.action-dropdown-wrapper')) {
      document.querySelectorAll('.action-dropdown-menu').forEach(m => m.style.display = 'none');
    }
  });

  setTimeout(() => {
    const notifBtn = document.getElementById('notification-btn');
    const notifDropdown = document.getElementById('notification-dropdown');
    notifBtn && notifBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isVisible = notifDropdown.style.display !== 'none';
      document.getElementById('user-dropdown').style.display = 'none';
      notifDropdown.style.display = isVisible ? 'none' : 'block';
    });

    const userBtn = document.getElementById('user-menu-btn');
    const userDropdown = document.getElementById('user-dropdown');
    userBtn && userBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isVisible = userDropdown.style.display !== 'none';
      notifDropdown.style.display = 'none';
      userDropdown.style.display = isVisible ? 'none' : 'block';
    });
  }, 100);
}

/* ============================================
   Global Search
   ============================================ */
const SEARCH_DATA = [
  { type: 'Product', label: 'Wireless Mouse', sub: 'SKU: WM-001 · Stock: 3', url: 'inventory/products.html' },
  { type: 'Product', label: 'Mechanical Keyboard', sub: 'SKU: MK-002 · Stock: 45', url: 'inventory/products.html' },
  { type: 'Product', label: 'USB-C Hub', sub: 'SKU: UH-003 · Stock: 22', url: 'inventory/products.html' },
  { type: 'Product', label: 'Laptop Stand', sub: 'SKU: LS-004 · Stock: 18', url: 'inventory/products.html' },
  { type: 'Product', label: 'Bluetooth Speaker', sub: 'SKU: BS-005 · Stock: 31', url: 'inventory/products.html' },
  { type: 'Product', label: 'Webcam HD', sub: 'SKU: WC-006 · Stock: 14', url: 'inventory/products.html' },
  { type: 'Product', label: 'Power Bank', sub: 'SKU: PB-007 · Stock: 27', url: 'inventory/products.html' },
  { type: 'Customer', label: 'John Smith', sub: 'john.smith@email.com · Active', url: 'customers/customers.html' },
  { type: 'Customer', label: 'Michael Brown', sub: 'michael.b@email.com · Active', url: 'customers/customers.html' },
  { type: 'Customer', label: 'Sarah Wilson', sub: 'sarah.w@email.com · Active', url: 'customers/customers.html' },
  { type: 'Customer', label: 'David Miller', sub: 'david.m@email.com · Active', url: 'customers/customers.html' },
  { type: 'Supplier', label: 'Tech Supply Ltd.', sub: 'tech@supply.com · Active', url: 'suppliers/suppliers.html' },
  { type: 'Supplier', label: 'Global Electronics', sub: 'global@elect.com · Active', url: 'suppliers/suppliers.html' },
  { type: 'Invoice', label: 'INV-000125', sub: 'John Smith · $845.00 · Paid', url: 'invoices/invoices.html' },
  { type: 'Invoice', label: 'INV-000124', sub: 'Michael Brown · $1,240.00 · Pending', url: 'invoices/invoices.html' },
  { type: 'Invoice', label: 'INV-000119', sub: 'Sarah Wilson · $620.00 · Overdue', url: 'invoices/invoices.html' },
];

const TYPE_BADGES = {
  'Product': 'badge badge-success',
  'Customer': 'badge badge-info',
  'Supplier': 'badge badge-warning',
  'Invoice': 'badge badge-purple',
};

function initSearch() {
  setTimeout(() => {
    const input = document.getElementById('global-search-input');
    const dropdown = document.getElementById('global-search-dropdown');
    if (!input || !dropdown) return;

    input.addEventListener('input', function() {
      const q = this.value.trim().toLowerCase();
      if (q.length < 1) { dropdown.style.display = 'none'; return; }

      const results = SEARCH_DATA.filter(d =>
        d.label.toLowerCase().includes(q) || d.sub.toLowerCase().includes(q) || d.type.toLowerCase().includes(q)
      );

      if (results.length === 0) {
        dropdown.innerHTML = `<div style="padding:20px;text-align:center;color:var(--muted);font-size:13px;">No results found for "<strong>${q}</strong>"</div>`;
        dropdown.style.display = 'block';
        return;
      }

      // Group by type
      const grouped = {};
      results.forEach(r => { (grouped[r.type] = grouped[r.type] || []).push(r); });

      let html = '';
      Object.entries(grouped).forEach(([type, items]) => {
        html += `<div class="search-group-label">${type}s</div>`;
        items.forEach(item => {
          const badgeClass = TYPE_BADGES[type] || 'badge badge-gray';
          html += `
            <div class="search-result-item" onclick="window.location.href='${BASE_PATH}${item.url}'">
              <span class="${badgeClass}" style="font-size:11px;">${type}</span>
              <div style="flex:1;min-width:0;">
                <div style="font-size:13px;font-weight:600;color:var(--text);">${item.label}</div>
                <div style="font-size:11px;color:var(--muted);">${item.sub}</div>
              </div>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color:var(--muted);flex-shrink:0;"><polyline points="9 18 15 12 9 6"/></svg>
            </div>
          `;
        });
      });

      dropdown.innerHTML = html;
      dropdown.style.display = 'block';
    });

    document.addEventListener('click', (e) => {
      if (!e.target.closest('#global-search-box')) dropdown.style.display = 'none';
    });

    input.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') dropdown.style.display = 'none';
    });
  }, 150);
}

/* ============================================
   Toast System
   ============================================ */
const Toast = {
  container: null,

  init() {
    this.container = document.getElementById('toast-container');
    if (!this.container) {
      this.container = document.createElement('div');
      this.container.id = 'toast-container';
      this.container.style.cssText = 'position:fixed;bottom:20px;right:20px;z-index:200;display:flex;flex-direction:column;gap:10px;';
      document.body.appendChild(this.container);
    }
  },

  show(message, type = 'success', title = '', duration = 4000) {
    if (!this.container) this.init();

    const icons = {
      success: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>',
      error:   '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>',
      warning: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>',
      info:    '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>',
    };

    const defaultTitles = { success: 'Success', error: 'Error', warning: 'Warning', info: 'Information' };

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
      <div class="toast-icon">${icons[type] || icons.info}</div>
      <div style="flex:1;min-width:0;">
        <div style="font-size:13px;font-weight:600;color:var(--text);">${title || defaultTitles[type]}</div>
        <div style="font-size:12px;color:var(--muted);margin-top:2px;">${message}</div>
      </div>
      <button class="toast-close" onclick="this.parentElement.remove()">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
      </button>
    `;

    this.container.appendChild(toast);

    setTimeout(() => {
      toast.classList.add('removing');
      setTimeout(() => toast.remove(), 350);
    }, duration);

    return toast;
  },

  success(msg, title) { return this.show(msg, 'success', title); },
  error(msg, title)   { return this.show(msg, 'error', title); },
  warning(msg, title) { return this.show(msg, 'warning', title); },
  info(msg, title)    { return this.show(msg, 'info', title); },
};

/* ============================================
   Modal System
   ============================================ */
const Modal = {
  show(options = {}) {
    const { title = '', body = '', size = '', footer = null, onClose } = options;

    const backdrop = document.createElement('div');
    backdrop.className = 'modal-backdrop';
    backdrop.innerHTML = `
      <div class="modal-box ${size ? 'modal-' + size : ''}">
        <div class="modal-header">
          <h3 style="font-size:17px;font-weight:700;color:var(--text);">${title}</h3>
          <button class="btn btn-ghost btn-icon modal-close-btn" style="padding:6px;">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>
        <div class="modal-body">${body}</div>
        ${footer ? `<div class="modal-footer">${footer}</div>` : ''}
      </div>
    `;

    const closeModal = () => {
      backdrop.style.opacity = '0';
      setTimeout(() => { backdrop.remove(); onClose && onClose(); }, 150);
    };

    backdrop.addEventListener('click', (e) => { if (e.target === backdrop) closeModal(); });
    backdrop.querySelector('.modal-close-btn').addEventListener('click', closeModal);

    document.body.appendChild(backdrop);
    return { close: closeModal, el: backdrop };
  },

  confirm(options = {}) {
    const { title = 'Confirm Action', message = 'Are you sure?', confirmText = 'Confirm', cancelText = 'Cancel', type = 'danger', onConfirm, onCancel } = options;

    const icons = {
      danger:  '<div style="width:52px;height:52px;border-radius:50%;background:#FEE2E2;display:flex;align-items:center;justify-content:center;margin:0 auto 16px;"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#DC2626" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg></div>',
      warning: '<div style="width:52px;height:52px;border-radius:50%;background:#FEF3C7;display:flex;align-items:center;justify-content:center;margin:0 auto 16px;"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#D97706" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg></div>',
    };

    const btnClass = type === 'danger' ? 'btn-danger' : 'btn-warning';

    const modal = this.show({
      size: 'sm',
      title,
      body: `
        <div style="text-align:center;">
          ${icons[type] || icons.danger}
          <p style="font-size:14px;color:var(--muted);line-height:1.6;">${message}</p>
        </div>
      `,
      footer: `
        <button class="btn btn-secondary" id="modal-cancel-btn">${cancelText}</button>
        <button class="btn ${btnClass}" id="modal-confirm-btn">${confirmText}</button>
      `,
    });

    modal.el.querySelector('#modal-cancel-btn').addEventListener('click', () => {
      modal.close();
      onCancel && onCancel();
    });

    modal.el.querySelector('#modal-confirm-btn').addEventListener('click', () => {
      modal.close();
      onConfirm && onConfirm();
    });

    return modal;
  },
};

/* ============================================
   Action Dropdowns (table rows)
   ============================================ */
function initActionDropdowns() {
  document.querySelectorAll('.action-dropdown-wrapper').forEach(wrapper => {
    const btn = wrapper.querySelector('.action-btn');
    const menu = wrapper.querySelector('.action-dropdown-menu');
    if (!btn || !menu) return;

    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      document.querySelectorAll('.action-dropdown-menu').forEach(m => {
        if (m !== menu) m.style.display = 'none';
      });
      menu.style.display = menu.style.display === 'none' ? 'block' : 'none';
    });
  });
}

/* ============================================
   Tabs
   ============================================ */
function initTabs(containerSelector) {
  const containers = document.querySelectorAll(containerSelector || '.tabs-wrapper');
  containers.forEach(container => {
    const btns = container.querySelectorAll('.tab-btn');
    const panels = container.querySelectorAll('.tab-panel');

    btns.forEach(btn => {
      btn.addEventListener('click', () => {
        const target = btn.dataset.tab;
        btns.forEach(b => b.classList.remove('active'));
        panels.forEach(p => p.classList.remove('active'));
        btn.classList.add('active');
        const panel = container.querySelector(`#tab-${target}`);
        panel && panel.classList.add('active');
      });
    });
  });
}

/* ============================================
   Init on DOM Ready
   ============================================ */
document.addEventListener('DOMContentLoaded', () => {
  initLayout();
  Toast.init();
  setTimeout(() => {
    initActionDropdowns();
    initTabs();
  }, 200);
});

// Export globals
window.Toast = Toast;
window.Modal = Modal;
window.initActionDropdowns = initActionDropdowns;
window.initTabs = initTabs;
window.closeMobileSidebar = closeMobileSidebar;
