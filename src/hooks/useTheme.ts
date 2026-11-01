import { useState } from "react";

export function useTheme() {
    const [isDark, setIsDark] = useState(() =>
        document.documentElement.classList.contains("dark"),
    );

    function toggleTheme() {
        const next = !document.documentElement.classList.contains("dark");

        document.documentElement.classList.toggle("dark", next);
        setIsDark(next);

        try {
            localStorage.setItem("sf_theme", next ? "dark" : "light");
        } catch {
            // Theme vẫn hoạt động nếu trình duyệt không cho lưu localStorage.
        }
    }

    return { isDark, toggleTheme };
}