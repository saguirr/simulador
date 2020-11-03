//variables

const inversion = document.querySelector("#inversion");
const plazo = document.querySelector("#plazo");

const formulario = document.querySelector("#simular-cdat");
const resultado = document.querySelector("#resultado");
const contenedorSimulacion = document.querySelector('#simulacion');

//Variable tasa
const tasa180 = 0.045;
const tasa270 = 0.05;
const tasa360 = 0.055;

let tasa;

//variable rtfe
let rtfe = 0.07;

//Variables de resutlado
let tasaPeriodo;
let totalGeneral;
let totalRtfe;
let retencion;

//CLASES

class UI {

    imprimirAlerta(mensaje, tipo) {
        //Crear el div
        const divMensaje = document.createElement('div');
        divMensaje.classList.add('text-center', 'alert', 'd-block', 'col-7');

        //Agregar clase en base al tipo de error
        if (tipo === 'error') {
            divMensaje.classList.add('alert-danger');
        } else {
            divMensaje.classList.add('alert-success');
        }

        //Mensaje de error
        divMensaje.textContent = mensaje;

        //Agregar al DOM
        document.querySelector('#contenido').insertBefore(divMensaje, document.querySelector('.agregar-simulacion'));

        //Quitar la alerta después de 5 segundo
        setTimeout(() => {
            divMensaje.remove();

        }, 3000);
    }

}

const ui = new UI();

//EVENTOS
eventListeners();

function eventListeners() {

    formulario.addEventListener('submit', ejecutarAPP);
}

window.addEventListener("load", function() {
    cargarPlazos(event);
}, false);

//FUNCIONES

//Convertir a moneda
const formatterPeso = new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0
})

function ejecutarAPP(e) {
    e.preventDefault();

    //resultado.remove();
    nuevaSimulacion();
}


function nuevaSimulacion(e) {
    //e.preventDefault();

    // Textarea donde el usuario escribe
    inversionInput = inversion.value
    plazoInput = parseInt(plazo.value)
    inver = Number(inversionInput.replace(/,/g, ''));

    //validar
    if (isNaN(inver) || isNaN(plazoInput)) {
        ui.imprimirAlerta('Ambos campos son obligatorios', 'error');
        return;

    } else if (inver <= 0 || isNaN(plazoInput)) {
        ui.imprimirAlerta('Cantidad no válida', 'error');
        return;
    }

    //Calculo tasa del periodo 

    switch (plazoInput) {
        case 180:
            tasaPeriodo = Math.round10((((1 + tasa180) ** (1 / 365)) ** plazoInput) - 1, -5);
            tasa = tasa180 * 100;
            break;
        case 270:
            tasaPeriodo = Math.round10((((1 + tasa270) ** (1 / 365)) ** plazoInput) - 1, -5);
            tasa = tasa270 * 100;
            break;
        case 360:
            tasaPeriodo = Math.round10((((1 + tasa360) ** (1 / 365)) ** plazoInput) - 1, -5);
            tasa = tasa360 * 100;
            break;
        default:
            break;

    }

    //Inver = formatterPeso.format(inver)
    Inver = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 0 }).format(inver);
    tasaPer = tasaPeriodo * 100;
    interes = inver * tasaPeriodo;
    intTotal = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 0 }).format(interes);
    subTotal = inver + interes;
    totalRtfe = Math.round10((interes * rtfe), 0);
    retencion = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 0 }).format(totalRtfe);
    //totalGeneral = formatterPeso.format(Math.round10(subTotal - totalRtfe, 0));
    totalGeneral = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 0 }).format(Math.round10(subTotal - totalRtfe, 0));

    const divResultado = document.createElement('div');
    divResultado.classList.add('resultado', 'p-3');

    //Scripting d elos elementos de la simulación
    const inversionParrafo = document.createElement('h2');
    inversionParrafo.classList.add('card-title', 'sans-serif', 'font-weight-bolder');
    inversionParrafo.innerHTML = `<span style="color: #FFFFFF">Inversión:</span> <span style="color: #00a3e0">${Inver} </span>`;


    const plazoParrafo = document.createElement('h2');
    plazoParrafo.classList.add('card-title', 'sans-serif', 'font-weight-bolder');
    plazoParrafo.innerHTML = `<span style="color: #FFFFFF">Plazo:</span> <span style="color: #00a3e0">${plazoInput} </span>`;

    const tasaP = document.createElement('h2');
    tasaP.classList.add('card-title', 'sans-serif', 'font-weight-bolder');
    tasaP.innerHTML = `<span style="color: #FFFFFF">Tasa del Período:</span> <span style="color: #00a3e0">${tasaPer} %</span>`;

    const tasaEfectiva = document.createElement('h2');
    tasaEfectiva.classList.add('card-title', 'sans-serif', 'font-weight-bolder');
    tasaEfectiva.innerHTML = `<span style="color: #FFFFFF">Tasa efectiva anual:</span> <span style="color: #00a3e0">${tasa} %</span>`;

    const interesTotal = document.createElement('h2');
    interesTotal.classList.add('card-title', 'sans-serif', 'font-weight-bolder');
    interesTotal.innerHTML = `<span style="color: #FFFFFF">Interés:</span> <span style="color: #00a3e0">${intTotal}</span>`;

    const retencionTotal = document.createElement('h2');
    retencionTotal.classList.add('card-title', 'sans-serif', 'font-weight-bolder');
    retencionTotal.innerHTML = `<span style="color: #FFFFFF">Retención en la fuente:</span> <span style="color: #00a3e0">${retencion}</span>`;

    const totalTotal = document.createElement('h2');
    totalTotal.classList.add('card-title', 'sans-serif', 'font-weight-bolder');
    totalTotal.innerHTML = `<span style="color: #FFFFFF">Valor a Recibir:</span> <span style="color: #00a3e0"> ${totalGeneral}</span>`;

    //Agregar los parrafos al divCita
    divResultado.appendChild(inversionParrafo);
    divResultado.appendChild(plazoParrafo);
    divResultado.appendChild(tasaP);
    divResultado.appendChild(tasaEfectiva);
    divResultado.appendChild(interesTotal);
    divResultado.appendChild(retencionTotal);
    divResultado.appendChild(totalTotal);



    //Agregar las citas al HTML
    resultado.appendChild(divResultado);


    /*//Limpiar resultado después de 5 segundo
    setTimeout(() => {
        resultado.remove();

    }, 5000);*/

    //Limpiar
    inversion.value = '';
    plazo.value = '';

    //Reiniciar el formulario
    formulario.reset();

}


//Funcion para cargar las provincias al campo "select".
function cargarPlazos() {

    const plazoSelect = document.querySelector("#plazo");

    //Inicializamos el array.
    var array = ['', 180, 270, 360].sort();
    //Ordena el array alfabeticamente.
    function comparar(a, b) { return a - b; }
    array.sort(comparar); // [ 1, 5, 40, 200 ]
    //Pasamos a la funcion addOptions(el ID del select, las provincias cargadas en el array).
    addOptions("plazo", array);
}

//Funcion para agregar opciones a un <select>.
function addOptions(domElement, array) {
    var selector = document.getElementsByName(domElement)[0];
    //Recorremos el array.
    for (plazoSelect in array) {
        var opcion = document.createElement("option");
        opcion.text = array[plazoSelect];
        selector.add(opcion);
    }
}


// Closure
(function() {
    /**
     * Ajuste decimal de un número.
     *
     * @param {String}  type  El tipo de ajuste.
     * @param {Number}  value El número.
     * @param {Integer} exp   El exponente (El logaritmo de ajuste en base 10).
     * @returns {Number} El valor ajustado.
     */
    function decimalAdjust(type, value, exp) {
        // Si exp es undefined o cero...
        if (typeof exp === 'undefined' || +exp === 0) {
            return Math[type](value);
        }
        value = +value;
        exp = +exp;
        // Si el valor no es un número o exp no es un entero...
        if (isNaN(value) || !(typeof exp === 'number' && exp % 1 === 0)) {
            return NaN;
        }
        // Shift
        value = value.toString().split('e');
        value = Math[type](+(value[0] + 'e' + (value[1] ? (+value[1] - exp) : -exp)));
        // Shift back
        value = value.toString().split('e');
        return +(value[0] + 'e' + (value[1] ? (+value[1] + exp) : exp));
    }

    // Decimal round
    if (!Math.round10) {
        Math.round10 = function(value, exp) {
            return decimalAdjust('round', value, exp);
        };
    }
    // Decimal floor
    if (!Math.floor10) {
        Math.floor10 = function(value, exp) {
            return decimalAdjust('floor', value, exp);
        };
    }
    // Decimal ceil
    if (!Math.ceil10) {
        Math.ceil10 = function(value, exp) {
            return decimalAdjust('ceil', value, exp);
        };
    }
})();

//Formato Inputo Número
//$(".numeric").inputmask({
$("input[data-type='currency']").inputmask({
    groupSeparator: ",",
    alias: "integer",
    placeholder: "0",
    autoGroup: !0,
    digitsOptional: !1,
    clearMaskOnLostFocus: !1
}).click(function() {
    $(this).select();
});