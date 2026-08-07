(()=>{
  "use strict";
  if(document.getElementById("cmMessageModal"))return;

  const $=selector=>document.querySelector(selector);
  const provinces=[
    "กรุงเทพมหานคร","กระบี่","กาญจนบุรี","กาฬสินธุ์","กำแพงเพชร","ขอนแก่น","จันทบุรี","ฉะเชิงเทรา","ชลบุรี","ชัยนาท","ชัยภูมิ","ชุมพร","เชียงราย","เชียงใหม่","ตรัง","ตราด","ตาก","นครนายก","นครปฐม","นครพนม","นครราชสีมา","นครศรีธรรมราช","นครสวรรค์","นนทบุรี","นราธิวาส","น่าน","บึงกาฬ","บุรีรัมย์","ปทุมธานี","ประจวบคีรีขันธ์","ปราจีนบุรี","ปัตตานี","พระนครศรีอยุธยา","พะเยา","พังงา","พัทลุง","พิจิตร","พิษณุโลก","เพชรบุรี","เพชรบูรณ์","แพร่","ภูเก็ต","มหาสารคาม","มุกดาหาร","แม่ฮ่องสอน","ยโสธร","ยะลา","ร้อยเอ็ด","ระนอง","ระยอง","ราชบุรี","ลพบุรี","ลำปาง","ลำพูน","เลย","ศรีสะเกษ","สกลนคร","สงขลา","สตูล","สมุทรปราการ","สมุทรสงคราม","สมุทรสาคร","สระแก้ว","สระบุรี","สิงห์บุรี","สุโขทัย","สุพรรณบุรี","สุราษฎร์ธานี","สุรินทร์","หนองคาย","หนองบัวลำภู","อ่างทอง","อำนาจเจริญ","อุดรธานี","อุตรดิตถ์","อุทัยธานี","อุบลราชธานี"
  ];

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
    .cm-switch-row{display:flex;align-items:center;justify-content:space-between;gap:10px;margin-bottom:7px}
    .cm-switch{display:inline-flex;align-items:center;gap:8px;cursor:pointer;user-select:none;font-size:.82rem;color:var(--muted)}
    .cm-switch input{position:absolute;opacity:0;pointer-events:none}
    .cm-switch-ui{width:42px;height:23px;border-radius:999px;border:1px solid rgba(44,160,255,.5);background:#071a30;position:relative;transition:.2s}
    .cm-switch-ui::after{content:"";position:absolute;width:17px;height:17px;left:2px;top:2px;border-radius:50%;background:#7d9ab5;transition:.2s;box-shadow:0 0 10px rgba(0,0,0,.35)}
    .cm-switch input:checked + .cm-switch-ui{background:rgba(0,190,255,.18);border-color:#18d7ff;box-shadow:0 0 13px rgba(0,194,255,.13)}
    .cm-switch input:checked + .cm-switch-ui::after{transform:translateX(19px);background:#39e4ff}
    .cm-disabled{opacity:.45;filter:saturate(.5)}
    @media(max-width:720px){.cm-unit-row,.cm-field-grid{grid-template-columns:1fr}.cm-actions,.cm-actions-left,.cm-actions-right{flex-direction:column}.cm-actions .btn{width:100%}.cm-switch-row{align-items:flex-start;flex-direction:column}}
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
          <label><span class="label">2) จังหวัด</span><input class="input" id="cmProvince" list="cmProvinceList" autocomplete="off" placeholder="พิมพ์ค้นหา หรือเลือกจังหวัด"><datalist id="cmProvinceList">${provinces.map(p=>`<option value="${p}"></option>`).join("")}</datalist></label>
          <label><span class="label">3) สิ่งที่เสีย</span><input class="input" id="cmItem" placeholder="LAN"></label>
          <label id="cmQuantityWrap">
            <span class="cm-switch-row"><span class="label" style="margin:0">4) จำนวนจุด</span><span class="cm-switch"><span>แสดงจำนวนจุด</span><input id="cmQuantityEnabled" type="checkbox" checked><span class="cm-switch-ui"></span></span></span>
            <input class="input" id="cmQuantity" type="number" min="1" step="1" value="2" inputmode="numeric">
          </label>
          <label id="cmModelsWrap">
            <span class="cm-switch-row"><span class="label" style="margin:0">5) รุ่น / หมายเลขจุด</span><span class="cm-switch"><span>แสดงรุ่น / หมายเลขจุด</span><input id="cmModelsEnabled" type="checkbox" checked><span class="cm-switch-ui"></span></span></span>
            <input class="input" id="cmModels" placeholder="F3-0023, F3-U022">
          </label>
          <label class="cm-field-full"><span class="label">6) อาการเสีย</span><input class="input" id="cmSymptom" value="ไม่สามารถใช้งานได้" placeholder="ไม่สามารถใช้งานได้"></label>
        </div>
        <div class="cm-example">รูปแบบผลลัพธ์: CM_หน่วยงาน จ.จังหวัด_สิ่งที่เสีย ชำรุด [จำนวน X จุด] [(รุ่น/หมายเลขจุด)] อาการเสีย ...</div>
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
  const quantityEnabled=()=>Boolean($("#cmQuantityEnabled")?.checked);
  const modelsEnabled=()=>Boolean($("#cmModelsEnabled")?.checked);
  const syncOptionalState=()=>{
    const qtyOn=quantityEnabled(), modelsOn=modelsEnabled();
    $("#cmQuantity").disabled=!qtyOn;
    $("#cmQuantityWrap").classList.toggle("cm-disabled",!qtyOn);
    $("#cmModels").disabled=!modelsOn;
    $("#cmModelsWrap").classList.toggle("cm-disabled",!modelsOn);
  };
  const validProvince=province=>provinces.includes(province);
  const build=()=>{
    syncOptionalState();
    const prefix=value("cmUnitPrefix"),office=value("cmOffice"),province=value("cmProvince"),item=value("cmItem"),quantity=value("cmQuantity"),models=formatModels(value("cmModels")),symptom=value("cmSymptom");
    const qtyPart=quantityEnabled()?`  จำนวน ${quantity} จุด`:"";
    const modelsPart=modelsEnabled()?` (${models})`:"";
    const result=`CM_${prefix}${office} จ.${province}_${item} ชำรุด${qtyPart}${modelsPart} อาการเสีย ${symptom}`;
    $("#cmMessageOutput").textContent=result;
    const quantityComplete=!quantityEnabled()||Boolean(quantity);
    const modelsComplete=!modelsEnabled()||Boolean(models);
    return {result,complete:Boolean(prefix&&office&&validProvince(province)&&item&&quantityComplete&&modelsComplete&&symptom)};
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
  $("#cmQuantityEnabled")?.addEventListener("change",build);
  $("#cmModelsEnabled")?.addEventListener("change",build);
  $("#openCmMessageModal")?.addEventListener("click",()=>{modal.classList.add("open");build();setTimeout(()=>$("#cmOffice")?.focus(),50)});
  $("#closeCmMessageModal")?.addEventListener("click",()=>modal.classList.remove("open"));
  modal.addEventListener("click",event=>{if(event.target===modal)modal.classList.remove("open")});
  document.addEventListener("keydown",event=>{if(event.key==="Escape")modal.classList.remove("open")});
  $("#cmFillExample")?.addEventListener("click",()=>{
    $("#cmUnitPrefix").value="สส.";$("#cmOffice").value="แม่จัน";$("#cmProvince").value="เชียงราย";$("#cmItem").value="LAN";$("#cmQuantityEnabled").checked=true;$("#cmQuantity").value="2";$("#cmModelsEnabled").checked=true;$("#cmModels").value="F3-0023, F3-U022";$("#cmSymptom").value="ไม่สามารถใช้งานได้";build();
  });
  $("#cmClear")?.addEventListener("click",()=>{
    $("#cmUnitPrefix").value="สส.";["cmOffice","cmProvince","cmItem","cmModels"].forEach(id=>document.getElementById(id).value="");$("#cmQuantityEnabled").checked=true;$("#cmQuantity").value="1";$("#cmModelsEnabled").checked=true;$("#cmSymptom").value="";build();
  });
  $("#cmCopy")?.addEventListener("click",()=>{
    const data=build();
    if(!validProvince(value("cmProvince"))){toast("กรุณาเลือกจังหวัดจากรายการ 77 จังหวัด");return}
    if(!data.complete){toast("กรุณากรอกข้อมูลให้ครบ");return}
    copyText(data.result);
  });
  build();
})();
