import { useState } from "react";
import { Link } from "react-router-dom";
import avatar from "../../../assets/img/avator/1.jpg";
import { navigationItems } from "../../routes/navigation";
export interface HeaderProps { mobileOpen: boolean; isDark: boolean; onToggleSidebar: () => void; onToggleTheme: () => void; }
export default function Header({mobileOpen,isDark,onToggleSidebar,onToggleTheme}: HeaderProps) {
 const [notifications,setNotifications] = useState(false);
 const [userOpen,setUserOpen] = useState(false);
 const [query,setQuery] = useState("");
 return <header id="app-header" data-theme={isDark ? "dark" : "light"}>
<button onClick={onToggleSidebar} aria-expanded={mobileOpen} id="sidebar-toggle-btn" className="p-2 rounded-lg hover:bg-[var(--background)] transition-colors" style={{"color": "var(--muted)", "border": "none", "background": "none", "cursor": "pointer", "flexShrink": "0"}} aria-label="Mở hoặc đóng thanh điều hướng">
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
</button>


<div className="flex-1 max-w-md relative search-box" id="global-search-box">
  <svg className="search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
  <input aria-label="Tìm kiếm toàn hệ thống" onChange={e => setQuery(e.target.value)} value={query} id="global-search-input" type="text" placeholder="Tìm kiếm món, hội viên, hóa đơn, nguyên liệu..."
    className="form-input" style={{"height": "40px", "fontSize": "13px", "background": "var(--background)"}}
    autoComplete="off" />
  {query && <div className="global-search-dropdown" style={{display:"block"}}>{navigationItems.filter(item => item.label.toLocaleLowerCase("vi-VN").includes(query.toLocaleLowerCase("vi-VN"))).map(item => <Link key={item.path} className="dropdown-item" to={item.path} onClick={() => setQuery("")}>{item.label}</Link>)}</div>}
</div>

<div className="flex items-center gap-2 ml-auto">
  
  <button onClick={onToggleTheme} id="dark-mode-btn" className="p-2 rounded-lg hover:bg-[var(--background)] transition-colors" style={{"color": "var(--muted)", "border": "none", "background": "none", "cursor": "pointer"}} aria-label="Chuyển chế độ sáng hoặc tối">
    <svg id="dark-mode-icon-moon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
    <svg id="dark-mode-icon-sun" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{"display": "none"}}><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
  </button>

  
  <div className="relative" id="notification-dropdown-wrapper">
    <button onClick={() => setNotifications(v => !v)} id="notification-btn" className="p-2 rounded-lg hover:bg-[var(--background)] transition-colors relative" style={{"color": "var(--muted)", "border": "none", "background": "none", "cursor": "pointer"}} aria-label="Thông báo">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
      <span className="absolute top-1 right-1 w-2 h-2 rounded-full" style={{"background": "#EF4444"}}></span>
    </button>
    <div id="notification-dropdown" className="dropdown-menu" style={{ display: notifications ? "block" : "none", right: 0, width: "min(340px, 90vw)", maxHeight: 440 }}>
      <div style={{"padding": "14px 16px", "borderBottom": "1px solid var(--border)", "display": "flex", "alignItems": "center", "justifyContent": "space-between"}}>
        <span style={{"fontSize": "15px", "fontWeight": "600", "color": "var(--text)"}}>Notifications</span>
        <span className="badge badge-danger">4 New</span>
      </div>
      <div style={{"overflowY": "auto", "maxHeight": "320px"}}>
        <div className="notification-item unread">
          <div className="stat-icon icon-bg-warning flex-shrink-0" style={{"width": "36px", "height": "36px", "borderRadius": "10px"}}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
          </div>
          <div style={{"flex": "1", "minWidth": "0"}}>
            <div style={{"fontSize": "13px", "fontWeight": "600", "color": "var(--text)"}}>Cảnh Báo Tồn Kho Thấp</div>
            <div style={{"fontSize": "12px", "color": "var(--muted)", "marginTop": "2px"}}>Trà Sữa Oolong Nướng chỉ còn lại 3 ly tại CN05.</div>
            <div style={{"fontSize": "11px", "color": "var(--muted)", "marginTop": "4px"}}>5 phút trước</div>
          </div>
        </div>
        <div className="notification-item unread">
          <div className="stat-icon icon-bg-success flex-shrink-0" style={{"width": "36px", "height": "36px", "borderRadius": "10px"}}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
          </div>
          <div style={{"flex": "1", "minWidth": "0"}}>
            <div style={{"fontSize": "13px", "fontWeight": "600", "color": "var(--text)"}}>Đơn Hàng Mới</div>
            <div style={{"fontSize": "12px", "color": "var(--muted)", "marginTop": "2px"}}>HD-CN01-003815 vừa lập thành công: 285.000 ₫.</div>
            <div style={{"fontSize": "11px", "color": "var(--muted)", "marginTop": "4px"}}>18 phút trước</div>
          </div>
        </div>
        <div className="notification-item unread">
          <div className="stat-icon icon-bg-info flex-shrink-0" style={{"width": "36px", "height": "36px", "borderRadius": "10px"}}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>
          </div>
          <div style={{"flex": "1", "minWidth": "0"}}>
            <div style={{"fontSize": "13px", "fontWeight": "600", "color": "var(--text)"}}>Thanh Toán Thành Công</div>
            <div style={{"fontSize": "12px", "color": "var(--muted)", "marginTop": "2px"}}>Đã nhận 450.000 ₫ qua Chuyển khoản QR.</div>
            <div style={{"fontSize": "11px", "color": "var(--muted)", "marginTop": "4px"}}>1 giờ trước</div>
          </div>
        </div>
        <div className="notification-item unread">
          <div className="stat-icon icon-bg-danger flex-shrink-0" style={{"width": "36px", "height": "36px", "borderRadius": "10px"}}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
          </div>
          <div style={{"flex": "1", "minWidth": "0"}}>
            <div style={{"fontSize": "13px", "fontWeight": "600", "color": "var(--text)"}}>Phiếu Chờ Phê Duyệt</div>
            <div style={{"fontSize": "12px", "color": "var(--muted)", "marginTop": "2px"}}>PNK-202610-008 chờ thủ kho xác nhận nhập.</div>
            <div style={{"fontSize": "11px", "color": "var(--muted)", "marginTop": "4px"}}>2 giờ trước</div>
          </div>
        </div>
        <div className="notification-item">
          <div className="stat-icon icon-bg-primary flex-shrink-0" style={{"width": "36px", "height": "36px", "borderRadius": "10px"}}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>
          </div>
          <div style={{"flex": "1", "minWidth": "0"}}>
            <div style={{"fontSize": "13px", "fontWeight": "600", "color": "var(--text)"}}>Điều Chuyển Nguyên Liệu</div>
            <div style={{"fontSize": "12px", "color": "var(--muted)", "marginTop": "2px"}}>Đã chuyển 20kg Trân Châu sang Chi nhánh Q.10.</div>
            <div style={{"fontSize": "11px", "color": "var(--muted)", "marginTop": "4px"}}>Hôm qua</div>
          </div>
        </div>
      </div>
      <div style={{"padding": "12px 16px", "borderTop": "1px solid var(--border)", "textAlign": "center"}}>
        <a href="#" style={{"fontSize": "13px", "color": "var(--primary)", "fontWeight": "500", "textDecoration": "none"}}>Xem tất cả thông báo</a>
      </div>
    </div>
  </div>

  
  <div className="relative" id="user-dropdown-wrapper">
    <button onClick={() => setUserOpen(v => !v)} id="user-menu-btn" className="flex items-center gap-2 px-2 py-1.5 rounded-xl hover:bg-[var(--background)] transition-colors" style={{"border": "none", "background": "none", "cursor": "pointer"}}>
      <img src={avatar} alt="Nguyễn Hoàng Long" className="w-8 h-8 rounded-full flex-shrink-0" style={{"objectFit": "cover"}} />
      <div className="text-left hidden sm:block">
        <div style={{"fontSize": "13px", "fontWeight": "600", "color": "var(--text)", "lineHeight": "1.2"}}>Nguyễn Hoàng Long</div>
        <div style={{"fontSize": "11px", "color": "var(--muted)"}}>Quản trị viên</div>
      </div>
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{"color": "var(--muted)"}}><polyline points="6 9 12 15 18 9"/></svg>
    </button>
    <div id="user-dropdown" className="dropdown-menu" style={{ display: userOpen ? "block" : "none", right: 0, minWidth: 200 }}>
      <div style={{"padding": "12px 16px", "borderBottom": "1px solid var(--border)"}}>
        <div style={{"fontSize": "13px", "fontWeight": "600", "color": "var(--text)"}}>Nguyễn Hoàng Long</div>
        <div style={{"fontSize": "12px", "color": "var(--muted)"}}>long.nh@MilktyWay.vn</div>
      </div>
      <a href="/pages/profile" className="dropdown-item">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
        Hồ sơ cá nhân
      </a>
      <a href="/settings/general" className="dropdown-item">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.07 4.93l-1.41 1.41M5.34 18.66l-1.41 1.41M2 12h2M20 12h2M6.34 5.34L4.93 4.93M19.07 19.07l-1.41-1.41M12 2v2M12 20v2"/></svg>
        Cài đặt hệ thống
      </a>
      <div className="dropdown-divider"></div>
      <a href="/pages/login" className="dropdown-item danger">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
        Đăng xuất
      </a>
    </div>
  </div>
</div>
  </header>;
}
