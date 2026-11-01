import { useState } from "react";
import type { Key, ReactNode } from "react";

export interface DataTableColumn<T> {
    id: string;
    header: ReactNode;
    render: (row: T) => ReactNode;
    className?: string;
}

export interface DataTableProps<T> {
    columns: readonly DataTableColumn<T>[];
    data: readonly T[];
    rowKey: (row: T) => Key;
    caption: string;
    pageSize?: number;
    pagination?: boolean;
    loading?: boolean;
    emptyMessage?: string;
}

export default function DataTable<T>({
                                         columns,
                                         data,
                                         rowKey,
                                         caption,
                                         pageSize = 10,
                                         pagination = true,
                                         loading = false,
                                         emptyMessage = "Không có dữ liệu phù hợp.",
                                     }: DataTableProps<T>) {
    const [requestedPage, setRequestedPage] = useState(1);

    const size = Number.isFinite(pageSize)
        ? Math.max(1, Math.floor(pageSize))
        : 10;

    const totalPages = Math.max(1, Math.ceil(data.length / size));
    const currentPage = Math.min(requestedPage, totalPages);
    const start = pagination ? (currentPage - 1) * size : 0;
    const rows = pagination ? data.slice(start, start + size) : data;

    const firstPage = Math.max(
        1,
        Math.min(currentPage - 2, totalPages - 4),
    );

    const pageNumbers = Array.from(
        { length: Math.min(5, totalPages) },
        (_, index) => firstPage + index,
    );

    return (
        <div className="min-w-0" aria-busy={loading}>
            <div className="overflow-x-auto">
                <table className="data-table">
                    <caption className="sr-only">{caption}</caption>

                    <thead>
                    <tr>
                        {columns.map((column) => (
                            <th
                                key={column.id}
                                scope="col"
                                className={column.className}
                            >
                                {column.header}
                            </th>
                        ))}
                    </tr>
                    </thead>

                    <tbody>
                    {loading ? (
                        <tr>
                            <td colSpan={columns.length}>
                                <div className="py-6 text-center text-[var(--muted)]">
                                    Đang tải dữ liệu...
                                </div>
                            </td>
                        </tr>
                    ) : rows.length === 0 ? (
                        <tr>
                            <td colSpan={columns.length}>
                                <div className="py-6 text-center text-[var(--muted)]">
                                    {emptyMessage}
                                </div>
                            </td>
                        </tr>
                    ) : (
                        rows.map((row) => (
                            <tr key={rowKey(row)}>
                                {columns.map((column) => (
                                    <td key={column.id} className={column.className}>
                                        {column.render(row)}
                                    </td>
                                ))}
                            </tr>
                        ))
                    )}
                    </tbody>
                </table>
            </div>

            {pagination && !loading && (
                <div className="table-footer">
                    <div className="table-footer-info">
                        Hiển thị {data.length === 0 ? 0 : start + 1}
                        –{Math.min(start + size, data.length)} / {data.length}
                    </div>

                    <nav className="pagination" aria-label={`Phân trang ${caption}`}>
                        <button
                            type="button"
                            className="page-btn"
                            disabled={currentPage === 1}
                            aria-label="Trang trước"
                            onClick={() => setRequestedPage(currentPage - 1)}
                        >
                            ‹
                        </button>

                        {pageNumbers.map((page) => (
                            <button
                                key={page}
                                type="button"
                                className={`page-btn ${page === currentPage ? "active" : ""}`}
                                aria-label={`Trang ${page}`}
                                aria-current={page === currentPage ? "page" : undefined}
                                onClick={() => setRequestedPage(page)}
                            >
                                {page}
                            </button>
                        ))}

                        <button
                            type="button"
                            className="page-btn"
                            disabled={currentPage === totalPages}
                            aria-label="Trang sau"
                            onClick={() => setRequestedPage(currentPage + 1)}
                        >
                            ›
                        </button>
                    </nav>
                </div>
            )}
        </div>
    );
}