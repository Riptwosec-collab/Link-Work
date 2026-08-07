window.SECURITY_TOPICS=window.SECURITY_TOPICS||[];
window.SECURITY_TOPICS.push({
  id:"dai",
  label:"DAI Err-disable",
  icon:"DAI",
  title:"DAI Err-disable — ARP Inspection",
  body:`สรุป
DAI (Dynamic ARP Inspection) ตรวจ ARP เทียบกับ DHCP Snooping Binding เพื่อป้องกัน ARP Spoofing
Binding ไม่ตรง → ARP อาจถูก Drop
ARP Rate สูงเกิน → Port อาจ Err-disable

1. วิธีหา / ตรวจสอบ
เริ่มจากดูว่า Port ถูก Err-disable หรือไม่:

show interfaces status err-disabled
show ip arp inspection interfaces
show ip arp inspection statistics
show ip dhcp snooping binding
show logging | include ARP|DAI|INSPECTION|ERR_DISABLE

ถ้า Reason = arp-inspection ให้ตรวจ DAI ต่อทันที

2. วิธีไล่หาสาเหตุ
ตรวจ 4 ค่าให้ตรงกัน:
IP + MAC + VLAN + Port

ใช้:
show ip dhcp snooping binding
show mac address-table interface Gi1/0/10
show running-config interface Gi1/0/10
show ip arp inspection interfaces Gi1/0/10

ดูว่าเป็นกรณีใด:
- Binding ไม่ตรง
- Client ใช้ Static IP
- VLAN/Port Mapping ผิด
- ARP Rate สูงผิดปกติ
- Trust Port ตั้งไม่ถูก

3. วิธีทำ / แก้ Root Cause
ถ้า Client ใช้ DHCP ให้ตรวจและ Renew DHCP เพื่อให้ Binding ถูกสร้างใหม่
ถ้าเป็น Static IP ให้ตรวจวิธีรองรับ Static Host ตาม Network Design
ถ้า ARP Rate สูง ให้หา Loop / ARP Flood / Device ผิดปกติก่อน

ห้ามแก้โดยปิด DAI หรือใส่ trust บน User Access Port แบบสุ่ม

4. Recover Port หลังแก้สาเหตุแล้ว

conf t
interface Gi1/0/10
shutdown
no shutdown
end

5. ตรวจหลังแก้
show interfaces status
show ip arp inspection statistics
show ip dhcp snooping binding
show logging | include ARP|DAI|INSPECTION|ERR_DISABLE

ถ้า Port Up และ Drop/Err-disable ไม่เพิ่มซ้ำ แสดงว่าแก้สาเหตุได้แล้ว

ข้อควรระวัง
Shutdown / No Shutdown เป็นแค่การ Recover Port ไม่ใช่การแก้ Root Cause
ถ้ายังมี Binding หรือ Rate Problem พอร์ตอาจ Err-disable ซ้ำ

จำง่าย
Binding ผิด → DROP
Rate เกิน → ERR-DISABLE`});
