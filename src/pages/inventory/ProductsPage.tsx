import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import StatCard from "../../components/common/StatCard";
import KpiIcon from "../shared/KpiIcon";
import Badge from "../../components/common/Badge";
import DataTable from "../../components/common/DataTable";
import Modal from "../../components/common/Modal";
import { formatCurrency } from "../shared/formatters";

type Category = "milk-tea" | "fruit-tea" | "macchiato" | "topping";
type ProductStatus = "active" | "branch-locked" | "disabled" | "pending-recipe";
type Variant = "success" | "warning" | "danger" | "info";
interface Product {
  id: string; code: string; name: string; category: Category; size: string;
  priceM: number | null; priceL: number | null; fixedPrice: number | null;
  cogs: number | null; status: ProductStatus; lockedBranches: string[];
  note: string;
}
const CATEGORY_LABEL: Record<Category, string> = {
  "milk-tea": "Trà sữa", "fruit-tea": "Trà trái cây", macchiato: "Macchiato", topping: "Topping",
};
const STATUS_LABEL: Record<ProductStatus, string> = {
  active: "Đang bán", "branch-locked": "Chi nhánh tạm khóa", disabled: "Ngừng bán toàn chuỗi", "pending-recipe": "Chờ duyệt công thức",
};
const STATUS_VARIANT: Record<ProductStatus, Variant> = {
  active: "success", "branch-locked": "warning", disabled: "danger", "pending-recipe": "warning",
};
const INITIAL_PRODUCTS: Product[] = [
  { id: "hd-001", code: "HD-001", name: "Hồng trà sữa trân châu", category: "milk-tea", size: "M / L", priceM: 35000, priceL: 42000, fixedPrice: null, cogs: 18400, status: "active", lockedBranches: [], note: "Món thuộc menu lõi toàn chuỗi." },
  { id: "hd-002", code: "HD-002", name: "Trà đào cam sả", category: "fruit-tea", size: "M / L", priceM: 39000, priceL: 46000, fixedPrice: null, cogs: 20100, status: "active", lockedBranches: [], note: "Món thuộc menu lõi toàn chuỗi." },
  { id: "hd-003", code: "HD-003", name: "Matcha kem sữa", category: "macchiato", size: "M / L", priceM: 42000, priceL: 49000, fixedPrice: null, cogs: 23800, status: "branch-locked", lockedBranches: ["CN06"], note: "Chi nhánh CN06 tạm khóa món do tình trạng nguyên liệu." },
  { id: "tp-001", code: "TP-001", name: "Trân châu đen", category: "topping", size: "Phần thêm", priceM: null, priceL: null, fixedPrice: 8000, cogs: 3200, status: "active", lockedBranches: [], note: "Topping bán theo phần thêm." },
  { id: "hd-004", code: "HD-004", name: "Trà dâu nhiệt đới", category: "fruit-tea", size: "M / L", priceM: 39000, priceL: 46000, fixedPrice: null, cogs: null, status: "pending-recipe", lockedBranches: [], note: "Chưa có định mức công thức được duyệt." },
];

export default function ProductsPage() {
  const navigate = useNavigate();
  const [products] = useState<Product[]>(INITIAL_PRODUCTS);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [status, setStatus] = useState("all");
  const [applied, setApplied] = useState({ search: "", category: "all", status: "all" });
  const [selected, setSelected] = useState<Product | null>(null);
  const [page, setPage] = useState(1);
  const pageSize = 5;
  const filtered = useMemo(() => products.filter((p) => {
    const q = applied.search.trim().toLocaleLowerCase("vi-VN");
    return (!q || p.code.toLocaleLowerCase("vi-VN").includes(q) || p.name.toLocaleLowerCase("vi-VN").includes(q))
      && (applied.category === "all" || p.category === applied.category)
      && (applied.status === "all" || p.status === applied.status);
  }), [products, applied]);
  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const rows = filtered.slice((page - 1) * pageSize, page * pageSize);
  const priceText = (p: Product) => p.fixedPrice !== null ? formatCurrency(p.fixedPrice)
    : p.priceM !== null && p.priceL !== null ? `${formatCurrency(p.priceM)} / ${formatCurrency(p.priceL)}` : "—";
  const applyFilters = () => { setApplied({ search, category, status }); setPage(1); };
  const clearFilters = () => { setSearch(""); setCategory("all"); setStatus("all"); setApplied({ search: "", category: "all", status: "all" }); setPage(1); };

  return <div>
    <div className="page-header"><div>
      <div className="breadcrumb"><button onClick={() => navigate("/dashboard")}>Trang chủ</button><span className="sep">/</span><span>Kho &amp; nguyên liệu</span><span className="sep">/</span><span className="current">Menu đồ uống</span></div>
      <h1 className="page-title">Menu đồ uống &amp; topping</h1>
      <p className="page-subtitle mt-1">Quản lý danh mục đồ uống, topping, size, giá chuẩn và tình trạng bán.</p>
    </div><div className="page-header-actions"><span className="text-xs text-[var(--muted)]">Dữ liệu minh họa</span></div></div>

    <section className="page-section mb-6" aria-label="Thống kê nhanh"><div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      <StatCard label="Món đang bán" value="15" subLabel="Danh mục menu lõi" tone="primary" icon={<KpiIcon kind="grid" />} />
      <StatCard label="Có công thức đã duyệt" value="13" subLabel="Theo phiên bản hiện hành" tone="success" icon={<KpiIcon kind="document-check" />} />
      <StatCard label="Chi nhánh tạm khóa" value="4" subLabel="Món bị giới hạn theo cửa hàng" tone="warning" icon={<KpiIcon kind="branch" />} />
      <StatCard label="Món cần rà soát giá vốn" value="2" subLabel="Chưa đủ định mức" tone="warning" icon={<KpiIcon kind="currency" />} />
    </div></section>

    <section className="card mb-6 border-l-4 border-[var(--info)]"><h2 className="text-sm font-bold mb-1">Quy tắc menu chuỗi</h2><p className="text-sm text-[var(--muted)]">Menu lõi và giá chuẩn dùng chung toàn chuỗi. Chi nhánh chỉ được tạm khóa món khi hết nguyên liệu; không tự thay đổi giá chuẩn.</p></section>

    <section className="card mb-6"><div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 items-end">
      <div><label className="form-label" htmlFor="products-search">Tìm kiếm</label><input id="products-search" className="form-input" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Tìm theo mã món hoặc tên món..." /></div>
      <div><label className="form-label" htmlFor="products-category">Nhóm món</label><select id="products-category" className="form-input form-select" value={category} onChange={(e) => setCategory(e.target.value)}><option value="all">Tất cả nhóm</option><option value="milk-tea">Trà sữa</option><option value="fruit-tea">Trà trái cây</option><option value="macchiato">Macchiato</option><option value="topping">Topping</option></select></div>
      <div><label className="form-label" htmlFor="products-status">Trạng thái bán</label><select id="products-status" className="form-input form-select" value={status} onChange={(e) => setStatus(e.target.value)}><option value="all">Tất cả trạng thái</option><option value="active">Đang bán</option><option value="branch-locked">Chi nhánh tạm khóa</option><option value="pending-recipe">Chờ duyệt công thức</option><option value="disabled">Ngừng bán toàn chuỗi</option></select></div>
      <div className="flex gap-2"><button type="button" className="btn btn-secondary" onClick={clearFilters}>Xóa lọc</button><button type="button" className="btn btn-primary" onClick={applyFilters}>Áp dụng</button></div>
    </div></section>

    <section className="card p-0 overflow-hidden mb-6"><div className="p-4 md:p-5 flex flex-wrap items-start justify-between gap-3 border-b border-[var(--border)]"><div><h2 className="font-bold">Danh mục món và topping</h2><p className="text-sm text-[var(--muted)] mt-1">Giá niêm yết, giá vốn định mức và tình trạng kinh doanh.</p></div><button className="btn btn-primary" onClick={() => navigate("/inventory/products/new")}>Khai báo món mới</button></div>
      <DataTable><table className="w-full text-sm text-left"><thead className="bg-[var(--background)] text-[var(--muted)]"><tr>{["Mã / Tên món", "Nhóm món", "Size hỗ trợ", "Giá bán", "COGS/ly", "Trạng thái"].map((h) => <th key={h} className="px-4 py-3 font-semibold">{h}</th>)}</tr></thead><tbody>
        {rows.length ? rows.map((p) => <tr key={p.id} className="border-t border-[var(--border)] hover:bg-[var(--background)]"><td className="px-4 py-3"><button className="text-left" onClick={() => navigate(`/inventory/products/${p.id}`)}><span className="font-semibold text-[var(--primary)]">{p.code}</span><br />{p.name}</button></td><td className="px-4 py-3">{CATEGORY_LABEL[p.category]}</td><td className="px-4 py-3">{p.size}</td><td className="px-4 py-3 whitespace-nowrap">{priceText(p)}</td><td className="px-4 py-3">{p.cogs === null ? "—" : formatCurrency(p.cogs)}</td><td className="px-4 py-3"><button onClick={() => setSelected(p)}><Badge variant={STATUS_VARIANT[p.status]}>{p.status === "branch-locked" ? `${p.lockedBranches.join(", ")} tạm khóa` : STATUS_LABEL[p.status]}</Badge></button></td></tr>) : <tr><td colSpan={6} className="px-4 py-10 text-center text-[var(--muted)]">Không tìm thấy món phù hợp.</td></tr>}
      </tbody></table></DataTable>
    </section>
    <div className="flex flex-wrap items-center justify-between gap-3 text-sm text-[var(--muted)] mb-6"><span>Đang hiển thị {filtered.length ? (page - 1) * pageSize + 1 : 0}–{Math.min(page * pageSize, filtered.length)} / {filtered.length} món</span><div className="flex items-center gap-2"><button className="btn btn-secondary" disabled={page <= 1} onClick={() => setPage((p) => Math.max(1, p - 1))}>Trước</button><span className="px-3 py-2 border border-[var(--border)] rounded-lg">Trang {page} / {totalPages}</span><button className="btn btn-secondary" disabled={page >= totalPages} onClick={() => setPage((p) => Math.min(totalPages, p + 1))}>Sau</button></div></div>
    <Modal isOpen={selected !== null} title="Chi tiết trạng thái kinh doanh" onClose={() => setSelected(null)}>{selected && <div className="space-y-4"><div><p className="text-xs text-[var(--muted)]">{selected.code}</p><p className="font-semibold">{selected.name}</p></div><Badge variant={STATUS_VARIANT[selected.status]}>{STATUS_LABEL[selected.status]}</Badge><p className="text-sm text-[var(--muted)]">{selected.note}</p>{selected.lockedBranches.length > 0 && <p className="text-sm">Chi nhánh tạm khóa: {selected.lockedBranches.join(", ")}</p>}<div className="flex justify-end"><button className="btn btn-secondary" onClick={() => setSelected(null)}>Đóng</button></div></div>}</Modal>
  </div>;
}
