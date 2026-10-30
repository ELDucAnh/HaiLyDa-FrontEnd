const zone = "Asia/Ho_Chi_Minh";
export function formatCurrency(value: number): string {
 return Number.isFinite(value) ? new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND", maximumFractionDigits: 0 }).format(value) : "Chưa xác định";
}
export function formatDate(value: string | Date): string {
 const date = new Date(value);
 return Number.isNaN(date.getTime()) ? "Chưa xác định" : new Intl.DateTimeFormat("vi-VN", { timeZone: zone, day: "2-digit", month: "2-digit", year: "numeric" }).format(date);
}
export function formatDateTime(value: string | Date): string {
 const date = new Date(value);
 return Number.isNaN(date.getTime()) ? "Chưa xác định" : `${new Intl.DateTimeFormat("vi-VN", { timeZone: zone, hour: "2-digit", minute: "2-digit", hourCycle: "h23" }).format(date)} ${formatDate(date)}`;
}
/** Chuyển dd/MM/yyyy thành ngày ISO để so sánh và lưu trữ. */
export function parseVietnameseDate(value: string): string | null {
 const match = /^(\d{2})\/(\d{2})\/(\d{4})$/.exec(value.trim());
 if (!match) return null;
 const [, day, month, year] = match;
 const iso = `${year}-${month}-${day}`;
 const date = new Date(`${iso}T00:00:00Z`);
 return !Number.isNaN(date.getTime()) && date.toISOString().slice(0, 10) === iso ? iso : null;
}
