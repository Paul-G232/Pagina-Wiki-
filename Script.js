
var botonMenu = document.getElementById("boton-menu");
var menu = document.getElementById("menu");
var enlaces = document.querySelectorAll(".menu a");

botonMenu.onclick = function () {
    menu.classList.toggle("abierto");
};

for (var i = 0; i < enlaces.length; i++) {
    enlaces[i].onclick = function () {
        menu.classList.remove("abierto");
    };
}

var barra = document.getElementById("barra");
var elementosOcultos = document.querySelectorAll(".oculto");
var contadores = document.querySelectorAll(".contador");
var contadoresIniciados = false;

function revisarScroll() {
    if (window.scrollY > 50) {
        barra.classList.add("scrolled");
    } else {
        barra.classList.remove("scrolled");
    }

    for (var i = 0; i < elementosOcultos.length; i++) {
        var posicion = elementosOcultos[i].getBoundingClientRect().top;

        if (posicion < window.innerHeight - 80) {
            elementosOcultos[i].classList.add("visible");
        }
    }

    var seccionNumeros = document.getElementById("numeros");

    if (seccionNumeros != null) {
        var posicionNumeros = seccionNumeros.getBoundingClientRect().top;

        if (posicionNumeros < window.innerHeight - 200 && contadoresIniciados == false) {
            contadoresIniciados = true;
            iniciarContadores();
        }
    }
}

window.addEventListener("scroll", revisarScroll);
revisarScroll();

function iniciarContadores() {
    for (var i = 0; i < contadores.length; i++) {
        animarContador(contadores[i]);
    }
}

function animarContador(elemento) {
    var meta = Number(elemento.getAttribute("data-meta"));
    var paso = Math.ceil(meta / 60);
    var numero = 0;

    var intervalo = setInterval(function () {
        numero = numero + paso;

        if (numero >= meta) {
            numero = meta;
            clearInterval(intervalo);
        }

        elemento.textContent = numero;
    }, 25);
}


var textoSaga = document.getElementById("saga");
var nombresSaga = ["Grand Theft Auto", "Red Dead", "Max Payne", "Bully"];
var coloresSaga = ["#f2b01e", "#c2412d", "#8a9bb0", "#3b82c4"];
var posicionSaga = 0;

if (textoSaga != null) {
setInterval(function () {
    textoSaga.style.opacity = 0;

    setTimeout(function () {
        posicionSaga = posicionSaga + 1;

        if (posicionSaga >= nombresSaga.length) {
            posicionSaga = 0;
        }

        textoSaga.textContent = nombresSaga[posicionSaga];
        textoSaga.style.color = coloresSaga[posicionSaga];
        textoSaga.style.opacity = 1;
    }, 300);
}, 2500);
}

var botonesFiltro = document.querySelectorAll(".filtro");
var juegos = document.querySelectorAll(".juego");

for (var i = 0; i < botonesFiltro.length; i++) {
    botonesFiltro[i].onclick = function () {
        var saga = this.getAttribute("data-saga");

        for (var j = 0; j < botonesFiltro.length; j++) {
            botonesFiltro[j].classList.remove("activo");
        }
        this.classList.add("activo");

        for (var k = 0; k < juegos.length; k++) {
            juegos[k].classList.remove("nuevo");

            if (saga == "todos" || juegos[k].getAttribute("data-saga") == saga) {
                juegos[k].style.display = "flex";
                juegos[k].classList.add("nuevo");
            } else {
                juegos[k].style.display = "none";
            }
        }
    };
}


var detalleTitulo = document.getElementById("detalle-titulo");
var detalleTexto = document.getElementById("detalle-texto");
var detalleDatos = document.getElementById("detalle-datos");

for (var i = 0; i < juegos.length; i++) {
    juegos[i].onclick = function () {
        detalleTitulo.textContent = this.querySelector("h3").textContent;
        detalleTexto.textContent = this.getAttribute("data-descripcion");
        detalleDatos.textContent = "Año: " + this.getAttribute("data-anio") + " | Género: " + this.getAttribute("data-genero") + " | Plataformas: " + this.getAttribute("data-plataformas");
    };
}

// ===== HISTORIA: trivia =====
var opciones = document.querySelectorAll(".opcion");
var puntaje = document.getElementById("puntaje");
var aciertos = 0;

for (var i = 0; i < opciones.length; i++) {
    opciones[i].onclick = function () {
        var pregunta = this.parentNode;
        var botones = pregunta.querySelectorAll(".opcion");

        if (pregunta.getAttribute("data-respondida") == "si") {
            return;
        }
        pregunta.setAttribute("data-respondida", "si");

        if (this.getAttribute("data-ok") == "si") {
            this.classList.add("correcta");
            aciertos = aciertos + 1;
        } else {
            this.classList.add("incorrecta");

            for (var j = 0; j < botones.length; j++) {
                if (botones[j].getAttribute("data-ok") == "si") {
                    botones[j].classList.add("correcta");
                }
            }
        }

        puntaje.textContent = "Aciertos: " + aciertos + " de 3";
    };
}

var formulario = document.getElementById("formulario");
var aviso = document.getElementById("aviso");

if (formulario != null) {
formulario.onsubmit = function (evento) {
    evento.preventDefault();

    var nombre = document.getElementById("nombre").value;
    var correo = document.getElementById("correo").value;
    var mensaje = document.getElementById("mensaje").value;

    if (nombre == "" || correo == "" || mensaje == "") {
        aviso.textContent = "⚠️ Por favor llena todos los campos.";
    } else if (correo.indexOf("@") == -1) {
        aviso.textContent = "⚠️ Escribe un correo válido.";
    } else {
        aviso.textContent = "✅ ¡Gracias " + nombre + "! Recibimos tu sugerencia.";
        formulario.reset();
    }
};
}