let valorProd = 230000;
const cuota3 = 15;
const cuota6 = 30;
const cuota9 = 60;
const cuota12 = 100;

function confirmarCuotas(){
    let selection = parseInt(prompt(`-1 cuota(sin recargo) \n-3 cuotas (15% de recargo) \n-6 cuotas(30% de recargo) \n-9 cuotas(60% de recargo) \n-12 cuotas(100% de recargo)\n\n Si queres cancelar la compra presiona "2"`))
    let resultado
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

function compra(){
    alert(`Felicitaciones!!! \nRealizaste la compra de tu producto con un valor de ${valorProd}$ \n `)
    let resultado = 0;
    while (resultado == 0){
        alert(`a continuación te detallamos las cuotas para financiarlo`);
        let resultado = confirmarCuotas();
        console.log('confirmar cuotas', resultado);
        if (resultado == 2){
            alert(`Se ha cancelado la compra de tu producto`);
            return resultado
            
        } else if (resultado > 0){
            alert(`El producto tiene un valor final de ${resultado}$ \nfin de la compra.`)
            return resultado
        }  

        
    }
    
}

compra();