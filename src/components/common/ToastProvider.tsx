import { useCallback, useMemo, useRef, useState } from "react";
import type { ReactNode } from "react";
import ToastContainer from "./ToastContainer";
import { ToastContext } from "./toast-context";
import type {
    ToastApi,
    ToastItem,
    ToastOptions,
    ToastVariant,
} from "./toast-context";

export interface ToastProviderProps {
    children: ReactNode;
}

const titles: Record<ToastVariant, string> = {
    success: "Thành công",
    error: "Có lỗi xảy ra",
    warning: "Cảnh báo",
    info: "Thông tin",
};

export default function ToastProvider({ children }: ToastProviderProps) {
    const [items, setItems] = useState<ToastItem[]>([]);
    const counter = useRef(0);

    const dismiss = useCallback((id: string) => {
        setItems((current) => current.filter((item) => item.id !== id));
    }, []);

    const show = useCallback(
        (
            variant: ToastVariant,
            message: string,
            options: ToastOptions = {},
        ) => {
            counter.current += 1;

            const item: ToastItem = {
                id: `toast-${counter.current}`,
                variant,
                title: options.title ?? titles[variant],
                message,
                duration: options.duration ?? 4000,
            };

            setItems((current) => [...current, item].slice(-5));
        },
        [],
    );

    const api = useMemo<ToastApi>(
        () => ({
            success: (message, options) => show("success", message, options),
            error: (message, options) => show("error", message, options),
            warning: (message, options) => show("warning", message, options),
            info: (message, options) => show("info", message, options),
        }),
        [show],
    );

    return (
        <ToastContext.Provider value={api}>
            {children}
            <ToastContainer items={items} onDismiss={dismiss} />
        </ToastContext.Provider>
    );
}