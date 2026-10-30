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
]);

export default defineConfig({
    plugins: [
        {
            name: "react-page-routing",
            configureServer(server) {
                server.middlewares.use((req, res, next) => {
                    const pathname = (req.url ?? "/").split("?")[0];

                    if (
                        req.headers.accept?.includes("text/html") &&
                        reactRoutes.has(pathname.replace(/\/$/, ""))
                    ) {
                        req.url = "/index.html";
                    }

                    next();
                });
            },
        },
    ],
});