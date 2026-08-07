(()=>{
  "use strict";
  const init=()=>{
    const cause=document.getElementById("cause");
    const customTitle=document.getElementById("customTitle");
    if(!cause||!customTitle)return false;

    const normalCard=cause.closest("article.card")||cause.closest(".card");
    const customCard=customTitle.closest("article.card")||customTitle.closest(".card");
    if(!normalCard||!customCard)return false;

    const normalHeading=normalCard.querySelector(".head h2");
    if(normalHeading)normalHeading.textContent="Log Normal";
    normalCard.dataset.search=((normalCard.dataset.search||"")+" log normal normal log").trim();

    if(!document.getElementById("toggleCustomLog")){
      const style=document.createElement("style");
      style.textContent=`
        .custom-log-collapsed{display:none!important}
        .log-normal-tools{display:flex;align-items:center;gap:8px;margin-left:auto}
        .custom-log-plus{width:34px!important;height:34px!important;min-width:34px!important;min-height:34px!important;padding:0!important;border-radius:9px!important;display:grid!important;place-items:center!important;font-size:1.25rem!important;line-height:1!important;color:#35e3ff!important;border:1px solid rgba(27,211,255,.72)!important;background:rgba(0,128,205,.10)!important;box-shadow:0 0 15px rgba(0,190,255,.10)!important}
        .custom-log-plus:hover{box-shadow:0 0 20px rgba(0,208,255,.24)!important}
      `;
      document.head.appendChild(style);

      customCard.classList.add("custom-log-collapsed");
      const head=normalCard.querySelector(".head");
      if(head){
        const tools=document.createElement("div");
        tools.className="log-normal-tools";
        const plus=document.createElement("button");
        plus.id="toggleCustomLog";
        plus.className="btn custom-log-plus";
        plus.type="button";
        plus.textContent="+";
        plus.title="เพิ่ม Custom Log";
        plus.setAttribute("aria-label","เพิ่ม Custom Log");
        plus.setAttribute("aria-expanded","false");
        tools.appendChild(plus);
        head.appendChild(tools);

        plus.addEventListener("click",()=>{
          const hidden=customCard.classList.toggle("custom-log-collapsed");
          plus.textContent=hidden?"+":"×";
          plus.title=hidden?"เพิ่ม Custom Log":"ซ่อน Custom Log";
          plus.setAttribute("aria-label",plus.title);
          plus.setAttribute("aria-expanded",String(!hidden));
          if(!hidden){
            customCard.scrollIntoView({behavior:"smooth",block:"center"});
            setTimeout(()=>customTitle.focus(),250);
          }
        });
      }
    }
    return true;
  };

  if(init())return;
  let tries=0;
  const timer=setInterval(()=>{
    tries++;
    if(init()||tries>40)clearInterval(timer);
  },100);
})();
