import { defineConfig } from "vite";

const reactRoutes = new Set([
    "/dashboard",
    "/sales",
    "/sales/pos",
    "/sales/returns",
    "/sales/shifts",
    "/sales/preparation",
    "/customers",
    "/marketing/promotions",
    "/inventory/products",
    "/inventory/products/new",
    "/inventory/ingredients",
    "/inventory/branches",
    "/inventory/categories",
    "/inventory/units",
    "/inventory/stock-adjustment",
    "/production/recipes",
    "/production/batches",
    "/purchases",
    "/purchases/new",
    "/purchases/transfers",
    "/purchases/receipts",
    "/distribution/planning",
    "/stores/ingredients",
    "/stores/shift-reconciliation",
]);

export default defineConfig({
    plugins: [
        {
            name: "react-page-routing",
            configureServer(server) {
                server.middlewares.use((req, res, next) => {
                    const pathname = (req.url ?? "/").split("?")[0];

                    const normalizedPath = pathname.replace(/\/$/, "");
                    const isProductDetailsRoute = /^\/inventory\/products\/[^/]+$/.test(normalizedPath)
                        && normalizedPath !== "/inventory/products/new";

                    if (
                        req.headers.accept?.includes("text/html") &&
                        (reactRoutes.has(normalizedPath) || isProductDetailsRoute)
                    ) {
                        req.url = "/index.html";
                    }

                    next();
                });
            },
        },
    ],
});
