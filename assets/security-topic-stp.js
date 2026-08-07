window.SECURITY_TOPICS=window.SECURITY_TOPICS||[];
window.SECURITY_TOPICS.push({
  id:"stp",
  label:"Cisco STP Blocked Ports",
  icon:"STP",
  title:"STP Blocked Ports — ตรวจพอร์ตที่ถูก Block",
  body:`สรุป
STP จะ Block / Discarding บางพอร์ตเพื่อป้องกัน Layer 2 Loop โดยเฉพาะ Network ที่มี Redundant Link
ดังนั้น Blocked Port ไม่ได้แปลว่าพอร์ตเสียเสมอไป

1. วิธีหา Blocked Port

show spanning-tree blockedports
show spanning-tree inconsistentports

ถ้าพบพอร์ต ให้จด VLAN และ Interface ที่ถูก Block

2. วิธีตรวจสาเหตุ
ตรวจ STP ของ VLAN:

show spanning-tree vlan 514
show spanning-tree root
show spanning-tree interface Gi1/0/48 detail

ดูค่า:
Role / State / Root Bridge / Cost / Priority

ตรวจ Physical / Topology เพิ่มเติม:
show interfaces status
show interfaces trunk
show cdp neighbors detail
show logging | include SPANTREE|STP|LOOP|BPDU

3. วิธีทำเมื่อเจอ Block
ถ้าเป็น Alternate / Backup Link ตาม Design → ไม่ต้องแก้ เพราะ STP ทำงานปกติ

ถ้าพอร์ตที่ควรเป็นเส้นหลักถูก Block ให้ตรวจ:
- Root Bridge ถูกตัวหรือไม่
- Port Cost / Priority
- Uplink / Trunk
- มีสายต่อซ้ำหรือเกิด Loop หรือไม่
- Topology มีการเปลี่ยนแปลงหรือไม่

4. วิธีแก้
แก้ที่ Root Cause เช่น Cabling, Root/Cost/Priority หรือ Redundant Link ให้ตรงกับ Network Design
จากนั้นตรวจ STP ใหม่ ไม่ควร Force Port ให้ Forward แบบสุ่ม

5. ตรวจหลังแก้
show spanning-tree blockedports
show spanning-tree vlan 514
show spanning-tree root
show spanning-tree interface Gi1/0/48 detail

ดูว่า Port Role/State เปลี่ยนตามที่ออกแบบไว้ และไม่มี Loop / Topology Change ผิดปกติ

ข้อควรระวัง
- อย่าปิด STP เพื่อแก้ปัญหา
- อย่า Shutdown / No Shutdown หรือถอดสายแบบสุ่มโดยยังไม่รู้ Topology
- การ Force Forward ผิดพลาดอาจทำให้ Broadcast Storm และ Network Down

จำง่าย
Primary Path → FORWARDING
Backup Path → BLOCK / DISCARDING`});
