import { useState } from "react";
import type { FormEvent } from "react";
import Badge from "../../components/common/Badge";
import type { BadgeVariant } from "../../components/common/Badge";
import DataTable from "../../components/common/DataTable";
import type { DataTableColumn } from "../../components/common/DataTable";
import Modal from "../../components/common/Modal";
import { useToast } from "../../components/common/useToast";
import {
    formatCurrency,
    formatDateTime,
    SalesPageHeader,
} from "./sales-support";

type MemberTier = "member" | "silver" | "gold" | "vip";

interface PointTransaction {
    id: string;
    invoiceId: string;
    createdAt: string;
    points: number;
    description: string;
}

interface Customer {
    id: string;
    name: string;
    phone: string;
    tier: MemberTier;
    spending12Months: number;
    points: number;
    history: readonly PointTransaction[];
}

interface CustomerForm {
    name: string;
    phone: string;
}

const tierLabels: Record<MemberTier, string> = {
    member: "Thành viên",
    silver: "Hạng bạc",
    gold: "Hạng vàng",
    vip: "VIP",
};

const tierVariants: Record<MemberTier, BadgeVariant> = {
    member: "info",
    silver: "gray",
    gold: "warning",
    vip: "purple",
};

// Hội viên mẫu từ customers/customers.html.
const initialCustomers: readonly Customer[] = [{ id: "HV-0001", name: "Nguyễn An", phone: "0900 000 001", tier: "vip", spending12Months: 12500000, points: 1250, history: [{ id: "GD01", invoiceId: "HD-00125", createdAt: "2026-10-28T09:15:00+07:00", points: 450, description: "Tích điểm mua hàng · 450.000 ₫ · Số dư 1.250" }, { id: "GD02", invoiceId: "HD-00120", createdAt: "2026-10-27T15:20:00+07:00", points: -45, description: "Điều chỉnh do hoàn tiền · 45.000 ₫ · Số dư 800" }] }];

export default function CustomersPage() {
    const toast = useToast();
    const [customers, setCustomers] = useState<Customer[]>(() => [...initialCustomers]);
    const [search, setSearch] = useState("");
    const [tier, setTier] = useState("");
    const [addOpen, setAddOpen] = useState(false);
    const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
    const [form, setForm] = useState<CustomerForm>({ name: "", phone: "" });

    const query = search.trim().toLocaleLowerCase("vi-VN");
    const visibleCustomers = customers.filter(
        (customer) =>
            (!tier || customer.tier === tier) &&
            (
                `${customer.id} ${customer.name}`.toLocaleLowerCase("vi-VN").includes(query) ||
                customer.phone.includes(query.replace(/\s/g, ""))
            ),
    );

    function addCustomer(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const name = form.name.trim();
        const phone = form.phone.replace(/\s/g, "");

        if (!name || !/^(0\d{9}|\+84\d{9})$/.test(phone)) {
            toast.warning("Vui lòng nhập tên và số điện thoại Việt Nam hợp lệ.");
            return;
        }

        const normalizedPhone = phone.startsWith("+84")
            ? `0${phone.slice(3)}`
            : phone;

        if (customers.some((customer) => customer.phone === normalizedPhone)) {
            toast.warning("Số điện thoại này đã có trong danh sách.");
            return;
        }

        const customer: Customer = {
            id: `KH-${crypto.randomUUID()}`,
            name,
            phone: normalizedPhone,
            tier: "member",
            spending12Months: 0,
            points: 0,
            history: [],
        };

        setCustomers((current) => [customer, ...current]);
        setForm({ name: "", phone: "" });
        setAddOpen(false);
        toast.success("Đã thêm khách hàng trong phiên mô phỏng.");
    }

    const columns: readonly DataTableColumn<Customer>[] = [
        { id: "id", header: "Mã hội viên", render: (customer) => customer.id },
        {
            id: "name",
            header: "Khách hàng",
            render: (customer) => (
                <div className="name-ellipsis" title={customer.name}>
                    {customer.name}
                </div>
            ),
        },
        { id: "phone", header: "Số điện thoại", render: (customer) => customer.phone },
        {
            id: "tier",
            header: "Hạng thẻ",
            render: (customer) => (
                <Badge variant={tierVariants[customer.tier]}>
                    {tierLabels[customer.tier]}
                </Badge>
            ),
        },
        {
            id: "spending",
            header: "Chi tiêu 12 tháng",
            render: (customer) => formatCurrency(customer.spending12Months),
        },
        {
            id: "points",
            header: "Điểm khả dụng",
            render: (customer) => customer.points.toLocaleString("vi-VN"),
        },
        {
            id: "lastPurchase", header: "Lần mua gần nhất", render: (customer) => customer.id === "HV-0001" ? "28/10/2026" : "—",
        },
        {
            id: "history",
            header: "Thao tác",
            render: (customer) => (
                <button
                    type="button"
                    className="btn btn-secondary btn-sm"
                    onClick={() => setSelectedCustomer(customer)}
                >
                    Lịch sử
                </button>
            ),
        },
    ];

    const historyColumns: readonly DataTableColumn<PointTransaction>[] = [
        {
            id: "time",
            header: "Thời gian",
            render: (item) => formatDateTime(item.createdAt),
        },
        { id: "invoice", header: "Hóa đơn", render: (item) => item.invoiceId },
        {
            id: "points",
            header: "Điểm",
            render: (item) => `${item.points > 0 ? "+" : ""}${item.points}`,
        },
        { id: "description", header: "Nội dung", render: (item) => item.description },
    ];

    return (
        <>
            <SalesPageHeader
                title="Khách hàng và hội viên"
                breadcrumb="Khách hàng"
                parent={{ label: "", to: "" }}
                description="Tra cứu hội viên, hạng thẻ, chi tiêu và lịch sử điểm toàn chuỗi."
                actions={
                    <button
                        type="button"
                        className="btn btn-primary"
                        onClick={() => setAddOpen(true)}
                    >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg> Thêm khách hàng
                    </button>
                }
            />

            <section className="card mb-6">
                <p className="mb-4 text-sm text-[var(--muted)]">
                    Dữ liệu hội viên từ HTML gốc. Các khách hàng được thêm ở đây chỉ lưu
                    trong phiên mô phỏng của trang.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label className="form-label" htmlFor="customer-search">
                            Tìm hội viên
                        </label>
                        <input
                            id="customer-search"
                            type="search"
                            className="form-input"
                            placeholder="Mã, tên hoặc số điện thoại"
                            value={search}
                            onChange={(event) => setSearch(event.target.value)}
                        />
                    </div>
                    <div>
                        <label className="form-label" htmlFor="customer-tier">
                            Hạng thẻ
                        </label>
                        <select
                            id="customer-tier"
                            className="form-input form-select"
                            value={tier}
                            onChange={(event) => setTier(event.target.value)}
                        >
                            <option value="">Tất cả hạng thẻ</option>
                            {Object.entries(tierLabels).map(([value, label]) => (
                                <option key={value} value={value}>{label}</option>
                            ))}
                        </select>
                    </div>
                </div>
            </section>

            <section className="card p-0 overflow-hidden">
                <DataTable<Customer>
                    key={`${search}-${tier}`}
                    columns={columns}
                    data={visibleCustomers}
                    rowKey={(customer) => customer.id}
                    caption="Danh sách khách hàng và hội viên"
                />
            </section>

            <Modal
                open={addOpen}
                title="Thêm khách hàng"
                onClose={() => setAddOpen(false)}
                footer={
                    <>
                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={() => setAddOpen(false)}
                        >
                            Hủy
                        </button>
                        <button type="submit" form="customer-form" className="btn btn-primary">
                            Lưu khách hàng
                        </button>
                    </>
                }
            >
                <form id="customer-form" className="space-y-4" onSubmit={addCustomer}>
                    <div>
                        <label className="form-label" htmlFor="customer-name">
                            Họ và tên
                        </label>
                        <input
                            id="customer-name"
                            className="form-input"
                            maxLength={120}
                            value={form.name}
                            onChange={(event) =>
                                setForm((current) => ({ ...current, name: event.target.value }))
                            }
                            required
                        />
                    </div>
                    <div>
                        <label className="form-label" htmlFor="customer-phone">
                            Số điện thoại
                        </label>
                        <input
                            id="customer-phone"
                            className="form-input"
                            type="tel"
                            inputMode="tel"
                            value={form.phone}
                            onChange={(event) =>
                                setForm((current) => ({ ...current, phone: event.target.value }))
                            }
                            required
                        />
                    </div>
                </form>
            </Modal>

            <Modal
                open={selectedCustomer !== null}
                title={`Lịch sử điểm — ${selectedCustomer?.name ?? ""}`}
                size="lg"
                onClose={() => setSelectedCustomer(null)}
            >
                <DataTable<PointTransaction>
                    key={selectedCustomer?.id ?? "none"}
                    columns={historyColumns}
                    data={selectedCustomer?.history ?? []}
                    rowKey={(item) => item.id}
                    caption="Lịch sử giao dịch điểm"
                    emptyMessage="Chưa có giao dịch điểm."
                />
            </Modal>
        </>
    );
}