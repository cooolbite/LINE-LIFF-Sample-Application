# LINE LIFF Application

เว็บแอพพลิเคชั่น LINE LIFF สำหรับเก็บข้อมูลผู้ใช้และบันทึกลงฐานข้อมูล MySQL

## ฟีเจอร์

- ✅ LINE Login integration
- ✅ เก็บข้อมูล userid จาก LINE
- ✅ ฟอร์มกรอกข้อมูลส่วนตัว (อีเมล, เบอร์โทร, ที่อยู่, วันเกิด)
- ✅ บันทึกข้อมูลลงฐานข้อมูล MySQL
- ✅ UI ที่สวยงามและใช้งานง่าย
- ✅ Responsive design

## การติดตั้ง

### 1. ติดตั้ง Dependencies

```bash
npm install
```

### 2. ตั้งค่าฐานข้อมูล MySQL

1. สร้างฐานข้อมูล MySQL:
```sql
CREATE DATABASE line_liff_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

2. รันไฟล์ SQL:
```bash
mysql -u root -p < database.sql
```

### 3. ตั้งค่า Environment Variables

แก้ไขไฟล์ `config.env`:

```env
# Database Configuration
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=line_liff_db
DB_PORT=3306

# Server Configuration
PORT=3000

# LINE LIFF Configuration
LIFF_ID=your_liff_id_here
```

### 4. ตั้งค่า LINE LIFF

1. ไปที่ [LINE Developers Console](https://developers.line.biz/)
2. สร้าง Channel ใหม่
3. เปิดใช้งาน LIFF
4. เพิ่ม LIFF App และรับ LIFF ID
5. แก้ไขไฟล์ `public/app.js` และ `public/index.html` โดยแทนที่ `your_liff_id_here` ด้วย LIFF ID จริง

### 5. รันแอพพลิเคชั่น

```bash
# Development mode
npm run dev

# Production mode
npm start
```

แอพพลิเคชั่นจะรันที่ `http://localhost:3000`

## โครงสร้างโปรเจค

```
line-liff-app/
├── public/
│   ├── index.html      # หน้าเว็บหลัก
│   └── app.js          # JavaScript สำหรับ LINE LIFF
├── server.js           # Express server และ API
├── database.sql        # SQL script สำหรับสร้างฐานข้อมูล
├── config.env          # Environment variables
├── package.json        # Dependencies
└── README.md           # คู่มือการใช้งาน
```

## API Endpoints

### POST /api/users
บันทึกข้อมูลผู้ใช้

**Request Body:**
```json
{
  "line_user_id": "U1234567890abcdef",
  "display_name": "สมชาย ใจดี",
  "email": "somchai@example.com",
  "phone": "0812345678",
  "address": "123 ถนนสุขุมวิท กรุงเทพฯ",
  "birth_date": "1990-05-15"
}
```

### GET /api/users/:line_user_id
ดึงข้อมูลผู้ใช้ตาม LINE User ID

## การใช้งาน

1. ผู้ใช้เปิดเว็บแอพใน LINE
2. กดปุ่ม "เข้าสู่ระบบด้วย LINE"
3. อนุญาตให้แอพเข้าถึงข้อมูล LINE Profile
4. กรอกข้อมูลส่วนตัวในฟอร์ม
5. กดปุ่ม "บันทึกข้อมูล"

## การแก้ไขปัญหา

### ไม่สามารถเชื่อมต่อฐานข้อมูลได้
- ตรวจสอบการตั้งค่า MySQL ใน `config.env`
- ตรวจสอบว่า MySQL service กำลังรันอยู่
- ตรวจสอบ username และ password

### LINE Login ไม่ทำงาน
- ตรวจสอบ LIFF ID ในไฟล์ `public/app.js` และ `public/index.html`
- ตรวจสอบการตั้งค่า LIFF ใน LINE Developers Console
- ตรวจสอบว่า URL ของเว็บแอพตรงกับที่ตั้งไว้ใน LIFF

### ข้อมูลไม่ถูกบันทึก
- ตรวจสอบ Console ใน Developer Tools
- ตรวจสอบ Network tab สำหรับ API calls
- ตรวจสอบ error logs ใน server console

## เทคโนโลยีที่ใช้

- **Frontend**: HTML5, CSS3, JavaScript (ES6+), Bootstrap 5
- **Backend**: Node.js, Express.js
- **Database**: MySQL
- **LINE Integration**: LINE LIFF SDK v2

## License

MIT License

## การสนับสนุน

หากมีปัญหาหรือคำถาม กรุณาสร้าง Issue ในโปรเจคนี้

## ผู้พัฒนา

**พัฒนาโดย:** cooolbite  
**เวอร์ชัน:** 1.0.0  
**วันที่พัฒนา:** 2025
