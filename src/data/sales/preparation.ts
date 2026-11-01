export type PreparationStatus = "waiting" | "preparing" | "ready";

export type PreparationChannel = "counter" | "takeaway" | "online";

export interface PreparationOrder {
    id: string;
    branchId: string;
    channel: PreparationChannel;
    receivedAt: string;
    waitingMinutes: number;
    itemSummary: string;
    optionSummary: string | null;
    note: string;
    status: PreparationStatus;
}

export interface PreparationFilters {
    branchId: string;
    status: PreparationStatus | "";
}

export const initialPreparationOrders: readonly PreparationOrder[] = [
    {
        id: "DH-00125",
        branchId: "CN01",
        channel: "online",
        receivedAt: "2026-10-28T09:15:00+07:00",
        waitingMinutes: 3,
        itemSummary: "2 × Trà sữa trân châu · Cỡ ly L",
        optionSummary: "Đường 50% · Ít đá · Thêm 1 phần pudding/ly",
        note: "Để món thêm riêng",
        status: "waiting",
    },
    {
        id: "DH-00124",
        branchId: "CN01",
        channel: "takeaway",
        receivedAt: "2026-10-28T09:12:00+07:00",
        waitingMinutes: 6,
        itemSummary:
            "1 × Trà đào · Cỡ ly M · Đường 30% · Đá bình thường",
        optionSummary: null,
        note: "Không có",
        status: "preparing",
    },
];

export function isPreparationStatus(
    value: string,
): value is PreparationStatus {
    return (
        value === "waiting" ||
        value === "preparing" ||
        value === "ready"
    );
}