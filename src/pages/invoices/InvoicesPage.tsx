import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import StatCard from "../../components/common/StatCard";
import Badge from "../../components/common/Badge";
import type { BadgeVariant } from "../../components/common/Badge";
import { useToast } from "../../components/common/useToast";

export interface InvoiceItem {
  id: string;
  customerName: string;
  customerPhone: string;
  tier: "Member" | "Silver" | "Gold" | "VIP";
  initials: string;
  avatarBg: string;
  branch: string;
  type: "Bán Lẻ" | "Đơn Sỉ B2B" | "Giao Hàng" | "Hoàn Tiền";
  typeVariant: BadgeVariant;
  date: string;
  total: number;
  paid: number;
  status: "Đã Thanh Toán" | "Thanh Toán 50%" | "Chờ Thanh Toán" | "Đã Hoàn Tiền";
  statusVariant: BadgeVariant;
}

const INITIAL_INVOICES: InvoiceItem[] = [
  {
    id: "HD-CN05-001247",
    customerName: "Trần Văn An",
    customerPhone: "0908.123.456",
    tier: "Gold",
    initials: "TA",
    avatarBg: "var(--primary)",
    branch: "CN05 - Hàng Xanh",
    type: "Bán Lẻ",
    typeVariant: "info",
    date: "28/10/2026 14:32",
    total: 89000,
    paid: 89000,
    status: "Đã Thanh Toán",
    statusVariant: "success",
  },
  {
    id: "HD-CN01-003814",
    customerName: "Nguyễn Thị Lan",
    customerPhone: "0912.345.678",
    tier: "Silver",
    initials: "NL",
    avatarBg: "var(--info)",
    branch: "CN01 - Bến Nghé",
    type: "Bán Lẻ",
    typeVariant: "info",
    date: "28/10/2026 11:15",
    total: 125000,
    paid: 125000,
    status: "Đã Thanh Toán",
    statusVariant: "success",
  },
  {
    id: "SI-CN08-000042",
    customerName: "Cty TNHH Tech Valley",
    customerPhone: "0987.654.321",
    tier: "VIP",
    initials: "CT",
    avatarBg: "var(--warning)",
    branch: "CN08 - Cityland",
    type: "Đơn Sỉ B2B",
    typeVariant: "warning",
    date: "27/10/2026 09:00",
    total: 12600000,
    paid: 6300000,
    status: "Thanh Toán 50%",
    statusVariant: "warning",
  },
  {
    id: "RT-CN03-000089",
    customerName: "Phạm Quốc Hùng",
    customerPhone: "0971.234.567",
    tier: "Member",
    initials: "PH",
    avatarBg: "var(--danger)",
    branch: "CN03 - Chợ Lớn",
    type: "Hoàn Tiền",
    typeVariant: "danger",
    date: "26/10/2026 16:45",
    total: 45000,
    paid: -45000,
    status: "Đã Hoàn Tiền",
    statusVariant: "danger",
  },
  {
    id: "HD-CN09-002156",
    customerName: "Lê Thị Hoa",
    customerPhone: "0943.876.543",
    tier: "VIP",
    initials: "LH",
    avatarBg: "var(--success)",
    branch: "CN09 - Phan Xích Long",
    type: "Giao Hàng",
    typeVariant: "success",
    date: "28/10/2026 19:20",
    total: 178000,
    paid: 178000,
    status: "Đã Thanh Toán",
    statusVariant: "success",
  },
];

export default function InvoicesPage() {
  const toast = useToast();
  const navigate = useNavigate();

  const [invoices] = useState<InvoiceItem[]>(INITIAL_INVOICES);
  const [search, setSearch] = useState("");
  const [selectedBranch, setSelectedBranch] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");

  const filteredInvoices = useMemo(() => {
    return invoices.filter((item) => {
      const q = search.toLowerCase();
      const matchSearch =
        !q ||
        item.id.toLowerCase().includes(q) ||
        item.customerName.toLowerCase().includes(q) ||
        item.customerPhone.includes(q);

      const matchBranch = !selectedBranch || item.branch.includes(selectedBranch);
      const matchType = !selectedType || item.type === selectedType;
      const matchStatus = !selectedStatus || item.status === selectedStatus;

      return matchSearch && matchBranch && matchType && matchStatus;
    });
  }, [invoices, search, selectedBranch, selectedType, selectedStatus]);

  return (
    <div className="space-y-6">
      {/* Tiêu đề trang */}
      <div className="page-header">
        <div>
          <nav className="breadcrumb" aria-label="Đường dẫn trang">
            <Link to="/dashboard">Trang chủ</Link>
            <span className="sep">/</span>
            <span className="current">Hóa đơn</span>
          </nav>
          <h1 className="page-title">Hóa Đơn &amp; Chứng Từ</h1>
          <p className="page-subtitle">
            Tra cứu hóa đơn bán lẻ, bán sỉ và chứng từ thanh toán toàn chuỗi.
          </p>
        </div>
        <div className="page-header-actions">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => toast.info("Đang xuất danh sách hóa đơn ra Excel...", { title: "Xuất File" })}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="17 8 12 3 7 8" />
              <line x1="12" y1="3" x2="12" y2="15" />
            </svg>
            Xuất Excel
          </button>
          <Link to="/sales/pos" className="btn btn-primary">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            Tạo Hóa Đơn Mới
          </Link>
        </div>
      </div>

      {/* Thẻ thống kê */}
      <section aria-label="Thống kê hóa đơn">
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
          <StatCard
            label="Tổng Hóa Đơn"
            value="1.485.600.000 đ"
            subLabel="2.847 hóa đơn đã xuất"
            tone="info"
            icon={
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
              </svg>
            }
          />
          <StatCard
            label="Đã Thanh Toán"
            value="1.422.300.000 đ"
            subLabel="95.7% đã thu tiền"
            tone="primary"
            icon={
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
            }
          />
          <StatCard
            label="Đơn Sỉ Chờ Thanh Toán"
            value="47.200.000 đ"
            subLabel="12 hóa đơn B2B chờ thu"
            tone="warning"
            icon={
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
            }
          />
          <StatCard
            label="Đã Hoàn Tiền"
            value="16.100.000 đ"
            subLabel="38 biên lai hoàn trả"
            tone="danger"
            icon={
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
                <line x1="12" y1="9" x2="12" y2="13" />
                <line x1="12" y1="17" x2="12.01" y2="17" />
              </svg>
            }
          />
        </div>
      </section>

      {/* Bộ lọc */}
      <div className="filter-bar mb-5">
        <div className="search-box flex-1 min-w-[200px]">
          <svg className="search-icon" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="text"
            className="form-input h-[38px] text-[13px]"
            placeholder="Tìm mã hóa đơn, tên khách, số điện thoại..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <select
          className="form-input form-select h-[38px] text-[13px] min-w-[140px]"
          aria-label="Lọc theo chi nhánh"
          value={selectedBranch}
          onChange={(e) => setSelectedBranch(e.target.value)}
        >
          <option value="">Toàn Chuỗi</option>
          <option value="CN01">CN01 - Bến Nghé (Q.1)</option>
          <option value="CN02">CN02 - Bàn Cờ (Q.3)</option>
          <option value="CN03">CN03 - Chợ Lớn (Q.5)</option>
          <option value="CN04">CN04 - Tân Hưng (Q.7)</option>
          <option value="CN05">CN05 - Hàng Xanh (Bình Thạnh)</option>
          <option value="CN08">CN08 - Cityland (Gò Vấp)</option>
          <option value="CN09">CN09 - Phan Xích Long (Phú Nhuận)</option>
        </select>
        <select
          className="form-input form-select h-[38px] text-[13px] min-w-[140px]"
          aria-label="Lọc theo loại hóa đơn"
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
        >
          <option value="">Tất Cả Loại</option>
          <option value="Bán Lẻ">Bán Lẻ Tại Quầy</option>
          <option value="Giao Hàng">Giao Hàng Online</option>
          <option value="Đơn Sỉ B2B">Đơn Bán Sỉ (B2B)</option>
          <option value="Hoàn Tiền">Biên Lai Hoàn Tiền</option>
        </select>
        <select
          className="form-input form-select h-[38px] text-[13px] min-w-[140px]"
          aria-label="Lọc theo trạng thái"
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
        >
          <option value="">Tất Cả Trạng Thái</option>
          <option value="Đã Thanh Toán">Đã Thanh Toán</option>
          <option value="Thanh Toán 50%">Thanh Toán 50%</option>
          <option value="Chờ Thanh Toán">Chờ Thanh Toán</option>
          <option value="Đã Hoàn Tiền">Đã Hoàn Tiền</option>
        </select>
      </div>

      {/* Bảng hóa đơn */}
      <section aria-label="Bảng danh sách hóa đơn">
        <div className="card p-0 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Mã Hóa Đơn</th>
                  <th>Khách Hàng</th>
                  <th>Chi Nhánh</th>
                  <th>Loại</th>
                  <th>Ngày Xuất</th>
                  <th>Tổng Tiền</th>
                  <th>Đã Thu</th>
                  <th>Trạng Thái</th>
                  <th>Thao Tác</th>
                </tr>
              </thead>
              <tbody>
                {filteredInvoices.length === 0 ? (
                  <tr>
                    <td colSpan={9} className="text-center py-8 text-[var(--muted)]">
                      Không tìm thấy hóa đơn phù hợp.
                    </td>
                  </tr>
                ) : (
                  filteredInvoices.map((inv) => (
                    <tr key={inv.id}>
                      <td>
                        <Link
                          to={`/invoices/${inv.id}`}
                          className="font-mono font-bold text-[var(--primary)] no-underline hover:underline"
                        >
                          {inv.id}
                        </Link>
                      </td>
                      <td>
                        <div className="flex items-center gap-2">
                          <div
                            className="avatar avatar-sm text-white font-bold flex items-center justify-center rounded-full w-8 h-8 text-xs shrink-0"
                            style={{ background: inv.avatarBg }}
                          >
                            {inv.initials}
                          </div>
                          <div>
                            <span className="text-[13px] font-semibold text-[var(--text)]">
                              {inv.customerName}
                            </span>
                            <div className="text-[11px] text-[var(--muted)]">
                              {inv.customerPhone} · Hạng {inv.tier}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="text-[13px] text-[var(--text)]">{inv.branch}</td>
                      <td>
                        <Badge variant={inv.typeVariant}>{inv.type}</Badge>
                      </td>
                      <td className="text-xs text-[var(--muted)]">{inv.date}</td>
                      <td className="text-[13px] font-bold text-[var(--text)]">
                        {inv.total.toLocaleString("vi-VN")} đ
                      </td>
                      <td className="text-[13px] font-semibold text-[var(--primary)]">
                        {inv.paid.toLocaleString("vi-VN")} đ
                      </td>
                      <td>
                        <Badge variant={inv.statusVariant}>{inv.status}</Badge>
                      </td>
                      <td>
                        <div className="flex gap-1.5">
                          <Link to={`/invoices/${inv.id}`} className="btn btn-secondary btn-sm">
                            Xem
                          </Link>
                          <button
                            type="button"
                            className="btn btn-secondary btn-icon-sm"
                            aria-label="In biên lai"
                            title="In Biên Lai"
                            onClick={() => {
                              navigate(`/invoices/${inv.id}`);
                            }}
                          >
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <polyline points="6 9 6 2 18 2 18 9" />
                              <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
                              <rect x="6" y="14" width="12" height="8" />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          {/* Phân trang */}
          <div className="px-5 py-4 border-t border-[var(--border)] flex items-center justify-between flex-wrap gap-3">
            <div className="text-[13px] text-[var(--muted)]">
              Hiển thị 1–{filteredInvoices.length} trong tổng 2.847 hóa đơn
            </div>
            <div className="flex gap-1.5">
              <button type="button" className="btn btn-secondary btn-sm" disabled>
                ‹ Trước
              </button>
              <button type="button" className="btn btn-primary btn-sm">
                1
              </button>
              <button type="button" className="btn btn-secondary btn-sm">
                2
              </button>
              <button type="button" className="btn btn-secondary btn-sm">
                3
              </button>
              <button type="button" className="btn btn-secondary btn-sm">
                Sau ›
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

