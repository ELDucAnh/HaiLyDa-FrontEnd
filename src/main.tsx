import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "../assets/css/app.css";
import "./input.css";

const rootElement = document.getElementById("root");

if (!rootElement) {
    throw new Error("Không tìm thấy phần tử #root để khởi chạy ứng dụng.");
}

createRoot(rootElement).render(
    <StrictMode>
        <App />
    </StrictMode>,
);