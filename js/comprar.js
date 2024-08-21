const cuotas = [
    {
        cuotas: 1,
        tasaInteres: 0,  // Tasa de interés para 1 cuota
        calcular: function(valor) {
            const resultado = (valor * this.tasaInteres / 100) + valor;
            console.log(`El cálculo de la cuota para ${this.cuotas} cuotas es: ${resultado}`);
            return resultado;
        }
    },
    {
        cuotas: 3,
        tasaInteres: 15,  // Tasa de interés para 3 cuotas
        calcular: function(valor) {
            const resultado = (valor * this.tasaInteres / 100) + valor;
            console.log(`El cálculo de la cuota para ${this.cuotas} cuotas es: ${resultado}`);
            return resultado;
        }
    },
    {
        cuotas: 6,
        tasaInteres: 30,  // Tasa de interés para 6 cuotas
        calcular: function(valor) {
            const resultado = (valor * this.tasaInteres / 100) + valor;
            console.log(`El cálculo de la cuota para ${this.cuotas} cuotas es: ${resultado}`);
            return resultado;
        }
    },
    {
        cuotas: 9,
        tasaInteres: 60,  // Tasa de interés para 9 cuotas
        calcular: function(valor) {
            const resultado = (valor * this.tasaInteres / 100) + valor;
            console.log(`El cálculo de la cuota para ${this.cuotas} cuotas es: ${resultado}`);
            return resultado;
        }
    },
    {
        cuotas: 12,
        tasaInteres: 100, // Tasa de interés para 12 cuotas
        calcular: function(valor) {
            const resultado = (valor * this.tasaInteres / 100) + valor;
            console.log(`El cálculo de la cuota para ${this.cuotas} cuotas es: ${resultado}`);
            return resultado;
        }
    }
];
//obtengo el carrito
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
//generando el contador
let contadorCarrito = document.querySelector('.contador')
let contador = carrito.length
contadorCarrito.innerHTML += `
<span class="badge rounded-pill text-bg-info">${contador}</span>
`
////////
let totalCarrito;
let venta = [];
//obtengo contenedor//
let contenedor = document.querySelector('.box')

function vaciarCarrito(){
    carrito.splice(0);
    localStorage.clear()
        console.log(`Tu carrito quedó vacio`)
}

function obtenerTotalCarrito(){
    totalCarrito = parseInt(carrito.reduce((total,producto)=> total + producto.precio, 0));
    console.log(totalCarrito)
}

//compruebo que haya una seleccion de parte del usuario para mostrar los botones para avanzar
function comprobarCompra (){
    if (venta.length >= 1 ) {
        let totalizador = document.querySelector('.box3');
    totalizador.innerHTML = `<ol data-aos="fade-down" class="list-group">
        <li class="list-group-item d-flex col col-sm-6 align-self-center m-auto p-1">
        <div class="h5 m-auto">SubTotal: $${totalCarrito} ARS
          <div class=" fw-bold"></div>
          </div>
        </li>
        <li class="list-group-item d-flex col col-sm-6 align-self-center m-auto p-1">
        <div class="h4 m-auto">Total: $${venta[0].total_precio} ARS
          <div class=" fw-bold"></div>
          </div>
        </li>
      </ol>`
        let botonVaciar = document.querySelector('.empty');
    botonVaciar.innerHTML =`
    <button data-aos="fade-down" type="button" class="btn btn-danger">Cancelar Compra</a></button>
    `
    let verCarrito = document.querySelector('.cart');
    verCarrito.innerHTML =`
    <button data-aos="fade-down" type="button" class="btn btn-success"><a class="nav-link " href="./carrito.html">Ver Carrito</a></button>
    `
    let botonComprar = document.querySelector('.buy');
    botonComprar.innerHTML =`
    <button data-aos="fade-down" type="button" class="btn btn-success">Confirmar Compra</a></button>
    `
    let seleccion = botonVaciar.querySelector('button')
        seleccion.addEventListener('click',()=>{
        toastCancSwAl();
        }); 
    let comprar = botonComprar.querySelector('button')
        comprar.addEventListener('click',()=>{
            toastCompExitosa();
            
            
        })    
    }
    
}
function comprobarCarrito (){
    if (carrito.length >= 1 ) {
        renderizarCuotasDisp();
    }
}    

function renderizarCuotasDisp(){
    cuotas.forEach((cuota)=> {
        obtenerTotalCarrito()
        let tarjeta = document.querySelector('template').content.cloneNode(true)
        tarjeta.querySelector('label').textContent = `${cuota.cuotas} Cuota/s `
        //tarjeta.querySelector('label').textContent += `- Valor Final ${cuota.calcular(totalCarrito)} ARS`
        tarjeta.querySelector('label').textContent += ` - Tasa de Interés del ${cuota.tasaInteres}%` 
        let seleccion = tarjeta.querySelector('input')
            seleccion.addEventListener('click',()=>{
            venta.splice(0);
            venta.push({
                idVenta: 1,
                tasaElegida: cuota.tasaInteres,
                cuota_cant: cuota.cuotas,
                total_precio: cuota.calcular(totalCarrito),
                descripcion: "Productos",             
            });
            comprobarCompra();
            })
        
        contenedor.append(tarjeta)
        
    });
}
function mostrarToastVaciar(){
    Toastify({
        text: "Tu compra ha sido cancelada 😢",
        duration: 3000,
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
function mostrarToastCompra(){
    Toastify({
        text: "Muchas Gracias por tu compra, Vuelve Pronto!!!",
        duration: 4000,
        gravity: "top", 
        position: "center",
        stopOnFocus: false,
        style: {
          background: "#198754",
        },
        callback(){
            window.location.href = '../index.html';
        }
      }).showToast();
}

function toastCancSwAl (){
    swal({
        title: "Estas seguro de cancelar la compra?",
        text: "Una vez cancelada la compra, se elimina el carrito",
        icon: "warning",
        buttons: {
            cancel: "No",
            ok: "Si, Cancelar Compra",
        },
        dangerMode: true,
        closeOnClickOutside: false,
      })
      .then((borrar) => {
        if (borrar) {
          swal("se ha cancelado tu Compra", {
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

function toastCompExitosa(){
    swal({
        title: "Comprar Realizada!!!",
        text: "Muchas Gracias por elegirnos",
        icon: "success",
        timer: 4000,
        event: vaciarCarrito(),
        event: mostrarToastCompra(),
        buttons: false
      });
}


comprobarCarrito()
