import { useCallback, useContext } from "react";
import { ToastContext } from "./toast-context";

export function useToast() {
    const context = useContext(ToastContext);

    if (!context) {
        throw new Error("useToast phải được sử dụng bên trong ToastProvider.");
    }

    const showToast = useCallback(
        (toast: {
            type: "success" | "error" | "warning" | "info";
            title: string;
            message: string;
        }) => {
            context[toast.type](toast.message, { title: toast.title });
        },
        [context],
    );

    return { ...context, showToast };
}
