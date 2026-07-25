/*
===========================================
 ESTADÍSTICA PARA MAGALI
 Archivo: app.js
-------------------------------------------
Este es el archivo principal de la aplicación.
Desde aquí se inicializan todos los módulos.
===========================================
*/

import { cargarBancoEjercicios } from "./data.js";
import { generarMiniExamen } from "./renderer.js";
import { inicializarEventos } from "./ui.js";
import { inicializarProgreso } from "./progress.js";

const APP = {

    banco: null,

    examenActual: 1,

    cantidadExamenes: 3,

    puntajeTotal: 0,

    ejerciciosRespondidos: 0,

    iniciado: false

};



document.addEventListener("DOMContentLoaded", iniciarAplicacion);



async function iniciarAplicacion(){

    console.log("📘 Estadística para Magali");

    obtenerElementos();

    ocultarAplicacion();

    agregarEventos();

    APP.banco = await cargarBancoEjercicios();

    console.log("Banco de ejercicios cargado.");

}



function obtenerElementos(){

    APP.startButton = document.getElementById("startBtn");

    APP.app = document.getElementById("app");

    APP.hero = document.querySelector(".hero");

    APP.progressFill = document.getElementById("progressFill");

    APP.progressText = document.getElementById("progressText");

    APP.finalScreen = document.getElementById("finalScreen");

    APP.newExamButton = document.getElementById("newExamBtn");

}



function ocultarAplicacion(){

    APP.app.hidden = true;

    APP.finalScreen.hidden = true;

}



function agregarEventos(){

    APP.startButton.addEventListener(

        "click",

        comenzarAplicacion

    );



    APP.newExamButton.addEventListener(

        "click",

        reiniciarAplicacion

    );

}



function comenzarAplicacion(){

    APP.iniciado = true;

    APP.hero.style.display = "none";

    APP.app.hidden = false;

    inicializarProgreso(APP);

    inicializarEventos(APP);

    cargarExamenes();

}



function cargarExamenes(){

    generarMiniExamen(

        1,

        APP.banco.facil,

        APP

    );



    generarMiniExamen(

        2,

        APP.banco.medio,

        APP

    );



    generarMiniExamen(

        3,

        APP.banco.dificil,

        APP

    );

}



function reiniciarAplicacion(){

    APP.puntajeTotal = 0;

    APP.ejerciciosRespondidos = 0;

    APP.examenActual = 1;

    APP.finalScreen.hidden = true;

    inicializarProgreso(APP);

    cargarExamenes();

}



export {

    APP

};
