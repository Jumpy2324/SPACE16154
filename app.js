document.addEventListener("DOMContentLoaded",()=>{
  document.querySelectorAll(".card").forEach(card=>{
    card.addEventListener("click",()=>card.classList.toggle("focus"));
  });
  document.querySelector(".primary")?.addEventListener("click",e=>{
    e.stopPropagation();
    alert("Modulo Analisi Completa pronto per essere collegato a SportMonks + xG + FPI.");
  });
});