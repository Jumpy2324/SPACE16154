// SPACE16154 — build #188 + modello demo coerente
// Catena: dati simulati -> normalizzazione 0–100 -> 6 macroaree -> Model Score
// -> probabilità -> Confidence / Value / Forma -> Top Signals.

const CONFIG = {
  version: "1.3.0-model",
  macroWeights: {
    threat: 0.22,
    defense: 0.20,
    form: 0.20,
    opponent: 0.18,
    pressing: 0.14,
    absences: 0.06
  },
  signalThresholds: {
    confidence: 75,
    value: 10,       // edge percentuale minimo vs quota implicita
    form: 12         // differenziale minimo di Forma
  }
};

const LEAGUES = ["Serie A","Premier League","La Liga","Bundesliga","Ligue 1"];

const RAW_TEAMS = [
  {
    id:"milan", name:"Milan", code:"MIL", league:"Serie A", played:12,
    raw:{xg:1.84,xga:0.96,finalThird:78,shotQuality:0.13,shots:15.0,offRec:9.0,
         shotsAgainst:9.8,boxEntriesAgainst:16.0,defErrors:0.35,
         weightedForm:2.55,opponentAvg:74,ppda:8.9,highRecoveries:9.2,counterpress:76,
         availability:91},
    last5:["W","W","D","W","W"], trend:[72,75,74,78,79], next:"Juventus · Sab 20:45"
  },
  {
    id:"roma", name:"Roma", code:"ROM", league:"Serie A", played:12,
    raw:{xg:1.12,xga:1.34,finalThird:61,shotQuality:0.10,shots:10.2,offRec:5.1,
         shotsAgainst:13.1,boxEntriesAgainst:22.0,defErrors:0.72,
         weightedForm:1.72,opponentAvg:78,ppda:12.8,highRecoveries:5.7,counterpress:61,
         availability:84},
    last5:["W","L","D","W","D"], trend:[70,69,68,67,68], next:"Napoli · Dom 18:00"
  },
  {
    id:"inter", name:"Inter", code:"INT", league:"Serie A", played:12,
    raw:{xg:2.05,xga:0.82,finalThird:84,shotQuality:0.14,shots:16.3,offRec:8.7,
         shotsAgainst:8.4,boxEntriesAgainst:13.5,defErrors:0.24,
         weightedForm:2.70,opponentAvg:76,ppda:8.2,highRecoveries:8.8,counterpress:80,
         availability:94},
    last5:["W","W","W","D","W"], trend:[78,80,81,83,84], next:"Juventus · Dom 18:00"
  },
  {
    id:"napoli", name:"Napoli", code:"NAP", league:"Serie A", played:12,
    raw:{xg:1.71,xga:1.05,finalThird:74,shotQuality:0.12,shots:13.8,offRec:7.1,
         shotsAgainst:11.2,boxEntriesAgainst:18.4,defErrors:0.48,
         weightedForm:2.30,opponentAvg:73,ppda:10.4,highRecoveries:7.0,counterpress:72,
         availability:88},
    last5:["W","D","W","W","L"], trend:[72,73,74,75,76], next:"Roma · Dom 18:00"
  },
  {
    id:"arsenal", name:"Arsenal", code:"ARS", league:"Premier League", played:12,
    raw:{xg:1.92,xga:0.93,finalThird:80,shotQuality:0.13,shots:15.1,offRec:8.4,
         shotsAgainst:9.3,boxEntriesAgainst:15.2,defErrors:0.31,
         weightedForm:2.48,opponentAvg:77,ppda:8.7,highRecoveries:8.6,counterpress:78,
         availability:89},
    last5:["W","W","D","W","W"], trend:[75,77,78,80,81], next:"Man City · Sab 17:30"
  },
  {
    id:"mancity", name:"Man City", code:"MCI", league:"Premier League", played:12,
    raw:{xg:2.12,xga:1.08,finalThird:86,shotQuality:0.14,shots:17.0,offRec:9.1,
         shotsAgainst:10.8,boxEntriesAgainst:17.5,defErrors:0.42,
         weightedForm:2.35,opponentAvg:75,ppda:9.0,highRecoveries:9.0,counterpress:82,
         availability:86},
    last5:["W","D","W","W","D"], trend:[76,78,79,80,81], next:"Arsenal · Sab 17:30"
  },
  {
    id:"barcelona", name:"Barcelona", code:"BAR", league:"La Liga", played:12,
    raw:{xg:2.18,xga:1.00,finalThird:87,shotQuality:0.15,shots:16.7,offRec:8.9,
         shotsAgainst:10.0,boxEntriesAgainst:16.1,defErrors:0.39,
         weightedForm:2.60,opponentAvg:74,ppda:8.5,highRecoveries:8.8,counterpress:81,
         availability:90},
    last5:["W","W","W","D","W"], trend:[78,79,81,82,84], next:"Real Madrid · Dom 21:00"
  },
  {
    id:"realmadrid", name:"Real Madrid", code:"RMA", league:"La Liga", played:12,
    raw:{xg:2.04,xga:1.08,finalThird:83,shotQuality:0.14,shots:15.8,offRec:7.8,
         shotsAgainst:11.0,boxEntriesAgainst:17.2,defErrors:0.45,
         weightedForm:2.38,opponentAvg:79,ppda:9.8,highRecoveries:7.5,counterpress:75,
         availability:88},
    last5:["W","D","W","W","W"], trend:[77,78,79,80,82], next:"Barcelona · Dom 21:00"
  },
  {
    id:"bayern", name:"Bayern", code:"BAY", league:"Bundesliga", played:12,
    raw:{xg:2.22,xga:0.98,finalThird:88,shotQuality:0.15,shots:17.4,offRec:9.4,
         shotsAgainst:9.7,boxEntriesAgainst:15.6,defErrors:0.34,
         weightedForm:2.58,opponentAvg:72,ppda:8.0,highRecoveries:9.6,counterpress:84,
         availability:92},
    last5:["W","W","D","W","W"], trend:[79,81,82,84,85], next:"Dortmund · Sab 15:30"
  },
  {
    id:"dortmund", name:"Dortmund", code:"BVB", league:"Bundesliga", played:12,
    raw:{xg:1.67,xga:1.25,finalThird:72,shotQuality:0.11,shots:13.0,offRec:6.9,
         shotsAgainst:12.4,boxEntriesAgainst:20.1,defErrors:0.61,
         weightedForm:2.02,opponentAvg:73,ppda:10.7,highRecoveries:6.5,counterpress:69,
         availability:87},
    last5:["W","D","L","W","D"], trend:[72,73,72,74,74], next:"Bayern · Sab 15:30"
  },
  {
    id:"psg", name:"PSG", code:"PSG", league:"Ligue 1", played:12,
    raw:{xg:2.26,xga:0.91,finalThird:89,shotQuality:0.15,shots:17.6,offRec:9.0,
         shotsAgainst:9.4,boxEntriesAgainst:14.8,defErrors:0.29,
         weightedForm:2.65,opponentAvg:70,ppda:8.3,highRecoveries:9.2,counterpress:83,
         availability:93},
    last5:["W","W","W","W","D"], trend:[80,82,83,85,86], next:"Monaco · Dom 20:45"
  },
  {
    id:"monaco", name:"Monaco", code:"MON", league:"Ligue 1", played:12,
    raw:{xg:1.74,xga:1.19,finalThird:75,shotQuality:0.12,shots:13.8,offRec:7.3,
         shotsAgainst:11.8,boxEntriesAgainst:19.2,defErrors:0.53,
         weightedForm:2.15,opponentAvg:72,ppda:10.2,highRecoveries:7.1,counterpress:72,
         availability:89},
    last5:["W","D","W","L","W"], trend:[72,74,75,74,76], next:"PSG · Dom 20:45"
  }
];

const MATCH_INPUTS = [
  {
    id:"milan-roma",home:"milan",away:"roma",league:"Serie A",date:"Oggi · 20:45",venue:"San Siro",
    weather:"16°C · Sereno", referee:"D. Orsato", lastMeeting:"Milan 3–1 Roma · 14/01/2025",
    odds:{one:1.82,x:3.65,two:4.70,under:2.00,over:1.82,gg:1.75,ng:2.05},
    absences:[
      {team:"Milan",players:[["R. Leão","In dubbio","chiave"],["Thiaw","Out","titolare"],["Loftus-Cheek","Out","rotazione"]]},
      {team:"Roma",players:[["Dybala","In dubbio","chiave"],["Smalling","Out","titolare"],["Azmoun","Out","rotazione"]]}
    ],
    bigMatch:true
  },
  {
    id:"inter-napoli",home:"inter",away:"napoli",league:"Serie A",date:"Domani · 18:00",venue:"San Siro",
    weather:"18°C · Sereno",referee:"M. Guida",lastMeeting:"Napoli 1–1 Inter · 03/03/2025",
    odds:{one:1.72,x:3.80,two:4.90,under:2.08,over:1.74,gg:1.72,ng:2.10},
    absences:[
      {team:"Inter",players:[["Calhanoglu","In dubbio","chiave"]]},
      {team:"Napoli",players:[["Juan Jesus","Out","titolare"]]}
    ]
  },
  {
    id:"arsenal-mancity",home:"arsenal",away:"mancity",league:"Premier League",date:"Sab · 17:30",venue:"Emirates Stadium",
    weather:"14°C · Coperto",referee:"M. Oliver",lastMeeting:"Man City 2–2 Arsenal",
    odds:{one:2.45,x:3.45,two:2.75,under:2.15,over:1.70,gg:1.62,ng:2.25},
    absences:[
      {team:"Arsenal",players:[["Saka","In dubbio","chiave"]]},
      {team:"Man City",players:[["Rodri","Out","chiave"]]}
    ],
    bigMatch:true
  },
  {
    id:"barcelona-realmadrid",home:"barcelona",away:"realmadrid",league:"La Liga",date:"Dom · 21:00",venue:"Estadi Olímpic",
    weather:"20°C · Sereno",referee:"J. Sánchez",lastMeeting:"Real Madrid 2–3 Barcelona",
    odds:{one:2.10,x:3.70,two:3.10,under:2.55,over:1.52,gg:1.48,ng:2.60},
    absences:[
      {team:"Barcelona",players:[["Pedri","In dubbio","chiave"]]},
      {team:"Real Madrid",players:[["Militão","Out","titolare"]]}
    ],
    bigMatch:true
  },
  {
    id:"bayern-dortmund",home:"bayern",away:"dortmund",league:"Bundesliga",date:"Sab · 15:30",venue:"Allianz Arena",
    weather:"12°C · Coperto",referee:"F. Zwayer",lastMeeting:"Dortmund 1–2 Bayern",
    odds:{one:1.55,x:4.40,two:5.20,under:2.85,over:1.42,gg:1.55,ng:2.40},
    absences:[
      {team:"Bayern",players:[["Musiala","In dubbio","chiave"]]},
      {team:"Dortmund",players:[["Schlotterbeck","Out","titolare"]]}
    ]
  },
  {
    id:"psg-monaco",home:"psg",away:"monaco",league:"Ligue 1",date:"Dom · 20:45",venue:"Parc des Princes",
    weather:"15°C · Sereno",referee:"C. Turpin",lastMeeting:"Monaco 1–3 PSG",
    odds:{one:1.58,x:4.30,two:5.10,under:2.70,over:1.46,gg:1.62,ng:2.22},
    absences:[
      {team:"PSG",players:[["Marquinhos","In dubbio","chiave"]]},
      {team:"Monaco",players:[["Zakaria","Out","chiave"]]}
    ]
  }
];

const INFO = {
  threat:["Threat Creation","Misura la capacità di creare occasioni pericolose. Combina xG, qualità del tiro, produzione nell'ultimo terzo, tiri e recuperi offensivi: nessun indicatore viene letto da solo."],
  defense:["Defense Stability","Misura quanto la squadra limita il pericolo avversario. Combina xGA, tiri concessi, ingressi avversari in area e errori difensivi."],
  form:["Forma","Rappresenta la forma recente corretta per la forza degli avversari. Una prestazione contro una squadra forte pesa più della stessa prestazione contro una squadra debole."],
  opponent:["Opponent Strength","Misura la qualità media degli avversari affrontati. Il modello usa questo valore per contestualizzare forma e prestazioni."],
  pressing:["Pressing / PPDA","Valuta come la squadra pressa e dove recupera palla. Combina PPDA, recuperi alti e capacità di contro-pressione."],
  absences:["Availability / Assenze","Valuta la disponibilità della rosa e l'impatto delle assenze. Un giocatore chiave pesa più di un titolare meno centrale o di un elemento di rotazione."]
};

const TECH = {
  xG:"Expected Goals: stima la qualità complessiva delle occasioni create.",
  xGA:"Expected Goals Against: stima la qualità complessiva delle occasioni concesse.",
  "Ultimo terzo":"Misura la presenza e la qualità delle azioni portate nell'ultimo terzo.",
  "Qualità tiro":"Misura la qualità media delle conclusioni prodotte, non soltanto il loro numero.",
  PPDA:"Indica quanti passaggi l'avversario completa mediamente prima di un'azione difensiva. Valori più bassi indicano in genere una pressione più aggressiva."
};

const MACROS = [
  ["threat","Threat Creation"],
  ["defense","Defense Stability"],
  ["form","Forma"],
  ["opponent","Opponent Strength"],
  ["pressing","Pressing / PPDA"],
  ["absences","Availability"]
];

const clamp=(v,min=0,max=100)=>Math.max(min,Math.min(max,v));
const round=v=>Math.round(v);
const norm=(v,min,max)=>clamp((v-min)/(max-min)*100);
const invNorm=(v,min,max)=>100-norm(v,min,max);
const avg=arr=>arr.reduce((a,b)=>a+b,0)/arr.length;
const weighted=(items)=>items.reduce((s,[v,w])=>s+v*w,0)/items.reduce((s,[,w])=>s+w,0);

function buildTeam(t){
  const r=t.raw;
  const components={
    threat:{
      xg:norm(r.xg,0.7,2.4),
      finalThird:norm(r.finalThird,40,92),
      shotQuality:norm(r.shotQuality,0.07,0.16),
      shots:norm(r.shots,7,19),
      offRec:norm(r.offRec,3,11)
    },
    defense:{
      xga:invNorm(r.xga,0.65,1.75),
      shotsAgainst:invNorm(r.shotsAgainst,7,16),
      boxEntriesAgainst:invNorm(r.boxEntriesAgainst,11,27),
      defErrors:invNorm(r.defErrors,0.15,1.0)
    },
    form:{
      weightedForm:norm(r.weightedForm,0.8,2.8)
    },
    opponent:{
      opponentAvg:norm(r.opponentAvg,58,84)
    },
    pressing:{
      ppda:invNorm(r.ppda,7,15),
      highRecoveries:norm(r.highRecoveries,4,11),
      counterpress:norm(r.counterpress,50,90)
    },
    absences:{
      availability:clamp(r.availability)
    }
  };

  const m={
    threat:round(weighted([[components.threat.xg,.30],[components.threat.finalThird,.22],[components.threat.shotQuality,.20],[components.threat.shots,.16],[components.threat.offRec,.12]])),
    defense:round(weighted([[components.defense.xga,.35],[components.defense.shotsAgainst,.25],[components.defense.boxEntriesAgainst,.25],[components.defense.defErrors,.15]])),
    form:round(components.form.weightedForm),
    opponent:round(components.opponent.opponentAvg),
    pressing:round(weighted([[components.pressing.ppda,.45],[components.pressing.highRecoveries,.30],[components.pressing.counterpress,.25]])),
    absences:round(components.absences.availability)
  };

  const score=round(
    m.threat*CONFIG.macroWeights.threat +
    m.defense*CONFIG.macroWeights.defense +
    m.form*CONFIG.macroWeights.form +
    m.opponent*CONFIG.macroWeights.opponent +
    m.pressing*CONFIG.macroWeights.pressing +
    m.absences*CONFIG.macroWeights.absences
  );

  return {...t, components, m, score};
}

const TEAMS=RAW_TEAMS.map(buildTeam);
const TEAM_BY_ID=Object.fromEntries(TEAMS.map(t=>[t.id,t]));

function softmax3(a,b,c){
  const ex=[Math.exp(a),Math.exp(b),Math.exp(c)];
  const s=ex.reduce((x,y)=>x+y,0);
  return ex.map(x=>x/s*100);
}

function probabilities(home,away){
  const diff=(home.score-away.score)/12;
  const drawBase=0.20 - Math.min(Math.abs(home.score-away.score)/250,0.07);
  const [p1,px,p2]=softmax3(diff,Math.log(drawBase/(1-drawBase))*0.32,-diff);

  const expectedGoals=
    1.85 +
    (home.m.threat+away.m.threat-140)/110 -
    (home.m.defense+away.m.defense-140)/180;

  const over=clamp(38 + (expectedGoals-2.2)*28 + (home.raw.shotQuality+away.raw.shotQuality-0.20)*75,28,78);
  const gg=clamp(40 + (home.m.threat+away.m.threat-130)*0.35 - (home.m.defense+away.m.defense-130)*0.12,28,78);

  // normalizza il blocco 1X2 a 100 esatti
  const total=p1+px+p2;
  const one=round(p1/total*100);
  const x=round(px/total*100);
  const two=100-one-x;

  return {
    one,x,two,
    under:100-round(over),over:round(over),
    gg:round(gg),ng:100-round(gg)
  };
}

function favoriteOutcome(p){
  return [["1",p.one],["X",p.x],["2",p.two]].sort((a,b)=>b[1]-a[1])[0];
}

function computeConfidence(home,away,p){
  const favorite=favoriteOutcome(p);
  const probStrength=(favorite[1]-33)/67*100;
  const macroDiffs=MACROS.map(([k])=>Math.abs(home.m[k]-away.m[k]));
  const convergence=clamp(avg(macroDiffs)*4.2);
  const directionAgreement=MACROS.filter(([k])=>(home.m[k]-away.m[k])*(home.score-away.score)>=0).length/6*100;
  return round(clamp(probStrength*.42 + convergence*.28 + directionAgreement*.30));
}

function implied(odd){ return odd ? 100/odd : 0; }

function buildSignals(match,home,away,p){
  const favorite=favoriteOutcome(p);
  const conf=computeConfidence(home,away,p);
  const oddsKey=favorite[0]==="1"?"one":favorite[0]==="X"?"x":"two";
  const edge=round(favorite[1]-implied(match.odds[oddsKey]));
  const formEdge=round(Math.abs(home.m.form-away.m.form));
  const out=[];

  if(conf>=CONFIG.signalThresholds.confidence){
    out.push({
      type:"Confidence",className:"confidence",score:conf,
      title:`${home.name} — ${away.name}`,
      market:`${favorite[0]} · ${favorite[1]}%`,
      reason:`Alta convergenza degli indicatori verso ${favorite[0]==="1"?home.name:favorite[0]==="2"?away.name:"il pareggio"}.`
    });
  }
  if(edge>=CONFIG.signalThresholds.value){
    out.push({
      type:"Value",className:"value",score:edge,
      title:`${home.name} — ${away.name}`,
      market:`${favorite[0]} · ${favorite[1]}%`,
      reason:`La probabilità del modello supera di circa ${edge} punti la probabilità implicita nella quota demo.`
    });
  }
  if(formEdge>=CONFIG.signalThresholds.form){
    const better=home.m.form>=away.m.form?home:away;
    out.push({
      type:"Forma",className:"form",score:formEdge,
      title:`${home.name} — ${away.name}`,
      market:`Forma +${formEdge}`,
      reason:`Il differenziale di forma recente, pesata per gli avversari, favorisce ${better.name}.`
    });
  }
  return {confidence:conf,value:edge,formEdge,signals:out};
}

function technicalFor(home,away){
  return [
    ["xG",home.raw.xg.toFixed(2),away.raw.xg.toFixed(2)],
    ["xGA",home.raw.xga.toFixed(2),away.raw.xga.toFixed(2)],
    ["Ultimo terzo",String(round(home.raw.finalThird)),String(round(away.raw.finalThird))],
    ["Qualità tiro",home.raw.shotQuality.toFixed(2),away.raw.shotQuality.toFixed(2)],
    ["PPDA",home.raw.ppda.toFixed(1),away.raw.ppda.toFixed(1)]
  ];
}

const MATCHES=MATCH_INPUTS.map(m=>{
  const home=TEAM_BY_ID[m.home],away=TEAM_BY_ID[m.away];
  const p=probabilities(home,away);
  const sig=buildSignals(m,home,away,p);
  return {...m,homeTeam:home,awayTeam:away,p,technical:technicalFor(home,away),...sig};
});

const PERFORMANCE={
  total:120,
  correct:80,
  accuracy:67,
  avgConfidence:76,
  byMarket:[
    ["1X2",52,68],["Under/Over",38,66],["Gol/No Gol",30,63]
  ],
  bySignal:[
    ["Confidence",44,73],["Value",31,65],["Forma",37,70]
  ],
  history:[64,66,65,68,67]
};

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
function signalTags(m){return m.signals.map(s=>tag(s.type)).join("")}
function matchCard(m){
 const h=highest(m.p);
 return `<article class="match-card" onclick="location.hash='match/${m.id}'">
  <div class="match-meta"><span>${esc(m.league)}</span><span>${esc(m.date)}</span></div>
  <div class="teams"><div><b>${esc(m.homeTeam.name)}</b><small>Casa</small></div><span class="vs">VS</span><div class="away"><b>${esc(m.awayTeam.name)}</b><small>Trasferta</small></div></div>
  <div class="prediction-grid">
   <div><small>1X2</small><strong class="green">${h.a[0]} · ${h.a[1]}%</strong></div>
   <div><small>GOL / NO GOL</small><strong class="green">${h.c[0]} · ${h.c[1]}%</strong></div>
   <div><small>U/O 2.5</small><strong class="green">${h.b[0]} · ${h.b[1]}%</strong></div>
  </div>
  <div class="signal-line">${signalTags(m) || `<span class="no-signal">Nulla di rilevante</span>`}</div>
 </article>`
}

function dashboard(){
 const featured=MATCHES.find(m=>m.bigMatch)||MATCHES[0];
 const preview=MATCHES.flatMap(m=>m.signals.map(s=>({...s,matchId:m.id}))).slice(0,3);
 page("Dashboard","Il quadro essenziale della giornata.",
 `<div class="section-title">MATCH IN EVIDENZA</div>${matchCard(featured)}
 <div class="section-title row"><span>TOP SIGNALS</span><a href="#signals">Vedi tutti</a></div>
 <div class="signal-preview-stack">${preview.length?preview.map(s=>`<button class="signal-preview ${s.className}" onclick="location.hash='match/${s.matchId}'"><div><div>${tag(s.type)}</div><b>${esc(s.title)}</b><small>${esc(s.market)}</small></div><strong>${s.type==="Value"?"+"+s.score+"%":s.type==="Forma"?"+"+s.score:s.score+"%"}</strong></button>`).join(""):`<div class="empty-state">Nessun Top Signal rilevante oggi.</div>`}</div>
 <div class="section-title row"><span>PROSSIME PARTITE</span><a href="#matches">Tutte</a></div>
 <div class="stack">${MATCHES.filter(m=>m.id!==featured.id).slice(0,3).map(matchCard).join("")}</div>`);
}

function probSection(m){
 const p=m.p,h=highest(p);
 const rows=(title,items,high)=>`<div class="prob-title">${title}</div>${items.map(([l,v])=>`<div class="prob-row"><span>${l}</span><b class="${v===high?"green":""}">${v}%</b><small>${v===high?"PIÙ PROBABILE":""}</small></div>`).join("")}`;
 return `<div class="prob-card">${rows("1X2",[["1",p.one],["X",p.x],["2",p.two]],h.a[1])}${rows("UNDER / OVER 2.5",[["Under",p.under],["Over",p.over]],h.b[1])}${rows("GOL / NO GOL",[["Gol",p.gg],["No Gol",p.ng]],h.c[1])}</div>`
}

function macroCard(home,away,k,label){
 const a=home.m[k],b=away.m[k],diff=a-b;
 return `<div class="macro-card"><div class="macro-head"><b>${label}</b><button class="info" onclick="event.stopPropagation();infoMacro('${k}')">i</button></div>
 <div class="macro-values"><span>${esc(home.name)} <strong>${a}</strong>${k==="form"?" ↗":""}</span><span>${esc(away.name)} <strong>${b}</strong>${k==="form"?" →":""}</span></div>
 <div class="dualbar"><i style="width:${a}%"></i><i style="width:${b}%"></i></div>
 <small class="${diff<0?"negative":""}">${diff>=0?"+":""}${diff} ${esc(diff>=0?home.name:away.name)}</small></div>`
}

function absenceHTML(m){
 return m.absences.map(a=>`<div class="absence-block"><b>${esc(a.team)}</b><div>${a.players.map(p=>`<span class="absence-player"><strong>${esc(p[0])}</strong><em class="${p[1]==="Out"?"out":"doubt"}">${esc(p[1])}</em><small>${esc(p[2])}</small></span>`).join("")}</div></div>`).join("");
}

function detail(id){
 const m=MATCHES.find(x=>x.id===id);
 if(!m){location.hash="matches";return}
 const home=m.homeTeam,away=m.awayTeam;
 const tech=m.technical.map(r=>`<div class="tech-row"><b>${esc(r[0])}<button class="info" onclick="event.stopPropagation();infoTech('${r[0]}')">i</button></b><span>${r[1]}</span><span>${r[2]}</span></div>`).join("");
 const reasons=MACROS.map(([k,l])=>({label:l,diff:home.m[k]-away.m[k]})).sort((a,b)=>Math.abs(b.diff)-Math.abs(a.diff));
 page(`${home.name} — ${away.name}`,`${m.league} · ${m.date} · ${m.venue}`,
 `<div class="match-banner"><div class="club"><span class="crest">⚽</span><b>${esc(home.name)}</b></div><div class="model-score"><small>MODEL SCORE</small><strong>${home.score} — ${away.score}</strong><em>${home.score>=away.score?esc(home.name):esc(away.name)}</em></div><div class="club away"><span class="crest">⚽</span><b>${esc(away.name)}</b></div></div>
 <div class="section-title">PROBABILITÀ DEL MODELLO</div>${probSection(m)}
 <div class="section-title row"><span>ANALISI DEL MODELLO</span><span class="muted">6 macroaree</span></div>
 <div class="macro-stack">${MACROS.map(([k,l])=>macroCard(home,away,k,l)).join("")}</div>
 <div class="why-card"><b>Perché il modello vede ${home.score>=away.score?home.name:away.name} avanti?</b>${reasons.slice(0,4).map(r=>`<div><span>${esc(r.label)}</span><strong class="${r.diff>=0?"green":"negative"}">${r.diff>=0?"+":""}${r.diff}</strong></div>`).join("")}</div>
 <div class="section-title row"><span>DATI TECNICI</span><span class="muted">confronto sintetico</span></div>
 <div class="tech-card"><div class="tech-head"><span>Indicatore</span><span>${esc(home.name)}</span><span>${esc(away.name)}</span></div>${tech}</div>
 <div class="section-title">ASSENZE PRINCIPALI</div><div class="simple-card absences-card">${absenceHTML(m)}</div>
 <div class="section-title">INFORMAZIONI PARTITA</div><div class="simple-card">
   <div><b>Stadio</b><span>${esc(m.venue)}</span></div>
   <div><b>Meteo</b><span>${esc(m.weather)}</span></div>
   <div><b>Arbitro</b><span>${esc(m.referee)}</span></div>
   <div><b>Ultimo incontro</b><span>${esc(m.lastMeeting)}</span></div>
 </div>`);
}

function leagueFilters(active="Tutte"){
 return `<div class="filter-wrap"><button class="filter ${active==="Tutte"?"active":""}" data-league="Tutte">Tutte</button>${LEAGUES.map(l=>`<button class="filter ${active===l?"active":""}" data-league="${esc(l)}">${esc(l)}</button>`).join("")}</div>`;
}

function matches(){
 page("Matches","Calendario e partite disponibili nei 5 campionati.",
 `${leagueFilters("Tutte")}<div id="matchesList" class="stack">${MATCHES.map(matchCard).join("")}</div>`);
 document.querySelectorAll("[data-league]").forEach(b=>b.onclick=()=>{
   document.querySelectorAll("[data-league]").forEach(x=>x.classList.remove("active"));b.classList.add("active");
   const league=b.dataset.league;
   $("#matchesList").innerHTML=MATCHES.filter(m=>league==="Tutte"||m.league===league).map(matchCard).join("")||`<div class="empty-state">Nessuna partita disponibile.</div>`;
 });
}

function analysis(){
 const league=LEAGUES[0];
 page("Analysis","Il centro analitico: campionato, classifica, squadre e profilo modello.",
 `<div class="analysis-league-grid">${LEAGUES.map((l,i)=>`<button class="filter ${i===0?"active":""}" data-analysis-league="${esc(l)}">${esc(l)}</button>`).join("")}</div>
 <div id="analysisBody"></div>`);
 renderAnalysisLeague(league);
 document.querySelectorAll("[data-analysis-league]").forEach(b=>b.onclick=()=>{
   document.querySelectorAll("[data-analysis-league]").forEach(x=>x.classList.remove("active"));b.classList.add("active");
   renderAnalysisLeague(b.dataset.analysisLeague);
 });
}

function renderAnalysisLeague(league){
 const teams=TEAMS.filter(t=>t.league===league).sort((a,b)=>b.score-a.score);
 $("#analysisBody").innerHTML=`
 <div class="section-title">CLASSIFICA / SQUADRE</div>
 <div class="rank-card analysis-rank">
   <div class="analysis-rank-head"><span>Pos</span><span>Squadra</span><span>P</span><span>Forma</span><span>Model Rating</span></div>
   ${teams.map((t,i)=>`<button class="analysis-rank-row" onclick="team('${t.id}')"><span>${i+1}</span><b>${esc(t.name)}</b><span>${t.played}</span><span class="form-dots">${t.last5.map(x=>`<i class="${x==="W"?"w":x==="D"?"d":"l"}">${x}</i>`).join("")}</span><strong>${t.score}</strong></button>`).join("")}
 </div>
 <div class="section-title">TREND MODEL SCORE</div>
 <div class="trend-grid">${teams.slice(0,2).map(t=>`<div class="trend-card"><div><b>${esc(t.name)}</b><strong>${t.score}</strong></div><div class="spark">${t.trend.map(v=>`<i style="height:${v}%"></i>`).join("")}</div><small>${t.trend.at(-1)>=t.trend[0]?"Trend positivo":"Trend in calo"}</small></div>`).join("")}</div>`;
}

let SIGNAL_STATE={type:"Tutti",league:"Tutti"};

function allSignals(){
 return MATCHES.flatMap(m=>m.signals.map(s=>({...s,match:m})));
}

function signals(){
 const all=allSignals();
 const counts={
   Confidence:all.filter(s=>s.type==="Confidence").length,
   Value:all.filter(s=>s.type==="Value").length,
   Forma:all.filter(s=>s.type==="Forma").length
 };
 page("Top Signals","Centro segnali del modello: ogni categoria indica una direzione precisa.",
 `<div class="signal-summary"><div><strong>${all.length}</strong><span>Segnali oggi</span></div><div class="confidence"><strong>${counts.Confidence}</strong><span>Confidence</span></div><div class="value"><strong>${counts.Value}</strong><span>Value</span></div><div class="form"><strong>${counts.Forma}</strong><span>Forma</span></div></div>
 <div class="section-title">TIPO DI SEGNALE</div>
 <div class="signal-filter-grid">
   <button class="filter active" data-signal-type="Tutti">Tutti</button>
   <button class="filter confidence" data-signal-type="Confidence">Confidence</button>
   <button class="filter value" data-signal-type="Value">Value</button>
   <button class="filter form" data-signal-type="Forma">Forma</button>
 </div>
 <div class="section-title">CAMPIONATO</div>
 <div class="analysis-league-grid signal-leagues">
   <button class="filter active" data-signal-league="Tutti">Tutti i campionati</button>
   ${LEAGUES.map(l=>`<button class="filter" data-signal-league="${esc(l)}">${esc(l)}</button>`).join("")}
 </div>
 <div class="section-title">SEGNALI</div><div id="signalList" class="stack"></div>`);
 SIGNAL_STATE={type:"Tutti",league:"Tutti"};
 renderSignalList();
 document.querySelectorAll("[data-signal-type]").forEach(b=>b.onclick=()=>{
   document.querySelectorAll("[data-signal-type]").forEach(x=>x.classList.remove("active"));b.classList.add("active");
   SIGNAL_STATE.type=b.dataset.signalType;renderSignalList();
 });
 document.querySelectorAll("[data-signal-league]").forEach(b=>b.onclick=()=>{
   document.querySelectorAll("[data-signal-league]").forEach(x=>x.classList.remove("active"));b.classList.add("active");
   SIGNAL_STATE.league=b.dataset.signalLeague;renderSignalList();
 });
}

function renderSignalList(){
 const filtered=allSignals().filter(s=>
   (SIGNAL_STATE.type==="Tutti"||s.type===SIGNAL_STATE.type) &&
   (SIGNAL_STATE.league==="Tutti"||s.match.league===SIGNAL_STATE.league)
 );
 $("#signalList").innerHTML=filtered.length?filtered.map(s=>`
 <button class="signal-detail-card ${s.className}" onclick="location.hash='match/${s.match.id}'">
   <div><div>${tag(s.type)}</div><b>${esc(s.title)}</b><small>${esc(s.match.league)} · ${esc(s.market)}</small><p>${esc(s.reason)}</p></div>
   <strong>${s.type==="Value"?"+"+s.score+"%":s.type==="Forma"?"+"+s.score:s.score+"%"}</strong>
 </button>`).join(""):`<div class="empty-state">Nessun segnale rilevante con questi filtri.</div>`;
}

function more(){
 page("Altro","Trasparenza, performance e metodologia del modello.",
 `<button class="more-card" onclick="location.hash='performance'"><div><b>Model Performance</b><small>Storico, accuratezza e performance per mercato/segnale</small></div><span>›</span></button>
 <button class="more-card" onclick="location.hash='confidence'"><div><b>Model Confidence</b><small>Come viene misurata la solidità delle valutazioni</small></div><span>›</span></button>
 <button class="more-card" onclick="methodology()"><div><b>Metodologia</b><small>Macroaree, indicatori e catena matematica demo</small></div><span>›</span></button>
 <button class="more-card" onclick="projectInfo()"><div><b>Informazioni progetto</b><small>SPACE16154 · versione demo pre-Sportmonks</small></div><span>›</span></button>`);
}

function performancePage(){
 page("Model Performance","Quanto il modello sta funzionando, separato dall'analisi delle singole partite.",
 `<div class="performance-hero"><div><strong>${PERFORMANCE.accuracy}%</strong><span>Accuracy demo</span></div><div><strong>${PERFORMANCE.total}</strong><span>Pronostici registrati</span></div><div><strong>${PERFORMANCE.avgConfidence}</strong><span>Confidence media</span></div></div>
 <div class="section-title">PER MERCATO</div>
 <div class="performance-table">${PERFORMANCE.byMarket.map(r=>`<div><b>${r[0]}</b><span>${r[1]} pronostici</span><strong>${r[2]}%</strong></div>`).join("")}</div>
 <div class="section-title">PER TOP SIGNAL</div>
 <div class="performance-table">${PERFORMANCE.bySignal.map(r=>`<div><b>${r[0]}</b><span>${r[1]} segnali</span><strong>${r[2]}%</strong></div>`).join("")}</div>
 <div class="section-title">ANDAMENTO</div>
 <div class="trend-card performance-trend"><div><b>Ultimi periodi</b><strong>${PERFORMANCE.history.at(-1)}%</strong></div><div class="spark">${PERFORMANCE.history.map(v=>`<i style="height:${v}%"></i>`).join("")}</div><small>Dati dimostrativi: saranno sostituiti dallo storico reale.</small></div>`);
}

function confidencePage(){
 page("Model Confidence","La Confidence misura la convergenza del quadro, non è una probabilità di vittoria.",
 `<div class="confidence-big">${round(avg(MATCHES.map(m=>m.confidence)))} <small>/ 100 media demo</small></div>
 <div class="section-title">COME VIENE COSTRUITA</div>
 <div class="simple-card">
   <div><b>Forza della probabilità</b><span>42%</span></div>
   <div><b>Differenza tra macroaree</b><span>28%</span></div>
   <div><b>Concordanza della direzione</b><span>30%</span></div>
 </div>
 <p class="muted confidence-copy">Una partita può avere probabilità elevate ma Confidence più bassa se le macroaree non concordano. Allo stesso modo, il modello può non generare alcun Top Signal quando le soglie non sono superate.</p>`);
}

function team(id){
 const t=TEAM_BY_ID[id];
 const tech=[
   ["xG",t.raw.xg.toFixed(2)],["xGA",t.raw.xga.toFixed(2)],["Ultimo terzo",round(t.raw.finalThird)],
   ["Qualità tiro",t.raw.shotQuality.toFixed(2)],["PPDA",t.raw.ppda.toFixed(1)]
 ];
 modal(`<p class="eyebrow">ANALYSIS · PROFILO MODELLO</p><h2>${esc(t.name)}</h2>
 <div class="score-box"><strong>${t.score}</strong><span>Model Rating</span></div>
 <div class="macro-stack">${MACROS.map(([k,l])=>`<div class="macro-card"><div class="macro-head"><b>${l}</b><button class="info" onclick="infoMacro('${k}')">i</button></div><div class="macro-values"><span>${t.m[k]} / 100</span></div><div class="singlebar"><i style="width:${t.m[k]}%"></i></div></div>`).join("")}</div>
 <div class="section-title">STATISTICHE TECNICHE</div><div class="team-tech-grid">${tech.map(r=>`<div><small>${r[0]}</small><b>${r[1]}</b></div>`).join("")}</div>
 <div class="section-title">ULTIME 5</div><div class="form-profile">${t.last5.map(x=>`<i class="${x==="W"?"w":x==="D"?"d":"l"}">${x}</i>`).join("")}</div>
 <div class="section-title">ANDAMENTO NEL TEMPO</div><div class="spark team-spark">${t.trend.map(v=>`<i style="height:${v}%"></i>`).join("")}</div>
 <div class="section-title">PROSSIMA PARTITA</div><div class="simple-card"><div><b>${esc(t.next)}</b></div></div>`);
}

function methodology(){
 modal(`<p class="eyebrow">METODOLOGIA</p><h2>Catena del modello demo</h2>
 <p>Dati simulati → indicatori → normalizzazione 0–100 → sei macroaree → pesi → Model Score → probabilità → Confidence / Value / Forma → Top Signals.</p>
 <div class="method-weights">${MACROS.map(([k,l])=>`<div><b>${l}</b><span>${round(CONFIG.macroWeights[k]*100)}%</span></div>`).join("")}</div>
 <p class="muted">Questi sono i pesi iniziali demo. La calibrazione resta congelata fino a quando avremo 4–7 giornate reali per tutti e cinque i campionati.</p>`);
}
function projectInfo(){modal(`<p class="eyebrow">SPACE16154</p><h2>Versione demo</h2><p>Il motore attuale usa dati simulati coerenti. Quando collegheremo Sportmonks, sostituiremo la sorgente dati mantenendo la stessa catena di calcolo.</p>`)}
function infoMacro(k){modal(`<p class="eyebrow">MACROAREA</p><h2>${INFO[k][0]}</h2><p>${INFO[k][1]}</p>`)}
function infoTech(k){modal(`<p class="eyebrow">DATO TECNICO</p><h2>${esc(k)}</h2><p>${TECH[k]}</p>`)}
function modal(html){$("#modalContent").innerHTML=html;$("#modal").classList.remove("hidden")}
function closeModal(){$("#modal").classList.add("hidden")}
function render(){
 const raw=location.hash.slice(1); const [route,id]=raw.split("/");
 activeNav(route==="performance"||route==="confidence"?"more":route.startsWith("match")?"matches":route||"dashboard");
 if(route==="match") detail(id);
 else if(route==="matches") matches();
 else if(route==="analysis") analysis();
 else if(route==="signals") signals();
 else if(route==="performance") performancePage();
 else if(route==="confidence") confidencePage();
 else if(route==="more") more();
 else dashboard();
}
$("#modalClose").onclick=closeModal;
$("#modal").onclick=e=>{if(e.target.id==="modal")closeModal()};
$("#refreshBtn").onclick=()=>location.reload();
window.addEventListener("hashchange",render);
window.addEventListener("load",()=>{if("serviceWorker"in navigator)navigator.serviceWorker.register("sw.js?v=1.3.0-model",{updateViaCache:"none"});render()});
