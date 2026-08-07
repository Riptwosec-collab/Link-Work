window.SECURITY_TOPICS=window.SECURITY_TOPICS||[];
window.SECURITY_TOPICS.push({
  id:"mac",
  label:"MAC Address Drop",
  icon:"MAC",
  title:"MAC Address Drop — Block MAC ใน VLAN",
  body:`สรุป
ใช้ Static MAC Drop เพื่อ Block MAC Address ที่กำหนดเฉพาะ VLAN นั้น ๆ โดย Traffic ที่ตรงกับ MAC + VLAN จะถูก Drop

ตัวอย่าง
mac address-table static f48e.38ab.10fe vlan 514 drop

1. วิธีหา / ตรวจสอบ
เช็กว่า MAC ถูก Block อยู่หรือไม่:

show mac address-table address f48e.38ab.10fe
show mac address-table static
show running-config | include f48e.38ab.10fe
show mac address-table vlan 514

ถ้าพบคำสั่งที่ลงท้ายด้วย drop แสดงว่า MAC นี้ถูก Block ใน VLAN ที่ระบุ

2. วิธีทำ / Block MAC
ตรวจ MAC และ VLAN ให้ถูกก่อน จากนั้น:

conf t
mac address-table static f48e.38ab.10fe vlan 514 drop
end

ตรวจผล:
show mac address-table address f48e.38ab.10fe
show mac address-table static

3. วิธีแก้ / Unblock
ตรวจสอบก่อนว่า MAC ถูก Block จาก Security Policy หรือ Incident หรือไม่

conf t
no mac address-table static f48e.38ab.10fe vlan 514 drop
end

4. ตรวจหลังแก้
show mac address-table address f48e.38ab.10fe
show mac address-table vlan 514
ping <gateway>

ถ้า MAC กลับมาเรียนรู้ตามปกติและใช้งาน Network ได้ แสดงว่าแก้สำเร็จ

ข้อควรระวัง
- ตรวจ MAC และ VLAN ให้ตรงก่อนเพิ่มหรือลบ Rule
- เปลี่ยน Physical Port อย่างเดียวอาจไม่หาย เพราะการ Block ผูกกับ MAC + VLAN
- อย่าลบ Rule ถ้ายังไม่ทราบเหตุผลที่ถูก Block

จำง่าย
MAC + VLAN → DROP`});
