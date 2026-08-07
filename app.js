const DEMO = {
  featured: {
    league: "Serie A", home: "Milan", away: "Roma", time: "18:00",
    hc: "MIL", ac: "ROM", hcl: "milan", acl: "roma",
    result: ["1", 74], goals: ["GOL", 68], ou: ["OVER 2.5", 61]
  },
  games: [
    ["18:00","Milan","Roma","74%","MIL","ROM","milan","roma","Serie A"],
    ["18:30","Arsenal","Chelsea","61%","ARS","CHE","arsenal","chelsea","Premier League"],
    ["20:00","Barcelona","Sevilla","68%","BAR","SEV","barcelona","sevilla","La Liga"],
    ["20:30","Bayern","Leverkusen","55%","BAY","LEV","bayern","leverkusen","Bundesliga"],
    ["21:00","PSG","Lyon","72%","PSG","LYO","psg","lyon","Ligue 1"]
  ],
  signals: [
    {type:"ALTA CONVERGENZA", pick:"1", match:"Milan vs Roma", probability:"74%", confidence:"75%", kind:"up"},
    {type:"VALUE / EDGE +12%", pick:"GOL", match:"Arsenal vs Chelsea", probability:"64%", confidence:"71%", kind:"value", edge:"+12%"},
    {type:"ALTA CONVERGENZA", pick:"OVER 2.5", match:"Barcelona vs Sevilla", probability:"68%", confidence:"72%", kind:"up"}
  ]
};

const crest = (code, cls="") => `<div class="crest ${cls}"><span>${code}</span></div>`;
const info = (title, text) =>
  `<button class="info" aria-label="Info ${title}" data-info="${encodeURIComponent(text)}">i</button>`;

function nav(id, icon, label, active){
  return `<button class="nav-item ${active===id ? "active":""}" data-nav="${id}">
    <span class="nav-icon">${icon}</span><span>${label}</span>
  </button>`;
}

function shell(active="dashboard"){
  return `
  <header class="topbar">
    <div class="brand">
      <div class="brand-name">SPACE16154</div>
      <div class="brand-sub">FOOTBALL INTELLIGENCE</div>
    </div>
    <div class="engine"><i></i></div>
  </header>
  <main id="main"></main>
  <nav class="bottom-nav">
    ${nav("dashboard","⌂","Dashboard",active)}
    ${nav("matches","□","Matches",active)}
    ${nav("analysis","◇","Analysis",active)}
    ${nav("teams","♙","Squadre",active)}
    ${nav("more","•••","Altro",active)}
  </nav>`;
}

function stat(title, value, sub, icon, pct, target){
  return `<button class="stat-card" data-nav="${target}">
    <div class="stat-top"><span>${title}</span><b>${icon}</b></div>
    <strong>${value}</strong><small>${sub}</small>
    <div class="progress"><i style="width:${pct}%"></i></div>
  </button>`;
}

function pred(title, sub, value, pct){
  return `<div class="pred-card">
    <small>${title}</small><span>${sub}</span><strong>${value}</strong><em>${pct}%</em>
  </div>`;
}

function featured(){
  const f = DEMO.featured;
  return `<section class="panel">
    <div class="section-head"><h2>☆ &nbsp; MATCH IN EVIDENZA</h2><span>${f.league}</span></div>
    <div class="match-hero">
      <div class="club">${crest(f.hc,f.hcl)}<strong>${f.home}</strong></div>
      <div class="match-time"><b>${f.time}</b><span>OGGI</span><em>VS</em></div>
      <div class="club">${crest(f.ac,f.acl)}<strong>${f.away}</strong></div>
    </div>
    <div class="prediction-grid">
      ${pred("1X2","ESITO PIÙ PROBABILE",f.result[0],f.result[1])}
      ${pred("GOL / NO GOL","ESITO PIÙ PROBABILE",f.goals[0],f.goals[1])}
      ${pred("OVER / UNDER 2.5","ESITO PIÙ PROBABILE",f.ou[0],f.ou[1])}
    </div>
    <button class="primary-btn" data-open-analysis>VAI ALL'ANALISI COMPLETA <span>›</span></button>
  </section>`;
}

function upcoming(){
  return `<section class="panel">
    <div class="section-head"><h2>PROSSIME PARTITE</h2><button class="text-btn" data-nav="matches">VEDI TUTTE ›</button></div>
    ${DEMO.games.slice(1).map(g => `
      <button class="fixture" data-open-analysis>
        <div><b>${g[0]}</b><small>OGGI</small></div>
        <div class="fixture-team">${crest(g[4],g[6])}<span>${g[1]}</span></div>
        <b class="vs">VS</b>
        <div class="fixture-team away"><span>${g[2]}</span>${crest(g[5],g[7])}</div>
        <span class="competition">${g[8]}</span><span class="chev">›</span>
      </button>`).join("")}
  </section>`;
}

function signals(){
  return `<section class="panel signals">
    <div class="section-head"><h2>◎ &nbsp; TOP SIGNALS</h2><button class="text-btn" data-nav="analysis">INTELLIGENCE ›</button></div>
    <div class="signal-row">
      ${DEMO.signals.map(s => `
        <article class="signal ${s.kind}">
          <div class="signal-type">${s.type} ${info(s.type,
            s.kind==="value"
              ? "Edge indica un potenziale scostamento tra la stima del modello e la probabilità implicita della quota. Non è una probabilità aggiuntiva."
              : "Alta Convergenza indica che più famiglie di indicatori indipendenti puntano nella stessa direzione.")}</div>
          <div class="signal-match">${s.match}</div>
          <div class="signal-pick">${s.pick}</div>
          <div class="signal-meta">
            <span>PROBABILITÀ <b>${s.probability}</b></span>
            <span>CONFIDENCE <b>${s.confidence}</b></span>
          </div>
          ${s.edge ? `<div class="signal-edge">${s.edge}</div>` : ""}
          <div class="confidence-bar"><i style="width:${parseInt(s.confidence)}%"></i></div>
        </article>`).join("")}
    </div>
  </section>`;
}

function dashboard(){
  document.querySelector("#main").innerHTML = `
    <div class="page">
      <div class="page-title-row">
        <div><div class="eyebrow">PANORAMICA</div><h1>DASHBOARD</h1><p>Il quadro sintetico prima di entrare nel dettaglio.</p></div>
        <button class="date-btn">5 AGOSTO 2026⌄</button>
      </div>
      <div class="stats">
        ${stat("PARTITE OGGI","18","Vai alla lista completa","□",67,"matches")}
        ${stat("SEGNALI","7","Opportunità rilevate","◎",52,"analysis")}
        ${stat("CONFIDENCE MEDIA","71%","Coerenza dei segnali","◉",71,"analysis")}
        ${stat("DATA QUALITY","96%","Copertura dati","✓",96,"analysis")}
      </div>
      ${featured()}${upcoming()}${signals()}
    </div>`;
  bind();
}

function matches(){
  const leagues = ["Serie A","Premier League","La Liga","Bundesliga","Ligue 1"];
  document.querySelector("#main").innerHTML = `
    <div class="page">
      <div class="eyebrow">CALENDARIO</div><h1>MATCHES</h1>
      <p class="subtitle">Scegli una competizione e poi entra nel dettaglio.</p>
      <div class="league-stack">
        ${leagues.map((l,i)=>`
          <button class="league-row ${i===0?"active":""}" data-league="${l}">
            <span>${l}</span><b>${i===0?3:2}</b><em>›</em>
          </button>`).join("")}
      </div>
      <section class="panel">
        <div class="section-head"><h2>PARTITE DEL GIORNO</h2><span id="leagueLabel">Serie A</span></div>
        <div id="matchList">
          ${renderMatches("Serie A")}
        </div>
      </section>
    </div>`;
  bind();
}

function renderMatches(league){
  const list = DEMO.games.filter(g => league==="Serie A" ? g[8]==="Serie A" : g[8]===league);
  return list.length ? list.map(g=>`
    <button class="match-list" data-open-analysis>
      <span>${g[0]}</span>
      <div>${crest(g[4],g[6])}<b>${g[1]}</b></div>
      <em>VS</em>
      <div><b>${g[2]}</b>${crest(g[5],g[7])}</div>
      <strong>${g[3]}</strong>
    </button>`).join("") :
    `<div class="empty-league">Nessuna partita demo disponibile per questa competizione.</div>`;
}

function reason(label,a,b,text){
  const x=parseFloat(a), y=parseFloat(b), m=Math.max(x,y,1);
  return `<div class="reason">
    <div class="reason-label">${label}</div>
    <div class="reason-values"><b>${a}</b><b>${b}</b></div>
    <div class="reason-bars"><i style="width:${x/m*100}%"></i><i style="width:${y/m*100}%"></i></div>
    <p>${text}</p>
  </div>`;
}

function row(label,a,b,text, showInfo=true){
  return `<div class="compare-row">
    <span>${label}${showInfo ? " "+info(label,text) : ""}</span><b>${a}</b><b>${b}</b>
  </div>`;
}

function mini(label,a,b,text, showInfo=false){
  return `<div class="mini-card">
    <span>${label}${showInfo ? " "+info(label,text) : ""}</span>
    <div class="mini-values"><b>${a}</b><b>${b}</b></div>
  </div>`;
}

function modelInfo(){
  return `Il modello combina qualità delle occasioni, rendimento recente, comportamento nell'ultimo terzo, controllo, fattore campo e altri indicatori. La Confidence misura quanto questi segnali sono coerenti tra loro. L'Edge viene mostrato solo quando esiste uno scostamento significativo rispetto alla quota.`;
}

function confidenceEdgeBlock(){
  return `<div class="model-reading">
    <div class="reading-head">COME LEGGERE IL MODELLO ${info("Confidence + Edge",
      "Confidence: misura quanto i principali indicatori analizzati sono coerenti tra loro. Non è una seconda probabilità dell'esito. Edge: misura il potenziale scostamento tra la stima del modello e la probabilità implicita della quota. Se non c'è uno scostamento significativo, viene mostrata solo l'Alta Convergenza.")}</div>
    <div class="reading-grid">
      <div><b>CONFIDENCE</b><span>75%</span><p>Quanto gli indicatori concordano sulla stessa lettura.</p></div>
      <div><b>EDGE</b><span>+15%</span><p>Potenziale differenza tra stima del modello e quota, quando presente.</p></div>
    </div>
  </div>`;
}

function analysis(){
  document.querySelector("#main").innerHTML = `
  <div class="page analysis-page">
    <div class="eyebrow">MATCH ANALYSIS</div>
    <h1>Milan — Roma</h1>
    <p class="subtitle">Serie A · pre-match · dati demo</p>

    <section class="panel model-card">
      <div class="section-head">
        <h2>MODELLO ${info("Modello",modelInfo())}</h2>
        <div class="badges"><span class="badge green">ALTA CONVERGENZA</span><span class="badge gold">EDGE +15%</span></div>
      </div>

      <div class="model-probs">
        <div><small>1</small><b>74%</b><span>Milan</span></div>
        <div><small>X</small><b>5%</b><span>Pareggio</span></div>
        <div><small>2</small><b>21%</b><span>Roma</span></div>
      </div>

      <div class="confidence-box">
        <div><span>CONFIDENCE</span><strong>75%</strong></div>
        <div class="big-progress"><i style="width:75%"></i></div>
        <p>Alta coerenza tra produzione offensiva, difesa, forma e controllo dell'ultimo terzo.</p>
      </div>

      <div class="model-explain">
        <div class="explain-title">PERCHÉ IL MODELLO VEDE MILAN?</div>
        ${reason("xG","1.84","1.21","Il Milan crea più occasioni attese e di maggiore qualità complessiva.")}
        ${reason("xGA","0.94","1.37","Il Milan concede occasioni attese di qualità inferiore.")}
        ${reason("FORMA","↗ 78%","→ 61%","La forma confronta le ultime 5 partite con il rendimento precedente e considera risultati, gol, qualità delle occasioni create e concesse, qualità dei tiri e contesto della prestazione.")}
        ${reason("ULTIMO TERZO","64","47","Il Milan genera più pericolosità e presenza nelle zone avanzate.")}
        ${reason("QUALITÀ OCCASIONI","0.13","0.10","xG medio per tiro: evita di premiare semplicemente il numero dei tiri.")}
      </div>

      <div class="model-note">
        <b>LETTURA DEL SEGNALE</b>
        <strong>Value / Edge +15%</strong>
        <p>L'Edge non si somma alla probabilità: segnala un potenziale scostamento tra modello e quota.</p>
        <div class="risk"><b>⚠ RISCHIO PRINCIPALE</b><span>Fattore campo e forma recente hanno un peso rilevante.</span></div>
      </div>

      ${confidenceEdgeBlock()}
    </section>

    <section class="panel">
      <div class="section-head"><h2>CONFRONTO DATI</h2><span>Milan · Roma</span></div>
      <div class="compare-head"><span>INDICATORE</span><b>MIL</b><b>ROM</b></div>
      ${row("xG","1.84","1.21","Qualità e quantità delle occasioni create.",true)}
      ${row("xGA","0.94","1.37","Qualità delle occasioni concesse.",true)}
      ${row("xThreat ultimo terzo","1.42","0.96","Pericolosità generata nelle zone avanzate.",true)}
      ${row("Entrate in area","18","11","Numero di ingressi nell'area avversaria.",false)}
      ${row("Tiri in porta","6","4","Conclusioni che hanno centrato lo specchio.",false)}
      ${row("Media Corner","5.0","4.0","Media dei corner conquistati nelle partite considerate.",true)}
      ${row("Possesso","58%","42%","Dato di contesto: pesa meno della pericolosità reale.",false)}
      ${row("Qualità occasioni","0.13","0.10","xG medio per tiro, utile per distinguere volume e pericolosità.",true)}
    </section>

    <section class="panel">
      <div class="section-head"><h2>INDICATORI DI CONTROLLO</h2><span>NON DECIDONO DA SOLI</span></div>
      <div class="advanced">
        ${mini("Pressione alta","67%","49%","Quota media dei recuperi nell'ultimo terzo, coerente con il modo in cui la squadra recupera palla.",false)}
        ${mini("Recuperi offensivi","23%","17%","Quota dei recuperi effettuati in zone avanzate.",false)}
        ${mini("PPDA","8.2","11.7","Passaggi concessi all'avversario prima di un'azione difensiva. Va letto insieme a dove e come avvengono i recuperi.",true)}
        ${mini("Recupero palla","8.7s","11.3s","Tempo medio stimato per recuperare il possesso, corretto per la forza dell'avversario affrontato.",false)}
      </div>
      <div class="control-note">
        <b>COME AVVIENE IL RECUPERO</b>
        <span>La pressione alta misura soprattutto i recuperi nell'ultimo terzo; PPDA e recuperi offensivi aiutano a capire se la squadra aggredisce subito o recupera più avanti nello sviluppo dell'azione.</span>
      </div>
    </section>

    <section class="panel">
      <div class="section-head"><h2>FORZA AVVERSARIO</h2><span>1–100 ${info("Forza avversario","Rating dinamico costruito da più parametri della squadra: produzione offensiva, solidità difensiva, qualità delle occasioni, controllo territoriale e rendimento recente. Il valore viene normalizzato su una scala 1–100 e si aggiorna quando cambiano i dati.")}</span></div>
      <div class="opponent-grid">
        <div><span>Milan</span><b>72</b><small>Rating dinamico</small></div>
        <div><span>Roma</span><b>68</b><small>Rating dinamico</small></div>
      </div>
    </section>

    <section class="panel reliability">
      <div class="section-head"><h2>DATI E AFFIDABILITÀ</h2><span class="quality">96%</span></div>
      <div class="quality-list">
        <div><span>Fixture</span><b>Completo</b></div>
        <div><span>xG / xGA</span><b>Completo</b></div>
        <div><span>Forma ultime 5</span><b>Completo</b></div>
        <div><span>Quote</span><b>Demo</b></div>
      </div>
    </section>
  </div>`;
  bind();
}

function simple(title,text){
  document.querySelector("#main").innerHTML =
    `<div class="page empty"><div class="eyebrow">SPACE16154</div><h1>${title}</h1><p>${text}</p>
    <div class="panel demo-note"><b>V4 · STRUTTURA PRONTA</b><span>Questa sezione resta separata dal motore di analisi.</span></div></div>`;
  bind();
}

function showInfo(text){
  const o=document.createElement("div");
  o.className="modal-backdrop";
  o.innerHTML=`<div class="info-modal"><button class="modal-x" aria-label="Chiudi">×</button><div class="eyebrow">INFO</div><p>${text}</p></div>`;
  document.body.appendChild(o);
  o.querySelector(".modal-x").onclick=()=>o.remove();
  o.onclick=e=>{if(e.target===o)o.remove()};
}

function bind(){
  document.querySelectorAll("[data-nav]").forEach(b=>b.onclick=()=>route(b.dataset.nav));
  document.querySelectorAll("[data-open-analysis]").forEach(b=>b.onclick=()=>route("analysis"));
  document.querySelectorAll(".info").forEach(b=>b.onclick=e=>{e.stopPropagation();showInfo(decodeURIComponent(b.dataset.info))});

  document.querySelectorAll(".league-row").forEach(btn=>{
    btn.onclick=()=>{
      document.querySelectorAll(".league-row").forEach(x=>x.classList.remove("active"));
      btn.classList.add("active");
      const league=btn.dataset.league;
      const list=document.querySelector("#matchList");
      const label=document.querySelector("#leagueLabel");
      if(list) list.innerHTML=renderMatches(league);
      if(label) label.textContent=league;
      bind();
    };
  });
}

function route(name){
  document.body.innerHTML=shell(name);
  if(name==="dashboard") dashboard();
  else if(name==="matches") matches();
  else if(name==="analysis") analysis();
  else if(name==="teams") simple("Squadre","Ranking, forma e profili squadra.");
  else simple("Altro","Impostazioni e funzioni future.");
  window.scrollTo({top:0,behavior:"instant"});
}

route("dashboard");
