/* SPACE16154 V4.2 — UI update
   - hamburger top-left removed
   - model/edge/convergence unified
   - form, third-third, recovery and corner logic prepared for Engine V1
   - demo data only
*/
const VERSION="SPACE16154-V4.2";
const DATA={
  match:{home:"Milan",away:"Roma",homeProb:74,drawProb:5,awayProb:21},
  metrics:{
    xG:["1.84","1.21"],xGA:["0.94","1.37"],xThreat3:["1.42","0.96"],
    areaEntries:["18","11"],shotsOnTarget:["6","4"],possession:["58%","42%"],
    corners:["5.0","4.1"],recovery:["8.7s","10.9s"],highRecoveries:["31%","18%"],
    ppda:["8.7","12.4"]
  }
};
const info=t=>`<button class="info" title="${t}" aria-label="${t}">i</button>`;
function shell(){
 return `<header><div class="brand">SPACE16154<small>FOOTBALL INTELLIGENCE</small></div><div class="engine" title="Motore attivo">●</div></header>
 <main id="main"></main>
 <nav><button class="nav active">⌂<small>Dashboard</small></button><button class="nav">□<small>Matches</small></button><button class="nav">◇<small>Analisi</small></button><button class="nav">♙<small>Teams</small></button><button class="nav">•••<small>More</small></button></nav>`;
}
function row(name,a,b,tip=""){return `<div class="row"><span>${name}${tip?info(tip):""}</span><b>${a}</b><b>${b}</b></div>`}
function render(){
 document.body.innerHTML=shell();
 document.querySelector("#main").innerHTML=`<div class="page">
 <label>MATCH ANALYSIS · V4.2</label><h1>Milan — Roma</h1><p>Pre-match · dati demo</p>
 <section><h2>MODELLO <span class="badge">ALTA CONVERGENZA · EDGE +15%</span></h2>
 <div class="probs"><div>1<strong>74%</strong></div><div>X<strong>5%</strong></div><div>2<strong>21%</strong></div></div>
 <div class="box"><b>Perché il modello vede meglio Milan?</b>
 <p>Produzione offensiva superiore, minore qualità delle occasioni concesse, forma corretta per la forza degli avversari e maggiore pericolosità nel terzo offensivo.</p></div>
 <div class="box"><b>Come viene calcolata la forma?</b>
 <p><strong>Risultato recente</strong> misura la performance delle ultime 5 gare. <strong>Recenza</strong> decide quanto pesa ciascuna gara. Non sono la stessa cosa.</p>
 <p>Il +17% indica che l'indice forma del Milan è superiore del 17% a quello della Roma; non significa +17 punti di probabilità.</p></div>
 </section>
 <section><h2>CONFRONTO DATI</h2>
 ${row("xG","1.84","1.21","Qualità e quantità delle occasioni create.")}
 ${row("xGA","0.94","1.37","Qualità delle occasioni concesse.")}
 ${row("xThreat ultimo terzo","1.42","0.96","Pericolosità generata nelle zone avanzate.")}
 ${row("Entrate in area","18","11")}
 ${row("Tiri in porta","6","4")}
 ${row("Possesso","58%","42%")}
 ${row("Corner / partita","5.0","4.1","Media dei corner conquistati nel campione di partite considerato.")}
 </section>
 <section><h2>INDICATORI DI CONTROLLO</h2>
 ${row("Recupero medio","8.7s","10.9s","Tempo medio di recupero palla corretto per la forza dell'avversario.")}
 ${row("Recuperi alti","31%","18%","Percentuale dei recuperi nell'ultimo terzo di campo.")}
 ${row("PPDA","8.7","12.4","Passaggi concessi per azione difensiva: più basso indica pressione più intensa.")}
 <div class="box"><b>Come e perché viene recuperata la palla?</b>
 <p>Il motore non usa il PPDA da solo: analizza tempo di recupero, zona, altezza del blocco e tipo di recupero. Distingue pressione alta, recupero a centrocampo e recupero dopo lo sviluppo dell'azione. Tutto viene corretto in base alla forza dell'avversario.</p></div>
 </section>
 <section><h2>DATI E AFFIDABILITÀ <span class="ok">96%</span></h2>
 <div class="quality">Fixture ✓ · xG/xGA ✓ · Forma ultime 5 ✓ · Quote demo</div></section>
 </div>`;
}
render();
