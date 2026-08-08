const DEMO={
  featured:{league:"Serie A",home:"Milan",away:"Roma",time:"18:00",hc:"MIL",ac:"ROM",hcl:"milan",acl:"roma",
    oneXtwo:[["1","74%","Milan"],["X","5%","Pareggio"],["2","21%","Roma"]],
    goals:[["GOL","68%"],["NO GOL","32%"]],
    totals:[["OVER 2.5","61%"],["UNDER 2.5","39%"]]},
  games:[
    ["18:00","Milan","Roma","74%","MIL","ROM","milan","roma","Serie A"],
    ["18:30","Arsenal","Chelsea","61%","ARS","CHE","arsenal","chelsea","Premier League"],
    ["20:00","Barcelona","Sevilla","68%","BAR","SEV","barcelona","sevilla","La Liga"],
    ["20:30","Bayern","Leverkusen","55%","BAY","LEV","bayern","leverkusen","Bundesliga"],
    ["21:00","PSG","Lyon","72%","PSG","LYO","psg","lyon","Ligue 1"]
  ],
  signals:[
    {type:"ALTA CONVERGENZA",kind:"convergence",outcome:"1",match:"Milan vs Roma",confidence:"75%",detail:"Più famiglie di indicatori puntano nella stessa direzione."},
    {type:"VALUE / EDGE",kind:"value",outcome:"GOL",match:"Arsenal vs Chelsea",confidence:"71%",detail:"Il modello vede un potenziale vantaggio rispetto alla quota.",edge:"+12%"},
    {type:"FORMA",kind:"form",outcome:"1",match:"PSG vs Lyon",confidence:"69%",detail:"La forma recente del PSG è un segnale particolarmente forte.",form:"84%"}
  ],
  form:{milan:["78%",["g","g","y","g","g"],"↗"],roma:["61%",["g","y","r","g","y"],"→"]},
  comparison:[
    ["xG","1.84","1.21","Produzione di occasioni attese superiore.","+0.63"],
    ["xGA","0.94","1.37","Concede occasioni mediamente meno pericolose.","-0.43"],
    ["FORMA (ULTIME 5)","78%","61%","Indice recente ponderato per qualità e recenza.","+17%"],
    ["ULTIMO TERZO","64","47","Più presenza e pericolosità nelle zone avanzate.","+17"],
    ["QUALITÀ TIRO (xG per tiro)","0.13","0.10","Indicatore tecnico: evita di premiare soltanto il volume.","+0.03"]
  ],
  control:[
    ["Pressione alta","77%","61%"],
    ["Recupero palla","8.2s","11.7s"],
    ["Recuperi offensivi","23%","17%"],
    ["PPDA","8.2","11.7"]
  ]
};

const crest=(c,cl="")=>`<div class="crest ${cl}"><span>${c}</span></div>`;
const info=(t,x)=>`<button class="info" aria-label="Info ${t}" data-info="${encodeURIComponent(x)}">i</button>`;

function nav(id,icon,label,a){
  return `<button class="nav-item ${a===id?"active":""}" data-nav="${id}">
    <span class="nav-icon">${icon}</span><span>${label}</span>
  </button>`;
}
function shell(a="dashboard"){
  return `<header class="topbar">
    <div class="top-spacer"></div>
    <div class="brand"><div class="brand-name">SPACE16154</div><div class="brand-sub">FOOTBALL INTELLIGENCE</div></div>
    <div class="engine"><i></i></div>
  </header>
  <main id="main"></main>
  <nav class="bottom-nav">
    ${nav("dashboard","⌂","Dashboard",a)}
    ${nav("matches","□","Matches",a)}
    ${nav("analysis","◇","Analisi",a)}
    ${nav("teams","♙","Squadre",a)}
    ${nav("more","•••","Altro",a)}
  </nav>`;
}
function stat(t,v,s,i,p,g){return `<button class="stat-card" data-nav="${g}">
  <div class="stat-top"><span>${t}</span><b>${i}</b></div><strong>${v}</strong><small>${s}</small>
  <div class="progress"><i style="width:${p}%"></i></div></button>`;}

function marketBox(title,items,cls=""){
  return `<div class="market-box ${cls}"><small>${title}</small><div class="market-pair">
    ${items.map((x,i)=>`<div class="market-item ${i===0?"primary":""}"><span>${x[0]}</span><b>${x[1]}</b>${x[2]?`<em>${x[2]}</em>`:""}</div>`).join("")}
  </div></div>`;
}
function probabilityHeader(){
  const f=DEMO.featured;
  return `<section class="panel probabilities">
    <div class="section-head"><h2>PROBABILITÀ DEL MODELLO ${info("Probabilità del modello","Le percentuali sono stime del modello e non quote di mercato.")}</h2></div>
    <div class="prob-grid">
      <div class="market-box"><small>1X2</small><div class="one-x-two">
        ${f.oneXtwo.map((x,i)=>`<div class="${i===f.oneXtwo.reduce((best,v,idx)=>parseFloat(v[1])>parseFloat(f.oneXtwo[best][1])?idx:best,0)?"primary":""}"><span>${x[0]}</span><b>${x[1]}</b><em>${x[2]}</em></div>`).join("")}
      </div></div>
      ${marketBox("GOL / NO GOL",f.goals)}
      ${marketBox("OVER / UNDER 2.5",f.totals)}
    </div>
  </section>`;
}

function featured(){
  const f=DEMO.featured;
  return `<section class="panel">
    <div class="section-head"><h2>☆ &nbsp; MATCH IN EVIDENZA</h2><span>${f.league}</span></div>
    <div class="match-hero">
      <div class="club">${crest(f.hc,f.hcl)}<strong>${f.home}</strong></div>
      <div class="match-time"><b>${f.time}</b><span>OGGI</span><em>VS</em></div>
      <div class="club">${crest(f.ac,f.acl)}<strong>${f.away}</strong></div>
    </div>
    <div class="prediction-grid">
      ${f.oneXtwo.map((x,i)=>`<div class="pred-card"><small>${i===0?"1X2":""}</small><strong>${x[0]}</strong><em>${x[1]}</em><span>${x[2]}</span></div>`).join("")}
    </div>
    <button class="primary-btn" data-open-analysis>VAI ALL'ANALISI COMPLETA <span>›</span></button>
  </section>`;
}

function upcoming(){
  return `<section class="panel"><div class="section-head"><h2>PROSSIME PARTITE</h2><button class="text-btn" data-nav="matches">VEDI TUTTE ›</button></div>
    ${DEMO.games.slice(1).map(g=>`<button class="fixture" data-open-analysis>
      <div class="fixture-time"><b>${g[0]}</b><small>OGGI</small></div>
      <div class="fixture-team">${crest(g[4],g[6])}<span>${g[1]}</span></div><b class="vs">VS</b>
      <div class="fixture-team away"><span>${g[2]}</span>${crest(g[5],g[7])}</div>
      <span class="competition">${g[8]}</span><span class="chev">›</span>
    </button>`).join("")}
  </section>`;
}

function signalCard(s){
  const extra=s.edge?`<span class="signal-extra">EDGE ${s.edge}</span>`:s.form?`<span class="signal-extra">FORMA ${s.form}</span>`:"";
  const infoText=s.kind==="convergence"
    ?"Alta Convergenza: più famiglie di indicatori importanti puntano nella stessa direzione. È una misura di coerenza del segnale, non una seconda probabilità."
    :s.kind==="value"
    ?"Value / Edge: indica un potenziale scostamento tra la stima del modello e la quota di mercato, quando la quota è disponibile. Non si somma alla probabilità."
    :"Forma: segnala una squadra con rendimento recente particolarmente forte secondo l'indice di forma.";
  return `<article class="signal ${s.kind}">
    <div class="signal-type">${s.type} ${info(s.type,infoText)}</div>
    <div class="signal-outcome">${s.outcome}</div>
    <div class="signal-match">${s.match}</div>
    <div class="signal-meta"><span class="signal-confidence">CONFIDENCE ${s.confidence}</span>${extra}</div>
    <div class="signal-detail">${s.detail}</div>
  </article>`;
}
function signals(){
  return `<section class="panel signals"><div class="section-head"><h2>◎ &nbsp; TOP SIGNALS</h2><button class="text-btn" data-nav="matches">VEDI TUTTI ›</button></div>
    <div class="signal-row">${DEMO.signals.map(signalCard).join("")}</div>
    <div class="signal-legend">
      <span class="legend-convergence">● Alta Convergenza</span>
      <span class="legend-value">● Value / Edge</span>
      <span class="legend-form">● Forma</span>
    </div>
  </section>`;
}

function dashboard(){
  document.querySelector("#main").innerHTML=`<div class="page">
    <div class="page-title-row"><div><div class="eyebrow">PANORAMICA</div><h1>DASHBOARD</h1><p>Il quadro sintetico prima di entrare nel dettaglio.</p></div><button class="date-btn">5 AGOSTO 2026⌄</button></div>
    <div class="stats">
      ${stat("PARTITE OGGI","18","Vai alla lista completa","□",67,"matches")}
      ${stat("SEGNALI","7","Opportunità rilevate","◎",52,"matches")}
      ${stat("CONFIDENCE MEDIA","71%","Coerenza dei segnali","◉",71,"analysis")}
      ${stat("DATA QUALITY","96%","Copertura dati","✓",96,"analysis")}
    </div>${featured()}${upcoming()}${signals()}
  </div>`;bind();
}

function matches(){
  document.querySelector("#main").innerHTML=`<div class="page"><div class="eyebrow">CALENDARIO</div><h1>MATCHES</h1><p class="subtitle">Scegli una partita e apri il dettaglio.</p>
  <div class="league-stack">${["Serie A","Premier League","La Liga","Bundesliga","Ligue 1"].map((l,i)=>`<button class="league-row ${i===0?"active":""}"><span>${l}</span><b>${i===0?3:2}</b><em>›</em></button>`).join("")}</div>
  <section class="panel"><div class="section-head"><h2>PARTITE DEL GIORNO</h2><span>5 disponibili</span></div>
  ${DEMO.games.map(g=>`<button class="match-list" data-open-analysis><span>${g[0]}</span><div>${crest(g[4],g[6])}<b>${g[1]}</b></div><em>VS</em><div><b>${g[2]}</b>${crest(g[5],g[7])}</div><strong>${g[3]}</strong><small>${g[8]}</small></button>`).join("")}
  </section></div>`;bind();
}

function reason(l,a,b,t){
  const x=parseFloat(a),y=parseFloat(b),m=Math.max(x,y,1);
  return `<div class="reason"><div class="reason-label">${l}</div><div class="reason-values"><b>${a}</b><b>${b}</b></div>
    <div class="reason-bars"><i style="width:${x/m*100}%"></i><i style="width:${y/m*100}%"></i></div><p>${t}</p></div>`;
}
function controlRow(a,b,c){return `<div class="control-row"><span>${a}</span><b>${b}</b><b>${c}</b></div>`;}
function formDots(arr){return arr.map(x=>`<i class="form-dot ${x}"></i>`).join("");}

function analysis(){
  const f=DEMO.form;
  document.querySelector("#main").innerHTML=`<div class="page analysis-page">
    <div class="eyebrow">MATCH ANALYSIS</div><h1>Milan — Roma</h1><p class="subtitle">Serie A · pre-match · dati demo</p>

    ${probabilityHeader()}

    <section class="panel model-card">
      <div class="section-head"><h2>LETTURA DEL MODELLO</h2><div class="badges"><span class="badge green">ALTA CONVERGENZA</span><span class="badge gold">VALUE / EDGE +15%</span></div></div>
      <div class="confidence-box"><div><span>CONFIDENCE ${info("Confidence","Misura quanto i principali blocchi analitici concordano tra loro. Non è una seconda probabilità dell'esito.")}</span><strong>75%</strong></div>
        <div class="big-progress"><i style="width:75%"></i></div><p>Più indicatori importanti vanno nella stessa direzione.</p></div>
      <div class="model-note"><b>VALUE / EDGE</b><strong>+15%</strong><p>Il modello vede un potenziale vantaggio rispetto alla quota di mercato, quando disponibile. L'Edge non si somma alla probabilità.</p>
        <div class="risk"><b>⚠ RISCHIO PRINCIPALE</b><span>Fattore campo e forma recente hanno un peso rilevante.</span></div>
      </div>
    </section>

    <section class="panel">
      <div class="section-head"><h2>PERCHÉ IL MODELLO VEDE MILAN?</h2><span>CONFRONTO</span></div>
      <div class="compare-head"><span>INDICATORE</span><b>MILAN</b><b>ROMA</b><em>VANTAGGIO</em></div>
      ${DEMO.comparison.map(r=>`<div class="compare-row"><span>${r[0]}</span><b>${r[1]}</b><b>${r[2]}</b><em>${r[4]}</em></div>`).join("")}
      <div class="compare-footnote">I dati tecnici completano la lettura del modello: la decisione non dipende da un singolo parametro.</div>
    </section>

    <section class="panel form-panel"><div class="section-head"><h2>ULTIME 5 PARTITE ${info("Ultime 5 partite","La forma confronta le ultime cinque partite con il rendimento precedente della squadra. Tiene conto dei risultati e delle prestazioni offensive e difensive, considerando anche la qualità delle occasioni e il modo in cui vengono create e concesse.")}</h2><span>RECENTE</span></div>
      <div class="form-team"><div><strong>Milan</strong><div class="dots">${formDots(f.milan[1])}</div></div><b class="form-score green-text">${f.milan[2]}</b></div>
      <div class="form-team"><div><strong>Roma</strong><div class="dots">${formDots(f.roma[1])}</div></div><b class="form-score neutral-text">${f.roma[2]}</b></div>
    </section>

    <section class="panel">
      <div class="section-head"><h2>INDICATORI DI CONTROLLO</h2><span>CONTESTO</span></div>
      <div class="control-head"><span>INDICATORE</span><b>MILAN</b><b>ROMA</b></div>
      ${DEMO.control.map(r=>controlRow(r[0],r[1],r[2])).join("")}
      <p class="control-note">Gli indicatori di controllo aiutano a leggere il contesto e non decidono da soli il segnale.</p>
    </section>

    <section class="panel">
      <div class="section-head"><h2>FORZA AVVERSARIO ${info("Forza avversario","Indice normalizzato 1–100 della forza relativa dell'avversario affrontato.")}</h2><span>1–100</span></div>
      <div class="opponent"><div><span>Milan</span><b class="opponent-high">72</b></div><div><span>Roma</span><b class="opponent-low">68</b></div></div>
    </section>

    <section class="panel reliability"><div class="section-head"><h2>DATI E AFFIDABILITÀ</h2><span class="quality">96%</span></div>
      <div class="quality-list"><div><span>Fixture</span><b>Completo</b></div><div><span>xG / xGA</span><b>Completo</b></div><div><span>Forma ultime 5</span><b>Completo</b></div><div><span>Quote</span><b>Disponibili</b></div></div>
    </section>
  </div>`;bind();
}

function simple(t,p){document.querySelector("#main").innerHTML=`<div class="page empty"><div class="eyebrow">SPACE16154</div><h1>${t}</h1><p>${p}</p><div class="panel demo-note"><b>V3.1 · DATI DEMO</b><span>Questa sezione resta predisposta per i dati reali.</span></div></div>`;bind();}

function showInfo(t){
  const o=document.createElement("div");o.className="modal-backdrop";
  o.innerHTML=`<div class="info-modal"><button class="modal-x">×</button><div class="eyebrow">INFO</div><p>${t}</p></div>`;
  document.body.appendChild(o);o.querySelector(".modal-x").onclick=()=>o.remove();o.onclick=e=>{if(e.target===o)o.remove()};
}
function bind(){
  document.querySelectorAll("[data-nav]").forEach(b=>b.onclick=()=>route(b.dataset.nav));
  document.querySelectorAll("[data-open-analysis]").forEach(b=>b.onclick=()=>route("analysis"));
  document.querySelectorAll(".info").forEach(b=>b.onclick=e=>{e.stopPropagation();showInfo(decodeURIComponent(b.dataset.info))});
}
function route(n){
  document.body.innerHTML=shell(n);
  if(n==="dashboard")dashboard();else if(n==="matches")matches();else if(n==="analysis")analysis();else if(n==="teams")simple("Squadre","Ranking, forma e profili squadra.");else simple("Altro","Impostazioni e funzioni future.");
  scrollTo(0,0);
}
route("dashboard");
