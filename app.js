
const modal=document.getElementById('modal');
const text=document.getElementById('modalText');
document.querySelectorAll('[data-info]').forEach(btn=>{
  btn.addEventListener('click',()=>{
    text.textContent=btn.dataset.info;
    modal.classList.remove('hidden');
  });
});
document.getElementById('modalClose').addEventListener('click',()=>modal.classList.add('hidden'));
modal.addEventListener('click',e=>{if(e.target===modal)modal.classList.add('hidden')});
document.getElementById('openAnalysis').addEventListener('click',()=>{
  text.textContent='Il dettaglio partita verrà collegato dopo l’approvazione della Dashboard.';
  modal.classList.remove('hidden');
});
console.log('SPACE16154 dashboard build loaded');
