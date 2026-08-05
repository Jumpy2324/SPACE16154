// SPACE16154 V2 — front-end demo.
// I dati sono volutamente demo: in seguito verranno sostituiti dai dati SportMonks/xG/FPI.
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".signal-row").forEach(row => {
    row.addEventListener("click", () => row.classList.toggle("selected"));
  });
  document.querySelector(".primary")?.addEventListener("click", () => {
    alert("Analisi completa: modulo pronto per essere collegato al motore dati.");
  });
});
