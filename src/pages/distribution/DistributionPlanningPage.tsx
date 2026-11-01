import { useMemo, useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import StatCard from "../../components/common/StatCard";
import KpiIcon from "../shared/KpiIcon";
import Badge from "../../components/common/Badge";
import DataTable from "../../components/common/DataTable";
import Modal from "../../components/common/Modal";
import { useToast } from "../../contexts/ToastContext";
import { makeId } from "../shared/formatters";

type PlanStatus="draft"|"pending"|"approved";
type Shift="Ca sáng"|"Ca chiều"|"Ca tối";
interface DistributionPlan {id:string;code:string;branch:string;shift:Shift;expected:string;available:string;proposed:string;batch:string;status:PlanStatus;date:string;}
const BRANCHES=["CN01 · Bến Nghé","CN02 · Bàn Cờ","CN03 · Chợ Lớn","CN04 · Tân Hưng","CN05 · Hàng Xanh","CN06 · Làng Đại Học","CN07 · Bảy Hiền","CN08 · Cityland","CN09 · Phan Xích Long","CN10 · Bắc Hải","CN11 · Lãnh Binh Thăng","CN12 · Kênh Nước Đen"];
const INITIAL:DistributionPlan[]=[
{id:"1",code:"KH-2810-01",branch:BRANCHES[0],shift:"Ca sáng",expected:"120 ly",available:"18 lít nền trà",proposed:"8 lít nền trà",batch:"ME-2810-01",status:"approved",date:"2026-10-28"},
{id:"2",code:"KH-2810-02",branch:BRANCHES[4],shift:"Ca chiều",expected:"160 ly",available:"2 kg trân châu",proposed:"4 kg trân châu",batch:"ME-2810-03",status:"pending",date:"2026-10-28"},
{id:"3",code:"KH-2810-03",branch:BRANCHES[5],shift:"Ca tối",expected:"90 ly",available:"7 lít sữa",proposed:"6 lít sữa",batch:"ME-2810-04",status:"draft",date:"2026-10-29"},
{id:"4",code:"KH-2810-04",branch:BRANCHES[8],shift:"Ca sáng",expected:"110 ly",available:"Tồn đủ",proposed:"Không cấp thêm",batch:"—",status:"approved",date:"2026-10-30"},
];
const STATUS_LABEL:Record<PlanStatus,string>={draft:"Bản nháp",pending:"Chờ duyệt",approved:"Đã duyệt"};
export default function DistributionPlanningPage(){
 const navigate=useNavigate();const {showToast}=useToast();const [plans,setPlans]=useState(INITIAL);const [date,setDate]=useState("all");const [status,setStatus]=useState("all");const [applied,setApplied]=useState({date:"all",status:"all"});const [modalOpen,setModalOpen]=useState(false);const [form,setForm]=useState({date:"2026-10-31",branch:BRANCHES[0],shift:"Ca sáng" as Shift,cups:"",batch:"ME-2810-01",quantity:"",note:""});
 const rows=useMemo(()=>plans.filter(p=>(applied.date==="all"||p.date===applied.date)&&(applied.status==="all"||p.status===applied.status)),[plans,applied]);
 function submit(e:FormEvent){e.preventDefault();const cups=Number(form.cups);const quantity=Number(form.quantity);if(!form.date||!form.branch||cups<=0||quantity<0){showToast({type:"error",title:"Kế hoạch chưa hợp lệ",message:"Ngày, cửa hàng và số ly dự kiến là bắt buộc; lượng đề xuất không được âm."});return;}const item:DistributionPlan={id:makeId("plan"),code:`KH-${form.date.slice(8,10)}${form.date.slice(5,7)}-${String(plans.length+1).padStart(2,"0")}`,branch:form.branch,shift:form.shift,expected:`${cups} ly`,available:"Chưa nhập dữ liệu tồn",proposed:`${quantity} đơn vị`,batch:form.batch||"—",status:"draft",date:form.date};setPlans(prev=>[item,...prev]);setModalOpen(false);showToast({type:"success",title:"Đã lưu kế hoạch bản nháp",message:"Kế hoạch chưa được gửi duyệt và không tự động trừ tồn kho."});}
 function submitForApproval(plan:DistributionPlan){setPlans(prev=>prev.map(p=>p.id===plan.id?{...p,status:"pending"}:p));showToast({type:"success",title:"Đã gửi duyệt",message:`${plan.code} đang chờ quản lý duyệt.`});}
  return (
    <div>
      <div className="page-header">
        <div>
          <nav className="breadcrumb" aria-label="Đường dẫn trang">
            <Link to="/dashboard">Trang chủ</Link>
            <span className="sep">/</span>
            <span className="current">Kế hoạch phân phối</span>
          </nav>
          <h1 className="page-title">Kế hoạch phân phối</h1>
          <p className="page-subtitle mt-1">Lập kế hoạch cấp phát nguyên liệu đến cửa hàng theo ngày và ca sáng, chiều, tối.</p>
        </div>
        <span className="text-xs text-[var(--muted)]">Dữ liệu minh họa</span>
      </div>

      <section className="mb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          <StatCard label="Kế hoạch ngày" value="12" subLabel="Một kế hoạch mỗi cửa hàng" tone="info" icon={<KpiIcon kind="clipboard"/>}/>
          <StatCard label="Cửa hàng cần bổ sung" value="4" subLabel="Theo tồn an toàn" tone="warning" icon={<KpiIcon kind="warning"/>}/>
          <StatCard label="Mẻ cần chuẩn bị" value="9" subLabel="Sáng / chiều / tối" tone="info" icon={<KpiIcon kind="factory"/>}/>
          <StatCard label="Chưa xác nhận" value="2" subLabel="Chờ quản lý duyệt" tone="warning" icon={<KpiIcon kind="clock"/>}/>
        </div>
      </section>

      <section className="card mb-6 border-l-4 border-[var(--info)]">
        <h2 className="text-sm font-bold mb-1">Căn cứ lập kế hoạch</h2>
        <p className="text-sm text-[var(--muted)]">Kế hoạch cấp phát dựa trên nhu cầu từng cửa hàng, ca vận hành, tồn khả dụng, tồn an toàn và mẻ đã chuẩn bị. Đây là giao diện nhập/xem kế hoạch, không tự động dự báo nhu cầu.</p>
      </section>

      <section className="card mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
          <div>
            <label className="form-label" htmlFor="plan-date-filter">Ngày cấp phát</label>
            <select id="plan-date-filter" className="form-input form-select" value={date} onChange={e=>setDate(e.target.value)}>
              <option value="all">Tất cả ngày</option>
              <option value="2026-10-28">28/10/2026</option>
              <option value="2026-10-29">29/10/2026</option>
              <option value="2026-10-30">30/10/2026</option>
            </select>
          </div>
          <div>
            <label className="form-label" htmlFor="plan-status-filter">Trạng thái</label>
            <select id="plan-status-filter" className="form-input form-select" value={status} onChange={e=>setStatus(e.target.value)}>
              <option value="all">Tất cả</option>
              <option value="draft">Bản nháp</option>
              <option value="pending">Chờ duyệt</option>
              <option value="approved">Đã duyệt</option>
            </select>
          </div>
          <div className="flex gap-2">
            <button className="btn btn-secondary" onClick={()=>{setDate("all");setStatus("all");setApplied({date:"all",status:"all"});}}>Xóa lọc</button>
            <button className="btn btn-primary" onClick={()=>setApplied({date,status})}>Áp dụng</button>
          </div>
        </div>
      </section>

      <section className="card p-0 overflow-hidden">
        <div className="p-4 md:p-5 border-b border-[var(--border)] flex flex-wrap justify-between gap-3">
          <div>
            <h2 className="font-bold">Kế hoạch cấp phát theo cửa hàng và ca</h2>
            <p className="text-sm text-[var(--muted)] mt-1">Số liệu minh họa; điều chỉnh và phê duyệt theo phân quyền.</p>
          </div>
          <button className="btn btn-primary" onClick={()=>setModalOpen(true)}>+ Tạo kế hoạch</button>
        </div>
        <DataTable>
          <table className="w-full min-w-[950px] text-sm text-left">
            <thead className="bg-[var(--background)] text-[var(--muted)]">
              <tr>
                {["Mã kế hoạch","Cửa hàng","Ca","Nhu cầu dự kiến","Tồn khả dụng","Đề xuất cấp","Mẻ liên quan","Trạng thái","Thao tác"].map(x=><th key={x} className="px-3 py-3 font-semibold">{x}</th>)}
              </tr>
            </thead>
            <tbody>
              {rows.map(p=><tr key={p.id} className="border-t border-[var(--border)]">
                <td className="px-3 py-3 font-semibold">{p.code}</td>
                <td className="px-3 py-3">{p.branch}</td>
                <td className="px-3 py-3">{p.shift}</td>
                <td className="px-3 py-3">{p.expected}</td>
                <td className="px-3 py-3">{p.available}</td>
                <td className="px-3 py-3">{p.proposed}</td>
                <td className="px-3 py-3">{p.batch}</td>
                <td className="px-3 py-3"><Badge variant={p.status==="approved"?"success":p.status==="pending"?"warning":"info"}>{STATUS_LABEL[p.status]}</Badge></td>
                <td className="px-3 py-3">{p.status==="draft"&&<button className="btn btn-secondary" onClick={()=>submitForApproval(p)}>Gửi duyệt</button>}</td>
              </tr>)}
            </tbody>
          </table>
        </DataTable>
      </section>

      <Modal isOpen={modalOpen} title="Tạo kế hoạch cấp phát (mẫu)" onClose={()=>setModalOpen(false)}>
        <form className="space-y-3" onSubmit={submit}>
          <div>
            <label className="form-label" htmlFor="plan-date">Ngày cấp phát *</label>
            <input id="plan-date" type="date" className="form-input" value={form.date} onChange={e=>setForm(p=>({...p,date:e.target.value}))} required/>
          </div>
          <div>
            <label className="form-label" htmlFor="plan-branch">Cửa hàng *</label>
            <select id="plan-branch" className="form-input form-select" value={form.branch} onChange={e=>setForm(p=>({...p,branch:e.target.value}))}>{BRANCHES.map(b=><option key={b}>{b}</option>)}</select>
          </div>
          <div>
            <label className="form-label" htmlFor="plan-shift">Ca *</label>
            <select id="plan-shift" className="form-input form-select" value={form.shift} onChange={e=>setForm(p=>({...p,shift:e.target.value as Shift}))}>
              <option>Ca sáng</option>
              <option>Ca chiều</option>
              <option>Ca tối</option>
            </select>
          </div>
          <div>
            <label className="form-label" htmlFor="plan-cups">Số ly dự kiến *</label>
            <input id="plan-cups" type="number" min="1" className="form-input" value={form.cups} onChange={e=>setForm(p=>({...p,cups:e.target.value}))} required/>
          </div>
          <div>
            <label className="form-label" htmlFor="plan-batch">Món / mẻ liên quan</label>
            <select id="plan-batch" className="form-input form-select" value={form.batch} onChange={e=>setForm(p=>({...p,batch:e.target.value}))}>
              <option>ME-2810-01 · Cốt hồng trà</option>
              <option>ME-2810-03 · Trân châu</option>
              <option value="">Chưa xác định</option>
            </select>
          </div>
          <div>
            <label className="form-label" htmlFor="plan-quantity">Lượng đề xuất cấp *</label>
            <input id="plan-quantity" type="number" min="0" step="0.01" className="form-input" value={form.quantity} onChange={e=>setForm(p=>({...p,quantity:e.target.value}))} required/>
          </div>
          <div>
            <label className="form-label" htmlFor="plan-note">Ghi chú</label>
            <textarea id="plan-note" className="form-input form-textarea" rows={2} value={form.note} onChange={e=>setForm(p=>({...p,note:e.target.value}))}/>
          </div>
          <p className="text-xs text-[var(--muted)]">Kế hoạch lưu dạng bản nháp. Không tự động dự báo nhu cầu hoặc trừ tồn tại kho.</p>
          <div className="flex justify-end gap-2">
            <button type="button" className="btn btn-secondary" onClick={()=>setModalOpen(false)}>Hủy</button>
            <button type="submit" className="btn btn-primary">Lưu bản nháp</button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
