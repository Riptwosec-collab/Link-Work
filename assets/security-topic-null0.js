window.SECURITY_TOPICS=window.SECURITY_TOPICS||[];
window.SECURITY_TOPICS.push({
  id:"null0",
  label:"Static Route to Null0",
  icon:"NUL",
  title:"Static Route to Null0 — Blackhole Route",
  body:`สรุป
Static Route ไป Null0 คือการทิ้ง Traffic ที่มีปลายทางตรงกับ Route นั้น ใช้เป็น Blackhole Route หรือ Block Destination IP

ตัวอย่าง
ip route 10.54.2.56 255.255.255.255 Null0

คำสั่งนี้หมายถึง Traffic ที่ไป 10.54.2.56/32 จะถูกส่งเข้า Null0 และ Drop

1. วิธีหา / ตรวจสอบ

show ip route 10.54.2.56
show ip route static
show running-config | include 10.54.2.56

ถ้าพบ:
S 10.54.2.56/32 is directly connected, Null0
แสดงว่า IP นี้ถูก Blackhole อยู่

2. วิธีทำ / เพิ่ม Null0 Route
ตรวจ Destination IP ให้ถูกก่อน แล้วใช้:

conf t
ip route 10.54.2.56 255.255.255.255 Null0
end

ตรวจผล:
show ip route 10.54.2.56
show running-config | include 10.54.2.56

3. วิธีหาเมื่อปลายทางเข้าไม่ได้
ทดสอบก่อน:
ping 10.54.2.56
traceroute 10.54.2.56

จากนั้นตรวจ Routing Table ว่ามี /32 ไป Null0 หรือไม่
ถ้ามี ให้ตรวจว่า Route ถูกสร้างไว้จาก Security Policy หรือ Network Design หรือไม่

4. วิธีแก้ / ลบ Route
ถ้าได้รับอนุญาตให้เอาออก:

conf t
no ip route 10.54.2.56 255.255.255.255 Null0
end

5. ตรวจหลังแก้
show ip route 10.54.2.56
show ip route static
ping 10.54.2.56
traceroute 10.54.2.56

ตรวจว่า Route ไป Null0 หายแล้ว และปลายทางกลับมาติดต่อได้ตาม Route ปกติ

ข้อควรระวัง
- ตรวจ IP / Mask ให้ถูกก่อนเพิ่มหรือลบ Route
- อย่าลบ Null0 Route โดยไม่รู้เหตุผล เพราะอาจใช้เพื่อ Security หรือป้องกัน Routing Loop ตาม Design

จำง่าย
Destination IP → Null0 → DROP`});
