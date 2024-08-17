const cuotas = [
    {
        cuotas: 1,
        tasaInteres: 0,  // Tasa de interés para 3 cuotas
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

cuotas.forEach((cuota)=> {
    obtenerTotalCarrito()
    let tarjeta = document.querySelector('template').content.cloneNode(true)
    tarjeta.querySelector('label').textContent = `${cuota.cuotas} Cuota/s `
    tarjeta.querySelector('label').textContent += `- Valor Final ${cuota.calcular(totalCarrito)} ARS`
    tarjeta.querySelector('label').textContent += ` - Tasa de Interes del ${cuota.tasaInteres}%` 
    
    
    contenedor.append(tarjeta)
    
})
