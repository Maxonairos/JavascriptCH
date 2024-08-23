//const MP//
const testPubKey = "TEST-fee61cdc-9349-4e9a-ac58-a2b57328ff5e";
const apiUrl = "https://api-gamerstore.onrender.com";

const mp = new MercadoPago(testPubKey, {
    locale: "es-AR"
});

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
    <button type="button" class="btn btn-success" id="checkout-btn">Comprar</button>
    `
    let seleccion = botonVaciar.querySelector('button')
        seleccion.addEventListener('click',()=>{
        toastVaciarSwAl();        
        });
    comprarMP();    
    } else {
        let mensajeVacio = document.querySelector('.box3');
        mensajeVacio.innerHTML = `
        <div class="container-fluid row justify-content-center">
            <p class="text-body-secondary text-center col-9 align-self-center m-2">Carrito Vacio!!! para poder agregar productos por favor ir a la solapa "Productos"</p>
        </div>`
    }
}
function toastVaciarSwAl (){
    swal({
        title: "Estas seguro de vaciar el carrito?",
        icon: "warning",
        buttons: {
            cancel: "No",
            ok: "Si, vaciar carrito",
        },
        dangerMode: true,
        closeOnClickOutside: false,
      })
      .then((borrar) => {
        if (borrar) {
          swal("Se ha vaciado el carrito", {
            icon: "success",
            buttons: false,
            timer: 4000,
            event: vaciarCarrito(),
            event: mostrarToastVaciar(),
          });
        } else {
          swal("Puedes continuar con tu compra");
        }
      });
}
function mostrarToastCompra(){
    Toastify({
        text: "Muchas Gracias por tu compra, Vuelve Pronto!!!",
        duration: 4000,
        gravity: "top", 
        position: "center",
        stopOnFocus: false,
      }).showToast();
}
function toastCompExitosa(){
    swal({
        title: "Comprar Realizada!!!",
        text: "Muchas Gracias por elegirnos",
        icon: "success",
        timer: -1,
        event: vaciarCarrito(),
        event: mostrarToastCompra(),
        buttons: true
      });
}
///integrando proyecto mp
function comprarMP(){
  document.getElementById("checkout-btn").addEventListener("click", async () => {
    try{
        const orderData = {
            title: "productos",
            quantity: carrito.length,
            price: totalCarrito,
        }
        
        const response = await fetch(`${apiUrl}/create_preference`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(orderData),
        }); 
    
        const preference = await response.json()
        createCheckoutButton(preference.id);
    } catch(error) {
        alert("error");
    }
    
  });
  
    const createCheckoutButton = (preferenceId) => {
      const bricksBuilder = mp.bricks();
  
    const renderComponent =  async () => {
        if (window.checkoutButton) window.checkoutButton.unmount();
            window.checkoutButton = await bricksBuilder.create("wallet", "wallet_container", {
            initialization: {
                preferenceId: preferenceId,
                
            },
        });
    }  
    renderComponent()
    if (renderComponent){
        vaciarCarrito();
    }
  }
}



obtenerTotalCarrito()
comprobarCarrito()