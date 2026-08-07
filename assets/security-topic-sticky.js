window.SECURITY_TOPICS=window.SECURITY_TOPICS||[];
window.SECURITY_TOPICS.push({
  id:"sticky",
  label:"Cisco Port Security Sticky",
  icon:"PSEC",
  title:"Port Security Sticky — หาและแก้ Sticky MAC",
  body:`สรุป
Port Security Sticky ใช้เรียนรู้และผูก MAC Address กับ Switch Port
ถ้าเปลี่ยน PC / IP Phone / อุปกรณ์ใหม่ อาจเกิด Security Violation หรือ Port Err-disabled ได้

1. วิธีหา Sticky MAC

show port-security address
show port-security interface Gi1/0/10
show running-config interface Gi1/0/10
show mac address-table interface Gi1/0/10

ถ้าพบ:
switchport port-security
switchport port-security mac-address sticky
switchport port-security mac-address sticky 0011.2233.4455
แสดงว่าพอร์ตนี้ใช้ Sticky MAC

2. วิธีหาเมื่อ Port ใช้งานไม่ได้

show interfaces status err-disabled
show logging | include PSECURE|PORT_SECURITY|ERR_DISABLE
show port-security interface Gi1/0/10

ดู Violation Count, Secure MAC และสถานะ Port

3. วิธีทำ / เปิด Sticky Learning
ตรวจว่าเป็น Access Port ที่ถูกต้องก่อน แล้วใช้:

conf t
interface Gi1/0/10
switchport port-security
switchport port-security mac-address sticky
end

จากนั้นให้อุปกรณ์เชื่อมต่อเพื่อให้ Switch เรียนรู้ MAC และตรวจ:
show port-security address
show running-config interface Gi1/0/10

4. วิธีแก้เมื่อเปลี่ยนอุปกรณ์
ตรวจให้แน่ใจว่า MAC เดิมไม่ได้ใช้งานอยู่ แล้วลบเฉพาะ Sticky MAC เดิม:

conf t
interface Gi1/0/10
no switchport port-security mac-address sticky 0011.2233.4455
shutdown
no shutdown
end

อุปกรณ์ใหม่จึงสามารถเรียนรู้ MAC ใหม่ตาม Config ที่กำหนดไว้

5. ตรวจหลังแก้
show port-security interface Gi1/0/10
show port-security address
show mac address-table interface Gi1/0/10
show interfaces status

ตรวจว่า Port Up, Violation ไม่เพิ่ม และ MAC ใหม่ถูกเรียนรู้ถูกต้อง

ข้อควรระวัง
- ตรวจ Port และ MAC เดิมก่อนลบทุกครั้ง
- Shutdown / No Shutdown ควรทำหลังแก้ Sticky MAC หรือ Root Cause แล้ว
- อย่าปิด Port Security ทั้งหมดเพียงเพื่อให้ User ใช้งานได้

จำง่าย
MAC + Switch Port → จำกัดอุปกรณ์ที่อนุญาต`});
