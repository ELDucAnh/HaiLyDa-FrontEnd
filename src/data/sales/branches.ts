export interface SalesBranch { id: string; name: string; }
export const salesBranches: readonly SalesBranch[] = Array.from({ length: 12 }, (_, index) => {
 const number = String(index + 1).padStart(2, "0");
 return { id: `CN${number}`, name: `Chi nhánh ${number}` };
});
