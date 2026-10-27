# BÁO CÁO LẦN 1

## XÁC ĐỊNH YÊU CẦU ĐỀ TÀI VÀ PHÂN TÍCH TÍNH KHẢ THI

### ĐỀ TÀI: HỆ THỐNG QUẢN LÍ CHUỖI CỬA HÀNG TRÀ SỮA

*tại Thành phố Hồ Chí Minh*

| Môn học | [Tên môn học] |
| --- | --- |
| Nhóm thực hiện | [Tên nhóm / danh sách thành viên – MSSV] |
| Giảng viên hướng dẫn | [Họ tên giảng viên] |
| Thời gian | Tháng 10 năm 2026 |

---

# MỞ ĐẦU

## 1. Giới thiệu đề tài

Kinh doanh trà sữa theo mô hình chuỗi có một đặc điểm: dữ liệu phát sinh đồng thời tại nhiều điểm bán, trong khi việc điều hành lại cần được thực hiện tập trung. Nếu các nghiệp vụ bán hàng, kho, khuyến mãi và khách hàng được ghi nhận bằng sổ sách, bảng tính hoặc nhiều phần mềm rời rạc, doanh nghiệp khó xác định con số nào là chính xác, và thường chỉ phát hiện sai lệch khi hậu quả đã xảy ra.

Các vấn đề thường gặp gồm: giá bán không đồng nhất giữa các chi nhánh; tồn kho ghi nhận sai; nhập dư nguyên liệu có hạn sử dụng ngắn trong khi giờ cao điểm lại thiếu hàng; khuyến mãi và voucher khó kiểm soát; điểm thành viên không được theo dõi nhất quán; và hiệu quả từng chi nhánh bị đánh giá thiếu căn cứ, chẳng hạn chỉ dựa vào lượng khách.

Vì vậy, đề tài hướng đến xây dựng một hệ thống quản lí tập trung cho chuỗi cửa hàng trà sữa, trong đó từng chi nhánh vẫn duy trì được các hoạt động thiết yếu khi kết nối mạng hoặc điện bị gián đoạn, và dữ liệu được đồng bộ, đối soát sau sự cố.

Tên đề tài được xác định là "Hệ thống quản lí chuỗi cửa hàng trà sữa tại Thành phố Hồ Chí Minh". Hệ thống phục vụ một doanh nghiệp sở hữu và trực tiếp vận hành chuỗi cửa hàng; đây không phải là nền tảng cung cấp dịch vụ cho nhiều thương hiệu độc lập.

## 2. Mục tiêu đề tài

### 2.1. Mục tiêu tổng quát

Số hóa các quy trình trọng yếu của chuỗi cửa hàng trà sữa, tạo nguồn dữ liệu thống nhất và hỗ trợ nhà quản lí ra quyết định dựa trên số liệu.

### 2.2. Mục tiêu cụ thể

- Quản lí tập trung chi nhánh, nhân viên, menu, giá bán, topping và công thức pha chế
- Hỗ trợ bán hàng tại quầy, đặt hàng trực tuyến và đặt hàng sỉ
- Theo dõi trạng thái đơn từ lúc tiếp nhận đến khi hoàn tất, hủy hoặc hoàn tiền
- Quản lí kho tại từng chi nhánh theo nguyên liệu, lô hàng, hạn sử dụng và công thức sản phẩm; hỗ trợ đề xuất đặt hàng và chuyển nguyên liệu giữa các chi nhánh để giảm thiếu hàng và giảm nguyên liệu hủy
- Quản lí khách hàng thành viên, điểm tích lũy, lịch sử giao dịch và phân hạng Member, Silver, Gold, VIP dùng chung toàn chuỗi
- Hỗ trợ khuyến mãi, quyền lợi theo hạng và kiểm soát việc cộng dồn ưu đãi
- Theo dõi ca làm việc, tiền mặt, thanh toán và các thao tác hủy/sửa đơn
- Tổng hợp doanh thu, số đơn, giá trị đơn trung bình, lượng khách trung bình, tồn kho, hao hụt và đánh giá hiệu quả từng chi nhánh (doanh thu, biên đóng góp, điểm hòa vốn, phản hồi)
- Duy trì bán trực tiếp khi mất mạng hoặc mất điện và kiểm soát việc đồng bộ, đối soát sau sự cố
- Cung cấp dữ liệu làm căn cứ phân bổ nguyên liệu, nhân sự và xem xét cải thiện, di dời hoặc đóng cửa một chi nhánh

## 3. Hiện trạng và sự cần thiết xây dựng phần mềm

### 3.1. Hiện trạng tổ chức điển hình

Nhóm mô tả hiện trạng của một chuỗi trà sữa chưa có hệ thống quản lí tập trung, dựa trên quan sát chung về mô hình F&B và các tình huống vận hành mà đề tài cần giải quyết. Đây là bối cảnh giả định của đồ án, không đại diện cho một doanh nghiệp cụ thể.

**Bảng 1. Hiện trạng vận hành và hạn chế**

| **Lĩnh vực** | **Cách làm hiện tại** | **Hạn chế** |
| --- | --- | --- |
| **Bán hàng** | Mỗi chi nhánh dùng máy POS/sổ riêng; đơn online nhận qua nhiều ứng dụng khác nhau | Doanh thu phải tổng hợp thủ công; dễ sót hoặc trùng đơn; giá không đồng nhất |
| **Menu, giá, công thức** | Cập nhật qua tin nhắn, bảng tính gửi từng chi nhánh | Chi nhánh áp giá cũ; công thức pha không thống nhất, sai giá vốn |
| **Kho** | Kiểm đếm bằng sổ hoặc Excel, ít theo dõi lô và hạn sử dụng | Tồn sai, nguyên liệu hết hạn, nhập dư hoặc thiếu hàng giờ cao điểm |
| **Thành viên, khuyến mãi** | Ghi điểm trên sổ hoặc tách theo từng cửa hàng; voucher phát hành rời rạc | Khách không được nhận diện xuyên chi nhánh; lạm dụng voucher, sửa điểm tùy tiện |
| **Bán sỉ** | Trao đổi qua điện thoại, tin nhắn; báo giá tự soạn | Nhận đơn vượt công suất, thiếu nguyên liệu, khó theo dõi đặt cọc và công nợ |
| **Sự cố mạng, điện** | Không có quy trình chuẩn | Mất đơn, ghi nhận sai doanh thu khi nhập bù |
| **Báo cáo, đánh giá** | Tổng hợp cuối kỳ bằng tay | Chậm, thiếu căn cứ khi quyết định phân bổ nguồn lực hoặc xử lí chi nhánh kém hiệu quả |

### 3.2. Sự cần thiết xây dựng phần mềm

Việc xây dựng phần mềm là cần thiết vì các nghiệp vụ trên liên kết chặt chẽ với nhau: một đơn bán hoàn tất đồng thời tạo doanh thu, trừ nguyên liệu theo công thức, cộng điểm thành viên và ảnh hưởng đến báo cáo chi nhánh. Khi các phần này nằm ở những công cụ tách biệt, số liệu không thể đối chiếu tự động. Một hệ thống tập trung, phân quyền theo vai trò và có nhật ký thao tác sẽ giải quyết đồng thời bốn yêu cầu: thống nhất dữ liệu, kiểm soát gian lận và sai sót, chịu được gián đoạn kết nối, và cung cấp số liệu cho quyết định quản trị.

---

# CHƯƠNG I. XÁC ĐỊNH PHẠM VI DỰ ÁN

## 1. Tầm nhìn dự án

Hệ thống được định hướng là một ứng dụng web quản lí chuỗi, trong đó dữ liệu được lưu trữ tập trung và người dùng truy cập theo vai trò. Thu ngân thao tác trên giao diện bán hàng; nhân viên pha chế theo dõi hàng đợi; nhân viên kho thực hiện nhập, xuất, chuyển và kiểm kê; quản lí chi nhánh theo dõi hoạt động tại điểm bán; chủ doanh nghiệp xem báo cáo toàn chuỗi.

## 2. Các mức phạm vi tổ chức có thể lựa chọn

Đề tài có thể triển khai ở nhiều mức tổ chức, từ cá nhân đến nhiều doanh nghiệp. Mức càng lớn thì số đối tượng, nghiệp vụ và ràng buộc càng nhiều. Bảng 2 so sánh các mức để xác định phạm vi phù hợp với một đồ án học kỳ.

**Bảng 2. So sánh các mức phạm vi tổ chức**

| **Mức tổ chức** | **Đặc trưng nghiệp vụ** | **Độ phức tạp** | **Đánh giá khi làm đồ án** |
| --- | --- | --- | --- |
| Cá nhân / hộ gia đình | Một điểm bán nhỏ, chủ trực tiếp bán và nhập hàng; quy trình đơn giản | Rất thấp | Không đủ nghiệp vụ chuỗi, không thể hiện bài toán quản lí nhiều điểm bán |
| Cửa hàng tư nhân một chi nhánh | Một kho, một quầy, ít vai trò; có bán hàng, tồn kho, báo cáo | Thấp | Phù hợp bài tập nhỏ, không đúng tên đề tài |
| Chuỗi nhỏ 2–5 chi nhánh | Đồng bộ menu, tồn kho và báo cáo cơ bản | Trung bình thấp | Làm được nhưng chưa thể hiện rõ điều phối chuỗi |
| Chuỗi vừa 10–20 chi nhánh trong một thành phố | Kho riêng tại từng chi nhánh, nhiều quản lí, chuyển nguyên liệu giữa chi nhánh, bán đa kênh, thành viên dùng chung, đánh giá chi nhánh | Trung bình – khá | Phù hợp nhất: đủ nghiệp vụ chuỗi, vẫn trong khả năng kiểm soát |
| Chuỗi lớn liên tỉnh / nhượng quyền | Nhiều vùng, kho vùng, franchise, logistics, chính sách địa phương | Cao | Quá rộng cho một đồ án môn học |
| Nhiều doanh nghiệp / pháp nhân | Cách li dữ liệu giữa doanh nghiệp, hợp nhất tài chính, thanh toán thuê bao, nhiều chính sách thuế và bảng giá | Rất cao | Không chọn |

## 3. Phạm vi được lựa chọn

Phạm vi phù hợp nhất được chốt là một doanh nghiệp vận hành 12 chi nhánh tại Thành phố Hồ Chí Minh, kho riêng tại từng chi nhánh. Đây là mức trung bình: đủ lớn để phát sinh các nghiệp vụ có ý nghĩa như chuyển kho, quản lí đa chi nhánh, khách hàng dùng chung toàn chuỗi và báo cáo so sánh, nhưng vẫn không kéo theo các yêu cầu của nhượng quyền hay đa pháp nhân.

Các chi nhánh dùng chung danh mục món, chính sách thành viên và dữ liệu khách hàng. Giá hoặc khuyến mãi có thể được cấu hình theo toàn chuỗi, nhóm chi nhánh hoặc kênh bán. Mỗi người dùng chỉ thao tác trong phạm vi được phân quyền: chủ doanh nghiệp xem toàn chuỗi; quản lí chi nhánh chỉ xem và xử lí dữ liệu tại chi nhánh phụ trách.

- Một bộ phận điều hành gồm mua hàng, kho và quản trị hệ thống.
- Các kênh bán: tại quầy, mang đi, website/app và đơn tiếp nhận từ nền tảng giao hàng; ngoài ra có đơn sỉ.
- Các nhóm khách: khách lẻ, thành viên thường, thành viên VIP và khách sỉ/doanh nghiệp.
- Một menu lõi dùng chung toàn chuỗi; chi nhánh có thể tạm khóa món do hết nguyên liệu nhưng không tự ý đổi giá chuẩn.

## 4. Phạm vi chức năng của hệ thống

### 4.1. Nội dung trong phạm vi

- Hệ thống quản lí một doanh nghiệp và các chi nhánh trực thuộc.
- Hỗ trợ bán tại quầy, bán trực tuyến và bán sỉ.
- Quản lí menu size, topping, giá, công thức, đơn hàng, thanh toán, pha chế.
- Quản lí tồn kho theo kho, lô, hạn dùng và công thức sản phẩm.
- Quản lí khách hàng, điểm thưởng, hạng thành viên và quyền lợi VIP xuyên chi nhánh.
- Đánh giá hiệu quả từng chi nhánh.
- Kiểm soát việc đồng bộ sau sự cố.

### 4.2. Nội dung ngoài phạm vi

- Nhượng quyền và chia sẻ doanh thu với bên nhận quyền.
- Nhiều công ty hoặc nhiều mã số thuế.
- Tính lương, bảo hiểm và tuyển dụng đầy đủ.
- Kế toán tổng hợp theo chuẩn mực kế toán; hệ thống chỉ xuất dữ liệu doanh thu, chi phí và chứng từ để tích hợp.
- Tích hợp cổng thanh toán thật, hóa đơn điện tử thật, thiết bị IoT hoặc máy pha chế tự động (đồ án dùng cổng thanh toán và hóa đơn giả lập).
- Tối ưu tuyến giao hàng bằng thuật toán nâng cao.
- Tự sản xuất nguyên liệu tại nhà máy.
- Quản lí cửa hàng ngoài Thành phố Hồ Chí Minh và kho liên tỉnh.
- Dự báo bằng trí tuệ nhân tạo, tối ưu tồn kho tự động, hoặc tự động quyết định đóng cửa chi nhánh. Hệ thống chỉ cung cấp dữ liệu, chỉ số và cảnh báo để người có thẩm quyền xem xét.

### 4.3. Giả định của đề tài

- Dữ liệu chi nhánh, menu, khách hàng và giao dịch trong đồ án là dữ liệu mẫu do nhóm xây dựng.
- Thanh toán số và nền tảng giao hàng được mô phỏng qua giao diện giả lập (mock) có trạng thái thành công, thất bại và không xác định.
- Mỗi chi nhánh có thiết bị POS (máy tính hoặc máy tính bảng), máy in phiếu và đường truyền Internet; mạng di động được xem là phương án dự phòng.

---

# CHƯƠNG II. KHẢO SÁT VÀ ĐẶC TẢ YÊU CẦU

## 1. Các đối tượng tham gia

Bảng 3 liệt kê các đối tượng là con người hoặc tổ chức có tham gia vào hoạt động của chuỗi, mục đích sử dụng phần mềm của từng đối tượng và phạm vi quyền tương ứng.

**Bảng 3. Đối tượng tham gia và phạm vi quyền**

| **Đối tượng** | **Trách nhiệm / mục đích sử dụng** | **Phạm vi quyền** | **Người dùng trực tiếp** |
| --- | --- | --- | --- |
| Chủ doanh nghiệp | Theo dõi toàn chuỗi, phê duyệt chính sách, giá, khuyến mãi; quyết định mở, cải thiện hoặc đóng chi nhánh | Toàn hệ thống và báo cáo tổng hợp | Có |
| Quản lí chi nhánh | Quản lí kho và nhân sự tại chi nhánh, kiểm tra báo cáo, xử lí sự cố đơn hàng, khiếu nại, kiểm kê, duyệt các chênh lệch trong thẩm quyền | Dữ liệu chi nhánh phụ trách; không tự sửa doanh thu | Có |
| Thu ngân | Mở/đóng ca, tạo đơn, nhận thanh toán, áp dụng quyền lợi khách hàng | Ca và quầy được giao | Có |
| Nhân viên pha chế | Nhận phiếu pha chế, thực hiện và cập nhật trạng thái món (xong hoặc hết nguyên liệu) | Đơn cần pha chế tại chi nhánh | Không, thông báo trực tiếp qua giao tiếp |
| Nhân viên kho chi nhánh | Nhập, xuất, chuyển, quản lí lô, hạn dùng và kiểm kê | Kho chi nhánh | Có |
| Khách lẻ | Mua trực tiếp hoặc trực tuyến, có thể không đăng ký thành viên | Dữ liệu đơn của chính mình | Có (kênh online) |
| Thành viên / VIP | Quản lí hồ sơ, tích điểm, đổi quyền lợi, theo dõi hạng | Tài khoản thành viên của mình | Có |
| Khách sỉ / doanh nghiệp | Yêu cầu báo giá, đặt số lượng lớn, theo dõi lịch giao, đặt cọc và đối soát | Hồ sơ tổ chức và đơn sỉ của mình | Không, chỉ gọi qua nhân viên |
| Nhà cung cấp | Cung cấp nguyên liệu theo đơn mua | Thông tin giao dịch với doanh nghiệp | Không |
| Đối tác ngoài | Cổng thanh toán, đơn vị giao hàng, nền tảng đặt món, cơ quan thuế | Qua API hoặc chứng từ tích hợp | Không |

## 2. Các đối tượng dữ liệu

Các đối tượng dữ liệu (gồm đối tượng người và đối tượng vật) được chia thành sáu nhóm. Mỗi bảng dưới đây dùng chung một cấu trúc: tên đối tượng, thông tin cần thu thập và ghi chú về ràng buộc hoặc khả năng thay đổi theo thời gian.

### 2.1. Dữ liệu tổ chức

| **Đối tượng** | **Thông tin cần thu thập** | **Ghi chú** |
| --- | --- | --- |
| **Chi nhánh** | Mã chi nhánh, tên, địa chỉ, khu vực/vùng giao hàng, giờ hoạt động, quản lí phụ trách, số quầy POS, trạng thái | Trạng thái: Hoạt động / Tạm ngừng / Đóng; giờ mở cửa có thể thay đổi |
| **Kho** | Mã kho, chi nhánh sở hữu, sức chứa | Mỗi chi nhánh một kho |
| **Nhân viên, tài khoản** | Họ tên, vai trò, chi nhánh, trạng thái, thiết bị đăng nhập | Nhân viên có thể đổi chi nhánh, nghỉ việc; quyền thu hồi ngay |
| **Ca làm việc, quầy POS** | Quầy, thu ngân, giờ mở/đóng ca, tiền đầu ca, tiền thực đếm | Một quầy một ca mở tại một thời điểm |

### 2.2. Dữ liệu danh mục sản phẩm và nguyên liệu

| **Đối tượng** | **Thông tin cần thu thập** | **Ghi chú** |
| --- | --- | --- |
| **Sản phẩm đồ uống** | Mã món, tên, nhóm món, kích cỡ, tùy chọn đường/đá, trạng thái bán | Chi nhánh được tạm khóa món |
| **Topping** | Mã, tên, giá, công thức/định lượng | Tính như nguyên liệu tiêu hao |
| **Bảng giá** | Phạm vi (chuỗi/nhóm chi nhánh/kênh), giá, thời gian hiệu lực | Không chồng lấn hiệu lực; thay đổi tạo phiên bản mới |
| **Công thức, định mức** | Món/biến thể, danh sách nguyên liệu và định lượng, phiên bản | Phiên bản thay đổi theo thời gian; cần duyệt |
| **Nguyên liệu (trà, sữa, đường, topping, ly…)** | Mã, tên, đơn vị tính, quy đổi đơn vị, tồn an toàn, điều kiện bảo quản | Đơn vị quy đổi phải lớn hơn 0 |
| **Khuyến mãi, voucher** | Phạm vi, điều kiện, mức giảm, thời gian, ngân sách, giới hạn lượt, quy tắc cộng dồn | Hết hạn hoặc hết ngân sách thì tự ngừng áp dụng |

### 2.3. Dữ liệu giao dịch bán hàng

| **Đối tượng** | **Thông tin cần thu thập** | **Ghi chú** |
| --- | --- | --- |
| **Đơn hàng** | Mã đơn, chi nhánh, quầy, ca, kênh (quầy/online/sỉ), thời gian, khách (nếu có), tổng tiền, trạng thái | Mỗi đơn thuộc một chi nhánh và một kênh; không xóa vật lí |
| **Chi tiết đơn** | Món, size, đường/đá, topping, số lượng, đơn giá tại thời điểm bán, giảm giá | Lưu giá và phiên bản công thức đã áp dụng |
| **Lịch sử trạng thái đơn** | Trạng thái, thời điểm, người thao tác | Phục vụ truy vết và đo thời gian phục vụ |
| **Thanh toán, hoàn tiền** | Mã giao dịch, đơn nguồn, phương thức (tiền mặt, thẻ, ví, QR), số tiền, trạng thái, mã đối tác | Mã giao dịch ngoài không trùng; không lưu số thẻ đầy đủ |
| **Hóa đơn / chứng từ** | Số hóa đơn, tổng tiền, thuế | Gắn với đơn hàng |
| **Phiếu pha chế** | Đơn, danh sách món, trạng thái (chờ/đang pha/xong/hết nguyên liệu) | Hiển thị cho pha chế theo thứ tự |
| **Biên bản đóng ca** | Tiền đầu ca, doanh thu theo phương thức, tiền thực đếm, chênh lệch | Chênh lệch phải có giải trình |

### 2.4. Dữ liệu kho

| **Đối tượng** | **Thông tin cần thu thập** | **Ghi chú** |
| --- | --- | --- |
| **Lô nguyên liệu** | Mã lô, nguyên liệu, nhà cung cấp, ngày sản xuất, hạn dùng, giá vốn, chất lượng | Lô hết hạn hoặc cách li không vào tồn khả dụng |
| **Tồn kho** | Tồn thực tế, tồn khả dụng, tồn giữ cho đơn sỉ, tồn khóa kiểm kê, tồn đang chuyển | Tồn khả dụng = tồn thực tế – tồn giữ – tồn khóa kiểm kê; không được âm |
| **Phiếu nhập, xuất, chuyển** | Kho chi nhánh xuất/nhận, danh sách lô, số lượng, trạng thái vận chuyển | Chuyển kho hoàn tất khi kho nhận xác nhận |
| **Phiếu kiểm kê, điều chỉnh, hủy** | Tồn hệ thống, tồn đếm, chênh lệch, nguyên nhân, bằng chứng, người duyệt | Một kho một phiên kiểm kê đang mở |
| **Đơn mua hàng** | Nhà cung cấp, mặt hàng, giá, số lượng, lịch giao, điều khoản thanh toán | Hình thành công nợ nhà cung cấp |

### 2.5. Dữ liệu khách hàng

| **Đối tượng** | **Thông tin cần thu thập** | **Ghi chú** |
| --- | --- | --- |
| **Thành viên** | Mã thành viên, họ tên, số điện thoại, ngày đăng ký, trạng thái đồng ý xử lí dữ liệu, tùy chọn nhận tiếp thị | Chỉ thu thập dữ liệu cần thiết cho mục đích đã thông báo |
| **Sổ điểm** | Số dư (tổng hợp), lịch sử cộng/trừ, ngày hết hạn, giao dịch nguồn | Số dư chỉ là kết quả tổng hợp, không sửa trực tiếp |
| **Hạng thành viên** | Hạng hiện tại, doanh số xét hạng, ngày hiệu lực, ngày đánh giá lại | Xét theo chu kỳ 12 tháng; thay đổi theo thời gian |
| **Lịch sử mua, sở thích, khiếu nại, voucher** | Đơn đã mua, món ưa thích, phiếu khiếu nại, voucher đã nhận/dùng | Phục vụ chăm sóc khách hàng |
| **Khách sỉ** | Tên tổ chức, người liên hệ, địa chỉ giao | |

### 2.6. Dữ liệu đối tác

| **Đối tượng** | **Thông tin cần thu thập** | **Ghi chú** |
| --- | --- | --- |
| **Nhà cung cấp** | Mã, tên, liên hệ, mặt hàng cung cấp, điều khoản thanh toán, thời gian giao, đánh giá | Theo dõi giao trễ, chất lượng |
| **Đối tác thanh toán, giao hàng, nền tảng đặt món** | Mã đối tác, mã đơn/giao dịch phía đối tác, trạng thái đối soát, phí/hoa hồng | Mã đối tác duy nhất để chống trùng đơn |

### 2.7. Các thuộc tính thay đổi theo thời gian

Nhiều thuộc tính của đối tượng thay đổi theo thời gian. Hệ thống không ghi đè giá trị cũ mà lưu theo phiên bản có thời gian hiệu lực, để dữ liệu lịch sử của các giao dịch đã chốt không bị thay đổi.

| **Thuộc tính** | **Thay đổi thế nào** | **Cách xử lí** |
| --- | --- | --- |
| **Giá bán, khuyến mãi** | Điều chỉnh theo mùa, sự kiện | Bảng giá có hiệu lực từ–đến; đơn lưu giá tại thời điểm bán |
| **Công thức, định mức** | Đổi định lượng, đổi nguyên liệu | Phiên bản công thức, duyệt trước khi hiệu lực |
| **Hạng thành viên** | Lên hạng, xuống hạng theo chu kỳ 12 tháng | Lưu lịch sử hạng; quyền lợi áp theo hạng tại thời điểm giao dịch |
| **Trạng thái chi nhánh, món** | Hoạt động, tạm ngừng, đóng; ngừng bán tạm thời | Lưu lịch sử trạng thái; đơn cũ không bị ảnh hưởng |
| **Nhân viên: vai trò, chi nhánh** | Thăng chức, chuyển chi nhánh, nghỉ việc | Đổi quyền có hiệu lực; giữ nguyên người thao tác trên giao dịch cũ |
| **Tồn kho, hạn dùng, lô** | Biến động theo từng giao dịch kho | Chỉ thay đổi qua chứng từ; không sửa số dư trực tiếp |

## 3. Quy trình bán hàng tại quầy

- Thu ngân mở ca và đăng nhập đúng quầy.
- Khách chọn món, kích cỡ, mức đường, đá, topping và số lượng.
- Hệ thống kiểm tra món đang bán, tồn khả dụng và giá hiệu lực tại thời điểm đặt.
- Thu ngân nhận diện thành viên bằng mã hoặc số điện thoại nếu khách đồng ý.
- Hệ thống áp dụng khuyến mãi và quyền lợi hợp lệ, hiển thị chi tiết giảm giá.
- Khách thanh toán; hệ thống tạo đơn, ghi nhận thanh toán và in phiếu pha chế.
- Nhân viên pha chế nhận phiếu, pha, đánh dấu sẵn sàng và giao món.
- Hệ thống hoàn tất đơn, ghi nhận doanh thu, trừ nguyên liệu theo công thức và cộng điểm thành viên nếu có.

**Bảng 5. Các tình huống ngoại lệ khi bán tại quầy**

| **Tình huống** | **Cách xử lí** |
| --- | --- |
| **Món ngừng bán hoặc hết nguyên liệu** | Chặn chọn món |
| **Thanh toán không thành công** | Đơn giữ ở trạng thái "Chờ thanh toán", cho phép đổi phương thức hoặc hủy; không pha chế |

## 5. Quy trình đặt hàng trực tuyến

- Khách chọn chi nhánh hoặc hệ thống gán theo vùng giao hàng.
- Menu chỉ hiển thị món còn khả dụng tại chi nhánh đó.
- Khách đặt món, nhập địa chỉ, áp voucher và chọn phương thức thanh toán hoặc COD.
- Cổng thanh toán phản hồi, hệ thống tạo đơn với mã chống trùng.
- Chi nhánh xác nhận trong thời gian quy định; quá thời gian thì cảnh báo hoặc hủy theo chính sách.
- Đơn được pha chế, đóng gói và bàn giao cho khách hoặc đơn vị giao hàng; trạng thái được cập nhật xuyên suốt để khách biết đơn đã tiếp nhận, đang pha, sẵn sàng, đang giao hay hoàn tất.

> **Lưu ý:** Nếu chi nhánh mất kết nối hoặc quá tải, hệ thống tạm ngừng nhận đơn vào chi nhánh đó và gợi ý điểm bán khác. Đơn đã thanh toán nhưng chưa được chi nhánh xác nhận ở trạng thái "Chờ xác minh"; không được tự động xem là đã tiếp nhận. Chỉ cộng điểm sau khi đơn hoàn tất; đơn hủy hoặc hoàn tiền phải đảo các bút toán liên quan.

## 6. Quy trình bán sỉ

Bán sỉ được tách khỏi bán lẻ vì có số lượng lớn, thời gian chuẩn bị dài. Khách sỉ được hiểu là trường học, công ty, đơn vị tổ chức sự kiện hoặc đại lý đặt số lượng lớn đồ uống/thành phẩm.

- **Tiếp nhận yêu cầu:** khách gửi thông tin liên hệ, sản phẩm, số lượng, ngày giao, địa điểm và yêu cầu chứng từ.
- **Lập báo giá:** nhân viên phụ trách lập đơn giá, chiết khấu, phí giao hàng, báo giá. Trước khi gửi, hệ thống kiểm tra công suất pha chế, tồn nguyên liệu và lịch giao.
- **Xác nhận đơn:** khi báo giá còn hiệu lực, khách đặt cọc đủ và đơn được duyệt, hệ thống tạo đơn sỉ, giữ nguyên liệu hoặc công suất cần thiết và lập kế hoạch chuẩn bị.
- **Giao hàng:** giao theo một hoặc nhiều đợt; ghi nhận số lượng thực giao, chênh lệch và xác nhận nhận hàng.
- **Thanh toán và đối soát:** thu phần còn lại hoặc ghi công nợ trong hạn mức được duyệt; xuất chứng từ.

Không chấp nhận thay đổi thông tin đơn đặt hàng. Có thể thay đổi địa chỉ giao, cần báo phí giao hàng lại.

## 7. Quy trình thành viên và khách VIP

### 7.1. Đăng ký và chương trình thành viên

Khách đăng ký thành viên bằng số điện thoại được xác minh, cung cấp mã khách hàng, họ tên, số điện thoại, ngày đăng ký, trạng thái đồng ý xử lí dữ liệu và tùy chọn nhận nội dung tiếp thị. Chương trình kết hợp điểm thưởng với bốn hạng đơn giản. Quy tắc tích điểm, đổi điểm, nâng hạng và hết hạn cần được công khai để khách tra cứu.

**Bảng 6. Hạng thành viên đề xuất**

| **Hạng** | **Điều kiện xét hạng** | **Quyền lợi gợi ý** | **Ghi chú hệ thống** |
| --- | --- | --- | --- |
| **Member** | Đăng ký hợp lệ | Tích điểm cơ bản, ưu đãi sinh nhật | Hạng khởi tạo |
| **Silver** | Đạt ngưỡng chi tiêu hoặc số đơn trong chu kỳ | Hệ số điểm tốt hơn hoặc voucher định kỳ | Ngưỡng cấu hình |
| **Gold** | Đạt ngưỡng cao hơn | Ưu đãi topping/giao hàng, quà sinh nhật tốt hơn | Không cộng chồng mọi khuyến mãi |
| **VIP** | Nhóm khách giá trị cao nhất theo chu kỳ | Ưu tiên hỗ trợ, ưu đãi riêng, thử món mới | Không đồng nghĩa giảm giá vô hạn |

Hạng được tính theo 12 tháng (theo năm). Hạng được đánh giá lại theo chu kỳ 1 năm; quyền lợi áp theo hạng tại thời điểm giao dịch và không làm thay đổi dữ liệu của các đơn đã hoàn tất trước đó.

### 7.2. Quy tắc điểm

- Điểm chỉ cộng khi đơn ở trạng thái "Hoàn tất" và thanh toán hợp lệ; chỉ cộng một lần cho mỗi đơn.
- Điểm được quản lí bằng sổ giao dịch cộng/trừ, mỗi giao dịch có mã nguồn (đơn, voucher).
- Khi hoàn tiền, điểm đã cộng bị thu hồi theo phần hàng hoàn.
- Đơn sỉ dùng giá thỏa thuận không tích điểm cá nhân.
- Không áp dụng đồng thời các voucher không cho phép cộng dồn.

### 7.3. So sánh khách lẻ và khách sỉ

**Bảng 7. Khác biệt giữa khách lẻ và khách sỉ**

| **Nội dung** | **Khách lẻ** | **Khách sỉ / doanh nghiệp** |
| --- | --- | --- |
| **Số lượng** | Ít, pha gần thời điểm mua | Lớn, cần đặt trước |
| **Giá** | Menu và khuyến mãi công khai | Báo giá theo số lượng, thời gian và địa điểm |
| **Xác nhận** | Tức thời nếu còn món | Phải kiểm tra công suất và nguyên liệu |
| **Thanh toán** | Tiền mặt, thẻ, QR, ví | Thanh toán đủ |
| **Giao nhận** | Tại quầy hoặc giao nhanh | Giao theo nhiều đợt, địa điểm và khung giờ |
| **Thành viên** | Có thể tích điểm, xét hạng | Không dùng điểm cá nhân, giảm theo % cửa hàng quy định riêng |
| **Chứng từ** | Hóa đơn bán lẻ | Báo giá, đơn đặt hàng, phiếu giao và hóa đơn |

## 8. Quy trình quản lí kho

Mỗi chi nhánh có một kho riêng và tự quản lí tồn của mình. Có hai tình huống:

- Bình thường, chi nhánh nhập hàng từ nhà cung cấp theo từng đợt.
- Khi thiếu hàng gấp trước kỳ nhập tiếp theo, chi nhánh xin chuyển từ chi nhánh khác hoặc báo hết món.

### 8.1. Nhập hàng

- Đến kỳ đặt hàng, hệ thống gợi ý danh sách nguyên liệu cần mua cho từng kho. Căn cứ gồm tồn hiện tại, tồn an toàn, nhu cầu dự kiến đến đợt sau và hạn sử dụng còn lại. Nhân viên kho cũng có thể tạo đề nghị mua thủ công.
- Quản lí chi nhánh rà soát, điều chỉnh số lượng cần.
- Khi hàng về, kho chi nhánh kiểm số lô, ngày sản xuất, hạn sử dụng, số lượng, đơn giá, chất lượng và chứng từ.
- Phần đạt được nhập kho. Phần sai lập biên bản từ chối hoặc chênh lệch.
- Hệ thống cập nhật tồn theo lô, giá nhập và công nợ nhà cung cấp.

### 8.2. Xử lí thiếu hàng gấp

Tình huống này xảy ra khi nguyên liệu xuống dưới mức tối thiểu hoặc sắp hết trước đợt nhập tiếp theo.

- Hệ thống cảnh báo khi tồn khả dụng của nguyên liệu xuống dưới tồn an toàn. Nhân viên kho xác nhận tình trạng và báo quản lí chi nhánh.
- Quản lí chi nhánh chọn một trong hai hướng:
  - **Xin chuyển từ chi nhánh khác.** Hệ thống gợi ý các chi nhánh còn tồn vượt tồn an toàn của chính họ, ưu tiên chi nhánh gần và lô sắp hết hạn. Chi nhánh thiếu lập yêu cầu chuyển.
  - **Báo hết.** Tạm khóa các món dùng nguyên liệu đó. Món bị khóa không hiển thị trên POS và đơn online.
- Quản lí chi nhánh cho đi duyệt yêu cầu, toàn phần hoặc một phần. Số lượng duyệt không được làm kho cho đi xuống dưới tồn an toàn của mình.
- Kho cho đi lập phiếu xuất. Trạng thái là "Đang chuyển", và số lượng chuyển sang mục "tồn đang chuyển".
- Kho nhận kiểm nhận và lập biên bản. Chênh lệch được ghi nhận, không sửa số lượng trên phiếu xuất gốc.
- Tồn chỉ tăng ở kho nhận sau khi xác nhận thực nhận. Lô và hạn dùng được giữ nguyên qua quá trình chuyển.

Chuyển kho chỉ dùng để xử lí thiếu hụt khẩn cấp, không thay thế việc nhập hàng định kỳ. Nếu một chi nhánh thường xuyên phải xin chuyển, báo cáo cần cảnh báo để điều chỉnh lại số lượng đặt hàng và tồn an toàn của chi nhánh đó.

Nguyên liệu được xuất theo nguyên tắc ưu tiên lô hết hạn trước (FEFO). Lô hết hạn, không đạt chất lượng hoặc đang bị cách li không được đưa vào tồn khả dụng. Nếu thiếu, thừa hoặc hỏng khi nhận, nhân viên lập biên bản chênh lệch. Không được tự ý sửa số lượng trên phiếu xuất đã hoàn tất.

### 8.3. Kiểm kê và hao hụt

- Quản lí khóa phiên kiểm kê hoặc chốt mốc thời gian.
- Nhân viên đếm theo nguyên liệu/lô, không xem số hệ thống nếu áp dụng kiểm kê mù.
- Hệ thống tính chênh lệch.
- Chênh lệch vượt ngưỡng cấu hình phải được cấp cao hơn duyệt.
- Phiếu điều chỉnh ghi rõ nguyên nhân: hỏng, hết hạn, pha lỗi, đổ vỡ, sai định lượng hoặc nghi thất thoát.

Kiểm kê được thực hiện định kỳ hoặc khi có nghi vấn. Một kho không được có hai phiên kiểm kê đang mở cùng thời điểm.

## 9. Quy trình khiếu nại và hoàn tiền

- Nhân viên tiếp nhận mã đơn, nội dung và bằng chứng.
- Phân loại lỗi: sản phẩm, giao hàng, thanh toán, thái độ phục vụ hoặc an toàn thực phẩm.
- Người có thẩm quyền quyết định làm lại món, cấp voucher hoặc hoàn tiền.
- Hệ thống cập nhật thanh toán hoàn tiền, doanh thu, tồn và thu hồi điểm tương ứng.

## 10. Quản lí mất mạng và mất điện

### 10.1. Nguyên tắc chung

- **Bán hàng tại quầy được ưu tiên duy trì** khi còn điều kiện an toàn (ánh sáng, thiết bị pha chế, bảo quản nguyên liệu). Không hứa xử lí đơn online khi chi nhánh không thể nhận.
- **Không mất dữ liệu:** POS lưu bền các đơn offline trên thiết bị (khởi động lại ứng dụng vẫn còn) và chỉ biến mất trên thiết bị cá nhân khi máy chủ xác nhận đã nhận.
- **Không ghi nhận hai lần:** mỗi đơn có mã duy nhất (tiền tố bao gồm mã chi nhánh và mã nhân viên tạo đơn).
- **Đối soát đơn hàng trong 1 thiết bị duy nhất:** Tất cả đơn hàng sẽ được lưu trong tài khoản của manager của cửa hàng đó để kiểm tra và đối chiếu doanh thu minh bạch, rõ ràng.

### 10.2. Xử lí theo từng kịch bản

**Bảng 8. Kịch bản sự cố và cách xử lí**

| **Sự cố** | **Đơn trực tiếp (tại quầy)** | **Đơn online** | **Sau khi phục hồi** |
| --- | --- | --- | --- |
| **Mất kết nối internet qua Wifi/LAN** | Nếu có kết nối internet khác thay thế thì hoạt động bình thường. Nếu không có kết nối dữ liệu di động hoặc mạng internet thay thế thì sử dụng POS offline, dùng menu in sẵn. Hệ thống lưu đơn tại bộ nhớ thiết bị cá nhân. Trong lúc này thanh toán ưu tiên tiền mặt, nếu khách muốn chuyển khoản thì phải ghi chú lại để kết thúc đơn thủ công trên máy tài khoản manager khi có mạng trở lại. | Tạm ngừng nhận đơn tại chi nhánh nếu không có mạng dữ liệu di động hoạt động thay thế. | Đồng bộ đơn hàng trên thiết bị cá nhân lên máy chủ, hoàn tất thủ tục thanh toán bằng cách kết thúc thủ công. |
| **Mất điện** | Vẫn nhận đơn nếu đảm bảo điều kiện và an toàn về ánh sáng và máy móc. Đối với sự mất kết nối internet khi mất điện thì xử lý giống như khi mất kết nối internet. | Ngừng hoàn toàn nhận đơn online để đảm bảo nhu cầu và sự an toàn cho khách mua trực tiếp. | Nếu mất kết nối internet thì xử lý như kịch bản mất kết nối. |

### 10.3. Phương pháp xử lí cụ thể

Khi sự cố xảy ra, quán vẫn sẽ hoạt động theo kịch bản trên và:

- POS phát hiện mất kết nối (hoặc quản lí khai báo mất điện), POS hiển thị cảnh báo mất kết nối và vẫn cho phép lưu đơn trên bộ nhớ.
- Nếu như rơi vào trường hợp mất điện, quản lý nếu có kết nối internet sẽ dùng tài khoản của mình đóng nhận đơn online. Lúc đó hệ thống khóa nhận đơn online của chi nhánh đó và gợi ý chi nhánh khác cho khách.
- Trường hợp không kịp đóng đơn online mà có khách đặt đơn thì nếu lúc đó POS ở cashier mất kết nối mạng thì sau 5 phút sẽ tự huỷ đơn đó với thông báo "Không phản hồi" cho khách hàng. Trường hợp mất điện mà vẫn còn kết nối internet, người đứng ở cashier POS sẽ thu thập thông tin khách hàng trên đơn hàng khách và gợi ý chuyển chi nhánh, sau đó huỷ đơn.
- Trường hợp mất kết nối internet, các chương trình khuyến mãi và tích điểm sẽ KHÔNG được áp dụng.
- Trường hợp khách chuyển khoản khi mất kết nối, sử dụng mã QR ngân hàng đã in sẵn và ghi chú tên khách hàng vào phương thức "ghi chú" trong đơn và kết thúc đơn thủ công với phương thức chuyển khoản sau khi khôi phục kết nối.

Khi hệ thống phục hồi kết nối:

- POS đồng bộ hàng đợi đơn offline theo thứ tự thời gian với mã đơn riêng biệt chống trùng lặp.
- Nhân viên đối chiếu mã nhân viên của bản thân với mã nhân viên trong mã đơn để kết thúc đơn thủ công.

## 11. Đánh giá hiệu quả và xem xét đóng cửa chi nhánh

Chi nhánh được đưa vào diện cảnh báo khi đồng thời có các dấu hiệu trong nhiều kỳ liên tiếp:

- Doanh thu hoặc biên đóng góp dưới điểm hòa vốn.
- Dòng tiền âm và phải bù từ chi nhánh khác.
- Số đơn, khách quay lại và đánh giá dịch vụ giảm.
- Chi phí nhân sự, mặt bằng, hoa hồng giao hàng hoặc hao hụt quá cao.

Quy trình quyết định:

- Cảnh báo sớm từ bảng điều khiển theo trung bình trượt 4 tuần và 3 tháng. Để đưa ra chiến lược cải thiện.
- Nếu vẫn không đạt ngưỡng đã phê duyệt, lập phương án thu hẹp, chuyển địa điểm hoặc đóng cửa; chủ doanh nghiệp quyết định.

## 13. Yêu cầu chức năng

Các yêu cầu chức năng được tổ chức thành tám nhóm; mỗi chức năng có mức ưu tiên: MVP (bắt buộc cho phiên bản đồ án), Nên có (làm nếu còn thời gian) và Mở rộng (ngoài phạm vi phiên bản hiện tại).

**Bảng 12. Yêu cầu chức năng và mức ưu tiên**

| **Nhóm** | **Chức năng** | **Ưu tiên** |
| --- | --- | --- |
| **Tài khoản và phân quyền** | Đăng nhập, khóa tài khoản, phân quyền theo vai trò và chi nhánh, nhật ký thao tác nhạy cảm | MVP |
| **Tổ chức và sản phẩm** | Quản lí chi nhánh, kho, menu, bảng giá, topping, công thức có phiên bản | MVP |
| **Bán hàng** | POS bán tại quầy, thanh toán, hàng đợi pha chế và trạng thái đơn, hủy/đổi/hoàn tiền, quản lí ca | MVP |
| | Đơn online ở mức tiếp nhận và đồng bộ cơ bản | MVP |
| | Đối soát với cổng thanh toán và nền tảng giao hàng | Nên có |
| **Bán sỉ** | Yêu cầu, báo giá, đặt cọc, kiểm tra công suất, giữ tồn, giao hàng | MVP |
| | Quản lí công nợ khách sỉ | Nên có |
| **Khách hàng** | Hồ sơ thành viên, sổ điểm, hạng Member–VIP, quyền lợi, điều chỉnh có phê duyệt, lịch sử biến động | MVP |
| | QR thành viên, voucher, ưu đãi sinh nhật | Nên có |
| **Kho** | Nhà cung cấp, mua hàng, nhập theo lô, chuyển nguyên liệu giữa các kho, nhận hàng, kiểm kê, điều chỉnh, trừ kho theo công thức, cảnh báo cận hạn | MVP |
| | Đề xuất đặt hàng hoặc chuyển kho | Nên có |
| **Sự cố** | POS bán offline, khóa nhận đơn online, đồng bộ chống trùng, đối soát | MVP |
| **Báo cáo** | Doanh thu, số đơn, AOV, lượng khách trung bình, tồn, hao hụt, hiệu quả chi nhánh, xuất biểu mẫu | MVP |
| | Cảnh báo chi nhánh dưới điểm hòa vốn | Nên có |

## 14. Yêu cầu phi chức năng

**Bảng 13. Yêu cầu phi chức năng**

| **Nhóm** | **Yêu cầu** | **Cách kiểm tra** |
| --- | --- | --- |
| **Sẵn sàng** | POS vẫn tạo đơn trực tiếp khi mất mạng; không hứa xử lí online khi chi nhánh không thể nhận | Ngắt mạng khi demo, tạo đơn và đồng bộ lại |
| **Hiệu năng** | Thao tác thêm món và tính tiền tại quầy phản hồi nhanh trong môi trường kiểm thử đã công bố; báo cáo nặng chạy bất đồng bộ | Đo thời gian phản hồi với dữ liệu mẫu |
| **Nhất quán** | Giao dịch tiền, điểm và kho có tính nguyên tử hoặc cơ chế bù trừ; đồng bộ chống trùng, mỗi lần đồng bộ có trạng thái | Gửi lặp cùng một đơn, kiểm tra chỉ có một kết quả |
| **Bảo mật** | Mật khẩu băm, phiên đăng nhập có hạn, mã hóa dữ liệu nhạy cảm khi truyền và lưu, kiểm tra dữ liệu ở cả giao diện và máy chủ, nhật ký truy cập | Kiểm thử phân quyền theo vai trò |
| **Khả năng mở rộng** | Thêm chi nhánh hoặc đổi ngưỡng bằng dữ liệu cấu hình, không sửa logic cốt lõi; mọi bản ghi nghiệp vụ có mã chi nhánh/kho | Thêm chi nhánh thứ 13 không đổi mã nguồn |
| **Dễ dùng** | Giao diện POS ít bước, hỗ trợ cảm ứng, hoạt động trên máy tính và máy tính bảng, hiển thị rõ đơn đang offline | Quan sát thu ngân thao tác thử |
| **Bảo trì** | Kiến trúc nguyên khối phân lớp, tách module bán hàng, kho, CRM, sỉ, báo cáo và tích hợp | Xem xét cấu trúc mã nguồn |
| **Sao lưu** | Sao lưu định kỳ, thử khôi phục trong môi trường demo; giữ giao dịch offline đến khi máy chủ xác nhận | Khôi phục thử từ bản sao lưu |
| **Kiểm toán** | Không xóa lịch sử tài chính, kho, điểm; lưu người thực hiện, thời điểm và lí do | Truy vết một giao dịch qua nhật ký |

---

# CHƯƠNG III. PHÂN TÍCH TÍNH KHẢ THI VÀ RỦI RO

## 1. Khả thi về phạm vi và nghiệp vụ

Phạm vi 12 chi nhánh trong một thành phố, một doanh nghiệp, kho riêng tại từng chi nhánh, loại bỏ các yếu tố phức tạp (nhượng quyền, đa pháp nhân, kho vùng, thuế liên tỉnh) nhưng vẫn giữ đủ nghiệp vụ chuỗi.

Các luồng nghiệp vụ (bán lẻ, online, sỉ, thành viên, kho, sự cố, báo cáo) đều đã được mô tả, có biểu mẫu và quy định tương ứng. Nghiệp vụ trà sữa quen thuộc nên việc mô phỏng dữ liệu và kịch bản không cần kiến thức chuyên ngành sâu.

## 2. Đánh giá tổng hợp

**Bảng 14. Tổng hợp tính khả thi**

| **Khía cạnh** | **Mức đánh giá** | **Nhận xét chính** |
| --- | --- | --- |
| **Phạm vi, nghiệp vụ** | Khả thi | Quy mô 12 chi nhánh, một doanh nghiệp, đủ nghiệp vụ chuỗi, loại trừ nhượng quyền và đa pháp nhân |
| **Kỹ thuật** | Khả thi (cần lưu ý) | Web nguyên khối phân lớp; cơ chế offline và đồng bộ chống trùng là điểm khó nhất, cần thử sớm |
| **Vận hành, người dùng** | Khả thi | Phân quyền theo vai trò, POS ít bước, có quy trình sự cố |
| **Thời gian, nguồn lực** | Khả thi có điều kiện | Phải giữ MVP và kiểm soát phạm vi |
| **Kinh tế** | Khả thi | Chi phí thấp nhờ công cụ mở và dữ liệu mô phỏng |
| **Pháp lí, dữ liệu** | Khả thi trong phạm vi đồ án | Tối thiểu hóa dữ liệu; thanh toán và hóa đơn giả lập |
