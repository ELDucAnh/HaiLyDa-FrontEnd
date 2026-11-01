import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import Badge from "../../components/common/Badge";
import { useToast } from "../../components/common/useToast";

export default function InvoiceDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const invoiceId = id || "HD-CN05-001247";
  const toast = useToast();
  const [printFormat, setPrintFormat] = useState<"k80" | "k57">("k80");

  const handlePrint = (format: "k80" | "k57") => {
    setPrintFormat(format);
    if (format === "k57") {
      document.body.classList.add("print-k57");
      toast.info("Đang chuẩn bị bản in theo khổ K57 (57mm)...", { title: "In Bill K57" });
    } else {
      document.body.classList.remove("print-k57");
      toast.info("Đang chuẩn bị bản in theo khổ K80 (80mm)...", { title: "In Bill K80" });
    }
    setTimeout(() => {
      window.print();
      setTimeout(() => document.body.classList.remove("print-k57"), 1000);
    }, 200);
  };

  return (
    <div className="space-y-6">
      {/* Tiêu đề trang với nút thao tác */}
      <div className="page-header no-print">
        <div>
          <nav className="breadcrumb" aria-label="Đường dẫn trang">
            <Link to="/dashboard">Trang chủ</Link>
            <span className="sep">/</span>
            <Link to="/invoices">Hóa đơn</Link>
            <span className="sep">/</span>
            <span className="current">Chi tiết {invoiceId}</span>
          </nav>
          <div className="flex items-center gap-3 mt-1">
            <h1 className="page-title mb-0">Hóa Đơn {invoiceId}</h1>
            <Badge variant="success">ĐÃ THANH TOÁN</Badge>
          </div>
        </div>
        <div className="flex gap-2.5 flex-wrap">
          <Link to="/invoices" className="btn btn-secondary">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polyline points="15 18 9 12 15 6" />
            </svg>
            Quay Lại
          </Link>
          <div className="inline-flex rounded-lg shadow-sm border border-[var(--border)] overflow-hidden">
            <button
              type="button"
              className={`btn btn-secondary border-none rounded-none text-xs px-3 ${printFormat === "k80" ? "bg-[var(--surface)]" : ""
                }`}
              onClick={() => handlePrint("k80")}
              title="In khổ tiêu chuẩn K80 (80mm)"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="6 9 6 2 18 2 18 9" />
                <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
                <rect x="6" y="14" width="12" height="8" />
              </svg>
              In Bill K80
            </button>
            <button
              type="button"
              className="btn btn-secondary border-none border-l border-[var(--border)] rounded-none text-xs px-2.5 bg-[var(--background)] hover:bg-[var(--border)]"
              onClick={() => handlePrint("k57")}
              title="In khổ nhỏ K57 (57mm)"
            >
              In K57
            </button>
          </div>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => toast.info("Đang in phiếu pha chế (KOT)...", { title: "In Phiếu Bếp" })}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 11l3 3L22 4" />
              <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
            </svg>
            In Phiếu Pha (KOT)
          </button>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => toast.success("Đã gửi biên lai điện tử đến 0908.123.456", { title: "Gửi Thành Công" })}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <polyline points="22,6 12,13 2,6" />
            </svg>
            Gửi Cho Khách
          </button>
        </div>
      </div>

      {/* Thông tin POS (Thông tin ca, quầy) — không in */}
      <div className="no-print mb-4">
        <div className="card p-4 flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-4 text-[13px] flex-wrap">
            <div>
              <span className="text-[var(--muted)]">Chi nhánh: </span>
              <span className="font-semibold text-[var(--text)]">CN05 - Hàng Xanh (Bình Thạnh)</span>
            </div>
            <div className="h-4 w-px bg-[var(--border)] hidden sm:block" />
            <div>
              <span className="text-[var(--muted)]">Thu ngân: </span>
              <span className="font-semibold text-[var(--text)]">Nguyễn Thị Mai (NV-0502)</span>
            </div>
            <div className="h-4 w-px bg-[var(--border)] hidden sm:block" />
            <div>
              <span className="text-[var(--muted)]">Ca: </span>
              <span className="font-semibold text-[var(--text)]">Ca Sáng (07:00–15:00)</span>
            </div>
            <div className="h-4 w-px bg-[var(--border)] hidden sm:block" />
            <div>
              <span className="text-[var(--muted)]">Quầy: </span>
              <span className="font-semibold text-[var(--text)]">POS #01</span>
            </div>
          </div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold border border-emerald-200 dark:bg-emerald-950 dark:text-emerald-300 dark:border-emerald-800">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            Trực tuyến — Đã đồng bộ
          </span>
        </div>
      </div>

      {/* Hóa đơn có thể in */}
      <div className="card printable-card max-w-4xl mx-auto p-6 md:p-10 relative">
        {/* Dấu đã thanh toán */}
        <div className="absolute top-[30px] right-[40px] border-[3px] border-[var(--primary)] text-[var(--primary)] font-black text-xl px-[18px] py-1 rounded-lg rotate-[8deg] tracking-[2px] uppercase opacity-[0.85] no-print">
          ĐÃ THANH TOÁN
        </div>

        {/* Header hóa đơn */}
        <div className="flex justify-between items-start flex-wrap gap-5 mb-9 pb-6 border-b border-[var(--border)]">
          <div className="flex items-center gap-3">
            <div className="w-[44px] h-[44px] rounded-xl bg-gradient-to-br from-[var(--primary)] to-[var(--primary-dark)] flex items-center justify-center shadow-[0_2px_8px_rgba(0,0,0,0.2)]">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8">
                <path d="M12 3c.9 2 2.5 3.5 4.5 4.5C18 8.5 19 10 19 12c0 4-3 7-7 8-4-1-7-4-7-8 0-2 1-3.5 2.5-4.5C9.5 6.5 11.1 5 12 3z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            </div>
            <div className="border-l border-[var(--border)] pl-3">
              <div className="text-[22px] font-bold text-[var(--text)] leading-[1.1] tracking-[-0.3px]">MilktyWay</div>
              <div className="text-[10px] text-[var(--primary)] font-semibold tracking-[0.8px] uppercase mt-[2px]">
                Chuỗi Cửa Hàng Trà Sữa
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm font-bold text-[var(--text)]">CN05 — Hàng Xanh, Bình Thạnh</div>
            <div className="text-xs text-[var(--muted)] mt-[2px]">247 Xô Viết Nghệ Tĩnh, P.17, Q. Bình Thạnh</div>
            <div className="text-xs text-[var(--muted)]">TP. Hồ Chí Minh</div>
            <div className="text-xs text-[var(--muted)]">ĐT: 028.3840.5050 | MilktyWay.vn</div>
            <div className="text-xs text-[var(--muted)]">MST: 0314-123-456</div>
          </div>
        </div>

        {/* Thông tin khách & hóa đơn */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div>
            <div className="text-[11px] font-bold text-[var(--muted)] uppercase tracking-[0.6px] mb-2">
              Thông Tin Khách Hàng:
            </div>
            <div className="text-[15px] font-bold text-[var(--text)]">Trần Văn An</div>
            <div className="text-[13px] text-[var(--muted)] mt-[2px]">SĐT: 0908.123.456</div>
            <div className="text-[13px] text-[var(--muted)]">
              Hạng thành viên: <span className="font-semibold text-[var(--text)]">Gold</span>
            </div>
            <div className="text-[13px] text-[var(--muted)]">
              Điểm hiện tại: <span className="font-semibold text-[var(--primary)]">120 điểm</span>
            </div>
            <div className="text-[13px] text-[var(--muted)] mt-1">
              Điểm tích lũy đơn này: <span className="font-semibold text-[var(--primary)]">+9 điểm</span>
            </div>
          </div>
          <div className="bg-[var(--background)] p-[18px] rounded-xl flex flex-col gap-2">
            <div className="flex justify-between text-[13px]">
              <span className="text-[var(--muted)]">Mã Hóa Đơn:</span>
              <span className="font-bold font-mono text-[var(--text)]">{invoiceId}</span>
            </div>
            <div className="flex justify-between text-[13px]">
              <span className="text-[var(--muted)]">Ngày &amp; Giờ:</span>
              <span className="font-semibold text-[var(--text)]">28/10/2026 — 14:32</span>
            </div>
            <div className="flex justify-between text-[13px]">
              <span className="text-[var(--muted)]">Kênh Bán:</span>
              <span className="font-semibold text-[var(--text)]">Tại Quầy (Counter POS)</span>
            </div>
            <div className="flex justify-between text-[13px]">
              <span className="text-[var(--muted)]">Thanh Toán:</span>
              <span className="font-semibold text-[var(--text)]">Tiền mặt</span>
            </div>
            <div className="flex justify-between text-[13px]">
              <span className="text-[var(--muted)]">Số Thứ Tự Lấy:</span>
              <span className="font-semibold text-[var(--text)]">#47</span>
            </div>
          </div>
        </div>

        {/* Bảng các món */}
        <div className="overflow-x-auto mb-6">
          <table className="data-table">
            <thead>
              <tr>
                <th className="w-[40px]">#</th>
                <th>Tên Món &amp; Tùy Chọn</th>
                <th className="no-print-col">Mã Món</th>
                <th className="text-right">Đơn Giá</th>
                <th className="text-center">SL</th>
                <th className="text-right">Thành Tiền</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="text-xs text-[var(--muted)]">1</td>
                <td>
                  <div className="font-semibold text-[var(--text)]">Trà Sữa Ô Long Nướng</div>
                  <div className="text-[11px] text-[var(--muted)]">
                    Size L · 50% Đường · 70% Đá · +Trân châu đen sợi · +Kem Foam Cheese
                  </div>
                </td>
                <td className="font-mono text-xs text-[var(--muted)] no-print-col">TS-002-L</td>
                <td className="text-right text-[13px]">62.000 đ</td>
                <td className="text-center font-semibold">1</td>
                <td className="text-right font-bold text-[var(--text)]">62.000 đ</td>
              </tr>
              <tr>
                <td className="text-xs text-[var(--muted)]">2</td>
                <td>
                  <div className="font-semibold text-[var(--text)]">Trà Sữa Trân Châu Hoàng Kim</div>
                  <div className="text-[11px] text-[var(--muted)]">
                    Size M · 70% Đường · 100% Đá · +Trân châu hoàng kim
                  </div>
                </td>
                <td className="font-mono text-xs text-[var(--muted)] no-print-col">TS-001-M</td>
                <td className="text-right text-[13px]">41.000 đ</td>
                <td className="text-center font-semibold">1</td>
                <td className="text-right font-bold text-[var(--text)]">41.000 đ</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Tổng cộng */}
        <div className="flex justify-end mb-8">
          <div className="w-[320px] flex flex-col gap-[10px]">
            <div className="flex justify-between text-[13px]">
              <span className="text-[var(--muted)]">Tạm tính:</span>
              <span className="font-semibold text-[var(--text)]">103.000 đ</span>
            </div>
            <div className="flex justify-between text-[13px]">
              <span className="text-[var(--muted)]">Ưu đãi hội viên Gold (Tặng topping):</span>
              <span className="text-[var(--danger)]">-14.000 đ</span>
            </div>
            <div className="flex justify-between text-[13px]">
              <span className="text-[var(--muted)]">Thuế VAT (8%):</span>
              <span className="font-semibold text-[var(--text)]">Đã bao gồm</span>
            </div>
            <div className="flex justify-between text-lg font-extrabold border-t-2 border-[var(--border)] pt-[10px] mt-1">
              <span className="text-[var(--text)]">Tổng Thanh Toán:</span>
              <span className="text-[var(--primary)]">89.000 đ</span>
            </div>
            <div className="flex justify-between text-[13px] text-[var(--primary)] font-semibold bg-[var(--primary-light)] py-2 px-3 rounded-lg mt-1.5">
              <span>Tiền Khách Đưa (Tiền mặt):</span>
              <span>100.000 đ</span>
            </div>
            <div className="flex justify-between text-[13px] font-semibold">
              <span className="text-[var(--muted)]">Tiền Thừa Trả Khách:</span>
              <span className="text-[var(--text)]">11.000 đ</span>
            </div>
          </div>
        </div>

        {/* Footer hóa đơn */}
        <div className="border-t border-[var(--border)] pt-5 flex justify-between items-end flex-wrap gap-5">
          <div className="max-w-[400px]">
            <div className="text-xs font-bold text-[var(--text)] mb-1">Cảm ơn quý khách!</div>
            <div className="text-[11px] text-[var(--muted)] leading-relaxed">
              Trà sữa MilktyWay — Đậm đà hương vị, tươi mát từng ngụm. Khiếu nại vui lòng liên hệ 028.3840.5050 hoặc
              MilktyWay.vn trong vòng 30 phút kể từ khi nhận hàng.
            </div>
            <div className="text-[11px] text-[var(--muted)] mt-1">
              Hóa đơn này là chứng từ hợp lệ. Mã đơn: <strong>{invoiceId}</strong>
            </div>
          </div>
          <div className="text-center">
            <div className="text-[11px] text-[var(--muted)] mb-2">Quét QR xem điểm thưởng</div>
            <div className="w-[64px] h-[64px] bg-[var(--background)] border border-[var(--border)] rounded-lg flex items-center justify-center mx-auto">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-[var(--muted)]">
                <rect x="3" y="3" width="7" height="7" />
                <rect x="14" y="3" width="7" height="7" />
                <rect x="3" y="14" width="7" height="7" />
                <path d="M14 14h3v3h-3z" />
                <path d="M17 17h4v4h-4z" />
              </svg>
            </div>
            <div className="text-[10px] text-[var(--muted)] mt-1">MilktyWay.vn/loyalty</div>
          </div>
        </div>
      </div>
    </div>
  );
}

