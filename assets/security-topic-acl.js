window.SECURITY_TOPICS=window.SECURITY_TOPICS||[];
window.SECURITY_TOPICS.push({
  id:"acl",
  label:"ACL — Block IP",
  icon:"ACL",
  title:"ACL — Block IP Address",
  body:`สรุป
Extended ACL ใช้ Permit / Deny Traffic ตาม Source IP, Destination IP และ Protocol
ตัวอย่างนี้ Block Source IP 192.168.1.10 ไปทุกปลายทาง และอนุญาต IP อื่นผ่านต่อ

ตัวอย่าง
access-list 101 deny ip host 192.168.1.10 any
access-list 101 permit ip any any

1. วิธีหา / ตรวจสอบ ACL

show ip access-lists 101
show access-lists 101
show running-config | include access-list 101
show running-config | include access-group

ดู Hit Counter ของ Rule deny ถ้าตัวเลขเพิ่ม แสดงว่า Traffic กำลัง Match Rule นี้

2. หา Interface ที่ Apply ACL
ACL มี Rule อย่างเดียวจะยังไม่ทำงาน ต้องถูก Apply ที่ Interface ด้วย

ตรวจ:
show ip interface
show running-config interface GigabitEthernet1/0/1

ตัวอย่าง:
ip access-group 101 in

ต้องเช็กทั้ง Interface และ Direction ว่า in / out ถูกต้อง

3. วิธีทำ / Block IP
ถ้าต้องสร้าง ACL ใหม่หรือเพิ่ม Rule ให้จัด Sequence ให้ถูก:

conf t
ip access-list extended 101
10 deny ip host 192.168.1.10 any
20 permit ip any any
exit
interface GigabitEthernet1/0/1
ip access-group 101 in
end

ตรวจผล:
show ip access-lists 101
show ip interface GigabitEthernet1/0/1

4. วิธีแก้ / Unblock IP
ตรวจ Security Policy ก่อน แล้วลบเฉพาะ Sequence ที่ต้องการ ไม่ลบ ACL ทั้งชุด

conf t
ip access-list extended 101
no 10
end

5. ตรวจหลังแก้
show ip access-lists 101
show running-config | include access-group
ping <destination-ip>

ตรวจว่ามี Rule ที่ต้องใช้เหลือครบ และ Traffic กลับมาใช้งานได้

ข้อควรระวัง
- ACL อ่านจากบนลงล่าง และหยุดเมื่อ Match Rule แรก
- มี implicit deny อยู่ท้าย ACL อัตโนมัติ
- อย่าวาง permit ip any any ไว้ก่อน Rule deny ที่ต้องการใช้งาน

จำง่าย
Source / Destination IP → ACL → DENY หรือ PERMIT`});
