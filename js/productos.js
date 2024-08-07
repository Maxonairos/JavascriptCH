
let productosBase = [
    {
        id: 1,
        nombre: "Laptop",
        marca: "HP",
        precio: 1200000,
        cantidad: 2,
        descripcion: "Laptop HP con procesador Intel Core i5 y 8GB RAM",
        img: '../img/image1.jpg'
    },
    {   
        id: 2,
        nombre: "Monitor",
        marca: "Dell",
        precio: 300000,
        cantidad: 6,
        descripcion: "Monitor Dell de 24 pulgadas Full HD",
        img: '../img/image2.jpg'
    },
    {   
        id: 3,
        nombre: "Teclado",
        marca: "Logitech",
        precio: 50000,
        cantidad: 10,
        descripcion: "Teclado inalámbrico Logitech con retroiluminación",
        img: '../img/image3.jpg'
    },
    {   
        id: 4,
        nombre: "Mouse",
        marca: "Microsoft",
        precio: 5000,
        cantidad: 10,
        descripcion: "Mouse óptico Microsoft con 5 botones programables",
        img: '../img/image4.jpg'
    },
    {
        id: 5,
        nombre: "PC Gamer",
        marca: "Gigabyte",
        precio: 1800000,
        cantidad: 5,
        descripcion: "PC Gamer con Ryzen 7, RTX 3060, 16GB RAM y SSD 1TB",
        img: '../img/image5.jpg'
    },
    {
        id: 6,
        nombre: "Monitor Gaming",
        marca: "Acer",
        precio: 500000,
        cantidad: 5,
        descripcion: "Monitor gaming de 27 pulgadas, 144Hz, resolución 2560x1440",
        img: '../img/image6.jpg'
    },
    {
        id: 7,
        nombre: "Teclado Mecánico",
        marca: "Corsair",
        precio: 12000,
        cantidad: 1,
        descripcion: "Teclado mecánico RGB con switches Cherry MX Red",
        img: '../img/image7.jpg'
    },
    {
        id: 8,
        nombre: "Mouse Gaming",
        marca: "Razer",
        precio: 8000,
        cantidad: 4,
        descripcion: "Mouse gaming con sensor óptico 16000 DPI",
        img: '../img/image8.jpg'
    }
];
let productos = productosBase;
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

obtenerProductos()

//obtengo el carrito//
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
//generando el contador
function mostrarCarrito(){
    let contadorCarrito = document.querySelector('.contador')
    let contador = carrito.length
    contadorCarrito.innerHTML += `
<span class="badge rounded-pill text-bg-info">${contador}</span>
`
}



function actualizarContador(){
    let contadorCarrito = document.querySelector('.contador')
    let contador = carrito.length
    contadorCarrito.innerHTML = `
<span class="badge rounded-pill text-bg-info">${contador}</span>
`
}


let contenedor = document.querySelector('.box')
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


renderizarProductos();
mostrarCarrito()


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


