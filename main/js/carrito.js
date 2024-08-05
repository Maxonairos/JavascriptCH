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

//obtengo contenedor//
let contenedor = document.querySelector('.box')

carrito.forEach((producto)=> {
            let tarjeta = document.querySelector('template').content.cloneNode(true)
            tarjeta.querySelector('img').src = producto.img
            tarjeta.querySelector('h5').textContent = producto.nombre
            tarjeta.querySelector('.desc').textContent = producto.descripcion
            tarjeta.querySelector('.precio').textContent += producto.precio
            tarjeta.querySelector('img')
            //renderizar carrito//
            contenedor.append(tarjeta)
            
        })



///obtengo espacio para boton "vaciar carrito"


function comprobarCarrito (){
    if (carrito.length >= 1 ) {
        let botonVaciar = document.querySelector('.cart');
    botonVaciar.innerHTML +=`
    <button type="button" class="btn btn-danger">Vaciar Carrito</button>
    `
        
        
        let botonComprar = document.querySelector('.buy');
botonComprar.innerHTML +=`
<button type="button" class="btn btn-success">Comprar</button>
`
let seleccion = botonVaciar.querySelector('button')
    seleccion.addEventListener('click',()=>{
        vaciarCarrito()
        window.location.reload();
    })

    }
}

comprobarCarrito()