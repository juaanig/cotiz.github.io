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
            <td id="${key}-price"> ${value}</td>
            <td> ${parseInt(value-(value*0.01))}</td>
            <td> ${parseInt(value+(value*0.01))}</td>
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
    <td id="btc-price"> ${price} </td>
    <td> ${buy} </td>
    <td> ${sell} </td>
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
    <td id="eth-price"> ${price} </td>
    <td> ${buy} </td>
    <td> ${sell} </td>
    `
    document.getElementById('eth').innerHTML = grid_eth ;

}
//==============================================

//=================== USDT ======================
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
    <td id="usdt-price"> ${price} </td>
    <td> ${buy} </td>
    <td> ${sell} </td>
    `

    document.getElementById('usdt').innerHTML = grid_usdt ;
}
//==============================================


const $select = document.getElementById('coin');

const ver_log = () => {

    const indice = $select.selectedIndex;
    const opcionSeleccionada = $select.options[indice];
    
    if(indice === -1){ 
        return alert('error');
    }
    
    if(['btc','eth','usdt'].includes(opcionSeleccionada.value) ){ 

        valor_conver = parseInt(document.getElementById(`${opcionSeleccionada.value}-price`).innerHTML);
        cantidad = document.getElementById('cantidad').value ;
        total = cantidad/valor_conver;
        console.log(opcionSeleccionada.value);
        console.log(valor_conver);
        console.log(typeof(opcionSeleccionada.value));

        resultado1 = `
            <p class="mt-2 text-start " id="resultado_1">Recibiras: </p>
            <p class="mt-2 p-2 text-center border border-primary" id="resultado_1">${total}</p>
        `
        document.getElementById('result').innerHTML = resultado1;
    }else if(opcionSeleccionada.value == 'solidario'||'blue'||'ccb'||'ccl'||'mep'){ 

        valor_conver = parseInt(document.getElementById(`${opcionSeleccionada.value}-price`).innerHTML);
        cantidad = document.getElementById('cantidad').value ;
        total = (cantidad/valor_conver).toFixed(2);
        resultado = `
            <p class="mt-2 p-2 text-center border border-primary " id="resultado_1">usd ${total}</p>
        `
        console.log('dolares')
        console.log(cantidad/valor_conver)
        
        document.getElementById('result').innerHTML = resultado;
    };
    
};

const clearing = () => {
    console.log('clear')
    document.getElementById('cantidad').value = 0;
    document.getElementById('resultado_1').remove();

}

document.addEventListener("DOMContentLoaded", () => {
    document.querySelector("#btn_clear").addEventListener("click",clearing);
});

document.addEventListener("DOMContentLoaded", () => {
    document.querySelector("#btn_select").addEventListener("click",ver_log);
});
