let productosUrl = 'https://45680e03-f2d0-46b4-91bf-4bc5e2f30fcb.mock.pstmn.io/api/datos'

let productos = [];
let productosEnCarrito;
let productosDisponibles;


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

let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
function mostrarCarrito(){
    let contadorCarrito = document.querySelector('.contador')
    let contador = carrito.length
    contadorCarrito.innerHTML += `
<span class="badge rounded-pill text-bg-info">${contador}</span>
`;
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

fetch(productosUrl)
.then(response => response.json())
.then(datos => {
    productos = datos;
    obtenerProductos();
    renderizarProductos();
    mostrarCarrito();
})
.catch(error=> console.log(error))

let contenedor = document.querySelector('.box')