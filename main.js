//fetch data
let data = [];
function getTableData(){
    return fetch("https://api.coincap.io/v2/assets")
    .then(function(res){
        return res.json();
    }).then(function(assets){
        data=assets.data
        return data;
    })
}
//Num abbreviation



//DOM manipulation
let dataContainer = document.querySelector('tbody');
function renderTable(rank,name,symbol,price,cap,vwap,supply,volume,change){
    let tableRow = document.createElement('tr');

    let rankCell = document.createElement('td');
    rankCell.classList.add('table-center-align');
    rankCell.textContent = rank;

    let nameCell = document.createElement('td');
    nameCell.classList.add('table-left-align');
    nameCell.setAttribute('colspan','2');
    let addLink = document.createElement('a');
    addLink.setAttribute('href','#');
    addLink.textContent= name;
    let short = document.createElement('p');
    short.classList.add('coin-sym');
    short.textContent= symbol;
    addLink.appendChild(short);
    nameCell.appendChild(addLink);

    let priceCell = document.createElement('td');
    priceCell.textContent = '$'+Math.round(price*100)/100;

    let capCell = document.createElement('td');
    capCell.textContent = '$'+Math.round(cap*100)/100;

    let vwapCell = document.createElement('td');
    vwapCell.textContent = '$'+Math.round(vwap*100)/100;

    let supplyCell = document.createElement('td');
    supplyCell.textContent = Math.round(supply*100)/100;

    let volumeCell = document.createElement('td');
    volumeCell.textContent = '$'+Math.round(volume*100)/100;

    let changeCell = document.createElement('td');
    changeCell.textContent = '%'+Math.round(change*100)/100;

    tableRow.appendChild(rankCell);
    tableRow.appendChild(nameCell);
    tableRow.appendChild(priceCell);
    tableRow.appendChild(capCell);
    tableRow.appendChild(vwapCell);
    tableRow.appendChild(supplyCell);
    tableRow.appendChild(volumeCell);
    tableRow.appendChild(changeCell);


    dataContainer.appendChild(tableRow);
}


function importTable(table){
    table.forEach(function (item){
        renderTable(item.rank,item.name,item.symbol,item.priceUsd,item.marketCapUsd,item.vwap24Hr,item.supply,item.volumeUsd24Hr,item.changePercent24Hr);
    })
}

getTableData().then(function(){
    importTable(data);
})








