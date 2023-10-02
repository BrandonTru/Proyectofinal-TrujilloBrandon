const productosArray = [
    { id: 1, nombre: "Helado de fresa", precio: 5000, descripcion: "helado hecho con pulpa de fresa o sus correspondientes colorantes y saborizantes.",img: "./imagenes/fresa.jpg", cantidad: "1"},
    { id: 2, nombre: "Paleta de chocolate",precio:  4000, descripcion: "con grué de cacao, peta-zetas, galleta de chocolate y cobertura de chocolate.",  img: "./imagenes/chocolate.jpg", cantidad: 1},
    { id: 3, nombre: "Cupcake", precio: 8000, descripcion: "pequeña tarta proporcionado para una persona.", img: "./imagenes/cupcake.jpg", cantidad: 1},
    { id: 4, nombre: "Torta de mora", precio: 60000, descripcion: "Esponjosa y suave torta con sabor a mora que evoca el sabor casero de las tortas hechas en casa.", img: "./imagenes/torta de mora.jpg", cantidad: 1},
    { id: 5, nombre: "Helado de mango", precio: 6000, descripcion: "Deliciosos helados de Mango, ideales para refrescar a tu mejor amigo, además de ser una fuente de vitaminas y antioxidantes.", img: "./imagenes/helado de mango.jpg", cantidad: 1},
    { id: 6, nombre: "Dona", precio: 4000, descripcion: "Pan en forma de rosca, de masa dulce, suave y esponjosa, generalmente frita en mucho aceite y cubierta de azúcar.", img: "./imagenes/dona.jpg", cantidad: 1},
    { id: 7, nombre: "Croissant", precio: 5000, descripcion: "un tipo de pastel crujiente a base de masa de hojas de origen austriaco hecha la masa a base de levadura y mantequilla.", img: "./imagenes/Croissant.jpg", cantidad: 1},
    { id: 8, nombre: "Brownies", precio: 5500, descripcion: "Pastel hecho a base de nueces y chocolate.", img: "./imagenes/Brownies.jpg", cantidad: 1},
    { id: 9, nombre: "Batido de chocolate", precio: 15000, descripcion: "Batido de chocolate 100% natural, una delicia sin aditivos artificiales, sin azúcares ni colorantes añadidos.", img: "./imagenes/batido de chocolate.jpg", cantidad: 1},

]
carritoLocal = [];
mostrarEnDom();

function agregarAlCarrito(idProducto){
let localExistente = [];
let agregarosumar = true;
//VALIDA QUE EL CARRITO TENGA PRODUCTOS
if (localStorage.getItem('CARRITO')) {    
    let localstoragedata = JSON.parse(localStorage.getItem('CARRITO'))
    localstoragedata.forEach(element => {
        if (element.id == idProducto) {
            element.cantidad = +element.cantidad + 1;
            agregarosumar = false;
        }
    });
    localExistente = localstoragedata;
}
let dataProductoById = productosArray.filter(function(product){return product.id == idProducto });
if (agregarosumar && dataProductoById[0]) {
    localExistente = [...localExistente, ...dataProductoById]; 
}
localStorage.removeItem("CARRITO");
localStorage.setItem('CARRITO', JSON.stringify(localExistente));
}
function mostrarCarrito(){
let contenedor_carrito = document.getElementById("contenedor_carrito");
let dataCarrito = [];
let totalCarrito = 0;
contenedor_carrito.innerHTML = '';
if (localStorage.getItem('CARRITO')) {
    dataCarrito = JSON.parse(localStorage.getItem('CARRITO'));
    dataCarrito.forEach(element => {
        totalCarrito += (element.cantidad * element.precio)
        contenedor_carrito.innerHTML += `
        <div class="card mb-3" style="max-width: 540px;">
            <div class="row g-0">
                <div class="col-md-4">
                    <img src="${element.img}" class="img-fluid rounded-start" alt="">
                </div>
                <div class="col-md-8">
                    <div class="card-body">
                        <h5 class="card-title">${element.nombre}</h5>
                        <p class="card-text">Cantidad: ${element.cantidad}</p>
                        <p class="card-text">Precio: ${element.precio}</p>
                        <button class="btn btn-outline-danger"  onClick="eliminarDelCarrito(${element.id})">➖</button>
                        <button class="btn btn-outline-success"  onClick="sumarleAlCarrito(${element.id})">➕</button>
                    </div>
                </div>
            </div>
        </div>`
    });
    document.getElementById("totalCarrito").value = totalCarrito;

    
}
}
function eliminarDelCarrito(id){
let dataCarrito = JSON.parse(localStorage.getItem('CARRITO'));
let restaroeliminar = true;
let carritofiltrado = [];
dataCarrito.forEach(element => {
    if (element.id == id && element.cantidad > 1) {
        element.cantidad = +element.cantidad - 1;
        restaroeliminar = false;
    }
});
if (restaroeliminar) {
    carritofiltrado = dataCarrito.filter(function(product){return +product.id !== id });
    localStorage.removeItem("CARRITO");
    localStorage.setItem('CARRITO', JSON.stringify(carritofiltrado));
    mostrarCarrito();
}else{
    localStorage.removeItem("CARRITO");
    localStorage.setItem('CARRITO', JSON.stringify(dataCarrito));
    mostrarCarrito();
}



}
function sumarleAlCarrito(id){
let dataCarrito = JSON.parse(localStorage.getItem('CARRITO'));
dataCarrito.forEach(element => {
    if (element.id == id) {
        element.cantidad = +element.cantidad + 1;
    }
});
localStorage.removeItem("CARRITO");
localStorage.setItem('CARRITO', JSON.stringify(dataCarrito));
mostrarCarrito();
}
function mostrarEnDom(){
let contenedor_producto = document.getElementById("contenedor_productos")
productosArray.forEach( producto =>{
    contenedor_producto.innerHTML += `
    <div class="card" style="width: 20rem;">
        <img src="${producto.img}" class="card-img-top" alt="...">
        <div class="card-body">
        <h5 class="card-title">${producto.nombre}</h5>
        <p class="card-text">${producto.descripcion}</p>
        <button class="btn btn-primary" id="ap-${producto.id}" onClick="agregarAlCarrito(${producto.id})">$${producto.precio}</button>
        </div>
    </div>`
})


const botonFinalizarCompra = document.getElementById('finalizar_compra');
function finalizar_compra() {
    Swal.fire({
        position: 'center',
        icon: 'success',
        title: '¡Gracias por su compra!',
        showConfirmButton: false,
        timer: 1500
        }) 
}
botonFinalizarCompra.addEventListener('click', finalizar_compra);

  

}






