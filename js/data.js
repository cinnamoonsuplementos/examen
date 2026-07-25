/*
=========================================
data.js
-----------------------------------------
Banco de ejercicios de Estadística
=========================================
*/

export function cargarBancoEjercicios(){

    return {

        facil:{

            probabilidades:probabilidadesFaciles,

            inferencial:inferencialFacil,

            descriptiva:descriptivaFacil

        },

        medio:{

            probabilidades:probabilidadesMedias,

            inferencial:inferencialMedia,

            descriptiva:descriptivaMedia

        },

        dificil:{

            probabilidades:probabilidadesDificiles,

            inferencial:inferencialDificil,

            descriptiva:descriptivaDificil

        }

    };

}

/* ====================================================== */
/* PROBABILIDADES */
/* ====================================================== */

const probabilidadesFaciles=[

{

id:"PF001",

tema:"probabilidades",

tipo:"multiple",

titulo:"Unión de eventos",

enunciado:`
En una comisión de 100 alumnos:

60 aprobaron Matemática.

40 aprobaron Estadística.

20 aprobaron ambas.

¿Cuál es P(M∪E)?
`,

opciones:[

"0.60",

"0.80",

"0.40",

"0.20"

],

correcta:1,

pista:"Usar la fórmula de la unión.",

explicacion:"P(A∪B)=P(A)+P(B)-P(A∩B)",

puntos:10

},

{

id:"PF002",

tema:"probabilidades",

tipo:"numero",

titulo:"Complemento",

enunciado:`

Si

P(A)=0.72

calcular

P(Aᶜ)

`,

correcta:0.28,

tolerancia:0.01,

pista:"Complemento = 1-P(A)",

explicacion:"1-0.72=0.28",

puntos:10

}

];



const probabilidadesMedias=[

{

id:"PM001",

tema:"probabilidades",

tipo:"numero",

titulo:"Probabilidad condicional",

enunciado:`

P(A)=0.50

P(B)=0.25

P(A∩B)=0.15

Calcular

P(A|B)

`,

correcta:0.60,

tolerancia:0.01,

pista:"P(A|B)=P(A∩B)/P(B)",

explicacion:"0.15/0.25=0.60",

puntos:15

}

];



const probabilidadesDificiles=[

{

id:"PD001",

tema:"probabilidades",

tipo:"multiple",

titulo:"Condicional",

enunciado:`

Una fábrica produce:

40% mujeres

60% hombres

30% de las mujeres usan lentes

20% de los hombres usan lentes

Elegir la probabilidad correcta.

`,

opciones:[

"0.24",

"0.30",

"0.40",

"0.18"

],

correcta:0,

pista:"Construí un árbol.",

explicacion:"0.40×0.30+0.60×0.20",

puntos:20

}

];

/* ====================================================== */
/* INFERENCIAL */
/* ====================================================== */

const inferencialFacil=[

{

id:"IF001",

tema:"inferencial",

tipo:"intervalo",

titulo:"IC del 95%",

enunciado:`

Una muestra de 36 personas.

Media=72

σ=12

Construir el IC del 95%.

`,

media:72,

sigma:12,

n:36,

z:1.96,

inferior:68.08,

superior:75.92,

pista:"Usar x̄±Zσ/√n",

explicacion:"Error=3.92",

puntos:20

}

];



const inferencialMedia=[

{

id:"IM001",

tema:"inferencial",

tipo:"intervalo",

titulo:"IC",

enunciado:`

Media=84

σ=15

n=49

95%

`,

media:84,

sigma:15,

n:49,

z:1.96,

inferior:79.80,

superior:88.20,

puntos:25

}

];



const inferencialDificil=[

{

id:"ID001",

tema:"inferencial",

tipo:"intervalo",

titulo:"IC",

enunciado:`

Media=53

σ=9

n=64

95%

`,

media:53,

sigma:9,

n:64,

z:1.96,

inferior:50.80,

superior:55.20,

puntos:30

}

];

/* ====================================================== */
/* DESCRIPTIVA */
/* ====================================================== */

const descriptivaFacil=[

{

id:"DF001",

tema:"descriptiva",

tipo:"tabla",

titulo:"Tabla de frecuencias",

xi:[2,3,4,5],

fi:[5,7,8,5],

media:3.52,

moda:4,

mediana:4,

rango:3,

varianza:1.05,

desviacion:1.02,

cv:29,

asimetria:"Negativa",

pista:"Completar primero Fi.",

puntos:30

}

];



const descriptivaMedia=[

{

id:"DM001",

tema:"descriptiva",

tipo:"tabla",

xi:[3,4,5,6,7],

fi:[3,8,9,7,3],

media:5,

moda:5,

mediana:5,

rango:4,

varianza:1.53,

desviacion:1.24,

cv:24.8,

asimetria:"Simétrica",

puntos:35

}

];



const descriptivaDificil=[

{

id:"DD001",

tema:"descriptiva",

tipo:"tabla",

xi:[4,5,6,7,8,9],

fi:[2,4,8,9,5,2],

media:6.43,

moda:7,

mediana:7,

rango:5,

varianza:1.82,

desviacion:1.35,

cv:21,

asimetria:"Negativa",

puntos:40

}

];
