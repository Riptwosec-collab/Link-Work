(() => {
  "use strict";

  const scriptData = Object.freeze({
    chrome: "JHVybHMgPSBAKAoiaHR0cHM6Ly9ub2Nvcmlvbi5yZC5nby50aC9hcHBzL3BsYXRmb3JtL2Rhc2hib2FyZC81NCIsCiJodHRwczovL2Rjbm9jd2hkLnJkLmdvLnRoL2hlbHBkZXNrL1dlYk9iamVjdHMvSGVscGRlc2sud29hL3dhL1RpY2tldEFjdGlvbnMvdmlldz90YWI9Z3JvdXAiLAoiaHR0cHM6Ly9hY2Nlc3MubGluZS5tZS9vYXV0aDIvdjIuMS9sb2dpbj9yZXR1cm5Vcmk9JTJGb2F1dGgyJTJGdjIuMSUyRmF1dGhvcml6ZSUyRmNvbnNlbnQlM0ZyZXNwb25zZV90eXBlJTNEY29kZSUyNmNsaWVudF9pZCUzRDE1NzY3NzU2NDQlMjZyZWRpcmVjdF91cmklM0RodHRwcyUyNTNBJTI1MkYlMjUyRmFjY291bnQubGluZS5iaXolMjUyRmxvZ2luJTI1MkZsaW5lLWNhbGxiYWNrJTI1M0ZyZWRpcmVjdFVyaSUyNTNEaHR0cHMlMjUyNTNBJTI1MjUyRiUyNTI1MkZhY2NvdW50LmxpbmUuYml6JTI1MjUyRm9hdXRoMiUyNTI1MkZjYWxsYmFjayUyNTI1M0ZjbGllbnRfaWQlMjUyNTNEOSUyNTI1MjZjb2RlX2NoYWxsZW5nZSUyNTI1M0RaVDBTczNHMFY5cmgwRzUxUzFHUGVSMWdMX1hCalMzcEt4QjRSMG9qVzQwJTI1MjUyNmNvZGVfY2hhbGxlbmdlX21ldGhvZCUyNTI1M0RTMjU2JTI1MjUyNnJlZGlyZWN0X3VyaSUyNTI1M0RodHRwcyUyNTI1MjUzQSUyNTI1MjUyRiUyNTI1MjUyRmNoYXQubGluZS5iaXolMjUyNTI1MkZvYXV0aDIlMjUyNTI1MkZsaW5lYml6JTI1MjUyNTJGY2FsbGJhY2slMjUyNTI2cmVzcG9uc2VfdHlwZSUyNTI1M0Rjb2RlJTI1MjUyNnN0YXRlJTI1MjUzRDFpQUpUaExFSnJIa3NMLVhkajFDNFZVLW9WdVhNNFNxTk5VYlFkWlVwX2MlMjUyNmRpc2FibGVMaW5lQXV0b0xvZ2luJTI1M0RmYWxzZSUyNnNjb3BlJTNEcHJvZmlsZSUyNnN0YXRlJTNEbFZYQ1BYc1VtR1VFc1FYM3RBMFpVMk9WTUFlRkpYYSZsb2dpbkNoYW5uZWxJZD0xNTc2Nzc1NjQ0JmxvZ2luU3RhdGU9bnJER3d0UVhnTzg0VWhHSDB2eUFrRSMvIiwKImh0dHA6Ly8xMC4zLjEwLjExOC9hcHA2OC0xL2FkbWluL2luZGV4LnBocCIsCiJodHRwczovL3d3dy53aG9pcy5jb20vd2hvaXMvIiwKImh0dHBzOi8vd29ya2QuZ28udGgvYXV0aC9sb2dpbiIsCiJodHRwczovL25ldHdvcmsucmQuZ28udGgvdm9pcC9ib29rLXZvaXAuaHRtIgopCgokY2hyb21lID0gQCgKIiRlbnY6UHJvZ3JhbUZpbGVzXEdvb2dsZVxDaHJvbWVcQXBwbGljYXRpb25cY2hyb21lLmV4ZSIsCiIke2VudjpQcm9ncmFtRmlsZXMoeDg2KX1cR29vZ2xlXENocm9tZVxBcHBsaWNhdGlvblxjaHJvbWUuZXhlIiwKIiRlbnY6TE9DQUxBUFBEQVRBXEdvb2dsZVxDaHJvbWVcQXBwbGljYXRpb25cY2hyb21lLmV4ZSIKKSB8IFdoZXJlLU9iamVjdCB7IFRlc3QtUGF0aCAkXyB9IHwgU2VsZWN0LU9iamVjdCAtRmlyc3QgMQoKaWYgKCRjaHJvbWUpIHsKICAgIFN0YXJ0LVByb2Nlc3MgJGNocm9tZSAtQXJndW1lbnRMaXN0IChAKCItLW5ldy13aW5kb3ciKSArICR1cmxzKQp9IGVsc2UgewogICAgV3JpdGUtSG9zdCAi4LmE4Lih4LmI4Lie4LiaIEdvb2dsZSBDaHJvbWUiIC1Gb3JlZ3JvdW5kQ29sb3IgUmVkCn0=",
    edge: "JHVybHMgPSBAKAoiaHR0cHM6Ly9ub2Nvcmlvbi5yZC5nby50aC9hcHBzL3BsYXRmb3JtL2Rhc2hib2FyZC81NCIsCiJodHRwczovL2Rjbm9jd2hkLnJkLmdvLnRoL2hlbHBkZXNrL1dlYk9iamVjdHMvSGVscGRlc2sud29hL3dhL1RpY2tldEFjdGlvbnMvdmlldz90YWI9Z3JvdXAiLAoiaHR0cHM6Ly9hY2Nlc3MubGluZS5tZS9vYXV0aDIvdjIuMS9sb2dpbj9yZXR1cm5Vcmk9JTJGb2F1dGgyJTJGdjIuMSUyRmF1dGhvcml6ZSUyRmNvbnNlbnQlM0ZyZXNwb25zZV90eXBlJTNEY29kZSUyNmNsaWVudF9pZCUzRDE1NzY3NzU2NDQlMjZyZWRpcmVjdF91cmklM0RodHRwcyUyNTNBJTI1MkYlMjUyRmFjY291bnQubGluZS5iaXolMjUyRmxvZ2luJTI1MkZsaW5lLWNhbGxiYWNrJTI1M0ZyZWRpcmVjdFVyaSUyNTNEaHR0cHMlMjUyNTNBJTI1MjUyRiUyNTI1MkZhY2NvdW50LmxpbmUuYml6JTI1MjUyRm9hdXRoMiUyNTI1MkZjYWxsYmFjayUyNTI1M0ZjbGllbnRfaWQlMjUyNTNEOSUyNTI1MjZjb2RlX2NoYWxsZW5nZSUyNTI1M0RaVDBTczNHMFY5cmgwRzUxUzFHUGVSMWdMX1hCalMzcEt4QjRSMG9qVzQwJTI1MjUyNmNvZGVfY2hhbGxlbmdlX21ldGhvZCUyNTI1M0RTMjU2JTI1MjUyNnJlZGlyZWN0X3VyaSUyNTI1M0RodHRwcyUyNTI1MjUzQSUyNTI1MjUyRiUyNTI1MjUyRmNoYXQubGluZS5iaXolMjUyNTI1MkZvYXV0aDIlMjUyNTI1MkZsaW5lYml6JTI1MjUyNTJGY2FsbGJhY2slMjUyNTI2cmVzcG9uc2VfdHlwZSUyNTI1M0Rjb2RlJTI1MjUyNnN0YXRlJTI1MjUzRDFpQUpUaExFSnJIa3NMLVhkajFDNFZVLW9WdVhNNFNxTk5VYlFkWlVwX2MlMjUyNmRpc2FibGVMaW5lQXV0b0xvZ2luJTI1M0RmYWxzZSUyNnNjb3BlJTNEcHJvZmlsZSUyNnN0YXRlJTNEbFZYQ1BYc1VtR1VFc1FYM3RBMFpVMk9WTUFlRkpYYSZsb2dpbkNoYW5uZWxJZD0xNTc2Nzc1NjQ0JmxvZ2luU3RhdGU9bnJER3d0UVhnTzg0VWhHSDB2eUFrRSMvIiwKImh0dHA6Ly8xMC4zLjEwLjExOC9hcHA2OC0xL2FkbWluL2luZGV4LnBocCIsCiJodHRwczovL3d3dy53aG9pcy5jb20vd2hvaXMvIiwKImh0dHBzOi8vd29ya2QuZ28udGgvYXV0aC9sb2dpbiIsCiJodHRwczovL25ldHdvcmsucmQuZ28udGgvdm9pcC9ib29rLXZvaXAuaHRtIgopCgokZWRnZSA9IEAoCiIke2VudjpQcm9ncmFtRmlsZXMoeDg2KX1cTWljcm9zb2Z0XEVkZ2VcQXBwbGljYXRpb25cbXNlZGdlLmV4ZSIsCiIkZW52OlByb2dyYW1GaWxlc1xNaWNyb3NvZnRcRWRnZVxBcHBsaWNhdGlvblxtc2VkZ2UuZXhlIiwKIiRlbnY6TE9DQUxBUFBEQVRBXE1pY3Jvc29mdFxFZGdlXEFwcGxpY2F0aW9uXG1zZWRnZS5leGUiCikgfCBXaGVyZS1PYmplY3QgeyBUZXN0LVBhdGggJF8gfSB8IFNlbGVjdC1PYmplY3QgLUZpcnN0IDEKCmlmICgkZWRnZSkgewogICAgU3RhcnQtUHJvY2VzcyAkZWRnZSAtQXJndW1lbnRMaXN0IChAKCItLW5ldy13aW5kb3ciKSArICR1cmxzKQp9IGVsc2UgewogICAgV3JpdGUtSG9zdCAi4LmE4Lih4LmI4Lie4LiaIE1pY3Jvc29mdCBFZGdlIiAtRm9yZWdyb3VuZENvbG9yIFJlZAp9"
  });

  const buttonsHtml = `
    <button class="btn btn-browser btn-chrome" id="chromeScriptBtn" type="button" aria-label="แสดง PowerShell Script สำหรับเปิดลิงก์ทั้งหมดด้วย Google Chrome">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="3.4"/><path d="M3.8 8h8.2M9.2 20.5l4.1-7.1M20.2 8H12"/></svg>
      Script Chrome
    </button>
    <button class="btn btn-browser btn-edge" id="edgeScriptBtn" type="button" aria-label="แสดง PowerShell Script สำหรับเปิดลิงก์ทั้งหมดด้วย Microsoft Edge">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M20.5 14.5c-1.6 3.8-6.7 6.1-11.1 4.3-3.8-1.5-6.1-5.4-5-9.2C5.5 5.7 9.4 3 13.5 3c3.4 0 6.1 1.7 7.2 4.2-1.6-1.1-3.7-1.5-5.7-.8-2.5.8-4.2 3-4.2 5.6 0 2.8 2.2 5 5 5 2 0 3.8-1 4.7-2.5Z"/><path d="M4.3 11.2c2.3-1.8 5.4-2.2 8.1-1.1"/></svg>
      Script Edge
    </button>
  `;

  const modalHtml = `
    <div class="modal-backdrop" id="scriptModal" aria-hidden="true">
      <div class="modal glass script-modal" role="dialog" aria-modal="true" aria-labelledby="scriptModalTitle" aria-describedby="scriptModalDescription">
        <button class="modal-close" id="scriptModalCloseBtn" type="button" aria-label="ปิดหน้าต่าง PowerShell Script">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="m7 7 10 10M17 7 7 17"/></svg>
        </button>
        <div class="script-modal-head">
          <div class="modal-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="m5 7 4 4-4 4M11 17h8"/><rect x="2.5" y="3.5" width="19" height="17" rx="3"/></svg>
          </div>
          <div>
            <h2 id="scriptModalTitle">PowerShell Script</h2>
            <p id="scriptModalDescription">คัดลอก Script แล้วนำไปวางใน PowerShell เพื่อเปิดลิงก์งานทั้งหมดพร้อมกัน</p>
          </div>
        </div>
        <div class="script-modal-copy" tabindex="0" aria-label="PowerShell Script">
          <pre class="script-code" id="scriptCode"></pre>
        </div>
        <p class="script-modal-note">วิธีใช้: กด “คัดลอก Script” → เปิด Windows PowerShell → วาง Script → กด Enter</p>
        <div class="modal-actions script-modal-actions">
          <span class="script-browser-tag" id="scriptBrowserTag">Browser</span>
          <div class="card-actions" style="margin-top:0">
            <button class="btn" id="scriptModalCancelBtn" type="button">ปิด</button>
            <button class="btn btn-primary" id="copyScriptBtn" type="button">
              <svg class="copy-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><rect x="8" y="8" width="11" height="11" rx="2"/><path d="M16 8V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h3"/></svg>
              <span class="copy-label">คัดลอก Script</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  `;

  const importInput = document.getElementById("importFileInput");
  const toastRegion = document.getElementById("toastRegion");

  if (!importInput || !toastRegion) {
    console.error("Browser Script tools could not find the required NOC Log Center elements.");
    return;
  }

  importInput.insertAdjacentHTML("beforebegin", buttonsHtml);
  toastRegion.insertAdjacentHTML("beforebegin", modalHtml);

  const els = {
    chromeButton: document.getElementById("chromeScriptBtn"),
    edgeButton: document.getElementById("edgeScriptBtn"),
    modal: document.getElementById("scriptModal"),
    title: document.getElementById("scriptModalTitle"),
    description: document.getElementById("scriptModalDescription"),
    browserTag: document.getElementById("scriptBrowserTag"),
    code: document.getElementById("scriptCode"),
    closeButton: document.getElementById("scriptModalCloseBtn"),
    cancelButton: document.getElementById("scriptModalCancelBtn"),
    copyButton: document.getElementById("copyScriptBtn"),
    toastRegion
  };

  let activeScript = "";
  let lastFocusedElement = null;

  function decodeUtf8Base64(value) {
    const binary = atob(value);
    const bytes = Uint8Array.from(binary, (character) => character.charCodeAt(0));
    return new TextDecoder().decode(bytes);
  }

  async function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return;
    }

    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.setAttribute("readonly", "");
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";
    textarea.style.pointerEvents = "none";
    document.body.appendChild(textarea);
    textarea.select();
    const copied = document.execCommand("copy");
    textarea.remove();

    if (!copied) throw new Error("Clipboard unavailable");
  }

  function showToast(title, message, type = "info") {
    const toast = document.createElement("div");
    toast.className = "toast " + type;
    toast.innerHTML =
      '<div class="toast-icon" aria-hidden="true">' +
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9"><path d="m5 12 4 4L19 6"/></svg>' +
      '</div><div><h3 class="toast-title"></h3><p class="toast-message"></p></div>';

    toast.querySelector(".toast-title").textContent = title;
    toast.querySelector(".toast-message").textContent = message;
    els.toastRegion.appendChild(toast);

    window.setTimeout(() => {
      toast.classList.add("removing");
      window.setTimeout(() => toast.remove(), 220);
    }, 3300);
  }

  function openModal(browser) {
    const isEdge = browser === "edge";
    activeScript = decodeUtf8Base64(scriptData[browser]);
    lastFocusedElement = document.activeElement;

    els.title.textContent = isEdge
      ? "PowerShell Script · Microsoft Edge"
      : "PowerShell Script · Google Chrome";
    els.description.textContent = isEdge
      ? "คัดลอก Script เพื่อเปิดลิงก์งานทั้งหมดในหน้าต่าง Microsoft Edge ใหม่"
      : "คัดลอก Script เพื่อเปิดลิงก์งานทั้งหมดในหน้าต่าง Google Chrome ใหม่";
    els.browserTag.textContent = isEdge
      ? "Microsoft Edge · 7 Links"
      : "Google Chrome · 7 Links";
    els.code.textContent = activeScript;
    els.modal.classList.add("open");
    els.modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    window.setTimeout(() => els.copyButton.focus(), 0);
  }

  function closeModal() {
    els.modal.classList.remove("open");
    els.modal.setAttribute("aria-hidden", "true");
    els.code.textContent = "";
    activeScript = "";
    document.body.style.overflow = "";
    if (lastFocusedElement && typeof lastFocusedElement.focus === "function") {
      lastFocusedElement.focus();
    }
  }

  function showCopySuccess() {
    const label = els.copyButton.querySelector(".copy-label");
    const icon = els.copyButton.querySelector(".copy-icon");
    const previousLabel = label.textContent;
    const previousIcon = icon.innerHTML;

    label.textContent = "คัดลอกแล้ว";
    icon.innerHTML = '<path d="m5 12 4 4L19 6" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>';

    window.setTimeout(() => {
      label.textContent = previousLabel;
      icon.innerHTML = previousIcon;
    }, 1500);
  }

  async function handleCopy() {
    if (!activeScript) return;

    try {
      await copyText(activeScript);
      showCopySuccess();
      showToast(
        "คัดลอก Script แล้ว",
        "นำไปวางใน Windows PowerShell แล้วกด Enter ได้ทันที",
        "success"
      );
    } catch (error) {
      showToast(
        "คัดลอกไม่สำเร็จ",
        "กรุณาเลือกข้อความใน Popup แล้วคัดลอกด้วยตนเอง",
        "error"
      );
    }
  }

  function trapFocus(event) {
    if (!els.modal.classList.contains("open") || event.key !== "Tab") return;

    const focusable = Array.from(
      els.modal.querySelectorAll(
        "button:not([disabled]), [tabindex]:not([tabindex='-1'])"
      )
    );

    if (!focusable.length) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }

  els.chromeButton.addEventListener("click", () => openModal("chrome"));
  els.edgeButton.addEventListener("click", () => openModal("edge"));
  els.closeButton.addEventListener("click", closeModal);
  els.cancelButton.addEventListener("click", closeModal);
  els.copyButton.addEventListener("click", handleCopy);
  els.modal.addEventListener("click", (event) => {
    if (event.target === els.modal) closeModal();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && els.modal.classList.contains("open")) {
      closeModal();
    }
    trapFocus(event);
  });
})();
