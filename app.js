(() => {
  const screens = [...document.querySelectorAll(".screen")];
  const navItems = [...document.querySelectorAll(".nav-item")];

  function showScreen(name) {
    screens.forEach(screen => screen.classList.toggle("active", screen.dataset.screen === name));
    navItems.forEach(item => item.classList.toggle("active", item.dataset.target === name));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  navItems.forEach(item => {
    item.addEventListener("click", () => showScreen(item.dataset.target));
  });

  document.querySelectorAll("[data-open-analysis]").forEach(button => {
    button.addEventListener("click", () => showScreen("analysis"));
  });

  // Durante lo sviluppo eliminiamo vecchi service worker e cache,
  // così GitHub Pages mostra sempre i file appena caricati.
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.getRegistrations()
      .then(registrations => Promise.all(registrations.map(reg => reg.unregister())))
      .catch(() => {});
  }

  if ("caches" in window) {
    caches.keys()
      .then(keys => Promise.all(keys.map(key => caches.delete(key))))
      .catch(() => {});
  }
})();
