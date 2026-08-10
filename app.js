const MODEL={
  leagues:["Serie A","Premier League","La Liga","Bundesliga","Ligue 1"],
  teams:[
    {id:"milan",name:"Milan",code:"MIL",score:79,trend:[71,73,75,77,79],m:{threat:78,defense:74,form:82,opponent:71,pressing:77,absences:91}},
    {id:"roma",name:"Roma",code:"ROM",score:68,trend:[70,69,68,67,68],m:{threat:64,defense:67,form:61,opponent:76,pressing:62,absences:84}},
    {id:"inter",name:"Inter",code:"INT",score:84,trend:[77,79,80,82,84],m:{threat:88,defense:82,form:86,opponent:80,pressing:79,absences:93}},
    {id:"napoli",name:"Napoli",code:"NAP",score:76,trend:[72,73,74,75,76],m:{threat:79,defense:72,form:77,opponent:74,pressing:73,absences:88}}
  ],
  matches:[
    {id:"milan-roma",home:"Milan",away:"Roma",league:"Serie A",date:"Oggi · 20:45",venue:"San Siro",
      p:{one:74,x:16,two:10,under:52,over:48,gg:68,ng:32},confidence:84,value:15,form:82,
      technical:[["xG","1.84","1.12"],["xGA","0.96","1.34"],["Ultimo terzo","78","61"],["Qualità tiro","73","64"],["Pressione alta","77","62"],["PPDA","8.9","12.8"],["Tiri","15","10"],["Recuperi offensivi","9","5"]],
      absences:[["Milan","1 titolare · impatto moderato"],["Roma","2 assenze · 1 giocatore chiave"]]},
    {id:"inter-napoli",home:"Inter",away:"Napoli",league:"Serie A",date:"Domani · 18:00",venue:"San Siro",
      p:{one:61,x:23,two:16,under:44,over:56,gg:62,ng:38},confidence:78,value:11,form:76,
      technical:[["xG","1.71","1.28"],["xGA","0.88","1.21"],["Ultimo terzo","81","72"],["Qualità tiro","76","69"],["Pressione alta","79","70"],["PPDA","8.1","10.4"],["Tiri","14","12"],["Recuperi offensivi","8","6"]],
      absences:[["Inter","Nessuna assenza chiave"],["Napoli","1 titolare · impatto basso"]]},
    {id:"juventus-milan",home:"Juventus",away:"Milan",league:"Serie A",date:"Sab · 20:45",venue:"Allianz Stadium",
      p:{one:38,x:31,two:31,under:58,over:42,gg:49,ng:51},confidence:71,value:7,form:79,
      technical:[["xG","1.31","1.18"],["xGA","1.02","1.06"],["Ultimo terzo","68","74"],["Qualità tiro","67","72"],["Pressione alta","71","76"],["PPDA","10.1","8.8"],["Tiri","12","13"],["Recuperi offensivi","6","7"]],
      absences:[["Juventus","1 titolare · impatto moderato"],["Milan","Nessuna assenza chiave"]]}
  ],
  performance:{signals:127,confidence:76,hitRate:68,topRate:72}
};
const INFO={
 threat:["Threat Creation","Misura la capacità di creare occasioni pericolose attraverso qualità e quantità delle azioni offensive. È valutato insieme agli altri indicatori della macroarea, non come dato isolato."],
 defense:["Defense Stability","Misura la solidità con cui la squadra limita qualità e quantità delle occasioni concesse. È valutato insieme agli altri indicatori della macroarea, non come dato isolato."],
 form:["Forma","Rappresenta la forma recente, corretta in base alla forza degli avversari affrontati. Ogni partita pesa quindi in funzione dell'avversario."],
 opponent:["Opponent Strength","Misura la qualità degli avversari affrontati e aiuta il modello a interpretare la prestazione nel contesto corretto."],
 pressing:["Pressing / PPDA","Valuta l'intensità e l'efficacia della pressione. Il PPDA viene rielaborato dal modello insieme agli altri indicatori di pressing."],
 absences:["Assenze","Valuta l'impatto delle assenze considerando ruolo, centralità nel gioco e importanza del giocatore."]
};
const TECH={
 xG:"Expected Goals: stima la qualità delle occasioni create. Il modello lo valuta insieme agli altri indicatori offensivi.",
 xGA:"Expected Goals Against: stima la qualità delle occasioni concesse. Il modello lo valuta insieme agli altri indicatori difensivi.",
 "Ultimo terzo":"Indica quanto spesso e con quale efficacia la squadra porta il gioco nell'ultimo terzo di campo.",
 "Qualità tiro":"Valuta la pericolosità media dei tiri prodotti, insieme agli altri indicatori offensivi.",
 "Pressione alta":"Indica la capacità di disturbare e recuperare il pallone in zone avanzate.",
 PPDA:"Indica quanti passaggi può completare l'avversario prima di subire un'azione difensiva. Nel nostro modello viene rielaborato insieme agli altri indicatori di pressione.",
 Tiri:"Numero di conclusioni effettuate. È un indicatore descrittivo e non determina da solo il Model Score.",
 "Recuperi offensivi":"Recuperi di palla in zone avanzate, utilizzati insieme agli indicatori di pressione e creazione."
};
const MACROS=[["threat","Threat Creation"],["defense","Defense Stability"],["form","Forma"],["opponent","Opponent Strength"],["pressing","Pressing / PPDA"],["absences","Assenze"]];

const $=s=>document.querySelector(s);
const esc=s=>String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
function activeNav(k){document.querySelectorAll("[data-nav]").forEach(a=>a.classList.toggle("active",a.dataset.nav===k))}
function page(title,subtitle,html){$("#app").innerHTML=`<section class="page"><header class="page-head"><p class="eyebrow">SPACE16154</p><h1>${title}</h1><p class="muted">${subtitle}</p></header>${html}</section>`}
function tag(t){return `<span class="tag ${t.toLowerCase()}">${t}</span>`}
function highest(p){
  const a=[["1",p.one],["X",p.x],["2",p.two]].sort((x,y)=>y[1]-x[1])[0];
  const b=p.under>=p.over?["Under",p.under]:["Over",p.over];
  const c=p.gg>=p.ng?["Gol",p.gg]:["No Gol",p.ng];
  return {a,b,c};
}
function matchCard(m){
 const h=highest(m.p);
 return `<article class="match-card" onclick="location.hash='match/${m.id}'">
  <div class="match-meta"><span>${esc(m.league)}</span><span>${esc(m.date)}</span></div>
  <div class="teams"><div><b>${esc(m.home)}</b><small>Casa</small></div><span class="vs">VS</span><div class="away"><b>${esc(m.away)}</b><small>Trasferta</small></div></div>
  <div class="prediction-grid">
   <div><small>1X2</small><strong class="green">${h.a[0]} · ${h.a[1]}%</strong></div>
   <div><small>GOL</small><strong class="green">${h.c[0]} · ${h.c[1]}%</strong></div>
   <div><small>GOL 2.5</small><strong class="green">${h.b[0]} · ${h.b[1]}%</strong></div>
  </div>
  <div class="signal-line">${tag("Confidence")} ${tag("Value")} ${tag("Forma")}</div>
 </article>`
}
function dashboard(){
 const m=MODEL.matches[0];
 page("Dashboard","Il quadro essenziale del modello, senza sovraccaricare la home.",
 `<div class="section-title">MATCH IN EVIDENZA</div>${matchCard(m)}
 <div class="section-title row"><span>TOP SIGNALS</span><a href="#signals">Vedi tutti</a></div>
 <div class="top-signal"><div><div>${tag("Confidence")}</div><b>${m.home} — ${m.away}</b><small>1 · ${m.p.one}% · Confidence ${m.confidence}</small></div><strong class="green">${m.p.one}%</strong></div>
 <div class="section-title row"><span>PROSSIME PARTITE</span><a href="#matches">Tutte</a></div>
 <div class="stack">${MODEL.matches.slice(1).map(matchCard).join("")}</div>`);
}
function probSection(m){
 const p=m.p,h=highest(p);
 const rows=(title,items,high)=>`<div class="prob-title">${title}</div>${items.map(([l,v])=>`<div class="prob-row"><span>${l}</span><b class="${v===high?"green":""}">${v}%</b><small>${v===high?"PIÙ PROBABILE":""}</small></div>`).join("")}`;
 return `<div class="prob-card">${rows("1X2",[["1",p.one],["X",p.x],["2",p.two]],h.a[1])}${rows("UNDER / OVER 2.5",[["Under",p.under],["Over",p.over]],h.b[1])}${rows("GOL / NO GOL",[["Gol",p.gg],["No Gol",p.ng]],h.c[1])}</div>`
}
function macroCard(home,away,k,label){
 const a=home.m[k],b=away.m[k];
 return `<div class="macro-card"><div class="macro-head"><b>${label}</b><button class="info" onclick="event.stopPropagation();infoMacro('${k}')">i</button></div>
 <div class="macro-values"><span>${esc(home.name)} <strong>${a}</strong>${k==="form"?" ↗":""}</span><span>${esc(away.name)} <strong>${b}</strong>${k==="form"?" →":""}</span></div>
 <div class="dualbar"><i style="width:${a}%"></i><i style="width:${b}%"></i></div>
 <small>${a>=b?"+":""}${a-b} ${esc(a>=b?home.name:away.name)}</small></div>`
}
function detail(id){
 const m=MODEL.matches.find(x=>x.id===id); const home=MODEL.teams.find(t=>t.name===m.home)||MODEL.teams[0]; const away=MODEL.teams.find(t=>t.name===m.away)||MODEL.teams[1];
 const tech=m.technical.map(r=>`<div class="tech-row"><b>${esc(r[0])}<button class="info" onclick="infoTech('${r[0]}')">i</button></b><span>${r[1]}</span><span>${r[2]}</span></div>`).join("");
 page(`${m.home} — ${m.away}`,`${m.league} · ${m.date} · ${m.venue}`,
 `<div class="match-banner"><div class="club"><span class="crest">⚽</span><b>${esc(m.home)}</b></div><div class="model-score"><small>MODEL SCORE</small><strong>${home.score} — ${away.score}</strong><em>${home.score>=away.score?esc(home.name):esc(away.name)}</em></div><div class="club away"><span class="crest">⚽</span><b>${esc(m.away)}</b></div></div>
 <div class="section-title">PROBABILITÀ DEL MODELLO</div>${probSection(m)}
 <div class="section-title row"><span>ANALISI DEL MODELLO</span><span class="muted">6 macroaree</span></div>
 <div class="macro-stack">${MACROS.map(([k,l])=>macroCard(home,away,k,l)).join("")}</div>
 <div class="section-title row"><span>DATI TECNICI</span><span class="muted">confronto sintetico</span></div>
 <div class="tech-card"><div class="tech-head"><span>Indicatore</span><span>${esc(m.home)}</span><span>${esc(m.away)}</span></div>${tech}</div>
 <div class="section-title">ASSENZE</div><div class="simple-card">${m.absences.map(a=>`<div><b>${esc(a[0])}</b><span>${esc(a[1])}</span></div>`).join("")}</div>
 <div class="section-title">INFORMAZIONI PARTITA</div><div class="simple-card"><div><b>Stadio</b><span>${esc(m.venue)}</span></div><div><b>Campionato</b><span>${esc(m.league)}</span></div><div><b>Orario</b><span>${esc(m.date)}</span></div></div>`);
}
function matches(){
 page("Matches","Solo elenco e consultazione delle partite. Il dettaglio contiene l'analisi completa.",
 `<div class="filter-row"><button class="filter active">Tutte</button>${MODEL.leagues.map(l=>`<button class="filter">${l}</button>`).join("")}</div>
 <div class="stack">${MODEL.matches.map(matchCard).join("")}</div>`);
}
function analysis(){
 page("Analysis","Classifica e profilo delle squadre. La forma è sempre pesata in base alla forza dell'avversario.",
 `<div class="filter-row">${MODEL.leagues.map((l,i)=>`<button class="filter ${i===0?"active":""}">${l}</button>`).join("")}</div>
 <div class="section-title">CLASSIFICA MODEL SCORE</div><div class="rank-card"><div class="rank-head"><span>#</span><span>Squadra</span><span>Score</span></div>${MODEL.teams.map((t,i)=>`<button class="rank-row" onclick="team('${t.id}')"><span>${i+1}</span><b>${esc(t.name)}</b><strong>${t.score}</strong></button>`).join("")}</div>
 <div class="section-title">TREND MODEL SCORE</div><div class="trend-grid">${MODEL.teams.slice(0,2).map(t=>`<div class="trend-card"><div><b>${esc(t.name)}</b><strong>${t.score}</strong></div><div class="spark">${t.trend.map(v=>`<i style="height:${v}%"></i>`).join("")}</div><small>${t.trend.at(-1)>=t.trend[0]?"Trend positivo":"Trend in calo"}</small></div>`).join("")}</div>`);
}
function signals(){
 page("Top Signals","I segnali più forti del modello, separati dalla normale lista delle partite.",
 `<div class="filter-row"><button class="filter active">Tutti</button><button class="filter confidence">Confidence</button><button class="filter value">Value</button><button class="filter form">Forma</button></div>
 <div class="filter-row leagues">${MODEL.leagues.map((l,i)=>`<button class="filter ${i===0?"active":""}">${l}</button>`).join("")}</div>
 <div class="section-title">SEGNALI</div><div class="stack">${MODEL.matches.map(m=>{const h=highest(m.p);return `<button class="signal-row" onclick="location.hash='match/${m.id}'"><div><div>${tag("Confidence")} ${tag("Value")} ${tag("Forma")}</div><b>${esc(m.home)} — ${esc(m.away)}</b><small>${esc(m.league)} · ${esc(m.date)}</small></div><strong class="green">${h.a[0]} · ${h.a[1]}%</strong></button>`}).join("")}</div>`);
}
function more(){
 page("Altro","Approfondimenti e trasparenza del modello.",
 `<button class="more-card" onclick="performance()"><div><b>Model Performance</b><small>Risultati, accuratezza e storico dei segnali</small></div><span>›</span></button>
 <button class="more-card" onclick="confidence()"><div><b>Model Confidence</b><small>Quanto è solida la valutazione complessiva</small></div><span>›</span></button>
 <button class="more-card"><div><b>Metodologia</b><small>Macroaree, indicatori e rielaborazione dei dati</small></div><span>›</span></button>`);
}
function team(id){
 const t=MODEL.teams.find(x=>x.id===id);
 modal(`<p class="eyebrow">ANALYSIS · SQUADRA</p><h2>${esc(t.name)}</h2><div class="score-box"><strong>${t.score}</strong><span>Model Score</span></div><div class="macro-stack">${MACROS.map(([k,l])=>`<div class="macro-card"><div class="macro-head"><b>${l}</b><button class="info" onclick="infoMacro('${k}')">i</button></div><div class="macro-values"><span>${t.m[k]} / 100</span></div><div class="singlebar"><i style="width:${t.m[k]}%"></i></div></div>`).join("")}</div>`);
}
function performance(){modal(`<p class="eyebrow">ALTRO · MODEL PERFORMANCE</p><h2>Model Performance</h2><div class="metrics"><div><strong>${MODEL.performance.signals}</strong><span>Pronostici / segnali</span></div><div><strong>${MODEL.performance.confidence}</strong><span>Confidence media</span></div><div><strong>${MODEL.performance.hitRate}%</strong><span>Accuratezza demo</span></div><div><strong>${MODEL.performance.topRate}%</strong><span>Top Signal rate</span></div></div><p class="muted">I valori attuali sono dimostrativi. Con lo storico reale questa sezione mostrerà l'andamento effettivo del modello e permetterà di confrontare previsioni e risultati.</p>`)}
function confidence(){modal(`<p class="eyebrow">ALTRO · MODEL CONFIDENCE</p><h2>Model Confidence</h2><p>La Confidence sintetizza quanto gli indicatori concordano e quanto il quadro della partita è coerente. Non è una probabilità di vincita.</p><div class="confidence-big">84 <small>/ 100</small></div>`)}
function infoMacro(k){modal(`<p class="eyebrow">MACROAREA</p><h2>${INFO[k][0]}</h2><p>${INFO[k][1]}</p>`)}
function infoTech(k){modal(`<p class="eyebrow">DATO TECNICO</p><h2>${esc(k)}</h2><p>${TECH[k]}</p>`)}
function modal(html){$("#modalContent").innerHTML=html;$("#modal").classList.remove("hidden")}
function closeModal(){$("#modal").classList.add("hidden")}
function render(){
 const raw=location.hash.slice(1); const [route,id]=raw.split("/");
 activeNav(route.startsWith("match")?"matches":route||"dashboard");
 if(route==="match") detail(id); else if(route==="matches") matches(); else if(route==="analysis") analysis(); else if(route==="signals") signals(); else if(route==="more") more(); else dashboard();
}
$("#modalClose").onclick=closeModal;$("#modal").onclick=e=>{if(e.target.id==="modal")closeModal()};$("#refreshBtn").onclick=()=>location.reload();
window.addEventListener("hashchange",render);
window.addEventListener("load",()=>{if("serviceWorker"in navigator)navigator.serviceWorker.register("sw.js?v=1.2.0");render()});
