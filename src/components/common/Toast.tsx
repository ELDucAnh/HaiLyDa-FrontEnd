import { useEffect } from "react";
import type { ToastItem } from "./toast-context";

export interface ToastProps {
    item: ToastItem;
    onDismiss: (id: string) => void;
}

const toastClasses = {
    success: "toast-success",
    error: "toast-error",
    warning: "toast-warning",
    info: "toast-info",
};

const iconPaths = {
    success: "m5 12 4 4L19 6",
    error: "m6 6 12 12M18 6 6 18",
    warning: "M12 8v5M12 16h.01M3 20h18L12 3 3 20Z",
    info: "M12 11v6M12 7h.01",
};

export default function Toast({ item, onDismiss }: ToastProps) {
    useEffect(() => {
        if (item.duration <= 0) return;

        const timer = window.setTimeout(
            () => onDismiss(item.id),
            item.duration,
        );

        return () => window.clearTimeout(timer);
    }, [item.id, item.duration, onDismiss]);

    return (
        <div
            className={`toast ${toastClasses[item.variant]}`}
            role={item.variant === "error" ? "alert" : "status"}
            aria-atomic="true"
            style={{ minWidth: 0, maxWidth: "100%", width: "100%" }}
        >
            <div className="toast-icon" aria-hidden="true">
                <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    {item.variant === "info" && <circle cx="12" cy="12" r="9" />}
                    <path d={iconPaths[item.variant]} />
                </svg>
            </div>

            <div className="min-w-0 flex-1 pr-4">
                <div className="text-[13px] font-semibold text-[var(--text)]">
                    {item.title}
                </div>
                <div className="mt-1 break-words text-xs text-[var(--muted)]">
                    {item.message}
                </div>
            </div>

            <button
                type="button"
                className="toast-close"
                aria-label="Đóng thông báo"
                onClick={() => onDismiss(item.id)}
            >
                ×
            </button>
        </div>
    );
}