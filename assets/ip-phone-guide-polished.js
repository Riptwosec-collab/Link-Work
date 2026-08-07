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
      :root{--ipm-cyan:#21dcff;--ipm-blue:#168dff;--ipm-deep:#020812;--ipm-panel:#071b30;--ipm-line:rgba(33,220,255,.26);--ipm-text:#eef8ff;--ipm-muted:#8fb5d5;--ipm-green:#29efad;--ipm-gold:#ffd76a;--ipm-red:#ff657f}
      .ipm-bg{position:fixed;inset:0;z-index:95;display:none;place-items:center;padding:18px;background:radial-gradient(circle at 50% 10%,rgba(12,119,255,.18),transparent 30%),rgba(0,5,13,.88);backdrop-filter:blur(12px);opacity:0}
      .ipm-bg.open{display:grid;animation:ipmBackdropIn .24s ease forwards}
      .ipm-modal{position:relative;width:min(1050px,100%);max-height:90vh;overflow:hidden;display:flex;flex-direction:column;border:1px solid rgba(33,220,255,.48);border-radius:22px;background:linear-gradient(145deg,rgba(8,31,55,.99),rgba(2,10,20,.995));box-shadow:0 32px 90px rgba(0,0,0,.62),0 0 0 1px rgba(33,220,255,.08),0 0 42px rgba(0,183,255,.14),inset 0 1px 0 rgba(255,255,255,.05);color:var(--ipm-text);transform:translateY(14px) scale(.98);opacity:0}
      .ipm-bg.open .ipm-modal{animation:ipmModalIn .3s cubic-bezier(.2,.75,.2,1) forwards}
      .ipm-modal::before{content:"";position:absolute;inset:0;pointer-events:none;background:linear-gradient(115deg,transparent 0 35%,rgba(71,225,255,.035) 42%,transparent 49% 100%),radial-gradient(circle at 90% 5%,rgba(0,166,255,.13),transparent 22%)}
      .ipm-modal::after{content:"";position:absolute;left:-30%;top:0;width:26%;height:2px;background:linear-gradient(90deg,transparent,#7bf2ff,transparent);box-shadow:0 0 16px rgba(33,220,255,.72);animation:ipmScan 5.8s linear infinite;pointer-events:none}
      .ipm-head{position:relative;z-index:2;display:flex;align-items:center;justify-content:space-between;gap:14px;padding:16px 18px;border-bottom:1px solid rgba(33,220,255,.2);background:linear-gradient(90deg,rgba(7,29,51,.98),rgba(4,16,29,.98))}
      .ipm-title{display:flex;align-items:center;gap:13px;min-width:0}.ipm-icon{position:relative;width:48px;height:48px;flex:0 0 auto;display:grid;place-items:center;border:1px solid rgba(33,220,255,.62);border-radius:13px;background:linear-gradient(145deg,rgba(8,52,87,.98),rgba(4,21,38,.98));color:#56e9ff;font-weight:950;letter-spacing:.03em;box-shadow:0 0 20px rgba(33,220,255,.12),inset 0 0 15px rgba(33,220,255,.08)}
      .ipm-icon::after{content:"";position:absolute;inset:6px;border:1px solid rgba(33,220,255,.16);border-radius:8px;animation:ipmIconPulse 2.8s ease-in-out infinite}
      .ipm-title h2{margin:0;font-size:1.16rem;letter-spacing:.02em}.ipm-title p{margin:3px 0 0;color:var(--ipm-muted);font-size:.8rem}.ipm-close{min-height:38px!important;padding:0 13px!important;white-space:nowrap;position:relative;z-index:2}
      .ipm-tabs{position:relative;z-index:2;display:flex;gap:8px;padding:11px 13px;overflow:auto;border-bottom:1px solid rgba(33,220,255,.15);background:rgba(3,14,27,.96);scrollbar-width:thin;scrollbar-color:rgba(33,220,255,.35) transparent}
      .ipm-tab{position:relative;flex:0 0 auto;min-height:38px;border:1px solid rgba(33,220,255,.22);border-radius:10px;padding:0 13px;background:linear-gradient(180deg,rgba(8,34,58,.95),rgba(4,18,32,.96));color:#a5c4df;font:inherit;font-size:.8rem;font-weight:850;cursor:pointer;transition:transform .18s ease,border-color .18s ease,box-shadow .18s ease,color .18s ease;overflow:hidden}
      .ipm-tab::before{content:"";position:absolute;inset:0;background:linear-gradient(110deg,transparent 20%,rgba(83,231,255,.12) 48%,transparent 76%);transform:translateX(-120%);transition:transform .5s ease}.ipm-tab:hover::before{transform:translateX(120%)}
      .ipm-tab:hover{transform:translateY(-1px);border-color:rgba(33,220,255,.52);color:#eefbff}.ipm-tab.active{color:#04101b;background:linear-gradient(180deg,#78efff,#21c8ef);border-color:#8cf4ff;box-shadow:0 0 18px rgba(33,220,255,.24),inset 0 1px rgba(255,255,255,.48)}
      .ipm-tab .ipm-dot{display:inline-block;width:6px;height:6px;border-radius:50%;margin-right:7px;background:currentColor;box-shadow:0 0 8px currentColor;vertical-align:1px}
      .ipm-body{position:relative;z-index:1;overflow:auto;padding:16px;background:radial-gradient(circle at 100% 0,rgba(0,154,255,.06),transparent 24%)}
      .ipm-pane{display:none}.ipm-pane.active{display:block;animation:ipmPaneIn .25s ease both}
      .ipm-section-title{display:flex;align-items:flex-start;gap:10px;margin:0 0 13px;padding-bottom:11px;border-bottom:1px solid rgba(33,220,255,.14)}
      .ipm-num{width:32px;height:32px;flex:0 0 auto;display:grid;place-items:center;border-radius:9px;border:1px solid rgba(33,220,255,.48);background:linear-gradient(145deg,rgba(10,58,94,.82),rgba(4,22,40,.95));color:#38e2ff;font-weight:950;box-shadow:inset 0 0 12px rgba(33,220,255,.06)}
      .ipm-section-title h3{margin:0;font-size:1.02rem}.ipm-section-title small{display:block;margin-top:3px;color:var(--ipm-muted);font-weight:500;line-height:1.35}
      .ipm-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:11px}.ipm-card{position:relative;min-width:0;padding:13px;border:1px solid rgba(33,220,255,.19);border-radius:13px;background:linear-gradient(145deg,rgba(6,27,47,.94),rgba(3,15,28,.96));box-shadow:0 8px 24px rgba(0,0,0,.2),inset 0 1px rgba(255,255,255,.025);transition:transform .18s ease,border-color .18s ease,box-shadow .18s ease;overflow:hidden}.ipm-card:hover{transform:translateY(-2px);border-color:rgba(33,220,255,.4);box-shadow:0 12px 28px rgba(0,0,0,.28),0 0 16px rgba(33,220,255,.08)}.ipm-card::after{content:"";position:absolute;left:0;top:0;width:3px;height:100%;background:linear-gradient(180deg,transparent,var(--ipm-cyan),transparent);opacity:.5}.ipm-card.full{grid-column:1/-1}.ipm-card h4{margin:0 0 7px;font-size:.91rem}.ipm-card p{margin:0;color:#cfe2f2;line-height:1.55;font-size:.84rem}.ipm-value{font-weight:850;color:#f4faff;word-break:break-word}.ipm-actions{display:flex;gap:7px;flex-wrap:wrap;margin-top:10px}.ipm-mini{min-height:32px!important;padding:0 10px!important;font-size:.76rem!important;border-radius:8px!important}
      .ipm-good{border-color:rgba(41,239,173,.34)!important}.ipm-good::after{background:linear-gradient(180deg,transparent,var(--ipm-green),transparent)}.ipm-warn{border-color:rgba(255,215,106,.38)!important}.ipm-warn::after{background:linear-gradient(180deg,transparent,var(--ipm-gold),transparent)}.ipm-bad{border-color:rgba(255,101,127,.42)!important}.ipm-bad::after{background:linear-gradient(180deg,transparent,var(--ipm-red),transparent)}
      .ipm-steps{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px}.ipm-step{position:relative;padding:12px 12px 12px 50px;min-height:60px;border:1px solid rgba(33,220,255,.18);border-radius:12px;background:linear-gradient(145deg,rgba(6,26,45,.93),rgba(3,15,28,.95));display:flex;align-items:center;box-shadow:0 7px 18px rgba(0,0,0,.16);transition:.18s ease}.ipm-step:hover{transform:translateY(-2px);border-color:rgba(33,220,255,.38)}.ipm-step::before{content:attr(data-n);position:absolute;left:12px;top:50%;transform:translateY(-50%);width:28px;height:28px;display:grid;place-items:center;border-radius:50%;border:1px solid rgba(33,220,255,.48);color:#2ee0ff;background:rgba(33,220,255,.06);font-weight:950;font-size:.76rem;box-shadow:0 0 11px rgba(33,220,255,.08)}.ipm-step b{font-size:.85rem}
      .ipm-troubles{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px}.ipm-trouble{position:relative;padding:12px;border:1px solid rgba(33,220,255,.18);border-radius:12px;background:linear-gradient(145deg,rgba(6,26,45,.93),rgba(3,15,28,.95));box-shadow:0 7px 18px rgba(0,0,0,.16);transition:.18s ease}.ipm-trouble:hover{transform:translateY(-2px)}.ipm-trouble h4{margin:0 0 6px;font-size:.88rem}.ipm-trouble p{margin:0;color:#cbddec;font-size:.82rem;line-height:1.48}
      .ipm-audio{margin-top:13px;padding:13px;border:1px solid rgba(33,220,255,.22);border-radius:14px;background:linear-gradient(145deg,rgba(5,24,43,.96),rgba(3,13,25,.98));box-shadow:inset 0 1px rgba(255,255,255,.025)}.ipm-audio-head{display:flex;align-items:center;gap:9px;margin-bottom:11px}.ipm-audio-head strong{font-size:.92rem}.ipm-audio-head span{display:inline-grid;place-items:center;width:28px;height:28px;border-radius:8px;border:1px solid rgba(255,215,106,.45);color:#ffe48b;background:rgba(255,215,106,.07);font-weight:900}
      .ipm-audio-steps{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:9px}.ipm-audio-step{position:relative;padding:11px 11px 11px 45px;border:1px solid rgba(33,220,255,.16);border-radius:10px;background:rgba(3,17,31,.9);min-height:58px}.ipm-audio-step::before{content:attr(data-n);position:absolute;left:10px;top:12px;width:25px;height:25px;display:grid;place-items:center;border-radius:50%;border:1px solid rgba(33,220,255,.4);color:#35e1ff;font-weight:900;font-size:.72rem}.ipm-audio-step b{display:block;font-size:.82rem;margin-bottom:3px}.ipm-audio-step p{margin:0;color:#c6d9ea;font-size:.78rem;line-height:1.42}
      .ipm-note-grid{display:grid;grid-template-columns:1fr 1fr;gap:9px;margin-top:9px}.ipm-note{padding:11px;border-radius:10px;border:1px solid rgba(33,220,255,.17);background:rgba(3,17,31,.9)}.ipm-note h4{margin:0 0 6px;font-size:.84rem}.ipm-note p{margin:4px 0;color:#c9dcec;font-size:.78rem;line-height:1.45}.ipm-chip{display:inline-block;padding:2px 6px;border:1px solid rgba(33,220,255,.25);border-radius:6px;color:#dff8ff;background:rgba(33,220,255,.06);font-size:.72rem;font-weight:850}
      .ipm-code-list{display:grid;gap:9px}.ipm-code{display:flex;align-items:center;justify-content:space-between;gap:10px;padding:11px 12px;border:1px solid rgba(33,220,255,.18);border-radius:10px;background:#020c17;box-shadow:inset 0 0 12px rgba(33,220,255,.025)}.ipm-code code{min-width:0;overflow-wrap:anywhere;color:#e8f8ff;font-family:Consolas,monospace;font-size:.86rem}
      .ipm-flow{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:8px;align-items:center}.ipm-flow-step{position:relative;min-height:58px;display:grid;place-items:center;text-align:center;padding:9px;border:1px solid rgba(33,220,255,.25);border-radius:11px;background:linear-gradient(145deg,rgba(7,32,55,.94),rgba(3,16,29,.96));font-size:.78rem;font-weight:950;letter-spacing:.02em;box-shadow:0 8px 18px rgba(0,0,0,.16);animation:ipmFlowGlow 3.6s ease-in-out infinite}.ipm-flow-step:not(:last-child)::after{content:"→";position:absolute;right:-10px;top:50%;transform:translateY(-50%);color:#30dfff;z-index:2;text-shadow:0 0 8px rgba(33,220,255,.4)}
      @keyframes ipmBackdropIn{to{opacity:1}}@keyframes ipmModalIn{to{transform:translateY(0) scale(1);opacity:1}}@keyframes ipmPaneIn{from{opacity:0;transform:translateY(7px)}to{opacity:1;transform:none}}@keyframes ipmScan{to{left:110%}}@keyframes ipmIconPulse{50%{border-color:rgba(33,220,255,.42);box-shadow:0 0 12px rgba(33,220,255,.16)}}@keyframes ipmFlowGlow{50%{border-color:rgba(33,220,255,.48);box-shadow:0 8px 22px rgba(0,0,0,.2),0 0 14px rgba(33,220,255,.10)}}
      @media(max-width:760px){.ipm-bg{padding:8px}.ipm-modal{max-height:94vh;border-radius:15px}.ipm-head{padding:12px}.ipm-title h2{font-size:.98rem}.ipm-title p{font-size:.72rem}.ipm-icon{width:40px;height:40px;border-radius:10px}.ipm-body{padding:11px}.ipm-grid,.ipm-steps,.ipm-troubles,.ipm-audio-steps,.ipm-note-grid{grid-template-columns:1fr}.ipm-card.full{grid-column:auto}.ipm-flow{grid-template-columns:1fr}.ipm-flow-step:not(:last-child)::after{content:"↓";right:auto;left:50%;top:auto;bottom:-12px;transform:translateX(-50%)}}
      @media(prefers-reduced-motion:reduce){.ipm-bg.open,.ipm-bg.open .ipm-modal,.ipm-pane.active,.ipm-modal::after,.ipm-icon::after,.ipm-flow-step{animation:none!important}}
    `;
    document.head.appendChild(style);

    const button=document.createElement("button");
    button.className="work-link";
    button.id="openIpPhoneGuide";
    button.type="button";
    button.innerHTML='<span class="link-icon">IP</span><span class="link-copy"><span class="link-name">คู่มือ IP Phone</span><span class="link-url">Cisco · Nortel · AudioCodes</span></span><span class="link-arrow">›</span>';
    quickGrid.appendChild(button);

    const nortelPath="\\\\10.1.1.94\\share\\noc\\2.คู่มือการทำงาน\\";
    const overlay=document.createElement("div");
    overlay.className="ipm-bg";
    overlay.id="ipPhoneGuide";
    overlay.setAttribute("aria-hidden","true");
    overlay.innerHTML=`
      <div class="ipm-modal" role="dialog" aria-modal="true" aria-labelledby="ipmTitle">
        <header class="ipm-head">
          <div class="ipm-title"><div class="ipm-icon">IP</div><div><h2 id="ipmTitle">IP Phone Setup & Troubleshooting</h2><p>Cisco · Nortel · AudioCodes · IT/NOC Quick Guide</p></div></div>
          <button class="btn ipm-close" id="closeIpPhoneGuide" type="button">ปิด</button>
        </header>
        <div class="ipm-tabs" role="tablist">
          <button class="ipm-tab active" data-pane="important" type="button"><span class="ipm-dot"></span>1 ข้อมูลสำคัญ</button>
          <button class="ipm-tab" data-pane="cisco" type="button"><span class="ipm-dot"></span>2 Cisco</button>
          <button class="ipm-tab" data-pane="check" type="button"><span class="ipm-dot"></span>3 ตรวจสอบ</button>
          <button class="ipm-tab" data-pane="trouble" type="button"><span class="ipm-dot"></span>4 Troubleshooting</button>
          <button class="ipm-tab" data-pane="commands" type="button"><span class="ipm-dot"></span>5 Commands</button>
          <button class="ipm-tab" data-pane="flow" type="button"><span class="ipm-dot"></span>6 Quick Fix</button>
        </div>
        <div class="ipm-body">
          <section class="ipm-pane active" data-pane-id="important">
            <div class="ipm-section-title"><div class="ipm-num">1</div><div><h3>ข้อมูลสำคัญ</h3><small>ข้อมูลที่ใช้บ่อยสำหรับ Cisco และ Nortel</small></div></div>
            <div class="ipm-grid">
              <article class="ipm-card ipm-good"><h4>Cisco</h4><p>จัดการผ่าน <span class="ipm-value">Remote Desktop</span> และ <span class="ipm-value">Internet Explorer</span></p></article>
              <article class="ipm-card ipm-good"><h4>Nortel</h4><p>ดูข้อมูลจากตำแหน่งไฟล์คู่มือ</p></article>
              <article class="ipm-card"><h4>Remote Desktop</h4><p class="ipm-value">10.14.1.1</p><div class="ipm-actions"><button class="btn ipm-mini" data-copy="10.14.1.1" type="button">Copy IP</button></div></article>
              <article class="ipm-card"><h4>Username</h4><p class="ipm-value">Administrator</p></article>
              <article class="ipm-card ipm-warn"><h4>Password</h4><p class="ipm-value">********</p><div class="ipm-actions"><button class="btn ipm-mini" id="ipmPasswordBtn" type="button">ดูรหัสผ่าน (ผู้มีสิทธิ์)</button></div></article>
              <article class="ipm-card"><h4>Internet Explorer</h4><p>ใช้สำหรับเข้า IP ของโทรศัพท์</p></article>
              <article class="ipm-card full"><h4>คู่มือ Nortel</h4><p class="ipm-value">${nortelPath}</p><div class="ipm-actions"><button class="btn ipm-mini" id="ipmCopyPath" type="button">Copy Path</button></div></article>
              <article class="ipm-card full"><h4>ไฟล์</h4><p class="ipm-value">10. IP-Phone-ATA-Number__30-05-2019</p><div class="ipm-actions"><button class="btn ipm-mini" data-copy="10. IP-Phone-ATA-Number__30-05-2019" type="button">Copy</button></div></article>
            </div>
          </section>

          <section class="ipm-pane" data-pane-id="cisco">
            <div class="ipm-section-title"><div class="ipm-num">2</div><div><h3>วิธีเข้าใช้งาน Cisco</h3><small>ทำตามลำดับจากซ้ายไปขวา</small></div></div>
            <div class="ipm-steps"><div class="ipm-step" data-n="1"><b>เปิด Remote Desktop</b></div><div class="ipm-step" data-n="2"><b>ใส่ 10.14.1.1</b></div><div class="ipm-step" data-n="3"><b>Login</b></div><div class="ipm-step" data-n="4"><b>เปิด Internet Explorer</b></div><div class="ipm-step" data-n="5"><b>เข้า IP ของโทรศัพท์</b></div></div>
          </section>

          <section class="ipm-pane" data-pane-id="check">
            <div class="ipm-section-title"><div class="ipm-num">3</div><div><h3>วิธีตรวจสอบเบื้องต้น</h3><small>ตรวจสอบทีละขั้นก่อน Escalate</small></div></div>
            <div class="ipm-steps"><div class="ipm-step" data-n="1"><b>สาย LAN / PoE</b></div><div class="ipm-step" data-n="2"><b>IP Address</b></div><div class="ipm-step" data-n="3"><b>VLAN / DHCP</b></div><div class="ipm-step" data-n="4"><b>Ping</b></div><div class="ipm-step" data-n="5"><b>TFTP / Config</b></div><div class="ipm-step" data-n="6"><b>Registration</b></div><div class="ipm-step" data-n="7"><b>ทดสอบโทร</b></div></div>
          </section>

          <section class="ipm-pane" data-pane-id="trouble">
            <div class="ipm-section-title"><div class="ipm-num">4</div><div><h3>อาการและวิธีแก้</h3><small>แยกสีตามประเภทของปัญหา</small></div></div>
            <div class="ipm-troubles"><article class="ipm-trouble ipm-bad"><h4>เครื่องไม่ติด</h4><p>ตรวจสอบ PoE, Adapter, สาย LAN</p></article><article class="ipm-trouble ipm-warn"><h4>ไม่มี IP</h4><p>ตรวจสอบ DHCP, VLAN, Switch Port</p></article><article class="ipm-trouble ipm-good"><h4>มี IP แต่โทรไม่ได้</h4><p>ตรวจสอบ Registration, SIP Server, TFTP</p></article><article class="ipm-trouble ipm-bad"><h4>โทรได้แต่ไม่มีเสียง</h4><p>ตรวจสอบ Voice VLAN, Codec, RTP, Firewall</p></article><article class="ipm-trouble ipm-warn"><h4>เสียงขาดหรือดีเลย์</h4><p>ตรวจสอบ Packet Loss, Jitter, Bandwidth, QoS</p></article><article class="ipm-trouble ipm-bad"><h4>เครื่องค้าง</h4><p>Restart ก่อน และห้าม Factory Reset หากไม่ได้รับอนุญาต</p></article></div>
            <div class="ipm-audio"><div class="ipm-audio-head"><span>A</span><strong>AudioCodes – Analog Phone ใช้งานไม่ได้ทุกเครื่อง</strong></div><div class="ipm-card ipm-bad" style="margin-bottom:9px"><h4>อาการ</h4><p>โทรศัพท์ Analog ทุกเครื่องที่เชื่อมต่อผ่าน AudioCodes ใช้งานไม่ได้</p></div><div class="ipm-audio-steps"><article class="ipm-audio-step" data-n="1"><b>เปิดเว็บ Browser</b><p>เข้า IP ของ AudioCodes</p></article><article class="ipm-audio-step" data-n="2"><b>Maintenance</b><p>ไปที่เมนู Maintenance</p></article><article class="ipm-audio-step ipm-good" data-n="3"><b>BURN</b><p>บันทึก Configuration ลง Flash Memory</p></article><article class="ipm-audio-step ipm-warn" data-n="4"><b>Reset</b><p>Restart อุปกรณ์</p></article><article class="ipm-audio-step ipm-warn" data-n="5"><b>รอ 2–5 นาที</b><p>รอเครื่องบูต</p></article><article class="ipm-audio-step ipm-good" data-n="6"><b>Ping</b><p>ping &lt;AudioCodes-IP&gt;</p><div class="ipm-actions"><button class="btn ipm-mini" data-copy="ping <AudioCodes-IP>" type="button">Copy ping</button></div></article><article class="ipm-audio-step ipm-good" data-n="7"><b>ทดสอบโทร</b><p>เมื่อ Ping ได้ ให้ทดสอบโทรเข้าและโทรออกทุกเครื่อง</p></article></div><div class="ipm-note-grid"><article class="ipm-note ipm-good"><h4>คำอธิบาย</h4><p><span class="ipm-chip">BURN</span> บันทึกค่าปัจจุบัน ป้องกัน Config หายหลัง Restart</p><p><span class="ipm-chip">Reset</span> Restart อุปกรณ์ ไม่ใช่ Factory Reset</p><p><span class="ipm-chip">Reply from</span> อุปกรณ์ออนไลน์</p></article><article class="ipm-note ipm-warn"><h4>ผลลัพธ์ Ping</h4><p><span class="ipm-chip">Request timed out</span> เครื่องยังไม่พร้อม หรือ Network มีปัญหา</p><p><span class="ipm-chip">Destination host unreachable</span> ตรวจสอบ IP, VLAN, Gateway และเส้นทางเครือข่าย</p></article></div><article class="ipm-card ipm-bad" style="margin-top:9px"><h4>ข้อควรระวัง</h4><p>การ Reset จะทำให้โทรศัพท์ Analog ทุกเครื่องหยุดใช้งานชั่วคราว ควรดำเนินการเมื่อได้รับอนุญาต</p></article></div>
          </section>

          <section class="ipm-pane" data-pane-id="commands">
            <div class="ipm-section-title"><div class="ipm-num">5</div><div><h3>คำสั่งตรวจสอบ</h3><small>กด Copy แล้วนำไปใช้งานได้ทันที</small></div></div>
            <div class="ipm-code-list"><div class="ipm-code"><code>ping &lt;IP&gt;</code><button class="btn ipm-mini" data-copy="ping <IP>" type="button">Copy</button></div><div class="ipm-code"><code>ipconfig /all</code><button class="btn ipm-mini" data-copy="ipconfig /all" type="button">Copy</button></div><div class="ipm-code"><code>arp -a</code><button class="btn ipm-mini" data-copy="arp -a" type="button">Copy</button></div><div class="ipm-code"><code>tftp -i &lt;Server-IP&gt; GET &lt;filename&gt;</code><button class="btn ipm-mini" data-copy="tftp -i <Server-IP> GET <filename>" type="button">Copy</button></div></div>
          </section>

          <section class="ipm-pane" data-pane-id="flow">
            <div class="ipm-section-title"><div class="ipm-num">6</div><div><h3>Quick Fix Flow</h3><small>ลำดับดำเนินการแบบเร็ว</small></div></div>
            <div class="ipm-flow"><div class="ipm-flow-step">CHECK</div><div class="ipm-flow-step">RESTART</div><div class="ipm-flow-step">RE-CHECK IP</div><div class="ipm-flow-step">TEST CALL</div><div class="ipm-flow-step">ESCALATE NOC/L3</div></div>
          </section>
        </div>
      </div>`;
    document.body.appendChild(overlay);

    const q=sel=>overlay.querySelector(sel);
    const qa=sel=>[...overlay.querySelectorAll(sel)];
    const toast=text=>{const el=document.getElementById("toast");if(el){el.textContent=text;el.classList.add("show");clearTimeout(el._t);el._t=setTimeout(()=>el.classList.remove("show"),2000)}};
    const copy=async text=>{try{await navigator.clipboard.writeText(text)}catch{const ta=document.createElement("textarea");ta.value=text;ta.style.position="fixed";ta.style.opacity="0";document.body.appendChild(ta);ta.select();document.execCommand("copy");ta.remove()}toast("คัดลอกสำเร็จ")};
    const setPane=name=>{qa(".ipm-tab").forEach(tab=>tab.classList.toggle("active",tab.dataset.pane===name));qa(".ipm-pane").forEach(pane=>pane.classList.toggle("active",pane.dataset.paneId===name));q(".ipm-body").scrollTop=0};
    const open=()=>{setPane("important");overlay.classList.add("open");overlay.setAttribute("aria-hidden","false");document.body.style.overflow="hidden"};
    const close=()=>{overlay.classList.remove("open");overlay.setAttribute("aria-hidden","true");document.body.style.overflow=""};

    button.addEventListener("click",open);
    q("#closeIpPhoneGuide").addEventListener("click",close);
    overlay.addEventListener("click",e=>{if(e.target===overlay)close()});
    document.addEventListener("keydown",e=>{if(e.key==="Escape"&&overlay.classList.contains("open"))close()});
    qa(".ipm-tab").forEach(tab=>tab.addEventListener("click",()=>setPane(tab.dataset.pane)));
    qa("[data-copy]").forEach(btn=>btn.addEventListener("click",()=>copy(btn.dataset.copy||"")));
    q("#ipmCopyPath").addEventListener("click",()=>copy(nortelPath));
    q("#ipmPasswordBtn").addEventListener("click",()=>toast("หน้าเว็บสาธารณะไม่แสดงรหัสผ่าน"));
  });
})();