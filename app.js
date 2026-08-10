// SPACE16154 — PRE-03:02 GRAPHICS + FUNCTIONAL MODEL UPDATE
// Grafica base: ultimo pacchetto pre-03:02 (V4.0 cache-bust family).
// Nessun logo.svg: l'identità resta testuale come nella grafica buona.

const CONFIG={
  version:"4.1.2-trend-score",
  leagues:["Serie A","Premier League","La Liga","Bundesliga","Ligue 1"],
  weights:{threat:.22,defense:.20,form:.20,opponent:.18,pressing:.14,availability:.06},
  thresholds:{confidence:75,value:10,form:12}
};

const RAW_TEAMS=[
 {id:"milan",name:"Milan",code:"MIL",cls:"milan",league:"Serie A",played:12,last5:["W","W","D","W","W"],trend:[72,74,75,77,79],
  raw:{xg:1.84,xga:.94,third:64,shotq:.13,shots:14.2,oppShots:9.1,form:2.55,opp:74,ppda:8.7,highRec:8.8,counter:78,availability:91}},
 {id:"roma",name:"Roma",code:"ROM",cls:"roma",league:"Serie A",played:12,last5:["W","D","L","W","D"],trend:[70,69,68,67,68],
  raw:{xg:1.21,xga:1.37,third:47,shotq:.10,shots:10.1,oppShots:13.5,form:1.68,opp:78,ppda:12.4,highRec:5.9,counter:61,availability:84}},
 {id:"inter",name:"Inter",code:"INT",cls:"inter",league:"Serie A",played:12,last5:["W","W","W","D","W"],trend:[78,80,81,83,84],
  raw:{xg:2.02,xga:.82,third:72,shotq:.14,shots:16.1,oppShots:8.3,form:2.68,opp:76,ppda:8.1,highRec:9.1,counter:81,availability:94}},
 {id:"napoli",name:"Napoli",code:"NAP",cls:"napoli",league:"Serie A",played:12,last5:["W","D","W","W","L"],trend:[72,73,74,75,76],
  raw:{xg:1.71,xga:1.05,third:61,shotq:.12,shots:13.5,oppShots:11.2,form:2.30,opp:73,ppda:10.4,highRec:7.0,counter:72,availability:88}},
 {id:"arsenal",name:"Arsenal",code:"ARS",cls:"arsenal",league:"Premier League",played:12,last5:["W","W","D","W","W"],trend:[75,77,78,80,81],
  raw:{xg:1.92,xga:.93,third:68,shotq:.13,shots:15.1,oppShots:9.5,form:2.48,opp:77,ppda:8.7,highRec:8.6,counter:78,availability:89}},
 {id:"chelsea",name:"Chelsea",code:"CHE",cls:"chelsea",league:"Premier League",played:12,last5:["D","W","W","L","W"],trend:[71,72,74,73,75],
  raw:{xg:1.55,xga:1.18,third:57,shotq:.11,shots:12.8,oppShots:11.9,form:2.04,opp:75,ppda:10.1,highRec:7.1,counter:70,availability:87}},
 {id:"barcelona",name:"Barcelona",code:"BAR",cls:"barcelona",league:"La Liga",played:12,last5:["W","W","W","W","D"],trend:[78,80,81,83,84],
  raw:{xg:2.21,xga:.91,third:75,shotq:.15,shots:17.0,oppShots:9.4,form:2.66,opp:75,ppda:8.3,highRec:9.0,counter:82,availability:90}},
 {id:"sevilla",name:"Sevilla",code:"SEV",cls:"sevilla",league:"La Liga",played:12,last5:["L","W","D","L","W"],trend:[65,66,65,67,66],
  raw:{xg:1.18,xga:1.52,third:44,shotq:.09,shots:9.7,oppShots:14.2,form:1.42,opp:73,ppda:13.0,highRec:5.4,counter:58,availability:85}},
 {id:"bayern",name:"Bayern",code:"BAY",cls:"bayern",league:"Bundesliga",played:12,last5:["W","W","D","W","W"],trend:[79,81,82,84,85],
  raw:{xg:2.22,xga:.98,third:77,shotq:.15,shots:17.4,oppShots:9.7,form:2.58,opp:72,ppda:8.0,highRec:9.6,counter:84,availability:92}},
 {id:"leverkusen",name:"Leverkusen",code:"LEV",cls:"leverkusen",league:"Bundesliga",played:12,last5:["W","D","W","W","D"],trend:[77,78,79,80,81],
  raw:{xg:1.85,xga:1.07,third:66,shotq:.12,shots:14.8,oppShots:10.6,form:2.38,opp:74,ppda:9.2,highRec:8.1,counter:77,availability:89}},
 {id:"psg",name:"PSG",code:"PSG",cls:"psg",league:"Ligue 1",played:12,last5:["W","W","W","W","D"],trend:[80,82,83,85,86],
  raw:{xg:2.26,xga:.91,third:79,shotq:.15,shots:17.6,oppShots:9.4,form:2.65,opp:70,ppda:8.3,highRec:9.2,counter:83,availability:93}},
 {id:"lyon",name:"Lyon",code:"LYO",cls:"lyon",league:"Ligue 1",played:12,last5:["D","W","L","D","W"],trend:[68,69,68,70,71],
  raw:{xg:1.42,xga:1.33,third:52,shotq:.10,shots:11.8,oppShots:13.0,form:1.83,opp:71,ppda:11.8,highRec:6.2,counter:64,availability:86}}
];

const MATCH_INPUTS=[
 {id:"milan-roma",home:"milan",away:"roma",time:"18:00",league:"Serie A",venue:"San Siro",weather:"16°C · Sereno",referee:"D. Orsato",last:"Milan 3–1 Roma · 14/01/2025",odds:{one:1.82,x:3.65,two:4.70,under:2.00,over:1.82,gg:1.75,ng:2.05},
  abs:[["Milan",[["R. Leão","In dubbio","chiave"],["Thiaw","Out","titolare"],["Loftus-Cheek","Out","rotazione"]]],["Roma",[["Dybala","In dubbio","chiave"],["Smalling","Out","titolare"],["Azmoun","Out","rotazione"]]]]},
 {id:"arsenal-chelsea",home:"arsenal",away:"chelsea",time:"18:30",league:"Premier League",venue:"Emirates Stadium",weather:"14°C · Coperto",referee:"M. Oliver",last:"Chelsea 1–1 Arsenal",odds:{one:1.92,x:3.55,two:4.10,under:2.05,over:1.78,gg:1.68,ng:2.12},
  abs:[["Arsenal",[["Saka","In dubbio","chiave"]]],["Chelsea",[["James","Out","titolare"]]]]},
 {id:"barcelona-sevilla",home:"barcelona",away:"sevilla",time:"20:00",league:"La Liga",venue:"Estadi Olímpic",weather:"20°C · Sereno",referee:"J. Sánchez",last:"Sevilla 1–3 Barcelona",odds:{one:1.45,x:4.60,two:6.20,under:2.55,over:1.52,gg:1.70,ng:2.08},
  abs:[["Barcelona",[["Pedri","In dubbio","chiave"]]],["Sevilla",[["Badé","Out","titolare"]]]]},
 {id:"bayern-leverkusen",home:"bayern",away:"leverkusen",time:"20:30",league:"Bundesliga",venue:"Allianz Arena",weather:"12°C · Coperto",referee:"F. Zwayer",last:"Leverkusen 1–1 Bayern",odds:{one:1.72,x:4.10,two:4.20,under:2.75,over:1.45,gg:1.55,ng:2.40},
  abs:[["Bayern",[["Musiala","In dubbio","chiave"]]],["Leverkusen",[["Frimpong","In dubbio","titolare"]]]]},
 {id:"psg-lyon",home:"psg",away:"lyon",time:"21:00",league:"Ligue 1",venue:"Parc des Princes",weather:"15°C · Sereno",referee:"C. Turpin",last:"Lyon 1–4 PSG",odds:{one:1.50,x:4.45,two:5.80,under:2.65,over:1.48,gg:1.65,ng:2.18},
  abs:[["PSG",[["Marquinhos","In dubbio","chiave"]]],["Lyon",[["Lacazette","In dubbio","chiave"]]]]}
];

const clamp=(v,a=0,b=100)=>Math.max(a,Math.min(b,v));
const norm=(v,a,b)=>clamp((v-a)/(b-a)*100);
const inv=(v,a,b)=>100-norm(v,a,b);
const avg=a=>a.reduce((x,y)=>x+y,0)/a.length;
const W=(pairs)=>pairs.reduce((s,[v,w])=>s+v*w,0)/pairs.reduce((s,[,w])=>s+w,0);
const R=Math.round;

function buildTeam(t){
 const r=t.raw;
 const m={
   threat:R(W([[norm(r.xg,.7,2.4),.30],[norm(r.third,35,82),.22],[norm(r.shotq,.07,.16),.20],[norm(r.shots,7,19),.16],[norm(r.highRec,3,11),.12]])),
   defense:R(W([[inv(r.xga,.65,1.75),.48],[inv(r.oppShots,7,16),.32],[norm(r.availability,70,100),.20]])),
   form:R(norm(r.form,.8,2.8)),
   opponent:R(norm(r.opp,58,84)),
   pressing:R(W([[inv(r.ppda,7,15),.45],[norm(r.highRec,4,11),.30],[norm(r.counter,50,90),.25]])),
   availability:R(r.availability)
 };
 const score=R(m.threat*CONFIG.weights.threat+m.defense*CONFIG.weights.defense+m.form*CONFIG.weights.form+m.opponent*CONFIG.weights.opponent+m.pressing*CONFIG.weights.pressing+m.availability*CONFIG.weights.availability);
 return {...t,m,score};
}
const TEAMS=RAW_TEAMS.map(buildTeam),TEAM=Object.fromEntries(TEAMS.map(t=>[t.id,t]));

function probs(h,a){
 const d=(h.score-a.score)/13;
 const e1=Math.exp(d), ex=Math.exp(-.65-Math.abs(d)*.1), e2=Math.exp(-d), s=e1+ex+e2;
 let one=R(e1/s*100),x=R(ex/s*100); let two=100-one-x;
 const over=R(clamp(42+(h.m.threat+a.m.threat-135)*.27-(h.m.defense+a.m.defense-135)*.08,30,76));
 const gg=R(clamp(42+(h.m.threat+a.m.threat-130)*.30-(h.m.defense+a.m.defense-130)*.10,30,78));
 return {one,x,two,over,under:100-over,gg,ng:100-gg};
}
function fav(p){return [["1",p.one],["X",p.x],["2",p.two]].sort((a,b)=>b[1]-a[1])[0]}
const implied=o=>100/o;
function signalData(mi,h,a,p){
 const f=fav(p);
 const dir=CONFIG.weights;
 const diffs=["threat","defense","form","opponent","pressing","availability"].map(k=>h.m[k]-a.m[k]);
 const agree=diffs.filter(v=>v*(h.score-a.score)>=0).length/6*100;
 const conf=R(clamp((f[1]-33)*1.05 + avg(diffs.map(Math.abs))*2.0 + agree*.28));
 const oddKey=f[0]==="1"?"one":f[0]==="X"?"x":"two";
 const edge=R(f[1]-implied(mi.odds[oddKey]));
 const formEdge=R(Math.abs(h.m.form-a.m.form));
 const sig=[];
 if(conf>=CONFIG.thresholds.confidence) sig.push({type:"Confidence",kind:"confidence",score:conf,pick:f[0],prob:f[1],reason:"Più famiglie di indicatori importanti puntano nella stessa direzione."});
 if(edge>=CONFIG.thresholds.value) sig.push({type:"Value",kind:"value",score:edge,pick:f[0],prob:f[1],reason:`La stima del modello supera di circa ${edge} punti la probabilità implicita nella quota demo.`});
 if(formEdge>=CONFIG.thresholds.form) sig.push({type:"Forma",kind:"form",score:formEdge,pick:f[0],prob:f[1],reason:`Il differenziale di forma recente, già pesata per gli avversari, è pari a ${formEdge} punti.`});
 return {confidence:conf,value:edge,formEdge,signals:sig};
}
const MATCHES=MATCH_INPUTS.map(mi=>{
 const h=TEAM[mi.home],a=TEAM[mi.away],p=probs(h,a),s=signalData(mi,h,a,p);
 return {...mi,h,a,p,...s};
});

const INFO={
 threat:"Valuta la capacità di creare occasioni pericolose. Combina xG, qualità tiro, produzione nell'ultimo terzo, volume offensivo e recuperi alti.",
 defense:"Valuta la solidità con cui la squadra limita occasioni e pressione avversaria. Combina xGA, tiri concessi e disponibilità difensiva.",
 form:"Forma recente già corretta per la forza degli avversari affrontati: una prestazione contro un avversario forte pesa di più.",
 opponent:"Misura la qualità media degli avversari affrontati e serve a contestualizzare le prestazioni recenti.",
 pressing:"Combina PPDA, recuperi alti e contro-pressione. Il PPDA non viene letto isolatamente.",
 availability:"Valuta disponibilità e impatto delle assenze: un giocatore chiave pesa più di una rotazione."
};
const TECH_INFO={
 "xG":"Expected Goals: qualità e quantità delle occasioni create.",
 "xGA":"Expected Goals Against: qualità delle occasioni concesse.",
 "Ultimo terzo":"Presenza e qualità delle azioni portate nelle zone avanzate.",
 "Qualità tiro":"Qualità media delle conclusioni; evita di premiare soltanto il volume.",
 "PPDA":"Passaggi concessi all'avversario prima di un'azione difensiva. Più basso tende a indicare pressione più aggressiva."
};
const MACROS=[["threat","Threat Creation"],["defense","Defense Stability"],["form","Forma"],["opponent","Opponent Strength"],["pressing","Pressing / PPDA"],["availability","Availability"]];

const crest=(c,cl="")=>`<div class="crest ${cl}"><span>${c}</span></div>`;
const info=(t,x)=>`<button class="info" aria-label="Info ${t}" data-info="${encodeURIComponent(x)}">i</button>`;
const nav=(id,ic,label,a)=>`<button class="nav-item ${a===id?"active":""}" data-nav="${id}"><span class="nav-icon">${ic}</span><span>${label}</span></button>`;
function shell(a="dashboard"){
 return `<header class="topbar"><div class="top-spacer"></div><div class="brand"><div class="brand-name">SPACE16154</div><div class="brand-sub">FOOTBALL INTELLIGENCE</div></div><div class="engine"><i></i></div></header>
 <main id="main"></main>
 <nav class="bottom-nav">${nav("dashboard","⌂","Dashboard",a)}${nav("matches","□","Matches",a)}${nav("analysis","◇","Analisi",a)}${nav("signals","◎","Top Signals",a)}${nav("more","•••","Altro",a)}</nav>`;
}
function stat(t,v,s,i,p,g){return `<button class="stat-card" ${g?`data-nav="${g}"`:""}><div class="stat-top"><span>${t}</span><b>${i}</b></div><strong>${v}</strong><small>${s}</small><div class="progress"><i style="width:${p}%"></i></div></button>`}
function pred(a,b,c,d,green=true){return `<div class="pred-card ${green?"pred-best":""}"><small>${a}</small><span>${b}</span><strong>${c}</strong><em>${d}%</em></div>`}
function topOutcome(m){const f=fav(m.p);return f}
function featured(m=MATCHES[0]){
 const f=topOutcome(m),g=m.p.gg>=m.p.ng?["GOL",m.p.gg]:["NO GOL",m.p.ng],o=m.p.over>=m.p.under?["OVER 2.5",m.p.over]:["UNDER 2.5",m.p.under];
 return `<section class="panel"><div class="section-head"><h2>☆ &nbsp; MATCH IN EVIDENZA</h2><span>${m.league}</span></div>
 <div class="match-hero"><div class="club">${crest(m.h.code,m.h.cls)}<strong>${m.h.name}</strong></div><div class="match-time"><b>${m.time}</b><span>OGGI</span><em>VS</em></div><div class="club">${crest(m.a.code,m.a.cls)}<strong>${m.a.name}</strong></div></div>
 <div class="prediction-grid">${pred("1X2","ESITO PIÙ PROBABILE",f[0],f[1])}${pred("GOL / NO GOL","ESITO PIÙ PROBABILE",g[0],g[1])}${pred("OVER / UNDER 2.5","ESITO PIÙ PROBABILE",o[0],o[1])}</div>
 <button class="primary-btn" data-match="${m.id}">VAI ALL'ANALISI COMPLETA <span>›</span></button></section>`;
}
function upcoming(){
 return `<section class="panel"><div class="section-head"><h2>PROSSIME PARTITE</h2><button class="text-btn" data-nav="matches">VEDI TUTTE ›</button></div>${MATCHES.slice(1).map(m=>`<button class="fixture" data-match="${m.id}"><div class="fixture-time"><b>${m.time}</b><small>OGGI</small></div><div class="fixture-team">${crest(m.h.code,m.h.cls)}<span>${m.h.name}</span></div><b class="vs">VS</b><div class="fixture-team away"><span>${m.a.name}</span>${crest(m.a.code,m.a.cls)}</div><span class="competition">${m.league}</span><span class="chev">›</span></button>`).join("")}</section>`;
}
function signalLabel(s){return s.type==="Confidence"?"ALTA CONVERGENZA":s.type==="Value"?"VALUE / EDGE":"FORMA"}
function signalCard(s,m){
 return `<article class="signal ${s.kind}"><div class="signal-type">${signalLabel(s)} ${info(s.type,s.reason)}</div><div class="signal-main">${s.pick}</div><div class="signal-match">${m.h.name} vs ${m.a.name}</div><div class="signal-bottom"><span>${s.type==="Value"?"EDGE":s.type==="Forma"?"FORMA":"CONFIDENCE"}</span><strong>${s.type==="Value"?"+"+s.score+"%":s.type==="Forma"?"+"+s.score:s.score+"%"}</strong></div></article>`;
}
function dashboardSignalMatch(m){
 return `<button class="dash-signal-match" data-match="${m.id}">
   <div class="dash-signal-match-head">
     <div><b>${m.h.name} — ${m.a.name}</b><small>${m.league} · ${topOutcome(m)[0]} · ${topOutcome(m)[1]}%</small></div>
     <span>›</span>
   </div>
   <div class="dash-signal-lines">
     ${m.signals.map(s=>`<div class="dash-signal-line ${s.kind}">
       <span class="dash-signal-dot"></span>
       <b>${signalLabel(s)}</b>
       <strong>${s.type==="Value"?"+"+s.score+"%":s.type==="Forma"?"+"+s.score:s.score+"%"}</strong>
     </div>`).join("")}
   </div>
 </button>`;
}
function dashboard(){
 const all=MATCHES.flatMap(m=>m.signals);
 const conf=all.filter(s=>s.type==="Confidence");
 document.querySelector("#main").innerHTML=`<div class="page"><div class="page-title-row"><div><div class="eyebrow">PANORAMICA</div><h1>DASHBOARD</h1><p>Il quadro sintetico prima di entrare nel dettaglio.</p></div><button class="date-btn">OGGI⌄</button></div>
 <div class="stats">${stat("PARTITE OGGI",MATCHES.length,"Vai alla lista completa","□",70,"matches")}${stat("SEGNALI",all.length,"Opportunità rilevate","◎",Math.min(100,all.length*12),"signals")}${stat("CONFIDENCE MEDIA",conf.length?R(avg(conf.map(s=>s.score)))+"%":"—","Coerenza dei segnali","◉",conf.length?R(avg(conf.map(s=>s.score))):0,"signals")}${stat("DATA QUALITY","96%","Copertura demo","✓",96,"more")}</div>
 ${featured()}${upcoming()}
 <section class="panel"><div class="section-head"><h2>◎ &nbsp; TOP SIGNALS</h2><button class="text-btn" data-nav="signals">VEDI TUTTI ›</button></div><div class="dashboard-top-signals">${MATCHES.filter(m=>m.signals.length).slice(0,3).map(m=>dashboardSignalMatch(m)).join("")||`<div class="empty-note">Nessun segnale sopra soglia.</div>`}</div></section></div>`;
 bind();
}
function matches(){
 document.querySelector("#main").innerHTML=`<div class="page"><div class="eyebrow">CALENDARIO</div><h1>MATCHES</h1><p class="subtitle">Scegli un campionato e poi una partita.</p>
 <div class="league-stack">${CONFIG.leagues.map((l,i)=>`<button class="league-row ${i===0?"active":""}" data-league="${l}"><span>${l}</span><b>${MATCHES.filter(m=>m.league===l).length}</b><em>›</em></button>`).join("")}</div>
 <section class="panel"><div class="section-head"><h2>PARTITE DEL GIORNO</h2><span id="matchCount">${MATCHES.length} disponibili</span></div><div id="matchList">${matchRows(MATCHES)}</div></section></div>`;
 bind();
 document.querySelectorAll("[data-league]").forEach(b=>b.onclick=()=>{document.querySelectorAll("[data-league]").forEach(x=>x.classList.remove("active"));b.classList.add("active");const arr=MATCHES.filter(m=>m.league===b.dataset.league);document.querySelector("#matchList").innerHTML=matchRows(arr);document.querySelector("#matchCount").textContent=arr.length+" disponibili";bindMatchesOnly()});
}
function matchRows(arr){return arr.map(m=>`<button class="match-list" data-match="${m.id}"><span>${m.time}</span><div>${crest(m.h.code,m.h.cls)}<b>${m.h.name}</b></div><em>VS</em><div><b>${m.a.name}</b>${crest(m.a.code,m.a.cls)}</div><strong>${topOutcome(m)[1]}%</strong><small>${m.league} · ${m.signals.length?m.signals.map(s=>s.type).join(" · "):"Nessun Top Signal"}</small></button>`).join("")}
function macroRows(t){return MACROS.map(([k,l])=>`<div class="profile-row"><span>${l} ${info(l,INFO[k])}</span><b>${t.m[k]}</b><div class="profile-bar"><i style="width:${t.m[k]}%"></i></div></div>`).join("")}
function analysis(){
 const league=CONFIG.leagues[0];
 document.querySelector("#main").innerHTML=`<div class="page"><div class="eyebrow">INTELLIGENCE CENTER</div><h1>ANALISI</h1><p class="subtitle">Classifica, squadre e profilo del modello.</p>
 <div class="league-stack analysis-leagues">${CONFIG.leagues.map((l,i)=>`<button class="league-row ${i===0?"active":""}" data-analysis-league="${l}"><span>${l}</span><b>${TEAMS.filter(t=>t.league===l).length}</b><em>›</em></button>`).join("")}</div>
 <div id="analysisLeague"></div></div>`;
 renderLeague(league);bind();
 document.querySelectorAll("[data-analysis-league]").forEach(b=>b.onclick=()=>{document.querySelectorAll("[data-analysis-league]").forEach(x=>x.classList.remove("active"));b.classList.add("active");renderLeague(b.dataset.analysisLeague);bindTeamButtons()});
}
function formDots(xs){return `<span class="form-dots">${xs.map(x=>`<i class="${x.toLowerCase()}">${x}</i>`).join("")}</span>`}
function trendCard(t){
 const values=t.trend.slice(-5);
 const w=260,h=100,padX=14,padY=16;
 const pts=values.map((v,i)=>{
   const x=padX+i*((w-padX*2)/(Math.max(values.length-1,1)));
   const y=h-padY-(v/100)*(h-padY*2);
   return [x,y,v];
 });
 const poly=pts.map(p=>`${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(" ");
 const delta=values.at(-1)-values[0];
 const cls=delta>1?"up":delta<-1?"down":"flat";
 const label=cls==="up"?"Trend positivo":cls==="down"?"Trend negativo":"Trend stabile";
 const arrow=cls==="up"?"↑":cls==="down"?"↓":"→";
 return `<button class="trend-card2 trend-clickable ${cls}" data-team="${t.id}">
   <div class="trend-card-head"><div><b>${t.name}</b><span class="trend-delta ${cls}">${arrow} ${delta>0?"+":""}${delta} <small>negli ultimi 5 periodi</small></span></div><strong>${t.score}</strong></div>
   <div class="trend-chart">
     <svg viewBox="0 0 ${w} ${h}" role="img" aria-label="Trend Model Score ${t.name}">
       <line x1="${padX}" y1="${h-padY}" x2="${w-padX}" y2="${h-padY}" class="axis"></line>
       <line x1="${padX}" y1="${h/2}" x2="${w-padX}" y2="${h/2}" class="grid"></line>
       <polyline points="${poly}" class="trend-line ${cls}"></polyline>
       ${pts.map(p=>`<circle cx="${p[0]}" cy="${p[1]}" r="3.8" class="trend-point ${cls}"></circle><text x="${p[0]}" y="${Math.max(10,p[1]-8)}" text-anchor="middle" class="trend-value">${p[2]}</text>`).join("")}
       ${pts.map((p,i)=>`<text x="${p[0]}" y="${h-2}" text-anchor="middle" class="trend-label">${i===pts.length-1?"Ora":"-"+(pts.length-1-i)}</text>`).join("")}
     </svg>
   </div>
   <span class="trend-pill ${cls}">${arrow} ${label}</span>
 </button>`;
}
function renderLeague(l){
 const arr=TEAMS.filter(t=>t.league===l).sort((a,b)=>b.score-a.score);
 document.querySelector("#analysisLeague").innerHTML=`<section class="panel"><div class="section-head"><h2>CLASSIFICA / SQUADRE</h2><span>MODEL RATING</span></div><div class="rank-head2"><span>#</span><span>Squadra</span><span>P</span><span>Forma</span><span>Rating</span></div>${arr.map((t,i)=>`<button class="rank-row2" data-team="${t.id}"><span>${i+1}</span><div>${crest(t.code,t.cls)}<b>${t.name}</b></div><span>${t.played}</span>${formDots(t.last5)}<strong>${t.score}</strong></button>`).join("")}</section>
 <section class="panel"><div class="section-head"><h2>TREND MODEL SCORE</h2><span>ULTIMI PERIODI</span></div><div class="trend-grid2">${arr.slice(0,2).map(t=>trendCard(t)).join("")}</div><div class="trend-note">ⓘ Il Trend Model Score mostra come cambia la valutazione del modello nel tempo.</div></section>`;
}
function teamProfile(id){
 const t=TEAM[id];
 document.querySelector("#main").innerHTML=`<div class="page"><button class="back-btn" data-nav="analysis">‹ ANALISI</button><div class="eyebrow">PROFILO MODELLO</div><h1>${t.name}</h1><p class="subtitle">${t.league} · dati demo coerenti</p>
 <section class="panel"><div class="section-head"><h2>MODEL RATING</h2><span>${t.score}/100</span></div><div class="team-score-big">${t.score}</div><div class="profile-list">${macroRows(t)}</div></section>
 <section class="panel"><div class="section-head"><h2>STATISTICHE TECNICHE</h2></div><div class="technical-grid">${[["xG",t.raw.xg.toFixed(2)],["xGA",t.raw.xga.toFixed(2)],["Ultimo terzo",R(t.raw.third)],["Qualità tiro",t.raw.shotq.toFixed(2)],["PPDA",t.raw.ppda.toFixed(1)]].map(x=>`<div><small>${x[0]}</small><b>${x[1]}</b></div>`).join("")}</div></section>
 <section class="panel"><div class="section-head"><h2>ULTIME 5</h2></div><div class="form-profile">${formDots(t.last5)}</div></section></div>`;
 bind();
}
function technical(m){return [["xG",m.h.raw.xg.toFixed(2),m.a.raw.xg.toFixed(2)],["xGA",m.h.raw.xga.toFixed(2),m.a.raw.xga.toFixed(2)],["Ultimo terzo",R(m.h.raw.third),R(m.a.raw.third)],["Qualità tiro",m.h.raw.shotq.toFixed(2),m.a.raw.shotq.toFixed(2)],["PPDA",m.h.raw.ppda.toFixed(1),m.a.raw.ppda.toFixed(1)]]}
function matchDetail(id){
 const m=MATCHES.find(x=>x.id===id); if(!m){route("matches");return}
 const f=topOutcome(m),g=m.p.gg>=m.p.ng?["GOL",m.p.gg]:["NO GOL",m.p.ng],o=m.p.over>=m.p.under?["OVER",m.p.over]:["UNDER",m.p.under];
 const diffs=MACROS.map(([k,l])=>[l,m.h.m[k]-m.a.m[k]]).sort((a,b)=>Math.abs(b[1])-Math.abs(a[1]));
 document.querySelector("#main").innerHTML=`<div class="page analysis-page"><button class="back-btn" data-nav="matches">‹ MATCHES</button><div class="eyebrow">MATCH ANALYSIS</div><h1>${m.h.name} — ${m.a.name}</h1><p class="subtitle">${m.league} · ${m.time} · dati demo</p>
 <section class="panel probabilities"><div class="section-head"><h2>PROBABILITÀ DEL MODELLO ${info("Probabilità","Le percentuali derivano dal Model Score e dalle macroaree; non sono quote.")}</h2></div><div class="prediction-grid">${pred("1X2","PIÙ PROBABILE",f[0],f[1])}${pred("GOL / NO GOL","PIÙ PROBABILE",g[0],g[1])}${pred("OVER / UNDER 2.5","PIÙ PROBABILE",o[0],o[1])}</div></section>
 <section class="panel model-card"><div class="section-head"><h2>ANALISI DEL MODELLO</h2><div class="badges">${m.signals.map(s=>`<span class="badge ${s.kind==="value"?"gold":s.kind==="form"?"blue":"green"}">${s.type.toUpperCase()}</span>`).join("")||`<span class="badge muted-badge">NESSUN TOP SIGNAL</span>`}</div></div>
 <div class="model-score-compare"><div>${crest(m.h.code,m.h.cls)}<b>${m.h.name}</b><strong>${m.h.score}</strong></div><div><small>MODEL SCORE</small><em>${m.h.score-m.a.score>=0?"+":""}${m.h.score-m.a.score}</em></div><div>${crest(m.a.code,m.a.cls)}<b>${m.a.name}</b><strong>${m.a.score}</strong></div></div>
 <div class="macro-table"><div class="macro-head2"><span>MACROAREA</span><b>${m.h.code}</b><b>DIFF.</b><b>${m.a.code}</b></div>${MACROS.map(([k,l])=>`<div class="macro-row2"><span>${l} ${info(l,INFO[k])}</span><b>${m.h.m[k]}</b><em class="${m.h.m[k]-m.a.m[k]>=0?"pos":"neg"}">${m.h.m[k]-m.a.m[k]>=0?"+":""}${m.h.m[k]-m.a.m[k]}</em><b>${m.a.m[k]}</b></div>`).join("")}</div>
 <div class="model-note"><b>PERCHÉ IL MODELLO VEDE ${m.h.score>=m.a.score?m.h.name.toUpperCase():m.a.name.toUpperCase()} AVANTI?</b>${diffs.slice(0,4).map(d=>`<div class="why-line"><span>${d[0]}</span><strong class="${d[1]>=0?"pos":"neg"}">${d[1]>=0?"+":""}${d[1]}</strong></div>`).join("")}</div></section>
 <section class="panel"><div class="section-head"><h2>DATI TECNICI — CONFRONTO</h2></div><div class="compare-head"><span>INDICATORE</span><b>${m.h.code}</b><b>${m.a.code}</b></div>${technical(m).map(r=>`<div class="compare-row"><span>${r[0]} ${info(r[0],TECH_INFO[r[0]])}</span><b>${r[1]}</b><b>${r[2]}</b></div>`).join("")}</section>
 <section class="panel"><div class="section-head"><h2>ASSENZE PRINCIPALI</h2></div><div class="absence-grid">${m.abs.map(a=>`<div><b>${a[0]}</b>${a[1].map(p=>`<p><strong>${p[0]}</strong><span class="${p[1]==="Out"?"out":"doubt"}">${p[1]}</span><small>${p[2]}</small></p>`).join("")}</div>`).join("")}</div></section>
 <section class="panel"><div class="section-head"><h2>INFORMAZIONI PARTITA</h2></div><div class="info-grid2"><div><small>Stadio</small><b>${m.venue}</b></div><div><small>Meteo</small><b>${m.weather}</b></div><div><small>Arbitro</small><b>${m.referee}</b></div><div><small>Ultimo incontro</small><b>${m.last}</b></div></div></section></div>`;
 bind();
}
let SIG={type:"Tutti",league:"Tutti"};
function allSignals(){return MATCHES.flatMap(m=>m.signals.map(s=>({...s,m})))}
function signalsPage(){
 const all=allSignals(),c=t=>all.filter(x=>x.type===t).length;
 document.querySelector("#main").innerHTML=`<div class="page"><div class="eyebrow">SIGNAL CENTER</div><h1>TOP SIGNALS</h1><p class="subtitle">Solo segnali che superano le soglie del modello.</p>
 <div class="signal-summary2"><div><strong>${all.length}</strong><small>Segnali oggi</small></div><div class="c"><strong>${c("Confidence")}</strong><small>Confidence</small></div><div class="v"><strong>${c("Value")}</strong><small>Value</small></div><div class="f"><strong>${c("Forma")}</strong><small>Forma</small></div></div>
 <div class="top-filter-grid"><button class="filter active" data-sig-type="Tutti">Tutti</button><button class="filter confidence" data-sig-type="Confidence">Confidence</button><button class="filter value" data-sig-type="Value">Value</button><button class="filter form" data-sig-type="Forma">Forma</button></div>
 <div class="league-stack compact">${["Tutti",...CONFIG.leagues].map((l,i)=>`<button class="league-row ${i===0?"active":""}" data-sig-league="${l}"><span>${l==="Tutti"?"Tutti i campionati":l}</span><em>›</em></button>`).join("")}</div>
 <section class="panel"><div class="section-head"><h2>SEGNALI</h2><span id="sigCount"></span></div><div id="sigList"></div></section></div>`;
 SIG={type:"Tutti",league:"Tutti"};renderSig();bind();
 document.querySelectorAll("[data-sig-type]").forEach(b=>b.onclick=()=>{document.querySelectorAll("[data-sig-type]").forEach(x=>x.classList.remove("active"));b.classList.add("active");SIG.type=b.dataset.sigType;renderSig();bindMatchesOnly()});
 document.querySelectorAll("[data-sig-league]").forEach(b=>b.onclick=()=>{document.querySelectorAll("[data-sig-league]").forEach(x=>x.classList.remove("active"));b.classList.add("active");SIG.league=b.dataset.sigLeague;renderSig();bindMatchesOnly()});
}
function renderSig(){
 const matches=MATCHES.filter(m=>{
   const selected=m.signals.filter(s=>SIG.type==="Tutti"||s.type===SIG.type);
   return selected.length && (SIG.league==="Tutti"||m.league===SIG.league);
 });
 document.querySelector("#sigCount").textContent=matches.length+" partite";
 document.querySelector("#sigList").innerHTML=matches.length?matches.map(m=>{
   const selected=m.signals.filter(s=>SIG.type==="Tutti"||s.type===SIG.type);
   return `<button class="signal-match-card" data-match="${m.id}">
     <div class="signal-match-side">
       <div class="signal-team-codes">${crest(m.h.code,m.h.cls)}${crest(m.a.code,m.a.cls)}</div>
       <b>${m.h.name} — ${m.a.name}</b>
       <small>${m.league} · ${topOutcome(m)[0]} · ${topOutcome(m)[1]}%</small>
     </div>
     <div class="signal-match-list">
       ${selected.map(s=>`<div class="signal-match-line ${s.kind}">
         <div><span>${signalLabel(s)}</span><p>${s.reason}</p></div>
         <strong>${s.type==="Value"?"+"+s.score+"%":s.type==="Forma"?"+"+s.score:s.score+"%"}</strong>
       </div>`).join("")}
     </div>
   </button>`;
 }).join(""):`<div class="empty-note">Nessun segnale rilevante con questi filtri.</div>`;
}
const PERF={total:120,accuracy:67,avgConfidence:76,markets:[["1X2",52,68],["Under/Over",38,66],["Gol/No Gol",30,63]],signals:[["Confidence",44,73],["Value",31,65],["Forma",37,70]]};
function more(){
 document.querySelector("#main").innerHTML=`<div class="page"><div class="eyebrow">SPACE16154</div><h1>ALTRO</h1><p class="subtitle">Trasparenza e informazioni del modello.</p>
 <button class="more-row2" data-route="performance"><b>Model Performance</b><span>Storico e risultati del modello ›</span></button>
 <button class="more-row2" data-route="confidence"><b>Model Confidence</b><span>Come viene costruita la Confidence ›</span></button>
 <button class="more-row2" data-info="${encodeURIComponent("Dati simulati → indicatori → normalizzazione 0–100 → macroaree → pesi → Model Score → probabilità → Confidence / Value / Forma → Top Signals. I pesi restano congelati fino a 4–7 giornate reali.")}"><b>Metodologia</b><span>Catena matematica demo ›</span></button></div>`;
 bind();
}
function performance(){
 document.querySelector("#main").innerHTML=`<div class="page"><button class="back-btn" data-nav="more">‹ ALTRO</button><div class="eyebrow">MODEL PERFORMANCE</div><h1>PERFORMANCE</h1><p class="subtitle">Storico separato dal dettaglio partita.</p>
 <div class="perf-kpis"><div><strong>${PERF.accuracy}%</strong><small>Accuracy demo</small></div><div><strong>${PERF.total}</strong><small>Pronostici</small></div><div><strong>${PERF.avgConfidence}</strong><small>Confidence media</small></div></div>
 <section class="panel"><div class="section-head"><h2>PER MERCATO</h2></div>${PERF.markets.map(r=>`<div class="perf-row"><b>${r[0]}</b><span>${r[1]} pronostici</span><strong>${r[2]}%</strong></div>`).join("")}</section>
 <section class="panel"><div class="section-head"><h2>PER TOP SIGNAL</h2></div>${PERF.signals.map(r=>`<div class="perf-row"><b>${r[0]}</b><span>${r[1]} segnali</span><strong>${r[2]}%</strong></div>`).join("")}</section></div>`;
 bind();
}
function confidencePage(){
 document.querySelector("#main").innerHTML=`<div class="page"><button class="back-btn" data-nav="more">‹ ALTRO</button><div class="eyebrow">MODEL CONFIDENCE</div><h1>CONFIDENCE</h1><p class="subtitle">Misura la convergenza del quadro, non la probabilità dell'esito.</p><section class="panel"><div class="confidence-box"><div><span>MEDIA DEMO</span><strong>${R(avg(MATCHES.map(m=>m.confidence)))}%</strong></div><div class="big-progress"><i style="width:${R(avg(MATCHES.map(m=>m.confidence)))}%"></i></div><p>Una partita può avere una probabilità elevata ma Confidence più bassa se le macroaree non concordano.</p></div></section></div>`;bind();
}
function showInfo(t){let o=document.createElement("div");o.className="modal-backdrop";o.innerHTML=`<div class="info-modal"><button class="modal-x">×</button><div class="eyebrow">INFO</div><p>${t}</p></div>`;document.body.appendChild(o);o.querySelector(".modal-x").onclick=()=>o.remove();o.onclick=e=>{if(e.target===o)o.remove()}}
function bindMatchesOnly(){document.querySelectorAll("[data-match]").forEach(b=>b.onclick=()=>route("match",b.dataset.match))}
function bindTeamButtons(){document.querySelectorAll("[data-team]").forEach(b=>b.onclick=()=>route("team",b.dataset.team))}
function bind(){
 document.querySelectorAll("[data-nav]").forEach(b=>b.onclick=()=>route(b.dataset.nav));
 bindMatchesOnly();bindTeamButtons();
 document.querySelectorAll(".info").forEach(b=>b.onclick=e=>{e.stopPropagation();showInfo(decodeURIComponent(b.dataset.info))});
 document.querySelectorAll("[data-route]").forEach(b=>b.onclick=()=>route(b.dataset.route));
 document.querySelectorAll("[data-info]").forEach(b=>{if(!b.classList.contains("info"))b.onclick=()=>showInfo(decodeURIComponent(b.dataset.info))});
}
function route(n,id){
 document.body.innerHTML=shell(n==="match"?"matches":n==="team"?"analysis":n==="performance"||n==="confidence"?"more":n);
 if(n==="dashboard")dashboard();else if(n==="matches")matches();else if(n==="analysis")analysis();else if(n==="signals")signalsPage();else if(n==="more")more();else if(n==="match")matchDetail(id);else if(n==="team")teamProfile(id);else if(n==="performance")performance();else if(n==="confidence")confidencePage();else dashboard();
 scrollTo(0,0);
}
route("dashboard");
if("serviceWorker"in navigator)window.addEventListener("load",()=>navigator.serviceWorker.register("./sw.js?v=4.1.2-trend-score",{updateViaCache:"none"}).catch(()=>{}));
