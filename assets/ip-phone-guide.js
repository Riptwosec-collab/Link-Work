(()=>{
  "use strict";
  const ready=fn=>document.readyState!=="loading"?fn():document.addEventListener("DOMContentLoaded",fn,{once:true});
  ready(()=>{
    const quickTitle=document.getElementById("quickToolsTitle") || [...document.querySelectorAll(".section-title h2")].find(el=>/Quick Copy|ข้อความใช้บ่อย/i.test(el.textContent));
    const quickSection=quickTitle?.closest("section") || quickTitle?.closest(".section");
    const quickGrid=quickSection?.querySelector(".quick-grid");
    if(!quickGrid)return;

    document.getElementById("openIpPhoneGuide")?.remove();
    document.getElementById("ipPhoneGuide")?.remove();
    document.getElementById("ipPhoneCompactStyle")?.remove();

    const style=document.createElement("style");
    style.id="ipPhoneCompactStyle";
    style.textContent=`
      .ipm-bg{position:fixed;inset:0;z-index:95;display:none;place-items:center;padding:18px;background:rgba(0,5,13,.84);backdrop-filter:blur(8px)}
      .ipm-bg.open{display:grid}
      .ipm-modal{width:min(980px,100%);max-height:88vh;overflow:hidden;display:flex;flex-direction:column;border:1px solid rgba(33,220,255,.42);border-radius:18px;background:linear-gradient(180deg,rgba(7,25,43,.99),rgba(3,12,24,.99));box-shadow:0 24px 60px rgba(0,0,0,.5),0 0 22px rgba(33,220,255,.12);color:#eef7ff}
      .ipm-head{display:flex;align-items:center;justify-content:space-between;gap:12px;padding:15px 16px;border-bottom:1px solid rgba(33,220,255,.24);background:rgba(5,20,36,.96)}
      .ipm-title{display:flex;align-items:center;gap:11px;min-width:0}.ipm-icon{width:42px;height:42px;flex:0 0 auto;display:grid;place-items:center;border:1px solid rgba(33,220,255,.5);border-radius:10px;background:rgba(33,220,255,.07);color:#27deff;font-weight:900}.ipm-title h2{margin:0;font-size:1.08rem}.ipm-title p{margin:3px 0 0;color:#8fb2d2;font-size:.78rem}
      .ipm-close{min-height:38px!important;padding:0 12px!important;white-space:nowrap}
      .ipm-tabs{display:flex;gap:7px;padding:11px 12px;overflow:auto;border-bottom:1px solid rgba(33,220,255,.18);background:#04101d;scrollbar-width:thin}.ipm-tab{flex:0 0 auto;min-height:36px;border:1px solid rgba(33,220,255,.28);border-radius:9px;padding:0 11px;background:#071a2d;color:#9fbfda;font:inherit;font-size:.78rem;font-weight:800;cursor:pointer}.ipm-tab.active{color:#06111c;background:linear-gradient(180deg,#65ecff,#25bfe8);border-color:#73efff;box-shadow:0 0 12px rgba(33,220,255,.18)}
      .ipm-body{overflow:auto;padding:14px}.ipm-pane{display:none}.ipm-pane.active{display:block}.ipm-section-title{display:flex;align-items:center;gap:9px;margin:0 0 12px}.ipm-num{width:30px;height:30px;display:grid;place-items:center;border-radius:8px;border:1px solid rgba(33,220,255,.42);background:rgba(33,220,255,.07);color:#28ddff;font-weight:900}.ipm-section-title h3{margin:0;font-size:1rem}.ipm-section-title small{display:block;margin-top:2px;color:#8eafcc;font-weight:500}
      .ipm-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px}.ipm-card{padding:12px;border:1px solid rgba(33,220,255,.22);border-radius:11px;background:rgba(4,18,32,.92)}.ipm-card.full{grid-column:1/-1}.ipm-card h4{margin:0 0 6px;font-size:.9rem}.ipm-card p{margin:0;color:#cfe1f1;line-height:1.5;font-size:.84rem}.ipm-value{font-weight:800;color:#f3f9ff;word-break:break-word}.ipm-actions{display:flex;gap:7px;flex-wrap:wrap;margin-top:9px}.ipm-mini{min-height:32px!important;padding:0 10px!important;font-size:.76rem!important;border-radius:8px!important}
      .ipm-good{border-color:rgba(39,239,171,.34)}.ipm-warn{border-color:rgba(255,196,76,.38)}.ipm-bad{border-color:rgba(255,100,127,.42)}
      .ipm-steps{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:9px}.ipm-step{position:relative;padding:11px 11px 11px 48px;min-height:56px;border:1px solid rgba(33,220,255,.20);border-radius:10px;background:rgba(4,18,32,.9);display:flex;align-items:center}.ipm-step::before{content:attr(data-n);position:absolute;left:11px;top:50%;transform:translateY(-50%);width:26px;height:26px;display:grid;place-items:center;border-radius:50%;border:1px solid rgba(33,220,255,.42);color:#25dcff;font-weight:900;font-size:.75rem}.ipm-step b{font-size:.84rem}
      .ipm-troubles{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:9px}.ipm-trouble{padding:11px;border:1px solid rgba(33,220,255,.20);border-radius:10px;background:rgba(4,18,32,.9)}.ipm-trouble h4{margin:0 0 5px;font-size:.87rem}.ipm-trouble p{margin:0;color:#cbddec;font-size:.81rem;line-height:1.45}
      .ipm-audio{margin-top:12px;padding-top:12px;border-top:1px solid rgba(33,220,255,.17)}.ipm-audio-head{margin:0 0 9px;font-size:.92rem}.ipm-audio-steps{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px}.ipm-audio-step{position:relative;padding:10px 10px 10px 42px;border:1px solid rgba(33,220,255,.20);border-radius:10px;background:rgba(4,18,32,.9);font-size:.8rem;line-height:1.45}.ipm-audio-step::before{content:attr(data-n);position:absolute;left:9px;top:9px;width:24px;height:24px;display:grid;place-items:center;border-radius:50%;border:1px solid rgba(33,220,255,.4);color:#25dcff;font-weight:900}.ipm-audio-note{margin-top:9px;padding:10px;border-radius:10px;background:rgba(4,18,32,.9);border:1px solid rgba(255,196,76,.32);font-size:.8rem;line-height:1.5;color:#dce9f5}
      .ipm-code-list{display:grid;gap:8px}.ipm-code{display:flex;align-items:center;justify-content:space-between;gap:10px;padding:10px 11px;border:1px solid rgba(33,220,255,.22);border-radius:10px;background:#020c17}.ipm-code code{color:#dff7ff;font-family:Consolas,monospace;font-size:.84rem;overflow-wrap:anywhere}
      .ipm-flow{display:flex;align-items:center;gap:7px;flex-wrap:wrap}.ipm-flow span{padding:10px 12px;border:1px solid rgba(33,220,255,.28);border-radius:9px;background:#061a2d;font-size:.79rem;font-weight:900}.ipm-arrow{color:#27deff!important;background:transparent!important;border:0!important;padding:0!important}
      @media(max-width:720px){.ipm-bg{padding:8px}.ipm-modal{max-height:94vh;border-radius:12px}.ipm-head{padding:11px}.ipm-title p{display:none}.ipm-grid,.ipm-steps,.ipm-troubles,.ipm-audio-steps{grid-template-columns:1fr}.ipm-body{padding:10px}.ipm-card.full{grid-column:auto}.ipm-flow{display:grid;grid-template-columns:1fr}.ipm-arrow{display:none!important}}
    `;
    document.head.appendChild(style);

    const button=document.createElement("button");
    button.className="work-link";
    button.id="openIpPhoneGuide";
    button.type="button";
    button.innerHTML='<span class="link-icon">IP</span><span class="link-copy"><span class="link-name">คู่มือ IP Phone</span><span class="link-url">Cisco · Nortel · Setup · Troubleshooting</span></span><span class="link-arrow">›</span>';
    quickGrid.appendChild(button);

    const nortelPath="\\\\10.1.1.94\\share\\noc\\2.คู่มือการทำงาน\\";
    const overlay=document.createElement("div");
    overlay.className="ipm-bg";
    overlay.id="ipPhoneGuide";
    overlay.setAttribute("aria-hidden","true");
    overlay.innerHTML=`
      <div class="ipm-modal" role="dialog" aria-modal="true" aria-labelledby="ipmTitle">
        <div class="ipm-head">
          <div class="ipm-title"><div class="ipm-icon">IP</div><div><h2 id="ipmTitle">IP Phone Setup & Troubleshooting</h2><p>Cisco · Nortel · AudioCodes · IT/NOC</p></div></div>
          <button class="btn ipm-close" id="closeIpPhoneGuide" type="button">ปิด</button>
        </div>
        <div class="ipm-tabs">
          <button class="ipm-tab active" data-pane="important" type="button">1 ข้อมูลสำคัญ</button>
          <button class="ipm-tab" data-pane="cisco" type="button">2 Cisco</button>
          <button class="ipm-tab" data-pane="check" type="button">3 ตรวจสอบ</button>
          <button class="ipm-tab" data-pane="trouble" type="button">4 Troubleshooting</button>
          <button class="ipm-tab" data-pane="command" type="button">5 Commands</button>
          <button class="ipm-tab" data-pane="flow" type="button">6 Quick Fix</button>
        </div>
        <div class="ipm-body">
          <section class="ipm-pane active" data-pane-content="important">
            <div class="ipm-section-title"><span class="ipm-num">1</span><div><h3>ข้อมูลสำคัญ</h3><small>Cisco, Nortel และตำแหน่งไฟล์คู่มือ</small></div></div>
            <div class="ipm-grid">
              <article class="ipm-card ipm-good"><h4>Cisco</h4><p>จัดการผ่าน <span class="ipm-value">Remote Desktop</span> และ <span class="ipm-value">Internet Explorer</span></p></article>
              <article class="ipm-card ipm-good"><h4>Nortel</h4><p>ดูข้อมูลจากตำแหน่งไฟล์คู่มือ</p></article>
              <article class="ipm-card"><h4>Remote Desktop</h4><p class="ipm-value">10.14.1.1</p><div class="ipm-actions"><button class="btn ipm-mini" data-copy="10.14.1.1" type="button">Copy IP</button></div></article>
              <article class="ipm-card"><h4>Username</h4><p class="ipm-value">Administrator</p></article>
              <article class="ipm-card ipm-warn"><h4>Password</h4><p class="ipm-value">********</p><div class="ipm-actions"><button class="btn ipm-mini" id="ipmPassword" type="button">ดูรหัสผ่าน (ผู้มีสิทธิ์)</button></div></article>
              <article class="ipm-card"><h4>Internet Explorer</h4><p>ใช้สำหรับเข้า IP ของโทรศัพท์</p></article>
              <article class="ipm-card full"><h4>คู่มือ Nortel</h4><p class="ipm-value">${nortelPath}</p><div class="ipm-actions"><button class="btn ipm-mini" id="ipmCopyPath" type="button">Copy Path</button></div></article>
              <article class="ipm-card full"><h4>ไฟล์</h4><p class="ipm-value">10. IP-Phone-ATA-Number__30-05-2019</p><div class="ipm-actions"><button class="btn ipm-mini" data-copy="10. IP-Phone-ATA-Number__30-05-2019" type="button">Copy</button></div></article>
            </div>
          </section>

          <section class="ipm-pane" data-pane-content="cisco">
            <div class="ipm-section-title"><span class="ipm-num">2</span><div><h3>วิธีเข้าใช้งาน Cisco</h3><small>ทำตามลำดับ</small></div></div>
            <div class="ipm-steps">
              <div class="ipm-step" data-n="1"><b>เปิด Remote Desktop</b></div>
              <div class="ipm-step" data-n="2"><b>ใส่ 10.14.1.1</b></div>
              <div class="ipm-step" data-n="3"><b>Login</b></div>
              <div class="ipm-step" data-n="4"><b>เปิด Internet Explorer</b></div>
              <div class="ipm-step" data-n="5"><b>เข้า IP ของโทรศัพท์</b></div>
            </div>
          </section>

          <section class="ipm-pane" data-pane-content="check">
            <div class="ipm-section-title"><span class="ipm-num">3</span><div><h3>วิธีตรวจสอบเบื้องต้น</h3><small>ตรวจสอบตามลำดับ</small></div></div>
            <div class="ipm-steps">
              <div class="ipm-step" data-n="1"><b>สาย LAN/PoE</b></div>
              <div class="ipm-step" data-n="2"><b>IP Address</b></div>
              <div class="ipm-step" data-n="3"><b>VLAN/DHCP</b></div>
              <div class="ipm-step" data-n="4"><b>Ping</b></div>
              <div class="ipm-step" data-n="5"><b>TFTP/Config</b></div>
              <div class="ipm-step" data-n="6"><b>Registration</b></div>
              <div class="ipm-step" data-n="7"><b>ทดสอบโทร</b></div>
            </div>
          </section>

          <section class="ipm-pane" data-pane-content="trouble">
            <div class="ipm-section-title"><span class="ipm-num">4</span><div><h3>อาการและวิธีแก้</h3><small>เลือกดูเฉพาะอาการที่พบ</small></div></div>
            <div class="ipm-troubles">
              <article class="ipm-trouble ipm-bad"><h4>เครื่องไม่ติด</h4><p>ตรวจสอบ PoE, Adapter, สาย LAN</p></article>
              <article class="ipm-trouble ipm-warn"><h4>ไม่มี IP</h4><p>ตรวจสอบ DHCP, VLAN, Switch Port</p></article>
              <article class="ipm-trouble ipm-good"><h4>มี IP แต่โทรไม่ได้</h4><p>ตรวจสอบ Registration, SIP Server, TFTP</p></article>
              <article class="ipm-trouble ipm-bad"><h4>โทรได้แต่ไม่มีเสียง</h4><p>ตรวจสอบ Voice VLAN, Codec, RTP, Firewall</p></article>
              <article class="ipm-trouble ipm-warn"><h4>เสียงขาดหรือดีเลย์</h4><p>ตรวจสอบ Packet Loss, Jitter, Bandwidth, QoS</p></article>
              <article class="ipm-trouble ipm-bad"><h4>เครื่องค้าง</h4><p>Restart ก่อน และห้าม Factory Reset หากไม่ได้รับอนุญาต</p></article>
            </div>
            <div class="ipm-audio">
              <h3 class="ipm-audio-head">AudioCodes – Analog Phone ใช้งานไม่ได้ทุกเครื่อง</h3>
              <div class="ipm-audio-steps">
                <div class="ipm-audio-step ipm-good" data-n="1">เปิดเว็บ Browser แล้วเข้า IP ของ AudioCodes</div>
                <div class="ipm-audio-step ipm-good" data-n="2">ไปที่เมนู Maintenance</div>
                <div class="ipm-audio-step ipm-good" data-n="3">กด BURN เพื่อบันทึก Configuration ลง Flash Memory</div>
                <div class="ipm-audio-step ipm-warn" data-n="4">กด Reset เพื่อ Restart อุปกรณ์</div>
                <div class="ipm-audio-step ipm-warn" data-n="5">รอเครื่องบูตประมาณ 2–5 นาที</div>
                <div class="ipm-audio-step ipm-good" data-n="6">เปิด Command Prompt แล้วทดสอบ <b>ping &lt;AudioCodes-IP&gt;</b><div class="ipm-actions"><button class="btn ipm-mini" data-copy="ping <AudioCodes-IP>" type="button">Copy ping</button></div></div>
                <div class="ipm-audio-step ipm-good" data-n="7">เมื่อ Ping ได้ ให้ทดสอบโทรเข้าและโทรออกทุกเครื่อง</div>
              </div>
              <div class="ipm-audio-note"><b>BURN</b> = บันทึกค่าปัจจุบัน ป้องกัน Config หายหลัง Restart · <b>Reset</b> = Restart ไม่ใช่ Factory Reset · <b>Reply from</b> = อุปกรณ์ออนไลน์ · <b>Request timed out</b> = เครื่องยังไม่พร้อม หรือ Network มีปัญหา · <b>Destination host unreachable</b> = ตรวจสอบ IP, VLAN, Gateway และเส้นทางเครือข่าย</div>
              <div class="ipm-audio-note ipm-bad"><b>ข้อควรระวัง:</b> การ Reset จะทำให้โทรศัพท์ Analog ทุกเครื่องหยุดใช้งานชั่วคราว ควรดำเนินการเมื่อได้รับอนุญาต</div>
            </div>
          </section>

          <section class="ipm-pane" data-pane-content="command">
            <div class="ipm-section-title"><span class="ipm-num">5</span><div><h3>คำสั่งตรวจสอบ</h3><small>กด Copy ได้ทันที</small></div></div>
            <div class="ipm-code-list">
              <div class="ipm-code"><code>ping &lt;IP&gt;</code><button class="btn ipm-mini" data-copy="ping <IP>" type="button">Copy</button></div>
              <div class="ipm-code"><code>ipconfig /all</code><button class="btn ipm-mini" data-copy="ipconfig /all" type="button">Copy</button></div>
              <div class="ipm-code"><code>arp -a</code><button class="btn ipm-mini" data-copy="arp -a" type="button">Copy</button></div>
              <div class="ipm-code"><code>tftp -i &lt;Server-IP&gt; GET &lt;filename&gt;</code><button class="btn ipm-mini" data-copy="tftp -i <Server-IP> GET <filename>" type="button">Copy</button></div>
            </div>
          </section>

          <section class="ipm-pane" data-pane-content="flow">
            <div class="ipm-section-title"><span class="ipm-num">6</span><div><h3>Quick Fix Flow</h3><small>ลำดับการตรวจสอบ</small></div></div>
            <div class="ipm-flow"><span>CHECK</span><span class="ipm-arrow">→</span><span>RESTART</span><span class="ipm-arrow">→</span><span>RE-CHECK IP</span><span class="ipm-arrow">→</span><span>TEST CALL</span><span class="ipm-arrow">→</span><span>ESCALATE NOC/L3</span></div>
          </section>
        </div>
      </div>`;
    document.body.appendChild(overlay);

    const q=s=>overlay.querySelector(s), qa=s=>[...overlay.querySelectorAll(s)];
    const toast=text=>{
      const el=document.getElementById("toast");
      if(!el)return;
      el.textContent=text;el.classList.add("show");clearTimeout(el._t);el._t=setTimeout(()=>el.classList.remove("show"),1800);
    };
    const copy=async text=>{
      try{await navigator.clipboard.writeText(text)}catch{
        const ta=document.createElement("textarea");ta.value=text;document.body.appendChild(ta);ta.select();document.execCommand("copy");ta.remove();
      }
      toast("คัดลอกสำเร็จ");
    };
    const showPane=name=>{
      qa(".ipm-tab").forEach(el=>el.classList.toggle("active",el.dataset.pane===name));
      qa(".ipm-pane").forEach(el=>el.classList.toggle("active",el.dataset.paneContent===name));
      q(".ipm-body").scrollTop=0;
    };
    const open=()=>{overlay.classList.add("open");overlay.setAttribute("aria-hidden","false");document.body.style.overflow="hidden";showPane("important")};
    const close=()=>{overlay.classList.remove("open");overlay.setAttribute("aria-hidden","true");document.body.style.overflow=""};

    button.addEventListener("click",open);
    q("#closeIpPhoneGuide").addEventListener("click",close);
    overlay.addEventListener("click",e=>{if(e.target===overlay)close()});
    document.addEventListener("keydown",e=>{if(e.key==="Escape"&&overlay.classList.contains("open"))close()});
    qa(".ipm-tab").forEach(tab=>tab.addEventListener("click",()=>showPane(tab.dataset.pane)));
    qa("[data-copy]").forEach(btn=>btn.addEventListener("click",()=>copy(btn.dataset.copy||"")));
    q("#ipmCopyPath").addEventListener("click",()=>copy(nortelPath));
    q("#ipmPassword").addEventListener("click",()=>toast("หน้าเว็บสาธารณะไม่แสดงรหัสผ่าน"));
  });
})();
