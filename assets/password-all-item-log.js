(()=>{
  'use strict';
  const STORE_KEY='linkwork.passwordAll.itemLogs.v1';
  const MAX_PER_ITEM=50;

  const readStore=()=>{
    try{return JSON.parse(localStorage.getItem(STORE_KEY)||'{}')||{}}catch{return {}}
  };
  const writeStore=data=>{
    try{localStorage.setItem(STORE_KEY,JSON.stringify(data))}catch{}
  };
  const itemKey=card=>{
    const name=card.querySelector('h3')?.textContent?.trim()||'Unknown';
    const group=card.querySelector('.pav-group')?.textContent?.trim()||'';
    return `${name}||${group}`;
  };
  const formatTime=iso=>{
    try{return new Date(iso).toLocaleString('th-TH',{dateStyle:'short',timeStyle:'medium'})}catch{return iso}
  };
  const getLogs=key=>(readStore()[key]||[]);
  const setLogs=(key,logs)=>{
    const all=readStore();
    if(logs.length)all[key]=logs.slice(0,MAX_PER_ITEM);else delete all[key];
    writeStore(all);
  };
  const escapeHtml=value=>String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const renderEntries=(card,logs)=>{
    const box=card.querySelector('.pav-item-log-list');
    if(!box)return;
    box.innerHTML=logs.length?logs.slice(0,12).map(x=>`<div class="pav-item-log-entry"><span>${escapeHtml(x.action)}</span><time>${escapeHtml(formatTime(x.at))}</time></div>`).join(''):'<div class="pav-item-log-empty">ยังไม่มี Log สำหรับรายการนี้</div>';
  };
  const refreshCard=card=>{
    const logs=getLogs(itemKey(card));
    const count=card.querySelector('.pav-item-log-count');
    if(count)count.textContent=logs.length;
    renderEntries(card,logs);
  };
  const addLog=(card,action)=>{
    if(!card||!action)return;
    const key=itemKey(card),logs=getLogs(key);
    logs.unshift({action,at:new Date().toISOString()});
    setLogs(key,logs);
    refreshCard(card);
  };
  const clearLogs=card=>{
    if(!card)return;
    setLogs(itemKey(card),[]);
    refreshCard(card);
  };
  const decorateCard=card=>{
    if(card.dataset.itemLogReady==='1')return;
    card.dataset.itemLogReady='1';
    const wrap=document.createElement('div');
    wrap.className='pav-item-log';
    wrap.innerHTML=`
      <div class="pav-item-log-bar">
        <button class="pav-item-log-toggle" type="button">LOG <span class="pav-item-log-count">0</span></button>
        <span class="pav-item-log-hint">บันทึกกิจกรรมของรายการนี้</span>
      </div>
      <div class="pav-item-log-panel" hidden>
        <div class="pav-item-log-head"><strong>Activity Log</strong><button class="pav-item-log-clear" type="button">ล้าง Log</button></div>
        <div class="pav-item-log-list"></div>
      </div>`;
    card.appendChild(wrap);
    refreshCard(card);
  };
  const decorateAll=()=>document.querySelectorAll('#passwordAllVault .pav-card').forEach(decorateCard);
  const getCard=target=>target?.closest?.('#passwordAllVault .pav-card');

  const install=()=>{
    const vault=document.getElementById('passwordAllVault');
    const grid=document.getElementById('pavGrid');
    if(!vault||!grid)return false;
    if(document.getElementById('passwordAllItemLogStyle'))return true;

    const style=document.createElement('style');
    style.id='passwordAllItemLogStyle';
    style.textContent=`
      #passwordAllVault .pav-item-log{margin-top:11px;padding-top:9px;border-top:1px solid rgba(33,220,255,.16)}
      #passwordAllVault .pav-item-log-bar{display:flex;align-items:center;gap:8px;justify-content:space-between}
      #passwordAllVault .pav-item-log-toggle{min-height:29px;padding:0 9px;border:1px solid rgba(33,220,255,.34);border-radius:8px;background:linear-gradient(180deg,rgba(9,47,80,.96),rgba(4,21,38,.98));color:#dff8ff;font:inherit;font-size:.68rem;font-weight:900;cursor:pointer;letter-spacing:.04em}
      #passwordAllVault .pav-item-log-toggle:hover{border-color:rgba(33,220,255,.7);box-shadow:0 0 12px rgba(33,220,255,.11)}
      #passwordAllVault .pav-item-log-count{display:inline-grid;place-items:center;min-width:20px;height:20px;margin-left:4px;padding:0 4px;border-radius:999px;background:rgba(33,220,255,.12);color:#5aeaff;font-size:.66rem}
      #passwordAllVault .pav-item-log-hint{color:#678dab;font-size:.66rem}
      #passwordAllVault .pav-item-log-panel{margin-top:8px;padding:9px;border:1px solid rgba(33,220,255,.15);border-radius:9px;background:rgba(1,10,20,.78)}
      #passwordAllVault .pav-item-log-head{display:flex;align-items:center;justify-content:space-between;gap:8px;margin-bottom:7px}
      #passwordAllVault .pav-item-log-head strong{font-size:.72rem;color:#dff6ff}
      #passwordAllVault .pav-item-log-clear{border:1px solid rgba(255,101,127,.32);border-radius:7px;background:rgba(255,101,127,.07);color:#ff9daf;font:inherit;font-size:.64rem;font-weight:800;padding:4px 7px;cursor:pointer}
      #passwordAllVault .pav-item-log-list{display:grid;gap:5px;max-height:150px;overflow:auto}
      #passwordAllVault .pav-item-log-entry{display:grid;grid-template-columns:minmax(0,1fr) auto;gap:8px;align-items:center;padding:6px 7px;border:1px solid rgba(33,220,255,.09);border-radius:7px;background:rgba(5,24,42,.66);font-size:.67rem}
      #passwordAllVault .pav-item-log-entry span{color:#d7ebfa;font-weight:700}
      #passwordAllVault .pav-item-log-entry time{color:#7197b8;white-space:nowrap;font-size:.62rem}
      #passwordAllVault .pav-item-log-empty{padding:8px;text-align:center;color:#668ba9;font-size:.66rem}
      @media(max-width:560px){#passwordAllVault .pav-item-log-hint{display:none}#passwordAllVault .pav-item-log-entry{grid-template-columns:1fr}#passwordAllVault .pav-item-log-entry time{white-space:normal}}
    `;
    document.head.appendChild(style);

    const observer=new MutationObserver(()=>decorateAll());
    observer.observe(grid,{childList:true,subtree:false});
    decorateAll();

    vault.addEventListener('click',event=>{
      const card=getCard(event.target);
      if(!card)return;

      const toggle=event.target.closest('.pav-item-log-toggle');
      if(toggle){
        const panel=card.querySelector('.pav-item-log-panel');
        if(panel){panel.hidden=!panel.hidden;if(!panel.hidden)refreshCard(card)}
        return;
      }
      if(event.target.closest('.pav-item-log-clear')){
        event.preventDefault();event.stopPropagation();
        clearLogs(card);
        return;
      }

      const anchor=event.target.closest('.pav-url a');
      if(anchor){addLog(card,'เปิด URL');return}

      const copyButton=event.target.closest('button[data-copy]');
      if(copyButton){
        const label=copyButton.closest('.pav-row')?.querySelector('.pav-label')?.textContent?.trim()||'ข้อมูล';
        addLog(card,label==='URL'?'Copy URL':label==='User'?'Copy Username':`Copy ${label}`);
        return;
      }

      const secretButton=event.target.closest('button[data-t]');
      if(secretButton){
        const isShowing=secretButton.textContent.trim()==='ซ่อน';
        addLog(card,isShowing?'ซ่อนรหัสผ่าน':'ดูรหัสผ่าน');
      }
    },true);

    vault.addEventListener('contextmenu',event=>{
      const secret=event.target.closest('.pav-secret');
      if(!secret||secret.dataset.on!=='1')return;
      const card=getCard(secret);
      if(card)addLog(card,'Copy Password');
    },true);

    return true;
  };

  let attempts=0;
  const boot=()=>{
    if(install())return;
    if(++attempts<40)setTimeout(boot,100);
  };
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
})();