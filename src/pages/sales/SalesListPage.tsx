import Modal from "../../components/common/Modal";
import { initialPreparationOrders } from "../../data/sales/preparation";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import StatCard from "../../components/common/StatCard";
import { SalesStatIcon } from "./sales-support";
import Badge from "../../components/common/Badge";
import DataTable from "../../components/common/DataTable";
import type { DataTableColumn } from "../../components/common/DataTable";
import { SalesPageHeader, initialSalesOrders, branches, channelLabels, channelVariants, shiftLabels, paymentStatuses, preparationStatuses, deliveryStatuses, formatCurrency, formatDateTime } from "./sales-support";
import type { SalesOrder } from "./sales-support";

export default function SalesListPage() {
 const [kot, setKot] = useState<SalesOrder | null>(null);
 const [appliedQuery, setAppliedQuery] = useState("");
 const [appliedFilters, setAppliedFilters] = useState<Record<string,string>>({});
 const navigate = useNavigate();
 const [query, setQuery] = useState("");
 const [filters, setFilters] = useState<Record<string, string>>({});
 const groups = [
  { key: "branchId", label: "Chi nhánh", options: branches.map(b => [b.id, b.name]) },
  { key: "shift", label: "Ca", options: Object.entries(shiftLabels) },
  { key: "channel", label: "Kênh bán", options: Object.entries(channelLabels) },
  ...[{ key: "payment", label: "Thanh toán", values: paymentStatuses }, { key: "preparation", label: "Pha chế", values: preparationStatuses }, { key: "delivery", label: "Giao nhận", values: deliveryStatuses }].map(g => ({ key: g.key, label: g.label, options: Object.entries(g.values).map(([key, value]) => [key, value.label]) })),
 ];
 const rows = initialSalesOrders.filter(row => `${row.id} ${row.customer} ${row.phone}`.toLocaleLowerCase("vi-VN").includes(appliedQuery.trim().toLocaleLowerCase("vi-VN")) && groups.every(g => !appliedFilters[g.key] || row[g.key as keyof SalesOrder] === appliedFilters[g.key]));
 const columns: DataTableColumn<SalesOrder>[] = [
  { id: "id", header: "Mã đơn", render: r => <>{r.id}{r.largeOrder && <Badge variant="warning">Đơn lớn</Badge>}</> },
  { id: "branch", header: "Chi nhánh / Ca", render: r => `${r.branchId} · ${shiftLabels[r.shift]}` },
  { id: "customer", header: "Khách hàng", render: r => <>{r.customer}<div>{r.phone}</div></> },
  { id: "channel", header: "Kênh bán", render: r => <Badge variant={channelVariants[r.channel]}>{channelLabels[r.channel]}</Badge> },
  { id: "time", header: "Thời gian", render: r => formatDateTime(r.createdAt) },
  { id: "total", header: "Tổng tiền", render: r => formatCurrency(r.total) },
  { id: "payment", header: "Thanh toán", render: r => <Badge variant={paymentStatuses[r.payment].variant}>{paymentStatuses[r.payment].label}</Badge> },
  { id: "preparation", header: "Pha chế", render: r => r.preparation ? <Badge variant={preparationStatuses[r.preparation].variant}>{preparationStatuses[r.preparation].label}</Badge> : "—" },
  { id: "delivery", header: "Giao nhận", render: r => r.delivery ? <Badge variant={deliveryStatuses[r.delivery].variant}>{deliveryStatuses[r.delivery].label}</Badge> : "—" },
  { id: "action", header: "Thao tác", render: r => <button className="btn btn-secondary btn-sm" onClick={() => setKot(r)}>Xem KOT</button> },
 ];
 return <>
  <SalesPageHeader title="Quản lý đơn hàng đa kênh" breadcrumb="Tất cả đơn bán" parent={{ label: "Bán hàng", to: "/sales" }} description="Tra cứu đơn tại quầy, mang đi và trực tuyến." actions={<button className="btn btn-primary" onClick={() => navigate("/sales/pos")}>Tạo đơn mới</button>} />
  <section aria-label="Thống kê mẫu" className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
   <StatCard label="Tổng đơn hàng" value="786" icon={<SalesStatIcon />} subLabel="+8,2% so với tháng trước" />
   <StatCard label="Doanh thu" value={formatCurrency(67347)} icon={<SalesStatIcon />} tone="info" subLabel="+12,5% so với tháng trước" />
   <StatCard label="Lợi nhuận ròng" value={formatCurrency(18420)} icon={<SalesStatIcon />} subLabel="27,3% biên lợi nhuận ròng" />
   <StatCard label="Chưa thanh toán" value={formatCurrency(1860)} icon={<SalesStatIcon />} tone="warning" subLabel="4 khoản chờ thu" />
  </section>
  <p className="mb-4 text-sm text-[var(--muted)]">Thống kê giữ nguyên snapshot HTML, chưa được tính từ bảng hoặc bộ lọc bên dưới.</p>
  <section className="card mb-6"><div className="grid grid-cols-1 md:grid-cols-3 gap-4">
   <label className="form-label">Tìm mã đơn, tên, điện thoại<input className="form-input" value={query} onChange={e => setQuery(e.target.value)} /></label>
   {groups.map(g => <label key={g.key} className="form-label">{g.label}<select className="form-input" value={filters[g.key] ?? ""} onChange={e => setFilters(current => ({ ...current, [g.key]: e.target.value }))}><option value="">Tất cả</option>{g.options.map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select></label>)}
  </div><button className="btn btn-primary mt-4 mr-2" onClick={() => { setAppliedQuery(query); setAppliedFilters({...filters}); }}>Áp dụng bộ lọc</button><button className="btn btn-secondary mt-4" onClick={() => { setQuery(""); setFilters({}); setAppliedQuery(""); setAppliedFilters({}); }}>Xóa bộ lọc</button></section>
  <p className="mb-4">{rows.length} đơn mẫu · Tổng giá trị {formatCurrency(rows.reduce((sum, row) => sum + row.total, 0))}</p>
  <section className="card"><DataTable columns={columns} data={rows} rowKey={r => r.id} caption="Danh sách đơn hàng mẫu từ template" /></section>
 <Modal open={kot !== null} onClose={() => setKot(null)} title={`Phiếu pha chế (KOT) · ${kot?.id ?? ""}`}><p>{kot?.branchId} · {kot?.customer}</p>{initialPreparationOrders.filter(o => o.id === kot?.id).map(o => <div key={o.id}><p>{o.itemSummary}</p><p>{o.optionSummary}</p><p>Ghi chú: {o.note}</p></div>)}</Modal>
 </>;
}
