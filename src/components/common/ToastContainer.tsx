import { createPortal } from "react-dom";
import Toast from "./Toast";
import type { ToastItem } from "./toast-context";

export interface ToastContainerProps {
    items: readonly ToastItem[];
    onDismiss: (id: string) => void;
}

export default function ToastContainer({
                                           items,
                                           onDismiss,
                                       }: ToastContainerProps) {
    return createPortal(
        <div
            id="toast-container"
            className="fixed right-4 top-5 z-[200] flex w-[calc(100%-2rem)] max-w-[380px] flex-col gap-2.5"
            aria-label="Thông báo hệ thống"
        >
            {items.map((item) => (
                <Toast key={item.id} item={item} onDismiss={onDismiss} />
            ))}
        </div>,
        document.body,
    );
}