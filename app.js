const VERSION="SPACE16154-V4-2026-08-07";
const state={page:"dashboard",selected:1,favorites:new Set(),league:null};

const DATA={
  date:new Date(),
  matches:[
    {id:1,time:"18:00",league:"Serie A",home:"Milan",away:"Roma",hc:"MIL",ac:"ROM",hcls:"mil",acls:"rom",
      p1:68,pg:71,po:64,xgH:1.84,xgA:1.21,xgaH:.94,xgaA:1.37,formH:.78,formA:.61,shotsH:14,shotsA:9,sotH:6,sotA:4,posH:58,posA:42,cornersH:6,cornersA:4,odds:1.68},
    {id:2,time:"18:30",league:"Premier League",home:"Arsenal",away:"Chelsea",hc:"ARS",ac:"CHE",hcls:"ars",acls:"che",
      p1:61,pg:66,po:59,xgH:1.71,xgA:1.36,xgaH:1.02,xgaA:1.28,formH:.74,formA:.66,shotsH:13,shotsA:11,sotH:5,sotA:4,posH:55,posA:45,cornersH:5,cornersA:5,odds:1.92},
    {id:3,time:"20:00",league:"La Liga",home:"Barcelona",away:"Sevilla",hc:"BAR",ac:"SEV",hcls:"bar",acls:"sev",
      p1:74,pg:69,po:67,xgH:2.12,xgA:.96,xgaH:.82,xgaA:1.46,formH:.86,formA:.54,shotsH:16,shotsA:8,sotH:7,sotA:3,posH:62,posA:38,cornersH:7,cornersA:3,odds:1.38},
    {id:4,time:"20:30",league:"Bundesliga",home:"Bayern",away:"Leverkusen",hc:"BAY",ac:"LEV",hcls:"bay",acls:"lev",
      p1:55,pg:63,po:58,xgH:1.92,xgA:1.68,xgaH:1.15,xgaA:1.18,formH:.72,formA:.75,shotsH:15,shotsA:13,sotH:6,sotA:6,posH:54,posA:46,cornersH:6,cornersA:6,odds:2.05}
  ]
};

const $=s=>document.querySelector(s);
const esc=s=>String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[c]));
const pct=n=>`${Math.round(n)}%`;
const crest=(code,cls)=>`<div class="crest ${cls}"><span>${code}</span></div>`;

function model(m){
  const balance=((m.xgH-m.xgA)*9)+((m.xgaA-m.xgaH)*7)+((m.formH-m.formA)*18);
  const p1=Math.max(5,Math.min(90,m.p1+balance*.55));
  const pGoals=Math.max(5,Math.min(90,m.pg+(m.xgH+m.xgA-2.4)*8));
  const pOver=Math.max(5,Math.min(90,m.po+(m.xgH+m.xgA-2.4)*9));
  const confidence=Math.round(Math.min(96,52+Math.abs(balance)*.9+(m.formH+m.formA)*9));
  const implied=100/(m.odds||2);
  const edge=Math.round(p1-implied);
  const convergence=Math.round(Math.min(98,58+
    Math.abs(m.xgH-m.xgA)*15+
    Math.abs(m.xgaA-m.xgaH)*11+
    Math.abs(m.formH-m.formA)*22+
    Math.abs(m.shotsH-m.shotsA)*1.3));
  const label=confidence>=78?"FORTE":confidence>=68?"BUONA":"MODERATA";
  const value=edge>=8;
  return {p1,pGoals,pOver,confidence,convergence,edge,implied,label,value};
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
   <div class="brand"><div class="brand-name">SPACE16154</div><div class="brand-sub">FOOTBALL INTELLIGENCE</div></div>
   <button class="icon-btn" id="statusBtn" aria-label="Stato"><span class="status-dot"></span></button>
 </header>`;
}
function shell(content){
 $("#app").innerHTML=header()+content+nav(state.page)+`<div id="toast" class="toast"></div>`;
 bind();
}
function bind(){
 document.querySelectorAll("[data-page]").forEach(b=>b.onclick=()=>{state.page=b.dataset.page;render()});
 $("#statusBtn")?.addEventListener("click",()=>toast("Motore attivo · dataset separato dall'interfaccia"));
 document.querySelectorAll("[data-open]").forEach(b=>b.onclick=()=>{state.page="analysis";state.selected=+b.dataset.open;render()});
 document.querySelectorAll("[data-league]").forEach(b=>b.onclick=()=>{state.league=b.dataset.league;state.page="matches";render()});
 document.querySelectorAll("[data-fav]").forEach(b=>b.onclick=e=>{
   e.stopPropagation();const id=+b.dataset.fav;
   state.favorites.has(id)?state.favorites.delete(id):state.favorites.add(id);
   b.textContent=state.favorites.has(id)?"★":"☆";
 });
 document.querySelectorAll("[data-back]").forEach(b=>b.onclick=()=>{state.page=b.dataset.back;render()});
 document.querySelectorAll("[data-clear]").forEach(b=>b.onclick=()=>{state.league=null;render()});
}
function toast(msg){
 const t=$("#toast"); if(!t)return;
 t.textContent=msg;t.classList.add("show");setTimeout(()=>t.classList.remove("show"),2400);
}

function stat(label,value,sub,bar,icon,target){
 return `<button class="stat stat-click" data-page="${target}" aria-label="${label}">
   <span class="stat-arrow">›</span>
   <label>${label}<b>${icon}</b></label><strong>${value}</strong><small>${sub}</small>
   <div class="bar"><i style="width:${bar}%"></i></div>
 </button>`;
}
function badge(kind,text){
 return `<span class="badge ${kind}">${text}</span>`;
}
function signalBadges(r){
 let out="";
 if(r.convergence>=75) out+=badge("strong","ALTA CONVERGENZA");
 if(r.value) out+=badge("value",`EDGE +${r.edge}%`);
 if(!out) out=badge("neutral","SEGNALE MODERATO");
 return `<div class="badges">${out}</div>`;
}

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
   ${pred("1X2","1",r.p1,"probabilità stimata")}
   ${pred("GOL / NO GOL","GOL",r.pGoals,"modello goal")}
   ${pred("OVER / UNDER","OVER 2.5",r.pOver,"modello goal")}
  </div>
  <div class="hero-meta">${signalBadges(r)}<span>Confidence ${r.confidence}%</span></div>
  <button class="primary" data-open="${m.id}">VAI ALL'ANALISI COMPLETA <span>›</span></button>
 </section>`;
}
function pred(label,pick,p,source){
 return `<div class="pred"><small>${label}</small><span class="pick">${pick}</span><span class="prob">${pct(p)}</span><span class="delta">${source}</span></div>`;
}

function signals(){
 const ranked=DATA.matches.map(m=>({m,r:model(m)})).sort((a,b)=>
   (b.r.convergence+b.r.edge)-(a.r.convergence+a.r.edge)).slice(0,3);
 return `<section class="panel"><div class="panel-head"><h2>◎ TOP SIGNALS</h2><button class="link" data-page="analysis">VEDI DETTAGLIO ›</button></div>
 <div class="signal-grid">${ranked.map((x,i)=>`<button class="signal ${x.r.value?"value":""}" data-open="${x.m.id}">
  ${signalBadges(x.r)}
  <h3>#${i+1} ${esc(x.m.home)} — ${esc(x.m.away)}</h3>
  <p>${x.r.p1>=x.r.pGoals&&x.r.p1>=x.r.pOver?"Esito 1":"Segnale goal"} · probabilità ${Math.round(x.r.p1)}%</p>
  <div class="score"><span>CONFIDENCE</span><b>${x.r.confidence}%</b></div>
  <div class="bar"><i style="width:${x.r.confidence}%"></i></div>
 </button>`).join("")}</div></section>`;
}

function dashboard(){
 const featured=DATA.matches[0];
 const avg=Math.round(DATA.matches.reduce((s,m)=>s+model(m).confidence,0)/DATA.matches.length);
 shell(`<main class="page">
  <div class="hero-row"><div><div class="eyebrow">PANORAMICA GENERALE</div><h1>DASHBOARD</h1><p class="subtitle">Segnali, qualità del dato e probabilità in un'unica vista.</p><div class="live-pill"><i class="status-dot"></i> MOTORE ATTIVO · DATI DEMO</div></div><button class="date-btn">${dateLabel()}⌄</button></div>
  <section class="stats">
   ${stat("PARTITE OGGI",DATA.matches.length,"apri il calendario",100,"▣","matches")}
   ${stat("SEGNALI",DATA.matches.filter(m=>model(m).confidence>=68).length,"apri i segnali",78,"◎","analysis")}
   ${stat("CONFIDENCE MEDIA",avg+"%","analisi del modello",avg,"◉","analysis")}
   ${stat("DATA QUALITY","96%","qualità e completezza",96,"◆","more")}
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
  <div class="team-mini">${crest(m.hc,m.hcls)}<span>${esc(m.home)}</span></div><em>—</em>
  <div class="team-mini right"><span>${esc(m.away)}</span>${crest(m.ac,m.acls)}</div>
  <strong class="confidence">${Math.round(r.p1)}%</strong>
 </button>`;
}

function leagueSection(league,matches){
 return `<section class="league-block">
  <div class="league-title"><div><span class="league-kicker">LEGA</span><h2>${league}</h2></div><span>${matches.length} ${matches.length===1?"PARTITA":"PARTITE"}</span></div>
  <div class="panel league-panel">${matches.map(matchRow).join("")}</div>
 </section>`;
}
function matches(){
 const groups=[...new Set(DATA.matches.map(m=>m.league))];
 const active=state.league;
 const shown=active?groups.filter(g=>g===active):groups;
 shell(`<main class="page"><div class="eyebrow">CALENDARIO</div><h1>MATCHES</h1><p class="subtitle">Le competizioni sono separate: entra nella singola partita per l'analisi completa.</p>
 <div class="league-nav">${groups.map(g=>`<button class="league-chip ${active===g?"active":""}" data-league="${g}">${g}</button>`).join("")}${active?`<button class="league-chip clear" data-clear="1">TUTTE LE LEGHE</button>`:""}</div>
 ${shown.map(league=>leagueSection(league,DATA.matches.filter(m=>m.league===league))).join("")}
 </main>`);
}

function factor(label,home,away,better){
 const max=Math.max(home,away,0.01);
 const hp=Math.round(home/max*100),ap=Math.round(away/max*100);
 return `<div class="factor-row">
   <div class="factor-label"><span>${label}</span><b>${home>1?home.toFixed(2):Math.round(home*100)+"%"}</b><b>${away>1?away.toFixed(2):Math.round(away*100)+"%"}</b></div>
   <div class="factor-bars"><i style="width:${hp}%"></i><i style="width:${ap}%"></i></div>
 </div>`;
}
function analysis(){
 const m=DATA.matches.find(x=>x.id===state.selected)||DATA.matches[0],r=model(m);
 const reasons=[];
 if(m.xgH>m.xgA) reasons.push(`+${(m.xgH-m.xgA).toFixed(2)} xG a favore di ${m.home}`);
 if(m.xgaH<m.xgaA) reasons.push(`+${(m.xgaA-m.xgaH).toFixed(2)} vantaggio difensivo`);
 if(m.formH>m.formA) reasons.push(`+${Math.round((m.formH-m.formA)*100)}% di forma recente`);
 if(m.posH>m.posA) reasons.push(`+${m.posH-m.posA}% di possesso medio`);
 shell(`<main class="page">
  <button class="back-link" data-back="matches">‹ TORNA ALLE PARTITE</button>
  <div class="eyebrow">MATCH ANALYSIS · ${m.league}</div>
  <h1>${esc(m.home)} — ${esc(m.away)}</h1>
  <p class="subtitle">${m.time} · Pre-match · motore V4</p>

  <section class="panel model-hero">
   <div class="panel-head"><h2>MODELLO</h2><div class="badges">${signalBadges(r)}</div></div>
   <div class="outcomes">
    <div><span>1</span><strong>${Math.round(r.p1)}%</strong><small>${m.home}</small></div>
    <div><span>X</span><strong>${Math.max(5,Math.round(100-r.p1-r.p1*.32))}%</strong><small>PAREGGIO</small></div>
    <div><span>2</span><strong>${Math.max(5,Math.round(100-r.p1-Math.max(5,100-r.p1-r.p1*.32)))}%</strong><small>${m.away}</small></div>
   </div>
   <div class="confidence-box"><span>CONFIDENCE</span><strong>${r.confidence}%</strong><i><b style="width:${r.confidence}%"></b></i><small>Coerenza degli indicatori, non probabilità aggiuntiva.</small></div>
  </section>

  <section class="panel"><div class="panel-head"><h2>PERCHÉ IL MODELLO VEDE ${esc(m.home.toUpperCase())}?</h2><span>${r.label}</span></div>
   <div class="factors">
    ${factor("xG",m.xgH,m.xgA)}
    ${factor("xGA",m.xgaH,m.xgaA)}
    ${factor("FORMA",m.formH,m.formA)}
    ${factor("TIRI",m.shotsH,m.shotsA)}
    ${factor("TIRI IN PORTA",m.sotH,m.sotA)}
   </div>
   <div class="reason-list">${reasons.map(x=>`<div>✓ <span>${x}</span></div>`).join("") || "<div>• <span>Indicatori sostanzialmente equilibrati.</span></div>"}</div>
  </section>

  <section class="analysis-grid">
   ${ac("xG",m.xgH.toFixed(2),m.xgH>m.xgA?"vantaggio casa":"equilibrio")}
   ${ac("xGA",m.xgaH.toFixed(2),m.xgaH<m.xgaA?"difesa casa migliore":"equilibrio")}
   ${ac("Forma",Math.round(m.formH*100)+"%",m.formH>m.formA?"trend casa":"trend ospite")}
   ${ac("Edge",`${r.edge>=0?"+":""}${r.edge}%`,r.value?"value potenziale":"nessun value forte")}
  </section>

  <section class="panel"><div class="panel-head"><h2>CONFRONTO DATI</h2><span>${esc(m.home)} · ${esc(m.away)}</span></div>
   <div class="compare">
    <div>Indicatore</div><div>${m.hc}</div><div>${m.ac}</div>
    <div>xG</div><div>${m.xgH.toFixed(2)}</div><div>${m.xgA.toFixed(2)}</div>
    <div>xGA</div><div>${m.xgaH.toFixed(2)}</div><div>${m.xgaA.toFixed(2)}</div>
    <div>Tiri</div><div>${m.shotsH}</div><div>${m.shotsA}</div>
    <div>Tiri in porta</div><div>${m.sotH}</div><div>${m.sotA}</div>
    <div>Possesso</div><div>${m.posH}%</div><div>${m.posA}%</div>
    <div>Corner</div><div>${m.cornersH}</div><div>${m.cornersA}</div>
   </div>
  </section>

  <section class="panel"><div class="panel-head"><h2>SPIEGAZIONE DEL SEGNALE</h2><span>trasparente</span></div>
   <div class="explain explain-large"><strong>${r.value?`Value/Edge +${r.edge}%`:"Convergenza degli indicatori"}</strong>
    <p>Il segnale combina produzione offensiva, qualità difensiva, forma, volume di tiro e fattore campo. La confidence descrive quanto questi indicatori siano coerenti tra loro.</p>
    <div class="risk"><b>⚠ RISCHIO PRINCIPALE</b><span>${m.shotsH-m.shotsA<2?"Differenza contenuta nel volume di tiri.":"La lettura dipende fortemente dal fattore campo e dalla forma recente."}</span></div>
   </div>
  </section>

  <section class="panel"><div class="panel-head"><h2>DATI E AFFIDABILITÀ</h2><span class="badge strong">96%</span></div>
   <div class="data-grid">
    ${dataItem("Fixture","Completo")}
    ${dataItem("xG / xGA","Completo")}
    ${dataItem("Forma","Completo")}
    ${dataItem("Quote","Demo")}
   </div>
  </section>
 </main>`);
}
function ac(a,b,c){return `<article class="analysis-card"><label>${a}</label><strong>${b}</strong><em>${c}</em></article>`}
function dataItem(a,b){return `<div class="data-item"><span>${a}</span><b>${b}</b></div>`}

function teams(){
 shell(`<main class="page"><div class="eyebrow">SQUADRE</div><h1>TEAM INTELLIGENCE</h1><p class="subtitle">Rating, forma, xG/xGA e confronti storici saranno collegati al motore dati.</p>
 <section class="panel"><div class="panel-head"><h2>TEAM RATING</h2><span>V4</span></div>${DATA.matches.map(m=>`<button class="match-row" data-open="${m.id}">
  <time>${m.time}<small>${m.league}</small></time><div class="team-mini">${crest(m.hc,m.hcls)}<span>${esc(m.home)}</span></div><em>VS</em><div class="team-mini right"><span>${esc(m.away)}</span>${crest(m.ac,m.acls)}</div><strong class="confidence">${Math.round(model(m).p1)}%</strong>
 </button>`).join("")}</section></main>`);
}
function more(){
 shell(`<main class="page"><div class="eyebrow">SISTEMA</div><h1>DATA & MODEL</h1><p class="subtitle">Qui confluiscono qualità del dato, modello e prossime priorità analitiche.</p>
 <section class="panel"><div class="panel-head"><h2>STATO MOTORE</h2><span class="badge strong">ONLINE</span></div>
  <div class="analysis-grid" style="padding:12px">${ac("Versione","V4","07/08/2026")}${ac("Cache","Fresh","service worker")}${ac("Dataset","Demo","API da collegare")}${ac("Calibrazione","Pronta","backtest da collegare")}</div>
 </section>
 <section class="panel"><div class="panel-head"><h2>DATA QUALITY</h2><span>96%</span></div>
  <div class="data-grid wide">${dataItem("Fixture","96% completo")}${dataItem("Statistiche","96% completo")}${dataItem("xG / xGA","96% completo")}${dataItem("Quote","Demo / non live")}</div>
 </section>
 <section class="panel"><div class="panel-head"><h2>ROADMAP ANALITICA</h2></div>
  <div class="roadmap"><div><b>01</b><span>Dati reali</span><small>fixture, statistiche, xG, assenze, quote</small></div><div><b>02</b><span>Modello</span><small>Poisson/xG, rating dinamico, calibrazione</small></div><div><b>03</b><span>Backtesting</span><small>Brier score, log loss, ROI simulato, storico segnali</small></div></div>
 </section></main>`);
}
render();
if("serviceWorker" in navigator) window.addEventListener("load",()=>navigator.serviceWorker.register("./sw.js?v=4.0.0",{updateViaCache:"none"}).catch(()=>{}));
