let valorProd;
let estadoCompra = 0;
let productos = [
    {
        id: 1,
        nombre: "Laptop",
        marca: "HP",
        precio: 1200000,
        cantidad: 2,
        descripcion: "Laptop HP con procesador Intel Core i5 y 8GB RAM"
    },
    {   
        id: 2,
        nombre: "Monitor",
        marca: "Dell",
        precio: 300000,
        cantidad: 6,
        descripcion: "Monitor Dell de 24 pulgadas Full HD"
    },
    {   
        id: 3,
        nombre: "Teclado",
        marca: "Logitech",
        precio: 50000,
        cantidad: 10,
        descripcion: "Teclado inalámbrico Logitech con retroiluminación"
    },
    {   
        id: 4,
        nombre: "Mouse",
        marca: "Microsoft",
        precio: 5000,
        cantidad: 10,
        descripcion: "Mouse óptico Microsoft con 5 botones programables"
    },
    {
        id: 5,
        nombre: "PC Gamer",
        marca: "Gigabyte",
        precio: 1800000,
        cantidad: 5,
        descripcion: "PC Gamer con Ryzen 7, RTX 3060, 16GB RAM y SSD 1TB"
    },
    {
        id: 6,
        nombre: "Monitor Gaming",
        marca: "Acer",
        precio: 500000,
        cantidad: 5,
        descripcion: "Monitor gaming de 27 pulgadas, 144Hz, resolución 2560x1440"
    },
    {
        id: 7,
        nombre: "Teclado Mecánico",
        marca: "Corsair",
        precio: 12000,
        cantidad: 0,
        descripcion: "Teclado mecánico RGB con switches Cherry MX Red"
    },
    {
        id: 8,
        nombre: "Mouse Gaming",
        marca: "Razer",
        precio: 8000,
        cantidad: 4,
        descripcion: "Mouse gaming con sensor óptico 16000 DPI"
    }
];
const carrito = [];
const cuota3 = 15;
const cuota6 = 30;
const cuota9 = 60;
const cuota12 = 100;
let cuotaElegida;
let mensaje;
let veces;
let mensajeStandard = ' ';
let mensajeRepe = ' (Nuevamente) ';
const mensaje1 = 'Cuota';
const mensaje2 = 'Cuotas con interés';
function confirmarCuotas(){
    let selection = parseInt(prompt(`-1 cuota (sin recargo) \n-3 cuotas (15% de recargo) \n-6 cuotas (30% de recargo) \n-9 cuotas (60% de recargo) \n-12 cuotas(100% de recargo)\n\n si queres cancelar la compra presiona "2"`))
    let resultado;
    veces++;
    if (isNaN(selection)) {
        alert('Ingresar un valor númerico por favor');
    } else if (selection > 12){
        alert('Supera la cuota máxima');
    } else if (selection == '2'){
        return resultado = 2;
    } else {
        switch (selection){
            case 1:
                resultado = valorProd
                cuotaElegida = selection;
                mensaje = mensaje1
                break;
            case 3:
                resultado = calcularCuotas(valorProd,selection)
                cuotaElegida = selection;
                mensaje = mensaje2
                break;
            case 6:
                resultado = calcularCuotas(valorProd,selection)
                cuotaElegida = selection;
                mensaje = mensaje2
                break;
            case 9:
                resultado = calcularCuotas(valorProd,selection)
                cuotaElegida = selection;
                mensaje = mensaje2
                break;    
            case 12:
                resultado = calcularCuotas(valorProd,selection)
                cuotaElegida = selection;
                mensaje = mensaje2
                break;
            default:
                alert('Por favor ingresar una cuota válida')
                break;            
        }
        return resultado    
    }
}

    

function calcularCuotas(valor,cuota){
    let resultado
    switch (cuota){
        case 3:
            resultado = (valor*cuota3)/100 + valor
            console.log(`el calculo de la cuota es ${resultado}`);
            break;
        case 6:
            resultado = (valor*cuota6)/100 + valor
            console.log(`el calculo de la cuota es ${resultado}`);
            break; 
        case 9:
            resultado = (valor*cuota9)/100 + valor
            console.log(`el calculo de la cuota es ${resultado}`);
            break;
        case 12:
            resultado = (valor*cuota12)/100 + valor
            console.log(`el calculo de la cuota es ${resultado}`);
            break;    
    }
    return resultado
    
}

function comprar(){
    alert(`Felicitaciones!!! \nRealizaste la compra con un valor de ${valorProd}$ \n `)
    let resultado = 0;
    let mensaje3 = mensajeStandard  
    while (resultado == 0){
        alert(`a continuación te detallamos${mensaje3}las cuotas para financiarlo`);
        let resultado = confirmarCuotas();
        mensaje3 = mensajeRepe;
        if (resultado == 2){
            alert(`Se ha cancelado la compra.\nVuelve pronto!!!`);
            return resultado
            
        } else if (resultado > 0){
            alert(`Tu Compra tiene un valor final de ${resultado}$ en ${cuotaElegida} ${mensaje}, \n\n Que tengas un lindo día!!!`)
            return resultado
        }          
    }    
}


productosActualizados = productos;
let mensajeBienvenida = `Bienvenido a la tienda, `
let mensajeMenu = " ";
function seguirComprando(carro){
    if (carro.length !== 0) {
        mensajeMenu = `, si ya completaste tu compra ingresa el valor -1, si deseas vaciar el carrito ingresa -2`;
        mensajeBienvenida = ``;
    }
    else {
        mensajeBienvenida = `Bienvenido a la tienda, `
        mensajeMenu = " ";
    }
}

function selecionarProducto(){
    while (estadoCompra == 0){
        seguirComprando(carrito);
        alert (`${mensajeBienvenida}a continuación te vamos a mostrar el listado de productos disponibles para comprar ${mensajeMenu}`);
        console.log(`Listado de productos actualizados: \n`)
        let productosDisponibles = productosActualizados.filter((producto) => producto.cantidad > 0);
        productosDisponibles.forEach(producto => {
        console.log(`${producto.id} - ${producto.nombre} - ${producto.marca}: $${producto.precio} ARS - Cantidad: ${producto.cantidad}`);
        });
        console.log (`Cantidad productos: ${productosDisponibles.length}`)
        function idExiste(id) {
            return productosDisponibles.find(producto => producto.id === id);
        }
        let totalCarrito = carrito.reduce((total,producto)=> total + producto.precio, 0)
        let selection = parseInt(prompt(`Ingresa el id del producto , si no quieres realizar ninguna compra presiona "0"${mensajeMenu}`))
        if (isNaN(selection)) {
        alert('Ingresar un valor númerico por favor');
        } else if (selection == 0){
            estadoCompra = 2;
        } else if (selection == -1){
            estadoCompra = 1;
            console.log(`Este es tu carrito: El total de es de ${totalCarrito}`)
            carrito.forEach(producto => {
                console.log(`${producto.nombre} - ${producto.marca}: $${producto.precio} ARS- ${producto.descripcion}`);
            });
            valorProd = totalCarrito;
            comprar();
            productosActualizados = productos;
        
        } else if (selection == -2){
            carrito.splice(0);
            console.log(`Tu carrito quedó vacio`)
            productosActualizados = productos;
        
        } else if (idExiste(selection)){
                    const filtro = productosDisponibles.filter((producto) => producto.id == selection);
                    carrito.push(filtro[0]);
                    console.log("Carrito:")
                    carrito.forEach(producto=> {
                        console.log(`${producto.id} - ${producto.nombre} - ${producto.marca}: $${producto.precio} ARS`);
                    });
                    console.log(`Total Productos: ${carrito.length}`)
                    productosActualizados = productosDisponibles.map (producto => {
                        if (producto.id === selection) {
                        return {
                            ...producto,
                            cantidad: producto.cantidad - 1
                            };
                        }
                        return producto;
                    });
        } else {
            alert('Por favor ingresar un id válido')
        }   
    }
}  


selecionarProducto();
