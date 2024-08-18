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
let seleccionCompra = [];
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
    if (seleccionCompra.length >= 1 ) {
        let totalizador = document.querySelector('.box3');
    totalizador.innerHTML = `<ol class="list-group">
        <li class="list-group-item d-flex col col-sm-6 align-self-center m-2">
        <div class="h4 ms-2 m-auto">Total: $${seleccionCompra[0].total} ARS
          <div class=" fw-bold"></div>
          </div>
        </li>
      </ol>`
        let botonVaciar = document.querySelector('.empty');
    botonVaciar.innerHTML =`
    <button type="button" class="btn btn-danger"><a class="nav-link " href="../index.html">Cancelar Compra</a></button>
    `
    let verCarrito = document.querySelector('.cart');
    verCarrito.innerHTML =`
    <button type="button" class="btn btn-success"><a class="nav-link " href="./carrito.html">Ver Carrito</a></button>
    `
    let botonComprar = document.querySelector('.buy');
    botonComprar.innerHTML =`
    <button type="button" class="btn btn-success"><a class="nav-link " href="../index.html">Confimar Compra</a></button>
    `
    let seleccion = botonVaciar.querySelector('button')
        seleccion.addEventListener('click',()=>{
        vaciarCarrito()
        }); 
    let comprar = botonComprar.querySelector('button')
        comprar.addEventListener('click',()=>{
            vaciarCarrito();
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
        tarjeta.querySelector('label').textContent += `- Valor Final ${cuota.calcular(totalCarrito)} ARS`
        tarjeta.querySelector('label').textContent += ` - Tasa de Interes del ${cuota.tasaInteres}%` 
        let seleccion = tarjeta.querySelector('input')
            seleccion.addEventListener('click',()=>{
            seleccionCompra.splice(0);
            seleccionCompra.push({
                tasaElegida: cuota.tasaInteres,
                cuota: cuota.cuotas,
                total: cuota.calcular(totalCarrito),
                
            });
            comprobarCompra();
            })
        
        contenedor.append(tarjeta)
        
    });
}

comprobarCarrito()
