import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import Badge from "../../components/common/Badge";
import DataTable from "../../components/common/DataTable";
import { useToast } from "../../contexts/ToastContext";
import { formatCurrency, makeId } from "../shared/formatters";

type ProductCategory = "milk-tea" | "fruit-tea" | "macchiato" | "topping" | "seasonal";
type ProductStatus = "active" | "branch-locked" | "inactive";
type RecipeSize = "M" | "L";
interface RecipeLine { id: string; ingredient: string; quantity: number; unit: string; note: string; }
interface ProductForm { name: string; sku: string; barcode: string; category: ProductCategory | ""; supplier: string; unit: string; status: ProductStatus; openingStock: number; minStock: number; maxStock: number; purchasePrice: number; sellingPrice: number; tax: number; discount: number; description: string; recipeSize: RecipeSize; recipeVersion: string; effectiveDate: string; approver: string; changeReason: string; }
const INITIAL_FORM: ProductForm = { name: "", sku: "", barcode: "", category: "", supplier: "", unit: "cup", status: "active", openingStock: 0, minStock: 0, maxStock: 0, purchasePrice: 0, sellingPrice: 35000, tax: 0, discount: 0, description: "", recipeSize: "M", recipeVersion: "1.0", effectiveDate: "2026-10-31", approver: "", changeReason: "" };
const INITIAL_LINES: RecipeLine[] = [
 {id:"r1",ingredient:"Cốt hồng trà đặc",quantity:100,unit:"ml",note:"Nền trà"},
 {id:"r2",ingredient:"Bột kem béo sữa",quantity:30,unit:"gram",note:"Thành phần sữa"},
 {id:"r3",ingredient:"Nước đường mía nấu",quantity:25,unit:"ml",note:"Điều chỉnh theo tùy chọn đường"},
 {id:"r4",ingredient:"Ly nhựa 500 ml",quantity:1,unit:"cái",note:"Bao bì"},
 {id:"r5",ingredient:"Màng ép miệng ly",quantity:1,unit:"miếng",note:"Bao bì"},
 {id:"r6",ingredient:"Ống hút trân châu",quantity:1,unit:"cái",note:"Bao bì"},
 {id:"r7",ingredient:"Túi mang đi",quantity:1,unit:"cái",note:"Khi đơn cần túi"},
];
export default function AddProductPage() {
 const navigate=useNavigate(); const {showToast}=useToast();
 const [form,setForm]=useState<ProductForm>(INITIAL_FORM);
 const [lines,setLines]=useState<RecipeLine[]>(INITIAL_LINES);
 const [imageName,setImageName]=useState("");
 const [saved,setSaved]=useState(false);
 const update=<K extends keyof ProductForm>(key:K,value:ProductForm[K])=>setForm(prev=>({...prev,[key]:value}));
 function updateLine(id:string,key:keyof RecipeLine,value:string|number){setLines(prev=>prev.map(line=>line.id===id?{...line,[key]:value}:line));}
 function addLine(){setLines(prev=>[...prev,{id:makeId("recipe"),ingredient:"",quantity:0,unit:"ml",note:""}]);}
 function removeLine(id:string){setLines(prev=>prev.filter(line=>line.id!==id));}
 function submit(event:FormEvent<HTMLFormElement>){event.preventDefault();if(!form.name.trim()||!form.sku.trim()||!form.category||form.sellingPrice<=0){showToast({type:"error",title:"Thiếu thông tin",message:"Vui lòng nhập tên, mã, nhóm món và giá bán hợp lệ."});return;}if(lines.some(line=>!line.ingredient.trim()||line.quantity<=0)){showToast({type:"error",title:"Công thức chưa hợp lệ",message:"Mỗi dòng nguyên liệu cần tên nguyên liệu và định lượng lớn hơn 0."});return;}if(!form.recipeVersion.trim()||!form.effectiveDate){showToast({type:"error",title:"Thiếu thông tin công thức",message:"Cần khai báo phiên bản và ngày hiệu lực."});return;}setSaved(true);showToast({type:"success",title:"Đã lưu bản nháp giao diện",message:`Món ${form.name} đã được thêm vào trạng thái mô phỏng.`});}
  return (
    <div>
      <div className="page-header">
        <div>
          <nav className="breadcrumb" aria-label="Đường dẫn trang">
            <Link to="/dashboard">Trang chủ</Link>
            <span className="sep">/</span>
            <Link to="/inventory">Kho hàng</Link>
            <span className="sep">/</span>
            <span className="current">Thêm sản phẩm</span>
          </nav>
          <h1 className="page-title">Khai báo món &amp; công thức</h1>
          <p className="page-subtitle mt-1">Tạo món đồ uống, quản lý size và khai báo định mức nguyên liệu theo phiên bản.</p>
        </div>
        <span className="text-xs text-[var(--muted)]">Dữ liệu minh họa</span>
      </div>

      <section className="card mb-6 border-l-4 border-[var(--info)]">
        <h2 className="text-sm font-bold mb-1">Trước khi lưu công thức</h2>
        <p className="text-sm text-[var(--muted)]">Mỗi size cần có định lượng riêng. Công thức phải có phiên bản, ngày hiệu lực và người phê duyệt; thay đổi công thức không được làm thay đổi dữ liệu của đơn hàng cũ.</p>
      </section>

      <form onSubmit={submit} className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 flex flex-col gap-6">
          <section className="card">
            <h2 className="font-bold mb-4 pb-3 border-b border-[var(--border)]">Thông tin món</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="form-label" htmlFor="product-name">Tên món <span className="required">*</span></label>
                <input id="product-name" className="form-input" value={form.name} onChange={e=>update("name",e.target.value)} placeholder="Ví dụ: Hồng trà sữa trân châu" required/>
              </div>
              <div>
                <label className="form-label" htmlFor="product-sku">Mã món <span className="required">*</span></label>
                <input id="product-sku" className="form-input" value={form.sku} onChange={e=>update("sku",e.target.value.toUpperCase())} placeholder="Ví dụ: HD-001" required/>
              </div>
              <div>
                <label className="form-label" htmlFor="product-barcode">Mã vạch / mã nội bộ</label>
                <input id="product-barcode" className="form-input" value={form.barcode} onChange={e=>update("barcode",e.target.value)} placeholder="Không bắt buộc"/>
              </div>
              <div>
                <label className="form-label" htmlFor="product-category">Nhóm món <span className="required">*</span></label>
                <select id="product-category" className="form-input form-select" value={form.category} onChange={e=>update("category",e.target.value as ProductCategory)} required>
                  <option value="">Chọn nhóm món</option>
                  <option value="milk-tea">Trà sữa</option>
                  <option value="fruit-tea">Trà trái cây</option>
                  <option value="macchiato">Macchiato</option>
                  <option value="topping">Topping</option>
                  <option value="seasonal">Món theo mùa</option>
                </select>
              </div>
              <div>
                <label className="form-label" htmlFor="product-supplier">Đơn vị / nhà cung cấp liên quan</label>
                <select id="product-supplier" className="form-input form-select" value={form.supplier} onChange={e=>update("supplier",e.target.value)}>
                  <option value="">Chọn thông tin</option>
                  <option value="central-kitchen">Bếp / khu chế biến</option>
                  <option value="supplier-01">Nhà cung cấp NL-01</option>
                </select>
              </div>
              <div>
                <label className="form-label" htmlFor="product-unit">Đơn vị bán <span className="required">*</span></label>
                <select id="product-unit" className="form-input form-select" value={form.unit} onChange={e=>update("unit",e.target.value)}>
                  <option value="cup">Ly</option>
                  <option value="portion">Phần</option>
                  <option value="bottle">Chai</option>
                </select>
              </div>
              <div>
                <label className="form-label" htmlFor="product-status">Trạng thái</label>
                <select id="product-status" className="form-input form-select" value={form.status} onChange={e=>update("status",e.target.value as ProductStatus)}>
                  <option value="active">Đang bán</option>
                  <option value="branch-locked">Chi nhánh tạm khóa</option>
                  <option value="inactive">Ngừng bán toàn chuỗi</option>
                </select>
              </div>
              <div>
                <label className="form-label" htmlFor="opening-stock">Tồn khởi tạo</label>
                <input id="opening-stock" type="number" min="0" className="form-input" value={form.openingStock} onChange={e=>update("openingStock",Number(e.target.value))}/>
              </div>
              <div>
                <label className="form-label" htmlFor="min-stock">Tồn tối thiểu</label>
                <input id="min-stock" type="number" min="0" className="form-input" value={form.minStock} onChange={e=>update("minStock",Number(e.target.value))}/>
              </div>
              <div>
                <label className="form-label" htmlFor="max-stock">Tồn tối đa</label>
                <input id="max-stock" type="number" min="0" className="form-input" value={form.maxStock} onChange={e=>update("maxStock",Number(e.target.value))}/>
              </div>
              <div>
                <label className="form-label" htmlFor="purchase-price">Giá vốn tham khảo (đ)</label>
                <input id="purchase-price" type="number" min="0" className="form-input" value={form.purchasePrice} onChange={e=>update("purchasePrice",Number(e.target.value))}/>
              </div>
              <div>
                <label className="form-label" htmlFor="selling-price">Giá bán chuẩn (đ) <span className="required">*</span></label>
                <input id="selling-price" type="number" min="1" className="form-input" value={form.sellingPrice} onChange={e=>update("sellingPrice",Number(e.target.value))} required/>
              </div>
              <div>
                <label className="form-label" htmlFor="tax">Thuế (%)</label>
                <input id="tax" type="number" min="0" max="100" className="form-input" value={form.tax} onChange={e=>update("tax",Number(e.target.value))}/>
              </div>
              <div>
                <label className="form-label" htmlFor="discount">Giảm giá mặc định (%)</label>
                <input id="discount" type="number" min="0" max="100" className="form-input" value={form.discount} onChange={e=>update("discount",Number(e.target.value))}/>
              </div>
              <div className="md:col-span-2">
                <label className="form-label" htmlFor="description">Mô tả</label>
                <textarea id="description" rows={3} className="form-input form-textarea" value={form.description} onChange={e=>update("description",e.target.value)} placeholder="Mô tả món đồ uống..."/>
              </div>
            </div>
          </section>

          <section className="card">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pb-3 border-b border-[var(--border)]">
              <div>
                <h2 className="font-bold">Định mức công thức (BOM / Recipe)</h2>
                <p className="text-sm text-[var(--muted)] mt-1">Số lượng nguyên liệu tiêu hao cho một ly theo từng size.</p>
              </div>
              <Badge variant="info">Mẫu công thức {form.recipeVersion}</Badge>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
              <div>
                <label className="form-label" htmlFor="recipe-size">Size công thức <span className="required">*</span></label>
                <select id="recipe-size" className="form-input form-select" value={form.recipeSize} onChange={e=>update("recipeSize",e.target.value as RecipeSize)}>
                  <option value="M">Size M</option>
                  <option value="L">Size L</option>
                </select>
              </div>
              <div>
                <label className="form-label" htmlFor="recipe-version">Phiên bản <span className="required">*</span></label>
                <input id="recipe-version" className="form-input" value={form.recipeVersion} onChange={e=>update("recipeVersion",e.target.value)} required/>
              </div>
              <div>
                <label className="form-label" htmlFor="recipe-date">Ngày hiệu lực <span className="required">*</span></label>
                <input id="recipe-date" type="date" className="form-input" value={form.effectiveDate} onChange={e=>update("effectiveDate",e.target.value)} required/>
              </div>
            </div>
            <DataTable>
              <table className="w-full text-sm text-left">
                <thead className="bg-[var(--background)] text-[var(--muted)]">
                  <tr>
                    {["Nguyên liệu","Định lượng / ly","Đơn vị","Ghi chú",""].map(x=><th key={x} className="px-3 py-3 font-semibold">{x}</th>)}
                  </tr>
                </thead>
                <tbody>
                  {lines.map(line=><tr key={line.id} className="border-t border-[var(--border)]">
                    <td className="px-2 py-2"><input aria-label="Tên nguyên liệu" className="form-input min-w-[150px]" value={line.ingredient} onChange={e=>updateLine(line.id,"ingredient",e.target.value)} placeholder="Tên nguyên liệu"/></td>
                    <td className="px-2 py-2"><input aria-label="Định lượng" type="number" min="0" step="0.01" className="form-input w-28" value={line.quantity} onChange={e=>updateLine(line.id,"quantity",Number(e.target.value))}/></td>
                    <td className="px-2 py-2"><select aria-label="Đơn vị" className="form-input form-select" value={line.unit} onChange={e=>updateLine(line.id,"unit",e.target.value)}><option>ml</option><option>gram</option><option>kg</option><option>cái</option><option>miếng</option><option>chai</option></select></td>
                    <td className="px-2 py-2"><input aria-label="Ghi chú" className="form-input min-w-[130px]" value={line.note} onChange={e=>updateLine(line.id,"note",e.target.value)}/></td>
                    <td className="px-2 py-2"><button type="button" className="btn btn-secondary" onClick={()=>removeLine(line.id)} disabled={lines.length===1}>Bớt</button></td>
                  </tr>)}
                </tbody>
              </table>
            </DataTable>
            <div className="flex flex-wrap justify-between gap-3 mt-4">
              <button type="button" className="btn btn-secondary" onClick={addLine}>+ Thêm nguyên liệu</button>
              <span className="text-xs text-[var(--muted)]">Định lượng được khai báo riêng theo size.</span>
            </div>
          </section>

          <section className="card">
            <h2 className="font-bold mb-4">Quản lý phiên bản &amp; phê duyệt</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="form-label" htmlFor="approver">Người phê duyệt</label>
                <input id="approver" className="form-input" value={form.approver} onChange={e=>update("approver",e.target.value)} placeholder="Tên người phê duyệt"/>
              </div>
              <div>
                <label className="form-label" htmlFor="change-reason">Lý do thay đổi</label>
                <input id="change-reason" className="form-input" value={form.changeReason} onChange={e=>update("changeReason",e.target.value)} placeholder="Ví dụ: Điều chỉnh định lượng đường"/>
              </div>
            </div>
          </section>

          <section className="card">
            <h2 className="font-bold mb-3">Hình ảnh món</h2>
            <label className="form-label" htmlFor="product-image">Chọn ảnh món (PNG hoặc JPG)</label>
            <input id="product-image" type="file" accept="image/png,image/jpeg" className="form-input" onChange={e=>setImageName(e.target.files?.[0]?.name??"")}/>
            {imageName && <p className="text-sm text-[var(--muted)] mt-2">Đã chọn: {imageName}</p>}
          </section>
        </div>

        <aside className="flex flex-col gap-6">
          <section className="card">
            <h2 className="font-bold mb-4">Tóm tắt giá</h2>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between gap-3">
                <span className="text-[var(--muted)]">Giá vốn tham khảo</span>
                <b>{formatCurrency(form.purchasePrice)}</b>
              </div>
              <div className="flex justify-between gap-3">
                <span className="text-[var(--muted)]">Giá bán chuẩn</span>
                <b>{formatCurrency(form.sellingPrice)}</b>
              </div>
              <div className="border-t border-[var(--border)] pt-3">
                <span className="text-[var(--muted)]">Lãi gộp tham khảo</span>
                <p className="text-lg font-bold mt-1">{formatCurrency(Math.max(0,form.sellingPrice-form.purchasePrice))}</p>
                <p className="text-xs text-[var(--muted)]">Chưa tính giá vốn chi tiết từ dữ liệu nguyên liệu.</p>
              </div>
            </div>
          </section>

          <section className="card">
            <h2 className="font-bold mb-3">Hoàn tất</h2>
            {saved && (
              <div className="mb-3">
                <Badge variant="success">Đã lưu bản nháp mô phỏng</Badge>
              </div>
            )}
            <p className="text-sm text-[var(--muted)] mb-4">Bản demo chỉ lưu trạng thái trong phiên giao diện; chưa ghi vào backend hoặc cơ sở dữ liệu.</p>
            <button type="submit" className="btn btn-primary w-full">Lưu bản nháp</button>
            <button type="button" className="btn btn-secondary w-full mt-2" onClick={()=>navigate("/inventory/products")}>Quay lại danh mục</button>
          </section>
        </aside>
      </form>
    </div>
  );
}
