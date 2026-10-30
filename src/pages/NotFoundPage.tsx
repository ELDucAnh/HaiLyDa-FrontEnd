import { Link } from "react-router-dom";

export default function NotFoundPage() {
    return (
        <section className="card" aria-labelledby="not-found-title">
            <p className="mb-2 text-sm font-semibold text-[var(--primary)]">
                Lỗi 404
            </p>

            <h1 id="not-found-title" className="page-title">
                Không tìm thấy trang
            </h1>

            <p className="page-subtitle">
                Đường dẫn không tồn tại hoặc chưa được đăng ký trong hệ thống.
            </p>

            <div className="mt-5">
                <Link to="/dashboard" className="btn btn-primary">
                    Về tổng quan
                </Link>
            </div>
        </section>
    );
}