import { Libro, Cliente, Compra } from './clases.js';

let formulario = document.querySelector("#form-compras");
let cedula = document.querySelector("#cedula");
let ubicacion = document.querySelector("#seccion");

let compras = [];

document.addEventListener("DOMContentLoaded", iniciar);
function iniciar(){
    obtenerDatosDeLocalStorage();
    formulario.addEventListener("submit", buscarCliente);
}

function buscarCliente(e){
    e.preventDefault();
    ubicacion.innerHTML = "";
    let ci = cedula.value.trim();

    let mis_compras = buscarComprasDelCliente(ci);

    document.querySelector("#cedula").value = "";

    if(mis_compras.length < 1){
        mensaje("Ud. no ha realizado compras hasta el momento.");
        
        return;
    }

    //Mostrar las compras
    mis_compras.forEach(c => {
        let p =document.createElement("P");
        p.innerHTML = `
            <span style="display:block;">================ Compra ================</span>
            <span style="display:block;">ID: ${c.id}</span>
            <span style="display:block;">Nombre: ${c.cliente.nombre} ${c.cliente.apellido}</span>
            <span style="display:block;">Fecha de compra: ${c.fecha}</span>
            <span style="display:block;">Precio $${c.precio}</span>
            <span style="display:block;">Libros:</span>
        `;
        ubicacion.appendChild(p);
        for(let i=0; i<c.libros.length; i++){
            let lista =document.createElement("li");
            lista.classList.add("ms-5")
            lista.innerHTML = `${c.libros[i].nombre}`;
            ubicacion.appendChild(lista);
        }
    });
}

function obtenerDatosDeLocalStorage(){
    // Obtener todas las claves almacenadas en localStorage
    let keys = Object.keys(localStorage);

    // Recorrer todas las claves y obtener los valores correspondientes
    for(let i=0; i<keys.length; i++){
        let dato = JSON.parse(localStorage.getItem(keys[i]));
        if(dato.cliente){
            compras.push(dato);
        }
    }
}

function buscarComprasDelCliente(ced){
    let resultado = [];
    for(let i=0; i<compras.length; i++){
        if(compras[i].cliente.documento == ced){
            resultado.push(compras[i]);
        }
    }    
    return resultado;
}

function mensaje(msg) {
    const errores = document.querySelector(".err");
    const p = document.createElement("P");
    p.textContent = msg; 

    //Mensaje con error
    if (!errores) {
        p.classList.add("alert", "alert-danger", "text-center", "text-uppercase", "fw-bold", "mt-3", "err", "col-8", "mx-auto");
        ubicacion.appendChild(p);
        setTimeout(() => {
            p.remove();
        }, 3000);
    }

}