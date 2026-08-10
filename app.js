
const F={home:"Milan",away:"Roma",league:"Serie A",date:"12 Maggio 2025",time:"20:45",p1:74,px:16,p2:10,under:52,over:48,goal:68,nogoal:32};
const GAMES=[["18:00","Juventus","Inter","Serie A","JUV","INT",65],["18:00","Lazio","Atalanta","Serie A","LAZ","ATA",58],["20:45","Fiorentina","Napoli","Serie A","FIO","NAP",61]];
const MACROS=[
["⚡","Threat Creation","Capacità di creare occasioni pericolose attraverso qualità e quantità delle azioni offensive.","78","64","+14",""],
["⬡","Defense Stability","Solidità difensiva e prevenzione del pericolo concesso.","74","67","+7",""],
["↗","Forma (pesata avversari)","Forma recente valutata in base alla forza degli avversari affrontati.","82","61","+21",""],
["◎","Opponent Strength","Forza dell'avversario affrontato di recente.","71","76","-5","red"],
["♧","Pressing / PPDA","Intensità della pressione e recuperi alti effettuati.","77","62","+15",""],
["♙","Availability (Assenze)","Impatto di assenze e disponibilità della rosa.","91","84","+7",""]
];
const TECH=[["xG","1.84","1.26"],["xGA","0.94","1.32"],["Ultimo terzo","64.2","50.8"],["Qualità tiro","0.13","0.10"],["PPDA","9.2","12.6"]];

const app=document.getElementById("app"), modal=document.getElementById("modal"), content=document.getElementById("modalContent");
const crest=x=>`<span class="crest">${x}</span>`;
const info=(title,text)=>`<button class="info" data-info="${encodeURIComponent(text)}">i</button>`;

function fixture(x){return `<button class="fixture" data-detail><span class="meta"><b>${x[0]}</b><small>${x[3]}</small></span><div class="team">${crest(x[4])}<b>${x[1]}</b></div><em>VS</em><div class="team"><b>${x[2]}</b>${crest(x[5])}</div><strong>${x[6]}%</strong></button>`}

function dashboard(){
 app.innerHTML=`<div class="page"><span class="eyebrow">PANORAMICA</span><h1>DASHBOARD</h1><p class="subtitle">Analisi e segnali dai match più interessanti.</p>
 <section class="panel featured">
   <div class="section-head"><span>☆ MATCH IN EVIDENZA</span><small>Serie A</small></div>
   <div class="team-duel"><div class="club">${crest("MIL")}<b>MILAN</b></div><div class="vs">VS</div><div class="club">${crest("ROM")}<b>ROMA</b></div></div>
   <div class="kickoff">${F.date} · ${F.time}</div>
   <div class="market-grid"><div class="hot"><small>1</small><b>${F.p1}%</b></div><div><small>X</small><b>${F.px}%</b></div><div><small>2</small><b>${F.p2}%</b></div></div>
   <div class="secondary-markets"><div class="hot">Gol ${F.goal}%</div><div class="hot">Under ${F.under}%</div></div>
   <button class="primary" data-detail>VAI ALL'ANALISI COMPLETA ›</button>
 </section>
 <section class="panel">
  <div class="section-head"><span>TOP SIGNALS</span><button>VEDI TUTTI ›</button></div>
  <article class="signal-card"><div><small>HIGH CONFIDENCE</small><b>Milan - Roma</b><p>Esito: 1</p></div><strong>74%</strong></article>
  <article class="signal-card value"><div><small>VALUE BET</small><b>Juventus - Inter</b><p>Doppia chance: X2</p></div><strong>62%</strong></article>
  <article class="signal-card form"><div><small>FORMA MODELLO</small><b>Man City - Arsenal</b><p>Over 2.5</p></div><strong>65%</strong></article>
 </section>
 <section class="panel"><div class="section-head"><span>PROSSIME PARTITE</span><button>VEDI TUTTE ›</button></div>${GAMES.map(fixture).join("")}</section>
 </div>`;
 bind();
}

function probs(){
 return `<section class="panel"><div class="section-head"><span>PROBABILITÀ DEL MODELLO ${info("Probabilità","Le percentuali sono generate combinando le sei macroaree del modello e gli indicatori sottostanti.")}</span></div>
 <div class="prob-grid">
  <div class="prob-box triple"><b>1X2</b><p><span class="hot">1<strong>${F.p1}%</strong></span><span>X<strong>${F.px}%</strong></span><span>2<strong>${F.p2}%</strong></span></p><small>Risultato più probabile: <i>1 (${F.p1}%)</i></small></div>
  <div class="prob-box pair"><b>UNDER / OVER 2.5</b><p><span class="hot">Under 2.5<strong>${F.under}%</strong></span><span>Over 2.5<strong>${F.over}%</strong></span></p><small>Soglia: 2.5 gol</small></div>
  <div class="prob-box pair"><b>GOL / NO GOL</b><p><span class="hot">Gol<strong>${F.goal}%</strong></span><span>No Gol<strong>${F.nogoal}%</strong></span></p><small>Probabilità Gol: <i>Alta</i></small></div>
 </div></section>`;
}
function model(){
 return `<section class="panel"><div class="section-head"><span>ANALISI DEL MODELLO ${info("Analisi del modello","Le sei macroaree contribuiscono alla valutazione complessiva del match.")}</span></div>
 <div class="scorebar"><div class="side">${crest("MIL")}<strong>79</strong><small>/100</small></div><div class="center"><b>MODEL SCORE</b><strong>+11</strong><em>Vantaggio MILAN</em></div><div class="side"><strong>68</strong><small>/100</small>${crest("ROM")}</div></div>
 <div class="macro-head"><span>MACROAREA</span><span>MILAN</span><span>DIFF.</span><span>ROMA</span><span></span></div>
 ${MACROS.map(x=>`<div class="macro-row"><div class="macro-name"><span class="macro-icon">${x[0]}</span><div><b>${x[1]} ${info(x[1],x[2]+" Il valore viene calcolato combinando diversi indicatori sottostanti, pesati dal modello.")}</b><small>${x[2]}</small></div></div><strong class="first">${x[3]}</strong><div class="delta ${x[6]}">${x[5]}</div><strong>${x[4]}</strong><button class="expand">⌄</button></div>`).join("")}
 <div class="model-note">${info("Valori","I valori delle macroaree vanno da 0 a 100. Più è alto, migliore è la performance dell'area.")} I valori vanno da 0 a 100.</div>
 </section>`;
}
function accordion(title,body){return `<section class="panel accordion"><button class="accordion-head"><span>${title}</span><b>⌄</b></button><div class="accordion-body">${body}</div></section>`}
function detail(){
 app.innerHTML=`<div class="page">
 <div class="detail-head"><button class="back" data-dashboard>‹</button><h1>Milan - Roma</h1><p>${F.league} · ${F.date} · ${F.time}</p><div class="team-duel"><div class="club">${crest("MIL")}<b>MILAN</b></div><div class="vs">VS</div><div class="club">${crest("ROM")}<b>ROMA</b></div></div><span class="featured-pill">☆ Match in evidenza</span></div>
 ${probs()}${model()}
 ${accordion("▥ DATI TECNICI - CONFRONTO",`<div class="tech-head"><span>INDICATORE</span><b>MILAN</b><b>ROMA</b></div>${TECH.map(x=>`<div class="tech-row"><span>${x[0]} ${info(x[0],"Dato tecnico usato dal modello insieme agli altri indicatori della relativa macroarea.")}</span><b>${x[1]}</b><b>${x[2]}</b></div>`).join("")}`)}
 ${accordion("♙ ASSENZE PRINCIPALI",`<div class="cols"><div><b>MILAN</b><p>R. Leao (In dubbio) · Thiaw (Out) · Loftus-Cheek (Out)</p></div><div><b>ROMA</b><p>Dybala (In dubbio) · Smalling (Out) · Azmoun (Out)</p></div></div>`)}
 ${accordion("▦ INFORMAZIONI PARTITA",`<div class="info-grid"><div>Stadio<b>San Siro - Milano</b></div><div>Meteo<b>16°C Sereno</b></div><div>Arbitro<b>D. Orsato</b></div><div>Ultimo incontro<b>Milan 3 - 1 Roma</b></div></div>`)}
 ${accordion("♙ FORMAZIONI / PROBABILI FORMAZIONI",`<div class="cols"><div><b>MILAN</b><strong>4-2-3-1</strong><small>Probabile formazione demo</small></div><div><b>ROMA</b><strong>3-4-2-1</strong><small>Probabile formazione demo</small></div></div>`)}
 </div>`;
 bind();
}
function stub(title){app.innerHTML=`<div class="page"><span class="eyebrow">PREVIEW</span><h1>${title}</h1><p class="subtitle">Questa preview serve solo a validare Dashboard e dettaglio partita 1:1 prima di completare il resto.</p></div>`}

function bind(){
 document.querySelectorAll("[data-detail]").forEach(x=>x.onclick=detail);
 document.querySelectorAll("[data-dashboard]").forEach(x=>x.onclick=dashboard);
 document.querySelectorAll(".accordion-head").forEach(x=>x.onclick=()=>x.closest(".accordion").classList.toggle("open"));
 document.querySelectorAll(".info").forEach(x=>x.onclick=e=>{e.stopPropagation();content.innerHTML=`<p>${decodeURIComponent(x.dataset.info)}</p>`;modal.classList.remove("hidden")});
}
document.getElementById("closeModal").onclick=()=>modal.classList.add("hidden");
modal.onclick=e=>{if(e.target===modal)modal.classList.add("hidden")};
document.querySelectorAll("[data-view]").forEach(b=>b.onclick=()=>{
 document.querySelectorAll("[data-view]").forEach(x=>x.classList.remove("active")); b.classList.add("active");
 if(b.dataset.view==="dashboard") dashboard(); else stub(b.querySelector("small").textContent);
});
dashboard();
