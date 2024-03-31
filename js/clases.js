class Libro{
    constructor(nombre, autor, editorial, precio, anio, imagen){
        this.id = crypto.randomUUID();
        this.nombre = nombre;
        this.autor = autor;
        this.editorial = editorial;
        this.precio = precio;
        this.anio = anio;
        this.imagen = imagen;
    }
}

class Cliente{
    constructor(nombre, apellido, email, telefono, documento){
        this.nombre = nombre;
        this.apellido = apellido;
        this.email = email;
        this.telefono = telefono;
        this.documento = documento;
    }
}

class Compra{
    constructor(cliente){
        this.id = crypto.randomUUID();
        this.cliente = cliente;
        this.libros = [];
        this.precio = -1;
        this.fecha = new Date();
    }
}

export { Libro, Cliente, Compra };