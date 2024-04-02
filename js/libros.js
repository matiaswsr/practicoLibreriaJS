import { Libro } from './clases.js';

let libros = [];

let seccion = document.querySelector("#seccion");

//*********************************************************** Inicio
document.addEventListener("DOMContentLoaded", iniciar);
function iniciar(){
    libros = [];
    seccion.innerHTML = '';
    obtenerTodosLosLibrosDeLocalStorage();
    mostrarLibros();
}

//*********************************************************** localStorage

function obtenerTodosLosLibrosDeLocalStorage(){
    // Obtener todas las claves almacenadas en localStorage
    let keys = Object.keys(localStorage);

    // Recorrer todas las claves y obtener los valores correspondientes
    keys.forEach(key => {
        let dato = JSON.parse(localStorage.getItem(key));
        if(dato.autor){
            libros.push(dato);
        }        
    });
}

//*********************************************************** Funciones

function mostrarLibros(){
    for(let i=0; i<libros.length; i++){
        armarCard(libros[i]);
    }
}

function armarCard(libro){

    let card = document.createElement("DIV");
    card.classList.add("col");
    card.innerHTML += `
        <div class="card p-2 text-center h-100" style="width: 18rem;">        
            <img src="./img/${libro.imagen}" class="card-img-top img-fluid mx-auto" alt="${libro.nombre}">
            <div class="card-body">
                <h5 class="card-title fw-bold">${libro.nombre}</h5>
                <p class="card-text">Autor: ${libro.autor}</p>                
            </div>
            <div>
                <small class="text-muted">Año ${libro.anio}</small>
            </div>        
        </div>
    `;
    seccion.appendChild(card);
}