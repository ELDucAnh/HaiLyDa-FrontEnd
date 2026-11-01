import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import StatCard from "../../components/common/StatCard";
import KpiIcon from "../shared/KpiIcon";
import Badge from "../../components/common/Badge";
import DataTable from "../../components/common/DataTable";
import Modal from "../../components/common/Modal";
interface StoreStock { id: string; code: string; name: string; unit: string; stock: number; reserved: number; locked: number; minimum: number; perCup: number; expiry: string; status: "ok" | "low" | "expiring" | "locked"; }
const BRANCHES = ["CN01 · Bến Nghé", "CN05 · Hàng Xanh", "CN06 · Làng Đại Học"];
const DATA: Record<string, StoreStock[]> = {
    "CN01 · Bến Nghé": [
        { id: "1", code: "NL-001", name: "Cốt hồng trà đặc", unit: "lít", stock: 18, reserved: 2, locked: 0, minimum: 5, perCup: 0.1, expiry: "20/04/2027", status: "ok" },
        { id: "2", code: "NL-002", name: "Bột kem béo sữa", unit: "kg", stock: 7, reserved: 1, locked: 0, minimum: 3, perCup: 0.03, expiry: "15/03/2027", status: "ok" },
        { id: "3", code: "NL-003", name: "Trân châu đen", unit: "kg", stock: 2, reserved: 0.5, locked: 0, minimum: 4, perCup: 0.02, expiry: "31/10/2026", status: "low" },
        { id: "4", code: "NL-004", name: "Sữa tươi thanh trùng", unit: "lít", stock: 10, reserved: 3, locked: 0, minimum: 8, perCup: 0.1, expiry: "02/11/2026", status: "expiring" },
        { id: "5", code: "NL-005", name: "Ly nhựa 500 ml", unit: "cái", stock: 600, reserved: 80, locked: 0, minimum: 300, perCup: 1, expiry: "Không áp dụng", status: "ok" },
        { id: "6", code: "NL-006", name: "Syrup đào", unit: "chai", stock: 4, reserved: 1, locked: 4, minimum: 2, perCup: 0.01, expiry: "27/01/2027", status: "locked" },
    ],
    "CN05 · Hàng Xanh": [
        { id: "1", code: "NL-001", name: "Cốt hồng trà đặc", unit: "lít", stock: 12, reserved: 1, locked: 0, minimum: 5, perCup: 0.1, expiry: "20/04/2027", status: "ok" },
        { id: "2", code: "NL-002", name: "Bột kem béo sữa", unit: "kg", stock: 3, reserved: 0.5, locked: 0, minimum: 4, perCup: 0.03, expiry: "15/03/2027", status: "low" },
        { id: "3", code: "NL-003", name: "Trân châu đen", unit: "kg", stock: 2, reserved: 0.5, locked: 0, minimum: 4, perCup: 0.02, expiry: "31/10/2026", status: "low" },
        { id: "4", code: "NL-004", name: "Sữa tươi thanh trùng", unit: "lít", stock: 10, reserved: 3, locked: 0, minimum: 8, perCup: 0.1, expiry: "02/11/2026", status: "expiring" },
    ],
    "CN06 · Làng Đại Học": [
        { id: "1", code: "NL-001", name: "Cốt hồng trà đặc", unit: "lít", stock: 8, reserved: 1, locked: 0, minimum: 5, perCup: 0.1, expiry: "20/04/2027", status: "ok" },
        { id: "2", code: "NL-002", name: "Bột kem béo sữa", unit: "kg", stock: 1, reserved: 0, locked: 0, minimum: 3, perCup: 0.03, expiry: "15/03/2027", status: "low" },
        { id: "3", code: "NL-006", name: "Syrup đào", unit: "chai", stock: 4, reserved: 1, locked: 4, minimum: 2, perCup: 0.01, expiry: "27/01/2027", status: "locked" },
    ],
};
const LABEL = { ok: "Đủ tồn", low: "Dưới tồn an toàn", expiring: "Cận hạn", locked: "Đang khóa" };
const VARIANT = { ok: "success", low: "warning", expiring: "warning", locked: "danger" } as const;
export default function StoreIngredientsPage() {
    const navigate = useNavigate(); const [branch, setBranch] = useState(BRANCHES[0]); const [status, setStatus] = useState("all"); const [search, setSearch] = useState(""); const [applied, setApplied] = useState({ status: "all", search: "" }); const [selected, setSelected] = useState<StoreStock | null>(null); const stocks = DATA[branch] ?? []; const rows = useMemo(() => stocks.filter(s => (!applied.search || s.code.toLowerCase().includes(applied.search.toLowerCase()) || s.name.toLowerCase().includes(applied.search.toLowerCase())) && (applied.status === "all" || s.status === applied.status)), [stocks, applied]); const available = (s: StoreStock) => Math.max(0, s.stock - s.reserved - s.locked); const estimate = stocks.reduce((min, s) => s.perCup > 0 ? Math.min(min, Math.floor(available(s) / s.perCup)) : min, Number.POSITIVE_INFINITY); const lowCount = stocks.filter(s => s.status === "low").length; const reservedTotal = stocks.reduce((sum, s) => sum + s.reserved, 0);
    return (
        <div>
            <div className="page-header">
                <div>
                    <nav className="breadcrumb" aria-label="Đường dẫn trang">
                        <Link to="/dashboard">Trang chủ</Link>
                        <span className="sep">/</span>
                        <Link to="/stores">Cửa hàng chi nhánh</Link>
                        <span className="sep">/</span>
                        <span className="current">Nguyên liệu tại quán</span>
                    </nav>
                    <h1 className="page-title">Nguyên liệu tại quầy</h1>
                    <p className="page-subtitle mt-1">Theo dõi tồn thực tế, lượng giữ cho đơn, tồn khóa, tồn khả dụng và số ly ước tính.</p>
                </div>
                <span className="text-xs text-[var(--muted)]">Dữ liệu minh họa</span>
            </div>

            <section className="mb-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
                    <StatCard label="Nguyên liệu tại quầy" value={String(stocks.length === 6 ? 24 : stocks.length)} subLabel="Dữ liệu cửa hàng đang chọn" tone="primary" icon={<KpiIcon kind="cup" />} />
                    <StatCard label="Dưới tồn an toàn" value={String(lowCount)} subLabel="Cần bổ sung" tone="warning" icon={<KpiIcon kind="warning" />} />
                    <StatCard label="Đang giữ cho đơn" value={`${reservedTotal.toLocaleString("vi-VN")} đơn vị`} subLabel="Không tính là tồn khả dụng" tone="info" icon={<KpiIcon kind="box" />} />
                    <StatCard label="Ước tính ly có thể pha" value={Number.isFinite(estimate) ? estimate.toLocaleString("vi-VN") : "—"} subLabel="Theo định mức hiện hành" tone="info" icon={<KpiIcon kind="cup" />} />
                </div>
            </section>

            <section className="card mb-6 border-l-4 border-[var(--info)]">
                <h2 className="text-sm font-bold mb-1">Cách hiểu số tồn</h2>
                <p className="text-sm text-[var(--muted)]">Tồn khả dụng = tồn thực tế − lượng giữ cho đơn − lượng đang khóa. Số ly có thể pha là ước tính dựa trên nguyên liệu giới hạn; chưa tính các tùy chọn topping bổ sung.</p>
            </section>

            <section className="card mb-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                    <div>
                        <label className="form-label" htmlFor="store-branch">Chi nhánh</label>
                        <select id="store-branch" className="form-input form-select" value={branch} onChange={e => { setBranch(e.target.value); setApplied({ status: "all", search: "" }); setStatus("all"); setSearch(""); }}>{BRANCHES.map(b => <option key={b}>{b}</option>)}</select>
                    </div>
                    <div>
                        <label className="form-label" htmlFor="store-search">Tìm nguyên liệu</label>
                        <input id="store-search" className="form-input" value={search} onChange={e => setSearch(e.target.value)} placeholder="Mã hoặc tên nguyên liệu..." />
                    </div>
                    <div>
                        <label className="form-label" htmlFor="store-status">Trạng thái tồn</label>
                        <select id="store-status" className="form-input form-select" value={status} onChange={e => setStatus(e.target.value)}>
                            <option value="all">Tất cả</option>
                            <option value="low">Dưới tồn an toàn</option>
                            <option value="expiring">Cận hạn</option>
                            <option value="locked">Đang khóa</option>
                            <option value="ok">Đủ tồn</option>
                        </select>
                        <div className="flex gap-2 mt-2">
                            <button className="btn btn-secondary" onClick={() => { setSearch(""); setStatus("all"); setApplied({ search: "", status: "all" }); }}>Xóa lọc</button>
                            <button className="btn btn-primary" onClick={() => setApplied({ search, status })}>Áp dụng</button>
                        </div>
                    </div>
                </div>
            </section>

            <section className="card p-0 overflow-hidden">
                <div className="p-4 md:p-5 border-b border-[var(--border)]">
                    <h2 className="font-bold">Tồn nguyên liệu tại quầy</h2>
                    <p className="text-sm text-[var(--muted)] mt-1">Dùng để theo dõi khả năng pha chế tại cửa hàng được chọn.</p>
                </div>
                <DataTable>
                    <table className="w-full min-w-[1100px] text-sm text-left">
                        <thead className="bg-[var(--background)] text-[var(--muted)]">
                            <tr>
                                {["Mã NL", "Nguyên liệu", "Đơn vị", "Tồn thực tế", "Giữ cho đơn", "Tồn khóa", "Khả dụng", "Tồn an toàn", "Ước tính ly", "Trạng thái"].map(x => <th key={x} className="px-3 py-3 font-semibold">{x}</th>)}
                            </tr>
                        </thead>
                        <tbody>
                            {rows.map(s => <tr key={s.id} className="border-t border-[var(--border)]">
                                <td className="px-3 py-3 font-semibold">{s.code}</td>
                                <td className="px-3 py-3"><button className="text-left text-[var(--primary)]" onClick={() => setSelected(s)}>{s.name}</button></td>
                                <td className="px-3 py-3">{s.unit}</td>
                                <td className="px-3 py-3">{s.stock}</td>
                                <td className="px-3 py-3">{s.reserved}</td>
                                <td className="px-3 py-3">{s.locked}</td>
                                <td className="px-3 py-3 font-semibold">{available(s)}</td>
                                <td className="px-3 py-3">{s.minimum}</td>
                                <td className="px-3 py-3">{s.perCup > 0 ? Math.floor(available(s) / s.perCup) : "—"}</td>
                                <td className="px-3 py-3"><Badge variant={VARIANT[s.status]}>{LABEL[s.status]}</Badge></td>
                            </tr>)}
                        </tbody>
                    </table>
                </DataTable>
            </section>

            <Modal isOpen={!!selected} title="Chi tiết tồn nguyên liệu tại quầy" onClose={() => setSelected(null)}>
                {selected && (
                    <div className="space-y-3 text-sm">
                        <p className="font-semibold">{selected.code} · {selected.name}</p>
                        <p>Chi nhánh: {branch}</p>
                        <p>Tồn thực tế: {selected.stock} {selected.unit}</p>
                        <p>Giữ cho đơn: {selected.reserved} {selected.unit}</p>
                        <p>Tồn khóa: {selected.locked} {selected.unit}</p>
                        <p>Tồn khả dụng: {available(selected)} {selected.unit}</p>
                        <p>Tồn an toàn: {selected.minimum} {selected.unit}</p>
                        <p>Hạn lô minh họa: {selected.expiry}</p>
                        <p className="text-[var(--muted)]">Tồn khả dụng không bao gồm lượng giữ cho đơn hoặc lượng đang khóa; khi xuất nguyên liệu cần tuân theo FEFO.</p>
                        <div className="flex justify-end">
                            <button className="btn btn-primary" onClick={() => setSelected(null)}>Đóng</button>
                        </div>
                    </div>
                )}
            </Modal>
        </div>
    );
}
