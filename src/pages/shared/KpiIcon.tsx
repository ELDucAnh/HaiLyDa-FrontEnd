import type { ReactNode } from "react";

export type KpiIconKind =
    | "balance"
    | "box"
    | "branch"
    | "cart"
    | "clipboard"
    | "clock"
    | "clock-compact"
    | "cup"
    | "document-check"
    | "factory"
    | "grid"
    | "receipt"
    | "ruler"
    | "transfer"
    | "truck"
    | "warning"
    | "currency";

interface KpiIconProps {
    kind: KpiIconKind;
    size?: 18 | 20;
    strokeWidth?: 1.8 | 2;
}

const paths: Record<KpiIconKind, ReactNode> = {
    balance: <><path d="M12 3v18M5 6h14M7 6l-4 7h8L7 6Zm10 0-4 7h8l-4-7ZM6 21h12" /></>,
    box: <><path d="m12 3 9 5-9 5-9-5 9-5Z" /><path d="m3 8 9 5 9-5M3 8v9l9 5 9-5V8M12 13v9" /></>,
    branch: <path d="M3 21h18M5 21V7l7-4 7 4v14M9 10h.01M15 10h.01M9 14h.01M15 14h.01" />,
    cart: <><circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" /><path d="M1 1h4l2.7 13.4a2 2 0 0 0 2 1.6h9.7a2 2 0 0 0 2-1.6L23 6H6" /></>,
    clipboard: <><rect x="5" y="4" width="14" height="17" rx="2" /><path d="M9 4V2h6v2M8 10h8M8 14h8M8 18h4" /></>,
    clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
    "clock-compact": <><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></>,
    cup: <path d="M6 7h12l-1 14H7L6 7ZM9 7l2-4M5 4l14 4M9 12h6" />,
    "document-check": <><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><path d="M14 2v6h6M8 14l2.5 2.5L16 11" /></>,
    factory: <><path d="M3 21h18M4 21V9l6 4V9l6 4V6h4v15" /><path d="M17 6V3h3v3M8 17h.01M13 17h.01M18 17h.01" /></>,
    grid: <><rect x="3" y="4" width="8" height="7" rx="1" /><rect x="13" y="4" width="8" height="7" rx="1" /><rect x="3" y="13" width="8" height="7" rx="1" /><rect x="13" y="13" width="8" height="7" rx="1" /></>,
    receipt: <><path d="M4 3h16v18l-3-2-3 2-4-2-3 2-3-2V3Z" /><path d="M8 8h8M8 12h8M8 16h3" /></>,
    ruler: <path d="M4 4h16v16H4zM8 4v4m4-4v2m4-2v4m-8 8v4m4-4v2m4-2v4" />,
    transfer: <path d="M17 3l4 4-4 4M3 7h18M7 21l-4-4 4-4m14 4H3" />,
    truck: <><path d="M3 7h13v11H3zM16 11h3l3 3v4h-6z" /><circle cx="7.5" cy="18.5" r="1.5" /><circle cx="18.5" cy="18.5" r="1.5" /></>,
    warning: <><path d="M12 3 2.8 20h18.4L12 3Z" /><path d="M12 9v5m0 3h.01" /></>,
    currency: <><circle cx="12" cy="12" r="9" /><path d="M16 8.5c-.7-.8-1.8-1.2-3.2-1.2-1.7 0-2.8.8-2.8 2s1 1.8 2.8 2.2 2.8 1 2.8 2.2-1.1 2-2.9 2c-1.4 0-2.6-.5-3.4-1.4M12 5.5v13" /></>,
};

export default function KpiIcon({ kind, size = 20, strokeWidth = 1.8 }: KpiIconProps) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            focusable="false"
        >
            {paths[kind]}
        </svg>
    );
}
