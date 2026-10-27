# KẾ HOẠCH CHI TIẾT CONVERT TEMPLATE INVENZA THÀNH HỆ THỐNG QUẢN LÝ CHUỖI CỬA HÀNG TRÀ SỮA (12 CHI NHÁNH TP.HCM)

> **Căn cứ tài liệu đặc tả:** `he-thong-quan-li-chuoi-tra-sua.md` (Báo cáo xác định yêu cầu và phân tích tính khả thi dự án Hệ thống Quản lý Chuỗi Cửa hàng Trà sữa tại TP.HCM).  
> **Mục tiêu:** Tận dụng **tối đa 100% cấu trúc, UI components, layout injection, icons, chart system và style** của template Invenza hiện tại; chuyển đổi toàn bộ nghiệp vụ từ bán lẻ thiết bị văn phòng/điện tử sang hệ thống điều hành chuỗi F&B trà sữa chuyên nghiệp.

---

## MỤC LỤC
1. [Tổng Quan Đề Tài & Chiến Lược Tận Dụng Template](#1-tổng-quan-đề-tài--chiến-lược-tận-dụng-template)
2. [Bảng Ma Trận Ánh Xạ Toàn Bộ File Template Hiện Tại (39 Files HTML + JS)](#2-bảng-ma-trận-ánh-xạ-toàn-bộ-file-template-hiện-tại)
3. [Thiết Kế Lại Kiến Trúc Giao Diện & Bộ Nhận Diện Thương Hiệu (Design System)](#3-thiết-kế-lại-kiến-trúc-giao-diện--bộ-nhận-diện-thương-hiệu)
4. [Chi Tiết Chuyển Đổi Từng Module Chức Năng](#4-chi-tiết-chuyển-đổi-từng-module-chức-năng)
   - 4.1. [Sidebar & Header Chung: Quản Lý Điều Hướng & Chọn Chi Nhánh](#41-sidebar--header-chung)
   - 4.2. [Dashboard Toàn Chuỗi & Từng Chi Nhánh (dashboard.html)](#42-dashboard-toàn-chuỗi)
   - 4.3. [Phân Hệ POS Bán Hàng Tại Quầy & Đơn Offline (sales/add-sale.html, pos.js)](#43-phân-hệ-pos-bán-hàng-tại-quầy--đơn-offline)
   - 4.4. [Quản Lý Đơn Hàng Đa Kênh & Khiếu Nại Hoàn Tiền (sales/sales.html, sales-returns.html)](#44-quản-lý-đơn-hàng-đa-kênh--khiếu-nại-hoàn-tiền)
   - 4.5. [Quản Lý Đơn Bán Sỉ B2B (sales/wholesale.html)](#45-quản-lý-đơn-bán-sỉ-b2b)
   - 4.6. [Menu Đồ Uống, Topping & Định Mức Công Thức (inventory/)](#46-menu-đồ-uống-topping--định-mức-công-thức)
   - 4.7. [Quản Lý 12 Chi Nhánh & Kho Chi Nhánh (inventory/branches.html)](#47-quản-lý-12-chi-nhánh--kho-chi-nhánh)
   - 4.8. [Kiểm Kê Mù & Xử Lý Hao Hụt Kho (inventory/stock-adjustment.html)](#48-kiểm-kê-mù--xử-lý-hao-hụt-kho)
   - 4.9. [Nhập Kho Theo Lô, Hạn Dùng FEFO & Điều Chuyển Kho Cấp Cứu (purchases/)](#49-nhập-kho-theo-lô-hạn-dùng-fefo--điều-chuyển-kho-cấp-cứu)
   - 4.10. [Khách Hàng Thành Viên, Hạng Member-VIP & Sổ Điểm (customers/)](#410-khách-hàng-thành-viên-hạng-member-vip--sổ-điểm)
   - 4.11. [Nhà Cung Cấp & Chi Phí Vận Hành (suppliers/, expenses/)](#411-nhà-cung-cấp--chi-phí-vận-hành)
   - 4.12. [Báo Cáo Phân Tích, Biên Đóng Góp & Điểm Hòa Vốn (reports/)](#412-báo-cáo-phân-tích-biên-đóng-góp--điểm-hòa-vốn)
   - 4.13. [Phân Quyền 4 Vai Trò Nghiệp Vụ (users/roles.html, users.html)](#413-phân-quyền-4-vai-trò-nghiệp-vụ)
   - 4.14. [Cấu Hình Hệ Thống & Kịch Bản Sự Cố Mạng/Điện (settings/)](#414-cấu-hình-hệ-thống--kịch-bản-sự-cố-mạngđiện)
5. [Bộ Dữ Liệu Mẫu F&B Chuẩn Hóa Cho Dự Án (Mock Data Package)](#5-bộ-dữ-liệu-mẫu-fb-chuẩn-hóa-cho-dự-án)
6. [Lộ Trình Triển Khai Kỹ Thuật Theo Từng Bước (Implementation Roadmap)](#6-lộ-trình-triển-khai-kỹ-thuật-theo-từng-bước)

---

## 1. TỔNG QUAN ĐỀ TÀI & CHIẾN LƯỢC TẬN DỤNG TEMPLATE

### 1.1. Phạm vi bài toán theo file đặc tả
- **Quy mô chuỗi:** 1 Doanh nghiệp sở hữu & trực tiếp vận hành **12 chi nhánh tại TP.HCM**, mỗi chi nhánh có 1 kho riêng.
- **Kênh bán hàng:** Bán tại quầy (Counter POS), Bán mang đi (Takeaway), Bán trực tuyến (Online Delivery tích hợp mock), Bán sỉ (Wholesale B2B đặt trước).
- **Điểm nóng nghiệp vụ:**
  1. Menu lõi dùng chung toàn chuỗi; chi nhánh có quyền **tạm khóa món** khi hết nguyên liệu.
  2. Bán hàng tại quầy **duy trì được khi mất mạng / mất điện**, lưu bền vững trên thiết bị, cơ chế đối soát và đồng bộ chống trùng mã đơn.
  3. Quản lý kho theo **Lô (Batch) & Hạn sử dụng (EXP)** theo nguyên tắc **FEFO** (Hết hạn trước xuất trước).
  4. Hỗ trợ **điều chuyển nguyên liệu khẩn cấp** giữa các chi nhánh khi sắp hết hàng trước đợt nhập định kỳ.
  5. Quản lý thành viên xuyên suốt 12 chi nhánh với **4 hạng (Member, Silver, Gold, VIP)**, sổ điểm giao dịch cộng/trừ minh bạch theo chu kỳ 12 tháng.
  6. Dashboard theo dõi toàn chuỗi và **cảnh báo chi nhánh dưới điểm hòa vốn** (trung bình trượt 4 tuần và 3 tháng) để xem xét cải thiện/đóng cửa.

### 1.2. Chiến lược tận dụng tối đa Template Invenza
Template Invenza có nền tảng công nghệ rất vững chắc và phù hợp:
- **Giao diện & Thành phần UI:** Đã có sẵn toàn bộ thẻ thống kê (`stat-card`), biểu đồ Chart.js, bảng dữ liệu phân trang (`DataTable`), hệ thống modal (`Modal.show`, `Modal.confirm`), thông báo nổi (`Toast.show`), bộ chọn ngày/tháng, Dark/Light Mode.
- **Layout Injection (`assets/js/app.js`):** Sidebar và Header được sinh động bằng JavaScript. Ta chỉ cần cập nhật danh mục menu và header trong `app.js` là tự động áp dụng cho tất cả 39 trang HTML mà không phải sửa thủ công từng file.
- **Màn hình POS (`sales/add-sale.html` & `assets/js/pos.js`):** Đã có khung lưới sản phẩm, giỏ hàng tương tác, ô chiết khấu/thuế, tính tiền thừa. Ta chỉ cần nâng cấp thêm popup chọn **Size/Đường/Đá/Topping** và thanh trạng thái **Online/Offline Sync**.
- **Quản lý kho & điều chỉnh (`inventory/stock-adjustment.html`):** Rất khớp với bài toán **Kiểm kê mù** và **Hao hụt/Hủy hàng cận date**.
- **Nhập hàng (`purchases/`):** Tận dụng nguyên vẹn form và danh sách PO để quản lý nhập nguyên liệu theo Lô/Date và tạo màn hình Chuyển kho giữa 12 chi nhánh.

---

## 2. BẢNG MA TRẬN ÁNH XẠ TOÀN BỘ FILE TEMPLATE HIỆN TẠI

Dưới đây là ma trận chuyển đổi chi tiết từng file mã nguồn hiện tại sang nghiệp vụ Chuỗi Trà Sữa:

| File gốc hiện tại | File đích trong Hệ thống Trà Sữa | Chức năng nghiệp vụ F&B tương ứng | Mức độ thay đổi | Cách tận dụng |
|---|---|---|---|---|
| `dashboard.html` | `dashboard.html` | **Dashboard Toàn Chuỗi 12 Chi Nhánh**: Doanh thu, số ly bán, nguyên liệu cận date, cảnh báo hòa vốn, lọc theo từng chi nhánh. | Vừa | Giữ nguyên grid layout, đổi thẻ KPI, đổi chart doanh thu F&B, thêm dropdown chọn 12 chi nhánh. |
| `index.html` | `index.html` | Chuyển hướng về `dashboard.html` | Giữ nguyên | Không đổi. |
| `sales/add-sale.html` | `sales/add-sale.html` | **Màn hình Thu Ngân Bán Tại Quầy (Touch POS)**: Chọn món, chọn Size/Đường/Đá/Topping, tra cứu SĐT hội viên, chế độ bán Offline khi mất mạng. | Lớn | Giữ khung 2 cột (catalog + giỏ hàng), mở rộng modal chọn option trà sữa, thanh báo kết nối mạng, mở/đóng ca. |
| `sales/sales.html` | `sales/sales.html` | **Quản Lý Đơn Hàng Đa Kênh**: Danh sách đơn Quầy, Mang đi, Online, Sỉ; lọc theo chi nhánh, ca làm việc, trạng thái pha chế. | Vừa | Giữ table và filter, thêm badge kênh bán và nút xem phiếu pha chế (KOT). |
| `sales/sales-returns.html` | `sales/sales-returns.html` | **Xử Lý Khiếu Nại & Hoàn Tiền**: Đổi trà sữa lỗi, bù voucher, hoàn tiền, tự động trừ lại điểm tích lũy của thành viên. | Nhỏ | Giữ form và danh sách đổi trả, sửa lý do phù hợp F&B (hỏng vị, nhầm size, sai đường đá). |
| *Mới bổ sung* | `sales/wholesale.html` | **Quản Lý Đơn Bán Sỉ (B2B)**: Tiếp nhận đặt tiệc/công ty, kiểm tra công suất, báo giá, đặt cọc, lịch giao nhiều đợt. | Mới (nhân bản từ `sales.html`) | Tận dụng component table, modal báo giá và form tiến độ đặt cọc. |
| `inventory/products.html` | `inventory/products.html` | **Menu Đồ Uống & Topping Chuỗi**: Danh mục trà sữa, trà trái cây, topping; trạng thái đang bán hoặc chi nhánh tạm khóa món. | Vừa | Giữ thẻ thống kê và bảng sản phẩm, đổi cột thành Size, Nhóm món, Giá chuẩn, Tình trạng nguyên liệu. |
| `inventory/add-product.html` | `inventory/add-product.html` | **Thêm Món Mới & Định Mức Công Thức (BOM/Recipe)**: Khai báo thành phần nguyên liệu (trà, sữa, syrup, ly, ống hút). | Lớn | Giữ form cơ bản, bổ sung bảng "Công thức pha chế" (chọn nguyên liệu + định lượng ml/gram). |
| `inventory/product-details.html` | `inventory/product-details.html` | **Chi Tiết Món, Giá & Phiên Bản Công Thức**: Xem lịch sử phiên bản công thức, định mức chi phí vốn (COGS) từng size. | Vừa | Tận dụng layout chi tiết sản phẩm, hiển thị bảng công thức và biểu đồ giá vốn. |
| `inventory/categories.html` | `inventory/categories.html` | **Nhóm Món Đồ Uống**: Trà Sữa, Trà Trái Cây, Cà Phê & Macchiato, Đá Xay, Món Theo Mùa, Topping. | Nhỏ | Giữ nguyên giao diện quản lý category, đổi danh mục sang F&B. |
| `inventory/brands.html` | `inventory/branches.html` | **Quản Lý 12 Chi Nhánh TP.HCM**: Mã CN, địa chỉ, quản lý phụ trách, số máy POS, sức chứa kho, trạng thái kết nối. | Vừa | Đổi từ "Brands" sang "Branches" (Chi nhánh), giữ bảng quản lý và thêm trường dữ liệu kho/quản lý. |
| `inventory/units.html` | `inventory/units.html` | **Đơn Vị Tính & Quy Đổi Pha Chế**: Kg ↔ Gram, Lít ↔ Mililit (ml), Hộp, Thùng, Bịch, Quả, Ly, Ống hút. | Nhỏ | Giữ nguyên UI, cập nhật dữ liệu quy đổi đơn vị nguyên vật liệu trà sữa. |
| `inventory/stock-adjustment.html` | `inventory/stock-adjustment.html` | **Kiểm Kê Kho Chi Nhánh & Hao Hụt**: Kiểm kê mù, đối chiếu tồn thực tế vs hệ thống, ghi nhận hao hụt/đổ vỡ/hết hạn. | Nhỏ | Giữ nguyên UI, cập nhật lý do hao hụt đặc trưng pha chế (pha lỗi, rơi vỡ, cận date hủy). |
| `purchases/purchases.html` | `purchases/purchases.html` | **Đơn Nhập Nguyên Liệu Theo Lô (Inbound / Lot & EXP)**: Nhập trà, bột sữa, trân châu... theo mã lô, HSD (FEFO). | Vừa | Giữ bảng PO, thêm cột Mã Lô, Ngày SX, Hạn dùng, kiểm tra chứng từ ATVSTP. |
| `purchases/add-purchase.html` | `purchases/add-purchase.html` | **Lập Đề Xuất & Đơn Đặt Hàng Nhà Cung Cấp**: Gợi ý tự động số lượng đặt dựa trên tồn an toàn của từng kho chi nhánh. | Vừa | Giữ layout tạo PO, thêm mục chọn Kho chi nhánh nhận hàng và cảnh báo tồn tối thiểu. |
| `purchases/purchase-returns.html` | `purchases/stock-transfers.html` | **Điều Chuyển Nguyên Liệu Giữa 12 Chi Nhánh**: Chuyển khẩn cấp khi sắp hết hàng; quy trình Xuất → Đang chuyển → Xác nhận nhận. | Vừa | Tận dụng bảng và form, đổi nghiệp vụ thành chuyển kho liên chi nhánh, giữ nguyên Lô & HSD. |
| `invoices/invoices.html` | `invoices/invoices.html` | **Quản Lý Hóa Đơn & Chứng Từ**: Hóa đơn bán lẻ quầy, hóa đơn điện tử giả lập, phiếu giao sỉ, biên lai hoàn tiền. | Nhỏ | Giữ nguyên cấu trúc tra cứu hóa đơn, bổ sung mã chi nhánh và ca làm việc. |
| `invoices/invoice-details.html` | `invoices/invoice-details.html` | **Chi Tiết Hóa Đơn / Mẫu In Bill Trà Sữa**: Hiển thị chi tiết từng ly (Size, Đường, Đá, Topping), chiết khấu VIP, mã QR thanh toán. | Nhỏ | Định dạng lại hóa đơn in bill chuẩn quầy F&B (khổ K80/K57). |
| `customers/customers.html` | `customers/customers.html` | **Hội Viên Chuỗi & Khách Hàng**: Quản lý 4 hạng (Member, Silver, Gold, VIP), tổng chi tiêu 12 tháng, số dư điểm thưởng. | Vừa | Giữ nguyên bảng và filter, cập nhật cột Hạng thẻ, Điểm tích lũy, SĐT tra cứu nhanh. |
| `suppliers/suppliers.html` | `suppliers/suppliers.html` | **Nhà Cung Cấp Nguyên Vật Liệu**: Cung cấp trà lá, siro, topping, sữa, ly nắp, máy móc; đánh giá thời gian giao và chất lượng. | Nhỏ | Giữ nguyên UI, cập nhật nhà cung cấp ngành F&B Việt Nam. |
| `expenses/expenses.html` | `expenses/expenses.html` | **Chi Phí Vận Hành Chi Nhánh**: Tiền thuê mặt bằng, điện nước, khấu hao thiết bị quầy bar, lương nhân sự, chi phí hủy hỏng. | Nhỏ | Giữ nguyên UI, cập nhật các danh mục chi phí đặc thù quán trà sữa. |
| `reports/sales-report.html` | `reports/sales-report.html` | **Báo Cáo Doanh Thu Chuỗi**: Phân tích doanh số theo giờ cao điểm, theo món bán chạy, theo kênh bán (Quầy/Online/Sỉ). | Vừa | Giữ các biểu đồ, đổi dữ liệu sang phân tích món trà sữa, khung giờ vàng phục vụ. |
| `reports/inventory-report.html` | `reports/inventory-report.html` | **Báo Cáo Tồn Kho & Cảnh Báo Cận Date (FEFO)**: Tồn thực tế vs Tồn an toàn tại 12 kho; danh sách lô sắp hết hạn trong 7 ngày. | Vừa | Giữ layout báo cáo, bổ sung bảng theo dõi hạn sử dụng nguyên liệu nhạy cảm (sữa tươi, trân châu chín). |
| `reports/profit-loss.html` | `reports/profit-loss.html` | **Báo Cáo Hiệu Quả Chi Nhánh & Điểm Hòa Vốn**: Doanh thu, COGS, biên đóng góp, cảnh báo chi nhánh thua lỗ liên tiếp. | Vừa | Tận dụng bảng P&L, tích hợp cảnh báo trung bình trượt 4 tuần và 3 tháng theo yêu cầu mục 11. |
| `reports/customer-report.html` | `reports/customer-report.html` | **Báo Cáo Thành Viên & Khách VIP**: Tần suất quay lại, phân bổ hạng thẻ Member-VIP, hiệu quả khuyến mãi/voucher. | Nhỏ | Giữ nguyên UI, cập nhật phân khúc khách hàng F&B. |
| `reports/purchase-report.html` | `reports/purchase-report.html` | **Báo Cáo Nhập Hàng & Công Nợ Nhà Cung Cấp**: Chi phí nguyên liệu nhập cho toàn bộ 12 chi nhánh. | Nhỏ | Giữ nguyên UI, đổi dữ liệu nguyên liệu pha chế. |
| `reports/supplier-report.html` | `reports/supplier-report.html` | **Báo Cáo Đánh Giá Nhà Cung Cấp**: Tỷ lệ giao hàng đúng hẹn, tỷ lệ lô đạt chuẩn chất lượng ATVSTP. | Nhỏ | Giữ nguyên UI. |
| `users/users.html` | `users/users.html` | **Danh Sách Nhân Viên & Gán Chi Nhánh**: Quản lý nhân viên thu ngân, pha chế, thủ kho gắn với chi nhánh công tác cụ thể. | Vừa | Giữ bảng user, bổ sung cột "Chi nhánh làm việc", "Quầy phụ trách", "Trạng thái ca". |
| `users/roles.html` | `users/roles.html` | **Phân Quyền 4 Vai Trò**: Chủ doanh nghiệp, Quản lý chi nhánh, Thu ngân, Nhân viên kho chi nhánh. | Nhỏ | Giữ nguyên ma trận quyền (Permission Matrix), cấu hình đúng 4 vai trò trong tài liệu đặc tả. |
| `settings/general.html` | `settings/general.html` | **Cài Đặt Thương Hiệu Chuỗi**: Tên thương hiệu, trụ sở chính, 12 chi nhánh, định dạng tiền tệ VNĐ, cấu hình máy in bill. | Nhỏ | Giữ form settings, cập nhật thông tin thương hiệu trà sữa. |
| `settings/inventory.html` | `settings/inventory.html` | **Cấu Hình Kho & FEFO**: Ngưỡng tồn an toàn mặc định, quy tắc xuất kho FEFO, quy chuẩn tỷ lệ hao hụt pha chế cho phép. | Nhỏ | Giữ form, đổi sang cấu hình kho F&B. |
| `settings/sales.html` | `settings/sales.html` | **Cấu Hình Bán Hàng & Đơn Online**: Thời gian tự động hủy đơn online nếu mất kết nối (5 phút), quy định làm tròn tiền. | Nhỏ | Giữ form, thêm tham số thời gian chờ xác nhận đơn online. |
| `settings/purchases.html` | `settings/purchases.html` | **Cấu Hình Mua Hàng & Chuyển Kho**: Quy định hạn dùng tối thiểu khi nhận hàng từ nhà cung cấp, quy trình duyệt chuyển kho. | Nhỏ | Giữ form, cập nhật thông số. |
| `settings/notifications.html` | `settings/notifications.html` | **Cảnh Báo Hệ Thống**: Thông báo nguyên liệu cận date, thông báo tồn dưới mức an toàn, cảnh báo mất mạng POS. | Nhỏ | Giữ form cấu hình thông báo. |
| *Mới bổ sung* | `settings/offline-sync.html` | **Trung Tâm Giám Sát Đồng Bộ & Đối Soát**: Quản lý hàng đợi đơn offline, đối soát doanh thu ca của Quản lý chi nhánh. | Mới (nhân bản từ `settings/general.html`) | Tận dụng style card, hiển thị danh sách đơn chờ sync và nút ép đồng bộ thủ công. |
| `pages/login.html` | `pages/login.html` | **Đăng Nhập Hệ Thống**: Hỗ trợ chọn vai trò và chi nhánh làm việc (cho Quản lý, Thu ngân, Thủ kho). | Nhỏ | Giữ form login, đổi logo trà sữa, thêm dropdown chọn Chi nhánh nếu là nhân viên cửa hàng. |
| `pages/profile.html` | `pages/profile.html` | **Hồ Sơ Cá Nhân & Đổi Ca**: Thông tin nhân sự, ca làm việc hiện tại, lịch sử đăng nhập thiết bị. | Nhỏ | Giữ nguyên layout profile. |
| `pages/register.html`, `forgot-password.html`, `reset-password.html`, `404.html` | Các trang bổ trợ | Các trang xác thực và lỗi hệ thống | Giữ nguyên | Chỉ thay đổi tên thương hiệu và màu sắc nhận diện. |
| `assets/js/app.js` | `assets/js/app.js` | **Core Layout Injection**: Cung cấp Sidebar F&B chuẩn hóa, Header có Branch Switcher, Toast, Modal, Search. | Vừa | Sửa `getSidebarHTML()` và `getHeaderHTML()`, dữ liệu tìm kiếm nhanh F&B. |
| `assets/js/pos.js` | `assets/js/pos.js` | **Bộ Xử Lý Giỏ Hàng POS Trà Sữa**: Xử lý option Topping/Đường/Đá, tra cứu Member, lưu đơn Offline vào LocalStorage. | Lớn | Mở rộng cấu trúc giỏ hàng từ `pos.js` hiện tại. |
| `assets/js/dashboard.js` | `assets/js/dashboard.js` | **Biểu Đồ Doanh Thu & So Sánh 12 Chi Nhánh**: Biểu đồ doanh số theo giờ, biểu đồ tỷ trọng kênh bán, số ly bán. | Vừa | Cập nhật dữ liệu demo và cấu hình Chart.js. |
| `assets/js/tables.js` | `assets/js/tables.js` | **Bộ Lọc & Phân Trang DataTable**: Hỗ trợ lọc theo Chi nhánh, Kênh bán, Hạng thành viên, Trạng thái. | Giữ nguyên | Class `DataTable` dùng chung cho toàn bộ bảng trong dự án. |

---

## 3. THIẾT KẾ LẠI KIẾN TRÚC GIAO DIỆN & BỘ NHẬN DIỆN THƯƠNG HIỆU

Để tạo ấn tượng thẩm mỹ cao cấp (Modern Premium F&B Web App) mà không làm vỡ giao diện template hiện tại, ta thực hiện tinh chỉnh bảng màu và typography trong CSS Tokens:

### 3.1. Bảng màu chủ đạo (Color Palette F&B Trà Sữa)
Trong file `assets/css/app.css` và `tailwind.config.js`:
- **Primary Color:** Đổi từ xanh lá công nghệ sang tông **Caramel Nâu Trà Sữa / Golden Milk Tea** (`#C88A58` hoặc `#2563EB` tùy chọn thương hiệu, khuyến nghị tông F&B sang trọng: `--primary: #C5832B`, `--primary-dark: #A36518`, `--primary-light: #FDF6EC`).
- **Accent Brown / Pearl:** Màu trân châu đen cao cấp (`#2C1810`).
- **Success / Fresh Matcha:** Giữ nguyên tông xanh lá thanh mát (`#22B573`) đại diện cho lá trà tươi và trạng thái hoạt động tốt.
- **Warning / Roasted Oolong:** Tông cam nâu hổ phách (`#F59E0B`) cho cảnh báo cận date hoặc nguyên liệu sắp hết.
- **Surface / Background:** Tông trắng kem mịn nhẹ (`#FAF9F6`) cho Light mode và Tông Slate đen bóng đêm huyền bí (`#0F172A`) cho Dark mode.

### 3.2. Cập nhật `tailwind.config.js`
```javascript
module.exports = {
  darkMode: 'class',
  content: [
    './*.html',
    './pages/*.html',
    './inventory/*.html',
    './sales/*.html',
    './purchases/*.html',
    './invoices/*.html',
    './customers/*.html',
    './suppliers/*.html',
    './expenses/*.html',
    './reports/*.html',
    './settings/*.html',
    './users/*.html',
    './assets/js/*.js',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#C5832B', // Trà Sữa Caramel Ánh Vàng
          dark: '#A36518',
          light: '#FDF6EC',
        },
        tea: {
          matcha: '#2D6A4F',
          pearl: '#2B1810',
          cream: '#FFFDF9',
          oolong: '#B25E2D',
        },
        surface: '#FFFFFF',
        background: '#FAF9F6',
        brand: '#1C1917',
        muted: '#6B7280',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
```

---

## 4. CHI TIẾT CHUYỂN ĐỔI TỪNG MODULE CHỨC NĂNG

### 4.1. Sidebar & Header Chung (`assets/js/app.js`)

#### A. Cải tiến Sidebar:
Cập nhật hàm `getSidebarHTML()` trong `app.js` để tổ chức hệ thống menu thành 8 phân hệ chuẩn:
1. **TỔNG QUAN (MAIN)**
   - `dashboard.html`: Bảng Điều Khiển Chuỗi (12 Chi Nhánh)
2. **BÁN HÀNG (POS & ORDERS)**
   - `sales/add-sale.html`: Bán Hàng Tại Quầy (POS Bán Lẻ & Offline)
   - `sales/sales.html`: Danh Sách Đơn Hàng (Quầy, Online, Sỉ)
   - `sales/wholesale.html`: Quản Lý Đơn Bán Sỉ (B2B)
   - `sales/sales-returns.html`: Khiếu Nại & Hoàn Tiền
   - `invoices/invoices.html`: Hóa Đơn & Chứng Từ
3. **MENU & CÔNG THỨC (MENU & RECIPES)**
   - `inventory/products.html`: Danh Mục Món & Topping
   - `inventory/add-product.html`: Thêm Món & Định Mức Công Thức
   - `inventory/categories.html`: Nhóm Sản Phẩm
   - `inventory/units.html`: Đơn Vị Tính & Quy Đổi
   - `inventory/branches.html`: Quản Lý 12 Chi Nhánh & Kho
4. **KHO NGUYÊN LIỆU (INVENTORY & TRANSFERS)**
   - `purchases/purchases.html`: Nhập Kho Theo Lô & Hạn Dùng (FEFO)
   - `purchases/add-purchase.html`: Đề Xuất Đặt Hàng Nhà Cung Cấp
   - `purchases/stock-transfers.html`: Điều Chuyển Nguyên Liệu Khẩn Cấp
   - `inventory/stock-adjustment.html`: Kiểm Kê Mù & Báo Cáo Hao Hụt
5. **QUAN HỆ KHÁCH HÀNG (CRM & LOYALTY)**
   - `customers/customers.html`: Khách Hàng & Hạng Member-VIP
   - `suppliers/suppliers.html`: Nhà Cung Cấp Nguyên Vật Liệu
6. **CHI PHÍ & TÀI CHÍNH (FINANCE)**
   - `expenses/expenses.html`: Chi Phí Vận Hành Cửa Hàng
7. **BÁO CÁO QUẢN TRỊ (ANALYTICS)**
   - `reports/sales-report.html`: Báo Cáo Doanh Thu & Kênh Bán
   - `reports/inventory-report.html`: Báo Cáo Tồn & Cảnh Báo Hết Hạn
   - `reports/profit-loss.html`: Hiệu Quả Chi Nhánh & Điểm Hòa Vốn
   - `reports/customer-report.html`: Báo Cáo Khách Hàng & Điểm Thưởng
8. **HỆ THỐNG & ĐIỀU HÀNH (ADMIN)**
   - `users/users.html`: Danh Sách Nhân Viên & Gán Chi Nhánh
   - `users/roles.html`: Phân Quyền Vai Trò
   - `settings/general.html`: Cấu Hình Chuỗi Trà Sữa
   - `settings/offline-sync.html`: Nhật Ký Đồng Bộ Đơn Offline

#### B. Cải tiến Header (Thêm Bộ Chọn Chi Nhánh Toàn Cục - Branch Switcher):
Thêm ngay cạnh thanh tìm kiếm Global Search trong `getHeaderHTML()`:
- Dropdown **"Chọn Chi Nhánh"**:
  - `[Toàn Chuỗi - 12 Chi Nhánh]` *(Dành cho Chủ Doanh Nghiệp)*
  - `CN01 - Quận 1 (Nguyễn Huệ)`
  - `CN02 - Quận 3 (Võ Văn Tần)`
  - `CN03 - Quận 5 (Nguyễn Trãi)`
  - `CN04 - Quận 7 (Nguyễn Thị Thập)`
  - `CN05 - Bình Thạnh (D2 / Nguyễn Gia Trí)`
  - `CN06 - Thủ Đức (Võ Văn Ngân)`
  - `CN07 - Tân Bình (Lê Văn Sỹ)`
  - `CN08 - Gò Vấp (Quang Trung)`
  - `CN09 - Phú Nhuận (Phan Xích Long)`
  - `CN10 - Quận 10 (Sư Vạn Hạnh)`
  - `CN11 - Quận 11 (Lê Đại Hành)`
  - `CN12 - Tân Phú (Lũy Bán Bích)`
- Khi chuyển đổi chi nhánh, lưu vào `localStorage.getItem('current_branch_id')` và tự động lọc dữ liệu trên các trang Dashboard, Bán hàng, Tồn kho.

---

### 4.2. Dashboard Toàn Chuỗi (`dashboard.html` & `assets/js/dashboard.js`)

#### A. Thẻ thống kê chính (Top Stat Cards):
1. **Tổng Doanh Thu Toàn Chuỗi:** `1.485.600.000 đ` (Tăng `↑ 12.8%` so với tháng trước).
2. **Tổng Số Ly Bán Ra:** `38.450 ly` (Trung bình `107 ly/ngày/chi nhánh`).
3. **Giá Trị Đơn Trung Bình (AOV):** `58.200 đ/đơn`.
4. **Cảnh Báo Vận Hành Chuỗi:** `2 Chi nhánh dưới điểm hòa vốn` + `3 Lô nguyên liệu cận hạn (< 5 ngày)`.

#### B. Biểu đồ trung tâm (`dashboard.js`):
- **Biểu đồ 1 (Doanh thu & Số ly 12 chi nhánh):** Bar Chart so sánh doanh thu của 12 chi nhánh trong tháng; đánh dấu đường chuẩn điểm hòa vốn trung bình (`110 triệu đ/tháng/chi nhánh`). Chi nhánh nào nằm dưới đường màu đỏ sẽ được highlight cảnh báo.
- **Biểu đồ 2 (Cơ cấu Kênh Bán):** Doughnut Chart tỷ trọng doanh thu:
  - Bán tại quầy (Counter): `52%`
  - Đặt qua ứng dụng/Website (Online Delivery): `33%`
  - Bán sỉ cho sự kiện/công ty (Wholesale): `15%`
- **Biểu đồ 3 (Giờ cao điểm phục vụ):** Phân bổ lượng đơn theo khung giờ (11h00 - 13h30 và 18h00 - 21h30) để quản lý chi nhánh điều phối nhân sự pha chế và thu ngân.

#### C. Bảng tóm tắt nhanh (Bottom Widgets):
- **Bảng Chi Nhánh Cần Chú Ý (Branch Watchlist):** Hiển thị chi nhánh có dòng tiền âm hoặc tỷ lệ hủy đơn cao (ví dụ: CN Tân Phú, CN Quận 11).
- **Bảng Lô Nguyên Liệu Sắp Hết Hạn (FEFO Alert):** 
  - Lô `LOT-SUATUOI-092`: Sữa tươi tiệt trùng (Kho CN01) - Còn 4 ngày.
  - Lô `LOT-TRANCHAU-114`: Trân châu đen hoàng kim (Kho CN05) - Còn 2 ngày.
  - Có nút hành động nhanh: *[Ưu tiên xuất bán]* hoặc *[Tạo phiếu chuyển kho sang CN bán chạy]*.

---

### 4.3. Phân Hệ POS Bán Hàng Tại Quầy & Đơn Offline (`sales/add-sale.html` & `assets/js/pos.js`)

Đây là màn hình quan trọng bậc nhất của đồ án, đáp ứng hoàn hảo các yêu cầu tại Mục 3 và Mục 10 của file đặc tả.

#### A. Thanh Trạng Thái POS Trên Cùng:
- Tên Chi Nhánh & Số Quầy: **CN05 - Bình Thạnh | Quầy POS #01**
- Tên Thu Ngân: **Nguyễn Thị Mai (Mã NV: NV-0502)**
- Tình trạng Ca làm việc: **Ca Sáng (07:00 - 15:00) | Tiền đầu ca: 1.000.000 đ**
- **Đèn báo trạng thái kết nối mạng (Network Status Badge):**
  - Khi có mạng: `🟢 Trực tuyến (Online) - Đồng bộ tự động`
  - Khi mất mạng: `🔴 Ngoại tuyến (Offline Mode) - Đơn được lưu an toàn trên máy khách`

#### B. Lưới Sản Phẩm Đồ Uống & Topping (Product Catalog):
- Danh mục tab: `Tất Cả`, `Trà Sữa`, `Trà Trái Cây`, `Macchiato & Cà Phê`, `Đá Xay`, `Topping`.
- Thẻ sản phẩm hiển thị: Hình ảnh ly trà sữa, Tên món, Giá cơ bản (Size M), Số lượng khả dụng dựa trên tồn kho nguyên liệu cốt.
- **Trạng thái "Tạm khóa món" (Out of Stock):** Nếu chi nhánh hết cốt trà nhài hoặc hết sữa tươi, thẻ món hiển thị mờ kèm nhãn `"Tạm hết nguyên liệu"` và vô hiệu hóa nút bấm.

#### C. Popup Tùy Chọn Món Trà Sữa (Item Customization Modal):
Khi click vào 1 món (ví dụ: *Trà Sữa Trân Châu Hoàng Kim*), mở popup chọn thuộc tính:
```
[HÌNH ẢNH MÓN]  TRÀ SỮA TRÂN CHÂU HOÀNG KIM (Giá gốc: 35.000 đ)

1. Chọn Kích Cỡ (Size):
   (o) Size M (+0 đ)           ( ) Size L (+8.000 đ)

2. Chọn Mức Đường:
   ( ) 0%     ( ) 30%    ( ) 50%    (o) 70%    ( ) 100%

3. Chọn Mức Đá:
   ( ) Không đá ( ) 30%  (o) 70%    ( ) 100%   ( ) Nóng

4. Thêm Topping (Cho phép chọn nhiều):
   [x] Trân châu hoàng kim (+6.000 đ)
   [ ] Trân châu đen sợi (+6.000 đ)
   [x] Kem Foam Cheese (+10.000 đ)
   [ ] Pudding trứng (+8.000 đ)
   [ ] Thạch dừa nha đam (+5.000 đ)

5. Ghi chú món: [Ít ngọt béo, đóng gói mang đi.......]

[ Hủy ]                                 [ Thêm Vào Đơn: 51.000 đ ]
```

#### D. Khu Vực Giỏ Hàng & Nhận Diện Hội Viên:
- **Ô Tra cứu Hội viên:** Nhập SĐT khách hàng (ví dụ: `0908123456`) → Hiển thị tức thì: `Trần Văn An | Hạng: Gold (Giảm 10% Topping) | Điểm hiện có: 120 điểm (~12.000 đ)`.
- Nút `[Áp dụng trừ 50 điểm (-5.000 đ)]` hoặc `[Tích điểm đơn này]`.
- Danh sách món trong giỏ hàng hiển thị chi tiết options:
  - *1x Trà Sữa Ô Long Nướng (Size L, 50% Đường, 70% Đá, +Trân châu đen)* : `49.000 đ`
  - Nút sửa nhanh options, nút tăng giảm số lượng (+/-), nút xóa món.

#### E. Cơ Chế Bán Offline Khi Mất Mạng / Mất Điện (Mục 10 Specification):
1. **Phát hiện mất mạng:** Script lắng nghe sự kiện `window.addEventListener('offline', ...)` hoặc qua lệnh ping.
2. **Quy tắc tạo mã đơn chống trùng:**  
   `Mã Đơn = [Mã Chi Nhánh] + '-' + [Mã Thu Ngân] + '-OFF-' + [Timestamp]`  
   *(Ví dụ: `CN05-NV0502-OFF-1729700000000`)*.
3. **Lưu trữ dữ liệu:** Lưu trực tiếp vào `localStorage.getItem('offline_orders_queue')` hoặc `IndexedDB`.
4. **Hạn chế nghiệp vụ offline theo tài liệu đặc tả:**
   - Tạm ngừng tích điểm và không áp dụng voucher trực tuyến khi offline.
   - Thanh toán: Ưu tiên tiền mặt; nếu khách chuyển khoản thì dùng mã QR ngân hàng in sẵn, nhập tên khách vào ô ghi chú để quản lý đối soát thủ công sau.
5. **Nút "Đồng Bộ Đơn Hàng" (Sync Queue):**
   - Khi có mạng trở lại, hiển thị thanh thông báo: `"Đang có 12 đơn offline chưa đồng bộ. [Bắt đầu đối soát & đẩy lên máy chủ]"`.
   - Nút ấn thực hiện đẩy tuần tự, kiểm tra mã chống trùng, cập nhật trừ kho nguyên liệu và cập nhật doanh thu ca.

#### F. In Phiếu Pha Chế (KOT) & Đóng Ca:
- Nút `[Hoàn Tất & In Phiếu]`:
  - Phiếu tính tiền cho khách (Receipt).
  - Phiếu pha chế cho quầy bar (KOT: Kitchen Order Ticket) chỉ gồm: Tên món, Size, % Đường, % Đá, Topping, Số thứ tự lấy nước.
- Nút `[Kết Thúc Ca Làm Việc]`: Mở modal kiểm đếm tiền mặt thực tế, hệ thống tính chênh lệch so với doanh thu phần mềm, bắt buộc nhập lý do nếu có chênh lệch.

---

### 4.4. Quản Lý Đơn Hàng Đa Kênh & Khiếu Nại Hoàn Tiền (`sales/sales.html`, `sales-returns.html`)

#### A. Trang Quản Lý Đơn Hàng (`sales/sales.html`):
- **Phân loại Tab kênh bán:**
  - `Tất cả đơn`
  - `Tại quầy (POS)`
  - `Giao đi (Online / Delivery)`
  - `Đơn sỉ (Wholesale)`
  - `Đơn Offline vừa đồng bộ`
- **Bộ lọc đa năng:** Lọc theo 12 Chi nhánh, Theo ca làm việc, Theo khoảng thời gian, Theo trạng thái đơn.
- **Trạng thái đơn hàng (Workflow Badge):**
  - `Mới tiếp nhận` (Chờ xác minh - đặc biệt là đơn online thanh toán trước)
  - `Đang pha chế`
  - `Đã pha xong (Sẵn sàng giao / Chờ khách lấy)`
  - `Đang giao hàng`
  - `Hoàn tất`
  - `Đã hủy / Hoàn tiền`
- **Thao tác đơn hàng:** Xem chi tiết bill, In lại phiếu pha chế, Chuyển trạng thái, Hủy đơn có lý do.

#### B. Xử Lý Khiếu Nại & Hoàn Tiền (`sales/sales-returns.html`):
Tài liệu đặc tả quy định rất chặt chẽ về quy trình khiếu nại (Mục 9):
- Tiếp nhận mã đơn gốc + Mã hội viên + Nội dung khiếu nại.
- **Phân loại lỗi chuẩn F&B:**
  1. *Lỗi sản phẩm:* Pha sai mức đường/đá, trà bị chua/hỏng vị, có dị vật, trân châu sượng.
  2. *Lỗi vận chuyển:* Đổ tràn, giao trễ > 45 phút.
  3. *Lỗi thanh toán:* Trừ tiền 2 lần trên thẻ/QR.
  4. *Lỗi thái độ phục vụ.*
- **Phương án giải quyết:**
  - `Pha lại món mới` (Hệ thống ghi nhận xuất kho nguyên liệu bù với lý do "Đền bù khiếu nại").
  - `Tặng Voucher giảm giá` cho lần mua sau.
  - `Hoàn tiền một phần / toàn phần`: Hệ thống tự động đảo bút toán doanh thu, ghi nhận chi phí hoàn trả và **thu hồi lại số điểm thưởng đã cộng cho khách**.

---

### 4.5. Quản Lý Đơn Bán Sỉ B2B (`sales/wholesale.html`)

Đơn bán sỉ được tách riêng theo Mục 6 và Bảng 7 của tài liệu:
- Dành cho các đơn hàng số lượng lớn (từ 50 ly đến hàng nghìn ly) phục vụ hội nghị, trường học, liên hoan công ty.
- **Quy trình 5 bước trên giao diện:**
  1. *Tiếp nhận yêu cầu:* Tên tổ chức, người liên hệ, số lượng ly, ngày giờ giao, địa điểm.
  2. *Lập báo giá (Quotation):* Áp dụng chiết khấu sỉ theo % quy định (không dùng điểm thành viên cá nhân).
  3. *Kiểm tra công suất & Giữ tồn kho:* Hệ thống tự động kiểm tra xem kho chi nhánh phụ trách có đủ nguyên liệu (cốt trà, trân châu, ly nắp) hay không; nếu đủ, chuyển số nguyên liệu đó sang trạng thái `"Tồn giữ cho đơn sỉ"` để thu ngân bán lẻ tại quầy không bán mất.
  4. *Đặt cọc & Xác nhận:* Ghi nhận số tiền đặt cọc (tối thiểu 30-50%).
  5. *Lịch giao hàng & Nghiệm thu:* Cho phép giao làm nhiều đợt trong ngày, in biên bản bàn giao và hóa đơn VAT.

---

### 4.6. Menu Đồ Uống, Topping & Định Mức Công Thức (`inventory/`)

#### A. Danh Mục Món & Topping (`inventory/products.html`):
- Phân loại rõ: Sản phẩm nước uống (Drink item) vs Topping thêm vs Thành phẩm đóng chai.
- Các cột dữ liệu:
  - Tên món (kèm thumbnail ảnh ly trà sữa chất lượng cao).
  - Nhóm món (Trà sữa, Trà trái cây, Macchiato...).
  - Các size hỗ trợ (Size M, Size L) và giá bán tương ứng.
  - Giá vốn định mức (COGS) được tính tự động từ công thức.
  - **Trạng thái kinh doanh:** `Đang bán` / `Chi nhánh tạm khóa` / `Ngừng bán toàn chuỗi`.
  - Nút gạt nhanh: *[Tạm khóa trên toàn chuỗi]* hoặc *[Tạm khóa tại chi nhánh đang chọn]*.

#### B. Khai Báo Món & Công Thức Pha Chế Định Mức (`inventory/add-product.html`):
Tận dụng form nhiều cột của `add-product.html`, bổ sung phần **"Bảng Định Mức Công Thức (Recipe / Bill of Materials)"**:
- Khi chọn Size M:
  - Cốt Hồng Trà Đặc: `100 ml`
  - Bột Kem Béo Sữa: `30 gram`
  - Nước Đường Mía Nấu: `25 ml`
  - Ly Nhựa 500ml: `1 cái`
  - Màng Ép Miệng Ly: `1 miếng`
  - Ống Hút Trân Châu: `1 cái`
  - Túi Chữ T / Túi Mang Đi: `1 cái`
- Khi bán 1 ly, hệ thống tự động trừ đúng định lượng trên vào kho chi nhánh tương ứng.
- **Quản lý phiên bản công thức (Version Control):** Phiên bản 1.0, 1.1 (Ví dụ điều chỉnh giảm đường công thức từ 30ml xuống 25ml) kèm ngày hiệu lực và người phê duyệt.

---

### 4.7. Quản Lý 12 Chi Nhánh & Kho Chi Nhánh (`inventory/branches.html` - Convert từ `brands.html`)

Chuyển đổi trang `brands.html` thành trang quản lý 12 chi nhánh chuỗi trà sữa tại TP.HCM:
- **Danh sách 12 chi nhánh chuẩn:**
  1. CN01 - Bến Nghé (Quận 1)
  2. CN02 - Bàn Cờ (Quận 3)
  3. CN03 - Chợ Lớn (Quận 5)
  4. CN04 - Tân Hưng (Quận 7)
  5. CN05 - Hàng Xanh (Bình Thạnh)
  6. CN06 - Làng Đại Học (Thủ Đức)
  7. CN07 - Bảy Hiền (Tân Bình)
  8. CN08 - Cityland (Gò Vấp)
  9. CN09 - Phan Xích Long (Phú Nhuận)
  10. CN10 - Bắc Hải (Quận 10)
  11. CN11 - Lãnh Binh Thăng (Quận 11)
  12. CN12 - Kênh Nước Đen (Tân Phú)
- **Thông tin mỗi chi nhánh:**
  - Mã chi nhánh, Tên gọi, Địa chỉ, Khu vực giao hàng (Bán kính km).
  - Quản lý chi nhánh phụ trách (Store Manager).
  - Số lượng quầy POS hoạt động.
  - Sức chứa kho nguyên vật liệu (m³ hoặc kg).
  - **Trạng thái chi nhánh:** `Hoạt động` | `Tạm ngừng` | `Mất điện/mất mạng` | `Cảnh báo thua lỗ`.
  - Nút xem kho chi nhánh, xem báo cáo doanh thu chi nhánh.

---

### 4.8. Kiểm Kê Mù & Xử Lý Hao Hụt Kho (`inventory/stock-adjustment.html`)

Đáp ứng Mục 8.3 của tài liệu đặc tả:
- **Quy trình Kiểm kê mù (Blind Inventory Count):**
  - Quản lý chi nhánh mở phiên kiểm kê định kỳ (cuối ngày hoặc cuối tuần). Khóa kho tạm thời.
  - Phiếu in cho nhân viên kiểm đếm **không hiển thị số lượng tồn hệ thống**, nhân viên bắt buộc phải đếm thực tế từng bao trà, hộp sữa, bịch trân châu, ly nắp.
  - Nhập số đếm thực tế vào hệ thống → Hệ thống tự động tính chênh lệch:
    `Chênh lệch = Tồn thực đếm - Tồn hệ thống`
- **Phân loại nguyên nhân hao hụt:**
  - *Hao hụt tự nhiên khi nấu/pha (nấu trân châu bị dính nồi, trà bay hơi).*
  - *Hư hỏng / Đổ vỡ tại quầy bar.*
  - *Pha lỗi do nhân viên mới (ghi nhận mã NV).*
  - *Nguyên liệu hết hạn sử dụng (FEFO waste).*
  - *Nghi ngờ thất thoát / mất cắp.*
- **Ngưỡng duyệt:** Chênh lệch giá trị > 200.000 đ phải có chữ ký duyệt của Quản lý chi nhánh; chênh lệch > 1.000.000 đ phải trình Chủ chuỗi phê duyệt.

---

### 4.9. Nhập Kho Theo Lô, Hạn Dùng FEFO & Điều Chuyển Kho Cấp Cứu (`purchases/`)

#### A. Nhập Kho Nguyên Liệu Theo Lô & Hạn Sử Dụng (`purchases/purchases.html`, `add-purchase.html`):
- Nguyên liệu F&B có hạn dùng rất ngắn (sữa tươi tiệt trùng, trà ủ, siro mở nắp, trân châu tươi nấu trong ngày).
- Mỗi phiếu nhập kho bắt buộc ghi nhận:
  - Nhà cung cấp.
  - Danh mục nguyên liệu.
  - **Số Lô sản xuất (Lot / Batch Number).**
  - **Ngày sản xuất (MFG) & Hạn sử dụng (EXP Date).**
  - Đơn giá nhập và điều khoản thanh toán/công nợ.
- **Quy tắc xuất kho FEFO (First-Expired, First-Out):** Khi quầy POS bán trà sữa hoặc kho xuất cho quầy bar, hệ thống tự động trừ nguyên liệu của Lô có hạn sử dụng gần nhất trước. Lô đã hết hạn sẽ bị khóa tự động không cho vào tồn khả dụng.

#### B. Điều Chuyển Nguyên Liệu Giữa 12 Chi Nhánh (`purchases/stock-transfers.html` - Convert từ `purchase-returns.html`):
Đáp ứng tình huống xử lý thiếu hàng khẩn cấp tại Mục 8.2:
- Tình huống: Chi nhánh Bình Thạnh (CN05) đột biến lượng khách, tồn trà đen xuống dưới mức an toàn (còn 2kg, tồn an toàn là 5kg) trong khi còn 3 ngày nữa mới tới lịch nhập hàng từ nhà cung cấp.
- **Luồng xử lý trên web:**
  1. Hệ thống tự động gợi ý các chi nhánh lân cận còn tồn > tồn an toàn (Ví dụ: CN Phú Nhuận CN09 cách 2km còn dư 10kg trà đen).
  2. Quản lý CN05 lập **"Phiếu Yêu Cầu Chuyển Kho Cấp Cứu"** xin 4kg trà đen từ CN09.
  3. Quản lý CN09 vào web bấm **"Phê Duyệt"** (kiểm tra đảm bảo sau khi chuyển kho mình vẫn còn > 5kg an toàn).
  4. CN09 xuất hàng → Trạng thái phiếu: `"Đang vận chuyển"` (Số lượng 4kg được chuyển vào mục `"Tồn đang chuyển"`).
  5. Nhân viên giao hàng mang tới CN05 → CN05 kiểm đếm, xác nhận thực nhận 4kg → Tồn kho CN05 tăng, giữ nguyên thông tin Lô và Hạn dùng gốc.

---

### 4.10. Khách Hàng Thành Viên, Hạng Member-VIP & Sổ Điểm (`customers/customers.html`)

Đáp ứng chuẩn hóa chương trình thành viên tại Mục 7:
- **4 Hạng thành viên dùng chung toàn bộ 12 chi nhánh:**
  1. `Member (Thành viên mới)`: Đăng ký hợp lệ bằng SĐT, tích điểm 1% giá trị đơn, quà sinh nhật cơ bản.
  2. `Silver (Bạc)`: Chi tiêu > 1.000.000 đ/năm, tích điểm 1.5%, tặng 1 voucher/tháng.
  3. `Gold (Vàng)`: Chi tiêu > 3.000.000 đ/năm, tích điểm 2%, miễn phí 1 topping/đơn, ưu đãi sinh nhật đặc biệt.
  4. `VIP (Kim Cương / Khách đặc quyền)`: Chi tiêu > 6.000.000 đ/năm, ưu tiên phục vụ, tặng ly dùng thử món mới theo mùa, hotline chăm sóc riêng.
- **Chu kỳ xét hạng 12 tháng:** Hạng thẻ được đánh giá lại mỗi năm một lần dựa trên doanh số tích lũy của 12 tháng gần nhất.
- **Sổ Điểm Giao Dịch (Point Ledger Modal):**
  - Điểm chỉ được cộng khi đơn ở trạng thái `"Hoàn tất"`.
  - Mỗi dòng điểm ghi rõ: Ngày giờ, Mã hóa đơn nguồn, Số điểm cộng (+), Số điểm trừ đổi voucher (-), Số dư sau giao dịch.
  - Khi hoàn tiền đơn hàng: Tự động đảo bút toán thu hồi số điểm tương ứng đã cộng.

---

### 4.11. Nhà Cung Cấp & Chi Phí Vận Hành (`suppliers/`, `expenses/`)

#### A. Nhà Cung Cấp Nguyên Liệu (`suppliers/suppliers.html`):
- Quản lý các nhà cung ứng chính ngạch: Trà Tân Cương / Bảo Lộc, Sữa tươi Vinamilk/Barista, Bột sữa Đài Loan, Trân châu tươi Gia Thịnh Phát, Ly giấy & Ống hút sinh học thân thiện môi trường.
- Đánh giá thời gian giao hàng (Lead time) và chất lượng đạt chuẩn ATVSTP.

#### B. Chi Phí Vận Hành Cửa Hàng (`expenses/expenses.html`):
- Phân bổ chi phí theo từng chi nhánh:
  - Chi phí mặt bằng (Cố định).
  - Chi phí điện lạnh, nước, internet quầy POS.
  - Chi phí nhân công ca làm việc.
  - Chi phí hao hụt và hủy nguyên liệu hết hạn.
  - Phí hoa hồng các nền tảng đặt đồ ăn (nếu có).

---

### 4.12. Báo Cáo Phân Tích, Biên Đóng Góp & Điểm Hòa Vốn (`reports/profit-loss.html`, `sales-report.html`)

Đáp ứng Mục 11 về đánh giá hiệu quả và xem xét đóng cửa chi nhánh:
- **Báo cáo Kết Quả Kinh Doanh Từng Chi Nhánh:**
  `Doanh thu thuần - Giá vốn nguyên liệu (COGS) = Lợi nhuận gộp`  
  `Lợi nhuận gộp - Chi phí vận hành chi nhánh = Biên đóng góp (Contribution Margin)`  
  `Biên đóng góp - Chi phí quản lý chung = Lợi nhuận ròng`
- **Tính Toán Điểm Hòa Vốn (Break-even Analysis):**
  - Điểm hòa vốn được tính dựa trên chi phí cố định (Mặt bằng + Lương cứng nhân sự) chia cho tỷ suất lợi nhuận gộp.
- **Hệ Thống Cảnh Báo Sớm Chi Nhánh Kém Hiệu Quả:**
  - Bảng cảnh báo theo **Trung bình trượt 4 tuần và 3 tháng**.
  - Nếu chi nhánh có các dấu hiệu trong 3 tháng liên tiếp:
    1. Doanh thu dưới điểm hòa vốn.
    2. Dòng tiền âm liên tục và phải lấy lợi nhuận chi nhánh khác bù đắp.
    3. Số lượng khách quay lại (Retention rate) giảm > 20%.
  - Hệ thống tự động gắn cờ đỏ `[Cần Xem Xét Di Dời Hoặc Đóng Cửa]`, lập báo cáo đề xuất cho Chủ doanh nghiệp ra quyết định.

---

### 4.13. Phân Quyền 4 Vai Trò Nghiệp Vụ (`users/roles.html`, `users.html`)

Bảng phân quyền ma trận đáp ứng Bảng 3 trong file đặc tả:

| Phân hệ / Nghiệp vụ | Chủ Doanh Nghiệp (Admin) | Quản Lý Chi Nhánh (Store Manager) | Thu Ngân (Cashier) | Nhân Viên Kho (Inventory Clerk) |
|---|:---:|:---:|:---:|:---:|
| **Xem Dashboard Toàn Chuỗi** | Toàn quyền (12 CN) | Không (Chỉ xem chi nhánh mình) | Không | Không |
| **Bán hàng tại quầy POS** | Xem lịch sử | Xem & duyệt chênh lệch ca | Tạo đơn, tính tiền, in bill | Không |
| **Tạm khóa món do hết hàng** | Có | Có (Tại CN phụ trách) | Chỉ xem trạng thái | Báo hết nguyên liệu |
| **Sửa đổi Giá bán & Menu** | Toàn quyền | Không | Không | Không |
| **Sửa đổi Công thức định mức** | Toàn quyền phê duyệt | Không | Không | Không |
| **Duyệt chuyển kho cấp cứu** | Toàn quyền | Duyệt xuất/nhận tại CN | Không | Lập phiếu xuất/kiểm nhận |
| **Kiểm kê kho chi nhánh** | Xem báo cáo | Mở phiên, duyệt chênh lệch | Không | Đếm thực tế (Kiểm kê mù) |
| **Xử lý Khiếu nại & Hoàn tiền** | Xem tổng hợp | Duyệt hoàn tiền / đền bù | Tiếp nhận khiếu nại | Xuất bù nguyên liệu |
| **Báo cáo Lãi/Lỗ & Hòa vốn** | Toàn chuỗi | Chỉ xem P&L chi nhánh | Không | Không |
| **Đối soát đơn Offline** | Toàn chuỗi | Đối soát đơn ca của CN | Đối chiếu mã NV trên đơn | Không |

---

### 4.14. Cấu Hình Hệ Thống & Kịch Bản Sự Cố Mạng/Điện (`settings/`)

- `settings/sales.html`: Cấu hình nguyên tắc bán hàng:
  - Quy tắc tự động hủy đơn online: **Sau 5 phút** nếu chi nhánh mất kết nối internet mà POS không phản hồi, tự động hủy đơn kèm thông báo `"Chi nhánh tạm thời không thể tiếp nhận"`.
  - Cấu hình phí phụ thu giao hàng theo khung giờ cao điểm / thời tiết mưa.
- `settings/loyalty.html`: Cấu hình hệ số điểm:
  - 10.000 đ = 1 điểm.
  - Ngưỡng lên hạng: Member (0 đ) → Silver (1.000.000 đ) → Gold (3.000.000 đ) → VIP (6.000.000 đ).
  - Nguyên tắc không cho phép cộng dồn đồng thời nhiều mã giảm giá nếu có xung đột.
- `settings/offline-sync.html`: Trung tâm giám sát ngoại tuyến:
  - Cho phép quản lý kiểm tra danh sách hàng đợi các đơn phát sinh trong lúc mất mạng tại thiết bị của quầy.
  - Nút bấm *"Xác nhận đối soát mã thu ngân"* trước khi chốt doanh thu vào hệ thống trung tâm.

---

## 5. BỘ DỮ LIỆU MẪU F&B CHUẨN HÓA CHO DỰ ÁN (MOCK DATA PACKAGE)

Để ứng dụng khi demo trông cực kỳ sống động và chân thực, ta chuẩn bị sẵn bộ dữ liệu mẫu F&B để thay thế dữ liệu đồ điện tử trong template:

### 5.1. Danh mục 15 Món Trà Sữa & Đồ Uống Bán Chạy Nhất:
1. **Trà Sữa Trân Châu Hoàng Kim** (Mã: `TS-001`, Size M: 35.000 đ, Size L: 43.000 đ)
2. **Trà Sữa Ô Long Nướng** (Mã: `TS-002`, Size M: 38.000 đ, Size L: 46.000 đ)
3. **Trà Sữa Hạt Dẻ Nướng Macchiato** (Mã: `TS-003`, Size M: 42.000 đ, Size L: 50.000 đ)
4. **Hồng Trà Sữa Truyền Thống** (Mã: `TS-004`, Size M: 32.000 đ, Size L: 40.000 đ)
5. **Trà Sữa Matcha Latte Đậu Đỏ** (Mã: `TS-005`, Size M: 45.000 đ, Size L: 53.000 đ)
6. **Trà Sữa Khoai Môn Tươi Dừa Sợi** (Mã: `TS-006`, Size M: 42.000 đ, Size L: 50.000 đ)
7. **Trà Đào Cam Sả Tươi** (Mã: `TC-001`, Size M: 39.000 đ, Size L: 47.000 đ)
8. **Trà Xoài Nhiệt Đới Kem Cheese** (Mã: `TC-002`, Size M: 45.000 đ, Size L: 53.000 đ)
9. **Trà Dâu Tằm Macchiato** (Mã: `TC-003`, Size M: 42.000 đ, Size L: 50.000 đ)
10. **Trà Sen Vàng Hạt Sen Củ Năng** (Mã: `TC-004`, Size M: 46.000 đ, Size L: 54.000 đ)
11. **Sữa Tươi Trân Châu Đường Đen** (Mã: `ST-001`, Size M: 40.000 đ, Size L: 48.000 đ)
12. **Cà Phê Muối Kem Béo** (Mã: `CF-001`, Ly chuẩn: 35.000 đ)
13. **Trà Đen Macchiato Hoàng Gia** (Mã: `MC-001`, Size M: 38.000 đ, Size L: 46.000 đ)
14. **Đá Xay Cacao Cookie Bạc Hà** (Mã: `DX-001`, Ly chuẩn: 49.000 đ)
15. **Trà Sữa Thái Xanh Thạch Phô Mai** (Mã: `TS-007`, Size M: 36.000 đ, Size L: 44.000 đ)

### 5.2. Danh mục Topping:
1. Trân Châu Hoàng Kim (+6.000 đ)
2. Trân Châu Đen Sợi Mật Ong (+6.000 đ)
3. Kem Foam Cheese Mặn (+10.000 đ)
4. Pudding Trứng Vani (+8.000 đ)
5. Thạch Củ Năng Giòn (+8.000 đ)
6. Hạt Sen Huế Nấu Đường Phèn (+10.000 đ)
7. Sương Sáo Thảo Mộc (+6.000 đ)

### 5.3. Danh mục Nguyên Liệu Thô (Kho hàng):
1. Trà Lá Ô Long Đặc Biệt (Kg)
2. Búp Hồng Trà Ceylon (Kg)
3. Trà Xanh Lài Thượng Hạng (Kg)
4. Bột Sữa Béo Nguyên Kem Non-Dairy (Bao 25kg / Gói 1kg)
5. Sữa Tươi Thanh Trùng 100% (Thùng 12 Hộp 1 Lít)
6. Đường Đen Nữ Hoàng Đài Loan (Gói 1kg)
7. Hạt Trân Châu Thô (Thùng 18kg / Bịch 3kg)
8. Ly Nhựa PP 500ml & 700ml (Cây 50 cái / Thùng 1000 cái)
9. Màng Ép Miệng Ly (Cuộn 2500 nắp)
10. Ống Hút Giấy / Nhựa Bọc Màng Từng Chiếc (Bịch 100 cái)

---

## 6. LỘ TRÌNH TRIỂN KHAI KỸ THUẬT THEO TỪNG BƯỚC

Để thực hiện chuyển đổi nhanh nhất, chuẩn xác nhất và không phát sinh lỗi, ta triển khai theo 6 giai đoạn rõ ràng:

### Giai đoạn 1: Chuẩn hóa Giao Diện Cốt Lõi, Thương Hiệu & Layout Injection
- [ ] Chỉnh sửa `assets/js/app.js`:
  - Cập nhật Logo thương hiệu trà sữa ("HaiLyDa Tea Chain - 12 Branches").
  - Viết lại hàm `getSidebarHTML()` với danh mục 8 phân hệ trà sữa.
  - Thêm Dropdown chọn Chi nhánh (Branch Switcher) vào hàm `getHeaderHTML()`.
  - Cập nhật từ khóa tìm kiếm nhanh (`SEARCH_DATA`) với danh sách trà sữa, khách hàng hội viên, nhà cung cấp F&B.
- [ ] Chỉnh sửa `tailwind.config.js` & `assets/css/app.css`:
  - Thiết lập bảng màu trà sữa Caramel / Gold / Matcha.
  - Tinh chỉnh style badge cho các trạng thái đơn hàng F&B.

### Giai đoạn 2: Nâng Cấp Bảng Điều Khiển Chuỗi (dashboard.html & dashboard.js)
- [ ] Cập nhật lại 4 thẻ KPI đầu trang: Tổng doanh thu chuỗi (VNĐ), Tổng số ly bán, Giá trị đơn trung bình (AOV), Cảnh báo hòa vốn & Lô cận date.
- [ ] Viết lại dữ liệu demo trong `assets/js/dashboard.js`:
  - Đổi biểu đồ doanh thu theo tháng/ngày thành VNĐ.
  - Thêm biểu đồ so sánh doanh thu 12 chi nhánh có đường phân cách điểm hòa vốn.
  - Thêm bảng cảnh báo lô nguyên liệu sắp hết hạn (FEFO Alert).

### Giai đoạn 3: Hiện Đại Hóa Màn Hình POS Bán Hàng & Chế Độ Offline
- [ ] Cập nhật `sales/add-sale.html`:
  - Thêm thanh thông báo trạng thái kết nối (Online / Offline Indicator).
  - Tích hợp modal tùy chọn món (Size M/L, Đường, Đá, Topping).
  - Tích hợp ô tra cứu SĐT hội viên (Hiển thị hạng Member, Silver, Gold, VIP và điểm tích lũy).
  - Bổ sung nút mở/đóng ca làm việc và in phiếu pha chế (KOT).
- [ ] Cập nhật `assets/js/pos.js`:
  - Đổi mảng sản phẩm `POS_PRODUCTS` sang danh sách trà sữa và topping.
  - Viết logic xử lý tính tổng tiền gồm Size + Topping - Điểm thưởng/Giảm giá VIP.
  - Viết logic lưu trữ đơn hàng Offline vào `localStorage` khi mất kết nối mạng.
  - Viết hàm đồng bộ đơn Offline lên máy chủ khi có mạng trở lại với mã chống trùng.

### Giai đoạn 4: Menu Món, Công Thức (BOM) & Quản Lý 12 Chi Nhánh
- [ ] Cập nhật `inventory/products.html` và `inventory/categories.html` sang Menu F&B trà sữa.
- [ ] Bổ sung bảng Định mức nguyên liệu (Recipe builder) trong `inventory/add-product.html`.
- [ ] Chuyển đổi `inventory/brands.html` thành `inventory/branches.html` quản lý thông tin 12 chi nhánh TP.HCM.
- [ ] Điều chỉnh `inventory/stock-adjustment.html` thể hiện quy trình Kiểm kê mù và các nguyên nhân hao hụt F&B.

### Giai đoạn 5: Kho Nguyên Liệu Theo Lô, FEFO & Điều Chuyển Chi Nhánh
- [ ] Cập nhật `purchases/purchases.html` và `purchases/add-purchase.html` thêm trường Mã Lô (Batch ID), Hạn Dùng (EXP Date) và nguyên tắc xuất kho FEFO.
- [ ] Chuyển đổi `purchases/purchase-returns.html` thành `purchases/stock-transfers.html` (Điều chuyển nguyên liệu cấp cứu giữa các chi nhánh lân cận).
- [ ] Cập nhật `customers/customers.html` với 4 hạng hội viên và modal xem sổ điểm.
- [ ] Bổ sung trang `sales/wholesale.html` quản lý đơn bán sỉ sự kiện/công ty.

### Giai đoạn 6: Báo Cáo Tài Chính, Điểm Hòa Vốn, Phân Quyền & Kiểm Thử
- [ ] Cập nhật `reports/profit-loss.html` tích hợp công thức tính biên đóng góp và đồ thị trung bình trượt 4 tuần / 3 tháng cảnh báo đóng cửa chi nhánh kém hiệu quả.
- [ ] Cập nhật `users/roles.html` cấu hình ma trận phân quyền đúng 4 vai trò: Chủ chuỗi, Quản lý chi nhánh, Thu ngân, Thủ kho.
- [ ] Kiểm thử toàn diện trên trình duyệt: Chuyển đổi Dark/Light mode, thử nghiệm thu ngân bán hàng, thử nghiệm ngắt mạng tạo đơn offline và đồng bộ lại, kiểm tra tính responsive trên thiết bị di động/máy tính bảng.

---

> **Kết luận:** Bản kế hoạch này tận dụng triệt để 100% cấu trúc tệp tin, giao diện đồ họa, các thư viện UI (Chart.js, DataTable, Modal, Toast) của template Invenza sẵn có. Sau khi thực hiện, dự án sẽ trở thành một hệ thống web app quản trị chuỗi cửa hàng trà sữa chuẩn mực, vừa đáp ứng trọn vẹn mọi yêu cầu học thuật của môn OOAD, vừa đạt đẳng cấp thẩm mỹ hiện đại, chuyên nghiệp.
