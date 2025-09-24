# Google Apps Script - Form Đăng Ký Thông Tin Khách Hàng

## Mô tả
Ứng dụng web form đăng ký thông tin khách hàng cho hãng hàng không với giao diện đẹp mắt, tông màu xanh dương chủ đạo.

## Tính năng
- ✅ Tìm kiếm thông tin khách hàng từ Google Sheet
- ✅ Form với các trường: Họ tên, SĐT, Giới tính, Ngày sinh, Mã VGA, Size áo
- ✅ Trường họ tên và SĐT chỉ đọc (lấy từ dữ liệu có sẵn)
- ✅ Giới tính: Radio button Nam/Nữ
- ✅ Ngày sinh: Date picker
- ✅ Mã VGA: Kiểm tra trùng lặp, ghi đè nếu trùng
- ✅ Size áo: Button chọn S/M/L/XL với hình ảnh mô tả
- ✅ Hiệu ứng thành công với animation và confetti
- ✅ Giao diện responsive, background gradient xanh dương
- ✅ Lưu trữ dữ liệu trong Google Sheet

## Cấu trúc file
```
google-apps-script/
├── Code.gs          # Server-side logic (Google Apps Script)
├── index.html       # Main HTML template
├── styles.html      # CSS styles
└── script.html      # Client-side JavaScript
```

## Cách triển khai

### Bước 1: Tạo Google Apps Script Project
1. Truy cập [script.google.com](https://script.google.com)
2. Tạo project mới
3. Copy nội dung từ các file vào project:
   - `Code.gs` → Code.gs
   - `index.html` → index.html
   - `styles.html` → styles.html
   - `script.html` → script.html

### Bước 2: Tạo Google Sheet
1. Tạo Google Sheet mới
2. Copy ID của Sheet (từ URL)
3. Thay thế `YOUR_SPREADSHEET_ID` trong `Code.gs` bằng ID thực tế

### Bước 3: Thiết lập dữ liệu
1. Chạy function `createSampleData()` để tạo dữ liệu mẫu
2. Hoặc tự tạo sheet "KhachHang" với format:
   ```
   A: Họ và tên    B: Số điện thoại
   Nguyễn Văn A   0901234567
   Trần Thị B     0987654321
   ```

### Bước 4: Deploy
1. Trong Apps Script Editor: Deploy > New deployment
2. Type: Web app
3. Execute as: Me
4. Who has access: Anyone
5. Deploy và copy URL

## Cấu trúc Google Sheet

### Sheet "KhachHang" (Dữ liệu khách hàng có sẵn)
| A (Họ và tên) | B (Số điện thoại) |
|---------------|-------------------|
| Nguyễn Văn A  | 0901234567       |
| Trần Thị B    | 0987654321       |

### Sheet "DangKy" (Dữ liệu đăng ký)
| A | B | C | D | E | F | G |
|---|---|---|---|---|---|---|
| Họ và tên | Số điện thoại | Giới tính | Ngày sinh | Mã VGA | Size áo | Thời gian đăng ký |

## Tùy chỉnh

### Thay đổi background
- Trong `styles.html`, tìm class `.background`
- Thêm `background-image: url('data:image/jpeg;base64,YOUR_BASE64_IMAGE');`

### Thêm logo thực
- Thay thế `.logo-placeholder` trong `index.html`
- Hoặc thêm `<img src="logo_url" alt="Logo" />`

### Tùy chỉnh màu sắc
- Sửa các biến màu trong `styles.html`:
  - `#1e3a8a` (xanh đậm)
  - `#3b82f6` (xanh chính)
  - `#60a5fa` (xanh nhạt)

## API Functions

### `getCustomerInfo(phone)`
Tìm thông tin khách hàng theo số điện thoại

### `checkVGACode(vgaCode)`
Kiểm tra mã VGA đã tồn tại

### `saveRegistration(formData)`
Lưu thông tin đăng ký

### `createSampleData()`
Tạo dữ liệu mẫu cho testing

## Troubleshooting

### Lỗi thường gặp:
1. **"Script function not found"**: Kiểm tra tên function trong Code.gs
2. **"Permission denied"**: Cấp quyền truy cập Google Sheet
3. **"Spreadsheet not found"**: Kiểm tra SPREADSHEET_ID
4. **Form không submit**: Kiểm tra validation và network

### Debug:
- Mở Developer Tools (F12) để xem console errors
- Kiểm tra Execution transcript trong Apps Script Editor
- Test từng function riêng lẻ

## License
MIT License - Tự do sử dụng và chỉnh sửa

tạo cho tôi một google app script với header là Thông tin khách hàng, các trường thông tin bao gồm: họ và tên, số điện thoại, giới tính, ngày sinh, mã VGA, size áo. Với yêu cầu: họ và tên cùng số điện thoại là thông tin từ google sheet, tuy nhiên sẽ chỉ hiển thị thông tin chứ không cho chỉnh sửa 2 ô này; giới tính chọn nam nữ; ngày sinh chọn ngày tháng năm; mã VGA cho ghi bình thường nhưng yêu cầu mã này chỉ được ghi nhận 1 lần, nếu trùng ghi đè lại thông tin (nếu được, hoặc phương án khác); size áo là nút bấm chọn các size S,M,L,XL khi chọn có hình ảnh mô tả ở dưới. Nút bấm gửi khi hoàn thiện tất cả thông tin thì sẽ hiện đã đăng kí thành công cùng chút hiệu ứng; tất cả thông tin được ghi lại trong 1 google sheet. Giao diện yêu cầu có background đằng sau, chắc tôi sẽ lưu dưới dạng base64; thiết kế giao diện phù hợp với background có tông màu xanh dương chủ đạo cùng ít chút màu trắng, logo ở giữa (đây là 1 hãng hàng không).