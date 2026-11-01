import { NavLink } from "react-router-dom";

export default function SettingsNavTabs() {
  const tabs = [
    { to: "/settings/general", label: "Thông Tin Chung" },
    { to: "/settings/inventory", label: "Kho & FEFO" },
    { to: "/settings/sales", label: "Bán Hàng & POS" },
    { to: "/settings/purchases", label: "Thu Mua & Chuyển Kho" },
    { to: "/settings/notifications", label: "Cảnh Báo Sự Cố" },
    { to: "/settings/offline-sync", label: "Đồng Bộ & Offline" },
  ];

  return (
    <div className="settings-nav-tabs flex gap-2 border-b border-[var(--border)] pb-3 mb-6 overflow-x-auto">
      {tabs.map((tab) => (
        <NavLink
          key={tab.to}
          to={tab.to}
          className={({ isActive }) =>
            `btn btn-sm whitespace-nowrap ${
              isActive ? "btn-primary" : "btn-secondary"
            }`
          }
        >
          {tab.label}
        </NavLink>
      ))}
    </div>
  );
}

