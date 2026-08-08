const VERSION = "SPACE16154-V6-2026-08-08";

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
    <div class="analysis-hero">
      <button class="back-btn" data-nav="dashboard" aria-label="Indietro">←</button>
      <div class="eyebrow">SERIE A · PRE-MATCH</div>
      <div class="analysis-match">
        <div class="analysis-club">${crest("MIL","milan")}<strong>Milan</strong></div>
        <div class="analysis-vs"><b>VS</b><span>OGGI · 18:00</span></div>
        <div class="analysis-club">${crest("ROM","roma")}<strong>Roma</strong></div>
      </div>
    </div>

    <section class="panel probability-panel">
      <div class="section-head"><h2>PROBABILITÀ DEL MODELLO ${info("Probabilità","Probabilità stimate dal modello per i principali mercati della partita.")}</h2></div>
      <div class="probability-grid">
        <div class="prob-market">
          <small>1X2</small>
          <div class="prob-triple">
            <div><span>1</span><b>74%</b><em>Milan</em></div>
            <div><span>X</span><b class="neutral">5%</b><em>Pareggio</em></div>
            <div><span>2</span><b>21%</b><em>Roma</em></div>
          </div>
        </div>
        <div class="prob-market">
          <small>GOL / NO GOL</small>
          <div class="prob-pair">
            <div><span>GOL</span><b class="green">68%</b></div>
            <div><span>NO GOL</span><b class="red">32%</b></div>
          </div>
        </div>
        <div class="prob-market">
          <small>OVER / UNDER 2.5</small>
          <div class="prob-pair">
            <div><span>OVER 2.5</span><b class="green">61%</b></div>
            <div><span>UNDER 2.5</span><b class="red">39%</b></div>
          </div>
        </div>
      </div>
    </section>

    <section class="panel reading-panel">
      <div class="section-head"><h2>LETTURA DEL MODELLO</h2></div>
      <div class="reading-grid">
        <div class="reading-block">
          <div class="reading-label">CONFIDENCE ${info("Confidence","Misura quanto i parametri importanti scelti per il modello concordano verso la stessa lettura della partita.")}</div>
          <strong class="reading-value green-text">75%</strong>
          <div class="confidence-segments">${Array.from({length:10},(_,i)=>`<i class="${i<7?'on':''}"></i>`).join("")}</div>
          <p>Più indicatori importanti vanno nella stessa direzione.</p>
        </div>
        <div class="reading-block">
          <div class="reading-label">VALUE / EDGE ${info("Value / Edge","L'Edge indica un potenziale vantaggio rispetto alla quota di mercato, quando la quota è disponibile. Non si somma alla probabilità.")}</div>
          <strong class="reading-value gold-text">+15%</strong>
          <p>Il modello vede un potenziale vantaggio rispetto alla quota di mercato (se disponibile).</p>
        </div>
        <div class="risk-block">
          <b>⚠ &nbsp; RISCHIO PRINCIPALE</b>
          <p>Fattore campo e forma recente hanno un peso rilevante.</p>
        </div>
      </div>
    </section>

    <section class="panel reason-panel">
      <div class="section-head"><h2>PERCHÉ IL MODELLO VEDE MILAN?</h2></div>
      <div class="reason-table">
        <div class="reason-head"><span>INDICATORE</span><b>MILAN</b><b>ROMA</b><b>VANTAGGIO</b></div>
        <div class="reason-row"><span>xG</span><b>1.84</b><div class="bar"><i style="width:100%"></i></div><b>1.21</b><div class="bar gray"><i style="width:66%"></i></div><strong>+0.63</strong></div>
        <div class="reason-row"><span>xGA</span><b>0.94</b><div class="bar"><i style="width:69%"></i></div><b>1.37</b><div class="bar gray"><i style="width:100%"></i></div><strong>-0.43</strong></div>
        <div class="reason-row"><span>FORMA (ULTIME 5)</span><b>78%</b><div class="bar"><i style="width:78%"></i></div><b>61%</b><div class="bar gray"><i style="width:61%"></i></div><strong>+17%</strong></div>
        <div class="reason-row"><span>ULTIMO TERZO</span><b>64</b><div class="bar"><i style="width:100%"></i></div><b>47</b><div class="bar gray"><i style="width:73%"></i></div><strong>+17</strong></div>
        <div class="reason-row technical"><span>QUALITÀ TIRO <small>(xG per tiro)</small></span><b>0.13</b><div class="bar"><i style="width:100%"></i></div><b>0.10</b><div class="bar gray"><i style="width:77%"></i></div><strong>+0.03</strong></div>
      </div>
    </section>

    <div class="analysis-two-col">
      <section class="panel form-panel">
        <div class="section-head"><h2>FORMA ${info("Forma","Le ultime 5 partite sono rappresentate con pallini: verde = vittoria, giallo = pareggio, rosso = sconfitta. La percentuale sintetizza il rendimento recente.")}</h2><span>ULTIME 5</span></div>
        ${formTeam("Milan",["win","win","draw","win","win"],78,"↗","up")}
        ${formTeam("Roma",["win","draw","loss","win","draw"],61,"→","stable")}
      </section>

      <section class="panel control-panel">
        <div class="section-head"><h2>INDICATORI DI CONTROLLO</h2><span>CONTESTO</span></div>
        <div class="control-head"><span>INDICATORE</span><b>MILAN</b><b>ROMA</b></div>
        ${row("Pressione alta","77%","61%","Comportamento di recupero nell'ultimo terzo.",false)}
        ${row("Recupero palla","8.2s","11.7s","Tempo medio per recuperare palla.",false)}
        ${row("Recuperi offensivi","23%","17%","Quota di recuperi in zone avanzate.",false)}
        ${row("PPDA","8.2","11.7","Passaggi concessi per azione difensiva.",false)}
      </section>

      <section class="panel opponent-panel">
        <div class="section-head"><h2>FORZA AVVERSARIO ${info("Forza avversario","Rating dinamico da 1 a 100 che sintetizza qualità della squadra e livello degli avversari affrontati.")}</h2><span>1–100</span></div>
        <div class="opponent-grid">
          <div><span>Milan</span><strong>72</strong></div>
          <div><span>Roma</span><strong>68</strong></div>
        </div>
      </section>

      <section class="panel reliability-panel">
        <div class="section-head"><h2>DATI E AFFIDABILITÀ</h2><span class="quality">96%</span></div>
        <div class="reliability-grid">
          <div><span>▣</span><b>Fixture</b><em>Completo</em></div>
          <div><span>◫</span><b>xG / xGA</b><em>Completo</em></div>
          <div><span>◈</span><b>Forma ultime 5</b><em>Completo</em></div>
          <div><span>◉</span><b>Quote</b><em>Disponibili</em></div>
        </div>
      </section>
    </div>
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
