import { useState } from "react";
import type { FormEvent } from "react";
import { Link } from "react-router-dom";
import Badge from "../../components/common/Badge";
import type { BadgeVariant } from "../../components/common/Badge";
import StatCard from "../../components/common/StatCard";
import DataTable from "../../components/common/DataTable";
import type { DataTableColumn } from "../../components/common/DataTable";
import Modal from "../../components/common/Modal";
import ConfirmDialog from "../../components/common/ConfirmDialog";
import { useToast } from "../../components/common/useToast";

interface PreviewRow {
    id: string;
    name: string;
    description: string;
}

interface BadgeExample {
    variant: BadgeVariant;
    label: string;
}

const previewRows: readonly PreviewRow[] = Array.from(
    { length: 12 },
    (_, index) => ({
        id: `TEST-${String(index + 1).padStart(2, "0")}`,
        name: `Bản ghi kiểm tra ${index + 1}`,
        description:
            "Dữ liệu kiểm tra cách hiển thị bảng, chữ dài và phân trang.",
    }),
);

const columns: readonly DataTableColumn<PreviewRow>[] = [
    {
        id: "id",
        header: "Mã kiểm tra",
        className: "whitespace-nowrap",
        render: (row) => row.id,
    },
    {
        id: "name",
        header: "Tên bản ghi",
        render: (row) => (
            <div className="name-ellipsis" title={row.name}>
            {row.name}
            </div>
),
},
{
    id: "description",
        header: "Nội dung kiểm tra",
    render: (row) => row.description,
},
];

const badgeExamples: readonly BadgeExample[] = [
    { variant: "success", label: "Đã thanh toán" },
    { variant: "warning", label: "Chờ pha chế" },
    { variant: "danger", label: "Đã hủy" },
    { variant: "info", label: "Đang pha chế" },
    { variant: "purple", label: "VIP" },
    { variant: "gray", label: "Bản nháp" },
];

export default function ComponentsPreviewPage() {
    const toast = useToast();

    const [modalOpen, setModalOpen] = useState(false);
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [note, setNote] = useState("");
    const [loading, setLoading] = useState(false);
    const [empty, setEmpty] = useState(false);

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if (!note.trim()) {
            toast.warning("Vui lòng nhập nội dung kiểm tra.");
            return;
        }

        setModalOpen(false);
        setNote("");
        toast.success("Đã kiểm tra thao tác gửi biểu mẫu.", {
            title: "Kiểm tra hộp thoại",
        });
    }

    const icon = (
        <svg
            width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    >
    <path d="M4 19V5M4 19h16M8 15l4-5 4 3 4-7" />
        </svg>
);

    return (
        <>
            <div className="page-header">
        <div>
            <nav className="breadcrumb" aria-label="Đường dẫn trang">
    <Link to="/dashboard">Tổng quan</Link>
    <span className="sep" aria-hidden="true">/</span>
        <span className="current" aria-current="page">
        Kiểm tra component
    </span>
    </nav>

    <h1 className="page-title">Kiểm tra component dùng chung</h1>
    <p className="page-subtitle">
        Trang dành cho phát triển, không chứa dữ liệu nghiệp vụ.
    </p>
    </div>
    </div>

    <section className="mb-6" aria-labelledby="preview-stats-title">
    <h2 id="preview-stats-title" className="card-title mb-4">
        Thẻ thống kê
    </h2>

    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
    <StatCard
        label="Mẫu thẻ cơ bản"
    value="12"
    icon={icon}
    subLabel="Dữ liệu kiểm tra"
    />
    <StatCard
        label="Mẫu thông tin"
    value="24"
    icon={icon}
    tone="info"
    subLabel="Kiểm tra nội dung phụ"
    />
    <StatCard
        label="Mẫu xu hướng tăng"
    value="8"
    icon={icon}
    tone="success"
    trend="up"
    subLabel="↑ 8,2% — số liệu kiểm tra"
    />
    <StatCard
        label="Mẫu cảnh báo"
    value="2"
    icon={icon}
    tone="warning"
    subLabel="Không phải cảnh báo nghiệp vụ"
        />
        </div>
        </section>

        <section className="card mb-6" aria-labelledby="preview-badges-title">
    <h2 id="preview-badges-title" className="card-title mb-4">
        Nhãn trạng thái
    </h2>

    <div className="flex flex-wrap gap-3">
        {badgeExamples.map((example) => (
                <Badge key={example.variant} variant={example.variant}>
                {example.label}
                </Badge>
))}
    </div>
    </section>

    <section className="card mb-6" aria-labelledby="preview-table-title">
    <h2 id="preview-table-title" className="card-title mb-4">
        Bảng dữ liệu và phân trang
    </h2>

    <div className="mb-4 flex flex-wrap gap-4">
    <label className="flex items-center gap-2 text-sm">
    <input
        type="checkbox"
    checked={loading}
    onChange={(event) => setLoading(event.target.checked)}
    className="accent-[var(--primary)]"
        />
        Hiển thị trạng thái đang tải
    </label>

    <label className="flex items-center gap-2 text-sm">
    <input
        type="checkbox"
    checked={empty}
    onChange={(event) => setEmpty(event.target.checked)}
    className="accent-[var(--primary)]"
        />
        Hiển thị bảng rỗng
    </label>
    </div>

    <DataTable<PreviewRow>
    columns={columns}
    data={empty ? [] : previewRows}
    rowKey={(row) => row.id}
    caption="Bảng dữ liệu kiểm tra component"
    pageSize={5}
    loading={loading}
    />
    </section>

    <section className="card mb-6" aria-labelledby="preview-modal-title">
    <h2 id="preview-modal-title" className="card-title mb-4">
        Hộp thoại
    </h2>

    <div className="flex flex-wrap gap-3">
    <button
        type="button"
    className="btn btn-primary"
    onClick={() => setModalOpen(true)}
>
    Mở biểu mẫu
    </button>

    <button
    type="button"
    className="btn btn-danger"
    onClick={() => setConfirmOpen(true)}
>
    Kiểm tra xác nhận
    </button>
    </div>
    </section>

    <section className="card" aria-labelledby="preview-toast-title">
    <h2 id="preview-toast-title" className="card-title mb-4">
        Thông báo góc phải
    </h2>

    <div className="flex flex-wrap gap-3">
    <button
        type="button"
    className="btn btn-secondary"
    onClick={() => toast.success("Thông báo thành công mẫu.")}
>
    Thành công
    </button>
    <button
    type="button"
    className="btn btn-secondary"
    onClick={() => toast.warning("Thông báo cảnh báo mẫu.")}
>
    Cảnh báo
    </button>
    <button
    type="button"
    className="btn btn-secondary"
    onClick={() => toast.error("Thông báo lỗi mẫu.")}
>
    Lỗi
    </button>
    <button
    type="button"
    className="btn btn-secondary"
    onClick={() => toast.info("Thông báo thông tin mẫu.")}
>
    Thông tin
    </button>
    </div>
    </section>

    <Modal
    open={modalOpen}
    title="Kiểm tra biểu mẫu"
    onClose={() => setModalOpen(false)}
    footer={
    <>
    <button
        type="button"
    className="btn btn-secondary"
    onClick={() => setModalOpen(false)}
>
    Hủy
    </button>
    <button
    type="submit"
    form="preview-form"
    className="btn btn-primary"
        >
        Gửi kiểm tra
    </button>
    </>
}
>
    <form id="preview-form" onSubmit={handleSubmit}>
    <label className="form-label" htmlFor="preview-note">
        Nội dung kiểm tra
    </label>
    <input
    id="preview-note"
    className="form-input"
    value={note}
    onChange={(event) => setNote(event.target.value)}
    placeholder="Nhập nội dung bất kỳ"
    required
    />
    <p className="mt-3 text-sm text-[var(--muted)]">
        Thử phím Tab, Shift + Tab và Escape trong hộp thoại.
    </p>
    </form>
    </Modal>

    <ConfirmDialog
    open={confirmOpen}
    title="Xác nhận thao tác kiểm tra"
    message="Thao tác này chỉ kiểm tra hộp thoại, không xóa dữ liệu."
    confirmText="Xác nhận kiểm tra"
    variant="warning"
    onCancel={() => setConfirmOpen(false)}
    onConfirm={() => {
        setConfirmOpen(false);
        toast.success("Đã nhận thao tác xác nhận kiểm tra.");
    }}
    />
    </>
);
}