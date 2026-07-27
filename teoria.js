/* ==============================================
   MÓDULO DE TEORÍA — teoria.js
   Banco de preguntas: V/F, completar (drag & drop), MC
=============================================== */

// =========================================================
// BANCO DE PREGUNTAS
// Cada pregunta tiene: tipo, texto, respuesta, ptos, nivel
// Tipos: 'vf' | 'completar' | 'mc_teoria'
// =========================================================

const BANCO_TEORIA = [

  // ── VERDADERO / FALSO ────────────────────────────────

  {
    id:'vf01', tipo:'vf', nivel:[1,2,3],
    enunciado:'La probabilidad de un evento siempre está entre 0 y 1.',
    respuesta: true,
    justificacion:'Correcto. Por definición, 0 ≤ P(A) ≤ 1 para cualquier evento A.'
  },
  {
    id:'vf02', tipo:'vf', nivel:[1,2,3],
    enunciado:'En la estimación puntual se obtiene un rango de valores dentro del cual se encuentra el parámetro desconocido.',
    respuesta: false,
    justificacion:'FALSO. La estimación puntual da un único valor. Es la estimación por intervalo la que brinda un rango de valores.'
  },
  {
    id:'vf03', tipo:'vf', nivel:[1,2,3],
    enunciado:'La media, la mediana y la moda siempre tienen el mismo valor en cualquier distribución.',
    respuesta: false,
    justificacion:'FALSO. Solo coinciden en distribuciones perfectamente simétricas (como la distribución normal). En distribuciones asimétricas difieren.'
  },
  {
    id:'vf04', tipo:'vf', nivel:[1,2,3],
    enunciado:'La frecuencia relativa acumulada de la última fila de una tabla siempre es igual a 1.',
    respuesta: true,
    justificacion:'Correcto. La suma de todas las frecuencias relativas es 1, por lo que la acumulada en la última fila siempre llega a 1.'
  },
  {
    id:'vf05', tipo:'vf', nivel:[2,3],
    enunciado:'Cuanto mayor es el nivel de confianza de un intervalo, más angosto (preciso) resulta ese intervalo.',
    respuesta: false,
    justificacion:'FALSO. A mayor nivel de confianza, mayor es el valor Z y por lo tanto más ancho (menos preciso) es el intervalo.'
  },
  {
    id:'vf06', tipo:'vf', nivel:[1,2,3],
    enunciado:'La moda es el valor que más se repite en un conjunto de datos.',
    respuesta: true,
    justificacion:'Correcto. La moda es por definición el valor con mayor frecuencia absoluta.'
  },
  {
    id:'vf07', tipo:'vf', nivel:[2,3],
    enunciado:'Si P(A∩B) = P(A) · P(B), los eventos A y B son independientes.',
    respuesta: true,
    justificacion:'Correcto. Esa es exactamente la condición de independencia entre dos eventos.'
  },
  {
    id:'vf08', tipo:'vf', nivel:[2,3],
    enunciado:'La tabla de distribución normal estándar muestra el área bajo la curva entre 0 y un Z determinado, cuando los parámetros son media igual a 0 y desvío igual a 1.',
    respuesta: true,
    justificacion:'Correcto. La distribución normal estándar tiene μ = 0 y σ = 1, y la tabla acumula el área desde la media hasta Z.'
  },
  {
    id:'vf09', tipo:'vf', nivel:[1,2,3],
    enunciado:'El rango es la diferencia entre el valor máximo y el valor mínimo de un conjunto de datos.',
    respuesta: true,
    justificacion:'Correcto. Rango = Xmáx − Xmín. Es la medida de dispersión más simple.'
  },
  {
    id:'vf10', tipo:'vf', nivel:[2,3],
    enunciado:'Cuanto más chica es la sensibilidad de un test, menor es la probabilidad de obtener un falso negativo.',
    respuesta: false,
    justificacion:'FALSO. Una sensibilidad baja significa que el test falla en detectar casos positivos reales, lo que aumenta los falsos negativos.'
  },
  {
    id:'vf11', tipo:'vf', nivel:[1,2,3],
    enunciado:'La desviación estándar siempre es mayor que la varianza.',
    respuesta: false,
    justificacion:'FALSO. La relación depende del valor de la varianza. Si la varianza < 1, la desviación estándar es mayor; si varianza > 1, es menor.'
  },
  {
    id:'vf12', tipo:'vf', nivel:[2,3],
    enunciado:'El nivel de confianza del 95% implica que α = 0.05.',
    respuesta: true,
    justificacion:'Correcto. α es el complemento del nivel de confianza: α = 1 − 0.95 = 0.05.'
  },
  {
    id:'vf13', tipo:'vf', nivel:[1,2,3],
    enunciado:'Una variable cualitativa ordinal permite calcular la media aritmética.',
    respuesta: false,
    justificacion:'FALSO. La media aritmética solo se aplica a variables cuantitativas. Las variables ordinales admiten mediana y moda, pero no media.'
  },
  {
    id:'vf14', tipo:'vf', nivel:[2,3],
    enunciado:'En una distribución con asimetría positiva, la cola se extiende hacia la derecha y la media es mayor que la mediana.',
    respuesta: true,
    justificacion:'Correcto. En asimetría positiva (sesgada a la derecha): Moda < Mediana < Media.'
  },
  {
    id:'vf15', tipo:'vf', nivel:[1,2,3],
    enunciado:'La probabilidad de que ocurra un evento imposible es 1.',
    respuesta: false,
    justificacion:'FALSO. La probabilidad de un evento imposible es 0. La probabilidad 1 corresponde al evento seguro.'
  },
  {
    id:'vf16', tipo:'vf', nivel:[2,3],
    enunciado:'El Teorema Central del Límite garantiza que, para muestras grandes (n ≥ 30), la distribución de las medias muestrales se aproxima a una distribución normal, aunque la población no sea normal.',
    respuesta: true,
    justificacion:'Correcto. Es exactamente lo que establece el Teorema Central del Límite.'
  },
  {
    id:'vf17', tipo:'vf', nivel:[1,2,3],
    enunciado:'La frecuencia absoluta de un valor puede ser un número decimal.',
    respuesta: false,
    justificacion:'FALSO. La frecuencia absoluta es un conteo de casos, por lo tanto siempre es un número entero.'
  },
  {
    id:'vf18', tipo:'vf', nivel:[2,3],
    enunciado:'El coeficiente de variación es útil para comparar la dispersión de dos conjuntos de datos con distintas unidades de medida.',
    respuesta: true,
    justificacion:'Correcto. El CV es adimensional (expresado en %) y permite comparar variabilidad relativa entre distribuciones con escalas diferentes.'
  },
  {
    id:'vf19', tipo:'vf', nivel:[1,2,3],
    enunciado:'P(A) + P(Aᶜ) = 1 para cualquier evento A.',
    respuesta: true,
    justificacion:'Correcto. A y su complemento Aᶜ son mutuamente excluyentes y exhaustivos, por lo tanto sus probabilidades suman 1.'
  },
  {
    id:'vf20', tipo:'vf', nivel:[2,3],
    enunciado:'En una distribución binomial, cada ensayo puede tener más de dos resultados posibles.',
    respuesta: false,
    justificacion:'FALSO. En una distribución binomial, cada ensayo tiene exactamente dos resultados posibles: éxito o fracaso (mutuamente excluyentes).'
  },

  // ── COMPLETAR CON DRAG & DROP ─────────────────────────

  {
    id:'comp01', tipo:'completar', nivel:[1,2,3],
    partes:[
      'La ',
      {blank:'b1', resp:'media'},
      ' aritmética se calcula sumando todos los valores y dividiendo por la cantidad de datos. La ',
      {blank:'b2', resp:'mediana'},
      ' es el valor central de los datos ordenados. La ',
      {blank:'b3', resp:'moda'},
      ' es el valor que más se repite.'
    ],
    palabras:['media','mediana','moda','rango','varianza'],
    justificacion:'Media = suma/n; Mediana = valor central; Moda = valor más frecuente.'
  },
  {
    id:'comp02', tipo:'completar', nivel:[1,2,3],
    partes:[
      'La frecuencia ',
      {blank:'b1', resp:'relativa'},
      ' se obtiene dividiendo la frecuencia absoluta por el total de datos. La frecuencia ',
      {blank:'b2', resp:'acumulada'},
      ' suma los valores de todas las filas anteriores más la fila actual.'
    ],
    palabras:['relativa','acumulada','absoluta','porcentual','muestral'],
    justificacion:'fri = fi/n; la frecuencia acumulada suma progresivamente desde la primera fila.'
  },
  {
    id:'comp03', tipo:'completar', nivel:[2,3],
    partes:[
      'Un intervalo de confianza se construye como: estimador puntual ',
      {blank:'b1', resp:'±'},
      ' margen de error. El margen de error depende del valor ',
      {blank:'b2', resp:'Z'},
      ' (o t), la desviación estándar y el tamaño ',
      {blank:'b3', resp:'muestral'},
      '.'
    ],
    palabras:['±','Z','muestral','poblacional','α','σ'],
    justificacion:'IC = estimador ± Z · (σ/√n). El margen depende de Z, σ y n.'
  },
  {
    id:'comp04', tipo:'completar', nivel:[1,2,3],
    partes:[
      'La probabilidad de la ',
      {blank:'b1', resp:'unión'},
      ' de dos eventos es P(A∪B) = P(A) + P(B) − P(A',
      {blank:'b2', resp:'∩'},
      'B). Cuando los eventos son mutuamente ',
      {blank:'b3', resp:'excluyentes'},
      ', P(A∩B) = 0.'
    ],
    palabras:['unión','∩','excluyentes','independientes','complemento','intersección'],
    justificacion:'Regla de la adición. Si A y B son mutuamente excluyentes no pueden ocurrir juntos.'
  },
  {
    id:'comp05', tipo:'completar', nivel:[2,3],
    partes:[
      'La probabilidad ',
      {blank:'b1', resp:'condicional'},
      ' P(B|A) se lee "probabilidad de B ',
      {blank:'b2', resp:'dado'},
      ' A" y se calcula como P(A∩B) dividido ',
      {blank:'b3', resp:'P(A)'},
      '.'
    ],
    palabras:['condicional','dado','P(A)','P(B)','independiente','marginal'],
    justificacion:'P(B|A) = P(A∩B) / P(A). Restringe el espacio muestral a los casos en que A ya ocurrió.'
  },
  {
    id:'comp06', tipo:'completar', nivel:[1,2,3],
    partes:[
      'El ',
      {blank:'b1', resp:'desvío estándar'},
      ' es la raíz cuadrada de la ',
      {blank:'b2', resp:'varianza'},
      '. Ambas son medidas de ',
      {blank:'b3', resp:'dispersión'},
      ' que indican cuánto se alejan los datos de la media.'
    ],
    palabras:['desvío estándar','varianza','dispersión','tendencia central','coeficiente','curtosis'],
    justificacion:'s = √s². Tanto s como s² miden qué tan dispersos están los datos alrededor de la media.'
  },
  {
    id:'comp07', tipo:'completar', nivel:[2,3],
    partes:[
      'Para un nivel de confianza del 95%, el valor crítico Z es ',
      {blank:'b1', resp:'1,96'},
      '. Para el 99% es ',
      {blank:'b2', resp:'2,58'},
      '. A mayor nivel de confianza, el intervalo es más ',
      {blank:'b3', resp:'amplio'},
      '.'
    ],
    palabras:['1,96','2,58','amplio','estrecho','1,65','preciso'],
    justificacion:'Z₉₅ = 1,96; Z₉₉ = 2,58. Mayor confianza → mayor Z → intervalo más amplio.'
  },
  {
    id:'comp08', tipo:'completar', nivel:[1,2,3],
    partes:[
      'Una variable ',
      {blank:'b1', resp:'cuantitativa'},
      ' discreta toma valores enteros contables, como el número de repeticiones silábicas. Una variable ',
      {blank:'b2', resp:'cualitativa'},
      ' ordinal tiene categorías con un ',
      {blank:'b3', resp:'orden'},
      ' natural entre ellas.'
    ],
    palabras:['cuantitativa','cualitativa','orden','continua','nominal','intervalo'],
    justificacion:'Cuantitativa discreta: conteos enteros. Cualitativa ordinal: categorías con jerarquía (ej: insuficiente, bueno, muy bueno).'
  },
  {
    id:'comp09', tipo:'completar', nivel:[2,3],
    partes:[
      'En una distribución con asimetría ',
      {blank:'b1', resp:'negativa'},
      ', la cola se extiende hacia la ',
      {blank:'b2', resp:'izquierda'},
      ' y la media es ',
      {blank:'b3', resp:'menor'},
      ' que la mediana.'
    ],
    palabras:['negativa','izquierda','menor','positiva','derecha','mayor'],
    justificacion:'Asimetría negativa (sesgada a la izquierda): Media < Mediana < Moda.'
  },
  {
    id:'comp10', tipo:'completar', nivel:[1,2,3],
    partes:[
      'El complemento de un evento A se nota ',
      {blank:'b1', resp:'Aᶜ'},
      ' y su probabilidad es P(Aᶜ) = ',
      {blank:'b2', resp:'1 − P(A)'},
      '. Si P(A) = 0,3, entonces P(Aᶜ) = ',
      {blank:'b3', resp:'0,7'},
      '.'
    ],
    palabras:['Aᶜ','1 − P(A)','0,7','A⁻¹','P(A) − 1','0,3'],
    justificacion:'El complemento incluye todos los casos donde A no ocurre. P(Aᶜ) = 1 − P(A) = 1 − 0,3 = 0,7.'
  },
  {
    id:'comp11', tipo:'completar', nivel:[2,3],
    partes:[
      'La ',
      {blank:'b1', resp:'sensibilidad'},
      ' de un test es la proporción de verdaderos ',
      {blank:'b2', resp:'positivos'},
      ' entre todos los enfermos. La ',
      {blank:'b3', resp:'especificidad'},
      ' es la proporción de verdaderos negativos entre todos los sanos.'
    ],
    palabras:['sensibilidad','positivos','especificidad','negativos','prevalencia','incidencia'],
    justificacion:'Sensibilidad = VP/(VP+FN). Especificidad = VN/(VN+FP).'
  },
  {
    id:'comp12', tipo:'completar', nivel:[1,2,3],
    partes:[
      'El percentil 50 equivale a la ',
      {blank:'b1', resp:'mediana'},
      '. El cuartil 2 (Q2) también equivale a la ',
      {blank:'b2', resp:'mediana'},
      '. El percentil 25 equivale al cuartil ',
      {blank:'b3', resp:'1'},
      '.'
    ],
    palabras:['mediana','1','media','moda','3','2'],
    justificacion:'P50 = Q2 = Mediana. P25 = Q1. P75 = Q3.'
  },

  // ── MULTIPLE CHOICE TEORÍA ────────────────────────────

  {
    id:'mc01', tipo:'mc_teoria', nivel:[1,2,3],
    enunciado:'¿Cuál de las siguientes es una medida de tendencia central?',
    opciones:['Rango','Desvío estándar','Mediana','Varianza'],
    respuesta:'Mediana',
    justificacion:'Media, mediana y moda son medidas de tendencia central. Rango, desvío y varianza son medidas de dispersión.'
  },
  {
    id:'mc02', tipo:'mc_teoria', nivel:[1,2,3],
    enunciado:'Una fonoaudióloga mide la cantidad de palabras por minuto de sus pacientes. ¿Qué tipo de variable es?',
    opciones:['Cualitativa nominal','Cualitativa ordinal','Cuantitativa discreta','Cuantitativa continua'],
    respuesta:'Cuantitativa continua',
    justificacion:'Palabras por minuto puede tomar cualquier valor en un rango continuo, es una variable cuantitativa continua.'
  },
  {
    id:'mc03', tipo:'mc_teoria', nivel:[1,2,3],
    enunciado:'El nivel de desempeño en una tarea de lectura (insuficiente, regular, bueno, muy bueno, excelente) es una variable:',
    opciones:['Cuantitativa continua','Cuantitativa discreta','Cualitativa ordinal','Cualitativa nominal'],
    respuesta:'Cualitativa ordinal',
    justificacion:'Tiene categorías con un orden natural entre ellas (jerarquía), por eso es cualitativa ordinal.'
  },
  {
    id:'mc04', tipo:'mc_teoria', nivel:[2,3],
    enunciado:'¿Qué medida de dispersión es la más adecuada para comparar la variabilidad de dos conjuntos de datos con distintas unidades (ej: tiempo en segundos y frecuencia en Hz)?',
    opciones:['Rango','Varianza','Desvío estándar','Coeficiente de variación'],
    respuesta:'Coeficiente de variación',
    justificacion:'El CV es adimensional (%). Permite comparar dispersiones relativas entre variables con diferentes escalas o unidades.'
  },
  {
    id:'mc05', tipo:'mc_teoria', nivel:[1,2,3],
    enunciado:'Si los datos de un estudio son: 3, 3, 5, 7, 9, 9, 9 — ¿cuál es la moda?',
    opciones:['3','5','7','9'],
    respuesta:'9',
    justificacion:'El 9 aparece 3 veces, mientras que el 3 aparece 2 veces. La moda es el valor de mayor frecuencia: 9.'
  },
  {
    id:'mc06', tipo:'mc_teoria', nivel:[2,3],
    enunciado:'En un test diagnóstico, un resultado "falso negativo" significa que:',
    opciones:[
      'El paciente está sano y el test dio negativo',
      'El paciente está enfermo y el test dio positivo',
      'El paciente está enfermo pero el test dio negativo',
      'El paciente está sano pero el test dio positivo'
    ],
    respuesta:'El paciente está enfermo pero el test dio negativo',
    justificacion:'Falso negativo: el test no detectó la enfermedad que sí existe. Es el error que la sensibilidad busca minimizar.'
  },
  {
    id:'mc07', tipo:'mc_teoria', nivel:[1,2,3],
    enunciado:'¿Cuál es la suma de todas las frecuencias relativas de una tabla de distribución de frecuencias?',
    opciones:['0','n (tamaño muestral)','100','1'],
    respuesta:'1',
    justificacion:'La suma de todas las frecuencias relativas siempre es 1 (equivalente al 100%).'
  },
  {
    id:'mc08', tipo:'mc_teoria', nivel:[2,3],
    enunciado:'¿Qué ocurre con el intervalo de confianza si se duplica el tamaño de la muestra (manteniendo el mismo nivel de confianza)?',
    opciones:[
      'El intervalo se duplica',
      'El intervalo se reduce a la mitad',
      'El intervalo se reduce por un factor de √2',
      'El intervalo no cambia'
    ],
    respuesta:'El intervalo se reduce por un factor de √2',
    justificacion:'El error = Z·σ/√n. Si n se duplica, √n crece por √2, y el error se divide por √2 ≈ 1,41.'
  },
  {
    id:'mc09', tipo:'mc_teoria', nivel:[1,2,3],
    enunciado:'El modo de comunicación utilizado por un paciente (oral, lengua de señas, bimodal) es una variable:',
    opciones:['Cuantitativa continua','Cuantitativa discreta','Cualitativa ordinal','Cualitativa nominal'],
    respuesta:'Cualitativa nominal',
    justificacion:'Son categorías sin orden jerárquico entre ellas, por eso es cualitativa nominal.'
  },
  {
    id:'mc10', tipo:'mc_teoria', nivel:[2,3],
    enunciado:'¿Cuál de las siguientes afirmaciones sobre la distribución normal estándar es CORRECTA?',
    opciones:[
      'Tiene media = 1 y desvío = 0',
      'Tiene media = 0 y desvío = 1',
      'Tiene media = 0,5 y desvío = 0,5',
      'Su área total bajo la curva es 0,5'
    ],
    respuesta:'Tiene media = 0 y desvío = 1',
    justificacion:'La distribución normal estándar (Z) se define con μ = 0 y σ = 1. Su área total bajo la curva es 1.'
  },
  {
    id:'mc11', tipo:'mc_teoria', nivel:[1,2,3],
    enunciado:'¿Qué gráfico es más adecuado para representar la intensidad de voz en decibeles (variable cuantitativa continua con muchos valores diferentes)?',
    opciones:['Gráfico de torta','Diagrama de barras','Histograma','Diagrama de puntos'],
    respuesta:'Histograma',
    justificacion:'El histograma es el gráfico adecuado para variables cuantitativas continuas agrupadas en intervalos.'
  },
  {
    id:'mc12', tipo:'mc_teoria', nivel:[2,3],
    enunciado:'Un muestreo no probabilístico se caracteriza por:',
    opciones:[
      'Que todos los elementos tienen la misma probabilidad de ser elegidos',
      'Que la selección se basa en el juicio, conveniencia o disponibilidad del investigador',
      'Que garantiza representatividad estadística de la población',
      'Que permite hacer inferencias con margen de error calculable'
    ],
    respuesta:'Que la selección se basa en el juicio, conveniencia o disponibilidad del investigador',
    justificacion:'En el muestreo no probabilístico no se usa el azar; la selección depende del criterio del investigador.'
  },
  {
    id:'mc13', tipo:'mc_teoria', nivel:[1,2,3],
    enunciado:'Si la cantidad promedio de palabras pronunciadas en 10 segundos es 5 (media = 5, mediana = 4, moda = 3), ¿cuánto vale el percentil 50?',
    opciones:['3','4','5','No se puede determinar'],
    respuesta:'4',
    justificacion:'El percentil 50 (P50) equivale a la mediana. Como la mediana = 4, P50 = 4.'
  },
  {
    id:'mc14', tipo:'mc_teoria', nivel:[2,3],
    enunciado:'¿Cuál es la interpretación correcta de un intervalo de confianza del 95%?',
    opciones:[
      'El 95% de los datos de la muestra están dentro del intervalo',
      'Hay un 95% de probabilidad de que el parámetro poblacional esté dentro del intervalo calculado',
      'Si se repite el muestreo muchas veces, el 95% de los intervalos construidos contendrán al parámetro real',
      'La media muestral tiene un 95% de precisión'
    ],
    respuesta:'Si se repite el muestreo muchas veces, el 95% de los intervalos construidos contendrán al parámetro real',
    justificacion:'La interpretación frecuentista correcta: el 95% de los IC construidos con ese método contendrán al parámetro verdadero.'
  },
  {
    id:'mc15', tipo:'mc_teoria', nivel:[1,2,3],
    enunciado:'La cantidad de veces que un valor se repite en un conjunto de datos recibe el nombre de:',
    opciones:['Mediana','Frecuencia absoluta','Moda','Rango'],
    respuesta:'Frecuencia absoluta',
    justificacion:'La frecuencia absoluta (fi) es el conteo de cuántas veces aparece cada valor en el conjunto de datos.'
  },
  {
    id:'mc16', tipo:'mc_teoria', nivel:[2,3],
    enunciado:'En una distribución con asimetría negativa (sesgada a la izquierda), ¿cuál es el orden correcto de las medidas de tendencia central?',
    opciones:[
      'Media < Mediana < Moda',
      'Moda < Mediana < Media',
      'Media = Mediana = Moda',
      'Mediana < Media < Moda'
    ],
    respuesta:'Media < Mediana < Moda',
    justificacion:'En asimetría negativa, la cola izquierda "jala" la media hacia abajo: Media < Mediana < Moda.'
  },
  {
    id:'mc17', tipo:'mc_teoria', nivel:[1,2,3],
    enunciado:'¿Cuál de los siguientes NO es un parámetro poblacional?',
    opciones:['Media poblacional (μ)','Desvío estándar poblacional (σ)','Media muestral (x̄)','Varianza poblacional (σ²)'],
    respuesta:'Media muestral (x̄)',
    justificacion:'x̄ es un estadístico muestral, no un parámetro. Los parámetros (μ, σ, σ²) describen a la población.'
  },
  {
    id:'mc18', tipo:'mc_teoria', nivel:[2,3],
    enunciado:'La estadística inferencial se utiliza para:',
    opciones:[
      'Describir y resumir los datos de una muestra',
      'Calcular frecuencias absolutas y relativas',
      'Estimar parámetros poblacionales y probar hipótesis a partir de datos muestrales',
      'Construir tablas de distribución de frecuencias'
    ],
    respuesta:'Estimar parámetros poblacionales y probar hipótesis a partir de datos muestrales',
    justificacion:'La estadística inferencial usa la muestra para sacar conclusiones sobre la población. La descriptiva solo resume los datos.'
  }
];

// =========================================================
// GENERADOR DE EJERCICIO DE TEORÍA
// Selecciona 4–5 preguntas del banco según el nivel,
// asegurando variedad de tipos
// =========================================================

// Rastrea qué ids ya se usaron en esta sesión para no repetir
let _usadosVF = [], _usadosComp = [], _usadosMC = [];

function resetBancoTeoria(){
  _usadosVF = []; _usadosComp = []; _usadosMC = [];
}

function pickFromBanco(pool, usados, n){
  const disponibles = pool.filter(p => !usados.includes(p.id));
  const elegidos = [];
  const shuffled = shuffle([...disponibles]);
  for(let i=0; i<Math.min(n, shuffled.length); i++){
    elegidos.push(shuffled[i]);
    usados.push(shuffled[i].id);
  }
  return elegidos;
}

function genTeoria(nivel){
  const vfPool    = BANCO_TEORIA.filter(p => p.tipo==='vf'         && p.nivel.includes(nivel));
  const compPool  = BANCO_TEORIA.filter(p => p.tipo==='completar'  && p.nivel.includes(nivel));
  const mcPool    = BANCO_TEORIA.filter(p => p.tipo==='mc_teoria'  && p.nivel.includes(nivel));

  // Composición por nivel:
  // Nivel 1: 2 VF + 1 completar + 1 MC
  // Nivel 2: 2 VF + 1 completar + 2 MC
  // Nivel 3: 2 VF + 2 completar + 1 MC
  const nVF   = 2;
  const nComp = nivel===3 ? 2 : 1;
  const nMC   = nivel===2 ? 2 : 1;

  const preguntas = [
    ...pickFromBanco(vfPool,   _usadosVF,   nVF),
    ...pickFromBanco(compPool, _usadosComp, nComp),
    ...pickFromBanco(mcPool,   _usadosMC,   nMC),
  ];

  const ptos = preguntas.reduce((s, p) => {
    if(p.tipo==='vf')        return s + 1;
    if(p.tipo==='completar') return s + (p.partes.filter(x=>typeof x==='object').length);
    if(p.tipo==='mc_teoria') return s + 1;
    return s;
  }, 0);

  return {
    tag:'teoria', tagLabel:'📖 Teoría',
    tipo:'teoria_bloque',
    preguntas,
    ptos,
    hint:'Leé cada afirmación con cuidado. Para completar, arrastrá cada palabra al espacio correspondiente.',
    enunciado:'' // no se usa, cada pregunta tiene el suyo
  };
}

// =========================================================
// RENDER DEL BLOQUE DE TEORÍA
// =========================================================

function buildTeoria(ej, ei, ji){
  const partes = ej.preguntas.map((p, pi) => {
    if(p.tipo==='vf')        return buildVF(p, ei, ji, pi);
    if(p.tipo==='completar') return buildCompletar(p, ei, ji, pi);
    if(p.tipo==='mc_teoria') return buildMCTeoria(p, ei, ji, pi);
    return '';
  }).join('');

  return `<div class="teoria-wrap">${partes}</div>`;
}

// ── Verdadero / Falso ────────────────────────────
function buildVF(p, ei, ji, pi){
  return `
    <div class="teoria-pregunta" id="teo-${ei}-${ji}-${pi}">
      <div class="teoria-tipo-tag">V / F</div>
      <div class="teoria-enunciado">${p.enunciado}</div>
      <div class="vf-opciones">
        <label class="vf-btn" id="vf-V-${ei}-${ji}-${pi}" onclick="selectVF(${ei},${ji},${pi},'V')">
          <span>✓ Verdadero</span>
        </label>
        <label class="vf-btn" id="vf-F-${ei}-${ji}-${pi}" onclick="selectVF(${ei},${ji},${pi},'F')">
          <span>✗ Falso</span>
        </label>
      </div>
      <div class="feedback-inline" id="fb-teo-${ei}-${ji}-${pi}"></div>
    </div>
  `;
}

function selectVF(ei, ji, pi, val){
  ['V','F'].forEach(v => {
    const btn = document.getElementById(`vf-${v}-${ei}-${ji}-${pi}`);
    if(btn) btn.classList.toggle('selected', v===val);
  });
}

// ── Completar con drag & drop ────────────────────
function buildCompletar(p, ei, ji, pi){
  // Construir el texto con blanks
  const textoHTML = p.partes.map(parte => {
    if(typeof parte === 'string') return `<span>${parte}</span>`;
    return `<span class="drop-zone" id="dz-${ei}-${ji}-${pi}-${parte.blank}" data-blank="${parte.blank}" data-ei="${ei}" data-ji="${ji}" data-pi="${pi}" ondragover="dzDragOver(event)" ondragleave="dzDragLeave(event)" ondrop="dzDrop(event)">
              <span class="dz-placeholder">soltar aquí</span>
            </span>`;
  }).join('');

  // Palabras disponibles (shuffled)
  const palabrasHTML = shuffle([...p.palabras]).map(pal =>
    `<span class="drag-word" draggable="true" id="dw-${ei}-${ji}-${pi}-${pal.replace(/\s/g,'_')}"
      ondragstart="dwDragStart(event,'${pal.replace(/'/g,"\\'")}','${ei}','${ji}','${pi}')"
      onclick="dwClick(this,'${pal.replace(/'/g,"\\'")}','${ei}','${ji}','${pi}')"
    >${pal}</span>`
  ).join('');

  return `
    <div class="teoria-pregunta" id="teo-${ei}-${ji}-${pi}">
      <div class="teoria-tipo-tag">Completar</div>
      <div class="teoria-enunciado completar-texto">${textoHTML}</div>
      <div class="palabras-disponibles" id="palabras-${ei}-${ji}-${pi}">
        <span class="palabras-label">Palabras disponibles:</span>
        ${palabrasHTML}
      </div>
      <div class="feedback-inline" id="fb-teo-${ei}-${ji}-${pi}"></div>
    </div>
  `;
}

// Estado del drag
let _dragData = null;

function dwDragStart(event, pal, ei, ji, pi){
  _dragData = { pal, ei, ji, pi };
  event.dataTransfer.setData('text/plain', pal);
  event.target.classList.add('dragging');
  setTimeout(()=> event.target && event.target.classList.remove('dragging'), 200);
}

function dzDragOver(event){
  event.preventDefault();
  event.currentTarget.classList.add('dz-over');
}

function dzDragLeave(event){
  event.currentTarget.classList.remove('dz-over');
}

function dzDrop(event){
  event.preventDefault();
  const dz = event.currentTarget;
  dz.classList.remove('dz-over');
  const pal = event.dataTransfer.getData('text/plain') || (_dragData && _dragData.pal);
  if(!pal) return;
  placePalabra(dz, pal);
}

// Click como alternativa al drag (para móvil / teclado)
let _clickSelected = null; // { pal, ei, ji, pi, el }

function dwClick(el, pal, ei, ji, pi){
  // Si ya hay una palabra seleccionada del mismo ejercicio, deseleccionar
  if(_clickSelected && _clickSelected.ei===ei && _clickSelected.ji===ji && _clickSelected.pi===pi){
    _clickSelected.el.classList.remove('word-selected');
    if(_clickSelected.pal === pal){ _clickSelected=null; return; }
  }
  el.classList.add('word-selected');
  _clickSelected = { pal, ei, ji, pi, el };
}

// Cuando hacen click en un drop zone (modo click)
document.addEventListener('click', e => {
  const dz = e.target.closest('.drop-zone');
  if(dz && _clickSelected){
    const {ei,ji,pi} = _clickSelected;
    if(dz.dataset.ei===String(ei) && dz.dataset.ji===String(ji) && dz.dataset.pi===String(pi)){
      _clickSelected.el.classList.remove('word-selected');
      placePalabra(dz, _clickSelected.pal);
      _clickSelected=null;
    }
  }
});

function placePalabra(dz, pal){
  // Si el drop zone ya tenía una palabra, devolver al pool
  if(dz.dataset.placed){
    const prev = dz.dataset.placed;
    returnPalabraToPool(dz, prev);
  }
  // Colocar en el drop zone
  dz.innerHTML = `<span class="dz-filled">${pal}
    <button class="dz-remove" onclick="removePalabra(event,'${dz.id}','${pal}')" title="Quitar">×</button>
  </span>`;
  dz.dataset.placed = pal;
  dz.classList.add('dz-has-word');

  // Ocultar la palabra del pool
  const dzId  = dz.id; // dz-ei-ji-pi-blank
  const parts  = dzId.split('-'); // ['dz',ei,ji,pi,blank]
  const ei=parts[1], ji=parts[2], pi=parts[3];
  const wordEl = document.getElementById(`dw-${ei}-${ji}-${pi}-${pal.replace(/\s/g,'_')}`);
  if(wordEl) wordEl.style.display='none';
}

function removePalabra(event, dzId, pal){
  event.stopPropagation();
  const dz = document.getElementById(dzId);
  if(!dz) return;
  dz.innerHTML = `<span class="dz-placeholder">soltar aquí</span>`;
  delete dz.dataset.placed;
  dz.classList.remove('dz-has-word','dz-ok','dz-err');
  returnPalabraToPool(dz, pal);
}

function returnPalabraToPool(dz, pal){
  const parts = dz.id.split('-'); // dz-ei-ji-pi-blank
  const ei=parts[1], ji=parts[2], pi=parts[3];
  const wordEl = document.getElementById(`dw-${ei}-${ji}-${pi}-${pal.replace(/\s/g,'_')}`);
  if(wordEl) wordEl.style.display='';
}

// ── Multiple Choice Teoría ───────────────────────
function buildMCTeoria(p, ei, ji, pi){
  const opciones = shuffle([...p.opciones]).map((op, oi) => `
    <li>
      <label class="opcion-label" id="mct-${ei}-${ji}-${pi}-${oi}" onclick="selectMCTeoria(${ei},${ji},${pi},${oi})">
        <input type="radio" name="mct-${ei}-${ji}-${pi}" />
        <span class="opcion-bullet"></span>
        <span>${op}</span>
      </label>
    </li>
  `).join('');

  // Guardamos las opciones shuffled para poder corregir
  // Las guardamos en el propio elemento vía data attr al primer render
  return `
    <div class="teoria-pregunta" id="teo-${ei}-${ji}-${pi}" data-opts='${JSON.stringify(shuffle([...p.opciones]))}'>
      <div class="teoria-tipo-tag">Opción múltiple</div>
      <div class="teoria-enunciado">${p.enunciado}</div>
      <ul class="opciones-list">${opciones}</ul>
      <div class="feedback-inline" id="fb-teo-${ei}-${ji}-${pi}"></div>
    </div>
  `;
}

function selectMCTeoria(ei, ji, pi, oi){
  const wrap = document.getElementById(`teo-${ei}-${ji}-${pi}`);
  if(!wrap) return;
  const opts = JSON.parse(wrap.dataset.opts||'[]');
  opts.forEach((_,i) => {
    const l = document.getElementById(`mct-${ei}-${ji}-${pi}-${i}`);
    if(l) l.classList.remove('selected');
  });
  const sel = document.getElementById(`mct-${ei}-${ji}-${pi}-${oi}`);
  if(sel) sel.classList.add('selected');
}

// =========================================================
// CORRECCIÓN DEL BLOQUE DE TEORÍA
// =========================================================

function corregirTeoria(ej, ei, ji){
  let aciertos = 0, total = 0;

  ej.preguntas.forEach((p, pi) => {

    if(p.tipo==='vf'){
      total++;
      const btnV = document.getElementById(`vf-V-${ei}-${ji}-${pi}`);
      const btnF = document.getElementById(`vf-F-${ei}-${ji}-${pi}`);
      const selV = btnV && btnV.classList.contains('selected');
      const selF = btnF && btnF.classList.contains('selected');
      const respStr = p.respuesta ? 'V' : 'F';
      const ok = (selV && p.respuesta) || (selF && !p.respuesta);

      if(btnV) { btnV.style.pointerEvents='none'; btnV.classList.toggle('vf-correct', p.respuesta); btnV.classList.toggle('vf-wrong', selV && !p.respuesta); }
      if(btnF) { btnF.style.pointerEvents='none'; btnF.classList.toggle('vf-correct', !p.respuesta); btnF.classList.toggle('vf-wrong', selF && p.respuesta); }

      const fb = document.getElementById(`fb-teo-${ei}-${ji}-${pi}`);
      if(fb){
        fb.className = ok ? 'feedback-inline ok' : 'feedback-inline err';
        fb.innerHTML = ok
          ? `✅ Correcto. ${p.justificacion}`
          : `❌ Es <strong>${p.respuesta ? 'VERDADERO' : 'FALSO'}</strong>. ${p.justificacion}`;
      }
      if(ok) aciertos++;
    }

    else if(p.tipo==='completar'){
      const blanks = p.partes.filter(x => typeof x==='object');
      blanks.forEach(b => {
        total++;
        const dz = document.getElementById(`dz-${ei}-${ji}-${pi}-${b.blank}`);
        if(!dz) return;
        const placed = dz.dataset.placed || '';
        const ok = placed.trim().toLowerCase() === b.resp.trim().toLowerCase();
        dz.classList.add(ok ? 'dz-ok' : 'dz-err');
        // Deshabilitar remove button
        const removeBtn = dz.querySelector('.dz-remove');
        if(removeBtn) removeBtn.style.display='none';
        if(!ok){
          // Mostrar respuesta correcta
          dz.innerHTML += `<span class="dz-correct-hint"> → ${b.resp}</span>`;
        }
        if(ok) aciertos++;
      });
      // Bloquear palabras
      p.palabras.forEach(pal => {
        const el = document.getElementById(`dw-${ei}-${ji}-${pi}-${pal.replace(/\s/g,'_')}`);
        if(el) el.style.pointerEvents='none';
      });
      const fb = document.getElementById(`fb-teo-${ei}-${ji}-${pi}`);
      const bOk = blanks.filter((b,bi) => {
        const dz = document.getElementById(`dz-${ei}-${ji}-${pi}-${b.blank}`);
        return dz && dz.dataset.placed && dz.dataset.placed.trim().toLowerCase()===b.resp.trim().toLowerCase();
      }).length;
      if(fb){
        fb.className = bOk===blanks.length ? 'feedback-inline ok' : 'feedback-inline err';
        fb.innerHTML = bOk===blanks.length
          ? `✅ ¡Todos los espacios correctos! ${p.justificacion}`
          : `❌ ${bOk}/${blanks.length} espacios correctos. ${p.justificacion}`;
      }
    }

    else if(p.tipo==='mc_teoria'){
      total++;
      const wrap = document.getElementById(`teo-${ei}-${ji}-${pi}`);
      const opts = wrap ? JSON.parse(wrap.dataset.opts||'[]') : [];
      let selIdx=-1, selVal=null;
      opts.forEach((op,oi)=>{
        const l=document.getElementById(`mct-${ei}-${ji}-${pi}-${oi}`);
        if(l && l.classList.contains('selected')){ selIdx=oi; selVal=op; }
      });
      const ok = selVal === p.respuesta;
      opts.forEach((op,oi)=>{
        const l=document.getElementById(`mct-${ei}-${ji}-${pi}-${oi}`);
        if(!l) return;
        l.style.pointerEvents='none';
        if(op===p.respuesta) l.classList.add(oi===selIdx?'correct-choice':'show-correct');
        else if(oi===selIdx && !ok) l.classList.add('wrong-choice');
      });
      const fb=document.getElementById(`fb-teo-${ei}-${ji}-${pi}`);
      if(fb){
        fb.className = ok ? 'feedback-inline ok' : 'feedback-inline err';
        fb.innerHTML = ok
          ? `✅ ¡Correcto! ${p.justificacion}`
          : `❌ Correcta: <strong>${p.respuesta}</strong>. ${p.justificacion}`;
      }
      if(ok) aciertos++;
    }
  });

  return { ok: aciertos===total, aciertos, total, errores };
}
