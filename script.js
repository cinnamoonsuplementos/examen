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
  if(isNaN(na)||isNaN(nb)) return false;
  const absDiff = Math.abs(na-nb);
  // Para valores grandes usamos tolerancia relativa del 1%
  const relTol  = Math.abs(nb) > 1 ? Math.abs(nb)*0.015 : tol;
  return absDiff <= Math.max(tol, relTol);
}

// Tabla Z simplificada
const Z_TABLE = { 90:1.65, 95:1.96, 99:2.58 };
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
// 1. PROBABILIDADES — enunciado único con 3 sub-preguntas
//    Contextos de fonoaudiología / salud del habla y la escucha
// =========================================================

// Banco de contextos clínicos. Cada uno define:
//   texto del enunciado (con placeholders N, nA, nB, nAB),
//   nombres de los eventos A y B para las preguntas,
//   etiquetas cortas para los cálculos.
const CONTEXTOS_PROB = [
  {
    armar: (N,nA,nB,nAB) => `En un grupo de <strong>${N} pacientes</strong> evaluados en una clínica fonoaudiológica, <strong>${nA} presentan disfonía (A)</strong>, <strong>${nB} presentan hipoacusia (B)</strong> y <strong>${nAB} presentan ambas alteraciones</strong>.`,
    evA:'disfonía', evB:'hipoacusia', hint_ctx:'disfonía (A) e hipoacusia (B)'
  },
  {
    armar: (N,nA,nB,nAB) => `Se relevaron <strong>${N} estudiantes universitarios</strong> de Fonoaudiología. <strong>${nA} refieren dificultades en la producción oral (A)</strong>, <strong>${nB} refieren dificultades en la comprensión auditiva (B)</strong> y <strong>${nAB} presentan ambas dificultades</strong>.`,
    evA:'dificultad en producción oral', evB:'dificultad en comprensión auditiva', hint_ctx:'producción oral (A) y comprensión auditiva (B)'
  },
  {
    armar: (N,nA,nB,nAB) => `En una campaña de detección temprana, se evaluaron <strong>${N} niños en edad escolar</strong>. <strong>${nA} presentan tartamudez (A)</strong>, <strong>${nB} presentan pérdida auditiva leve (B)</strong> y <strong>${nAB} presentan ambos trastornos</strong>.`,
    evA:'tartamudez', evB:'pérdida auditiva leve', hint_ctx:'tartamudez (A) y pérdida auditiva leve (B)'
  },
  {
    armar: (N,nA,nB,nAB) => `Un hospital registró <strong>${N} consultas fonoaudiológicas</strong>. En <strong>${nA} casos se diagnosticó nódulos vocales (A)</strong>, en <strong>${nB} casos se diagnosticó otitis media crónica (B)</strong> y en <strong>${nAB} casos ambas patologías</strong>.`,
    evA:'nódulos vocales', evB:'otitis media crónica', hint_ctx:'nódulos vocales (A) y otitis media crónica (B)'
  },
  {
    armar: (N,nA,nB,nAB) => `Se encuestaron <strong>${N} docentes</strong> sobre salud vocal. <strong>${nA} refieren fatiga vocal frecuente (A)</strong>, <strong>${nB} refieren dificultades para ser escuchados en clase (B)</strong> y <strong>${nAB} presentan ambas situaciones</strong>.`,
    evA:'fatiga vocal', evB:'dificultad para ser escuchado', hint_ctx:'fatiga vocal (A) y dificultad para ser escuchado (B)'
  },
  {
    armar: (N,nA,nB,nAB) => `En un estudio con <strong>${N} adultos mayores</strong>, <strong>${nA} tienen presbiacusia (A)</strong>, <strong>${nB} presentan disartria (B)</strong> y <strong>${nAB} tienen ambas condiciones</strong>.`,
    evA:'presbiacusia', evB:'disartria', hint_ctx:'presbiacusia (A) y disartria (B)'
  },
  {
    armar: (N,nA,nB,nAB) => `Se realizó un relevamiento en <strong>${N} pacientes pediátricos</strong> de un servicio de fonoaudiología. <strong>${nA} presentan retraso en el desarrollo del lenguaje (A)</strong>, <strong>${nB} presentan dificultades de deglución (B)</strong> y <strong>${nAB} presentan ambas condiciones</strong>.`,
    evA:'retraso en el lenguaje', evB:'dificultades de deglución', hint_ctx:'retraso del lenguaje (A) y deglución (B)'
  },
  {
    armar: (N,nA,nB,nAB) => `En un hospital de día, se evaluaron <strong>${N} pacientes con antecedentes de ACV</strong>. <strong>${nA} presentan afasia (A)</strong>, <strong>${nB} presentan disfagia (B)</strong> y <strong>${nAB} presentan ambas alteraciones</strong>.`,
    evA:'afasia', evB:'disfagia', hint_ctx:'afasia (A) y disfagia (B)'
  },
  {
    armar: (N,nA,nB,nAB) => `Un estudio incluyó <strong>${N} pacientes con uso profesional de la voz</strong> (cantantes, actores, docentes). <strong>${nA} presentan disfonía funcional (A)</strong>, <strong>${nB} presentan nódulos vocales (B)</strong> y <strong>${nAB} presentan ambas patologías</strong>.`,
    evA:'disfonía funcional', evB:'nódulos vocales', hint_ctx:'disfonía funcional (A) y nódulos vocales (B)'
  },
  {
    armar: (N,nA,nB,nAB) => `Se realizó un screening auditivo a <strong>${N} recién nacidos</strong>. <strong>${nA} tuvieron resultado alterado en el oído derecho (A)</strong>, <strong>${nB} tuvieron resultado alterado en el oído izquierdo (B)</strong> y <strong>${nAB} tuvieron ambos resultados alterados</strong>.`,
    evA:'alteración oído derecho', evB:'alteración oído izquierdo', hint_ctx:'alteración oído derecho (A) e izquierdo (B)'
  },
  {
    armar: (N,nA,nB,nAB) => `En una clínica de neurorehabilitación, se evaluaron <strong>${N} pacientes</strong>. <strong>${nA} presentan apraxia del habla (A)</strong>, <strong>${nB} presentan disartria (B)</strong> y <strong>${nAB} presentan ambas condiciones</strong>.`,
    evA:'apraxia del habla', evB:'disartria', hint_ctx:'apraxia (A) y disartria (B)'
  },
  {
    armar: (N,nA,nB,nAB) => `Un relevamiento incluyó <strong>${N} escolares de primer grado</strong>. <strong>${nA} presentan dislalia (A)</strong>, <strong>${nB} presentan dificultades en conciencia fonológica (B)</strong> y <strong>${nAB} presentan ambas dificultades</strong>.`,
    evA:'dislalia', evB:'dificultad en conciencia fonológica', hint_ctx:'dislalia (A) y conciencia fonológica (B)'
  },
];

// Rastrear contextos usados en la sesión para no repetir entre mini-exámenes
let _ctxUsados = [];
function resetCtxProb(){ _ctxUsados = []; }

function pickCtxProb(){
  const disponibles = CONTEXTOS_PROB.filter((_,i) => !_ctxUsados.includes(i));
  const pool = disponibles.length > 0 ? disponibles : CONTEXTOS_PROB;
  const idx  = CONTEXTOS_PROB.indexOf(pick(pool));
  _ctxUsados.push(idx);
  return CONTEXTOS_PROB[idx];
}

// Genera las 3 sub-preguntas según el nivel de dificultad.
// Nivel 1: complemento, unión, intersección  (operaciones básicas)
// Nivel 2: unión, condicional P(B|A), intersección
// Nivel 3: condicional P(B|A), condicional P(A|B), independencia + verificación
function genProbabilidad(nivel){
  const ctx = pickCtxProb();

  // Generar frecuencias con sentido (A∩B ⊆ A y A∩B ⊆ B)
  const N   = rnd(60, 200);
  const nA  = rnd(Math.floor(N*0.2), Math.floor(N*0.55));
  const nB  = rnd(Math.floor(N*0.15), Math.floor(N*0.50));
  const nAB = rnd(Math.max(1, Math.floor(Math.min(nA,nB)*0.1)),
                  Math.floor(Math.min(nA,nB)*0.6));

  // Probabilidades base
  const pA   = parseFloat((nA/N).toFixed(4));
  const pB   = parseFloat((nB/N).toFixed(4));
  const pAB  = parseFloat((nAB/N).toFixed(4));
  const pAuB = parseFloat(((nA+nB-nAB)/N).toFixed(4));
  const pAc  = parseFloat(((N-nA)/N).toFixed(4));       // P(Aᶜ)
  const pBc  = parseFloat(((N-nB)/N).toFixed(4));       // P(Bᶜ)
  const pBdA = parseFloat((nAB/nA).toFixed(4));         // P(B|A)
  const pAdB = parseFloat((nAB/nB).toFixed(4));         // P(A|B)
  const pBcdA= parseFloat(((nA-nAB)/nA).toFixed(4));   // P(Bᶜ|A)

  const enunciadoBase = ctx.armar(N, nA, nB, nAB);

  // ── Constructor de sub-pregunta multiple-choice ──────────
  function subPregunta(letra, preguntaHTML, correctVal, distractores, hintTxt, expTxt){
    const opciones = shuffle([correctVal, ...distractores])
      .map(x => parseFloat(x).toFixed(4));
    const correctStr = parseFloat(correctVal).toFixed(4);
    return { letra, preguntaHTML, opciones, correctStr, hintTxt, expTxt };
  }

  let subPreguntas = [];

  if(nivel === 1){
    // a) Complemento: P(Aᶜ) — prob de NO tener A
    subPreguntas.push(subPregunta(
      'a',
      `¿Cuál es la probabilidad de que un paciente elegido al azar <strong>NO presente ${ctx.evA}</strong>? → P(A<sup>c</sup>)`,
      pAc,
      [pA, pBc, parseFloat(((N-nB)/N).toFixed(4))],
      `Complemento: P(Aᶜ) = 1 − P(A) = 1 − ${nA}/${N} = ${N-nA}/${N}.`,
      `P(Aᶜ) = 1 − P(A) = (${N}−${nA})/${N} = ${pAc}`
    ));
    // b) Unión: P(A∪B)
    subPreguntas.push(subPregunta(
      'b',
      `¿Cuál es la probabilidad de que presente <strong>${ctx.evA} o ${ctx.evB}</strong> (o ambas)? → P(A∪B)`,
      pAuB,
      [parseFloat(((nA+nB)/N).toFixed(4)), pAB, parseFloat(((nA+nB+nAB)/N).toFixed(4))],
      `Regla de la adición: P(A∪B) = P(A) + P(B) − P(A∩B) = (${nA}+${nB}−${nAB})/${N}.`,
      `P(A∪B) = (${nA}+${nB}−${nAB})/${N} = ${nA+nB-nAB}/${N} = ${pAuB}`
    ));
    // c) Intersección: P(A∩B)
    subPreguntas.push(subPregunta(
      'c',
      `¿Cuál es la probabilidad de que presente <strong>ambas condiciones</strong>? → P(A∩B)`,
      pAB,
      [pAuB, parseFloat(((nAB+1)/N).toFixed(4)), parseFloat((pA*pB).toFixed(4))],
      `P(A∩B) = frecuencia de ambas / total = ${nAB}/${N}.`,
      `P(A∩B) = ${nAB}/${N} = ${pAB}`
    ));
  }

  else if(nivel === 2){
    // a) Unión P(A∪B)
    subPreguntas.push(subPregunta(
      'a',
      `¿Cuál es la probabilidad de que presente <strong>${ctx.evA} o ${ctx.evB}</strong>? → P(A∪B)`,
      pAuB,
      [parseFloat(((nA+nB)/N).toFixed(4)), pAB, pA],
      `P(A∪B) = P(A) + P(B) − P(A∩B) = (${nA}+${nB}−${nAB})/${N}.`,
      `P(A∪B) = (${nA}+${nB}−${nAB})/${N} = ${pAuB}`
    ));
    // b) Condicional P(B|A)
    subPreguntas.push(subPregunta(
      'b',
      `Si el paciente <strong>ya presenta ${ctx.evA}</strong>, ¿cuál es la probabilidad de que <strong>también tenga ${ctx.evB}</strong>? → P(B|A)`,
      pBdA,
      [pAdB, pAB, parseFloat((nAB/(N-nA)).toFixed(4))],
      `P(B|A) = P(A∩B) / P(A) = ${nAB}/${nA}. Solo mirás los que tienen A (=${nA}) y cuántos de esos también tienen B (=${nAB}).`,
      `P(B|A) = ${nAB}/${nA} = ${pBdA}`
    ));
    // c) Complemento condicional P(Bᶜ|A)
    subPreguntas.push(subPregunta(
      'c',
      `Si el paciente <strong>ya presenta ${ctx.evA}</strong>, ¿cuál es la probabilidad de que <strong>NO tenga ${ctx.evB}</strong>? → P(B<sup>c</sup>|A)`,
      pBcdA,
      [pBdA, parseFloat(((N-nAB)/N).toFixed(4)), parseFloat(((nA-nAB)/N).toFixed(4))],
      `P(Bᶜ|A) = 1 − P(B|A) = 1 − ${pBdA}. O bien: (${nA}−${nAB})/${nA}.`,
      `P(Bᶜ|A) = (${nA}−${nAB})/${nA} = ${nA-nAB}/${nA} = ${pBcdA}`
    ));
  }

  else { // nivel 3
    // a) Condicional P(B|A)
    subPreguntas.push(subPregunta(
      'a',
      `Dado que el paciente <strong>presenta ${ctx.evA}</strong>, ¿cuál es la probabilidad de que <strong>también tenga ${ctx.evB}</strong>? → P(B|A)`,
      pBdA,
      [pAdB, pAB, pBc],
      `P(B|A) = P(A∩B)/P(A) = ${nAB}/${nA}. Restringís el espacio muestral a quienes tienen A.`,
      `P(B|A) = ${nAB}/${nA} = ${pBdA}`
    ));
    // b) Condicional inversa P(A|B)
    subPreguntas.push(subPregunta(
      'b',
      `Dado que el paciente <strong>presenta ${ctx.evB}</strong>, ¿cuál es la probabilidad de que <strong>también tenga ${ctx.evA}</strong>? → P(A|B)`,
      pAdB,
      [pBdA, pAB, parseFloat(((nAB+1)/nB).toFixed(4))],
      `P(A|B) = P(A∩B)/P(B) = ${nAB}/${nB}. Ahora el espacio muestral son quienes tienen B (=${nB}).`,
      `P(A|B) = ${nAB}/${nB} = ${pAdB}`
    ));
    // c) Independencia: verificar y calcular
    const prodPAPB = parseFloat((pA*pB).toFixed(4));
    const sonIndep = Math.abs(pAB - prodPAPB) < 0.02;
    // Para la pregunta c) preguntamos P(A∩B) y si son independientes
    // Hacemos la pregunta sobre el valor de P(A)·P(B) vs P(A∩B)
    subPreguntas.push(subPregunta(
      'c',
      `¿Cuánto vale P(A)·P(B)? Y comparándolo con P(A∩B) = ${pAB}, ¿los eventos son independientes?`,
      prodPAPB,
      [parseFloat((pA+pB).toFixed(4)), pAB, parseFloat((pBdA*pA).toFixed(4))],
      `P(A)·P(B) = ${pA}×${pB}. Si P(A)·P(B) ≈ P(A∩B), los eventos son independientes.`,
      `P(A)·P(B) = ${pA}×${pB} = ${prodPAPB}. Como P(A∩B) = ${pAB} ${sonIndep?'≈':'≠'} ${prodPAPB}, los eventos ${sonIndep?'SÍ son':'NO son'} independientes.`
    ));
  }

  return {
    tag:'prob', tagLabel:'🎲 Probabilidades',
    tipo:'prob_multi',
    enunciadoBase,
    subPreguntas,
    nivel,
    hint: `Datos clave: N=${N}, n(A)=${nA}, n(B)=${nB}, n(A∩B)=${nAB}. ${ctx.hint_ctx}.`,
    ptos: nivel===1 ? 3 : nivel===2 ? 3 : 3
  };
}

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
      {var:'tiempo máximo fonatorio (seg)',          unidad:'seg'},
      {var:'intensidad vocal (dB)',                  unidad:'dB'},
      {var:'frecuencia fundamental de la voz (Hz)',  unidad:'Hz'},
      {var:'umbral auditivo (dB HL)',                unidad:'dB HL'},
      {var:'cantidad de palabras por minuto',        unidad:'palabras/min'},
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
      {evento:'presentaron disfonía',        total:'docentes evaluados en una clínica fonoaudiológica'},
      {evento:'mostraron mejoría tras la terapia vocal', total:'pacientes con nódulos vocales tratados'},
      {evento:'presentaron hipoacusia leve', total:'niños evaluados en un screening auditivo escolar'},
      {evento:'refirieron fatiga vocal frecuente', total:'docentes encuestados sobre salud vocal'},
      {evento:'obtuvieron resultado positivo en el test de tamizaje', total:'pacientes con sospecha de presbiacusia'},
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
      {var:'tiempo de fonación sostenida (seg)',  unidad:'seg'},
      {var:'puntuación en escala de inteligibilidad del habla', unidad:'puntos'},
      {var:'latencia auditiva (ms)',              unidad:'ms'},
      {var:'número de repeticiones silábicas',   unidad:'rep'},
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

// Banco de variables clínicas con valores posibles — estilo parcial real
const VARS_DESC = [
  { nombre:'cantidad de veces que aclara la garganta por clase', unidad:'veces', vals:[1,2,3,4,5,6,7] },
  { nombre:'número de sesiones de terapia vocal realizadas', unidad:'sesiones', vals:[2,3,4,5,6,7,8] },
  { nombre:'puntuación en escala de voz (1–7)', unidad:'puntos', vals:[1,2,3,4,5,6,7] },
  { nombre:'palabras correctas en test de fluencia verbal (10 seg)', unidad:'palabras', vals:[3,4,5,6,7,8,9] },
  { nombre:'tiempo máximo fonatorio (seg)', unidad:'seg', vals:[8,10,12,14,16,18,20] },
  { nombre:'cantidad de repeticiones silábicas por minuto', unidad:'rep/min', vals:[10,20,30,40,50,60] },
  { nombre:'umbral auditivo en dB HL', unidad:'dB HL', vals:[10,15,20,25,30,35,40] },
  { nombre:'cantidad de consultas fonoaudiológicas en el año', unidad:'consultas', vals:[1,2,3,4,5,6] },
];

function genDescriptiva(nivel){
  // Elegir variable clínica aleatoria
  const varDesc = pick(VARS_DESC);
  const vals    = varDesc.vals;

  // Tamaño de muestra y distribución según nivel
  const n = nivel===1 ? rnd(20,30) : nivel===2 ? rnd(25,40) : rnd(30,50);

  // Generar frecuencias para cada valor (todas > 0, algunas con repetición interesante)
  // Asignar pesos aleatorios y luego normalizar a n
  let pesos = vals.map(()=> rnd(1,6));
  const sumP = pesos.reduce((a,b)=>a+b,0);
  let fiArr  = pesos.map(p => Math.max(1, Math.round(p/sumP*n)));
  // Ajustar para que sumen exactamente n
  let diff = n - fiArr.reduce((a,b)=>a+b,0);
  fiArr[0] += diff; // corregir en el primer elemento

  // Construir rawData equivalente (para calcular medidas)
  const rawData = [];
  vals.forEach((v,i) => { for(let j=0;j<fiArr[i];j++) rawData.push(v); });
  const sorted  = [...rawData].sort((a,b)=>a-b);
  const nTotal  = rawData.length;

  // Frecuencias
  const freq = {};
  rawData.forEach(v=>{ freq[v]=(freq[v]||0)+1; });
  const valores = Object.keys(freq).map(Number).sort((a,b)=>a-b);

  let filas = [];
  let facum = 0, fracumAcc = 0;
  valores.forEach(v=>{
    const fi   = freq[v];
    facum     += fi;
    const fri  = parseFloat((fi/nTotal).toFixed(4));
    fracumAcc  = parseFloat((fracumAcc + fri).toFixed(4));
    filas.push({ xi:v, fi, facum, fri, fracum: fracumAcc });
  });

  // ── Decidir qué casilleros están pre-dados ──────────────
  // Estrategia: pre-damos ~40% de celdas, alternando filas y columnas
  // Siempre damos: xi (valor) — eso es el eje, nunca es input
  // Nivel 1: pre-damos fi de filas PARES (0,2,4...) → el alumno completa fi impares + toda facum y fri
  // Nivel 2: pre-damos fi de filas PARES + fri de filas IMPARES
  // Nivel 3: pre-damos facum de filas PARES + fri de filas IMPARES
  const preGiven = {}; // key: "ri-col" → true si está pre-dado

  filas.forEach((f, ri)=>{
    if(nivel===1){
      // Pre-damos fi en filas pares
      if(ri % 2 === 0) preGiven[`${ri}-fi`] = true;
    } else if(nivel===2){
      // Pre-damos fi en filas pares, fri en filas impares
      if(ri % 2 === 0) preGiven[`${ri}-fi`]  = true;
      if(ri % 2 === 1) preGiven[`${ri}-fri`] = true;
    } else {
      // Nivel 3: pre-damos facum en filas pares, fri en filas impares
      if(ri % 2 === 0) preGiven[`${ri}-facum`] = true;
      if(ri % 2 === 1) preGiven[`${ri}-fri`]   = true;
    }
  });

  // Medidas
  const media = parseFloat((rawData.reduce((a,b)=>a+b,0)/n).toFixed(4));
  const mediana = n%2===0
    ? parseFloat(((sorted[n/2-1]+sorted[n/2])/2).toFixed(4))
    : sorted[Math.floor(n/2)];
  const maxF    = Math.max(...Object.values(freq));
  const modas   = Object.keys(freq).filter(k=>freq[k]===maxF).map(Number).sort((a,b)=>a-b);
  const modaStr = modas.join(' y ');
  const rango   = sorted[sorted.length-1]-sorted[0];
  const varianza= parseFloat((rawData.reduce((s,x)=>s+Math.pow(x-media,2),0)/(n-1)).toFixed(4));
  const desvEst = parseFloat(Math.sqrt(varianza).toFixed(4));
  const cv      = parseFloat((desvEst/media*100).toFixed(2));

  const medidas = {media, mediana, modaStr, rango, varianza, desvEst, cv};

  const instruccion = nivel===1
    ? 'Completá la tabla de frecuencias (algunos valores ya están dados) y calculá la media, mediana y moda.'
    : nivel===2
    ? 'Completá la tabla completa (algunos valores ya están dados) y calculá: media, mediana, moda, rango y desvío estándar.'
    : 'Completá toda la tabla (algunos valores ya están dados) y calculá: media, mediana, moda, rango, varianza muestral, desvío estándar y coeficiente de variación.';

  // Tabla resumen para mostrar en el enunciado (estilo parcial real)
  const tablaResumen = `<table class="freq-table enunciado-tabla"><thead><tr>
    <th>${varDesc.nombre}</th>${vals.map(v=>`<th>${v}</th>`).join('')}
  </tr></thead><tbody><tr>
    <td class="given">Cantidad de pacientes (fi)</td>${fiArr.map(f=>`<td class="given">${f}</td>`).join('')}
  </tr></tbody></table>`;

  return {
    tag:'desc', tagLabel:'📊 Estadística Descriptiva',
    tipo:'tabla',
    datos: rawData, n: nTotal, filas, preGiven, medidas, nivel,
    varNombre: varDesc.nombre, varUnidad: varDesc.unidad,
    enunciado:`Se registró la <strong>${varDesc.nombre}</strong> en <strong>${nTotal} pacientes</strong>. Los resultados se resumen en la siguiente tabla:<br><br>${tablaResumen}<br>${instruccion}`,
    hint:`fi = cantidad de pacientes con ese valor. fri = fi/${nTotal}. Las acumuladas suman de arriba hacia abajo. Total fi = ${nTotal}, total fri = 1.`,
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
    const teo   = genTeoria(nivel);
    examenes.push({nivel, ejercicios:[prob,ic,desc,teo]});
    TOTAL_PTOS += prob.ptos + ic.ptos + desc.ptos + teo.ptos;
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
    <div class="resumen-errores" id="resumen-${idx}"></div>
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

  if(ej.tipo==='teoria_bloque'){
    inputHTML = buildTeoria(ej, examIdx, ejIdx);
  } else if(ej.tipo==='prob_multi'){
    inputHTML = buildProbMulti(ej, examIdx, ejIdx);
  } else if(ej.tipo==='mc'){
    inputHTML = buildMC(ej, examIdx, ejIdx);
  } else if(ej.tipo==='ic'){
    inputHTML = buildIC(ej, examIdx, ejIdx);
  } else if(ej.tipo==='tabla'){
    inputHTML = buildTabla(ej, examIdx, ejIdx);
  }

  const tagClass = ej.tag==='prob' ? 'tag-prob' : ej.tag==='ic' ? 'tag-ic' : ej.tag==='teoria' ? 'tag-teoria' : 'tag-desc';
  const enunciadoHTML = ej.tipo==='prob_multi'
    ? `<div class="ejercicio-enunciado">${ej.enunciadoBase}</div>`
    : `<div class="ejercicio-enunciado">${ej.enunciado || ''}</div>`;

  el.innerHTML = `
    <div class="ejercicio-tag ${tagClass}">${ej.tagLabel}</div>
    ${enunciadoHTML}
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
// ── Prob Multi (enunciado + 3 sub-preguntas) ─────
function buildProbMulti(ej, ei, ji){
  const partes = ej.subPreguntas.map((sp, si) => {
    const opciones = sp.opciones.map((op, oi) => `
      <li>
        <label class="opcion-label" id="lbl-${ei}-${ji}-${si}-${oi}" onclick="selectSubOpcion(${ei},${ji},${si},${oi})">
          <input type="radio" name="mc-${ei}-${ji}-${si}" value="${op}" />
          <span class="opcion-bullet"></span>
          <span>${op}</span>
        </label>
      </li>
    `).join('');
    return `
      <div class="subpregunta" id="sp-${ei}-${ji}-${si}">
        <div class="subpregunta-letra">${sp.letra})</div>
        <div class="subpregunta-body">
          <div class="subpregunta-enunciado">${sp.preguntaHTML}</div>
          <ul class="opciones-list">${opciones}</ul>
          <div class="feedback-inline" id="fb-sp-${ei}-${ji}-${si}"></div>
        </div>
      </div>
    `;
  }).join('');
  return `<div class="subpreguntas-wrap">${partes}</div>`;
}

function selectSubOpcion(ei,ji,si,oi){
  const sp = examenes[ei].ejercicios[ji].subPreguntas[si];
  for(let i=0;i<sp.opciones.length;i++){
    const lbl=document.getElementById(`lbl-${ei}-${ji}-${si}-${i}`);
    if(lbl) lbl.classList.remove('selected');
  }
  const sel=document.getElementById(`lbl-${ei}-${ji}-${si}-${oi}`);
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
  const { filas, n, nivel, preGiven } = ej;

  // Helper: ¿esta celda está pre-dada?
  const isGiven = (ri, col) => !!(preGiven && preGiven[`${ri}-${col}`]);

  // Renderiza una celda: si es pre-dada muestra el valor en un span estilizado;
  // si no, muestra un input editable.
  const cell = (ri, col, val, placeholder) => {
    if(isGiven(ri, col)){
      return `<td><span class="cell-given">${val}</span></td>`;
    }
    return `<td><input type="text" id="t${ei}${ji}-${ri}-${col}" placeholder="${placeholder}" /></td>`;
  };

  let headers = '<th>xi</th><th>fi</th><th>Fi (acum.)</th><th>fri</th>';
  if(nivel>=2) headers += '<th>Fri (acum.)</th>';

  let rows = filas.map((f,ri)=>{
    let cells = `<td class="given">${f.xi}</td>`;
    cells += cell(ri,'fi',    f.fi,        'fi');
    cells += cell(ri,'facum', f.facum,     'Fi');
    cells += cell(ri,'fri',   f.fri,       'fri');
    if(nivel>=2) cells += cell(ri,'fracum',f.fracum, 'Fri');
    return `<tr>${cells}</tr>`;
  }).join('');

  // Fila de totales — siempre para completar (no pre-dada)
  let totCells = `<td class="given total-row" style="text-align:left;font-weight:700;">TOTAL</td>`;
  totCells += `<td class="total-row"><input type="text" id="t${ei}${ji}-tot-fi"  placeholder="Σfi" /></td>`;
  totCells += `<td class="total-row">–</td>`;
  totCells += `<td class="total-row"><input type="text" id="t${ei}${ji}-tot-fri" placeholder="Σfri" /></td>`;
  if(nivel>=2) totCells += `<td class="total-row">–</td>`;

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
        <input class="stat-input" type="text" id="m${ei}${ji}-moda" placeholder="ej: 4 (si hay dos: 4 y 6)" />
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
        <input class="stat-input" type="text" id="m${ei}${ji}-cv" placeholder="ej: 18.5" />
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

  const etiquetasEjercicio = ['🎲 Probabilidades','📐 Intervalo de Confianza','📊 Estadística Descriptiva','📖 Teoría'];
  const allErrors = [];

  ex.ejercicios.forEach((ej,ejIdx)=>{
    const {ok, fb, ptosGanados, errLabels} = corregirEjercicio(ej, idx, ejIdx);
    ptosObtenidos += (ptosGanados !== undefined ? ptosGanados : (ok ? ej.ptos : 0));
    feedbacks.push({ok, fb, ptos:ej.ptos});
    if(errLabels && errLabels.length){
      allErrors.push({tema: etiquetasEjercicio[ejIdx]||ej.tagLabel, errores: errLabels});
    }
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

  // ── Panel de resumen de errores ──────────────────
  const resumenEl = document.getElementById(`resumen-${idx}`);
  if(resumenEl){
    if(allErrors.length === 0){
      resumenEl.innerHTML = `<div class="resumen-perfect">🎉 ¡Cero errores en este examen! ¡Sos una genia, Maga! 💙</div>`;
      resumenEl.classList.add('show');
    } else {
      const rows = allErrors.map(g=>`
        <div class="resumen-grupo">
          <div class="resumen-tema">${g.tema}</div>
          <ul class="resumen-lista">${g.errores.slice(0,4).map(e=>`<li>${e}</li>`).join('')}${g.errores.length>4?`<li>… y ${g.errores.length-4} más</li>`:''}</ul>
        </div>`).join('');
      resumenEl.innerHTML = `
        <div class="resumen-header" onclick="toggleResumen(${idx})">
          <span>📋 Resumen de errores (${allErrors.reduce((s,g)=>s+g.errores.length,0)})</span>
          <span class="resumen-chevron" id="chev-${idx}">▼</span>
        </div>
        <div class="resumen-body" id="resumen-body-${idx}">${rows}</div>`;
      resumenEl.classList.add('show','has-errors');
    }
  }

  // Mensaje motivacional
  const msgs_perfect = ['🎉 ¡Perfecto, Maguy! ¡Todos correctos! 💙','🌟 ¡Sin errores! ¡Sos una genia, Maguy! 🌸'];
  const msgs_good    = ['💪 ¡Muy bien, Maguy! Estás en camino. Un repasito más y lo clavás.','😊 ¡Buen trabajo! Revisá los errores y ya lo tenés, Maguy.'];
  const msgs_try     = ['🌱 Tranquila, Maguy. Leé las correcciones y volvé a intentarlo.','💙 No te rindas, Maguy. Revisá las pistas y vas a entenderlo.'];

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

  // ── Teoría: VF + completar + MC ──────────────────
  if(ej.tipo==='teoria_bloque'){
    const result = corregirTeoria(ej, ei, ji);
    const fbEl2 = document.getElementById(`fb-${ei}-${ji}`);
    if(fbEl2) fbEl2.style.display='none';
    return {ok: result.aciertos === result.total, ptosGanados: result.aciertos, errLabels: result.errores||[], fb:''};
  }

  // ── Prob multi: 3 sub-preguntas independientes ──
  if(ej.tipo==='prob_multi'){
    let aciertos = 0;
    ej.subPreguntas.forEach((sp, si) => {
      // Buscar opción seleccionada para esta sub-pregunta
      let selIdx = -1;
      for(let i=0;i<sp.opciones.length;i++){
        const lbl=document.getElementById(`lbl-${ei}-${ji}-${si}-${i}`);
        if(lbl && lbl.classList.contains('selected')){ selIdx=i; break; }
      }
      const selVal = selIdx>=0 ? sp.opciones[selIdx] : null;
      const ok = selVal !== null && parseFloat(selVal) === parseFloat(sp.correctStr);

      // Colorear opciones de esta sub-pregunta
      for(let i=0;i<sp.opciones.length;i++){
        const lbl=document.getElementById(`lbl-${ei}-${ji}-${si}-${i}`);
        if(!lbl) continue;
        lbl.style.pointerEvents='none';
        if(parseFloat(sp.opciones[i])===parseFloat(sp.correctStr)){
          lbl.classList.add(selIdx===i?'correct-choice':'show-correct');
        } else if(i===selIdx && !ok){
          lbl.classList.add('wrong-choice');
        }
      }

      // Feedback por sub-pregunta
      const spFb = document.getElementById(`fb-sp-${ei}-${ji}-${si}`);
      if(spFb){
        spFb.className = ok ? 'feedback-inline ok' : 'feedback-inline err';
        spFb.innerHTML = ok
          ? `✅ ${sp.expTxt}`
          : `❌ Respuesta correcta: <strong>${sp.correctStr}</strong> · ${sp.expTxt}`;
      }

      if(ok) aciertos++;
    });

    fbEl.style.display='none';
    const errsProb = ej.subPreguntas
      .map((sp,si)=>{ const lbl=document.getElementById(`lbl-${ei}-${ji}-${si}-0`); const allOk=document.getElementById(`fb-sp-${ei}-${ji}-${si}`)?.classList.contains('ok'); return allOk?null:`${sp.letra}) ${sp.expTxt}`; })
      .filter(Boolean);
    return {ok: aciertos === ej.subPreguntas.length, errLabels: errsProb, fb:''};
  }

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
    const mcErr = ok ? [] : [`Respuesta incorrecta — correcta: ${ej.correct}`];
    return {ok, errLabels: mcErr, fb:''};
  }

  if(ej.tipo==='ic'){
    const liInp = document.getElementById(`ic-li-${ei}-${ji}`);
    const lsInp = document.getElementById(`ic-ls-${ei}-${ji}`);
    const liOk  = approxEq(liInp.value, ej.li, 0.1);
    const lsOk  = approxEq(lsInp.value, ej.ls, 0.1);
    liInp.className = 'stat-input ' + (liOk?'input-ok':'input-err');
    lsInp.className = 'stat-input ' + (lsOk?'input-ok':'input-err');
    liInp.disabled = lsInp.disabled = true;
    const ok = liOk && lsOk;
    // ── Paso a paso del IC ──────────────────────────
    const zLabel  = ej.nc ? `Z (NC=${ej.nc}%)` : 'valor crítico';
    const zVal    = ej.z;
    const nVal    = ej.n;
    // Reconstruir error desde li/ls
    const errCalc = parseFloat(((ej.ls - ej.li)/2).toFixed(4));
    const est     = parseFloat(((ej.li + ej.ls)/2).toFixed(4));
    const pasos = `
      <div class="ic-steps">
        <div class="ic-step"><span class="ic-step-num">1</span><span>Identificar: estimador = <strong>${est}</strong>, ${zLabel} = <strong>${zVal}</strong>, n = <strong>${nVal}</strong></span></div>
        <div class="ic-step"><span class="ic-step-num">2</span><span>Calcular margen de error = ${zVal} × (σ o s) / √${nVal} = <strong>${errCalc}</strong></span></div>
        <div class="ic-step"><span class="ic-step-num">3</span><span>L.I. = ${est} − ${errCalc} = <strong>${ej.li}</strong></span></div>
        <div class="ic-step"><span class="ic-step-num">4</span><span>L.S. = ${est} + ${errCalc} = <strong>${ej.ls}</strong></span></div>
        <div class="ic-step ic-step-result"><span>IC = [ <strong>${ej.li}</strong> ; <strong>${ej.ls}</strong> ]</span></div>
      </div>`;
    fbEl.className = ok ? 'feedback-inline ok' : 'feedback-inline err';
    fbEl.innerHTML = ok
      ? `✅ ¡Perfecto! ${pasos}`
      : `❌ Revisá el cálculo: ${pasos}`;
    const icErr = ok ? [] : [`IC incorrecto — correcto: [${ej.li}; ${ej.ls}]`];
    return {ok, errLabels: icErr, fb:''};
  }

  if(ej.tipo==='tabla'){
    const {filas, n, medidas, nivel, preGiven} = ej;
    let errores = [];
    let aciertos= 0;
    let total   = 0;

    const isGiven = (ri,col) => !!(preGiven && preGiven[`${ri}-${col}`]);

    // Verificar tabla — saltear celdas pre-dadas
    filas.forEach((f,ri)=>{
      const chk=(id,val,tol,label)=>{
        const inp=document.getElementById(id);
        if(!inp) return; // celda pre-dada → no hay input → skip
        total++;
        const ok=approxEq(inp.value,val,tol);
        inp.className = ok ? 'input-ok':'input-err';
        inp.disabled=true;
        if(ok) aciertos++;
        else errores.push(`${label}: esperaba ${val}`);
        inp.title = ok ? '✅ Correcto' : `❌ Correcto: ${val}`;
      };
      if(!isGiven(ri,'fi'))     chk(`t${ei}${ji}-${ri}-fi`,    f.fi,    0.01, `fi(xi=${f.xi})`);
      if(!isGiven(ri,'facum'))  chk(`t${ei}${ji}-${ri}-facum`, f.facum, 0.01, `Fi(xi=${f.xi})`);
      if(!isGiven(ri,'fri'))    chk(`t${ei}${ji}-${ri}-fri`,   f.fri,   0.02, `fri(xi=${f.xi})`);
      if(nivel>=2 && !isGiven(ri,'fracum'))
                                chk(`t${ei}${ji}-${ri}-fracum`,f.fracum,0.03, `Fri(xi=${f.xi})`);
    });

    // Totales
    const tfi = document.getElementById(`t${ei}${ji}-tot-fi`);
    const tfri= document.getElementById(`t${ei}${ji}-tot-fri`);
    if(tfi){total++;const ok=approxEq(tfi.value,n,0.01);tfi.className=ok?'input-ok':'input-err';tfi.disabled=true;if(ok)aciertos++;else errores.push(`Σfi: esperaba ${n}`);}
    if(tfri){total++;const ok=approxEq(tfri.value,1,0.03);tfri.className=ok?'input-ok':'input-err';tfri.disabled=true;if(ok)aciertos++;else errores.push(`Σfri: esperaba 1`);}

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

    return {ok: aciertos/total >= 0.75, errLabels: errores, fb:''};
  }

  return {ok:false, fb:''};
}

function toggleResumen(idx){
  const body  = document.getElementById(`resumen-body-${idx}`);
  const chev  = document.getElementById(`chev-${idx}`);
  if(!body) return;
  const open = body.style.display !== 'none';
  body.style.display = open ? 'none' : '';
  if(chev) chev.textContent = open ? '▶' : '▼';
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
      <h2>¡Terminaste, Maguy!</h2>
      <p>Completaste los 3 mini-exámenes. Acá está tu resultado final:</p>
      <div class="celebration-score">${OBTENIDOS} / ${TOTAL_PTOS} pts</div>
      <div class="celebration-stars">${stars}</div>
      <p>${pct>=80?'¡Sos una genia, Maguy! 💙 Con eso aprobás sin problema.':pct>=60?'¡Muy bien! Un poco más de práctica y lo clavás. 🌸':'💙 No te rindas, Maguy. Hacé click en Nuevos ejercicios y volvé a intentarlo.'}</p>
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
  resetBancoTeoria();
  resetCtxProb();
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

function startApp(){
  const intro  = document.getElementById('intro-screen');
  const header = document.getElementById('main-header');
  const main   = document.getElementById('main-content');
  const footer = document.getElementById('main-footer');
  if(!intro) return;
  intro.classList.add('intro-saliendo');
  setTimeout(()=>{
    intro.style.display = 'none';
    if(header){ header.style.display=''; header.style.removeProperty('display'); header.style.display='block'; }
    if(main)  { main.style.display='';   main.style.removeProperty('display');   main.style.display='block'; }
    if(footer){ footer.style.display=''; footer.style.removeProperty('display'); footer.style.display='block'; }
    renderAll();
    window.scrollTo({top:0, behavior:'smooth'});
  }, 420);
}

document.addEventListener('DOMContentLoaded',()=>{
  spawnHearts();
  // Botón start — bind aquí para garantizar que el DOM existe
  const btnStart = document.getElementById('btn-start');
  if(btnStart) btnStart.addEventListener('click', startApp);
});
