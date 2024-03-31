import { Libro, Cliente, Compra } from './clases.js';

let libros = [];
let clientes = [];
let compras = [];

//*********************************************************** Datos de prueba
let l1 = new Libro("Java 2", "Fco. Javier Ceballos", "Alfaomega", 50, 2020, "java2.jpg");
let l2 = new Libro("Python, de principio a fin", "Angel P. Hinojosa Gutiérrez", "Desconocida", 45, 2024, "python.jpg");
let l3 = new Libro("Piensa en Java", "Bruce Eckel", "Pearson", 80, 2020, "java.jpg");
libros.push(l1);
libros.push(l2);
libros.push(l3);

let c1 = new Cliente("Matias", "Santos", "matiaswsr@gmail.com", "59899400401", "39510153");
clientes.push(c1);

let compra = new Compra(c1);
agregar_libro_a_compra(l1, compra);
agregar_libro_a_compra(l2, compra);
agregar_libro_a_compra(l3, compra);
compra.precio = calcular_precio_compra(compra);
compras.push(compra);

//*********************************************************** Variables / Constantes

//*********************************************************** Funciones

document.addEventListener("DOMContentLoaded", iniciar);
function iniciar(){

}

function existe_cliente(cedula, email){
    clientes.forEach(cliente => {
        if(cliente.cedula === cedula || cliente.email === email){
            return true;
        }
    });
    return false;
}

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