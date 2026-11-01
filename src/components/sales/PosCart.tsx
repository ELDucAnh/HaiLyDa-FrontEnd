import { useState } from "react";
import ConfirmDialog from "../common/ConfirmDialog";
import { useToast } from "../common/useToast";
import { formatCurrency } from "../../utils/format";

export interface PosCartItem {
    id: string;
    productId: string;
    name: string;
    size: "M" | "L";
    sugar: string;
    ice: string;
    toppings: readonly string[];
    note: string;
    quantity: number;
    unitPrice: number;
}

export interface PosCartProps {
    items: readonly PosCartItem[];
    onRemove: (id: string) => void;
    onClear: () => void;
}

function validPercentage(value: string): number | null {
    const number = value.trim() === "" ? 0 : Number(value);

    return Number.isFinite(number) && number >= 0 && number <= 100
        ? number
        : null;
}

export default function PosCart({ items, onRemove, onClear }: PosCartProps) {
    const toast = useToast();
    const [clearOpen, setClearOpen] = useState(false);
    const [phone, setPhone] = useState("");
    const [voucher, setVoucher] = useState("");
    const [discountInput, setDiscountInput] = useState("");
    const [taxInput, setTaxInput] = useState("10");
    const [paidInput, setPaidInput] = useState("");

    const discountRate = validPercentage(discountInput);
    const taxRate = validPercentage(taxInput);
    const subtotal = items.reduce(
        (sum, item) => sum + item.quantity * item.unitPrice,
        0,
    );
    const discount = Math.round(subtotal * (discountRate ?? 0) / 100);
    const tax = Math.round((subtotal - discount) * (taxRate ?? 0) / 100);
    const total = subtotal - discount + tax;
    const paid = paidInput.trim() ? Number(paidInput) : 0;
    const paidValid = Number.isSafeInteger(paid) && paid >= 0;
    const change = paidValid ? Math.max(0, paid - total) : 0;

    function completeSale() {
        if (!items.length) {
            toast.warning("Giỏ hàng đang trống.");
            return;
        }

        if (discountRate === null || taxRate === null) {
            toast.warning("Giảm giá và thuế phải nằm trong khoảng 0–100%.");
            return;
        }

        if (!paidValid || paid < total) {
            toast.warning("Tiền khách đưa chưa đủ hoặc không hợp lệ.");
            return;
        }

        toast.info(
            "Đã kiểm tra giỏ hàng mô phỏng. Chưa tạo đơn, thu tiền, giữ nguyên liệu hoặc đồng bộ máy chủ.",
        );
    }

    return (
        <div className="lg:col-span-5 flex flex-col gap-4 sticky top-20">
            <div className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl overflow-hidden">
                <div className="px-5 pt-5 pb-4 border-b border-[var(--border)]">
                    <label className="form-label" htmlFor="pos-customer">Khách hàng</label>
                    <select
                        id="pos-customer"
                        className="form-input form-select"
                        defaultValue="walk-in"
                    >
                        <option value="walk-in">Khách vãng lai</option>
                    </select>
                </div>

                <div className="px-5 py-4 border-b border-[var(--border)]">
                    <label className="form-label" htmlFor="member-phone">
                        Số điện thoại hội viên
                    </label>
                    <div className="flex gap-2">
                        <input
                            id="member-phone"
                            type="tel"
                            inputMode="tel"
                            className="form-input"
                            placeholder="Nhập số điện thoại"
                            value={phone}
                            onChange={(event) => setPhone(event.target.value)}
                        />
                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={() =>
                                toast.info("Chưa kết nối dữ liệu hội viên. Không tự áp dụng hạng thẻ.")
                            }
                        >
                            Tra cứu
                        </button>
                    </div>
                    <p className="text-xs text-[var(--muted)] mt-2">
                        Chưa tra cứu hội viên.
                    </p>
                </div>

                <div className="px-5 pt-4 pb-2 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <span className="text-sm font-bold">Giỏ hàng hiện tại</span>
                        <span className="text-sm text-[var(--primary)]">
                            {items.reduce((sum, item) => sum + item.quantity, 0)}
                        </span>
                    </div>
                    <button
                        type="button"
                        className="text-xs text-[var(--danger)]"
                        disabled={!items.length}
                        onClick={() => setClearOpen(true)}
                    >
                        Xóa tất cả
                    </button>
                </div>

                <div className="max-h-[280px] overflow-y-auto px-5 pb-4">
                    {!items.length ? (
                        <p className="py-6 text-center text-sm text-[var(--muted)]">
                            Chưa có món trong giỏ hàng.
                        </p>
                    ) : items.map((item) => (
                        <div key={item.id} className="border-b border-[var(--border)] py-3">
                            <div className="flex justify-between gap-3">
                                <strong className="text-sm">
                                    {item.quantity} × {item.name} · {item.size}
                                </strong>
                                <button
                                    type="button"
                                    className="text-xs text-[var(--danger)]"
                                    aria-label={`Xóa ${item.name} khỏi giỏ hàng`}
                                    onClick={() => onRemove(item.id)}
                                >
                                    Xóa
                                </button>
                            </div>
                            <p className="mt-1 text-xs text-[var(--muted)]">
                                Đường {item.sugar}% · {item.ice}
                                {item.toppings.length > 0 && ` · ${item.toppings.join(", ")}`}
                            </p>
                            {item.note && (
                                <p className="mt-1 text-xs">{item.note}</p>
                            )}
                            <p className="mt-2 text-sm font-semibold">
                                {formatCurrency(item.unitPrice * item.quantity)}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-5">
                <div className="mb-4">
                    <label className="form-label" htmlFor="pos-voucher-code">
                        Mã ưu đãi
                    </label>
                    <div className="flex gap-2">
                        <input
                            id="pos-voucher-code"
                            className="form-input"
                            placeholder="Nhập mã ưu đãi"
                            value={voucher}
                            onChange={(event) => setVoucher(event.target.value)}
                        />
                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={() =>
                                toast.info("Chưa kết nối điều kiện áp dụng mã ưu đãi.")
                            }
                        >
                            Áp dụng
                        </button>
                    </div>
                </div>

                <div className="flex justify-between items-center mb-4">
                    <span>Tạm tính</span>
                    <strong>{formatCurrency(subtotal)}</strong>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-4">
                    <div>
                        <label className="form-label" htmlFor="pos-discount-input">
                            Giảm giá (%)
                        </label>
                        <input
                            id="pos-discount-input"
                            className="form-input"
                            type="number"
                            min="0"
                            max="100"
                            value={discountInput}
                            onChange={(event) => setDiscountInput(event.target.value)}
                        />
                    </div>
                    <div>
                        <label className="form-label" htmlFor="pos-tax-input">
                            Thuế (%)
                        </label>
                        <input
                            id="pos-tax-input"
                            className="form-input"
                            type="number"
                            min="0"
                            max="100"
                            value={taxInput}
                            onChange={(event) => setTaxInput(event.target.value)}
                        />
                    </div>
                </div>

                <div className="space-y-2 mb-4 text-sm">
                    <div className="flex justify-between">
                        <span>Tiền giảm giá</span>
                        <span className="text-[var(--danger)]">
                            −{formatCurrency(discount)}
                        </span>
                    </div>
                    <div className="flex justify-between">
                        <span>Tiền thuế</span>
                        <span>{formatCurrency(tax)}</span>
                    </div>
                </div>

                <div className="flex justify-between items-center pt-4 border-t border-[var(--border)]">
                    <strong>Tổng thanh toán</strong>
                    <strong className="text-2xl text-[var(--primary)]">
                        {formatCurrency(total)}
                    </strong>
                </div>
                <p className="mt-3 text-xs text-[var(--muted)]">
                    Tính toán mô phỏng: thuế tính trên giá trị sau giảm giá.
                    Cần đối chiếu quy tắc gốc trước nghiệm thu.
                </p>
            </div>

            <div className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-5">
                <div className="flex flex-wrap gap-2 mb-4">
                    {[50000, 100000, 200000, 500000].map((amount) => (
                        <button
                            key={amount}
                            type="button"
                            className="btn btn-secondary btn-sm"
                            onClick={() => setPaidInput(String(amount))}
                        >
                            {formatCurrency(amount)}
                        </button>
                    ))}
                </div>

                <div className="grid grid-cols-2 gap-3 mb-4">
                    <div>
                        <label className="form-label" htmlFor="pos-paid-amount">
                            Tiền khách đưa (đ)
                        </label>
                        <input
                            id="pos-paid-amount"
                            type="number"
                            min="0"
                            step="1"
                            className="form-input"
                            value={paidInput}
                            onChange={(event) => setPaidInput(event.target.value)}
                        />
                    </div>
                    <div>
                        <label className="form-label" htmlFor="pos-change">Tiền thừa</label>
                        <output
                            id="pos-change"
                            className="form-input block text-[var(--primary)]"
                        >
                            {formatCurrency(change)}
                        </output>
                    </div>
                </div>

                <button
                    type="button"
                    className="btn btn-primary w-full h-14 justify-center"
                    disabled={!items.length}
                    onClick={completeSale}
                >
                    Hoàn tất bán hàng · {formatCurrency(total)}
                </button>
            </div>

            <ConfirmDialog
                open={clearOpen}
                title="Xóa toàn bộ giỏ hàng?"
                message="Các món và tùy chọn trong giỏ hàng hiện tại sẽ bị xóa."
                confirmText="Xóa giỏ hàng"
                onCancel={() => setClearOpen(false)}
                onConfirm={() => {
                    onClear();
                    setClearOpen(false);
                }}
            />
        </div>
    );
}