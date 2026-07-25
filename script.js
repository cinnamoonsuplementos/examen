/* ==============================================
   ESTADÍSTICA PARA MAGALI 💙
   script.js – generador aleatorio de ejercicios
=============================================== */

// ── Utilidades ──────────────────────────────────
const rnd  = (a,b)     => Math.floor(Math.random()*(b-a+1))+a;
const rndF = (a,b,dec) => parseFloat((Math.random()*(b-a)+a).toFixed(dec));
const pick = arr        => arr[rnd(0,arr.length-1)];
const shuffle= arr      => [...arr].sort(()=>Math.random()-0.5);

function approxEq(a,b,tol=0.05){
  const na=parseFloat(String(a).replace(',','.'));
  const nb=parseFloat(String(b).replace(',','.'));
  return !isNaN(na) && !isNaN(nb) && Math.abs(na-nb)<=tol;
}

// Tabla Z simplificada
const Z_TABLE = { 90:1.645, 95:1.96, 99:2.576 };
const T_TABLE = {
  // grados de libertad → t95 (bilateral)
  5:2.571,6:2.447,7:2.365,8:2.306,9:2.262,10:2.228,
  11:2.201,12:2.179,13:2.160,14:2.145,15:2.131,
  16:2.120,17:2.110,18:2.101,19:2.093,20:2.086,
  25:2.060,30:2.042
};
function getT(df){
  if(T_TABLE[df]) return T_TABLE[df];
  const keys=Object.keys(T_TABLE).map(Number).sort((a,b)=>a-b);
  for(let i=0;i<keys.length-1;i++){
    if(df<keys[i+1]){ return T_TABLE[keys[i]]; }
  }
  return 1.96;
}

// ── Generadores de ejercicios ────────────────────

// =========================================================
// 1. PROBABILIDADES
// =========================================================

function genProbabilidad(nivel){
  const tipo = nivel===1 ? pick(['clasica','union']) :
               nivel===2 ? pick(['clasica','union','condicional']) :
               pick(['condicional','complemento_condicional','independencia']);
  return ejercicioProb[tipo](nivel);
}

const ejercicioProb = {

  clasica(nivel){
    const bags = [
      {ctx:'una bolsa con bolas de colores',items:[
        {n:'rojas',c:rnd(2,5)},{n:'azules',c:rnd(2,5)},{n:'verdes',c:rnd(1,4)}
      ], ask:'roja', askIdx:0},
      {ctx:'una urna con fichas numeradas',items:[
        {n:'pares',c:rnd(3,7)},{n:'impares',c:rnd(2,6)}
      ], ask:'par', askIdx:0},
    ];
    const b   = pick(bags);
    const tot = b.items.reduce((s,x)=>s+x.c,0);
    const fav = b.items[b.askIdx].c;
    const prob= parseFloat((fav/tot).toFixed(4));
    const pct = parseFloat((prob*100).toFixed(2));

    const distractores = [
      parseFloat(((fav+1)/tot).toFixed(4)),
      parseFloat((fav/(tot+1)).toFixed(4)),
      parseFloat(((tot-fav)/tot).toFixed(4)),
    ];
    const ops = shuffle([prob, ...distractores]).map(x=>`${x} (${(x*100).toFixed(2)}%)`);
    const correct = `${prob} (${pct}%)`;

    const desc = b.items.map(x=>`${x.c} ${x.n}`).join(', ');
    return {
      tag:'prob', tagLabel:'🎲 Probabilidades',
      tipo:'mc',
      enunciado:`Se tiene ${b.ctx} que contiene: <strong>${desc}</strong>. Se extrae una ficha al azar. ¿Cuál es la probabilidad de obtener una ficha <strong>${b.ask}</strong>?`,
      opciones: ops,
      correct,
      hint:`Probabilidad clásica: P = casos favorables / casos totales. Total = ${tot}, favorables = ${fav}.`,
      explicacion:`P(${b.ask}) = ${fav}/${tot} = ${prob} ≈ ${pct}%`,
      ptos: nivel===1?1:nivel===2?2:2
    };
  },

  union(nivel){
    const n = rnd(25,60);
    const a = rnd(8,18), b = rnd(7,16), ab = rnd(2,Math.min(a,b)-1);
    const pA  = parseFloat((a/n).toFixed(4));
    const pB  = parseFloat((b/n).toFixed(4));
    const pAB = parseFloat((ab/n).toFixed(4));
    const pAuB= parseFloat(((a+b-ab)/n).toFixed(4));

    const ops = shuffle([
      pAuB,
      parseFloat(((a+b)/n).toFixed(4)),
      parseFloat(((a+b-ab+1)/n).toFixed(4)),
      parseFloat(((a-ab)/n).toFixed(4)),
    ]).map(x=>`${x}`);
    const correct = `${pAuB}`;
    const contextos = [
      {tema:'estudiantes',ev1:'cursa Matemática',ev2:'cursa Física'},
      {tema:'personas',ev1:'tiene auto',ev2:'tiene moto'},
      {tema:'empleados',ev1:'habla inglés',ev2:'habla portugués'},
    ];
    const ctx = pick(contextos);
    return {
      tag:'prob', tagLabel:'🎲 Probabilidades',
      tipo:'mc',
      enunciado:`En un grupo de <strong>${n} ${ctx.tema}</strong>, <strong>${a} ${ctx.ev1}</strong>, <strong>${b} ${ctx.ev2}</strong> y <strong>${ab} hacen ambas cosas</strong>. Si se elige uno al azar, ¿cuál es la probabilidad de que <strong>${ctx.ev1} o ${ctx.ev2}</strong>?`,
      opciones: ops,
      correct,
      hint:`Usá la regla de la adición: P(A∪B) = P(A) + P(B) – P(A∩B). Con frecuencias: (${a} + ${b} – ${ab}) / ${n}.`,
      explicacion:`P(A∪B) = (${a}+${b}−${ab})/${n} = ${a+b-ab}/${n} = ${pAuB}`,
      ptos: nivel===1?1:2
    };
  },

  condicional(nivel){
    const n   = rnd(80,200);
    const hA  = rnd(30,70), hB  = rnd(25,60);
    const hAB = rnd(10, Math.min(hA,hB)-5);
    const pAB = parseFloat((hAB/n).toFixed(4));
    const pA  = parseFloat((hA/n).toFixed(4));
    const pBA = parseFloat((hAB/hA).toFixed(4));   // P(B|A)

    const ops = shuffle([
      pBA,
      parseFloat((hAB/hB).toFixed(4)),
      parseFloat((hB/n).toFixed(4)),
      parseFloat((hAB/n).toFixed(4)),
    ]).map(x=>`${x}`);
    const correct = `${pBA}`;
    const contextos = [
      {g1:'Medicina',g2:'Ingeniería',e1:'aprobó Química',e2:'aprobó Física'},
      {g1:'mujeres',g2:'varones',e1:'practica deporte',e2:'hace dieta'},
    ];
    const ctx = pick(contextos);
    return {
      tag:'prob', tagLabel:'🎲 Probabilidades',
      tipo:'mc',
      enunciado:`De <strong>${n} estudiantes</strong>: <strong>${hA} aprobaron Matemática (A)</strong>, <strong>${hB} aprobaron Estadística (B)</strong> y <strong>${hAB} aprobaron ambas</strong>. ¿Cuál es la probabilidad de que un estudiante haya aprobado Estadística, <em>dado que</em> aprobó Matemática? → P(B|A)`,
      opciones: ops,
      correct,
      hint:`Probabilidad condicional: P(B|A) = P(A∩B) / P(A) = (freq A∩B) / (freq A) = ${hAB}/${hA}.`,
      explicacion:`P(B|A) = P(A∩B)/P(A) = (${hAB}/${n}) / (${hA}/${n}) = ${hAB}/${hA} = ${pBA}`,
      ptos:2
    };
  },

  complemento_condicional(nivel){
    const n   = rnd(100,250);
    const hA  = rnd(40,100), hB  = rnd(30,80);
    const hAB = rnd(10, Math.min(hA,hB)-5);
    const pBcA= parseFloat(((hA-hAB)/hA).toFixed(4));  // P(B^c | A)

    const ops = shuffle([
      pBcA,
      parseFloat((hAB/hA).toFixed(4)),
      parseFloat(((hB-hAB)/n).toFixed(4)),
      parseFloat(((hA-hAB)/n).toFixed(4)),
    ]).map(x=>`${x}`);
    const correct = `${pBcA}`;
    return {
      tag:'prob', tagLabel:'🎲 Probabilidades',
      tipo:'mc',
      enunciado:`Se encuestaron <strong>${n} personas</strong>. <strong>${hA} hacen ejercicio (A)</strong>, <strong>${hB} hacen dieta (B)</strong> y <strong>${hAB} hacen ambas cosas</strong>. ¿Cuál es la probabilidad de que una persona elegida al azar <strong>no haga dieta</strong>, dado que sí hace ejercicio? → P(B<sup>c</sup>|A)`,
      opciones: ops,
      correct,
      hint:`P(Bᶜ|A) = P(A∩Bᶜ)/P(A). Las personas que hacen A pero no B = ${hA}−${hAB} = ${hA-hAB}. Dividí por ${hA}.`,
      explicacion:`P(Bᶜ|A) = (${hA}−${hAB})/${hA} = ${hA-hAB}/${hA} = ${pBcA}`,
      ptos:2
    };
  },

  independencia(nivel){
    const p1 = pick([0.3,0.4,0.5,0.6,0.25]);
    const p2 = pick([0.2,0.3,0.5,0.4,0.35]);
    const p12= parseFloat((p1*p2).toFixed(4));

    const ops = shuffle([
      p12,
      parseFloat((p1+p2).toFixed(4)),
      parseFloat((p1+p2-p12).toFixed(4)),
      parseFloat(((p1+p2)/2).toFixed(4)),
    ]).map(x=>`${x}`);
    const correct = `${p12}`;
    return {
      tag:'prob', tagLabel:'🎲 Probabilidades',
      tipo:'mc',
      enunciado:`Los eventos A y B son <strong>independientes</strong>. Se sabe que <strong>P(A) = ${p1}</strong> y <strong>P(B) = ${p2}</strong>. ¿Cuánto vale P(A∩B)?`,
      opciones: ops,
      correct,
      hint:`Si A y B son independientes: P(A∩B) = P(A) × P(B).`,
      explicacion:`P(A∩B) = P(A)×P(B) = ${p1}×${p2} = ${p12}`,
      ptos:1
    };
  }
};

// =========================================================
// 2. INTERVALO DE CONFIANZA
// =========================================================

function genIC(nivel){
  const tipo = nivel===1 ? 'media_sigma' :
               nivel===2 ? pick(['media_sigma','proporcion']) :
               pick(['media_sigma','proporcion','media_t']);
  return ejercicioIC[tipo](nivel);
}

const ejercicioIC = {

  media_sigma(nivel){
    const nc  = pick([90,95,99]);
    const z   = Z_TABLE[nc];
    const mu  = rndF(50,150,1);
    const sig = rndF(5,20,1);
    const n   = pick([36,49,64,100]);
    const err = parseFloat((z * sig / Math.sqrt(n)).toFixed(4));
    const li  = parseFloat((mu - err).toFixed(4));
    const ls  = parseFloat((mu + err).toFixed(4));

    const contextos = [
      {var:'peso (kg)',unidad:'kg'},
      {var:'tiempo de espera (min)',unidad:'min'},
      {var:'temperatura (°C)',unidad:'°C'},
      {var:'altura (cm)',unidad:'cm'},
    ];
    const ctx = pick(contextos);
    return {
      tag:'ic', tagLabel:'📐 Intervalo de Confianza',
      tipo:'ic',
      enunciado:`Se tomó una muestra de <strong>n = ${n}</strong> observaciones de <strong>${ctx.var}</strong>, obteniendo una media muestral de <strong>x̄ = ${mu} ${ctx.unidad}</strong>. Se sabe que la desviación estándar poblacional es <strong>σ = ${sig} ${ctx.unidad}</strong>. Construí un <strong>IC del ${nc}%</strong> para la media poblacional.`,
      li, ls, nc, z, n,
      formula: `x̄ ± Z·(σ/√n) = ${mu} ± ${z}·(${sig}/√${n})`,
      hint:`Fórmula: IC = x̄ ± Z_(α/2) · σ/√n. Con NC=${nc}%, Z = ${z}. Error = ${z}×${sig}/√${n} = ${err}.`,
      explicacion:`IC = ${mu} ± ${z}·${sig}/√${n} = ${mu} ± ${err} → [${li}; ${ls}]`,
      ptos: nivel===1?2:2
    };
  },

  proporcion(nivel){
    const nc   = pick([90,95,99]);
    const z    = Z_TABLE[nc];
    const n    = pick([100,150,200,250]);
    const x    = rnd(30,Math.floor(n*0.7));
    const p    = parseFloat((x/n).toFixed(4));
    const q    = parseFloat((1-p).toFixed(4));
    const err  = parseFloat((z * Math.sqrt(p*q/n)).toFixed(4));
    const li   = parseFloat(Math.max(0,p-err).toFixed(4));
    const ls   = parseFloat(Math.min(1,p+err).toFixed(4));

    const contextos = [
      {evento:'prefieren el producto A',total:'consumidores encuestados'},
      {evento:'aprobaron el examen',total:'alumnos evaluados'},
      {evento:'presentaron síntomas',total:'pacientes relevados'},
    ];
    const ctx = pick(contextos);
    return {
      tag:'ic', tagLabel:'📐 Intervalo de Confianza',
      tipo:'ic',
      enunciado:`De una muestra de <strong>n = ${n} ${ctx.total}</strong>, <strong>${x} ${ctx.evento}</strong>. Estimá la proporción poblacional con un <strong>IC del ${nc}%</strong>.`,
      li, ls, nc, z, n,
      formula: `p̂ ± Z·√(p̂q̂/n)`,
      hint:`p̂ = ${x}/${n} = ${p}. Fórmula: IC = p̂ ± Z·√(p̂·q̂/n). Raíz(${p}×${q}/${n}) = ${parseFloat(Math.sqrt(p*q/n).toFixed(4))}. Error = ${err}.`,
      explicacion:`p̂ = ${p}, q̂ = ${q}. IC = ${p} ± ${z}·√(${p}×${q}/${n}) = ${p} ± ${err} → [${li}; ${ls}]`,
      ptos:2
    };
  },

  media_t(nivel){
    const nc  = 95;
    const n   = pick([6,8,10,12,15,16]);
    const df  = n-1;
    const t   = getT(df);
    const xb  = rndF(40,120,2);
    const s   = rndF(4,18,2);
    const err = parseFloat((t * s / Math.sqrt(n)).toFixed(4));
    const li  = parseFloat((xb - err).toFixed(4));
    const ls  = parseFloat((xb + err).toFixed(4));
    const contextos=[
      {var:'pesos (kg)',unidad:'kg'},
      {var:'tiempos de producción (min)',unidad:'min'},
    ];
    const ctx=pick(contextos);
    return {
      tag:'ic', tagLabel:'📐 Intervalo de Confianza',
      tipo:'ic',
      enunciado:`Una muestra de <strong>n = ${n}</strong> valores de <strong>${ctx.var}</strong> arrojó: <strong>x̄ = ${xb}</strong> y desviación estándar muestral <strong>s = ${s}</strong>. La varianza poblacional es desconocida. Construí un <strong>IC del ${nc}%</strong> para la media (distribución t de Student).`,
      li, ls, nc, z:t, n,
      formula: `x̄ ± t_(α/2,${df})·(s/√n) = ${xb} ± ${t}·(${s}/√${n})`,
      hint:`Usá t de Student con gl = n−1 = ${df}. t_(0.025,${df}) ≈ ${t}. Error = ${t}×${s}/√${n} = ${err}.`,
      explicacion:`IC = ${xb} ± ${t}·${s}/√${n} = ${xb} ± ${err} → [${li}; ${ls}]`,
      ptos:2
    };
  }
};

// =========================================================
// 3. ESTADÍSTICA DESCRIPTIVA – tabla de frecuencias
// =========================================================

function genDescriptiva(nivel){
  // Generamos un dataset de enteros según nivel
  const sizes = [nivel===1?8:nivel===2?10:12];
  const sz    = sizes[0];
  const min   = nivel===1?1:nivel===2?2:5;
  const max   = nivel===1?8:nivel===2?12:20;

  const rawData = Array.from({length:sz},()=>rnd(min,max));
  const sorted  = [...rawData].sort((a,b)=>a-b);

  // Frecuencias
  const freq = {};
  rawData.forEach(v=>{ freq[v]=(freq[v]||0)+1; });
  const valores  = Object.keys(freq).map(Number).sort((a,b)=>a-b);
  const n        = rawData.length;

  let filas = [];
  let facum = 0, fracum = 0;
  valores.forEach(v=>{
    const fi  = freq[v];
    facum    += fi;
    const fri  = parseFloat((fi/n).toFixed(4));
    fracum   += fri;
    filas.push({
      xi:v, fi, facum,
      fri: parseFloat(fri.toFixed(4)),
      fracum: parseFloat(fracum.toFixed(4))
    });
  });

  // Medidas
  const media = parseFloat((rawData.reduce((a,b)=>a+b,0)/n).toFixed(4));

  // Mediana
  const mediana = n%2===0
    ? parseFloat(((sorted[n/2-1]+sorted[n/2])/2).toFixed(4))
    : sorted[Math.floor(n/2)];

  // Moda
  const maxF = Math.max(...Object.values(freq));
  const modas = Object.keys(freq).filter(k=>freq[k]===maxF).map(Number).sort((a,b)=>a-b);
  const modaStr = modas.join(' y ');

  // Rango
  const rango = sorted[sorted.length-1]-sorted[0];

  // Varianza muestral
  const varianza = parseFloat((rawData.reduce((s,x)=>s+Math.pow(x-media,2),0)/(n-1)).toFixed(4));
  const desvEst  = parseFloat(Math.sqrt(varianza).toFixed(4));

  // Coef variación
  const cv = parseFloat((desvEst/media*100).toFixed(2));

  const medidas = {media, mediana, modaStr, rango, varianza, desvEst, cv};

  const instruccion = nivel===1
    ? 'Completá la tabla de frecuencias y calculá la media, mediana y moda.'
    : nivel===2
    ? 'Completá la tabla completa y calculá: media, mediana, moda, rango y desvío estándar.'
    : 'Completá toda la tabla y calculá: media, mediana, moda, rango, varianza muestral, desvío estándar y coeficiente de variación.';

  return {
    tag:'desc', tagLabel:'📊 Estadística Descriptiva',
    tipo:'tabla',
    datos: rawData,
    n,
    filas,
    medidas,
    nivel,
    enunciado:`Se registraron los siguientes <strong>${n} valores</strong>: <strong>${rawData.join(', ')}</strong>. ${instruccion}`,
    hint: `Ordená los datos de menor a mayor: ${sorted.join(', ')}. La frecuencia absoluta (fi) es cuántas veces aparece cada valor. La relativa (fri) = fi/n. Las acumuladas se suman de arriba hacia abajo.`,
    ptos: nivel===1?3:nivel===2?4:5
  };
}

// =========================================================
// ESTADO GLOBAL
// =========================================================

let examenes = [];
let correcciones = [false, false, false];
let TOTAL_PTOS = 0;
let OBTENIDOS  = 0;

// =========================================================
// RENDER
// =========================================================

function renderAll(){
  const container = document.getElementById('examenes-container');
  container.innerHTML = '';
  correcciones = [false,false,false];
  TOTAL_PTOS   = 0;
  OBTENIDOS    = 0;
  examenes     = [];

  // Generar 3 mini-exámenes con dificultad 1, 2, 3
  for(let i=0;i<3;i++){
    const nivel = i+1;
    const prob  = genProbabilidad(nivel);
    const ic    = genIC(nivel);
    const desc  = genDescriptiva(nivel);
    examenes.push({nivel, ejercicios:[prob,ic,desc]});
    TOTAL_PTOS += prob.ptos + ic.ptos + desc.ptos;
  }

  updateGlobalScore();

  examenes.forEach((ex,idx)=>{
    const card = buildExamenCard(ex, idx);
    container.appendChild(card);
    // staggered animation
    card.style.animationDelay = `${idx*0.15}s`;
  });
}

function buildExamenCard(ex, idx){
  const titles = ['Ejercicio Introductorio','Ejercicio Intermedio','Ejercicio Avanzado'];
  const subtitles = ['Dificultad baja 🌱','Dificultad media 🌿','Dificultad alta 🌳'];
  const nums  = ['I','II','III'];
  const ptosTotales = ex.ejercicios.reduce((s,e)=>s+e.ptos,0);

  const card = document.createElement('div');
  card.className = 'examen-card';
  card.id = `examen-${idx}`;

  card.innerHTML = `
    <div class="examen-header">
      <div class="examen-num">${nums[idx]}</div>
      <div class="examen-title-block">
        <div class="examen-title">Mini Examen ${nums[idx]} — ${titles[idx]}</div>
        <div class="examen-subtitle">${subtitles[idx]} · ${ptosTotales} puntos</div>
      </div>
    </div>
    <div class="examen-body" id="body-${idx}"></div>
    <div class="motivational" id="motiv-${idx}"></div>
    <div class="examen-footer">
      <div class="score-display">
        <div class="score-stars" id="stars-${idx}">☆☆☆</div>
        <div class="score-text" id="scoretext-${idx}">–</div>
      </div>
      <button class="btn-corregir" id="btn-${idx}" onclick="corregirExamen(${idx})">
        ✔ Corregir Mini Examen ${nums[idx]}
      </button>
    </div>
  `;

  const body = card.querySelector(`#body-${idx}`);
  ex.ejercicios.forEach((ej,eidx)=>{
    body.appendChild(buildEjercicioEl(ej, idx, eidx));
  });

  return card;
}

function buildEjercicioEl(ej, examIdx, ejIdx){
  const el = document.createElement('div');
  el.className = 'ejercicio';
  el.id = `ej-${examIdx}-${ejIdx}`;

  let inputHTML = '';

  if(ej.tipo==='mc'){
    inputHTML = buildMC(ej, examIdx, ejIdx);
  } else if(ej.tipo==='ic'){
    inputHTML = buildIC(ej, examIdx, ejIdx);
  } else if(ej.tipo==='tabla'){
    inputHTML = buildTabla(ej, examIdx, ejIdx);
  }

  el.innerHTML = `
    <div class="ejercicio-tag ${ej.tag === 'prob' ? 'tag-prob' : ej.tag==='ic'?'tag-ic':'tag-desc'}">${ej.tagLabel}</div>
    <div class="ejercicio-enunciado">${ej.enunciado}</div>
    ${inputHTML}
    <button class="hint-btn" onclick="toggleHint(${examIdx},${ejIdx})">💡 Ver pista</button>
    <div class="hint-box" id="hint-${examIdx}-${ejIdx}">${ej.hint}</div>
    <div class="feedback-inline" id="fb-${examIdx}-${ejIdx}"></div>
  `;

  return el;
}

// ── Multiple Choice ──────────────────────────────
function buildMC(ej, ei, ji){
  const ops = ej.opciones.map((op,oi)=>`
    <li>
      <label class="opcion-label" id="lbl-${ei}-${ji}-${oi}" onclick="selectOpcion(${ei},${ji},${oi})">
        <input type="radio" name="mc-${ei}-${ji}" value="${op}" />
        <span class="opcion-bullet"></span>
        <span>${op}</span>
      </label>
    </li>
  `).join('');
  return `<ul class="opciones-list">${ops}</ul>`;
}

function selectOpcion(ei,ji,oi){
  const count = examenes[ei].ejercicios[ji].opciones.length;
  for(let i=0;i<count;i++){
    const lbl = document.getElementById(`lbl-${ei}-${ji}-${i}`);
    if(lbl) lbl.classList.remove('selected');
  }
  const sel = document.getElementById(`lbl-${ei}-${ji}-${oi}`);
  if(sel) sel.classList.add('selected');
}

// ── IC ───────────────────────────────────────────
function buildIC(ej, ei, ji){
  return `
    <div class="ic-block">
      <div style="font-size:0.85rem;color:var(--text-soft);margin-bottom:8px;font-family:'DM Mono',monospace;">
        Fórmula: ${ej.formula}
      </div>
      <div class="ic-row">
        <span class="ic-bracket">[</span>
        <input class="stat-input" id="ic-li-${ei}-${ji}" type="text" placeholder="Límite inferior" />
        <span style="color:var(--text-soft);">;</span>
        <input class="stat-input" id="ic-ls-${ei}-${ji}" type="text" placeholder="Límite superior" />
        <span class="ic-bracket">]</span>
      </div>
    </div>
  `;
}

// ── Tabla de Frecuencias ─────────────────────────
function buildTabla(ej, ei, ji){
  const { filas, n, nivel } = ej;

  // Qué columnas mostrar según nivel
  const showFi    = true;
  const showFacum = nivel >= 1;
  const showFri   = nivel >= 1;
  const showFracum= nivel >= 2;

  let headers = '<th>xi</th>';
  if(showFi)     headers += '<th>fi</th>';
  if(showFacum)  headers += '<th>Fi (acum.)</th>';
  if(showFri)    headers += '<th>fri</th>';
  if(showFracum) headers += '<th>Fri (acum.)</th>';

  let rows = filas.map((f,ri)=>{
    let cells = `<td class="given">${f.xi}</td>`;
    if(showFi)     cells += `<td><input type="text" id="t${ei}${ji}-${ri}-fi"    placeholder="fi" /></td>`;
    if(showFacum)  cells += `<td><input type="text" id="t${ei}${ji}-${ri}-facum" placeholder="Fi" /></td>`;
    if(showFri)    cells += `<td><input type="text" id="t${ei}${ji}-${ri}-fri"   placeholder="fri" /></td>`;
    if(showFracum) cells += `<td><input type="text" id="t${ei}${ji}-${ri}-fracum"placeholder="Fri" /></td>`;
    return `<tr>${cells}</tr>`;
  }).join('');

  // Fila de totales
  let totCells = `<td class="given total-row" style="text-align:left;font-weight:700;">TOTAL</td>`;
  if(showFi)     totCells += `<td class="total-row"><input type="text" id="t${ei}${ji}-tot-fi"    placeholder="Σfi" /></td>`;
  if(showFacum)  totCells += `<td class="total-row">–</td>`;
  if(showFri)    totCells += `<td class="total-row"><input type="text" id="t${ei}${ji}-tot-fri"   placeholder="Σfri" /></td>`;
  if(showFracum) totCells += `<td class="total-row">–</td>`;

  // Medidas
  let medidasHTML = `
    <div style="display:flex;flex-wrap:wrap;gap:10px;margin-top:18px;">
      <div class="input-group">
        <label>Media (x̄)</label>
        <input class="stat-input" type="text" id="m${ei}${ji}-media" placeholder="ej: 5.25" />
      </div>
      <div class="input-group">
        <label>Mediana</label>
        <input class="stat-input" type="text" id="m${ei}${ji}-mediana" placeholder="ej: 5" />
      </div>
      <div class="input-group">
        <label>Moda</label>
        <input class="stat-input" type="text" id="m${ei}${ji}-moda" placeholder="ej: 4" />
      </div>
      ${nivel>=2?`
      <div class="input-group">
        <label>Rango</label>
        <input class="stat-input" type="text" id="m${ei}${ji}-rango" placeholder="ej: 7" />
      </div>
      <div class="input-group">
        <label>Desvío estándar (s)</label>
        <input class="stat-input" type="text" id="m${ei}${ji}-desv" placeholder="ej: 2.15" />
      </div>`:''}
      ${nivel>=3?`
      <div class="input-group">
        <label>Varianza (s²)</label>
        <input class="stat-input" type="text" id="m${ei}${ji}-var" placeholder="ej: 4.62" />
      </div>
      <div class="input-group">
        <label>Coef. de variación (%)</label>
        <input class="stat-input" type="text" id="m${ei}${ji}-cv" placeholder="ej: 18.5%" />
      </div>`:''}
    </div>
  `;

  return `
    <div class="freq-table-wrap">
      <table class="freq-table">
        <thead><tr>${headers}</tr></thead>
        <tbody>${rows}<tr>${totCells}</tr></tbody>
      </table>
    </div>
    ${medidasHTML}
  `;
}

// ── Toggle Hint ──────────────────────────────────
function toggleHint(ei,ji){
  const box = document.getElementById(`hint-${ei}-${ji}`);
  box.classList.toggle('visible');
}

// =========================================================
// CORRECCIÓN
// =========================================================

function corregirExamen(idx){
  if(correcciones[idx]) return;
  correcciones[idx]=true;

  const ex = examenes[idx];
  let ptosObtenidos = 0;
  const feedbacks = [];

  ex.ejercicios.forEach((ej,ejIdx)=>{
    const {ok, fb} = corregirEjercicio(ej, idx, ejIdx);
    if(ok) ptosObtenidos += ej.ptos;
    feedbacks.push({ok, fb, ptos:ej.ptos});
  });

  // Bloquear botón
  const btn = document.getElementById(`btn-${idx}`);
  btn.disabled = true;
  btn.textContent = '✔ Corregido';

  // Mostrar puntaje
  const ptosTot = ex.ejercicios.reduce((s,e)=>s+e.ptos,0);
  const pct = Math.round(ptosObtenidos/ptosTot*100);
  const stars = pct>=80?'★★★':pct>=50?'★★☆':'★☆☆';
  document.getElementById(`stars-${idx}`).textContent = stars;
  document.getElementById(`scoretext-${idx}`).innerHTML =
    `<strong>${ptosObtenidos}/${ptosTot} pts</strong> (${pct}%)`;

  // Mensaje motivacional
  const msgs_perfect = ['🎉 ¡Perfecto, Magali! ¡Los tenés a todos! 💙','🌟 ¡Excelente! Cero errores. ¡Sos una crack! 🌸'];
  const msgs_good    = ['💪 ¡Muy bien! Estás en camino. Un repasito más y lo clavás.','😊 ¡Buen trabajo! Revisá los errores y ya lo tenés.'];
  const msgs_try     = ['🌱 Tranquila, Magali. Leé las correcciones y volvé a intentarlo.','💙 No te rindas. Revisá las pistas y vas a entenderlo.'];

  const motiv = document.getElementById(`motiv-${idx}`);
  motiv.classList.add('show');
  if(pct===100){ motiv.className='motivational show perfect'; motiv.textContent=pick(msgs_perfect); }
  else if(pct>=50){ motiv.className='motivational show good'; motiv.textContent=pick(msgs_good); }
  else { motiv.className='motivational show try'; motiv.textContent=pick(msgs_try); }

  // Actualizar total global
  OBTENIDOS += ptosObtenidos;
  updateGlobalScore();

  // Celebración si todo perfecto
  if(pct===100 && correcciones.every(Boolean)){
    setTimeout(()=>showCelebration(), 600);
  }
}

function corregirEjercicio(ej, ei, ji){
  const fbEl = document.getElementById(`fb-${ei}-${ji}`);

  if(ej.tipo==='mc'){
    // Buscar seleccionada
    const count = ej.opciones.length;
    let selVal = null, selIdx = -1;
    for(let i=0;i<count;i++){
      const lbl = document.getElementById(`lbl-${ei}-${ji}-${i}`);
      if(lbl && lbl.classList.contains('selected')){ selVal=ej.opciones[i]; selIdx=i; break; }
    }

    const ok = selVal !== null && selVal.trim() === ej.correct.trim();

    // Colorear opciones
    for(let i=0;i<count;i++){
      const lbl = document.getElementById(`lbl-${ei}-${ji}-${i}`);
      if(!lbl) continue;
      lbl.style.pointerEvents='none';
      if(ej.opciones[i].trim()===ej.correct.trim()){
        lbl.classList.add(selIdx===i?'correct-choice':'show-correct');
      } else if(i===selIdx && !ok){
        lbl.classList.add('wrong-choice');
      }
    }

    fbEl.className = ok ? 'feedback-inline ok' : 'feedback-inline err';
    fbEl.innerHTML = ok
      ? `✅ ¡Correcto! ${ej.explicacion}`
      : `❌ Incorrecto. <strong>Respuesta correcta: ${ej.correct}</strong><br>${ej.explicacion}`;

    return {ok, fb:''};
  }

  if(ej.tipo==='ic'){
    const liInp = document.getElementById(`ic-li-${ei}-${ji}`);
    const lsInp = document.getElementById(`ic-ls-${ei}-${ji}`);
    const liOk  = approxEq(liInp.value, ej.li, 0.06);
    const lsOk  = approxEq(lsInp.value, ej.ls, 0.06);
    liInp.className = 'stat-input ' + (liOk?'input-ok':'input-err');
    lsInp.className = 'stat-input ' + (lsOk?'input-ok':'input-err');
    liInp.disabled = lsInp.disabled = true;
    const ok = liOk && lsOk;
    fbEl.className = ok ? 'feedback-inline ok' : 'feedback-inline err';
    fbEl.innerHTML = ok
      ? `✅ ¡Perfecto! IC = [${ej.li}; ${ej.ls}]`
      : `❌ ${ej.explicacion}.<br>L.I. correcto: <strong>${ej.li}</strong> · L.S. correcto: <strong>${ej.ls}</strong>`;
    return {ok, fb:''};
  }

  if(ej.tipo==='tabla'){
    const {filas, n, medidas, nivel} = ej;
    let errores = [];
    let aciertos= 0;
    let total   = 0;

    // Verificar tabla
    filas.forEach((f,ri)=>{
      const chk=(id,val,tol=0.05,label='')=>{
        total++;
        const inp=document.getElementById(id);
        if(!inp) return;
        const ok=approxEq(inp.value,val,tol);
        inp.className='input-ok' + (ok?'':' input-err');
        inp.className = ok ? 'input-ok':'input-err';
        inp.disabled=true;
        if(ok) aciertos++;
        else errores.push(`${label}: esperaba ${val}`);
        inp.title = ok ? '✅ Correcto' : `❌ Correcto: ${val}`;
      };
      chk(`t${ei}${ji}-${ri}-fi`,    f.fi,   0.01, `fi(xi=${f.xi})`);
      chk(`t${ei}${ji}-${ri}-facum`, f.facum, 0.01, `Fi(xi=${f.xi})`);
      chk(`t${ei}${ji}-${ri}-fri`,   f.fri,   0.02, `fri(xi=${f.xi})`);
      if(nivel>=2)
        chk(`t${ei}${ji}-${ri}-fracum`,f.fracum,0.03, `Fri(xi=${f.xi})`);
    });

    // Totales
    const tfi = document.getElementById(`t${ei}${ji}-tot-fi`);
    const tfri= document.getElementById(`t${ei}${ji}-tot-fri`);
    if(tfi){total++;const ok=approxEq(tfi.value,n,0.01);tfi.className=ok?'input-ok':'input-err';tfi.disabled=true;if(ok)aciertos++;}
    if(tfri){total++;const ok=approxEq(tfri.value,1,0.03);tfri.className=ok?'input-ok':'input-err';tfri.disabled=true;if(ok)aciertos++;}

    // Medidas
    const chkM=(id,val,tol,lbl)=>{
      total++;
      const inp=document.getElementById(id);
      if(!inp) return;
      // Para moda que puede ser string con "y"
      let ok;
      if(typeof val==='string'){
        ok = inp.value.trim().replace(/\s/g,'') === val.replace(/\s/g,'');
      } else {
        ok = approxEq(inp.value, val, tol);
      }
      inp.className='stat-input '+(ok?'input-ok':'input-err');
      inp.disabled=true;
      if(ok) aciertos++;
      else errores.push(`${lbl}: esperaba ${val}`);
      inp.title=ok?'✅ Correcto':`❌ Correcto: ${val}`;
    };
    chkM(`m${ei}${ji}-media`,  medidas.media,   0.05, 'Media');
    chkM(`m${ei}${ji}-mediana`,medidas.mediana,  0.05, 'Mediana');
    chkM(`m${ei}${ji}-moda`,   medidas.modaStr,  0,    'Moda');
    if(nivel>=2){
      chkM(`m${ei}${ji}-rango`, medidas.rango,  0.05, 'Rango');
      chkM(`m${ei}${ji}-desv`,  medidas.desvEst,0.1,  'Desvío estándar');
    }
    if(nivel>=3){
      chkM(`m${ei}${ji}-var`,medidas.varianza,0.15,'Varianza');
      chkM(`m${ei}${ji}-cv`,medidas.cv,0.5,'CV%');
    }

    const ok = aciertos===total;
    fbEl.className = ok ? 'feedback-inline ok' : 'feedback-inline err';
    if(ok){
      fbEl.innerHTML = `✅ ¡Todo correcto! n=${n}, Media=${medidas.media}, Mediana=${medidas.mediana}, Moda=${medidas.modaStr}${nivel>=2?`, s=${medidas.desvEst}`:''}`;
    } else {
      fbEl.innerHTML = `❌ ${aciertos}/${total} campos correctos.<br>` +
        errores.slice(0,5).map(e=>`• ${e}`).join('<br>') +
        (errores.length>5?`<br>• ... y ${errores.length-5} más.`:'');
    }

    // Para puntaje del examen solo contamos ok total
    return {ok: aciertos/total >= 0.75, fb:''};
  }

  return {ok:false, fb:''};
}

// =========================================================
// SCORE GLOBAL
// =========================================================

function updateGlobalScore(){
  const fill = document.getElementById('globalFill');
  const num  = document.getElementById('globalScoreNum');
  const pct  = TOTAL_PTOS>0 ? Math.round(OBTENIDOS/TOTAL_PTOS*100) : 0;
  fill.style.width = pct+'%';
  num.textContent  = `${OBTENIDOS} / ${TOTAL_PTOS} pts`;
}

// =========================================================
// CELEBRACIÓN
// =========================================================

function showCelebration(){
  const pct = Math.round(OBTENIDOS/TOTAL_PTOS*100);
  const stars = pct>=90?'★★★★★':pct>=70?'★★★★☆':pct>=50?'★★★☆☆':'★★☆☆☆';

  const div = document.createElement('div');
  div.className='celebration';
  div.innerHTML=`
    <div class="celebration-box">
      <div style="font-size:3rem;margin-bottom:12px">🎉</div>
      <h2>¡Terminaste, Magali!</h2>
      <p>Completaste los 3 mini-exámenes. Acá está tu resultado final:</p>
      <div class="celebration-score">${OBTENIDOS} / ${TOTAL_PTOS} pts</div>
      <div class="celebration-stars">${stars}</div>
      <p>${pct>=80?'¡Sos una genia! 💙 Con eso aprobás sin problema.':pct>=60?'¡Muy bien! Un poco más de práctica y lo clavás. 🌸':'💙 No te rindas, Maga. Hacé click en Nuevos Ejercicios y volvé a intentarlo.'}</p>
      <button class="btn-close-celebration" onclick="this.closest('.celebration').remove()">Seguir practicando 💪</button>
    </div>
  `;
  document.body.appendChild(div);
}

// =========================================================
// REGENERAR
// =========================================================

function regenerateAll(){
  OBTENIDOS=0; TOTAL_PTOS=0;
  document.querySelectorAll('.celebration').forEach(el=>el.remove());
  renderAll();
  window.scrollTo({top:0, behavior:'smooth'});
}

// =========================================================
// FLOATING HEARTS
// =========================================================

function spawnHearts(){
  const container = document.getElementById('heartsBg');
  const emojis = ['💙','🩵','💜','🌸','✨','💫','🤍'];
  for(let i=0;i<18;i++){
    const span=document.createElement('span');
    span.className='heart';
    span.textContent=pick(emojis);
    span.style.left=rnd(0,100)+'%';
    span.style.animationDuration=rnd(12,28)+'s';
    span.style.animationDelay=rnd(0,20)+'s';
    span.style.fontSize=rnd(8,16)+'px';
    container.appendChild(span);
  }
}

// =========================================================
// INIT
// =========================================================

document.addEventListener('DOMContentLoaded',()=>{
  spawnHearts();
  renderAll();
});
