// Google Apps Script - Thông tin khách hàng
// File: Code.gs

function doGet() {
  return HtmlService.createTemplateFromFile('index')
    .evaluate()
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}

// Lấy thông tin khách hàng từ dòng A2, B2
function getDefaultCustomerInfo() {
  try {
    const ss = SpreadsheetApp.openById('1XPmwVpdgG7AX_02uZiHvFlYwpRV-xU2f7L0DAYH3P40'); // Thay bằng ID của Google Sheet
    const sheet = ss.getSheetByName('KhachHang') || ss.insertSheet('KhachHang');
    
    // Lấy dữ liệu từ A2 và B2
    const nameCell = sheet.getRange('A2').getValue();
    const phoneCell = sheet.getRange('B2').getValue();
    
    if (nameCell && phoneCell) {
      return {
        success: true,
        name: nameCell.toString(),
        phone: phoneCell.toString()
      };
    } else {
      return { 
        success: false, 
        error: 'Không có dữ liệu trong A2 hoặc B2' 
      };
    }
  } catch (error) {
    console.error('Error getting default customer info:', error);
    return { success: false, error: error.toString() };
  }
}

// Kiểm tra mã VGA đã tồn tại chưa
function checkVGACode(vgaCode) {
  try {
    const ss = SpreadsheetApp.openById('1XPmwVpdgG7AX_02uZiHvFlYwpRV-xU2f7L0DAYH3P40');
    const sheet = ss.getSheetByName('DangKy') || ss.insertSheet('DangKy');
    
    const data = sheet.getDataRange().getValues();
    
    // Tìm mã VGA (cột E - index 4)
    for (let i = 1; i < data.length; i++) {
      if (data[i][4] === vgaCode) {
        return { exists: true, row: i + 1 };
      }
    }
    
    return { exists: false };
  } catch (error) {
    console.error('Error checking VGA code:', error);
    return { exists: false, error: error.toString() };
  }
}

// Lưu thông tin đăng ký
function saveRegistration(formData) {
  try {
    const ss = SpreadsheetApp.openById('1XPmwVpdgG7AX_02uZiHvFlYwpRV-xU2f7L0DAYH3P40');
    const sheet = ss.getSheetByName('DangKy') || ss.insertSheet('DangKy');
    
    // Tạo header nếu sheet trống
    if (sheet.getLastRow() === 0) {
      sheet.getRange(1, 1, 1, 8).setValues([[
        'Họ và tên', 'Số điện thoại', 'Giới tính', 'Ngày sinh', 'Mã VGA', 'Size áo', 'Yêu cầu khác', 'Thời gian đăng ký'
      ]]);
    }
    
    // Kiểm tra mã VGA
    const vgaCheck = checkVGACode(formData.vgaCode);
    
    const rowData = [
      formData.name,
      formData.phone,
      formData.gender,
      formData.birthDate,
      formData.vgaCode,
      formData.size,
      formData.yeucaukhac || '',
      new Date()
    ];
    
    if (vgaCheck.exists) {
      // Ghi đè thông tin nếu mã VGA đã tồn tại
      sheet.getRange(vgaCheck.row, 1, 1, 8).setValues([rowData]);
      return { success: true, message: 'Đã cập nhật thông tin thành công!', updated: true };
    } else {
      // Thêm dòng mới
      sheet.appendRow(rowData);
      return { success: true, message: 'Đăng ký thành công!', updated: false };
    }
    
  } catch (error) {
    console.error('Error saving registration:', error);
    return { success: false, error: error.toString() };
  }
}

// Hàm test để tạo dữ liệu mẫu
function createSampleData() {
  const ss = SpreadsheetApp.openById('1XPmwVpdgG7AX_02uZiHvFlYwpRV-xU2f7L0DAYH3P40');
  
  // Tạo sheet KhachHang với dữ liệu mẫu
  const customerSheet = ss.getSheetByName('KhachHang') || ss.insertSheet('KhachHang');
  customerSheet.clear();
  customerSheet.getRange(1, 1, 4, 2).setValues([
    ['Họ và tên', 'Số điện thoại'],
    ['Nguyễn Văn A', '0901234567'],
    ['Trần Thị B', '0987654321'],
    ['Lê Văn C', '0912345678']
  ]);
  
  console.log('Đã tạo dữ liệu mẫu');
}