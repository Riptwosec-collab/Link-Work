(()=>{
  'use strict';
  const ready=fn=>document.readyState!=='loading'?fn():document.addEventListener('DOMContentLoaded',fn,{once:true});
  ready(()=>{
    const modal=document.getElementById('ownerModal');
    const list=document.getElementById('ownerList');
    if(!modal||!list)return;

    document.getElementById('ownerPakUpgradeStyle')?.remove();
    const style=document.createElement('style');
    style.id='ownerPakUpgradeStyle';
    style.textContent=`
      #ownerModal .owner-modal{width:min(1240px,100%)!important}
      #ownerModal .modal-top{position:sticky;top:-18px;z-index:5;margin:-18px -18px 14px;padding:17px 18px 14px;background:linear-gradient(180deg,rgba(5,22,39,.99),rgba(3,14,26,.98));border-bottom:1px solid rgba(33,220,255,.18);backdrop-filter:blur(10px)}
      #ownerModal .modal-top h2{font-size:1.25rem!important}
      #ownerModal .modal-top .sub{font-size:.78rem!important}
      #ownerModal .owner-pak-wrap{display:grid;gap:14px}
      #ownerModal .owner-hero{position:relative;overflow:hidden;padding:16px;border:1px solid rgba(33,220,255,.26);border-radius:14px;background:radial-gradient(circle at 88% 0,rgba(0,155,255,.10),transparent 28%),linear-gradient(145deg,rgba(7,30,52,.96),rgba(3,14,26,.98));box-shadow:0 12px 30px rgba(0,0,0,.22),inset 0 1px rgba(255,255,255,.03)}
      #ownerModal .owner-hero::after{content:"";position:absolute;left:-30%;top:0;width:24%;height:2px;background:linear-gradient(90deg,transparent,#67efff,transparent);box-shadow:0 0 14px rgba(33,220,255,.5);animation:ownerPakScan 6s linear infinite}
      #ownerModal .owner-hero-top{display:flex;align-items:flex-start;justify-content:space-between;gap:12px;flex-wrap:wrap}
      #ownerModal .owner-hero h3{margin:0;color:#f4f9ff;font-size:1.15rem}
      #ownerModal .owner-hero p{margin:4px 0 0;color:#91b6d4;font-size:.8rem}
      #ownerModal .owner-update{display:inline-flex;align-items:center;gap:7px;padding:7px 10px;border-radius:999px;border:1px solid rgba(255,215,102,.36);background:rgba(255,215,102,.07);color:#ffe8a0;font-size:.75rem;font-weight:850;white-space:nowrap}
      #ownerModal .owner-update::before{content:"";width:7px;height:7px;border-radius:50%;background:#ffd766;box-shadow:0 0 9px rgba(255,215,102,.6)}
      #ownerModal .owner-contacts{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:9px;margin-top:13px}
      #ownerModal .owner-contact{min-width:0;padding:11px;border:1px solid rgba(33,220,255,.18);border-radius:11px;background:rgba(3,17,31,.9);transition:.18s ease}
      #ownerModal .owner-contact:hover{transform:translateY(-2px);border-color:rgba(33,220,255,.42);box-shadow:0 8px 18px rgba(0,0,0,.2),0 0 13px rgba(33,220,255,.07)}
      #ownerModal .owner-contact-head{display:flex;align-items:center;justify-content:space-between;gap:8px;margin-bottom:7px}
      #ownerModal .owner-contact-name{font-weight:900;color:#f2f8ff}
      #ownerModal .owner-role{padding:3px 7px;border-radius:999px;border:1px solid rgba(33,220,255,.24);color:#bcefff;background:rgba(33,220,255,.06);font-size:.68rem;font-weight:850}
      #ownerModal .owner-role.backup{border-color:rgba(255,215,102,.3);color:#ffe7a0;background:rgba(255,215,102,.06)}
      #ownerModal .owner-contact-line{display:flex;align-items:center;justify-content:space-between;gap:8px;margin-top:5px;color:#aec9df;font-size:.75rem}
      #ownerModal .owner-contact-line strong{min-width:0;color:#e7f4ff;font-weight:750;overflow-wrap:anywhere}
      #ownerModal .owner-copy-mini{min-height:27px!important;padding:0 8px!important;border-radius:7px!important;font-size:.68rem!important;flex:0 0 auto}
      #ownerModal #ownerList{display:grid!important;grid-template-columns:repeat(2,minmax(0,1fr))!important;gap:12px!important}
      #ownerModal .owner-card{position:relative;overflow:hidden;min-width:0;padding:0;border:1px solid rgba(33,220,255,.22);border-radius:14px;background:linear-gradient(145deg,rgba(6,27,47,.95),rgba(3,14,27,.98));box-shadow:0 10px 26px rgba(0,0,0,.22),inset 0 1px rgba(255,255,255,.025);transition:.18s ease}
      #ownerModal .owner-card:hover{transform:translateY(-2px);border-color:rgba(33,220,255,.42);box-shadow:0 14px 30px rgba(0,0,0,.28),0 0 16px rgba(33,220,255,.08)}
      #ownerModal .owner-card::before{content:"";position:absolute;left:0;top:0;bottom:0;width:3px;background:linear-gradient(180deg,transparent,#21dcff 20%,#168dff 80%,transparent)}
      #ownerModal .owner-card-head{display:flex;align-items:flex-start;justify-content:space-between;gap:10px;padding:13px 14px 12px 16px;border-bottom:1px solid rgba(33,220,255,.14);background:linear-gradient(90deg,rgba(8,34,58,.8),rgba(4,17,31,.35))}
      #ownerModal .owner-card-title{display:flex;align-items:center;gap:10px;min-width:0}
      #ownerModal .owner-avatar{width:38px;height:38px;display:grid;place-items:center;border-radius:10px;border:1px solid rgba(33,220,255,.4);background:rgba(33,220,255,.07);color:#42e5ff;font-weight:950;box-shadow:inset 0 0 12px rgba(33,220,255,.06)}
      #ownerModal .owner-card h3{margin:0;color:#f4faff;font-size:1rem}
      #ownerModal .owner-meta{display:flex;flex-wrap:wrap;gap:5px;margin-top:5px}
      #ownerModal .owner-chip{display:inline-flex;padding:3px 7px;border-radius:999px;border:1px solid rgba(33,220,255,.2);background:rgba(33,220,255,.05);color:#b8dff5;font-size:.66rem;font-weight:800}
      #ownerModal .owner-chip.buddy{border-color:rgba(41,239,173,.28);background:rgba(41,239,173,.05);color:#a9f6d8}
      #ownerModal .owner-card-body{display:grid;grid-template-columns:1fr 1fr;gap:10px;padding:12px 14px 13px 16px}
      #ownerModal .owner-job{position:relative;min-width:0;padding:11px;border:1px solid rgba(33,220,255,.16);border-radius:10px;background:rgba(3,17,31,.84)}
      #ownerModal .owner-job.cm{border-color:rgba(33,220,255,.24)}
      #ownerModal .owner-job.pm{border-color:rgba(255,215,102,.24)}
      #ownerModal .owner-job-head{display:flex;align-items:center;justify-content:space-between;gap:7px;margin-bottom:8px}
      #ownerModal .owner-job-title{display:flex;align-items:center;gap:7px;font-size:.82rem;font-weight:950;color:#f3f9ff}
      #ownerModal .owner-job-title::before{content:"";width:7px;height:7px;border-radius:50%;background:#21dcff;box-shadow:0 0 8px rgba(33,220,255,.5)}
      #ownerModal .owner-job.pm .owner-job-title::before{background:#ffd766;box-shadow:0 0 8px rgba(255,215,102,.45)}
      #ownerModal .owner-job ul{margin:0;padding-left:18px;color:#c9ddec;font-size:.76rem;line-height:1.58}
      #ownerModal .owner-job li+li{margin-top:2px}
      #ownerModal .owner-standby{margin-top:8px;padding:7px 8px;border:1px dashed rgba(255,215,102,.28);border-radius:8px;background:rgba(255,215,102,.045);color:#ffe5a0;font-size:.7rem;font-weight:750}
      #ownerModal .owner-card-actions{display:flex;justify-content:flex-end;gap:7px;padding:0 14px 13px 16px;flex-wrap:wrap}
      #ownerModal .owner-action{min-height:31px!important;padding:0 10px!important;border-radius:8px!important;font-size:.7rem!important}
      @keyframes ownerPakScan{to{left:112%}}
      @media(max-width:980px){#ownerModal .owner-contacts{grid-template-columns:repeat(2,minmax(0,1fr))}#ownerModal #ownerList{grid-template-columns:1fr!important}}
      @media(max-width:620px){#ownerModal .owner-contacts{grid-template-columns:1fr}#ownerModal .owner-card-body{grid-template-columns:1fr}#ownerModal .owner-hero{padding:12px}#ownerModal .owner-card-head{padding:11px 11px 10px 13px}#ownerModal .owner-card-body{padding:10px 11px 11px 13px}#ownerModal .owner-card-actions{padding:0 11px 11px 13px}.owner-modal{padding:12px!important}}
      @media(prefers-reduced-motion:reduce){#ownerModal .owner-hero::after{animation:none}}
    `;
    document.head.appendChild(style);

    const contacts=[
      {name:'ธีรวีร์',role:'หลัก',phone:'061-467-7711',email:'teerawees@pccth.com'},
      {name:'ธนโชติ',role:'สำรอง',phone:'082-135-8409',email:'thanachotk@pccth.com'},
      {name:'ปิติ',role:'หลัก',phone:'086-603-3774',email:'petis@pccth.com'},
      {name:'สุขเกษม',role:'สำรอง',phone:'087-328-5540',email:'sukkasemn@pccth.com'}
    ];
    const owners=[
      {name:'ธีรวีร์',backup:'ธนโชติ',buddy:'',cm:['CM ส่วนกลางในเวลางานทั้งหมด','กรมสรรพากร','ทท.','ศูนย์นนท์','สำนักงบ','Tipco','อาคารจอดรถ','อาคารที่พัก'],standby:'CM นอกเวลางานตามเวร Standby',pm:['กองเทคโนโลยีสารสนเทศ 5','อาคารกรมสรรพากร 10-18','สำนักงบประมาณ','ดูแล Store เมืองทอง','Web LAN online','Server ทุกระบบงาน']},
      {name:'ธนโชติ',backup:'ธีรวีร์',buddy:'',cm:['CM ทั้ง 1-12 ภาค, กทม. และจังหวัด','ในเวลางานทั้งหมด'],standby:'CM นอกเวลางานตามเวร Standby',pm:['กองเทคโนโลยีสารสนเทศ 6','อาคารที่พัก','อาคารลานจอดรถ','อาคารกรมสรรพากร 19-27','ดูแลอุปกรณ์ กบภ.','ดูแล Storeroom 209','Web Upload และ UAT','Web ตรวจรับงาน','Web 118 + Database']},
      {name:'สุขเกษม',backup:'ปิติ',buddy:'ธีรวีร์',cm:['CM สส.ต่างจังหวัดทั่วประเทศ','สส.ในภาค 1, 3, 5, 7, 9, 11'],standby:'',pm:['กองเทคโนโลยีสารสนเทศ 1, 2, 7','ศูนย์คอมพิวเตอร์ จ.นนทบุรี','สนามบินน้ำ','อาคารกรมสรรพากร 1-5','ภาค 1','ภาค 3','ภาค 5','ภาค 7','ภาค 9','ภาค 11']},
      {name:'ปิติ',backup:'สุขเกษม',buddy:'ธนโชติ',cm:['CM สส.ต่างจังหวัดทั่วประเทศ','สส.ในภาค 2, 4, 6, 8, 10, 12'],standby:'',pm:['กองเทคโนโลยีสารสนเทศ 3, 4','ศูนย์คอมพิวเตอร์ จ.นนทบุรี','สนามบินน้ำ','อาคารกรมสรรพากร 6-9','กรมสรรพากร อาคาร Tipco','ภาค 2','ภาค 4','ภาค 6','ภาค 8','ภาค 10','ภาค 12']}
    ];

    const esc=s=>String(s).replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
    const lines=(title,items,note='')=>`${title}\n${items.map(x=>'- '+x).join('\n')}${note?`\n***${note}***`:''}`;
    const ownerText=o=>[`${o.name} (หลัก)`,`${o.backup} (สำรอง)`,o.buddy?`Buddy ${o.buddy}`:'','',lines('งาน CM',o.cm,o.standby),'',lines('งาน PM',o.pm)].filter((x,i,a)=>!(x===''&&a[i-1]==='')).join('\n');
    const copy=async text=>{try{await navigator.clipboard.writeText(text)}catch{const ta=document.createElement('textarea');ta.value=text;ta.style.position='fixed';ta.style.opacity='0';document.body.appendChild(ta);ta.select();document.execCommand('copy');ta.remove()}const toast=document.getElementById('toast');if(toast){toast.textContent='คัดลอกสำเร็จ';toast.classList.add('show');clearTimeout(toast._ownerT);toast._ownerT=setTimeout(()=>toast.classList.remove('show'),1900)}};

    const modalTop=modal.querySelector('.modal-top');
    const title=modalTop?.querySelector('h2');
    const sub=modalTop?.querySelector('.sub');
    if(title)title.textContent='คนดูแลแต่ละ Pak';
    if(sub)sub.textContent='Site ที่ดูแลรับผิดชอบงาน MA Network';

    let wrap=document.getElementById('ownerPakWrap');
    if(!wrap){wrap=document.createElement('div');wrap.id='ownerPakWrap';wrap.className='owner-pak-wrap';list.parentNode.insertBefore(wrap,list);wrap.appendChild(list)}
    let hero=document.getElementById('ownerPakHero');
    if(!hero){hero=document.createElement('section');hero.id='ownerPakHero';hero.className='owner-hero';wrap.insertBefore(hero,list)}
    hero.innerHTML=`<div class="owner-hero-top"><div><h3>Site ที่ดูแลรับผิดชอบงาน MA Network</h3><p>ข้อมูลผู้รับผิดชอบหลัก / สำรอง และขอบเขตงาน CM / PM</p></div><div class="owner-update">Owner Update 2026 · แก้ไขเมื่อ 3 ก.ค.2569</div></div><div class="owner-contacts">${contacts.map(c=>`<article class="owner-contact"><div class="owner-contact-head"><span class="owner-contact-name">${esc(c.name)}</span><span class="owner-role ${c.role==='สำรอง'?'backup':''}">${esc(c.role)}</span></div><div class="owner-contact-line"><strong>${esc(c.phone)}</strong><button class="btn owner-copy-mini" data-owner-copy="${esc(c.phone)}" type="button">Copy</button></div><div class="owner-contact-line"><strong>${esc(c.email)}</strong><button class="btn owner-copy-mini" data-owner-copy="${esc(c.email)}" type="button">Copy</button></div></article>`).join('')}</div>`;

    list.innerHTML=owners.map((o,i)=>`<article class="owner-card"><div class="owner-card-head"><div class="owner-card-title"><div class="owner-avatar">${i+1}</div><div><h3>${esc(o.name)}</h3><div class="owner-meta"><span class="owner-chip">หลัก</span><span class="owner-chip">สำรอง ${esc(o.backup)}</span>${o.buddy?`<span class="owner-chip buddy">Buddy ${esc(o.buddy)}</span>`:''}</div></div></div><button class="btn owner-action" data-owner-all="${i}" type="button">Copy ทั้งหมด</button></div><div class="owner-card-body"><section class="owner-job cm"><div class="owner-job-head"><div class="owner-job-title">งาน CM</div><button class="btn owner-copy-mini" data-owner-cm="${i}" type="button">Copy</button></div><ul>${o.cm.map(x=>`<li>${esc(x)}</li>`).join('')}</ul>${o.standby?`<div class="owner-standby">${esc(o.standby)}</div>`:''}</section><section class="owner-job pm"><div class="owner-job-head"><div class="owner-job-title">งาน PM</div><button class="btn owner-copy-mini" data-owner-pm="${i}" type="button">Copy</button></div><ul>${o.pm.map(x=>`<li>${esc(x)}</li>`).join('')}</ul></section></div><div class="owner-card-actions"><span class="owner-chip">${esc(o.name)} (หลัก)</span><span class="owner-chip">${esc(o.backup)} (สำรอง)</span>${o.buddy?`<span class="owner-chip buddy">Buddy ${esc(o.buddy)}</span>`:''}</div></article>`).join('');

    modal.querySelectorAll('[data-owner-copy]').forEach(btn=>btn.addEventListener('click',()=>copy(btn.dataset.ownerCopy||'')));
    modal.querySelectorAll('[data-owner-cm]').forEach(btn=>btn.addEventListener('click',()=>{const o=owners[+btn.dataset.ownerCm];copy(lines('งาน CM',o.cm,o.standby))}));
    modal.querySelectorAll('[data-owner-pm]').forEach(btn=>btn.addEventListener('click',()=>{const o=owners[+btn.dataset.ownerPm];copy(lines('งาน PM',o.pm))}));
    modal.querySelectorAll('[data-owner-all]').forEach(btn=>btn.addEventListener('click',()=>copy(ownerText(owners[+btn.dataset.ownerAll]))));
  });
})();