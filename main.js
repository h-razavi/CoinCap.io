
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

//DOM manipulation
let dataContainer = document.querySelector('.table');
function renderTable(rank,name,symbol,price,cap,vwap,supply,volume,change){
    let tableRow = document.createElement('div');
    tableRow.classList.add('table-row');

    let rankCell = document.createElement('div');
    rankCell.classList.add('table-center-align');
    rankCell.classList.add('table-item');
    rankCell.textContent = rank;

    let nameCell = document.createElement('div');
    nameCell.classList.add('table-left-align');
    nameCell.classList.add('table-item');
    nameCell.classList.add('name-col');
    let addLink = document.createElement('a');
    addLink.setAttribute('href','#');
    addLink.textContent= name;
    let short = document.createElement('p');
    short.classList.add('coin-sym');
    short.textContent= symbol;
    addLink.appendChild(short);
    nameCell.appendChild(addLink);

    let priceCell = document.createElement('div');
    priceCell.classList.add('table-item');
    priceCell.textContent = numeral(price).format('$0,0.00');

    let capCell = document.createElement('div');
    capCell.classList.add('table-item');
    capCell.textContent = numeral(cap).format('$0,0.00a');

    let vwapCell = document.createElement('div');
    vwapCell.classList.add('table-item');
    vwapCell.textContent = numeral(vwap).format('$0,0.00a');

    let supplyCell = document.createElement('div');
    supplyCell.classList.add('table-item');
    supplyCell.textContent = numeral(supply).format('0,0.00a');

    let volumeCell = document.createElement('div');
    volumeCell.classList.add('table-item');
    volumeCell.textContent = numeral(volume).format('$0,0.00a');

    let changeCell = document.createElement('div');
    changeCell.classList.add('table-item');
    changeCell.textContent = Math.round(change*100)/100 + '%';

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

//Settings modal
let settings = document.querySelector('.settings');
settings.addEventListener('click',function(){
    let settingsModal = document.querySelector('.settings-modal');
    settingsModal.classList.remove('hide');
    settingsModal.classList.add('show');
    let container = document.querySelectorAll('.container');
    container.forEach(function(item){
        item.classList.add('blur');
    })
    let body = document.querySelector('body');
    body.style.position = 'fixed';
    body.style.width = '100%';
})

let closeSettings = document.querySelector('.close-button');
closeSettings.addEventListener('click',function(){
    let settingsModal = document.querySelector('.settings-modal');
    settingsModal.classList.remove('show');
    settingsModal.classList.add('hide');
    let container = document.querySelectorAll('.container');
    container.forEach(function(item){
        item.classList.remove('blur');
    })
    let body = document.querySelector('body');
    body.style.position = '';
    body.style.width = '';
})


