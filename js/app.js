let productosArray = [];
carritoLocal = [];
obtenerJson();

function obtenerJson() {
  fetch("./js/datos.json")
    .then((response) => response.json())
    .then((data) => {
      guardarArray(data.data);
    })
    .catch((error) => console.error("error de JSON", error));
}
function guardarArray(data){
    productosArray = data;
    mostrarEnDom();
}
function agregarAlCarrito(idProducto) {
  let localExistente = [];
  let agregarosumar = true;
  //VALIDA QUE EL CARRITO TENGA PRODUCTOS
  if (localStorage.getItem("CARRITO")) {
    let localstoragedata = JSON.parse(localStorage.getItem("CARRITO"));
    localstoragedata.forEach((element) => {
      if (element.id == idProducto) {
        element.cantidad = +element.cantidad + 1;
        agregarosumar = false;
      }
    });
    localExistente = localstoragedata;
  }
  let dataProductoById = productosArray.filter(function (product) {
    return product.id == idProducto;
  });
  if (agregarosumar && dataProductoById[0]) {
    localExistente = [...localExistente, ...dataProductoById];
  }
  localStorage.removeItem("CARRITO");
  localStorage.setItem("CARRITO", JSON.stringify(localExistente));
}

function mostrarCarrito() {
  let contenedor_carrito = document.getElementById("contenedor_carrito");
  let dataCarrito = [];
  let totalCarrito = 0;
  contenedor_carrito.innerHTML = "";
  if (localStorage.getItem("CARRITO")) {
    dataCarrito = JSON.parse(localStorage.getItem("CARRITO"));
    dataCarrito.forEach((element) => {
      totalCarrito += element.cantidad * element.precio;
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
        </div>`;
    });
    document.getElementById("totalCarrito").value = totalCarrito;
  }
}
function eliminarDelCarrito(id) {
  let dataCarrito = JSON.parse(localStorage.getItem("CARRITO"));
  let restaroeliminar = true;
  let carritofiltrado = [];
  dataCarrito.forEach((element) => {
    if (element.id == id && element.cantidad > 1) {
      element.cantidad = +element.cantidad - 1;
      restaroeliminar = false;
    }
  });
  if (restaroeliminar) {
    carritofiltrado = dataCarrito.filter(function (product) {
      return +product.id !== id;
    });
    localStorage.removeItem("CARRITO");
    localStorage.setItem("CARRITO", JSON.stringify(carritofiltrado));
    mostrarCarrito();
  } else {
    localStorage.removeItem("CARRITO");
    localStorage.setItem("CARRITO", JSON.stringify(dataCarrito));
    mostrarCarrito();
  }
}
function sumarleAlCarrito(id) {
  let dataCarrito = JSON.parse(localStorage.getItem("CARRITO"));
  dataCarrito.forEach((element) => {
    if (element.id == id) {
      element.cantidad = +element.cantidad + 1;
    }
  });
  localStorage.removeItem("CARRITO");
  localStorage.setItem("CARRITO", JSON.stringify(dataCarrito));
  mostrarCarrito();
}
function mostrarEnDom() {
  let contenedor_producto = document.getElementById("contenedor_productos");
  productosArray.forEach((producto) => {
    contenedor_producto.innerHTML += `
    <div class="card" style="width: 20rem;">
        <img src="${producto.img}" class="card-img-top" alt="...">
        <div class="card-body">
        <h5 class="card-title">${producto.nombre}</h5>
        <p class="card-text">${producto.descripcion}</p>
        <button class="btn btn-primary" id="ap-${producto.id}" onClick="agregarAlCarrito(${producto.id})">$${producto.precio}</button>
        </div>
    </div>`;
  });

  const botonFinalizarCompra = document.getElementById("finalizar_compra");
  function finalizar_compra() {
    Swal.fire({
      title: "¡Gracias por su compra!",
      width: 500,
      padding: "4em",
      color: "#716add",
      background: "#fff url(https://i.gifer.com/3nk3.gif)",
      backdrop: `
          rgba(0,0,123,0.4)
          url("https://i.gifer.com/yC.gif")
          left top
          no-repeat`,
    });
    setTimeout(function () {
      location.reload();
    }, 1800);

    localStorage.removeItem("CARRITO");
    localStorage.setItem("CARRITO", JSON.stringify(dataCarrito));
    mostrarCarrito();
  }
  botonFinalizarCompra.addEventListener("click", finalizar_compra);
}