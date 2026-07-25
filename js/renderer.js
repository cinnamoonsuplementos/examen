/*
=========================================
renderer.js
-----------------------------------------
Genera dinámicamente los mini exámenes
=========================================
*/

function obtenerAleatorio(array) {

    return array[Math.floor(Math.random() * array.length)];

}

export function generarMiniExamen(numero, bancoNivel, APP) {

    const contenedor = document.getElementById(`exam${numero}`);

    if (!contenedor) return;

    // Elegimos un ejercicio de cada tema

    const ejercicioProb = obtenerAleatorio(bancoNivel.probabilidades);

    const ejercicioInf = obtenerAleatorio(bancoNivel.inferencial);

    const ejercicioDesc = obtenerAleatorio(bancoNivel.descriptiva);

    // Guardamos para la corrección

    APP[`exam${numero}`] = {

        probabilidad: ejercicioProb,

        inferencial: ejercicioInf,

        descriptiva: ejercicioDesc

    };

    // Renderizamos

    renderProbabilidad(contenedor, ejercicioProb);

    renderInferencial(contenedor, ejercicioInf);

    renderDescriptiva(contenedor, ejercicioDesc);

}

/*==========================================================
 PROBABILIDADES
==========================================================*/

function renderProbabilidad(contenedor, ejercicio) {

    const div = contenedor.querySelector("#prob1 .exercise-content")
            || contenedor.querySelector(".exercise-content");

    if (!div) return;

    let html = `

        <h4>${ejercicio.titulo}</h4>

        <p>${ejercicio.enunciado.replace(/\n/g,"<br>")}</p>

    `;

    if (ejercicio.tipo === "multiple") {

        ejercicio.opciones.forEach((opcion, indice) => {

            html += `

            <label class="option">

                <input
                    type="radio"
                    name="${ejercicio.id}"
                    value="${indice}"
                >

                ${opcion}

            </label>

            `;

        });

    }

    if (ejercicio.tipo === "numero") {

        html += `

            <input

                type="number"

                step="0.01"

                class="numeric-answer"

                id="${ejercicio.id}"

            >

        `;

    }

    div.innerHTML = html;

}

/*==========================================================
 INTERVALO DE CONFIANZA
==========================================================*/

function renderInferencial(contenedor, ejercicio) {

    const div = contenedor.querySelector("#ic1 .exercise-content")
            || contenedor.querySelectorAll(".exercise-content")[1];

    if (!div) return;

    div.innerHTML = `

        <h4>${ejercicio.titulo}</h4>

        <p>${ejercicio.enunciado.replace(/\n/g,"<br>")}</p>

        <div class="interval-grid">

            <label>

                Límite inferior

                <input
                    type="number"
                    id="${ejercicio.id}_inf"
                    step="0.01">

            </label>

            <label>

                Límite superior

                <input
                    type="number"
                    id="${ejercicio.id}_sup"
                    step="0.01">

            </label>

        </div>

    `;

}

/*==========================================================
 DESCRIPTIVA
==========================================================*/

function renderDescriptiva(contenedor, ejercicio) {

    const tbody = contenedor.querySelector("#tableBody1");

    if (!tbody) return;

    tbody.innerHTML = "";

    let acumulada = 0;

    const total = ejercicio.fi.reduce((a,b)=>a+b,0);

    ejercicio.xi.forEach((valor,i)=>{

        acumulada += ejercicio.fi[i];

        const hi = (ejercicio.fi[i]/total).toFixed(2);

        const Hi = (acumulada/total).toFixed(2);

        const fila = document.createElement("tr");

        fila.innerHTML = `

            <td>${valor}</td>

            <td>${ejercicio.fi[i]}</td>

            <td>

                <input

                    type="number"

                    class="fiAcum"

                    data-correct="${acumulada}"

                >

            </td>

            <td>

                <input

                    type="number"

                    step="0.01"

                    class="hi"

                    data-correct="${hi}"

                >

            </td>

            <td>

                <input

                    type="number"

                    step="0.01"

                    class="Hi"

                    data-correct="${Hi}"

                >

            </td>

        `;

        tbody.appendChild(fila);

    });

}

/*==========================================================
 Utilidad
==========================================================*/

export function obtenerExamen(APP, numero){

    return APP[`exam${numero}`];

}
