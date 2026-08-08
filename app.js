const VERSION="SPACE16154-V4-2026-08-08";

const DEMO={
  featured:{
    league:"Serie A",home:"Milan",away:"Roma",time:"18:00",
    hc:"MIL",ac:"ROM",hcl:"milan",acl:"roma",
    markets:{
      oneXtwo:{label:"1",pct:74},
      goals:{label:"GOL",pct:68},
      noGoals:{label:"NO GOL",pct:32},
      over25:{label:"OVER 2.5",pct:61},
      under25:{label:"UNDER 2.5",pct:39}
    }
  },
  games:[
    ["18:00","Milan","Roma","74%","MIL","ROM","milan","roma","Serie A"],
    ["18:30","Arsenal","Chelsea","61%","ARS","CHE","arsenal","chelsea","Premier League"],
    ["20:00","Barcelona","Sevilla","68%","BAR","SEV","barcelona","sevilla","La Liga"],
    ["20:30","Bayern","Leverkusen","55%","BAY","LEV","bayern","leverkusen","Bundesliga"],
    ["21:00","PSG","Lyon","72%","PSG","LYO","psg","lyon","Ligue 1"]
  ],
  signals:[
    {type:"ALTA CONVERGENZA",outcome:"1",match:"Milan vs Roma",prob:74,confidence:75,edge:15},
    {type:"VALUE / EDGE",outcome:"GOL",match:"Arsenal vs Chelsea",prob:68,confidence:72,edge:12},
    {type:"ALTA CONVERGENZA",outcome:"OVER 2.5",match:"Barcelona vs Sevilla",prob:68,confidence:70,edge:null}
  ],
  match:{
    probabilities:[
      {label:"1",name:"Milan",pct:74},
      {label:"X",name:"Pareggio",pct:5},
      {label:"2",name:"Roma",pct:21}
    ],
    markets:[
      {title:"GOL",pct:68},
      {title:"NO GOL",pct:32},
      {title:"OVER 2.5",pct:61},
      {title:"UNDER 2.5",pct:39}
    ],
    confidence:75,
    edge:15,
    reasons:[
      ["xG","1.84","1.21","Produzione di occasioni attese superiore."],
      ["xGA","0.94","1.37","Concede occasioni mediamente meno pericolose."],
      ["FORMA","78%","61%","Indice delle ultime 5 gare, ponderato per qualità della prestazione e recenza."],
      ["ULTIMO TERZO","64","47","Più presenza e pericolosità nelle zone avanzate."],
      ["QUALITÀ TIRO","0.13","0.10","xG medio per tiro: evita di premiare semplicemente il volume."]
    ],
    form:{
      home:{name:"Milan",results:["W","W","D","W","W"],pct:78,trend:"up"},
      away:{name:"Roma",results:["W","D","L","W","D"],pct:61,trend:"stable"}
    },
    control:[
      ["Pressione alta","77%","61%"],
      ["Recupero palla","8.2s","11.7s"],
      ["Recuperi offensivi","23%","17%"],
      ["PPDA","8.2","11.7"]
    ],
    strength:[["Milan","72"],["Roma","68"]],
    data:[
      ["Fixture","Completo"],["xG / xGA","Completo"],["Forma ultime 5","Completo"],["Quote","Disponibili"]
    ],
    corners:["5.4","4.2"]
  }
};

const crest=(code,cl="")=>`<div class="crest ${cl}"><span>${code}</span></div>`;
const info=(title,text)=>`<button class="info" aria-label="Info ${title}" data-info="${encodeURIComponent(text)}">i</button>`;

function nav(id,icon,label,active){
  return `<button class="nav-item ${active===id?"active":""}" data-nav="${id}">
    <span class="nav-icon">${icon}</span><span>${label}</span>
  </button>`;
}
function shell(active="dashboard"){
  return `<header class="topbar">
    <div class="topbar-spacer"></div>
    <div class="brand"><div class="brand-name">SPACE16154</div><div class="brand-sub">FOOTBALL INTELLIGENCE</div></div>
    <div class="engine"><i></i></div>
  </header>
  <main id="main"></main>
  <nav class="bottom-nav">
    ${nav("dashboard","⌂","Dashboard",active)}
    ${nav("matches","□","Matches",active)}
    ${nav("analysis","◇","Analisi",active)}
    ${nav("teams","♙","Squadre",active)}
    ${nav("more","•••","Altro",active)}
  </nav>`;
}

function stat(t,v,s,i,p,g){
  return `<button class="stat-card" data-nav="${g}">
    <div class="stat-top"><span>${t}</span><b>${i}</b></div>
    <strong>${v}</strong><small>${s}</small>
    <div class="progress"><i style="width:${p}%"></i></div>
  </button>`;
}

function pred(title,sub,label,pct){
  return `<div class="pred-card"><small>${title}</small><span>${sub}</span><strong>${label}</strong><em>${pct}%</em></div>`;
}

function featured(){
  const f=DEMO.featured,m=f.markets;
  return `<section class="panel featured">
    <div class="section-head"><h2>☆ &nbsp; MATCH IN EVIDENZA</h2><span>${f.league}</span></div>
    <div class="match-hero">
      <div class="club">${crest(f.hc,f.hcl)}<strong>${f.home}</strong></div>
      <div class="match-time"><b>${f.time}</b><span>OGGI</span><em>VS</em></div>
      <div class="club">${crest(f.ac,f.acl)}<strong>${f.away}</strong></div>
    </div>
    <div class="prediction-grid">
      ${pred("1X2","ESITO PIÙ PROBABILE",m.oneXtwo.label,m.oneXtwo.pct)}
      ${pred("GOL / NO GOL","ESITO PIÙ PROBABILE",m.goals.label,m.goals.pct)}
      ${pred("OVER / UNDER 2.5","ESITO PIÙ PROBABILE",m.over25.label,m.over25.pct)}
    </div>
    <button class="primary-btn" data-open-analysis>VAI ALL'ANALISI COMPLETA <span>›</span></button>
  </section>`;
}

function upcoming(){
  return `<section class="panel">
    <div class="section-head"><h2>PROSSIME PARTITE</h2><button class="text-btn" data-nav="matches">VEDI TUTTE ›</button></div>
    ${DEMO.games.slice(1).map(g=>`
      <button class="fixture" data-open-analysis>
        <div><b>${g[0]}</b><small>OGGI</small></div>
        <div class="fixture-team">${crest(g[4],g[6])}<span>${g[1]}</span></div>
        <b class="vs">VS</b>
        <div class="fixture-team away"><span>${g[2]}</span>${crest(g[5],g[7])}</div>
        <span class="competition">${g[8]}</span><span class="chev">›</span>
      </button>`).join("")}
  </section>`;
}

function signalCard(s){
  const edge=s.edge===null ? "" : `<span class="signal-edge">Edge +${s.edge}%</span>`;
  return `<article class="signal ${s.edge===null?"":"value"}">
    <div class="signal-type">${s.type} ${info(s.type,
      s.type==="ALTA CONVERGENZA"
      ?"Etichetta qualitativa della Confidence: indica che più indicatori importanti vanno nella stessa direzione."
      :"Value / Edge indica un potenziale scostamento favorevole tra stima del modello e quota di mercato, quando disponibile.")}</div>
    <div class="signal-main">${s.outcome}</div>
    <div class="signal-match">${s.match}</div>
    <div class="signal-bottom">
      <span>CONFIDENCE ${s.confidence}%</span>
      <strong>${s.prob}%</strong>
    </div>
    ${edge}
  </article>`;
}

function signals(){
  return `<section class="panel">
    <div class="section-head"><h2 class="gold-title">◎ &nbsp; TOP SIGNALS</h2><button class="text-btn">INTELLIGENCE ›</button></div>
    <div class="signal-row">${DEMO.signals.map(signalCard).join("")}</div>
  </section>`;
}

function dashboard(){
  document.querySelector("#main").innerHTML=`<div class="page">
    <div class="page-title-row">
      <div><div class="eyebrow">PANORAMICA</div><h1>DASHBOARD</h1><p>Il quadro sintetico prima di entrare nel dettaglio.</p></div>
      <button class="date-btn">5 AGOSTO 2026⌄</button>
    </div>
    <div class="stats">
      ${stat("PARTITE OGGI","18","Vai alla lista completa","□",67,"matches")}
      ${stat("SEGNALI","7","Opportunità rilevate","◎",48,"analysis")}
      ${stat("ANALISI COMPLETE","12","67% completate","◇",67,"analysis")}
      ${stat("ACCURACY MEDIA","67%","Ultimi 30 giorni","♜",67,"analysis")}
    </div>
    ${featured()}${upcoming()}${signals()}
  </div>`;
  bind();
}

function matches(){
  const leagues=["Tutti","Premier League","Serie A","La Liga","Bundesliga","Ligue 1"];
  document.querySelector("#main").innerHTML=`<div class="page">
    <div class="eyebrow">CALENDARIO</div><h1>MATCHES</h1>
    <p class="subtitle">Scegli la lega e poi entra nel dettaglio.</p>
    <div class="league-list">
      ${leagues.slice(1).map((l,i)=>`<button class="league-row ${i===1?"active":""}" data-league="${l}"><b>${l}</b><span>1</span><em>›</em></button>`).join("")}
    </div>
    <section class="panel">
      <div class="section-head"><h2>PARTITE DEL GIORNO</h2><span>5 disponibili</span></div>
      ${DEMO.games.map(m=>`<button class="match-list" data-open-analysis>
        <span>${m[0]}</span>
        <div>${crest(m[4],m[6])}<b>${m[1]}</b></div>
        <em>VS</em>
        <div><b>${m[2]}</b>${crest(m[5],m[7])}</div>
        <strong>${m[3]}</strong>
      </button>`).join("")}
    </section>
  </div>`;
  document.querySelectorAll(".league-row").forEach(b=>b.onclick=()=>{
    document.querySelectorAll(".league-row").forEach(x=>x.classList.remove("active"));
    b.classList.add("active");
  });
  bind();
}

function reason(l,a,b,t){
  const x=parseFloat(a),y=parseFloat(b),m=Math.max(x,y,1);
  return `<div class="reason">
    <div class="reason-label">${l}</div>
    <div class="reason-values"><b>${a}</b><b>${b}</b></div>
    <div class="reason-bars"><i style="width:${x/m*100}%"></i><i style="width:${y/m*100}%"></i></div>
    <p>${t}</p>
  </div>`;
}

function formCard(team){
  const dot={W:"green",D:"yellow",L:"red"};
  const arrow=team.trend==="up"?"↗":team.trend==="down"?"↘":"→";
  const arrowClass=team.trend==="up"?"up":team.trend==="down"?"down":"stable";
  return `<div class="form-team">
    <div class="form-team-name">${team.name}</div>
    <div class="form-row"><div class="result-dots">${team.results.map(r=>`<i class="${dot[r]}"></i>`).join("")}</div><strong class="${arrowClass}">${arrow} ${team.pct}%</strong></div>
    <small>Ultime 5</small>
  </div>`;
}

function compareRow(a,b,c,t,withInfo=true){
  return `<div class="compare-row"><span>${a}${withInfo?` ${info(a,t)}`:""}</span><b>${b}</b><b>${c}</b></div>`;
}

function analysis(){
  const m=DEMO.match;
  document.querySelector("#main").innerHTML=`<div class="page analysis-page">
    <div class="eyebrow">MATCH ANALYSIS</div>
    <h1>Milan — Roma</h1><p class="subtitle">Serie A · pre-match · dati demo</p>

    <section class="panel model-card">
      <div class="section-head">
        <h2>MODELLO ${info("Modello","Il modello combina probabilità di esito, qualità delle occasioni, rendimento recente, comportamento nell'ultimo terzo e contesto della partita.")}</h2>
        <div class="badges"><span class="badge green">ALTA CONVERGENZA</span><span class="badge gold">EDGE +15%</span></div>
      </div>
      <div class="model-probs">${m.probabilities.map(p=>`<div><small>${p.label}</small><b>${p.pct}%</b><span>${p.name}</span></div>`).join("")}</div>
      <div class="confidence-box">
        <div><span>CONFIDENCE ${info("Confidence","Misura quanto i principali indicatori importanti vanno nella stessa direzione. Non è una seconda probabilità dell'esito.")}</span><strong>${m.confidence}%</strong></div>
        <div class="big-progress"><i style="width:${m.confidence}%"></i></div>
        <p>Più indicatori importanti vanno nella stessa direzione.</p>
      </div>
      <div class="edge-box">
        <div class="edge-head"><span>VALUE / EDGE ${info("Edge","Indica un potenziale vantaggio rispetto alla quota di mercato, quando la quota è disponibile. Non si somma alla probabilità.")}</span><strong>+${m.edge}%</strong></div>
        <p>Il modello vede un potenziale scostamento favorevole rispetto al mercato.</p>
      </div>
      <div class="model-explain"><div class="explain-title">PERCHÉ IL MODELLO VEDE MILAN?</div>${m.reasons.map(r=>reason(...r)).join("")}</div>
    </section>

    <section class="panel market-detail">
      <div class="section-head"><h2>ALTRI MERCATI</h2><span>PROBABILITÀ MODELLO</span></div>
      <div class="market-detail-grid">
        ${m.markets.map(x=>`<div class="market-detail-card"><span>${x.title}</span><strong>${x.pct}%</strong></div>`).join("")}
      </div>
    </section>

    <section class="panel">
      <div class="section-head"><h2>FORMA ${info("Forma","La forma confronta le ultime cinque partite con il rendimento precedente della squadra. Tiene conto di risultati, statistiche offensive e difensive e della qualità delle occasioni create e concesse.")}</h2><span>ULTIME 5</span></div>
      <div class="form-grid">${formCard(m.form.home)}${formCard(m.form.away)}</div>
    </section>

    <section class="panel">
      <div class="section-head"><h2>INDICATORI DI CONTROLLO</h2><span>CONTESTO</span></div>
      <div class="compare-head"><span>INDICATORE</span><b>MIL</b><b>ROM</b></div>
      ${compareRow("Pressione alta",m.control[0][1],m.control[0][2],"Media della capacità di recuperare palla nell'ultimo terzo; misura dove e come avviene il recupero.",false)}
      ${compareRow("Recupero palla",m.control[1][1],m.control[1][2],"Tempo medio associato ai recuperi palla.",false)}
      ${compareRow("Recuperi offensivi",m.control[2][1],m.control[2][2],"Quota di recuperi effettuati in zone avanzate.",false)}
      ${compareRow("PPDA",m.control[3][1],m.control[3][2],"Passaggi concessi prima di un'azione difensiva; valore più basso indica maggiore intensità di pressione.",true)}
      <p class="table-note">La pressione alta è una media del comportamento di recupero nell'ultimo terzo: misura la capacità di recuperare lì, non semplicemente quanto la squadra pressa.</p>
    </section>

    <section class="panel">
      <div class="section-head"><h2>FORZA AVVERSARIO ${info("Forza avversario","Rating dinamico 1–100 ottenuto sintetizzando più parametri della qualità dell'avversario. Il valore può salire o scendere quando cambiano le prestazioni.")}</h2><span>1–100</span></div>
      <div class="strength-grid">${m.strength.map(x=>`<div><span>${x[0]}</span><strong>${x[1]}</strong><small>Rating dinamico</small></div>`).join("")}</div>
    </section>

    <section class="panel">
      <div class="section-head"><h2>CONFRONTO DATI</h2><span>Milan · Roma</span></div>
      <div class="compare-head"><span>INDICATORE</span><b>MIL</b><b>ROM</b></div>
      ${compareRow("xG","1.84","1.21","Expected Goals: qualità e quantità delle occasioni create.")}
      ${compareRow("xGA","0.94","1.37","Expected Goals Against: qualità delle occasioni concesse.")}
      ${compareRow("xG / tiro","0.13","0.10","Qualità media della conclusione; va letta insieme al volume e al contesto.",true)}
      ${compareRow("Ultimo terzo","64","47","Presenza e pericolosità generate nelle zone avanzate.")}
      ${compareRow("Media Corner",m.corners[0],m.corners[1],"")}
    </section>

    <section class="panel reliability">
      <div class="section-head"><h2>DATI E AFFIDABILITÀ</h2><span class="quality">96%</span></div>
      <div class="quality-list">${m.data.map(x=>`<div><span>${x[0]}</span><b>${x[1]}</b></div>`).join("")}</div>
    </section>
  </div>`;
  bind();
}

function simple(t,p){
  document.querySelector("#main").innerHTML=`<div class="page empty"><div class="eyebrow">SPACE16154</div><h1>${t}</h1><p>${p}</p><div class="panel demo-note"><b>V4 · STRUTTURA PRONTA</b><span>Sezione mantenuta per le prossime evoluzioni.</span></div></div>`;
  bind();
}

function showInfo(text){
  const o=document.createElement("div");
  o.className="modal-backdrop";
  o.innerHTML=`<div class="info-modal"><button class="modal-x">×</button><div class="eyebrow">INFO</div><p>${text}</p></div>`;
  document.body.appendChild(o);
  o.querySelector(".modal-x").onclick=()=>o.remove();
  o.onclick=e=>{if(e.target===o)o.remove()};
}

function bind(){
  document.querySelectorAll("[data-nav]").forEach(b=>b.onclick=()=>route(b.dataset.nav));
  document.querySelectorAll("[data-open-analysis]").forEach(b=>b.onclick=()=>route("analysis"));
  document.querySelectorAll(".info").forEach(b=>b.onclick=e=>{e.stopPropagation();showInfo(decodeURIComponent(b.dataset.info))});
}

function route(n){
  document.body.innerHTML=shell(n);
  if(n==="dashboard")dashboard();
  else if(n==="matches")matches();
  else if(n==="analysis")analysis();
  else if(n==="teams")simple("Squadre","Ranking, forma e profili squadra.");
  else simple("Altro","Impostazioni e funzioni future.");
  window.scrollTo(0,0);
}
route("dashboard");
