   
import { Cliente } from './clases.js';

//Variable para guardar los datos desde localStorage
let clientes = [];

let formulario = document.querySelector("#form-registro");

document.addEventListener("DOMContentLoaded", function(){
    formulario.addEventListener("submit", verificar_formulario);
    obtenerTodosLosDatosDeLocalStorage();
});

function verificar_formulario(e){
    e.preventDefault();

    const datos = Object.fromEntries(
        new FormData(e.target)
    );

    const { nombre, apellido, email, documento, telefono } = datos;

    if(nombre.trim() === '' || apellido.trim() === '' || telefono.trim() === ''){
        mensaje("Todos los campos son obligatorios", true);
        return;
    }
    
    if(!emailEsValido(email)){
        mensaje("El email no es válido", true);
        return;
    }

    if(existeEmail(email)){
        mensaje("El email ingresado ya esta registrado", true);
        return;
    }

    if(existeDocumento(documento.trim())){
        mensaje("El documento ingresado ya esta registrado", true);
        return;
    }

    //Todas las validaciones son correctas
    guardarDatosCliente(nombre, apellido, email, documento, telefono);    
}

function guardarDatosCliente(nombre, apellido, email, documento, telefono){
    const cliente = new Cliente(nombre, apellido, email, telefono, documento);
    const clienteString = JSON.stringify(cliente);
    localStorage.setItem(documento, clienteString); //(clave, valor)
    mensaje("¡Se ha registrado con éxito!", false);
    formulario.reset();
}

function existeDocumento(ci){
    for (let i = 0; i < clientes.length; i++) {        
        if(clientes[i].documento === ci){
            return true;
        }
    }
    return false;
}

function existeEmail(mail){
    for (let i = 0; i < clientes.length; i++) {        
        if(clientes[i].email === mail){
            return true;
        }
    }
    return false;
}

function obtenerTodosLosDatosDeLocalStorage(){
    // Obtener todas las claves almacenadas en localStorage
    let keys = Object.keys(localStorage);

    // Recorrer todas las claves y obtener los valores correspondientes
    keys.forEach(key => {
        clientes.push(JSON.parse(localStorage.getItem(key)));
    });
}

function emailEsValido(email){
    //The test() method tests for a match in a string.
    //If it finds a match, it returns true, otherwise it returns false.    
    const  exp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return exp.test(email);
}

function mensaje(msg, error){
    const errores = document.querySelector(".err");
    const registrado = document.querySelector(".registrado");
    const p = document.createElement("P");
    p.textContent = msg; 

    if(error){
        //Mensaje con error
        if(!errores && !registrado){            
            p.classList.add("alert", "alert-danger", "text-center", "text-uppercase", "fw-bold", "mt-3", "err");
            formulario.appendChild(p);
            setTimeout(() => {
                p.remove();
            }, 3000);
        }
    }else{
        //Mensaje correcto
        if(!registrado && !errores){
            p.classList.add("alert", "alert-success", "text-center", "text-uppercase", "fw-bold", "mt-3", "registrado");
            formulario.appendChild(p);
            setTimeout(() => {
                p.remove();
            }, 3000); 
        }
    }       
}