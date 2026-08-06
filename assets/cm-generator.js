(()=>{
  "use strict";
  if(document.getElementById("cmMessageModal"))return;

  const $=selector=>document.querySelector(selector);
  const style=document.createElement("style");
  style.textContent=`
    .cm-modal{width:min(1080px,100%)}
    .cm-layout{display:grid;gap:14px}
    .cm-unit-row{display:grid;grid-template-columns:minmax(150px,210px) 1fr;gap:10px}
    .cm-field-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px}
    .cm-field-full{grid-column:1/-1}
    .cm-output{min-height:105px}
    .cm-actions{display:flex;align-items:center;justify-content:space-between;gap:10px;flex-wrap:wrap}
    .cm-actions-left,.cm-actions-right{display:flex;gap:8px;flex-wrap:wrap}
    .cm-example{padding:11px 13px;border:1px solid rgba(84,177,255,.22);border-radius:12px;background:rgba(3,15,32,.72);color:var(--muted);font-size:.82rem;line-height:1.55}
    @media(max-width:720px){.cm-unit-row,.cm-field-grid{grid-template-columns:1fr}.cm-actions,.cm-actions-left,.cm-actions-right{flex-direction:column}.cm-actions .btn{width:100%}}
  `;
  document.head.appendChild(style);

  const quickTitle=document.getElementById("quickToolsTitle");
  const quickGrid=quickTitle?.closest("section")?.querySelector(".quick-grid");
  if(quickGrid){
    const button=document.createElement("button");
    button.className="work-link";
    button.id="openCmMessageModal";
    button.type="button";
    button.innerHTML='<span class="link-icon">CM</span><span class="link-copy"><span class="link-name">สร้างข้อความ CM</span><span class="link-url">หน่วยงาน · จังหวัด · อุปกรณ์ · จำนวน · รุ่น · อาการ</span></span><span class="link-arrow">›</span>';
    quickGrid.appendChild(button);
  }

  const modal=document.createElement("div");
  modal.className="modal-bg";
  modal.id="cmMessageModal";
  modal.innerHTML=`
    <div class="modal glass cm-modal">
      <div class="modal-top">
        <div><h2>สร้างข้อความ CM</h2><p class="sub">กรอกข้อมูลแยกช่อง แล้วระบบจะประกอบข้อความพร้อม Copy</p></div>
        <button class="btn" id="closeCmMessageModal" type="button">ปิด</button>
      </div>
      <div class="cm-layout">
        <div class="cm-unit-row">
          <label><span class="label">1) ประเภทหน่วยงาน</span><select class="input" id="cmUnitPrefix"><option value="สส.">สส.</option><option value="สท.">สท.</option><option value="สภ.">สภ.</option></select></label>
          <label><span class="label">1) ชื่อหน่วยงาน</span><input class="input" id="cmOffice" placeholder="แม่จัน"></label>
        </div>
        <div class="cm-field-grid">
          <label><span class="label">2) จังหวัด</span><input class="input" id="cmProvince" placeholder="เชียงราย"></label>
          <label><span class="label">3) สิ่งที่เสีย</span><input class="input" id="cmItem" placeholder="LAN"></label>
          <label><span class="label">4) จำนวนจุด</span><input class="input" id="cmQuantity" type="number" min="1" step="1" value="2" inputmode="numeric"></label>
          <label><span class="label">5) รุ่น / หมายเลขจุด</span><input class="input" id="cmModels" placeholder="F3-0023, F3-U022"></label>
          <label class="cm-field-full"><span class="label">6) อาการเสีย</span><input class="input" id="cmSymptom" value="ไม่สามารถใช้งานได้" placeholder="ไม่สามารถใช้งานได้"></label>
        </div>
        <div class="cm-example">รูปแบบผลลัพธ์: CM_หน่วยงาน จ.จังหวัด_สิ่งที่เสีย ขำรุด จำนวน X จุด (รุ่น/หมายเลขจุด) อาการเสีย ...</div>
        <div><span class="label">ผลลัพธ์</span><pre class="preview cm-output" id="cmMessageOutput"></pre></div>
        <div class="cm-actions">
          <div class="cm-actions-left"><button class="btn" id="cmFillExample" type="button">ใส่ตัวอย่าง</button><button class="btn red" id="cmClear" type="button">ล้าง</button></div>
          <div class="cm-actions-right"><button class="btn gold" id="cmCopy" type="button">Copy ข้อความ</button></div>
        </div>
      </div>
    </div>`;
  document.body.appendChild(modal);

  const ids=["cmUnitPrefix","cmOffice","cmProvince","cmItem","cmQuantity","cmModels","cmSymptom"];
  const value=id=>(document.getElementById(id)?.value||"").trim();
  const formatModels=text=>text.split(",").map(part=>part.trim()).filter(Boolean).join(" , ");
  const build=()=>{
    const prefix=value("cmUnitPrefix"),office=value("cmOffice"),province=value("cmProvince"),item=value("cmItem"),quantity=value("cmQuantity"),models=formatModels(value("cmModels")),symptom=value("cmSymptom");
    const result=`CM_${prefix}${office} จ.${province}_${item} ขำรุด  จำนวน ${quantity} จุด (${models}) อาการเสีย ${symptom}`;
    $("#cmMessageOutput").textContent=result;
    return {result,complete:Boolean(prefix&&office&&province&&item&&quantity&&models&&symptom)};
  };
  const toast=text=>{
    const el=$("#toast");
    if(!el)return;
    el.textContent=text;el.classList.add("show");clearTimeout(el._t);el._t=setTimeout(()=>el.classList.remove("show"),2200);
  };
  const copyText=async text=>{
    try{await navigator.clipboard.writeText(text)}catch{
      const ta=document.createElement("textarea");ta.value=text;document.body.appendChild(ta);ta.select();document.execCommand("copy");ta.remove();
    }
    try{
      const key="linkwork.copy.v1",d=new Date(),day=`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`;
      const current=JSON.parse(localStorage.getItem(key)||"{}");
      const count=current.date===day?(current.count||0)+1:1;
      localStorage.setItem(key,JSON.stringify({date:day,count}));
      const counter=$("#copyCount");if(counter)counter.textContent=count;
    }catch{}
    toast("คัดลอกสำเร็จ");
  };

  ids.forEach(id=>document.getElementById(id)?.addEventListener(id==="cmUnitPrefix"?"change":"input",build));
  $("#openCmMessageModal")?.addEventListener("click",()=>{modal.classList.add("open");build();setTimeout(()=>$("#cmOffice")?.focus(),50)});
  $("#closeCmMessageModal")?.addEventListener("click",()=>modal.classList.remove("open"));
  modal.addEventListener("click",event=>{if(event.target===modal)modal.classList.remove("open")});
  document.addEventListener("keydown",event=>{if(event.key==="Escape")modal.classList.remove("open")});
  $("#cmFillExample")?.addEventListener("click",()=>{
    $("#cmUnitPrefix").value="สส.";$("#cmOffice").value="แม่จัน";$("#cmProvince").value="เชียงราย";$("#cmItem").value="LAN";$("#cmQuantity").value="2";$("#cmModels").value="F3-0023, F3-U022";$("#cmSymptom").value="ไม่สามารถใช้งานได้";build();
  });
  $("#cmClear")?.addEventListener("click",()=>{
    $("#cmUnitPrefix").value="สส.";["cmOffice","cmProvince","cmItem","cmModels"].forEach(id=>document.getElementById(id).value="");$("#cmQuantity").value="1";$("#cmSymptom").value="";build();
  });
  $("#cmCopy")?.addEventListener("click",()=>{const data=build();if(!data.complete){toast("กรุณากรอกข้อมูลให้ครบ");return}copyText(data.result)});
  build();
})();
