
const DATA={
top:[
["18:00","Milan","Roma","1","82","MIL","ROM","milan","roma"],
["20:00","Barcelona","Sevilla","1","79","BAR","SEV","barcelona","sevilla"],
["21:00","PSG","Lyon","1","76","PSG","LYO","psg","lyon"],
["18:30","Arsenal","Chelsea","1X","74","ARS","CHE","arsenal","chelsea"],
["20:30","Bayern","Leverkusen","OVER 2.5","72","BAY","LEV","bayern","leverkusen"]],
leagues:[
["Premier League",20],["Serie A",18],["La Liga",20],["Bundesliga",18],["Ligue 1",18],["Europa League",36]],
teams:[
["Serie A","Milan","MIL","milan","82","74","1.84","0.94","W W D W W"],
["Serie A","Roma","ROM","roma","76","71","1.21","1.37","W D L W D"],
["Premier League","Arsenal","ARS","arsenal","86","82","2.04","0.81","W W W D W"],
["Premier League","Chelsea","CHE","chelsea","78","73","1.66","1.18","D W W L W"],
["La Liga","Barcelona","BAR","barcelona","91","79","2.31","0.88","W W W W D"],
["La Liga","Sevilla","SEV","sevilla","68","65","1.18","1.52","L W D L W"]]
};

const crest=(c,k)=>`<div class="crest ${k}"><span>${c}</span></div>`;
const nav=(id,ic,label,a)=>`<button class="nav-item ${a===id?'active':''}" data-nav="${id}"><span class="nav-icon">${ic}</span><span>${label}</span></button>`;
function shell(a){
return `<header class="topbar"><div class="brand"><div class="brand-name">SPACE16154</div><div class="brand-sub">FOOTBALL INTELLIGENCE</div></div><div class="engine-status"><span>●</span> MOTORE ATTIVO</div></header><main id="main"></main><nav class="bottom-nav">${nav("dashboard","⌂","Overview",a)}${nav("matches","▣","Matches",a)}${nav("teams","♙","Teams",a)}${nav("more","•••","More",a)}</nav>`
}
function stat(t,v,s,ic,p,action=""){return `<article class="stat-card ${action?'clickable':''}" ${action?`data-nav="${action}"`:''}><div class="stat-top"><span>${t}</span><b>${ic}</b></div><strong>${v}</strong><small>${s}</small><div class="progress"><i style="width:${p}%"></i></div></article>`}
function info(t){return `<button class="info" title="${t}">i</button>`}
function matchCard(m){return `<article class="match-card"><div class="match-card-top"><span>${m[0]} · OGGI</span><span>TOP ${m[4]}%</span></div><div class="teams"><div class="team">${crest(m[5],m[7])}${m[1]}</div><div>VS</div><div class="team">${crest(m[6],m[8])}${m[2]}</div></div><div class="pick"><small>PRONOSTICO TOP</small><b>${m[3]}</b><span class="prob">${m[4]}%</span></div></article>`}

function dashboard(){
document.querySelector("#main").innerHTML=`<div class="page">
<div class="page-title-row"><div><div class="eyebrow">PANORAMICA GENERALE</div><h1>DASHBOARD</h1><p>I migliori segnali della giornata</p></div><button class="date-btn">5 AGOSTO 2026⌄</button></div>
<div class="stats">
${stat("PARTITE OGGI","18","Vai alle partite","▣",62,"matches")}
${stat("SEGNALI","12","Segnali rilevati oggi","◎",72)}
${stat("CONFIDENCE MEDIA","74%","Media Top Predictions","★",74)}
${stat("DATA QUALITY","96%","Qualità dati disponibili","✓",96)}
</div>
<section class="panel"><div class="section-head"><h2>★ MATCH IN EVIDENZA</h2><span>TOP 5</span></div><div class="featured-grid">${DATA.top.map(matchCard).join("")}</div></section>
<section class="panel"><div class="section-head"><h2>◎ TOP SIGNALS</h2><button class="text-btn">VEDI TUTTI ›</button></div>
<div class="signal-row">
${[
["ALTA CONVERGENZA","OVER 2.5","Milan vs Roma","78%","Più famiglie di indicatori concordano sullo stesso scenario."],
["VALUE / EDGE","GOL","Barcelona vs Sevilla","74%","Il modello vede un vantaggio rispetto alla probabilità implicita."],
["TREND NEGATIVO","UNDER 2.5","PSG vs Lyon","69%","Trend recente e produzione offensiva suggeriscono cautela."]
].map(s=>`<article class="signal"><div class="signal-type">${s[0]} ${info(s[4])}</div><div class="signal-main">${s[1]}</div><div class="signal-match">${s[2]}</div><div class="confidence-line">CONFIDENCE <strong>${s[3]}</strong></div></article>`).join("")}</div></section>
</div>`;bind()
}

function matches(){
document.querySelector("#main").innerHTML=`<div class="page"><div class="eyebrow">CALENDARIO</div><h1>Matches</h1><p>Seleziona un campionato per vedere le partite.</p>
<section class="panel"><div class="section-head"><h2>CAMPIONATI</h2><span>6 disponibili</span></div>
<div class="league-grid">${DATA.leagues.map((l,i)=>`<button class="league-card" data-league="${i}"><div><b>${l[0]}</b><span>${l[1]} squadre · dati demo</span></div><span>›</span></button>`).join("")}</div></section></div>`;
bind();document.querySelectorAll("[data-league]").forEach(x=>x.onclick=()=>league(+x.dataset.league))
}

function league(i=1){
const name=DATA.leagues[i]?.[0]||"Serie A";
document.querySelector("#main").innerHTML=`<div class="page"><button class="text-btn" data-nav="matches">‹ CAMPIONATI</button><div class="eyebrow">CAMPIONATO</div><h1>${name}</h1><p>Partite di oggi · ordinate per orario</p>
<section class="panel"><div class="section-head"><h2>PARTITE</h2><span>DATI DEMO</span></div>${DATA.top.slice(0,3).map(m=>`<button class="match-list" data-match><span>${m[0]}</span><div>${crest(m[5],m[7])}<b>${m[1]}</b></div><em>—</em><div><b>${m[2]}</b>${crest(m[6],m[8])}</div><strong>${m[4]}%</strong></button>`).join("")}</section></div>`;
bind();document.querySelectorAll("[data-match]").forEach(x=>x.onclick=detail)
}

function detail(){
document.querySelector("#main").innerHTML=`<div class="page"><button class="text-btn" data-nav="matches">‹ MATCHES</button><div class="eyebrow">MATCH ANALYSIS · DATI DEMO</div><h1>Milan — Roma</h1><p>Pre-match · Prediction Engine V1</p>
<section class="panel"><div class="section-head"><h2>MODELLO</h2><span>ALTA CONVERGENZA · EDGE +15%</span></div>
<div class="model-box"><b>Perché il modello vede meglio il Milan?</b><p>Produzione offensiva superiore, minore qualità delle occasioni concesse, forma corretta per la forza degli avversari e maggiore pericolosità nell'ultimo terzo.</p></div>
<div class="model-box"><b>Come viene calcolata la forma?</b><p>Le ultime 5 gare costruiscono il Risultato recente; la Recenza stabilisce quanto pesa ciascuna gara. La forma viene inoltre corretta per la forza degli avversari.</p><p><strong>+17% forma</strong> indica la differenza relativa dell'indice forma, non +17 punti di probabilità.</p></div>
</section>
<section class="panel"><div class="section-head"><h2>CONFRONTO DATI</h2><span>MILAN · ROMA</span></div>
${row("xG","1.84","1.21")} ${row("xGA","0.94","1.37")} ${row("xThreat ultimo terzo","1.42","0.96","Pericolosità generata nelle zone avanzate.")} ${row("Entrate in area","18","11")} ${row("Tiri in porta","6","4")} ${row("Possesso","58%","42%")} ${row("Corner / partita","5.0","4.1","Media dei corner conquistati su tutte le partite del campione disponibile.")}
</section>
<section class="panel"><div class="section-head"><h2>FORMA · ULTIME 5</h2></div><div class="detail"><div class="form">${"WWDWW".split("").map(x=>`<i class="${x==='W'?'w':x==='L'?'l':''}">${x}</i>`).join("")}<span style="margin:0 10px">vs</span>${"WDLWD".split("").map(x=>`<i class="${x==='W'?'w':x==='L'?'l':''}">${x}</i>`).join("")}</div></div></section>
<section class="panel"><div class="section-head"><h2>INDICATORI DI CONTROLLO</h2></div>
${row("Recupero medio","8.7s","10.9s","Tempo medio per recuperare palla, corretto per la forza dell'avversario.")}${row("Recuperi alti","31%","18%","Quota dei recuperi nell'ultimo terzo.")}${row("PPDA","8.7","12.4","Passaggi concessi per azione difensiva; più basso indica pressione più intensa.")}
<div class="model-box"><b>Come e perché viene recuperata la palla?</b><p>Il motore distingue pressione alta, recupero a centrocampo e recupero basso dopo lo sviluppo dell'azione. Analizza zona, altezza del blocco e contesto dell'avversario, non soltanto il numero PPDA.</p></div></section>
<section class="panel"><div class="section-head"><h2>GIOCATORI ASSENTI</h2></div><div class="injury"><b>Rossi</b><span class="red">Infortunato</span><span>—</span></div><div class="injury"><b>Bianchi</b><span class="red">Squalificato</span><span>2 giornate</span></div></section>
<section class="panel"><div class="section-head"><h2>DATI E AFFIDABILITÀ</h2><span>96%</span></div><div class="quality-grid"><div>Fixture ✓</div><div>xG/xGA ✓</div><div>Forma ✓</div><div>Dati demo</div></div></section>
</div>`;bind()
}
function row(a,b,c,t=""){return `<div class="compare-row"><span>${a}${t?info(t):""}</span><b>${b}</b><b>${c}</b></div>`}

function teams(){
document.querySelector("#main").innerHTML=`<div class="page"><div class="eyebrow">DATABASE SQUADRE</div><h1>Teams</h1><p>Squadre divise per campionato · dati demo pronti per SportMonks.</p>
<section class="panel"><div class="section-head"><h2>SQUADRE</h2><span>6 demo</span></div><div class="team-grid">${DATA.teams.map(t=>`<button class="team-card"><div>${crest(t[2],t[3])}</div><div><b>${t[1]}</b><small>${t[0]} · Rating ${t[4]}</small></div></button>`).join("")}</div></section></div>`;bind()
}
function more(){
document.querySelector("#main").innerHTML=`<div class="page"><div class="eyebrow">SPACE16154</div><h1>More</h1><p>Impostazioni e funzioni future.</p><section class="panel"><div class="detail"><b>V4.2 · DATA READY</b><p>Struttura pronta per collegare SportMonks e sostituire i dati demo.</p></div></section></div>`;bind()
}
function bind(){document.querySelectorAll("[data-nav]").forEach(b=>b.onclick=()=>route(b.dataset.nav))}
function route(n){document.body.innerHTML=shell(n);if(n==="dashboard")dashboard();else if(n==="matches")matches();else if(n==="teams")teams();else more()}
route("dashboard");
