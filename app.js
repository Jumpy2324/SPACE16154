const DEMO = {
  featured: {
    league: "Europa League",
    home: "Atalanta", away: "Leverkusen", time: "18:45",
    homeCode:"ATA", awayCode:"LEV",
    homeClass:"atalanta", awayClass:"leverkusen",
    result: ["1",47], goals:["GOL",67], ou:["OVER 2.5",61]
  },
  upcoming: [
    ["21:00","Liverpool","Marseille","Conference League","LIV","MAR","liverpool","marseille"],
    ["18:30","Fiorentina","Club Brugge","Conference League","FIO","BRU","fiorentina","brugge"],
    ["21:00","West Ham","AZ Alkmaar","Conference League","WHU","AZ","westham","az"]
  ],
  signals: [
    ["ALTA PROBABILITÀ","OVER 2.5","Atalanta vs Leverkusen","78%","up"],
    ["ALTA PROBABILITÀ","GOL","Liverpool vs Marseille","72%","up"],
    ["VALUE BET","1X","Fiorentina vs Club Brugge","65%","value"]
  ]
};

const crest = (code, cls) => `<div class="crest ${cls||""}"><span>${code}</span></div>`;
const info = (title, text) => `<button class="info" aria-label="Info ${title}" data-info="${encodeURIComponent(text)}">i</button>`;

function shell(active="dashboard"){
  return `
  <header class="topbar">
    <button class="icon-btn" id="menuBtn" aria-label="Menu"><span></span><span></span><span></span></button>
    <div class="brand"><div class="brand-name">SPACE16154</div><div class="brand-sub">FOOTBALL INTELLIGENCE</div></div>
    <button class="icon-btn bell" id="bellBtn" aria-label="Notifiche">♧<b></b></button>
  </header>
  <main id="main"></main>
  <nav class="bottom-nav">
    ${nav("dashboard","⌂","Dashboard",active)}
    ${nav("matches","▣","Matches",active)}
    ${nav("analysis","◇","Analysis",active)}
    ${nav("teams","♙","Teams",active)}
    ${nav("more","•••","More",active)}
  </nav>`;
}
function nav(id, icon, label, active){
  return `<button class="nav-item ${active===id?"active":""}" data-nav="${id}"><span class="nav-icon">${icon}</span><span>${label}</span></button>`;
}

function statCard(title, value, sub, icon, pct){
  return `<article class="stat-card"><div class="stat-top"><span>${title}</span><b>${icon}</b></div><strong>${value}</strong><small>${sub}</small><div class="progress"><i style="width:${pct}%"></i></div></article>`;
}

function featured(){
  const f=DEMO.featured;
  return `<section class="panel featured">
    <div class="section-head"><h2>☆ &nbsp; MATCH IN EVIDENZA</h2><span>${f.league} ›</span></div>
    <div class="match-hero">
      <div class="club"><div>${crest(f.homeCode,f.homeClass)}</div><strong>${f.home}</strong></div>
      <div class="match-time"><b>${f.time}</b><span>OGGI</span><em>VS</em></div>
      <div class="club"><div>${crest(f.awayCode,f.awayClass)}</div><strong>${f.away}</strong></div>
    </div>
    <div class="prediction-grid">
      ${predCard("1X2","ESITO PIÙ PROBABILE",f.result[0],f.result[1])}
      ${predCard("GOL / NO GOL","ESITO PIÙ PROBABILE",f.goals[0],f.goals[1])}
      ${predCard("OVER / UNDER 2.5","ESITO PIÙ PROBABILE",f.ou[0],f.ou[1])}
    </div>
    <button class="primary-btn" data-open-analysis="featured">VAI ALL'ANALISI COMPLETA <span>›</span></button>
  </section>`;
}
function predCard(a,b,c,d){
  return `<div class="pred-card"><small>${a}</small><span>${b}</span><strong>${c}</strong><em>${d}%</em></div>`;
}

function upcoming(){
 return `<section class="panel">
   <div class="section-head"><h2>PROSSIME PARTITE</h2><button class="text-btn" data-nav="matches">VEDI TUTTE ›</button></div>
   <div class="fixtures">
   ${DEMO.upcoming.map(x=>`<div class="fixture">
      <div class="fixture-time"><b>${x[0]}</b><small>OGGI</small></div>
      <div class="fixture-team">${crest(x[4],x[6])}<span>${x[1]}</span></div>
      <b class="vs">VS</b>
      <div class="fixture-team away"><span>${x[2]}</span>${crest(x[5],x[7])}</div>
      <div class="competition">${x[3]} <i>▮▮</i></div>
      <button class="star">☆</button>
   </div>`).join("")}
   </div>
 </section>`;
}

function signals(){
 return `<section class="panel signals">
   <div class="section-head"><h2>◎ &nbsp; SEGNALI PRINCIPALI</h2><button class="text-btn">VEDI TUTTI ›</button></div>
   <div class="signal-row">
   ${DEMO.signals.map(s=>`<article class="signal ${s[4]}">
      <div class="signal-type">${s[0]}</div><div class="signal-main">${s[1]}</div><div class="signal-match">${s[2]}</div>
      <div class="confidence-line">CONFIDENCE ${info("Confidence","Indica quanto i principali indicatori analizzati convergono verso la previsione. Non rappresenta una seconda probabilità dell'esito.")}<strong>${s[3]}</strong></div>
      <div class="confidence-bar"><i style="width:${parseInt(s[3])}%"></i></div>
   </article>`).join("")}
   </div>
 </section>`;
}

function dashboard(){
 document.querySelector("#main").innerHTML = `
 <div class="page">
  <div class="page-title-row"><div><div class="eyebrow">PANORAMICA</div><h1>DASHBOARD</h1><p>Panoramica generale e segnali principali</p></div>
    <button class="date-btn">▣ &nbsp; 5 AGOSTO 2026 &nbsp;⌄</button>
  </div>
  <div class="stats">
    ${statCard("PARTITE OGGI","18","Totali in programma","▣",62)}
    ${statCard("ANALISI COMPLETE","12","67% completate","⌁",67)}
    ${statCard("SEGNALI PRINCIPALI","7","Opportunità rilevate","◎",48)}
    ${statCard("ACCURACY MEDIA","67%","Ultimi 30 giorni","♜",67)}
  </div>
  ${featured()}${upcoming()}${signals()}
 </div>`;
 bindCommon();
}

function matches(){
 document.querySelector("#main").innerHTML = `<div class="page">
   <div class="eyebrow">CALENDARIO</div><h1>Match Day</h1><p class="subtitle">Partite filtrate e ordinate per orario</p>
   <div class="filters"><button class="filter active">Tutti</button><button class="filter">Premier League</button><button class="filter">Serie A</button><button class="filter">La Liga</button><button class="filter">Bundesliga</button><button class="filter">Ligue 1</button></div>
   <section class="panel"><div class="section-head"><h2>PARTITE</h2><span>5 disponibili</span></div>
   ${[
    ["18:00","Milan","Roma","68%","MIL","ROM","milan","roma"],
    ["18:30","Arsenal","Chelsea","61%","ARS","CHE","arsenal","chelsea"],
    ["20:00","Barcelona","Sevilla","74%","BAR","SEV","barcelona","sevilla"],
    ["20:30","Bayern","Leverkusen","55%","BAY","LEV","bayern","leverkusen"],
    ["21:00","PSG","Lyon","72%","PSG","LYO","psg","lyon"]
   ].map(m=>`<button class="match-list" data-open-analysis="match"><span>${m[0]}</span><div>${crest(m[4],m[6])}<b>${m[1]}</b></div><em>—</em><div><b>${m[2]}</b>${crest(m[5],m[7])}</div><strong>${m[3]}</strong></button>`).join("")}
   </section>
 </div>`;
 bindCommon();
}

function analysis(){
 document.querySelector("#main").innerHTML = `<div class="page analysis-page">
  <div class="eyebrow">MATCH ANALYSIS</div><h1>Milan — Roma</h1><p class="subtitle">Analisi pre-match · dati demo</p>
  <section class="panel result-panel"><div class="prediction-grid">
   ${predCard("ESITO","PIÙ PROBABILE","1",68)}${predCard("GOL/NO GOL","PIÙ PROBABILE","GOL",71)}${predCard("OVER/UNDER","PIÙ PROBABILE","OVER",64)}
  </div></section>
  <section class="panel"><div class="confidence-head"><h2>Confidence ${info("Confidence","Indica quanto i principali indicatori analizzati convergono verso la previsione. Non rappresenta la probabilità dell'esito.")}</h2><strong>76%</strong></div><div class="big-progress"><i style="width:76%"></i></div></section>
  <section class="panel"><div class="section-head"><h2>CONFRONTO SQUADRE</h2><span>Milan &nbsp;&nbsp;&nbsp; Roma</span></div>
   ${row("Rating","82","76","Valuta la forza complessiva della squadra.")}
   ${row("xG","1.84","1.21","Expected Goals: qualità e quantità delle occasioni create.")}
   ${row("xGA","0.94","1.37","Expected Goals Against: qualità delle occasioni concesse.")}
   ${row("Forma","W W D W W","W D L W D","Andamento recente delle prestazioni.")}
  </section>
  <div class="mini-grid">
    ${mini("Forza d'attacco","81","Misura la capacità offensiva.")}
    ${mini("Forza difensiva","74","Misura la solidità difensiva.")}
    ${mini("Pressure Index","67 — 49","Pressione, territorialità e pericolosità.")}
    ${mini("Momentum","Pre-match","Direzione recente della performance.")}
  </div>
  <section class="panel"><div class="section-head"><h2>STATISTICHE AVANZATE</h2></div>
   <div class="advanced"><div><small>Tiri</small><b>14 — 9</b></div><div><small>Tiri in porta</small><b>6 — 4</b></div><div><small>Possesso</small><b>58% — 42%</b></div><div><small>Corner</small><b>6 — 4</b></div><div><small>Ultimo terzo</small><b>64 — 47</b></div><div><small>Clean sheet</small><b>42% — 31%</b></div></div>
  </section>
 </div>`;
 bindCommon();
}
function row(a,b,c,t){return `<div class="compare-row"><span>${a} ${info(a,t)}</span><b>${b}</b><b>${c}</b></div>`}
function mini(a,b,t){return `<div class="mini-card"><span>${a} ${info(a,t)}</span><b>${b}</b></div>`}

function simple(title, text){
 document.querySelector("#main").innerHTML = `<div class="page empty"><div class="eyebrow">SPACE16154</div><h1>${title}</h1><p>${text}</p><div class="panel demo-note"><b>V1 · DATI DEMO</b><span>Questa sezione verrà collegata ai dati reali quando integreremo SportMonks.</span></div></div>`;
 bindCommon();
}

function bindCommon(){
 document.querySelectorAll("[data-nav]").forEach(b=>b.onclick=()=>route(b.dataset.nav));
 document.querySelectorAll("[data-open-analysis]").forEach(b=>b.onclick=()=>route("analysis"));
 document.querySelectorAll(".info").forEach(b=>b.onclick=()=>showInfo(decodeURIComponent(b.dataset.info)));
}
function showInfo(text){
 const o=document.createElement("div"); o.className="modal-backdrop"; o.innerHTML=`<div class="info-modal"><button class="modal-x">×</button><div class="eyebrow">INFO</div><p>${text}</p></div>`;
 document.body.appendChild(o); o.querySelector(".modal-x").onclick=()=>o.remove(); o.onclick=e=>{if(e.target===o)o.remove()};
}
function route(name){
 document.body.innerHTML = shell(name);
 if(name==="dashboard") dashboard();
 else if(name==="matches") matches();
 else if(name==="analysis") analysis();
 else if(name==="teams") simple("Squadre","Gestione e confronto delle squadre analizzate.");
 else simple("Altro","Impostazioni, preferenze e funzioni future di SPACE16154.");
}
route("dashboard");

if ("serviceWorker" in navigator) window.addEventListener("load",()=>navigator.serviceWorker.register("./sw.js"));
