import type { ReactNode } from "react";

export type StatTone =
    | "primary"
    | "success"
    | "warning"
    | "danger"
    | "info"
    | "purple";

export interface StatCardProps {
    label: string;
    value: ReactNode;
    icon: ReactNode;
    subLabel?: ReactNode;
    tone?: StatTone;
    trend?: "up" | "down";
    className?: string;
    valueClassName?: string;
}

const iconClasses: Record<StatTone, string> = {
    primary: "icon-bg-primary",
    success: "icon-bg-success",
    warning: "icon-bg-warning",
    danger: "icon-bg-danger",
    info: "icon-bg-info",
    purple: "icon-bg-purple",
};

export default function StatCard({
                                     label,
                                     value,
                                     icon,
                                     subLabel,
                                     tone = "primary",
                                     trend,
                                     className = "",
                                     valueClassName = "",
                                 }: StatCardProps) {
    const trendClass =
        trend === "up" ? "trend-up" : trend === "down" ? "trend-down" : "";

    return (
        <div className={`stat-card ${className}`}>
            <div
                className={`stat-card-icon ${iconClasses[tone]}`}
                aria-hidden="true"
            >
                {icon}
            </div>

            <div className="stat-card-body">
                <div className="stat-label">{label}</div>
                <div className={`stat-value ${valueClassName}`}>{value}</div>

                {subLabel !== undefined && (
                    <div className={`stat-sub-label ${trendClass}`}>{subLabel}</div>
                )}
            </div>
        </div>
    );
}