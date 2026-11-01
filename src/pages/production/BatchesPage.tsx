import { useMemo, useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import StatCard from "../../components/common/StatCard";
import KpiIcon from "../shared/KpiIcon";
import Badge from "../../components/common/Badge";
import DataTable from "../../components/common/DataTable";
import Modal from "../../components/common/Modal";
import { useToast } from "../../contexts/ToastContext";
import { makeId } from "../shared/formatters";

type Shift="Ca sáng"|"Ca chiều"|"Ca tối";
type BatchStatus="planned"|"processing"|"completed"|"held";
interface Batch {id:string;code:string;product:string;shift:Shift;start:string;planned:number;actual:number|null;waste:number|null;unit:string;status:BatchStatus;}
const LABEL:Record<BatchStatus,string>={planned:"Đã lên kế hoạch",processing:"Đang chế biến",completed:"Hoàn thành",held:"Tạm giữ"};
const INITIAL:Batch[]=[
{id:"1",code:"ME-2810-01",product:"Mẻ cốt hồng trà",shift:"Ca sáng",start:"06:00",planned:20,actual:19.4,waste:0.6,unit:"lít",status:"completed"},
{id:"2",code:"ME-2810-02",product:"Mẻ nước đường mía",shift:"Ca sáng",start:"06:30",planned:12,actual:12,waste:0,unit:"lít",status:"completed"},
{id:"3",code:"ME-2810-03",product:"Mẻ trân châu đen",shift:"Ca chiều",start:"13:00",planned:8,actual:null,waste:null,unit:"kg",status:"processing"},
{id:"4",code:"ME-2810-04",product:"Mẻ trà nền",shift:"Ca tối",start:"17:00",planned:15,actual:null,waste:null,unit:"lít",status:"planned"},
];
export default function BatchesPage(){const navigate=useNavigate();const {showToast}=useToast();const [batches,setBatches]=useState(INITIAL);const [search,setSearch]=useState("");const [shift,setShift]=useState("all");const [status,setStatus]=useState("all");const [applied,setApplied]=useState({search:"",shift:"all",status:"all"});const [modalOpen,setModalOpen]=useState(false);const [form,setForm]=useState({code:"",product:"Cốt trà",shift:"Ca sáng" as Shift,start:"06:00",planned:"",unit:"lít"});
const rows=useMemo(()=>batches.filter(b=>(!applied.search||b.code.toLowerCase().includes(applied.search.toLowerCase())||b.product.toLowerCase().includes(applied.search.toLowerCase()))&&(applied.shift==="all"||b.shift===applied.shift)&&(applied.status==="all"||b.status===applied.status)),[batches,applied]);
function changeStatus(batch:Batch,next:BatchStatus){setBatches(prev=>prev.map(b=>b.id===batch.id?{...b,status:next,actual:next==="completed"?(b.actual??b.planned):b.actual,waste:next==="completed"?(b.waste??0):b.waste}:b));showToast({type:"success",title:"Đã cập nhật trạng thái mẻ",message:`${batch.code}: ${LABEL[next]}.`});}
function submit(e:FormEvent){e.preventDefault();const planned=Number(form.planned);if(!form.code.trim()||!form.product.trim()||!Number.isFinite(planned)||planned<=0){showToast({type:"error",title:"Thông tin mẻ chưa hợp lệ",message:"Mã mẻ, thành phẩm và sản lượng kế hoạch là bắt buộc."});return;}setBatches(prev=>[{id:makeId("batch"),code:form.code,product:form.product,shift:form.shift,start:form.start,planned,actual:null,waste:null,unit:form.unit,status:"planned"},...prev]);setModalOpen(false);showToast({type:"success",title:"Đã tạo mẻ",message:"Mẻ mới đang ở trạng thái Đã lên kế hoạch."});}
  return (
    <div>
      <div className="page-header">
        <div>
          <nav className="breadcrumb" aria-label="Đường dẫn trang">
            <Link to="/dashboard">Trang chủ</Link>
            <span className="sep">/</span>
            <Link to="/production">Sản xuất &amp; Pha chế</Link>
            <span className="sep">/</span>
            <span className="current">Lô sản xuất</span>
          </nav>
          <h1 className="page-title">Quản lý mẻ chế biến</h1>
          <p className="page-subtitle mt-1">Theo dõi nguyên liệu đầu vào, sản lượng, hao hụt và trạng thái chất lượng của từng mẻ.</p>
        </div>
        <span className="text-xs text-[var(--muted)]">Dữ liệu minh họa</span>
      </div>

      <section className="mb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          <StatCard label="Mẻ trong ngày" value="12" subLabel="Dữ liệu minh họa" tone="info" icon={<KpiIcon kind="factory"/>}/>
          <StatCard label="Đang thực hiện" value={String(batches.filter(b=>b.status==="processing").length)} subLabel="Đang chế biến" tone="info" icon={<KpiIcon kind="clock"/>}/>
          <StatCard label="Hoàn thành" value={String(batches.filter(b=>b.status==="completed").length)} subLabel="Đã ghi nhận sản lượng" tone="success" icon={<KpiIcon kind="document-check"/>}/>
          <StatCard label="Hao hụt cần rà soát" value="1" subLabel="Cần giải trình" tone="warning" icon={<KpiIcon kind="warning"/>}/>
        </div>
      </section>

      <section className="card mb-6 border-l-4 border-[var(--info)]">
        <h2 className="text-sm font-bold mb-1">Theo dõi mẻ chế biến</h2>
        <p className="text-sm text-[var(--muted)]">Mỗi mẻ cần liên kết nguyên liệu đầu vào và lô, sản lượng thực tế, hao hụt, thời gian chế biến và nhân viên phụ trách. Chỉ mẻ đạt kiểm tra chất lượng mới được cấp phát.</p>
      </section>

      <section className="card mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 items-end">
          <div>
            <label className="form-label" htmlFor="batch-search">Tìm kiếm</label>
            <input id="batch-search" className="form-input" value={search} onChange={e=>setSearch(e.target.value)} placeholder="Mã mẻ hoặc thành phẩm..."/>
          </div>
          <div>
            <label className="form-label" htmlFor="batch-shift">Ca</label>
            <select id="batch-shift" className="form-input form-select" value={shift} onChange={e=>setShift(e.target.value)}>
              <option value="all">Tất cả ca</option>
              <option>Ca sáng</option>
              <option>Ca chiều</option>
              <option>Ca tối</option>
            </select>
          </div>
          <div>
            <label className="form-label" htmlFor="batch-status">Trạng thái</label>
            <select id="batch-status" className="form-input form-select" value={status} onChange={e=>setStatus(e.target.value)}>
              <option value="all">Tất cả</option>
              <option value="planned">Đã lên kế hoạch</option>
              <option value="processing">Đang chế biến</option>
              <option value="completed">Hoàn thành</option>
              <option value="held">Tạm giữ</option>
            </select>
          </div>
          <div className="flex gap-2">
            <button className="btn btn-secondary" onClick={()=>{setSearch("");setShift("all");setStatus("all");setApplied({search:"",shift:"all",status:"all"});}}>Xóa lọc</button>
            <button className="btn btn-primary" onClick={()=>setApplied({search,shift,status})}>Áp dụng</button>
          </div>
        </div>
      </section>

      <section className="card p-0 overflow-hidden">
        <div className="p-4 md:p-5 border-b border-[var(--border)] flex flex-wrap justify-between gap-3">
          <div>
            <h2 className="font-bold">Danh sách mẻ chế biến</h2>
            <p className="text-sm text-[var(--muted)] mt-1">Sản lượng và hao hụt được ghi nhận sau khi kết thúc mẻ.</p>
          </div>
          <button className="btn btn-primary" onClick={()=>setModalOpen(true)}>+ Ghi nhận mẻ</button>
        </div>
        <DataTable>
          <table className="w-full text-sm text-left">
            <thead className="bg-[var(--background)] text-[var(--muted)]">
              <tr>
                {["Mã mẻ","Nguyên liệu / thành phẩm","Ca","Bắt đầu","Sản lượng kế hoạch","Thực tế","Hao hụt","Trạng thái","Thao tác"].map(x=><th key={x} className="px-3 py-3 font-semibold">{x}</th>)}
              </tr>
            </thead>
            <tbody>
              {rows.map(b=><tr key={b.id} className="border-t border-[var(--border)]">
                <td className="px-3 py-3 font-semibold">{b.code}</td>
                <td className="px-3 py-3">{b.product}</td>
                <td className="px-3 py-3">{b.shift}</td>
                <td className="px-3 py-3">{b.start}</td>
                <td className="px-3 py-3">{b.planned} {b.unit}</td>
                <td className="px-3 py-3">{b.actual===null?"—":`${b.actual} ${b.unit}`}</td>
                <td className="px-3 py-3">{b.waste===null?"—":`${b.waste} ${b.unit}`}</td>
                <td className="px-3 py-3"><Badge variant={b.status==="completed"?"success":b.status==="held"?"danger":b.status==="processing"?"info":"warning"}>{LABEL[b.status]}</Badge></td>
                <td className="px-3 py-3">
                  <div className="flex gap-1">
                    {b.status==="planned"&&<button className="btn btn-secondary" onClick={()=>changeStatus(b,"processing")}>Bắt đầu</button>}
                    {b.status==="processing"&&<button className="btn btn-primary" onClick={()=>changeStatus(b,"completed")}>Hoàn thành</button>}
                    {b.status!=="completed"&&b.status!=="held"&&<button className="btn btn-secondary" onClick={()=>changeStatus(b,"held")}>Tạm giữ</button>}
                  </div>
                </td>
              </tr>)}
            </tbody>
          </table>
        </DataTable>
      </section>

      <Modal isOpen={modalOpen} title="Ghi nhận mẻ (mẫu biểu mẫu)" onClose={()=>setModalOpen(false)}>
        <form onSubmit={submit} className="space-y-3">
          <div>
            <label className="form-label" htmlFor="batch-code">Mã mẻ *</label>
            <input id="batch-code" className="form-input" value={form.code} onChange={e=>setForm(p=>({...p,code:e.target.value.toUpperCase()}))} required/>
          </div>
          <div>
            <label className="form-label" htmlFor="batch-product">Thành phẩm / bán thành phẩm *</label>
            <select id="batch-product" className="form-input form-select" value={form.product} onChange={e=>setForm(p=>({...p,product:e.target.value}))}>
              <option>Cốt trà</option>
              <option>Nước đường</option>
              <option>Trân châu</option>
            </select>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="form-label" htmlFor="batch-shift-new">Ca sản xuất</label>
              <select id="batch-shift-new" className="form-input form-select" value={form.shift} onChange={e=>setForm(p=>({...p,shift:e.target.value as Shift}))}>
                <option>Ca sáng</option>
                <option>Ca chiều</option>
                <option>Ca tối</option>
              </select>
            </div>
            <div>
              <label className="form-label" htmlFor="batch-start">Bắt đầu</label>
              <input id="batch-start" type="time" className="form-input" value={form.start} onChange={e=>setForm(p=>({...p,start:e.target.value}))}/>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="form-label" htmlFor="batch-plan">Sản lượng kế hoạch *</label>
              <input id="batch-plan" type="number" min="0.01" step="0.01" className="form-input" value={form.planned} onChange={e=>setForm(p=>({...p,planned:e.target.value}))} required/>
            </div>
            <div>
              <label className="form-label" htmlFor="batch-unit">Đơn vị</label>
              <select id="batch-unit" className="form-input form-select" value={form.unit} onChange={e=>setForm(p=>({...p,unit:e.target.value}))}>
                <option>lít</option>
                <option>kg</option>
              </select>
            </div>
          </div>
          <p className="text-xs text-[var(--muted)]">Chưa tự tính hao hụt hoặc tự thay đổi tồn nguyên liệu; chỉ mô phỏng trạng thái mẻ.</p>
          <div className="flex justify-end gap-2">
            <button type="button" className="btn btn-secondary" onClick={()=>setModalOpen(false)}>Hủy</button>
            <button type="submit" className="btn btn-primary">Lưu mẻ</button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
