import { createContext } from "react";

export type ToastVariant = "success" | "error" | "warning" | "info";

export interface ToastItem {
    id: string;
    variant: ToastVariant;
    title: string;
    message: string;
    duration: number;
}

export interface ToastOptions {
    title?: string;
    duration?: number;
}

export interface ToastApi {
    success: (message: string, options?: ToastOptions) => void;
    error: (message: string, options?: ToastOptions) => void;
    warning: (message: string, options?: ToastOptions) => void;
    info: (message: string, options?: ToastOptions) => void;
}

export const ToastContext = createContext<ToastApi | null>(null);