import { useState } from "react";
import type { FormEvent } from "react";
import Badge from "../../components/common/Badge";
import DataTable from "../../components/common/DataTable";
import type { DataTableColumn } from "../../components/common/DataTable";
import Modal from "../../components/common/Modal";
import { useToast } from "../../components/common/useToast";
import { SalesPageHeader, initialSalesOrders, formatCurrency, formatDateTime } from "./sales-support";

interface ReturnRequest {
 id: string; orderId: string; customer: string; createdAt: string;
 resolution: string; reason: string; amount: number; points: number | null;
 approver: string; status: "pending" | "approved" | "rejected"; note: string;
}
const statuses = { pending: "Chờ duyệt", approved: "Đã duyệt", rejected: "Từ chối" };
const reasons = ["Hỏng vị / chất lượng không đạt", "Nhầm món hoặc cỡ ly", "Sai mức đường / đá", "Thiếu món thêm", "Khách yêu cầu hủy trước pha"];
const initialRows: ReturnRequest[] = [{ id: "HT-0001", orderId: "DH-00125", customer: "Nguyễn An", createdAt: "2026-10-28T09:30:00+07:00", resolution: "Hoàn tiền", reason: "Sai mức đường", amount: 45000, points: -45, approver: "Chưa duyệt", status: "pending", note: "" }];
const emptyForm = { orderId: "", reason: reasons[0], resolution: "Đổi món", amount: "", note: "" };
export default function SalesReturnsPage() {
 const toast = useToast();
 const [rows, setRows] = useState(initialRows);
 const [open, setOpen] = useState(false);
 const [form, setForm] = useState(emptyForm);
 const [query, setQuery] = useState("");
 const [status, setStatus] = useState("");
 const [history, setHistory] = useState([{ id: "initial", time: "2026-10-28T09:30:00+07:00", actor: "Thu ngân CN01", content: "Tạo yêu cầu hoàn 45.000 ₫ vì sai mức đường." }]);
 function submit(event: FormEvent<HTMLFormElement>) {
  event.preventDefault();
  const order = initialSalesOrders.find(o => o.id === form.orderId);
  const amount = form.resolution === "Hoàn tiền" ? Number(form.amount) : 0;
  if (!order) { toast.warning("Vui lòng chọn đơn gốc."); return; }
  const reserved = rows.filter(r => r.orderId === order.id && r.status !== "rejected").reduce((sum, r) => sum + r.amount, 0);
  if (!Number.isSafeInteger(amount) || amount < 0 || (form.resolution === "Hoàn tiền" && amount === 0) || amount + reserved > order.total) {
   toast.warning("Số tiền không hợp lệ hoặc vượt phần giá trị đơn còn có thể hoàn."); return;
  }
  if (form.resolution === "Hủy trước pha" && order.preparation !== "waiting") {
   toast.warning("Chỉ hủy trước pha khi đơn đang chờ pha chế."); return;
  }
  const now = new Date().toISOString();
  const id = `HT-${crypto.randomUUID().slice(0, 8).toUpperCase()}`;
  setRows(current => [...current, { id, orderId: order.id, customer: order.customer, createdAt: now, resolution: form.resolution, reason: form.reason, amount, points: null, approver: "Chưa duyệt", status: "pending", note: form.note.trim() }]);
  setHistory(current => [...current, { id, time: now, actor: "Phiên dùng thử", content: `Tạo ${id} · ${form.resolution} · ${formatCurrency(amount)} · ${form.reason}` }]);
  setOpen(false); setForm(emptyForm);
  toast.info("Đã thêm yêu cầu vào danh sách dùng thử. Chưa hoàn tiền hoặc điều chỉnh điểm.");
 }
 const columns: DataTableColumn<ReturnRequest>[] = [
  { id: "id", header: "Mã yêu cầu", render: r => r.id },
  { id: "order", header: "Đơn gốc", render: r => r.orderId },
  { id: "customer", header: "Khách hàng", render: r => r.customer },
  { id: "time", header: "Thời gian", render: r => formatDateTime(r.createdAt) },
  { id: "resolution", header: "Hướng xử lý", render: r => r.resolution },
  { id: "reason", header: "Lý do / Ghi chú", render: r => <>{r.reason}<div>{r.note}</div></> },
  { id: "amount", header: "Số tiền hoàn", render: r => formatCurrency(r.amount) },
  { id: "points", header: "Điểm điều chỉnh", render: r => r.points === null ? "Chờ xác định" : `${r.points} điểm · Dự kiến` },
  { id: "approver", header: "Người duyệt", render: r => r.approver },
  { id: "status", header: "Trạng thái", render: r => <Badge variant={r.status === "pending" ? "warning" : r.status === "approved" ? "success" : "danger"}>{statuses[r.status]}</Badge> },
 ];
 const visible = rows.filter(r => (!status || r.status === status) && `${r.id} ${r.orderId} ${r.customer}`.toLocaleLowerCase("vi-VN").includes(query.trim().toLocaleLowerCase("vi-VN")));
 return <>
  <SalesPageHeader title="Khiếu nại và hoàn tiền" breadcrumb="Trả hàng bán" parent={{ label: "Bán hàng", to: "/sales" }} description="Tạo yêu cầu xử lý và theo dõi lịch sử." actions={<button className="btn btn-primary" onClick={() => { setForm(emptyForm); setOpen(true); }}>Tạo yêu cầu</button>} />
  <p className="mb-4 text-sm text-[var(--muted)]">Dữ liệu dùng thử sẽ mất khi rời trang. Duyệt hoàn tiền và điều chỉnh điểm chưa được kết nối.</p>
  <section className="card mb-6"><div className="flex flex-wrap gap-4"><label className="form-label">Tìm yêu cầu<input className="form-input" value={query} onChange={e => setQuery(e.target.value)} /></label><label className="form-label">Trạng thái<select className="form-input" value={status} onChange={e => setStatus(e.target.value)}><option value="">Tất cả</option>{Object.entries(statuses).map(([key, label]) => <option key={key} value={key}>{label}</option>)}</select></label></div><DataTable columns={columns} data={visible} rowKey={r => r.id} caption="Danh sách khiếu nại và hoàn tiền" /></section>
  <section className="card"><h2 className="card-title mb-4">Lịch sử xử lý</h2><DataTable data={history} rowKey={r => r.id} caption="Lịch sử yêu cầu" columns={[{ id: "time", header: "Thời gian", render: r => formatDateTime(r.time) }, { id: "actor", header: "Người thực hiện", render: r => r.actor }, { id: "content", header: "Nội dung", render: r => r.content }]} /></section>
  <Modal open={open} onClose={() => setOpen(false)} title="Tạo yêu cầu xử lý"><form onSubmit={submit} className="flex flex-col gap-4">
   <label className="form-label">Đơn gốc<select required className="form-input" value={form.orderId} onChange={e => setForm({ ...form, orderId: e.target.value })}><option value="">Chọn đơn hàng</option>{initialSalesOrders.map(o => <option key={o.id} value={o.id}>{o.id} · {o.customer} · {formatCurrency(o.total)}</option>)}</select></label>
   <label className="form-label">Lý do<select className="form-input" value={form.reason} onChange={e => setForm({ ...form, reason: e.target.value })}>{reasons.map(r => <option key={r}>{r}</option>)}</select></label>
   <label className="form-label">Hướng xử lý<select className="form-input" value={form.resolution} onChange={e => setForm({ ...form, resolution: e.target.value, amount: "" })}>{["Đổi món", "Bù mã ưu đãi", "Hoàn tiền", "Hủy trước pha"].map(r => <option key={r}>{r}</option>)}</select></label>
   {form.resolution === "Hoàn tiền" && <label className="form-label">Số tiền đề nghị hoàn (VND)<input required className="form-input" type="number" min="1" step="1" value={form.amount} onChange={e => setForm({ ...form, amount: e.target.value })} /></label>}
   <label className="form-label">Ghi chú<textarea className="form-input" value={form.note} onChange={e => setForm({ ...form, note: e.target.value })} /></label>
   <div className="flex gap-2"><button type="submit" className="btn btn-primary">Lưu yêu cầu dùng thử</button><button type="button" className="btn btn-secondary" onClick={() => setOpen(false)}>Hủy</button></div>
  </form></Modal>
 </>;
}
