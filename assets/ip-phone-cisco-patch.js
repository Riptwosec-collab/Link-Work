(()=>{
  'use strict';
  const ready=fn=>document.readyState!=='loading'?fn():document.addEventListener('DOMContentLoaded',fn,{once:true});
  ready(()=>{
    const guide=document.getElementById('ipPhoneGuide');
    const pane=guide?.querySelector('[data-pane-id="cisco"]');
    if(!guide||!pane)return;

    document.getElementById('ipPhoneCiscoPatchStyle')?.remove();
    const style=document.createElement('style');
    style.id='ipPhoneCiscoPatchStyle';
    style.textContent=`
      #ipPhoneGuide .cisco-login-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:9px;margin-bottom:12px}
      #ipPhoneGuide .cisco-login-card{position:relative;padding:11px;border:1px solid rgba(33,220,255,.2);border-radius:11px;background:linear-gradient(145deg,rgba(6,27,47,.94),rgba(3,15,28,.96));overflow:hidden}
      #ipPhoneGuide .cisco-login-card::after{content:"";position:absolute;left:0;top:0;bottom:0;width:3px;background:linear-gradient(180deg,transparent,#21dcff,transparent);opacity:.6}
      #ipPhoneGuide .cisco-login-card.warn{border-color:rgba(255,215,106,.34)}
      #ipPhoneGuide .cisco-login-card.warn::after{background:linear-gradient(180deg,transparent,#ffd76a,transparent)}
      #ipPhoneGuide .cisco-login-label{display:block;color:#83a9c8;font-size:.7rem;font-weight:800;text-transform:uppercase;letter-spacing:.04em;margin-bottom:5px}
      #ipPhoneGuide .cisco-login-value{display:block;color:#f4faff;font-size:.88rem;font-weight:900;word-break:break-word}
      #ipPhoneGuide .cisco-login-actions{display:flex;gap:6px;margin-top:8px;flex-wrap:wrap}
      #ipPhoneGuide .cisco-path{margin-top:12px;padding:12px;border:1px solid rgba(33,220,255,.2);border-radius:12px;background:rgba(3,17,31,.86)}
      #ipPhoneGuide .cisco-path-title{display:flex;align-items:center;gap:8px;margin-bottom:10px;color:#f3f9ff;font-size:.88rem;font-weight:950}
      #ipPhoneGuide .cisco-path-title::before{content:"IE";display:grid;place-items:center;width:29px;height:29px;border-radius:8px;border:1px solid rgba(33,220,255,.4);background:rgba(33,220,255,.06);color:#35e1ff;font-size:.7rem}
      #ipPhoneGuide .cisco-flow{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:8px}
      #ipPhoneGuide .cisco-flow-step{position:relative;min-height:64px;padding:10px 9px 9px;border:1px solid rgba(33,220,255,.18);border-radius:10px;background:linear-gradient(145deg,rgba(6,25,44,.93),rgba(3,15,27,.96));text-align:center;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:4px;transition:.18s ease}
      #ipPhoneGuide .cisco-flow-step:hover{transform:translateY(-2px);border-color:rgba(33,220,255,.42);box-shadow:0 8px 18px rgba(0,0,0,.2),0 0 12px rgba(33,220,255,.08)}
      #ipPhoneGuide .cisco-flow-step b{font-size:.79rem;color:#f3f9ff}
      #ipPhoneGuide .cisco-flow-step small{font-size:.69rem;color:#88abc9;line-height:1.3}
      #ipPhoneGuide .cisco-flow-step::before{content:attr(data-n);position:absolute;left:7px;top:7px;width:20px;height:20px;display:grid;place-items:center;border-radius:50%;border:1px solid rgba(33,220,255,.38);color:#31dfff;background:rgba(33,220,255,.06);font-size:.64rem;font-weight:950}
      #ipPhoneGuide .cisco-note{margin-top:10px;padding:9px 11px;border:1px solid rgba(255,215,106,.28);border-radius:9px;background:rgba(255,215,106,.05);color:#ffe7a4;font-size:.75rem;line-height:1.45}
      @media(max-width:760px){#ipPhoneGuide .cisco-login-grid{grid-template-columns:1fr}#ipPhoneGuide .cisco-flow{grid-template-columns:1fr 1fr}}
      @media(max-width:480px){#ipPhoneGuide .cisco-flow{grid-template-columns:1fr}}
    `;
    document.head.appendChild(style);

    pane.innerHTML=`
      <div class="ipm-section-title"><div class="ipm-num">2</div><div><h3>วิธีเข้าใช้งาน Cisco</h3><small>Remote Desktop → Internet Explorer → Cisco Unified CallManager 4.2 Administration</small></div></div>

      <div class="cisco-login-grid">
        <article class="cisco-login-card">
          <span class="cisco-login-label">Remote Desktop</span>
          <span class="cisco-login-value">10.14.1.1</span>
          <div class="cisco-login-actions"><button class="btn ipm-mini" data-cisco-copy="10.14.1.1" type="button">Copy IP</button></div>
        </article>
        <article class="cisco-login-card">
          <span class="cisco-login-label">Username</span>
          <span class="cisco-login-value">Administrator</span>
          <div class="cisco-login-actions"><button class="btn ipm-mini" data-cisco-copy="Administrator" type="button">Copy User</button></div>
        </article>
        <article class="cisco-login-card warn">
          <span class="cisco-login-label">Password</span>
          <span class="cisco-login-value">********</span>
          <div class="cisco-login-actions"><button class="btn ipm-mini" id="ciscoPasswordNotice" type="button">ผู้มีสิทธิ์เท่านั้น</button></div>
        </article>
      </div>

      <div class="cisco-path">
        <div class="cisco-path-title">ขั้นตอนใน Internet Explorer</div>
        <div class="cisco-flow">
          <div class="cisco-flow-step" data-n="1"><b>เปิด Remote Desktop</b><small>เชื่อมต่อ 10.14.1.1</small></div>
          <div class="cisco-flow-step" data-n="2"><b>Login</b><small>User: Administrator</small></div>
          <div class="cisco-flow-step" data-n="3"><b>เปิด Internet Explorer</b><small>บนเครื่อง Remote Desktop</small></div>
          <div class="cisco-flow-step" data-n="4"><b>Cisco Unified CallManager 4.2 Administration</b><small>เข้าเมนู Administration</small></div>
          <div class="cisco-flow-step" data-n="5"><b>Phone Configuration</b><small>เข้าส่วนตั้งค่า Phone</small></div>
          <div class="cisco-flow-step" data-n="6"><b>Device → Phone</b><small>เลือก Device แล้วเลือก Phone</small></div>
          <div class="cisco-flow-step" data-n="7"><b>MAC Address*</b><small>ค้นหา/ระบุ MAC Address</small></div>
          <div class="cisco-flow-step" data-n="8"><b>Description</b><small>ตรวจสอบ Description</small></div>
        </div>
        <div class="cisco-note">Password ถูกซ่อนไว้บนหน้าเว็บสาธารณะ ให้ใช้รหัสที่ได้รับอนุญาตสำหรับผู้มีสิทธิ์</div>
      </div>`;

    const toast=text=>{const el=document.getElementById('toast');if(el){el.textContent=text;el.classList.add('show');clearTimeout(el._ciscoT);el._ciscoT=setTimeout(()=>el.classList.remove('show'),1900)}};
    const copy=async text=>{try{await navigator.clipboard.writeText(text)}catch{const ta=document.createElement('textarea');ta.value=text;ta.style.position='fixed';ta.style.opacity='0';document.body.appendChild(ta);ta.select();document.execCommand('copy');ta.remove()}toast('คัดลอกสำเร็จ')};
    pane.querySelectorAll('[data-cisco-copy]').forEach(btn=>btn.addEventListener('click',()=>copy(btn.dataset.ciscoCopy||'')));
    pane.querySelector('#ciscoPasswordNotice')?.addEventListener('click',()=>toast('รหัสผ่านไม่แสดงบนหน้าเว็บสาธารณะ'));
  });
})();