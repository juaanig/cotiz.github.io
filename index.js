// ==================== fecha ====================
const d = new Date();
let fecha = d.toLocaleDateString();
document.getElementById("fecha").innerHTML = fecha;
// ===============================================

//==================== USD =====================
fetch('https://criptoya.com/api/dolar')
.then( response => response.json() )
.then( data => mostrar_coti(data) )
.catch( e => console.log(e) )

const mostrar_coti = (data)=>{
    let body = '';
    let slc_coin = '';
    let dls = Object.entries(data)
    for (const [key, value] of dls) {
        if(key != 'oficial' && key != 'mepgd30' && key != 'cclgd30' && key != 'time' ){ 
            body += `
            <tr>
            <td>${key}</td>
            <td id="${key}-price">$ ${value}</td>
            <td>$ ${parseInt(value-(value*0.01))}</td>
            <td>$ ${parseInt(value+(value*0.01))}</td>
            </tr>`

            slc_coin += `
            <option value="${key}">${key}</option>
            `
            
        }
    } 
    document.getElementById('usd').innerHTML = body ; 
    document.getElementById('coin').insertAdjacentHTML("beforeend", slc_coin); 
}
//==============================================

//=================== BTC ======================
fetch('https://criptoya.com/api/btc/usd/0.1')
.then( response => response.json() )
.then( data => display_btc(data) )
.catch( e => console.log(e) )

const display_btc = (data) => {
    let grid_btc = '';

    let buy = parseInt(data.letsbit.totalAsk) ;
    let sell = parseInt(data.letsbit.totalBid);
    let price = parseInt((buy+sell)/2);

    grid_btc = 
    `<td>Bitcoin</td>
    <td id="btc-price">usd ${price} </td>
    <td>usd ${buy} </td>
    <td>usd ${sell} </td>
    `

    document.getElementById('btc').innerHTML = grid_btc ;
}
//==============================================

//=================== ETH ======================
fetch('https://criptoya.com/api/eth/usd/0.1')
.then( response => response.json() )
.then( data => display_eth(data) )
.catch( e => console.log(e) )

const display_eth = (data) => {
    let grid_eth = '';
    let buy = parseInt(data.letsbit.totalAsk) ;
    let sell = parseInt(data.letsbit.totalBid);
    let price = parseInt((buy+sell)/2);

    grid_eth = 
    `<td>Ethereum</td>
    <td id="eth-price">usd ${price} </td>
    <td>usd ${buy} </td>
    <td>usd ${sell} </td>
    `
    document.getElementById('eth').innerHTML = grid_eth ;
}
//============================================

//=================== USDT ===================
fetch('https://criptoya.com/api/usdt/ars/0.1')
.then( response => response.json() )
.then( data => display_usdt(data) )
.catch( e => console.log(e) )

const display_usdt = (data) => {
    let grid_usdt = '';
    
    let buy = parseInt(data.letsbit.totalAsk) ;
    let sell = parseInt(data.letsbit.totalBid);
    let price = parseInt((buy+sell)/2);

    grid_usdt = 
    `<td>Usdt</td>
    <td id="usdt-price">$ ${price} </td>
    <td>$ ${buy} </td>
    <td>$ ${sell} </td>
    `

    document.getElementById('usdt').innerHTML = grid_usdt ;
}
//==============================================

const $select = document.getElementById('coin');
const $select1 = document.getElementById('to-coin');

/* ================= FUNCIÓN PARA CALCULADORA DE MONEDAS =================*/
const ver_log = () => {

    //________________________________________________
    const indice = $select.selectedIndex;
    const opcionSeleccionada = $select.options[indice];
    
    //________________________________________________
    const indice1 = $select1.selectedIndex;
    const opcionSeleccionada1 = $select1.options[indice1];
    
    if(indice === -1){ 
        return alert('error');
    }
    
    if(['btc','eth','usdt'].includes(opcionSeleccionada.value)){ 

        valor_conver = document.getElementById(`${opcionSeleccionada.value}-price`).innerHTML;
        cantidad = document.getElementById('cantidad').value ;

        /* EN ESTE BLOQUE DE IF SE FILTRA Y SE EXPULSA EL SIGNO PESOS O DOLAR
            (convert this block in a function in other sheet and then import)
        */
        if(valor_conver.includes("usd")){

            let aux = valor_conver.replace("usd","");
            valor_conver = aux.replace(/ /g, "");
            console.log(parseInt(valor_conver));
                    
        }else if(valor_conver.includes("$")){

            let aux = valor_conver.replace("$","");
            valor_conver = aux.replace(/ /g, "");
        }
        
        /* TRANSFORMAMOS LOS VALORES DEL BTC Y ETH A PESOS*/
        if(opcionSeleccionada1.value == 'pesos' && ['btc','eth'].includes(opcionSeleccionada.value)){
            let aux2 =  (document.getElementById('usdt-price').innerHTML).replace("$","");
            valor_conver = valor_conver * parseInt(aux2.replace(/ /g, ""));
        }
        
        total = cantidad/valor_conver;

        resultado1 = `
            <p class="mt-2 text-start " id="resultado_1">Recibiras: </p>
            <p class="mt-2 p-2 text-center border border-primary" id="resultado_2">${opcionSeleccionada.value} ${total}</p>
        `
        document.getElementById('result').innerHTML = resultado1;

    }else if(['solidario','blue','ccb','ccl','mep'].includes(opcionSeleccionada.value) ){ 

        valor_conver = document.getElementById(`${opcionSeleccionada.value}-price`).innerHTML;
        cantidad = document.getElementById('cantidad').value ;

        if(valor_conver.includes("$")){
            let aux = valor_conver.replace("$","");
            valor_conver = aux.replace(/ /g, "");
        } 

        total = (cantidad/valor_conver).toFixed(2);
        
        resultado = `
            <p class="mt-2 text-start " id="resultado_1">Recibiras: </p>
            <p class="mt-2 p-2 text-center border border-primary " id="resultado_2">usd ${total}</p>
        `
        
        document.getElementById('result').innerHTML = resultado;
    };
    
};

function clearing(){
    document.getElementById('resultado_1').remove();
    document.getElementById('resultado_2').remove();
    document.getElementById('cantidad').value = 0;

}

document.addEventListener("DOMContentLoaded", () => {
    document.querySelector("#btn_clear").addEventListener("click",clearing);
});

document.addEventListener("DOMContentLoaded", () => {
    document.querySelector("#btn_select").addEventListener("click",ver_log);
});