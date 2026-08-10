(async()=>{
  // Keep the normal app free of service workers until the cache problem is conclusively gone.
  try {
    if ('serviceWorker' in navigator) {
      const regs = await navigator.serviceWorker.getRegistrations();
      await Promise.all(regs.map(r => r.unregister()));
    }
    if ('caches' in window) {
      const keys = await caches.keys();
      await Promise.all(keys.map(k => caches.delete(k)));
    }
    localStorage.setItem('football16154_build','20260810-0542-reset1');
  } catch(e) {
    console.warn('Cache cleanup warning', e);
  }
})();
