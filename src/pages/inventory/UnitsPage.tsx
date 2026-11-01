import { useMemo, useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import StatCard from "../../components/common/StatCard";
import KpiIcon from "../shared/KpiIcon";
import Badge from "../../components/common/Badge";
import DataTable from "../../components/common/DataTable";
import Modal from "../../components/common/Modal";
import { useToast } from "../../contexts/ToastContext";
import { makeId } from "../shared/formatters";
interface UnitConversion {id:string;code:string;unit:string;baseUnit:string;factor:number;example:string;active:boolean;}
const INITIAL:UnitConversion[]=[
{id:"u1",code:"U-001",unit:"kg",baseUnit:"gram",factor:1000,example:"2 kg = 2.000 gram",active:true},
{id:"u2",code:"U-002",unit:"lít",baseUnit:"ml",factor:1000,example:"1,5 lít = 1.500 ml",active:true},
{id:"u3",code:"U-003",unit:"thùng",baseUnit:"cái",factor:24,example:"2 thùng = 48 cái",active:true},
{id:"u4",code:"U-004",unit:"hộp",baseUnit:"gram",factor:500,example:"3 hộp = 1.500 gram",active:true},
{id:"u5",code:"U-005",unit:"bịch",baseUnit:"gram",factor:1000,example:"1 bịch = 1 kg",active:true},
{id:"u6",code:"U-006",unit:"quả",baseUnit:"cái",factor:1,example:"1 quả dừa = 1 quả",active:true},
{id:"u7",code:"U-007",unit:"phần",baseUnit:"gram",factor:0,example:"1 phần trân châu",active:false},
{id:"u8",code:"U-008",unit:"ly",baseUnit:"cái",factor:1,example:"1 ly = 1 cái",active:true},
];
export default function UnitsPage(){const navigate=useNavigate();const {showToast}=useToast();const [items,setItems]=useState(INITIAL);const [modalOpen,setModalOpen]=useState(false);const [form,setForm]=useState({unit:"",baseUnit:"ml",factor:"1",example:""});const [search,setSearch]=useState("");const rows=useMemo(()=>items.filter(u=>!search||[u.code,u.unit,u.baseUnit].some(v=>v.toLowerCase().includes(search.toLowerCase()))),[items,search]);
function submit(e:FormEvent){e.preventDefault();const factor=Number(form.factor);if(!form.unit.trim()||!Number.isFinite(factor)||factor<=0){showToast({type:"error",title:"Hệ số không hợp lệ",message:"Tên đơn vị bắt buộc và hệ số quy đổi phải lớn hơn 0."});return;}if(items.some(u=>u.unit.toLowerCase()===form.unit.trim().toLowerCase())){showToast({type:"error",title:"Đơn vị đã tồn tại",message:"Không tạo hai đơn vị cùng tên nhưng khác nghĩa."});return;}setItems(prev=>[...prev,{id:makeId("unit"),code:`U-${String(prev.length+1).padStart(3,"0")}`,unit:form.unit.trim(),baseUnit:form.baseUnit,factor,example:form.example||`1 ${form.unit} = ${factor} ${form.baseUnit}`,active:true}]);setModalOpen(false);setForm({unit:"",baseUnit:"ml",factor:"1",example:""});showToast({type:"success",title:"Đã thêm đơn vị",message:"Đơn vị mới được thêm vào dữ liệu mô phỏng."});}
  return (
    <div>
      <div className="page-header">
        <div>
          <nav className="breadcrumb" aria-label="Đường dẫn trang">
            <Link to="/dashboard">Trang chủ</Link>
            <span className="sep">/</span>
            <Link to="/inventory">Kho hàng</Link>
            <span className="sep">/</span>
            <span className="current">Đơn vị tính</span>
          </nav>
          <h1 className="page-title">Đơn vị tính &amp; quy đổi</h1>
          <p className="page-subtitle mt-1">Quản lý kg–gram, lít–ml, thùng, hộp, bịch, quả, ly và phần topping.</p>
        </div>
        <span className="text-xs text-[var(--muted)]">Dữ liệu minh họa</span>
      </div>

      <section className="mb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          <StatCard label="Đơn vị cơ sở" value="9" subLabel="Đơn vị quy đổi chuẩn" tone="info" icon={<KpiIcon kind="ruler"/>}/>
          <StatCard label="Quy đổi đã khai báo" value={String(items.length)} subLabel="Hệ số phải lớn hơn 0" tone="primary" icon={<KpiIcon kind="balance"/>}/>
          <StatCard label="Đang dùng" value={String(items.filter(x=>x.active).length)} subLabel="Có liên kết nguyên liệu" tone="success" icon={<KpiIcon kind="document-check"/>}/>
          <StatCard label="Cần kiểm tra" value={String(items.filter(x=>x.factor<=0).length)} subLabel="Không có hệ số hợp lệ" tone="warning" icon={<KpiIcon kind="warning"/>}/>
        </div>
      </section>

      <section className="card mb-6 border-l-4 border-[var(--info)]">
        <h2 className="text-sm font-bold mb-1">Quy tắc đơn vị</h2>
        <p className="text-sm text-[var(--muted)]">Lưu tồn kho bằng đơn vị cơ sở thống nhất; hệ số quy đổi phải lớn hơn 0 và không tự đổi số dư tồn hiện có khi thay đổi hệ số.</p>
      </section>

      <section className="card p-0 overflow-hidden">
        <div className="p-4 md:p-5 border-b border-[var(--border)] flex flex-wrap justify-between gap-3">
          <div>
            <h2 className="font-bold">Đơn vị và hệ số quy đổi</h2>
            <p className="text-sm text-[var(--muted)] mt-1">Ví dụ dữ liệu quy đổi cho nguyên liệu trà sữa.</p>
          </div>
          <button className="btn btn-primary" onClick={()=>setModalOpen(true)}>+ Thêm đơn vị</button>
        </div>
        <div className="p-4">
          <label className="form-label" htmlFor="unit-search">Tìm đơn vị</label>
          <input id="unit-search" className="form-input max-w-md" value={search} onChange={e=>setSearch(e.target.value)} placeholder="Mã hoặc tên đơn vị..."/>
        </div>
        <DataTable>
          <table className="w-full text-sm text-left">
            <thead className="bg-[var(--background)] text-[var(--muted)]">
              <tr>
                {["Mã","Đơn vị","Quy đổi sang","Hệ số","Ví dụ","Trạng thái"].map(x=><th key={x} className="px-4 py-3 font-semibold">{x}</th>)}
              </tr>
            </thead>
            <tbody>
              {rows.map(u=><tr key={u.id} className="border-t border-[var(--border)]">
                <td className="px-4 py-3 font-semibold">{u.code}</td>
                <td className="px-4 py-3">{u.unit}</td>
                <td className="px-4 py-3">{u.baseUnit}</td>
                <td className="px-4 py-3">{u.factor>0?u.factor.toLocaleString("vi-VN"):"Chưa xác minh"}</td>
                <td className="px-4 py-3">{u.example}</td>
                <td className="px-4 py-3"><Badge variant={u.active?"success":"warning"}>{u.active?"Đang dùng":"Cần xác minh"}</Badge></td>
              </tr>)}
            </tbody>
          </table>
        </DataTable>
      </section>

      <Modal isOpen={modalOpen} title="Thêm đơn vị (mẫu)" onClose={()=>setModalOpen(false)}>
        <form className="space-y-4" onSubmit={submit}>
          <div>
            <label className="form-label" htmlFor="unit-name">Tên đơn vị *</label>
            <input id="unit-name" className="form-input" value={form.unit} onChange={e=>setForm(p=>({...p,unit:e.target.value}))} required/>
          </div>
          <div>
            <label className="form-label" htmlFor="unit-base">Đơn vị cơ sở</label>
            <select id="unit-base" className="form-input form-select" value={form.baseUnit} onChange={e=>setForm(p=>({...p,baseUnit:e.target.value}))}>
              <option value="ml">ml</option>
              <option value="gram">gram</option>
              <option value="cái">cái</option>
              <option value="phần">phần</option>
            </select>
          </div>
          <div>
            <label className="form-label" htmlFor="unit-factor">Hệ số quy đổi *</label>
            <input id="unit-factor" type="number" step="0.0001" min="0.0001" className="form-input" value={form.factor} onChange={e=>setForm(p=>({...p,factor:e.target.value}))} required/>
          </div>
          <div>
            <label className="form-label" htmlFor="unit-example">Ví dụ</label>
            <input id="unit-example" className="form-input" value={form.example} onChange={e=>setForm(p=>({...p,example:e.target.value}))}/>
          </div>
          <p className="text-xs text-[var(--muted)]">Không tạo hai đơn vị có cùng tên nhưng khác nghĩa; các hệ số cần được thống nhất với dữ liệu nguyên liệu.</p>
          <div className="flex justify-end gap-2">
            <button type="button" className="btn btn-secondary" onClick={()=>setModalOpen(false)}>Hủy</button>
            <button type="submit" className="btn btn-primary">Lưu đơn vị</button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
