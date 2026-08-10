const DATA = {
  teams: [
    {id:"milan", name:"Milan", code:"MIL", score:79, trend:[72,75,74,78,79], macro:{threat:78, defense:74, form:82, opponent:71, pressing:77, absences:91}},
    {id:"roma", name:"Roma", code:"ROM", score:68, trend:[68,70,66,67,68], macro:{threat:64, defense:67, form:61, opponent:76, pressing:62, absences:84}},
    {id:"inter", name:"Inter", code:"INT", score:84, trend:[78,80,81,83,84], macro:{threat:88, defense:82, form:86, opponent:80, pressing:79, absences:93}},
    {id:"napoli", name:"Napoli", code:"NAP", score:76, trend:[73,72,74,75,76], macro:{threat:79, defense:72, form:77, opponent:74, pressing:73, absences:88}}
  ],
  matches: [
    {id:"milan-roma", home:"Milan", away:"Roma", league:"Serie A", date:"Oggi · 20:45",
      probs:{one:74,x:16,two:10,under:52,over:48,gg:68,ng:32}, result:"1", score:"2–1",
      signals:["Confidence","Forma"], confidence:84, value:15, form:82,
      technical:[["xG","1.84","1.12"],["xGA","0.96","1.34"],["Ultimo terzo","78","61"],["Qualità tiro","73","64"],["Pressione alta","77","62"],["PPDA","8.9","12.8"],["Tiri","15","10"],["Recuperi offensivi","9","5"]],
      absences:[["Milan","1 titolare · impatto moderato"],["Roma","2 assenze · 1 giocatore chiave"]],
      info:["San Siro","Serie A","Oggi · 20:45"]},
    {id:"inter-napoli", home:"Inter", away:"Napoli", league:"Serie A", date:"Domani · 18:00",
      probs:{one:61,x:23,two:16,under:44,over:56,gg:62,ng:38}, result:"1", score:"2–1",
      signals:["Confidence","Value"], confidence:78, value:11, form:76,
      technical:[["xG","1.71","1.28"],["xGA","0.88","1.21"],["Ultimo terzo","81","72"],["Qualità tiro","76","69"],["Pressione alta","79","70"],["PPDA","8.1","10.4"],["Tiri","14","12"],["Recuperi offensivi","8","6"]],
      absences:[["Inter","Nessuna assenza chiave"],["Napoli","1 titolare · impatto basso"]],
      info:["San Siro","Serie A","Domani · 18:00"]},
    {id:"juventus-milan", home:"Juventus", away:"Milan", league:"Serie A", date:"Sab · 20:45",
      probs:{one:38,x:31,two:31,under:58,over:42,gg:49,ng:51}, result:"1", score:"1–0",
      signals:["Forma"], confidence:71, value:7, form:79,
      technical:[["xG","1.31","1.18"],["xGA","1.02","1.06"],["Ultimo terzo","68","74"],["Qualità tiro","67","72"],["Pressione alta","71","76"],["PPDA","10.1","8.8"],["Tiri","12","13"],["Recuperi offensivi","6","7"]],
      absences:[["Juventus","1 titolare · impatto moderato"],["Milan","Nessuna assenza chiave"]],
      info:["Allianz Stadium","Serie A","Sab · 20:45"]}
  ],
  performance:{generated:127, avgConfidence:76, hitRate:68, topSignalRate:72}
};

const macroInfo = {
  threat:"Misura la capacità di creare occasioni pericolose attraverso qualità e quantità delle azioni offensive. Il valore combina più indicatori offensivi pesati dal modello.",
  defense:"Misura la solidità con cui la squadra limita qualità e quantità delle occasioni concesse. Il valore combina più indicatori difensivi pesati dal modello.",
  form:"Rappresenta la forma recente della squadra, corretta in base alla forza degli avversari affrontati. Non considera tutte le partite allo stesso modo.",
  opponent:"Misura come la squadra si comporta rispetto alla forza degli avversari affrontati. Il modello raggruppa la qualità delle avversarie per fasce e pesa la prestazione di conseguenza.",
  pressing:"Valuta come la squadra difende e pressa, compresa la capacità di recuperare palla alta o di attendere più bassa. Il PPDA viene rielaborato insieme agli altri indicatori di pressione.",
  absences:"Valuta l'impatto delle assenze considerando ruolo, centralità nel gioco e importanza del giocatore. La perdita di un elemento chiave pesa più di quella di un titolare meno centrale."
};
const technicalInfo = {
  "xG":"Expected Goals: stima la qualità delle occasioni create dalla squadra. Viene valutato insieme agli altri indicatori offensivi.",
  "xGA":"Expected Goals Against: stima la qualità delle occasioni concesse. Viene valutato insieme agli altri indicatori difensivi.",
  "Ultimo terzo":"Misura la frequenza e la qualità con cui una squadra porta il gioco nell'ultimo terzo di campo. Viene valutato insieme agli altri indicatori di creazione.",
  "Qualità tiro":"Valuta quanto sono pericolosi i tiri prodotti, considerando la qualità delle situazioni da cui nascono. Viene valutato insieme agli altri indicatori offensivi.",
  "Pressione alta":"Indica quanto una squadra riesce a disturbare e recuperare palla in zone avanzate. Viene valutato insieme agli altri indicatori di pressing.",
  "PPDA":"Indica quante azioni di passaggio l'avversario può completare prima di subire un'azione difensiva. Il modello lo rielabora insieme alla struttura della pressione."
};
const macroLabels = [["threat","Threat Creation"],["defense","Defense Stability"],["form","Forma"],["opponent","Opponent Strength"],["pressing","Pressing / PPDA"],["absences","Assenze"]];

function app(){ return document.getElementById("app"); }
function nav(){ const key=location.hash.replace("#","")||"dashboard"; document.querySelectorAll("[data-nav]").forEach(a=>a.classList.toggle("active",a.dataset.nav===key)); }
function render(){ nav(); const key=location.hash.replace("#","")||"dashboard"; if(key==="dashboard") dashboard(); else if(key==="matches") matches(); else if(key==="analysis") analysis(); else if(key==="signals") signals(); else more(); }
function esc(s){return String(s).replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#039;"}[m]));}
function page(title,sub,body){app().innerHTML=`<section class="page"><div class="page-head"><div><p class="eyebrow">SPACE16154</p><h1>${title}</h1>${sub?`<p class="muted">${sub}</p>`:""}</div></div>${body}</section>`;}
function cardMatch(m){return `<article class="match-card" onclick="location.hash='match-${m.id}'"><div class="match-top"><span>${esc(m.league)}</span><span>${esc(m.date)}</span></div><div class="teams"><div><b>${esc(m.home)}</b><small>Home</small></div><div class="versus">VS</div><div class="right"><b>${esc(m.away)}</b><small>Away</small></div></div><div class="mini-probs"><span><strong class="green">${m.probs.one>=m.probs.x&&m.probs.one>=m.probs.two?"1 "+m.probs.one+"%":m.probs.x>=m.probs.two?"X "+m.probs.x+"%":"2 "+m.probs.two+"%"}</strong></span><span><strong class="green">${m.probs.under>=m.probs.over?"Under ":"Over "}${Math.max(m.probs.under,m.probs.over)}%</strong></span><span><strong class="green">${m.probs.gg>=m.probs.ng?"Gol ":"No Gol "}${Math.max(m.probs.gg,m.probs.ng)}%</strong></span></div><div class="tags">${m.signals.map(s=>`<span class="tag ${s.toLowerCase()}">${s}</span>`).join("")}</div></article>`;}

function dashboard(){
 const featured=DATA.matches[0];
 page("Dashboard","Il quadro essenziale del modello, senza sovraccaricare la schermata.",
 `<div class="section-title">MATCH IN EVIDENZA</div>${cardMatch(featured)}
 <div class="section-title row-title"><span>TOP SIGNAL</span><a href="#signals">Vedi tutti</a></div>
 <div class="signal-card"><div><span class="signal-badge confidence">CONFIDENCE</span><b>Milan — Roma</b><small>1 · ${featured.probs.one}%</small></div><strong class="big-green">${featured.confidence}</strong></div>
 <div class="section-title row-title"><span>PROSSIME PARTITE</span><a href="#matches">Tutte</a></div>
 <div class="stack">${DATA.matches.slice(1).map(cardMatch).join("")}</div>`);
}

function probRow(label,a,b,unit="%"){return `<div class="prob-row"><span>${label}</span><b class="green">${a}</b><b>${b}</b></div>`;}
function matchDetail(m){
 const home=DATA.teams.find(t=>t.name===m.home)||DATA.teams[0], away=DATA.teams.find(t=>t.name===m.away)||DATA.teams[1];
 const macro=macroLabels.map(([k,l])=>{const hv=home.macro[k],av=away.macro[k],d=hv-av;return `<div class="macro"><div class="macro-head"><b>${l}</b><button class="info" onclick="event.stopPropagation();showInfo('${k}')">i</button></div><div class="macro-values"><span>${esc(home.name)} <strong>${hv}</strong>${k==="form"?" ↗":""}</span><span>${esc(away.name)} <strong>${av}</strong>${k==="form"?" →":""}</span></div><div class="bar"><i style="width:${hv}%"></i><i style="width:${av}%"></i></div><em>${d>=0?"+":""}${d} ${d>=0?esc(home.name):esc(away.name)}</em></div>`}).join("");
 const tech=m.technical.map(r=>`<div class="tech-row"><b>${r[0]} ${technicalInfo[r[0]]?`<button class="info" onclick="showTech('${r[0]}')">i</button>`:""}</b><span>${r[1]}</span><span>${r[2]}</span></div>`).join("");
 page(`${m.home} — ${m.away}`,`${m.league} · ${m.date}`,
 `<div class="match-hero"><div class="club">⚽<b>${esc(m.home)}</b></div><div class="scorebox"><small>MODEL SCORE</small><strong>${home.score}–${away.score}</strong><em>${home.score>=away.score?"+":""}${home.score-away.score} ${home.score>=away.score?esc(home.name):esc(away.name)}</em></div><div class="club">⚽<b>${esc(m.away)}</b></div></div>
 <div class="section-title">PROBABILITÀ DEL MODELLO</div><div class="prob-card">
 <div class="prob-title">1X2</div>${probRow("1",m.probs.one+"%",m.probs.one>=m.probs.x&&m.probs.one>=m.probs.two?"PIÙ PROBABILE":"")} ${probRow("X",m.probs.x+"%",m.probs.x>=m.probs.one&&m.probs.x>=m.probs.two?"PIÙ PROBABILE":"")} ${probRow("2",m.probs.two+"%",m.probs.two>=m.probs.one&&m.probs.two>=m.probs.x?"PIÙ PROBABILE":"")}
 <div class="prob-title">UNDER / OVER 2.5</div>${probRow("Under",m.probs.under+"%",m.probs.under>=m.probs.over?"PIÙ PROBABILE":"")} ${probRow("Over",m.probs.over+"%",m.probs.over>=m.probs.under?"PIÙ PROBABILE":"")}
 <div class="prob-title">GOL / NO GOL</div>${probRow("Gol",m.probs.gg+"%",m.probs.gg>=m.probs.ng?"PIÙ PROBABILE":"")} ${probRow("No Gol",m.probs.ng+"%",m.probs.ng>=m.probs.gg?"PIÙ PROBABILE":"")}</div>
 <div class="section-title">ANALISI DEL MODELLO</div><div class="macro-list">${macro}</div>
 <div class="section-title row-title"><span>DATI TECNICI · CONFRONTO</span><span class="muted">base del modello</span></div><div class="tech-card"><div class="tech-head"><span>Indicatore</span><span>${esc(m.home)}</span><span>${esc(m.away)}</span></div>${tech}</div>
 <div class="section-title">ASSENZE PRINCIPALI</div><div class="info-card">${m.absences.map(a=>`<div><b>${esc(a[0])}</b><span>${esc(a[1])}</span></div>`).join("")}</div>
 <div class="section-title">INFORMAZIONI PARTITA</div><div class="info-card">${m.info.map(x=>`<div><span>${esc(x)}</span></div>`).join("")}</div>`);
}
function matches(){
 page("Matches","Tutte le partite disponibili, leggibili a colpo d'occhio.",
 `<div class="filter-line"><button class="filter active">Tutte</button><button class="filter">Serie A</button></div><div class="stack">${DATA.matches.map(cardMatch).join("")}</div>`);
}
function analysis(){
 page("Analysis","Classifica e profilo delle squadre. La forma è pesata per la forza degli avversari.",
 `<div class="league-tabs"><button class="filter active">Serie A</button><button class="filter">Premier League</button><button class="filter">Liga</button><button class="filter">Bundesliga</button><button class="filter">Ligue 1</button></div>
 <div class="table-card"><div class="rank-head"><span>#</span><span>Squadra</span><span>Score</span></div>${DATA.teams.map((t,i)=>`<div class="rank-row" onclick="showTeam('${t.id}')"><span>${i+1}</span><b>${esc(t.name)}</b><strong>${t.score}</strong></div>`).join("")}</div>
 <div class="section-title">TREND MODEL SCORE</div><div class="trend-grid">${DATA.teams.slice(0,2).map(t=>`<div class="trend-card"><div><b>${esc(t.name)}</b><span> ${t.score}/100</span></div><div class="spark">${t.trend.map(v=>`<i style="height:${v}%"></i>`).join("")}</div><small>${t.trend[t.trend.length-1]>=t.trend[0]?"Trend positivo":"Trend in calo"}</small></div>`).join("")}</div>`);
}
function signals(){
 page("Top Signals","Segnali separati per direzione e campionato.",
 `<div class="signal-filters"><button class="filter active">Tutti</button><button class="filter confidence">Confidence</button><button class="filter value">Value</button><button class="filter form">Forma</button></div>
 <div class="league-tabs"><button class="filter active">Tutti i campionati</button><button class="filter">Serie A</button><button class="filter">Premier League</button><button class="filter">Liga</button></div>
 <div class="stack">${DATA.matches.map(m=>`<div class="signal-row" onclick="location.hash='match-${m.id}'"><div><div class="tags">${m.signals.map(s=>`<span class="tag ${s.toLowerCase()}">${s}</span>`).join("")}</div><b>${esc(m.home)} — ${esc(m.away)}</b><small>${esc(m.league)} · ${esc(m.date)}</small></div><strong class="green">${Math.max(m.probs.one,m.probs.x,m.probs.two)}%</strong></div>`).join("")}</div>`);
}
function more(){
 page("Altro","Strumenti per verificare il comportamento del modello.",
 `<div class="more-card" onclick="showPerformance()"><b>Model Performance</b><span>Risultati, accuratezza e storico dei segnali</span>›</div>
 <div class="more-card" onclick="showConfidence()"><b>Model Confidence</b><span>Solidità e livello di fiducia delle valutazioni</span>›</div>
 <div class="more-card"><b>Metodologia</b><span>Macroaree, indicatori e logica del modello</span>›</div>
 <div class="more-card"><b>Impostazioni</b><span>Preferenze dell'app</span>›</div>`);
}
function showPerformance(){modal(`<p class="eyebrow">MODEL PERFORMANCE</p><h2>Il modello in numeri</h2><div class="metric-grid"><div><b>${DATA.performance.generated}</b><span>Segnali generati</span></div><div><b>${DATA.performance.avgConfidence}</b><span>Confidence media</span></div><div><b>${DATA.performance.hitRate}%</b><span>Hit rate demo</span></div><div><b>${DATA.performance.topSignalRate}%</b><span>Top Signal rate</span></div></div><p class="muted">Dati dimostrativi: verranno sostituiti dallo storico reale quando il modello sarà collegato ai dati Sportmonks.</p>`);}
function showConfidence(){modal(`<p class="eyebrow">MODEL CONFIDENCE</p><h2>Quanto è solida la valutazione?</h2><p>La Confidence sintetizza quanto gli indicatori concordano tra loro e quanto il quadro della partita è coerente. Non è una probabilità di vincita.</p><div class="confidence-box"><strong>84 / 100</strong><span>Confidence demo</span></div>`);}
function showTeam(id){const t=DATA.teams.find(x=>x.id===id); modal(`<p class="eyebrow">ANALYSIS · TEAM</p><h2>${esc(t.name)}</h2><div class="team-score"><strong>${t.score}</strong><span>Model Score</span></div><div class="macro-list">${macroLabels.map(([k,l])=>`<div class="macro"><div class="macro-head"><b>${l}</b><button class="info" onclick="showInfo('${k}')">i</button></div><div class="macro-values"><span>${t.macro[k]}</span><span>0–100</span></div><div class="bar single"><i style="width:${t.macro[k]}%"></i></div></div>`).join("")}</div>`);}
function showInfo(k){modal(`<p class="eyebrow">INFO</p><h2>${macroLabels.find(x=>x[0]===k)[1]}</h2><p>${macroInfo[k]}</p>`);}
function showTech(k){modal(`<p class="eyebrow">DATI TECNICI</p><h2>${esc(k)}</h2><p>${technicalInfo[k]}</p>`);}
function modal(html){document.getElementById("modalContent").innerHTML=html;document.getElementById("modal").classList.remove("hidden");}
document.getElementById("modalClose").onclick=()=>document.getElementById("modal").classList.add("hidden");
document.getElementById("modal").addEventListener("click",e=>{if(e.target.id==="modal")e.currentTarget.classList.add("hidden")});
document.getElementById("refreshBtn").onclick=()=>{location.reload()};
window.addEventListener("hashchange",render);
window.addEventListener("load",()=>{if("serviceWorker" in navigator) navigator.serviceWorker.register("sw.js?v=1.1.0"); render();});
