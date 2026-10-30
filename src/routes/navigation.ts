export interface NavigationItem {
    path: string;
    label: string;
}

export const navigationItems: readonly NavigationItem[] = [
    { path: "/dashboard", label: "Bảng điều khiển" },
    { path: "/sales/pos", label: "Bán hàng tại quầy" },
    { path: "/sales", label: "Quản lý đơn hàng" },
    { path: "/sales/returns", label: "Khiếu nại và hoàn tiền" },
    { path: "/sales/shifts", label: "Ca làm việc" },
    { path: "/sales/preparation", label: "Hàng đợi pha chế" },
    { path: "/customers", label: "Khách hàng và hội viên" },
    { path: "/marketing/promotions", label: "Khuyến mãi" },
];