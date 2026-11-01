import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "../../components/common/useToast";

export default function ResetPasswordPage() {
  const toast = useToast();
  const navigate = useNavigate();

  const [newPw, setNewPw] = useState("");
  const [confirmPw, setConfirmPw] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (newPw !== confirmPw) {
      toast.error("Mật khẩu xác nhận không khớp.");
      return;
    }
    if (newPw.length < 8) {
      toast.error("Mật khẩu phải chứa ít nhất 8 ký tự.");
      return;
    }

    toast.success("Đã cập nhật mật khẩu mới thành công! Vui lòng đăng nhập lại.", {
      title: "Thành Công",
    });

    setTimeout(() => {
      navigate("/login");
    }, 1200);
  }

  return (
    <div className="w-full max-w-[420px] p-4">
      <div className="auth-card shadow-xl">
        <div className="text-center mb-6">
          <div className="stat-icon icon-bg-primary w-16 h-16 rounded-[20px] mx-auto mb-4 flex items-center justify-center">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2">
              <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4" />
            </svg>
          </div>
          <h1 className="auth-title text-xl font-bold">Đặt Lại Mật Khẩu</h1>
          <p className="auth-subtitle text-xs text-[var(--muted)]">
            Thiết lập mật khẩu mới cho tài khoản nhân sự MilktyWay.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="form-label" htmlFor="new-pw">
              Mật Khẩu Mới <span className="text-red-500">*</span>
            </label>
            <input
              id="new-pw"
              type="password"
              className="form-input"
              placeholder="Tối thiểu 8 ký tự..."
              value={newPw}
              onChange={(e) => setNewPw(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="form-label" htmlFor="confirm-pw">
              Xác Nhận Mật Khẩu Mới <span className="text-red-500">*</span>
            </label>
            <input
              id="confirm-pw"
              type="password"
              className="form-input"
              placeholder="••••••••"
              value={confirmPw}
              onChange={(e) => setConfirmPw(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary btn-lg w-full justify-center mt-1">
            Cập Nhật Mật Khẩu Mới
          </button>
        </form>

        <div className="text-center mt-5">
          <Link
            to="/login"
            className="text-[13px] text-[#22B573] font-medium no-underline hover:underline"
          >
            ← Quay lại Đăng Nhập
          </Link>
        </div>
      </div>
    </div>
  );
}

