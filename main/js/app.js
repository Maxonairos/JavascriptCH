let valorProd = 230000;
const cuota3 = 15;
const cuota6 = 30;
const cuota9 = 60;
const cuota12 = 100;

function confirmarCuotas(){
    let selection = parseInt(prompt(`Felicitaciones!!! \n Realizaste la compra de tu producto con un valor de ${valorProd}$ \n Ahora necesitamos que nos indiques la cantidad de cuotas en las cuales querés abonar tu producto: \n -1 cuota(sin recargo) \n -3 cuotas (15% de recargo) \n -6 cuotas(30% de recargo) \n -9 cuotas(60% de recargo) \n -12 cuotas(100% de recargo) `))
    let resultado
    if (isNaN(selection)) {
        alert('Ingresar un valor númerico por favor');
    } else {
        switch (selection){
            case 1:
                resultado = valorProd
                break;
            case 3:
                resultado = calcularCuotas(valorProd,selection)
                break;
            case 6:
                resultado = calcularCuotas(valorProd,selection)
                break;
            case 9:
                resultado = calcularCuotas(valorProd,selection)
                break;    
            case 12:
                resultado = calcularCuotas(valorProd,selection)
                break;
            default:
                alert('Por favor ingresar una cuota válida')
        
            console.log(resultado);
            
        }
        alert(`El producto tiene un valor final de ${resultado}$.`)        
    
    
        console.log(selection);
    
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

confirmarCuotas();