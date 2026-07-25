# LinkWork

เครื่องมือหน้าเว็บเดียวสำหรับงานประจำวันและงาน NOC รองรับ Quick Copy Log, Custom Log, ประวัติการคัดลอก, ค้นหา, สำรอง/กู้คืนข้อมูล และ PowerShell Script สำหรับเปิดลิงก์งานทั้งหมดด้วย Google Chrome หรือ Microsoft Edge

## การใช้งาน

เปิดไฟล์ `index.html` ได้โดยตรง หรือ Deploy ผ่าน GitHub Pages/Vercel ได้ทันที

`index.html` เป็น Standalone HTML และไม่มีการเรียก `fetch()` เพื่อโหลด Application Payload จึงไม่เกิดข้อผิดพลาด `Failed to fetch` เมื่อเปิดไฟล์จากเครื่อง

## ฟังก์ชันหลัก

- ข้อความทั่วไป: สาเหตุ / แก้ไขโดย
- Custom Log พร้อมตัวแปร `{{DATE}}` และ `{{TIME}}`
- Device Hang, ติดต่อเจ้าหน้าที่ไม่ได้ และ Link Up
- Copy All และประวัติการคัดลอก 30 รายการ
- สำรองและกู้คืนข้อมูล JSON
- Popup คัดลอก PowerShell Script สำหรับ Chrome และ Edge
- Responsive สำหรับคอมพิวเตอร์ แท็บเล็ต และโทรศัพท์
