const VERSION="SPACE16154-V3-2026-08-07";
const state={page:"dashboard",filter:"Tutti",drawer:false,favorites:new Set()};

/* Demo dataset: architecture is intentionally separated from UI.
   Replace DATA.matches with API output when a provider is connected. */
const DATA={
  date:new Date(),
  matches:[
    {id:1,time:"18:00",league:"Serie A",home:"Milan",away:"Roma",hc:"MIL",ac:"ROM",hcls:"mil",acls:"rom",
      p1:68,pg:71,po:64,xgH:1.84,xgA:1.21,xgaH:.94,xgaA:1.37,formH:.78,formA:.61,shotsH:14,shotsA:9,sotH:6,sotA:4,posH:58,posA:42,cornersH:6,cornersA:4},
    {id:2,time:"18:30",league:"Premier League",home:"Arsenal",away:"Chelsea",hc:"ARS",ac:"CHE",hcls:"ars",acls:"che",
      p1:61,pg:66,po:59,xgH:1.71,xgA:1.36,xgaH:1.02,xgaA:1.28,formH:.74,formA:.66,shotsH:13,shotsA:11,sotH:5,sotA:4,posH:55,posA:45,cornersH:5,cornersA:5},
    {id:3,time:"20:00",league:"La Liga",home:"Barcelona",away:"Sevilla",hc:"BAR",ac:"SEV",hcls:"bar",acls:"sev",
      p1:74,pg:69,po:67,xgH:2.12,xgA:.96,xgaH:.82,xgaA:1.46,formH:.86,formA:.54,shotsH:16,shotsA:8,sotH:7,sotA:3,posH:62,posA:38,cornersH:7,cornersA:3},
    {id:4,time:"20:30",league:"Bundesliga",home:"Bayern",away:"Leverkusen",hc:"BAY",ac:"LEV",hcls:"bay",acls:"lev",
      p1:55,pg:63,po:58,xgH:1.92,xgA:1.68,xgaH:1.15,xgaA:1.18,formH:.72,formA:.75,shotsH:15,shotsA:13,sotH:6,sotA:6,posH:54,posA:46,cornersH:6,cornersA:6}
  ]
};

const $=s=>document.querySelector(s);
const esc=s=>String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[c]));
const pct=n=>`${Math.round(n)}%`;
const crest=(code,cls)=>`<div class="crest ${cls}"><span>${code}</span></div>`;

function model(m){
  // Transparent scoring layer: probability-like signal, confidence and value are kept separate.
  const balance=((m.xgH-m.xgA)*9)+((m.xgaA-m.xgaH)*7)+((m.formH-m.formA)*18);
  const raw1=m.p1 + balance*.55;
  const p1=Math.max(5,Math.min(90,raw1));
  const pGoals=Math.max(5,Math.min(90,m.pg + (m.xgH+m.xgA-2.4)*8));
  const pOver=Math.max(5,Math.min(90,m.po + (m.xgH+m.xgA-2.4)*9));
  const confidence=Math.round(Math.min(96,52 + Math.abs(balance)*.9 + (m.formH+m.formA)*9));
  const fair=100/p1;
  const edge=Math.max(0,Math.round((p1-50)*.72));
  const label=confidence>=78?"FORTE":confidence>=68?"BUONA":"MODERATA";
  return {p1,pGoals,pOver,confidence,fair,edge,label};
}

function dateLabel(d=DATA.date){
 return new Intl.DateTimeFormat("it-IT",{day:"numeric",month:"long",year:"numeric"}).format(d).toUpperCase();
}
function nav(active){
 return `<nav class="bottom-nav">
  ${[["dashboard","⌂","Dashboard"],["matches","▣","Matches"],["analysis","◈","Analisi"],["teams","♙","Squadre"],["more","•••","Altro"]].map(x=>
   `<button class="nav ${active===x[0]?"active":""}" data-page="${x[0]}"><b>${x[1]}</b><span>${x[2]}</span></button>`).join("")}
 </nav>`;
}
function header(){
 return `<header class="topbar">
   <button class="icon-btn" id="menuBtn" aria-label="Menu"><span class="hamb"><i></i><i></i><i></i></span></button>
   <div class="brand"><div class="brand-name">SPACE16154</div><div class="brand-sub">FOOTBALL INTELLIGENCE</div></div>
   <button class="icon-btn" id="statusBtn" aria-label="Stato"><span class="status-dot"></span></button>
 </header>`;
}
function shell(content){
 $("#app").innerHTML=header()+content+nav(state.page)+drawer()+`<div id="toast" class="toast"></div>`;
 bind();
}
function drawer(){
 return `<div class="drawer-backdrop" id="backdrop"></div><aside class="drawer" id="drawer">
   <button class="close" id="closeDrawer">×</button>
   <h3>SPACE16154</h3><p>FOOTBALL INTELLIGENCE · V3</p>
   ${[["dashboard","Dashboard"],["matches","Match Day"],["analysis","Analisi"],["teams","Squadre"],["more","Impostazioni"]].map(x=>
    `<button class="${state.page===x[0]?"active":""}" data-page="${x[0]}">${x[1]}</button>`).join("")}
   <hr style="border:0;border-top:1px solid #222;margin:18px 0">
   <button id="about">Metodo e affidabilità</button>
 </aside>`;
}
function bind(){
 document.querySelectorAll("[data-page]").forEach(b=>b.onclick=()=>{state.page=b.dataset.page;state.drawer=false;render()});
 $("#menuBtn").onclick=()=>{state.drawer=true;syncDrawer()};
 $("#closeDrawer").onclick=()=>{state.drawer=false;syncDrawer()};
 $("#backdrop").onclick=()=>{state.drawer=false;syncDrawer()};
 $("#statusBtn").onclick=()=>toast("Motore locale pronto · dati demo separati dall'UI");
 $("#about")?.addEventListener("click",()=>toast("Probabilità ≠ confidence: il modello mostra entrambe separatamente."));
 document.querySelectorAll("[data-fav]").forEach(b=>b.onclick=e=>{e.stopPropagation();const id=+b.dataset.fav;state.favorites.has(id)?state.favorites.delete(id):state.favorites.add(id);b.textContent=state.favorites.has(id)?"★":"☆"});
 document.querySelectorAll("[data-open]").forEach(b=>b.onclick=()=>{state.page="analysis";state.selected=+b.dataset.open;render()});
 document.querySelectorAll("[data-filter]").forEach(b=>b.onclick=()=>{state.filter=b.dataset.filter;render()});
}
function syncDrawer(){ $("#drawer").classList.toggle("open",state.drawer);$("#backdrop").classList.toggle("open",state.drawer); }
function toast(msg){const t=$("#toast");t.textContent=msg;t.classList.add("show");setTimeout(()=>t.classList.remove("show"),2400)}

function stat(label,value,sub,bar,icon){return `<article class="stat"><label>${label}<b>${icon}</b></label><strong>${value}</strong><small>${sub}</small><div class="bar"><i style="width:${bar}%"></i></div></article>`}

function matchHero(m){
 const r=model(m);
 return `<section class="panel">
  <div class="panel-head"><h2>★ MATCH IN EVIDENZA</h2><span>${m.league}</span></div>
  <div class="match-hero">
   <div class="team">${crest(m.hc,m.hcls)}<strong>${m.home}</strong></div>
   <div class="kickoff"><strong>${m.time}</strong><small>OGGI</small><div class="vs">VS</div></div>
   <div class="team">${crest(m.ac,m.acls)}<strong>${m.away}</strong></div>
  </div>
  <div class="predictions">
   ${pred("1X2","1",r.p1,"base model")}
   ${pred("GOL / NO GOL","GOL",r.pGoals,"goal model")}
   ${pred("OVER / UNDER","OVER 2.5",r.pOver,"goal model")}
  </div>
  <button class="primary" data-open="${m.id}">VAI ALL'ANALISI COMPLETA <span>›</span></button>
 </section>`;
}
function pred(label,pick,p,source){return `<div class="pred"><small>${label}</small><span class="pick">${pick}</span><span class="prob">${pct(p)}</span><span class="delta">${source}</span></div>`}

function signals(){
 const ranked=DATA.matches.map(m=>({m,r:model(m)})).sort((a,b)=>b.r.confidence-a.r.confidence).slice(0,3);
 return `<section class="panel"><div class="panel-head"><h2>◎ TOP SIGNALS</h2><button class="link" data-page="analysis">VEDI TUTTI ›</button></div>
 <div class="signal-grid">${ranked.map((x,i)=>`<article class="signal ${x.r.edge>=12?"value":""}">
  <span class="tag">${x.r.edge>=12?"VALUE / EDGE":"ALTA CONVERGENZA"}</span>
  <h3>#${i+1} ${x.m.home} — ${x.m.away}</h3><p>${x.r.p1>=x.r.pGoals&&x.r.p1>=x.r.pOver?"Esito 1":"Segnale goal"} · confidence separata dalla probabilità</p>
  <div class="score"><span>CONFIDENCE</span><b>${x.r.confidence}%</b></div><div class="bar"><i style="width:${x.r.confidence}%"></i></div>
 </article>`).join("")}</div></section>`;
}

function dashboard(){
 const featured=DATA.matches[0];
 shell(`<main class="page">
  <div class="hero-row"><div><div class="eyebrow">PANORAMICA GENERALE</div><h1>DASHBOARD</h1><p class="subtitle">Segnali, qualità del dato e probabilità in un'unica vista.</p><div class="live-pill"><i class="status-dot"></i> MOTORE ATTIVO · DATI DEMO</div></div><button class="date-btn">${dateLabel()}⌄</button></div>
  <section class="stats">
   ${stat("PARTITE OGGI",DATA.matches.length,"fixture caricati",100,"▣")}
   ${stat("SEGNALI",DATA.matches.filter(m=>model(m).confidence>=68).length,"sopra soglia",75,"◎")}
   ${stat("CONFIDENCE MEDIA",Math.round(DATA.matches.reduce((s,m)=>s+model(m).confidence,0)/DATA.matches.length)+"%","convergenza indicatori",72,"◉")}
   ${stat("DATA QUALITY","96%","completezza dataset",96,"◆")}
  </section>
  ${matchHero(featured)}${signals()}
  <section class="panel"><div class="panel-head"><h2>PROSSIME PARTITE</h2><button class="link" data-page="matches">VEDI TUTTE ›</button></div>
  ${DATA.matches.slice(1).map(m=>matchRow(m)).join("")}</section>
 </main>`);
}

function matchRow(m){
 const r=model(m);
 return `<button class="match-row" data-open="${m.id}">
  <time>${m.time}<small>${m.league}</small></time>
  <div class="team-mini">${crest(m.hc,m.hcls)}<span>${m.home}</span></div><em>—</em>
  <div class="team-mini right"><span>${m.away}</span>${crest(m.ac,m.acls)}</div>
  <strong class="confidence">${Math.round(r.p1)}%</strong>
 </button>`;
}

function matches(){
 const list=state.filter==="Tutti"?DATA.matches:DATA.matches.filter(m=>m.league===state.filter);
 const filters=["Tutti","Serie A","Premier League","La Liga","Bundesliga"];
 shell(`<main class="page"><div class="eyebrow">CALENDARIO</div><h1>MATCH DAY</h1><p class="subtitle">Filtra le partite e apri l'analisi completa.</p>
 <div class="filters">${filters.map(f=>`<button class="filter ${state.filter===f?"active":""}" data-filter="${f}">${f}</button>`).join("")}</div>
 <section class="panel"><div class="panel-head"><h2>${list.length} PARTITE</h2><span>ordinate per orario</span></div>${list.map(matchRow).join("")}</section></main>`);
}

function analysis(){
 const m=DATA.matches.find(x=>x.id===(state.selected||1))||DATA.matches[0],r=model(m);
 shell(`<main class="page"><div class="eyebrow">MATCH ANALYSIS</div><h1>${m.home} — ${m.away}</h1><p class="subtitle">Pre-match · motore V3 · dati dimostrativi</p>
 <section class="panel"><div class="panel-head"><h2>SEGNALE PRINCIPALE</h2><span class="badge ${r.confidence>=78?"strong":"neutral"}">${r.label}</span></div>
 <div class="predictions">${pred("1X2","1",r.p1,"probabilità stimata")}${pred("GOL","GOL",r.pGoals,"probabilità stimata")}${pred("OVER 2.5","OVER",r.pOver,"probabilità stimata")}</div>
 <div class="explain"><strong>Perché il segnale è interessante</strong><p>La convergenza combina xG, xGA, forma recente e volume offensivo. La <b>confidence (${r.confidence}%)</b> misura la coerenza degli indicatori; non viene sommata alla probabilità.</p></div></section>
 <div class="analysis-grid">
  ${ac("xG","%.2f".replace("%",m.xgH),m.xgH>m.xgA?"vantaggio casa":"equilibrio")}
  ${ac("xGA","%.2f".replace("%",m.xgaH),m.xgaH<m.xgaA?"difesa casa migliore":"equilibrio")}
  ${ac("Forma",Math.round(m.formH*100)+"%",m.formH>m.formA?"trend casa":"trend ospite")}
  ${ac("Edge",r.edge+"%",r.edge>=12?"value potenziale":"nessun edge forte")}
 </div>
 <section class="panel"><div class="panel-head"><h2>CONFRONTO DATI</h2><span>${m.home} · ${m.away}</span></div>
 <div class="compare">
  <div>Indicatore</div><div>${m.hc}</div><div>${m.ac}</div>
  <div>xG</div><div>${m.xgH.toFixed(2)}</div><div>${m.xgA.toFixed(2)}</div>
  <div>xGA</div><div>${m.xgaH.toFixed(2)}</div><div>${m.xgaA.toFixed(2)}</div>
  <div>Tiri</div><div>${m.shotsH}</div><div>${m.shotsA}</div>
  <div>Tiri in porta</div><div>${m.sotH}</div><div>${m.sotA}</div>
  <div>Possesso</div><div>${m.posH}%</div><div>${m.posA}%</div>
  <div>Corner</div><div>${m.cornersH}</div><div>${m.cornersA}</div>
 </div></section>
 <section class="panel"><div class="panel-head"><h2>METODOLOGIA</h2><span>trasparente</span></div>
 <div class="explain"><strong>Da migliorare con dati reali</strong><p>Collegamento API, storico risultati, calibrazione delle probabilità, quote di mercato, infortuni/squalifiche, home/away split, forma pesata nel tempo e backtesting. Questi moduli sono separati dall'interfaccia per poterli integrare senza rifare la UI.</p></div></section>
 </main>`);
}
function ac(a,b,c){return `<article class="analysis-card"><label>${a}</label><strong>${b}</strong><em>${c}</em></article>`}

function teams(){
 shell(`<main class="page"><div class="eyebrow">SQUADRE</div><h1>TEAM INTELLIGENCE</h1><p class="subtitle">La sezione è pronta per rating, forma, xG/xGA e confronti storici.</p>
 <section class="panel"><div class="panel-head"><h2>TEAM RATING</h2><span>V3</span></div>${DATA.matches.map(m=>`<button class="match-row" data-open="${m.id}">
  <div></div><div class="team-mini">${crest(m.hc,m.hcls)}<span>${m.home}</span></div><em>VS</em><div class="team-mini right"><span>${m.away}</span>${crest(m.ac,m.acls)}</div><strong class="confidence">${Math.round(model(m).p1)}%</strong>
 </button>`).join("")}</section></main>`);
}
function more(){
 shell(`<main class="page"><div class="eyebrow">SISTEMA</div><h1>IMPOSTAZIONI</h1><p class="subtitle">Controllo del motore e qualità dei dati.</p>
 <section class="panel"><div class="panel-head"><h2>STATO MOTORE</h2><span class="badge strong">ONLINE</span></div>
  <div class="analysis-grid" style="padding:12px">${ac("Versione","V3","08/07/2026")}${ac("Cache","Fresh","service worker")}${ac("Dataset","Demo","da sostituire con API")}${ac("Calibrazione","Pronta","backtest da collegare")}</div>
 </section>
 <section class="panel"><div class="panel-head"><h2>PRIORITÀ SVILUPPO</h2></div>
 <div class="explain"><strong>1 · Dati reali</strong><p>Fixture, statistiche, xG, assenze e quote.</p></div>
 <div class="explain"><strong>2 · Modello</strong><p>Poisson/xG + rating dinamico + calibrazione.</p></div>
 <div class="explain"><strong>3 · Valutazione</strong><p>Brier score, log loss, ROI simulato e storico dei segnali.</p></div>
 </section></main>`);
}
function render(){
 if(state.page==="dashboard") dashboard(); else if(state.page==="matches") matches(); else if(state.page==="analysis") analysis(); else if(state.page==="teams") teams(); else more();
}
render();
if("serviceWorker" in navigator) window.addEventListener("load",()=>navigator.serviceWorker.register("./sw.js?v=3.0.0",{updateViaCache:"none"}).catch(()=>{}));