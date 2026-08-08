const VERSION = "SPACE16154-V5-2026-08-08";

const DEMO = {
  featured: {
    league: "Serie A",
    home: "Milan", away: "Roma", time: "18:00",
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
    {type:"ALTA CONVERGENZA", pick:"1", match:"Milan vs Roma", probability:"74%", confidence:"75%", edge:"+15%", tone:"up"},
    {type:"VALUE / EDGE", pick:"GOL", match:"Arsenal vs Chelsea", probability:"68%", confidence:"71%", edge:"+12%", tone:"value"},
    {type:"ALTA CONVERGENZA", pick:"OVER 2.5", match:"Barcelona vs Sevilla", probability:"68%", confidence:"78%", edge:"", tone:"up"}
  ]
};

const crest = (code, cls="") => `<div class="crest ${cls}"><span>${code}</span></div>`;
const info = (title, text) =>
  `<button class="info" aria-label="Info ${title}" data-info="${encodeURIComponent(text)}">i</button>`;

function nav(id, icon, label, active) {
  return `<button class="nav-item ${active === id ? "active" : ""}" data-nav="${id}">
    <span class="nav-icon">${icon}</span><span>${label}</span>
  </button>`;
}

function shell(active="dashboard") {
  return `<header class="topbar">
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

function stat(t,v,s,i,p,g) {
  return `<button class="stat-card" data-nav="${g}">
    <div class="stat-top"><span>${t}</span><b>${i}</b></div>
    <strong>${v}</strong><small>${s}</small>
    <div class="progress"><i style="width:${p}%"></i></div>
  </button>`;
}

function pred(label, sub, value, pct) {
  return `<div class="pred-card">
    <small>${label}</small><span>${sub}</span><strong>${value}</strong><em>${pct}%</em>
  </div>`;
}

function featured() {
  const f = DEMO.featured;
  return `<section class="panel featured">
    <div class="section-head">
      <h2>☆ &nbsp; MATCH IN EVIDENZA</h2><span>${f.league}</span>
    </div>
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

function upcoming() {
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

function signals() {
  return `<section class="panel">
    <div class="section-head"><h2>◎ &nbsp; TOP SIGNALS</h2><button class="text-btn" data-nav="analysis">INTELLIGENCE ›</button></div>
    <div class="signal-row">
      ${DEMO.signals.map(s => `
        <article class="signal ${s.tone}">
          <div class="signal-type">${s.type} ${info(s.type, s.tone === "value"
            ? "L'Edge segnala un potenziale scostamento tra la stima del modello e la quota di mercato, quando la quota è disponibile."
            : "Alta Convergenza è un'etichetta della Confidence: indica che molti indicatori importanti stanno leggendo la partita nella stessa direzione.")}</div>
          <div class="signal-main">${s.pick}</div>
          <div class="signal-match">${s.match}</div>
          <div class="signal-result"><span>ESITO</span><strong>${s.pick}</strong><b>${s.probability}</b></div>
          <div class="signal-bottom"><span>CONFIDENCE ${s.confidence}</span><strong>${s.edge || "—"}</strong></div>
        </article>`).join("")}
    </div>
  </section>`;
}

function dashboard() {
  document.querySelector("#main").innerHTML = `<div class="page">
    <div class="page-title-row">
      <div><div class="eyebrow">PANORAMICA</div><h1>DASHBOARD</h1><p>Il quadro sintetico prima di entrare nel dettaglio.</p></div>
      <button class="date-btn">8 AGOSTO 2026⌄</button>
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

function matches() {
  const leagues = ["Serie A","Premier League","La Liga","Bundesliga","Ligue 1"];
  document.querySelector("#main").innerHTML = `<div class="page">
    <div class="eyebrow">CALENDARIO</div><h1>MATCHES</h1>
    <p class="subtitle">Scegli la competizione e poi entra nel dettaglio.</p>
    <div class="league-stack">
      ${leagues.map((l,i) => `<button class="league-row ${i===0?"active":""}" data-league="${l}">
        <span>${l}</span><b>${i===0?3:2}</b><em>›</em>
      </button>`).join("")}
    </div>
    <section class="panel">
      <div class="section-head"><h2>PARTITE DEL GIORNO</h2><span>5 disponibili</span></div>
      ${DEMO.games.map(g => `<button class="match-list" data-open-analysis>
        <span>${g[0]}</span>
        <div>${crest(g[4],g[6])}<b>${g[1]}</b></div>
        <em>VS</em>
        <div><b>${g[2]}</b>${crest(g[5],g[7])}</div>
        <strong>${g[3]}</strong><small>${g[8]}</small>
      </button>`).join("")}
    </section>
  </div>`;
  bind();
}

function reason(label, a, b, text) {
  const x = parseFloat(a), y = parseFloat(b), m = Math.max(x,y,1);
  return `<div class="reason">
    <div class="reason-label">${label}</div>
    <div class="reason-values"><b>${a}</b><b>${b}</b></div>
    <div class="reason-bars"><i style="width:${x/m*100}%"></i><i style="width:${y/m*100}%"></i></div>
    <p>${text}</p>
  </div>`;
}

function row(label, a, b, text, showInfo=true) {
  return `<div class="compare-row">
    <span>${label}${showInfo ? " " + info(label,text) : ""}</span><b>${a}</b><b>${b}</b>
  </div>`;
}

function mini(label, value, text, showInfo=false) {
  return `<div class="mini-card">
    <span>${label}${showInfo ? " " + info(label,text) : ""}</span><b>${value}</b>
  </div>`;
}

function formTeam(name, results, pct, trend, trendClass) {
  return `<div class="form-team">
    <div class="form-team-name">${name}</div>
    <div class="form-line">
      <div class="form-dots">${results.map(r => `<i class="${r}"></i>`).join("")}</div>
      <strong class="${trendClass}">${trend} ${pct}%</strong>
    </div>
    <small>Ultime 5</small>
  </div>`;
}

function analysis() {
  document.querySelector("#main").innerHTML = `<div class="page analysis-page">
    <div class="eyebrow">MATCH ANALYSIS</div>
    <h1>Milan — Roma</h1>
    <p class="subtitle">Serie A · pre-match · dati demo</p>

    <section class="panel model-card">
      <div class="section-head">
        <h2>MODELLO ${info("Modello","Il modello combina probabilità di esito, qualità delle occasioni, rendimento recente, comportamento nell'ultimo terzo e fattore campo.")}</h2>
        <div class="badges">
          <span class="badge green">ALTA CONVERGENZA</span>
          <span class="badge gold">EDGE +15%</span>
        </div>
      </div>

      <div class="model-probs">
        <div><small>1</small><b>74%</b><span>Milan</span></div>
        <div><small>X</small><b>5%</b><span>Pareggio</span></div>
        <div><small>2</small><b>21%</b><span>Roma</span></div>
      </div>

      <div class="confidence-box">
        <div><span>CONFIDENCE ${info("Confidence","La Confidence misura quanto i parametri che abbiamo scelto concordano verso la stessa lettura della partita.")}</span><strong>75%</strong></div>
        <div class="big-progress"><i style="width:75%"></i></div>
        <p>Più indicatori importanti vanno nella stessa direzione.</p>
      </div>

      <div class="model-explain">
        <div class="explain-title">PERCHÉ IL MODELLO VEDE MILAN?</div>
        ${reason("xG","1.84","1.21","Crea occasioni attese di qualità superiore.")}
        ${reason("xGA","0.94","1.37","Concede occasioni mediamente meno pericolose.")}
        ${reason("FORMA","78%","61%","Trend delle ultime 5 gare, considerando risultati e qualità della prestazione.")}
        ${reason("ULTIMO TERZO","64","47","Più presenza e pericolosità nelle zone avanzate.")}
        ${reason("QUALITÀ TIRO","0.13","0.10","xG medio per tiro: evita di premiare soltanto il numero dei tiri.")}
      </div>

      <div class="model-note">
        <b>LETTURA DEL SEGNALE</b>
        <strong>Value / Edge +15%</strong>
        <p>L'Edge indica un potenziale vantaggio rispetto alla quota di mercato, quando la quota è disponibile. Non si somma alla probabilità.</p>
        <div class="risk"><b>⚠ RISCHIO PRINCIPALE</b><span>Fattore campo e forma recente hanno un peso rilevante.</span></div>
      </div>
    </section>

    <section class="panel form-panel">
      <div class="section-head">
        <h2>FORMA ${info("Forma","La forma confronta le ultime 5 partite con il rendimento precedente della squadra. Tiene conto di risultati, statistiche offensive e difensive e qualità delle occasioni create e concesse.")}</h2>
        <span>ULTIME 5</span>
      </div>
      ${formTeam("Milan",["win","win","draw","win","win"],78,"↗","up")}
      ${formTeam("Roma",["win","draw","loss","win","draw"],61,"→","stable")}
    </section>

    <section class="panel">
      <div class="section-head"><h2>CONFRONTO DATI</h2><span>Milan · Roma</span></div>
      <div class="compare-head"><span>INDICATORE</span><b>MIL</b><b>ROM</b></div>
      ${row("xG","1.84","1.21","Qualità e quantità delle occasioni create.")}
      ${row("xGA","0.94","1.37","Qualità delle occasioni concesse.")}
      ${row("xThreat ultimo terzo","1.42","0.96","Pericolosità generata nelle zone avanzate.",true)}
      ${row("Entrate in area","18","11","Possessi che entrano nell'area avversaria.",false)}
      ${row("Tiri in porta","6","4","Conclusioni nello specchio della porta.",false)}
      ${row("xG / tiro","0.13","0.10","Qualità media della conclusione.",true)}
      ${row("Possesso","58%","42%","Contesto di gioco: pesa meno della pericolosità reale.",false)}
      ${row("Media Corner","5.0","4.0","Media dei corner conquistati nelle partite considerate.",true)}
    </section>

    <section class="panel">
      <div class="section-head"><h2>INDICATORI DI CONTROLLO</h2><span>CONTESTO</span></div>
      ${mini("Pressione alta","67%","Quota media di recuperi effettuati nell'ultimo terzo. Il dato descrive dove e come la squadra recupera, non il semplice possesso.",false)}
      ${mini("Recupero palla","8.7s","Tempo medio per recuperare palla, corretto per la forza dell'avversario.",false)}
      ${mini("Recuperi offensivi","23%","Quota di recuperi che avvengono in zone avanzate.",false)}
      ${mini("PPDA","8.2","Passaggi concessi all'avversario per azione difensiva: va letto insieme a dove e come avvengono i recuperi.",true)}
      <div class="control-note">La pressione alta è una media del comportamento di recupero nell'ultimo terzo: misura la capacità di recuperare lì, non semplicemente quanto la squadra pressa.</div>
    </section>

    <section class="panel">
      <div class="section-head"><h2>FORZA AVVERSARIO ${info("Forza avversario","Rating dinamico 1–100 costruito combinando forza offensiva, difensiva, produzione, qualità delle occasioni, forma e livello degli avversari affrontati. Il valore può cambiare nel tempo.")}</h2><span>1–100</span></div>
      <div class="mini-grid">
        ${mini("Milan","72","Rating dinamico.",false)}
        ${mini("Roma","68","Rating dinamico.",false)}
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

function simple(t,p) {
  document.querySelector("#main").innerHTML = `<div class="page empty">
    <div class="eyebrow">SPACE16154</div><h1>${t}</h1><p>${p}</p>
    <div class="panel demo-note"><b>V5 · STRUTTURA PRONTA</b><span>Questa sezione sarà collegata ai dati reali nel prossimo step.</span></div>
  </div>`;
  bind();
}

function showInfo(text) {
  const o = document.createElement("div");
  o.className = "modal-backdrop";
  o.innerHTML = `<div class="info-modal"><button class="modal-x">×</button><div class="eyebrow">INFO</div><p>${text}</p></div>`;
  document.body.appendChild(o);
  o.querySelector(".modal-x").onclick = () => o.remove();
  o.onclick = e => { if (e.target === o) o.remove(); };
}

function bind() {
  document.querySelectorAll("[data-nav]").forEach(b => b.onclick = () => route(b.dataset.nav));
  document.querySelectorAll("[data-open-analysis]").forEach(b => b.onclick = () => route("analysis"));
  document.querySelectorAll(".info").forEach(b => b.onclick = e => {
    e.stopPropagation();
    showInfo(decodeURIComponent(b.dataset.info));
  });
  document.querySelectorAll(".league-row").forEach(b => b.onclick = () => {
    document.querySelectorAll(".league-row").forEach(x => x.classList.remove("active"));
    b.classList.add("active");
  });
}

function route(n) {
  document.body.innerHTML = shell(n);
  if (n === "dashboard") dashboard();
  else if (n === "matches") matches();
  else if (n === "analysis") analysis();
  else if (n === "teams") simple("Squadre","Ranking, forza dinamica e profili squadra.");
  else simple("Altro","Impostazioni e funzioni future.");
  window.scrollTo({top:0,behavior:"instant"});
}

document.documentElement.dataset.version = VERSION;
route("dashboard");
