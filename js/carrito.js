//obtengo el carrito
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
//generando el contador
let contadorCarrito = document.querySelector('.contador')
let contador = carrito.length
contadorCarrito.innerHTML += `
<span class="badge rounded-pill text-bg-info">${contador}</span>
`
////////

function vaciarCarrito(){
    carrito.splice(0);
    localStorage.clear()
        console.log(`Tu carrito quedó vacio`)
}
function mostrarToastVaciar(){
    Toastify({
        text: "Carrito Vacio 😑",
        duration: 3000,
        close: true,
        gravity: "top", 
        position: "center",
        stopOnFocus: true,
        style: {
          background: "#dc3545",
        },
        callback(){
            window.location.href = './productos.html';
        }
      }).showToast();
}

//obtengo contenedor//
let contenedor = document.querySelector('.box')

let totalCarrito;

function obtenerTotalCarrito(){
    totalCarrito = carrito.reduce((total,producto)=> total + producto.precio, 0);
    console.log(totalCarrito)
}

const AgruparId = carrito.reduce((acumulador, producto) => {
    const id = producto.id;
    if (acumulador[id]) {
        acumulador[id].cantidad += producto.cantidad;
    } else {
        acumulador[id] = { ...producto };
    }
    return acumulador;
}, {});
//genero un array para poder iterar
const carritoAgrupado = Object.values(AgruparId);

function renderizarCarrito(){
    carritoAgrupado.forEach((producto)=> {
    let tarjeta = document.querySelector('template').content.cloneNode(true)
    tarjeta.querySelector('.nombre').textContent = producto.nombre
    tarjeta.querySelector('.nombre').textContent += ` - Precio: $${producto.precio} ARS`
    tarjeta.querySelector('.badge').innerHTML = producto.cantidad
    
    contenedor.append(tarjeta)
    
})
}

function comprobarCarrito (){
    if (carrito.length >= 1 ) {
        contenedor.innerHTML = '';
        renderizarCarrito();
        let totalizador = document.querySelector('.box3');
    totalizador.innerHTML += `<ol class="list-group">
        <li class="list-group-item d-flex col col-sm-6 align-self-center m-2">
          <div class="h4 ms-2 m-auto">Total: $${totalCarrito} ARS
          <div class=" fw-bold"></div>
          </div>
          <span class="badge text-bg-success rounded-pill">${carrito.length}</span>
        </li>
      </ol>`
        let botonVaciar = document.querySelector('.cart');
    botonVaciar.innerHTML +=`
    <button type="button" class="btn btn-danger">Vaciar Carrito</button>
    `
    let botonComprar = document.querySelector('.buy');
    botonComprar.innerHTML +=`
    <button type="button" class="btn btn-success"><a class="nav-link " href="./comprar.html">Comprar</a></button>
    `
    let seleccion = botonVaciar.querySelector('button')
        seleccion.addEventListener('click',()=>{
        vaciarCarrito();
        mostrarToastVaciar();
        
        });
    
    } else {
        let mensajeVacio = document.querySelector('.box3');
        mensajeVacio.innerHTML = `
        <div class="container-fluid row justify-content-center">
            <p class="text-body-secondary text-center col-9 align-self-center m-2">Carrito Vacio!!! para poder agregar productos por favor ir a la solapa "Productos"</p>
        </div>`
    }
}

obtenerTotalCarrito()
comprobarCarrito()