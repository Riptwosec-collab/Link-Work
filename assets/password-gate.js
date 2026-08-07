(()=>{
  'use strict';

  const ACCESS_CODE='254328';
  const SECRET_MAP={
    ipmPasswordBtn:'ccm7845',
    ciscoPasswordNotice:'ccm7845'
  };

  const toast=text=>{
    const el=document.getElementById('toast');
    if(el){
      el.textContent=text;
      el.classList.add('show');
      clearTimeout(el._passwordGateTimer);
      el._passwordGateTimer=setTimeout(()=>el.classList.remove('show'),2000);
    }
  };

  const ensureUi=()=>{
    let overlay=document.getElementById('lwPasswordGate');
    if(overlay)return overlay;

    const style=document.createElement('style');
    style.id='lwPasswordGateStyle';
    style.textContent=`
      #lwPasswordGate{position:fixed;inset:0;z-index:9999;display:none;place-items:center;padding:18px;background:rgba(0,5,13,.82);backdrop-filter:blur(8px)}
      #lwPasswordGate.open{display:grid}
      #lwPasswordGate .lwpg-box{width:min(390px,100%);padding:18px;border:1px solid rgba(33,220,255,.46);border-radius:18px;background:linear-gradient(145deg,rgba(8,31,55,.99),rgba(2,10,20,.995));box-shadow:0 26px 70px rgba(0,0,0,.58),0 0 30px rgba(0,190,255,.12);color:#eef8ff}
      #lwPasswordGate .lwpg-head{display:flex;align-items:center;gap:10px;margin-bottom:12px}
      #lwPasswordGate .lwpg-icon{width:38px;height:38px;display:grid;place-items:center;border-radius:10px;border:1px solid rgba(33,220,255,.45);background:rgba(33,220,255,.07);color:#48e7ff;font-weight:900}
      #lwPasswordGate h3{margin:0;font-size:1rem}
      #lwPasswordGate p{margin:3px 0 0;color:#8fb5d5;font-size:.78rem}
      #lwPasswordGate input{width:100%;height:46px;box-sizing:border-box;border:1px solid rgba(33,220,255,.34);border-radius:11px;background:#020d19;color:#fff;padding:0 13px;font:inherit;font-size:1rem;outline:none;letter-spacing:.12em}
      #lwPasswordGate input:focus{border-color:#21dcff;box-shadow:0 0 0 3px rgba(33,220,255,.1)}
      #lwPasswordGate .lwpg-error{min-height:19px;margin-top:7px;color:#ff8fa3;font-size:.75rem}
      #lwPasswordGate .lwpg-actions{display:flex;justify-content:flex-end;gap:8px;margin-top:10px}
      #lwPasswordGate .lwpg-btn{min-height:38px;padding:0 13px;border-radius:9px;border:1px solid rgba(33,220,255,.38);background:linear-gradient(180deg,#0c3b67,#071c34);color:#eef8ff;font:inherit;font-weight:800;cursor:pointer}
      #lwPasswordGate .lwpg-btn.primary{background:linear-gradient(180deg,#5deaff,#16aee4);color:#04101b;border-color:#8ef3ff}
    `;
    document.head.appendChild(style);

    overlay=document.createElement('div');
    overlay.id='lwPasswordGate';
    overlay.innerHTML=`
      <div class="lwpg-box" role="dialog" aria-modal="true" aria-labelledby="lwpgTitle">
        <div class="lwpg-head"><div class="lwpg-icon">KEY</div><div><h3 id="lwpgTitle">ยืนยันสิทธิ์ดูรหัสผ่าน</h3><p>กรอกรหัสสำหรับเปิดดูข้อมูลที่ถูกซ่อน</p></div></div>
        <input id="lwpgInput" type="password" inputmode="numeric" autocomplete="off" placeholder="กรอกรหัส" maxlength="20">
        <div class="lwpg-error" id="lwpgError"></div>
        <div class="lwpg-actions"><button class="lwpg-btn" id="lwpgCancel" type="button">ยกเลิก</button><button class="lwpg-btn primary" id="lwpgSubmit" type="button">ยืนยัน</button></div>
      </div>`;
    document.body.appendChild(overlay);
    return overlay;
  };

  const verify=()=>new Promise(resolve=>{
    const overlay=ensureUi();
    const input=overlay.querySelector('#lwpgInput');
    const error=overlay.querySelector('#lwpgError');
    const submit=overlay.querySelector('#lwpgSubmit');
    const cancel=overlay.querySelector('#lwpgCancel');
    let done=false;

    const finish=value=>{
      if(done)return;
      done=true;
      overlay.classList.remove('open');
      input.value='';
      error.textContent='';
      submit.removeEventListener('click',onSubmit);
      cancel.removeEventListener('click',onCancel);
      input.removeEventListener('keydown',onKey);
      resolve(value);
    };
    const onSubmit=()=>{
      if(input.value===ACCESS_CODE){finish(true);return;}
      error.textContent='รหัสไม่ถูกต้อง';
      input.select();
    };
    const onCancel=()=>finish(false);
    const onKey=e=>{
      if(e.key==='Enter')onSubmit();
      if(e.key==='Escape')onCancel();
    };

    submit.addEventListener('click',onSubmit);
    cancel.addEventListener('click',onCancel);
    input.addEventListener('keydown',onKey);
    overlay.classList.add('open');
    setTimeout(()=>input.focus(),40);
  });

  const findTarget=button=>{
    if(button.id==='ipmPasswordBtn')return button.closest('.ipm-card')?.querySelector('.ipm-value');
    if(button.id==='ciscoPasswordNotice')return button.closest('.cisco-login-card')?.querySelector('.cisco-login-value');
    const selector=button.dataset.passwordTarget;
    return selector?document.querySelector(selector):null;
  };

  const toggle=async(button,secret)=>{
    const target=findTarget(button);
    if(!target)return;

    if(target.dataset.passwordVisible==='1'){
      target.textContent='********';
      target.dataset.passwordVisible='0';
      button.textContent=button.dataset.showLabel||'ดูรหัสผ่าน (ผู้มีสิทธิ์)';
      return;
    }

    const ok=await verify();
    if(!ok)return;
    target.textContent=secret;
    target.dataset.passwordVisible='1';
    if(!button.dataset.showLabel)button.dataset.showLabel=button.textContent.trim();
    button.textContent='ซ่อนรหัสผ่าน';
    toast('ยืนยันสิทธิ์สำเร็จ');
  };

  window.LinkWorkPasswordGate={
    verify,
    reveal:(button,target,secret)=>{
      if(button&&target){
        button.dataset.passwordTarget=target;
        button.dataset.systemSecret=secret;
      }
    }
  };

  document.addEventListener('click',event=>{
    const button=event.target.closest('button');
    if(!button)return;
    const secret=SECRET_MAP[button.id]||button.dataset.systemSecret;
    if(!secret)return;
    event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation();
    toggle(button,secret);
  },true);
})();