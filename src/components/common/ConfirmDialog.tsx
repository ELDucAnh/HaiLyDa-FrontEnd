import type { ReactNode } from "react";
import Modal from "./Modal";

export interface ConfirmDialogProps {
    open: boolean;
    title: string;
    message: ReactNode;
    onConfirm: () => void;
    onCancel: () => void;
    confirmText?: string;
    cancelText?: string;
    variant?: "danger" | "warning" | "primary";
}

const buttonClasses = {
    danger: "btn-danger",
    warning: "btn-warning",
    primary: "btn-primary",
};

export default function ConfirmDialog({
                                          open,
                                          title,
                                          message,
                                          onConfirm,
                                          onCancel,
                                          confirmText = "Xác nhận",
                                          cancelText = "Hủy",
                                          variant = "danger",
                                      }: ConfirmDialogProps) {
    return (
        <Modal
            open={open}
            title={title}
            onClose={onCancel}
            size="sm"
            closeOnBackdrop={false}
            footer={
                <>
                    <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={onCancel}
                    >
                        {cancelText}
                    </button>
                    <button
                        type="button"
                        className={`btn ${buttonClasses[variant]}`}
                        onClick={onConfirm}
                    >
                        {confirmText}
                    </button>
                </>
            }
        >
            <div className="text-sm leading-6 text-[var(--muted)]">
                {message}
            </div>
        </Modal>
    );
}