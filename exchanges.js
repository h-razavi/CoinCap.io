
//fetch data
let data = [];
function getTableData(){
    return fetch("https://api.coincap.io/v2/exchanges")
    .then(function(res){
        return res.json();
    }).then(function(exchanges){
        data=exchanges.data
        return data;
    })
}

//DOM manipulation
let dataContainer = document.querySelector('.table');
function renderTable(rank,name,trading,top,volume,total){
    let tableRow = document.createElement('div');
    tableRow.classList.add('table-row');

    let rankCell = document.createElement('div');
    rankCell.classList.add('table-center-align');
    rankCell.classList.add('table-item');
    rankCell.textContent = rank;

    let nameCell = document.createElement('div');
    nameCell.classList.add('table-left-align');
    nameCell.classList.add('table-item');
    nameCell.textContent= name;

    let tradingCell = document.createElement('div');
    tradingCell.classList.add('table-item');
    tradingCell.textContent = numeral(trading).format(0,0);

    let topCell = document.createElement('div');
    topCell.classList.add('table-item');
    topCell.textContent = top;

    let volumeCell = document.createElement('div');
    volumeCell.classList.add('table-item');
    volumeCell.textContent = numeral(volume).format('$0,0.00a');

    let totalCell = document.createElement('div');
    totalCell.classList.add('table-item');
    totalCell.textContent = Math.round(total*100)/100 + '%';

    let statusCell = document.createElement('div');
    statusCell.classList.add('table-item');
    statusCell.classList.add('table-center-align');
    statusCell.classList.add('status');
    statusCell.innerHTML = "&#11044";

    tableRow.appendChild(rankCell);
    tableRow.appendChild(nameCell);
    tableRow.appendChild(tradingCell);
    tableRow.appendChild(topCell);
    tableRow.appendChild(volumeCell);
    tableRow.appendChild(totalCell);
    tableRow.appendChild(statusCell);


    dataContainer.appendChild(tableRow);
}


function importTable(table){
    table.forEach(function (item){
        renderTable(item.rank,item.name,item.tradingPairs,item.id,item.volumeUsd,item.percentTotalVolume);
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



