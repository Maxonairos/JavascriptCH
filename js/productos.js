let productosUrl = 'https://45680e03-f2d0-46b4-91bf-4bc5e2f30fcb.mock.pstmn.io/api/datos'
let productos = [];
let productosEnCarrito;
let productosDisponibles;
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
let contenedor = document.querySelector('.box')
function mostrarCarrito(){
    let contadorCarrito = document.querySelector('.contador')
    let contador = carrito.length
    contadorCarrito.innerHTML += `
<span class="badge rounded-pill text-bg-info">${contador}</span>
`;
}
function actualizarProdLocal(){
    localStorage.setItem("productos",JSON.stringify(productosDisponibles))
}
function obtenerProductos(){
    if (localStorage.getItem('productos')){
        productosEnCarrito = JSON.parse(localStorage.getItem('productos'))
    } else {
        productosEnCarrito = productos.filter((producto) => producto.cantidad > 0);
    }
}

function actualizarContador(){
    let contadorCarrito = document.querySelector('.contador')
    let contador = carrito.length
    contadorCarrito.innerHTML = `
<span class="badge rounded-pill text-bg-info">${contador}</span>
`
}

function renderizarProductos(){
    contenedor.innerHTML = ''; 
    productosDisponibles = productosEnCarrito.filter((producto) => producto.cantidad > 0);
    productosDisponibles.forEach((producto)=> {
        let tarjeta = document.querySelector('template').content.cloneNode(true)
        tarjeta.querySelector('img').src = producto.img
        tarjeta.querySelector('h5').textContent = producto.nombre
        tarjeta.querySelector('.desc').textContent = producto.descripcion
        tarjeta.querySelector('.precio').textContent += `$ ${producto.precio} ARS`
        tarjeta.querySelector('.cant').textContent = `Cantidad: ${producto.cantidad}` 
        let seleccion = tarjeta.querySelector('button')
        seleccion.addEventListener('click',()=>{
            carrito.push({
                    id: producto.id,
                    nombre: producto.nombre,
                    marca: producto.marca,
                    precio: producto.precio,
                    cantidad: 1,
                    img: producto.img
                });
                producto.cantidad -=1;
                guardarLocal();      
                renderizarProductos();
                actualizarContador();
                actualizarProdLocal();
                mostrarToastProd();
            })
        contenedor.append(tarjeta)
        
        
    });
}
function guardarLocal(){
    localStorage.setItem("carrito",JSON.stringify(carrito))
}
function actualizarDisp(seleccion){
    productosDisponibles.map (producto => {
    if (producto.id == seleccion){
        return {
            ...producto,
            cantidad: producto.cantidad - 1
            };
        }
        return producto;
    }
)}
function mostrarToastProd(){
    Toastify({
        text: "Agregaste un Producto al carrito!!!",
        duration: 3000,
        close: true,
        gravity: "top", 
        position: "right",
        stopOnFocus: true,
        style: {
          background: "#198754",
        },
        onClick: function(){
            window.location.href = './carrito.html'
        }
      }).showToast();
}

fetch(productosUrl)
.then(response => response.json())
.then(datos => {
    productos = datos;
    obtenerProductos();
    renderizarProductos();
    mostrarCarrito();
})
.catch(error=> console.log(error))
