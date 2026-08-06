(()=>{
  "use strict";
  const ready=fn=>document.readyState!=="loading"?fn():document.addEventListener("DOMContentLoaded",fn,{once:true});
  ready(()=>{
    const quickTitle=document.getElementById("quickToolsTitle") || [...document.querySelectorAll(".section-title h2")].find(el=>el.textContent.includes("ข้อความใช้บ่อย"));
    const quickSection=quickTitle?.closest("section") || quickTitle?.closest(".section");
    const quickGrid=quickSection?.querySelector(".quick-grid");
    if(!quickGrid)return;

    const existingButton=document.getElementById("openIpPhoneGuide");
    if(existingButton)existingButton.remove();
    const oldOverlay=document.getElementById("ipPhoneGuide");
    if(oldOverlay)oldOverlay.remove();

    const button=document.createElement("button");
    button.className="work-link";
    button.id="openIpPhoneGuide";
    button.type="button";
    button.innerHTML='<span class="link-icon">IP</span><span class="link-copy"><span class="link-name">คู่มือ IP Phone</span><span class="link-url">Cisco · Nortel · Setup · Troubleshooting</span></span><span class="link-arrow">›</span>';
    quickGrid.appendChild(button);

    const nortelPath="\\\\10.1.1.94\\share\\noc\\2.คู่มือการทำงาน\\";
    const audioPing='ping <AudioCodes-IP>';
    const overlay=document.createElement("div");
    overlay.className="ipg-overlay";
    overlay.id="ipPhoneGuide";
    overlay.setAttribute("aria-hidden","true");
    overlay.innerHTML=`
      <div class="ipg-app">
        <header class="ipg-topbar">
          <div class="ipg-brand"><div class="ipg-brand-icon">IP</div><div><h2>IP Phone Setup & Troubleshooting</h2><p>คู่มือสำหรับทีม IT/NOC</p></div></div>
          <button class="btn ipg-close" id="closeIpPhoneGuide" type="button">ปิดคู่มือ</button>
        </header>
        <div class="ipg-layout">
          <aside class="ipg-sidebar">
            <div class="ipg-search"><input class="input" id="ipgSearch" type="search" placeholder="ค้นหาในคู่มือ" autocomplete="off"></div>
            <nav class="ipg-nav" aria-label="เมนูคู่มือ IP Phone">
              <button class="active" data-ipg-target="ipg-important" type="button"><span>1</span>ข้อมูลสำคัญ</button>
              <button data-ipg-target="ipg-cisco" type="button"><span>2</span>วิธีเข้าใช้งาน Cisco</button>
              <button data-ipg-target="ipg-check" type="button"><span>3</span>วิธีตรวจสอบเบื้องต้น</button>
              <button data-ipg-target="ipg-trouble" type="button"><span>4</span>อาการและวิธีแก้</button>
              <button data-ipg-target="ipg-command" type="button"><span>5</span>คำสั่งตรวจสอบ</button>
              <button data-ipg-target="ipg-flow" type="button"><span>6</span>Quick Fix Flow</button>
            </nav>
          </aside>
          <main class="ipg-content">
            <section class="ipg-hero"><h1>IP Phone Setup & Troubleshooting</h1><p>คู่มือการใช้งานและ Troubleshooting สำหรับ Cisco, Nortel และ AudioCodes</p></section>

            <section class="ipg-section" id="ipg-important" data-ipg-search="ข้อมูลสำคัญ Cisco Nortel Remote Desktop Internet Explorer คู่มือ ไฟล์">
              <div class="ipg-title"><div class="ipg-num">1</div><div><h2>ข้อมูลสำคัญ</h2><p>Cisco, Nortel และตำแหน่งไฟล์คู่มือ</p></div></div>
              <div class="ipg-card-grid">
                <article class="ipg-card ipg-status-normal"><h3>Cisco</h3><p>จัดการผ่าน <span class="ipg-value">Remote Desktop</span> และ <span class="ipg-value">Internet Explorer</span></p></article>
                <article class="ipg-card ipg-status-normal"><h3>Nortel</h3><p>ดูข้อมูลจากตำแหน่งไฟล์คู่มือ</p></article>
                <article class="ipg-card ipg-status-normal"><h3>Remote Desktop</h3><p class="ipg-value">10.14.1.1</p><div class="ipg-card-actions"><button class="btn ipg-mini" data-ipg-copy="10.14.1.1" type="button">Copy IP</button></div></article>
                <article class="ipg-card"><h3>Username</h3><p class="ipg-value">Administrator</p></article>
                <article class="ipg-card ipg-status-warn"><h3>Password</h3><p class="ipg-value ipg-password" id="ipgPassword">********</p><div class="ipg-card-actions"><button class="btn ipg-mini" id="ipgPasswordButton" type="button">ดูรหัสผ่าน (ผู้มีสิทธิ์)</button></div></article>
                <article class="ipg-card"><h3>Internet Explorer</h3><p>ใช้สำหรับเข้า IP ของโทรศัพท์</p></article>
                <article class="ipg-card ipg-field-full"><h3>คู่มือ Nortel</h3><p class="ipg-value">${nortelPath}</p><div class="ipg-card-actions"><button class="btn ipg-mini" id="ipgCopyNortelPath" type="button">Copy Path</button></div></article>
                <article class="ipg-card"><h3>ไฟล์</h3><p class="ipg-value">10. IP-Phone-ATA-Number__30-05-2019</p><div class="ipg-card-actions"><button class="btn ipg-mini" data-ipg-copy="10. IP-Phone-ATA-Number__30-05-2019" type="button">Copy</button></div></article>
              </div>
            </section>

            <section class="ipg-section" id="ipg-cisco" data-ipg-search="วิธีเข้าใช้งาน Cisco Remote Desktop 10.14.1.1 Login Internet Explorer IP โทรศัพท์">
              <div class="ipg-title"><div class="ipg-num">2</div><div><h2>วิธีเข้าใช้งาน Cisco</h2><p>ทำตามลำดับ</p></div></div>
              <div class="ipg-steps">
                <div class="ipg-step"><div><b>เปิด Remote Desktop</b></div></div>
                <div class="ipg-step"><div><b>ใส่ 10.14.1.1</b></div></div>
                <div class="ipg-step"><div><b>Login</b></div></div>
                <div class="ipg-step"><div><b>เปิด Internet Explorer</b></div></div>
                <div class="ipg-step"><div><b>เข้า IP ของโทรศัพท์</b></div></div>
              </div>
            </section>

            <section class="ipg-section" id="ipg-check" data-ipg-search="วิธีตรวจสอบเบื้องต้น สาย LAN PoE IP Address VLAN DHCP Ping TFTP Config Registration ทดสอบโทร">
              <div class="ipg-title"><div class="ipg-num">3</div><div><h2>วิธีตรวจสอบเบื้องต้น</h2><p>ตรวจสอบตามลำดับ</p></div></div>
              <div class="ipg-steps">
                <div class="ipg-step"><div><b>สาย LAN/PoE</b></div></div>
                <div class="ipg-step"><div><b>IP Address</b></div></div>
                <div class="ipg-step"><div><b>VLAN/DHCP</b></div></div>
                <div class="ipg-step"><div><b>Ping</b></div></div>
                <div class="ipg-step"><div><b>TFTP/Config</b></div></div>
                <div class="ipg-step"><div><b>Registration</b></div></div>
                <div class="ipg-step"><div><b>ทดสอบโทร</b></div></div>
              </div>
            </section>

            <section class="ipg-section" id="ipg-trouble" data-ipg-search="อาการและวิธีแก้ เครื่องไม่ติด PoE Adapter สาย LAN ไม่มี IP DHCP VLAN Switch Port มี IP แต่โทรไม่ได้ Registration SIP Server TFTP โทรได้แต่ไม่มีเสียง Voice VLAN Codec RTP Firewall เสียงขาด ดีเลย์ Packet Loss Jitter Bandwidth QoS เครื่องค้าง Restart Factory Reset AudioCodes Analog Phone BURN Reset Reply from Request timed out Destination host unreachable">
              <div class="ipg-title"><div class="ipg-num">4</div><div><h2>อาการและวิธีแก้</h2><p>เลือกอาการที่พบ และดูขั้นตอนที่เกี่ยวข้อง</p></div></div>
              <div class="ipg-trouble-grid">
                <article class="ipg-trouble ipg-status-danger"><h3>เครื่องไม่ติด</h3><p>ตรวจสอบ PoE, Adapter, สาย LAN</p></article>
                <article class="ipg-trouble ipg-status-warn"><h3>ไม่มี IP</h3><p>ตรวจสอบ DHCP, VLAN, Switch Port</p></article>
                <article class="ipg-trouble ipg-status-normal"><h3>มี IP แต่โทรไม่ได้</h3><p>ตรวจสอบ Registration, SIP Server, TFTP</p></article>
                <article class="ipg-trouble ipg-status-danger"><h3>โทรได้แต่ไม่มีเสียง</h3><p>ตรวจสอบ Voice VLAN, Codec, RTP, Firewall</p></article>
                <article class="ipg-trouble ipg-status-warn"><h3>เสียงขาดหรือดีเลย์</h3><p>ตรวจสอบ Packet Loss, Jitter, Bandwidth, QoS</p></article>
                <article class="ipg-trouble ipg-status-danger"><h3>เครื่องค้าง</h3><p>Restart ก่อน และห้าม Factory Reset หากไม่ได้รับอนุญาต</p></article>
              </div>

              <div class="ipg-title" style="margin-top:22px"><div class="ipg-num">A</div><div><h2>AudioCodes – Analog Phone ใช้งานไม่ได้ทุกเครื่อง</h2><p>แสดงผลแบบกระชับ อ่านง่าย และรองรับมือถือ</p></div></div>
              <div class="ipg-audio-box">
                <article class="ipg-note ipg-status-danger"><h3>อาการ</h3><p>โทรศัพท์ Analog ทุกเครื่องที่เชื่อมต่อผ่าน AudioCodes ใช้งานไม่ได้</p></article>

                <div class="ipg-audio-steps">
                  <article class="ipg-audio-step ipg-status-normal" data-step="1"><h3>เปิดเว็บ Browser</h3><p>เข้า IP ของ AudioCodes</p></article>
                  <article class="ipg-audio-step ipg-status-normal" data-step="2"><h3>ไปที่เมนู Maintenance</h3><p>เลือกเมนูสำหรับจัดการอุปกรณ์</p></article>
                  <article class="ipg-audio-step ipg-status-normal" data-step="3"><h3>กด BURN</h3><p>เพื่อบันทึก Configuration ลง Flash Memory</p></article>
                  <article class="ipg-audio-step ipg-status-warn" data-step="4"><h3>กด Reset</h3><p>เพื่อ Restart อุปกรณ์</p></article>
                  <article class="ipg-audio-step ipg-status-warn" data-step="5"><h3>รอเครื่องบูต</h3><p>ประมาณ 2–5 นาที</p></article>
                  <article class="ipg-audio-step ipg-status-normal" data-step="6"><h3>ทดสอบ Ping</h3><p>เปิด Command Prompt แล้วทดสอบการเชื่อมต่อ</p><div class="ipg-note-copy"><button class="btn ipg-mini" data-ipg-copy="${audioPing}" type="button">Copy ping</button></div></article>
                  <article class="ipg-audio-step ipg-status-normal" data-step="7"><h3>ทดสอบโทร</h3><p>เมื่อ Ping ได้ ให้ทดสอบโทรเข้าและโทรออกทุกเครื่อง</p></article>
                </div>

                <div class="ipg-audio-meta">
                  <article class="ipg-note ipg-status-normal"><h3>คำอธิบาย</h3><div class="ipg-note-list"><p><span class="ipg-chip">BURN</span> บันทึกค่าปัจจุบัน ป้องกัน Config หายหลัง Restart</p><p><span class="ipg-chip">Reset</span> Restart อุปกรณ์ ไม่ใช่ Factory Reset</p><p><span class="ipg-chip">Reply from</span> อุปกรณ์ออนไลน์</p></div></article>
                  <article class="ipg-note ipg-status-warn"><h3>ผลลัพธ์ Ping</h3><div class="ipg-note-list"><p><span class="ipg-chip">Request timed out</span> เครื่องยังไม่พร้อม หรือ Network มีปัญหา</p><p><span class="ipg-chip">Destination host unreachable</span> ตรวจสอบ IP, VLAN, Gateway และเส้นทางเครือข่าย</p></div></article>
                </div>

                <article class="ipg-note ipg-status-danger"><h3>ข้อควรระวัง</h3><p>การ Reset จะทำให้โทรศัพท์ Analog ทุกเครื่องหยุดใช้งานชั่วคราว ควรดำเนินการเมื่อได้รับอนุญาต</p></article>
              </div>
            </section>

            <section class="ipg-section" id="ipg-command" data-ipg-search="คำสั่งตรวจสอบ ping IP ipconfig all arp a tftp Server IP GET filename">
              <div class="ipg-title"><div class="ipg-num">5</div><div><h2>คำสั่งตรวจสอบ</h2><p>กด Copy คำสั่งที่ต้องการ</p></div></div>
              <div class="ipg-code-list">
                <div class="ipg-code-row"><code>ping &lt;IP&gt;</code><button class="btn ipg-mini" data-ipg-copy="ping <IP>" type="button">Copy</button></div>
                <div class="ipg-code-row"><code>ipconfig /all</code><button class="btn ipg-mini" data-ipg-copy="ipconfig /all" type="button">Copy</button></div>
                <div class="ipg-code-row"><code>arp -a</code><button class="btn ipg-mini" data-ipg-copy="arp -a" type="button">Copy</button></div>
                <div class="ipg-code-row"><code>tftp -i &lt;Server-IP&gt; GET &lt;filename&gt;</code><button class="btn ipg-mini" data-ipg-copy="tftp -i <Server-IP> GET <filename>" type="button">Copy</button></div>
              </div>
            </section>

            <section class="ipg-section" id="ipg-flow" data-ipg-search="Quick Fix Flow CHECK RESTART RE-CHECK IP TEST CALL ESCALATE NOC L3">
              <div class="ipg-title"><div class="ipg-num">6</div><div><h2>Quick Fix Flow</h2><p>ลำดับการตรวจสอบ</p></div></div>
              <div class="ipg-flow">
                <div class="ipg-flow-step">CHECK</div><div class="ipg-flow-arrow">→</div>
                <div class="ipg-flow-step">RESTART</div><div class="ipg-flow-arrow">→</div>
                <div class="ipg-flow-step">RE-CHECK IP</div><div class="ipg-flow-arrow">→</div>
                <div class="ipg-flow-step">TEST CALL</div><div class="ipg-flow-arrow">→</div>
                <div class="ipg-flow-step">ESCALATE NOC/L3</div>
              </div>
            </section>
            <div class="ipg-no-results" id="ipgNoResults">ไม่พบข้อมูลที่ค้นหา</div>
          </main>
        </div>
      </div>`;
    document.body.appendChild(overlay);

    const $=selector=>overlay.querySelector(selector) || document.querySelector(selector);
    const $$=selector=>[...overlay.querySelectorAll(selector)];
    const toast=text=>{
      const el=document.getElementById("toast");
      if(!el)return;
      el.textContent=text;el.classList.add("show");clearTimeout(el._t);el._t=setTimeout(()=>el.classList.remove("show"),2200);
    };
    const copy=async text=>{
      try{await navigator.clipboard.writeText(text)}catch{
        const ta=document.createElement("textarea");ta.value=text;document.body.appendChild(ta);ta.select();document.execCommand("copy");ta.remove();
      }
      try{
        const key="linkwork.copy.v1",d=new Date(),day=`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`;
        const current=JSON.parse(localStorage.getItem(key)||"{}");
        const count=current.date===day?(current.count||0)+1:1;
        localStorage.setItem(key,JSON.stringify({date:day,count}));
        const counter=document.getElementById("copyCount");if(counter)counter.textContent=count;
      }catch{}
      toast("คัดลอกสำเร็จ");
    };
    const open=()=>{overlay.classList.add("open");overlay.setAttribute("aria-hidden","false");document.body.style.overflow="hidden";setTimeout(()=>$("#ipgSearch")?.focus(),80)};
    const close=()=>{overlay.classList.remove("open");overlay.setAttribute("aria-hidden","true");document.body.style.overflow=""};

    button.addEventListener("click",open);
    $("#closeIpPhoneGuide").addEventListener("click",close);
    overlay.addEventListener("click",e=>{if(e.target===overlay)close()});
    document.addEventListener("keydown",event=>{if(event.key==="Escape"&&overlay.classList.contains("open"))close()});
    $$('[data-ipg-copy]').forEach(btn=>btn.addEventListener("click",()=>copy(btn.dataset.ipgCopy||"")));
    $("#ipgCopyNortelPath").addEventListener("click",()=>copy(nortelPath));
    $("#ipgPasswordButton").addEventListener("click",()=>toast("หน้าเว็บสาธารณะไม่แสดงรหัสผ่าน"));

    const navButtons=$$("[data-ipg-target]");
    navButtons.forEach(nav=>nav.addEventListener("click",()=>{
      navButtons.forEach(item=>item.classList.remove("active"));nav.classList.add("active");
      document.getElementById(nav.dataset.ipgTarget)?.scrollIntoView({behavior:"smooth",block:"start"});
    }));

    const sections=$$(".ipg-section");
    $("#ipgSearch").addEventListener("input",event=>{
      const q=event.target.value.trim().toLowerCase();
      let visible=0;
      sections.forEach(section=>{
        const hay=(section.dataset.ipgSearch+" "+section.textContent).toLowerCase();
        const show=!q||hay.includes(q);
        section.style.display=show?"block":"none";
        if(show)visible++;
      });
      $("#ipgNoResults").style.display=visible?"none":"block";
    });
  });
})();
