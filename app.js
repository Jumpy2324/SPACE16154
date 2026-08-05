const VERSION = "SPACE16154-V2-2026-08-06";

document.documentElement.dataset.version = VERSION;

// Force a fresh service-worker registration whenever the app version changes.
if ("serviceWorker" in navigator) {
  window.addEventListener("load", async () => {
    try {
      const reg = await navigator.serviceWorker.register(`sw.js?v=${encodeURIComponent(VERSION)}`, {updateViaCache:"none"});
      await reg.update();
    } catch (e) {
      console.warn("Service worker:", e);
    }
  });
}

// Lightweight visual interaction for the prototype.
document.querySelectorAll(".fixture, .market, .signal").forEach(el => {
  el.addEventListener("click", () => el.classList.toggle("selected"));
});
