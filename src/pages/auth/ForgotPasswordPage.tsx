import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "../../components/common/useToast";

export default function ForgotPasswordPage() {
  const toast = useToast();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;

    toast.success("Đã gửi mã xác thực khôi phục mật khẩu vào hòm thư nội bộ!", {
      title: "Đã Gửi Thư",
    });

    setTimeout(() => {
      navigate("/reset-password");
    }, 1000);
  }

  return (
    <div className="w-full max-w-[420px] p-4">
      <div className="text-center mb-6">
        <Link
          to="/login"
          className="auth-back-link text-xs text-[var(--muted)] hover:text-[var(--primary)] inline-flex items-center justify-center gap-1"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polyline points="15 18 9 12 15 6" />
          </svg>
          Quay lại đăng nhập
        </Link>
      </div>

      <div className="auth-card text-center shadow-xl">
        <div className="stat-icon icon-bg-primary w-16 h-16 rounded-[20px] mx-auto mb-4 flex items-center justify-center">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
        </div>
        <h1 className="auth-title text-xl font-bold">Quên Mật Khẩu?</h1>
        <p className="auth-subtitle leading-relaxed mb-6 text-xs text-[var(--muted)]">
          Nhập địa chỉ email nội bộ của bạn để nhận mã xác thực đặt lại mật khẩu hệ thống.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-left">
          <div>
            <label className="form-label" htmlFor="forgot-email">
              Email Nội Bộ / Cá Nhân <span className="text-red-500">*</span>
            </label>
            <input
              id="forgot-email"
              type="email"
              className="form-input"
              placeholder="ten.nv@MilktyWay.vn"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary btn-lg w-full justify-center">
            Gửi Hướng Dẫn Khôi Phục
          </button>
        </form>
      </div>
    </div>
  );
}

