import { Libro, Cliente, Compra } from './clases.js';

//*********************************************************** Inicio
document.addEventListener("DOMContentLoaded", iniciar);
function iniciar(){
    let keys = Object.keys(localStorage);
    if(keys.length < 1){
        //Datos de prueba
        let c1 = new Cliente("Matias", "Santos", "matiaswsr@gmail.com", "59899400401", "39510153");
        guardarClientes(c1);

        let l1 = new Libro("Java 2", "Fco. Javier Ceballos", "Alfaomega", 50, 2020, "java2.jpg");
        let l2 = new Libro("Python, de principio a fin", "Angel P. Hinojosa Gutiérrez", "Desconocida", 45, 2024, "python.jpg");    
        let l3 = new Libro("Piensa en Java", "Bruce Eckel", "Pearson", 80, 2020, "java.jpg");
        guardarLibros(l1);
        guardarLibros(l2);
        guardarLibros(l3);

        let compra = new Compra(c1);
        agregar_libro_a_compra(l1, compra);
        agregar_libro_a_compra(l2, compra);
        agregar_libro_a_compra(l3, compra);
        compra.precio = calcular_precio_compra(compra);
        guardarCompras(compra);
    }    
}

//*********************************************************** localStorage

function guardarClientes(cliente){    
    const clienteString = JSON.stringify(cliente);
    localStorage.setItem(cliente.documento, clienteString);    
}

function guardarLibros(libro){
    const libroString = JSON.stringify(libro);
    localStorage.setItem(libro.id, libroString);
}

function guardarCompras(compra){
    const compraString = JSON.stringify(compra);
    localStorage.setItem(compra.id, compraString);
}

//*********************************************************** Funciones
function agregar_libro_a_compra(libro, compra){
    compra.libros.push(libro);
}

function calcular_precio_compra(compra){
    let total = 0;
    compra.libros.forEach(libro => {
        total += libro.precio;
    });
    return total;
}