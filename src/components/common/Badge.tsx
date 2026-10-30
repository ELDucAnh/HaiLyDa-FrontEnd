import type { ReactNode } from "react";

export type BadgeVariant =
    | "success"
    | "warning"
    | "danger"
    | "info"
    | "purple"
    | "gray";

export interface BadgeProps {
    children: ReactNode;
    variant?: BadgeVariant;
    className?: string;
}

const variantClasses: Record<BadgeVariant, string> = {
    success: "badge-success",
    warning: "badge-warning",
    danger: "badge-danger",
    info: "badge-info",
    purple: "badge-purple",
    gray: "badge-gray",
};

export default function Badge({
                                  children,
                                  variant = "gray",
                                  className = "",
                              }: BadgeProps) {
    return (
        <span className={`badge ${variantClasses[variant]} ${className}`}>
      {children}
    </span>
    );
}