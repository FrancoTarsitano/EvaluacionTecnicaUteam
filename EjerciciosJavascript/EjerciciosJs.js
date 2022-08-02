const clients = [{
    id: 1,
    taxNumber: '86620855',
    name: 'HECTOR ACUÑA BOLAÑOS'
},
{
    id: 2,
    taxNumber: '73178550',
    name: 'JESUS RODRIGUEZ ALVAREZ'
},
{
    id: 3,
    taxNumber: '73826497',
    name: 'ANDRES NADAL MOLINA'
},
{
    id: 4,
    taxNumber: '88587715',
    name: 'SALVADOR ARNEDO MANRIQUEZ'
},
{
    id: 5,
    taxNumber: '94020190',
    name: 'VICTOR MANUEL ROJAS LUCAS'
},
{
    id: 6,
    taxNumber: '99804238',
    name: 'MOHAMED FERRE SAMPER'
}
];
const accounts = [{
    clientId: 6,
    bankId: 1,
    balance: 15000
},
{
    clientId: 1,
    bankId: 3,
    balance: 18000
},
{
    clientId: 5,
    bankId: 3,
    balance: 135000
},
{
    clientId: 2,
    bankId: 2,
    balance: 5600
},
{
    clientId: 3,
    bankId: 1,
    balance: 23000
},
{
    clientId: 5,
    bankId: 2,
    balance: 15000
},
{
    clientId: 3,
    bankId: 3,
    balance: 45900
},
{
    clientId: 2,
    bankId: 3,
    balance: 19000
},
{
    clientId: 4,
    bankId: 3,
    balance: 51000
},
{
    clientId: 5,
    bankId: 1,
    balance: 89000
},
{
    clientId: 1,
    bankId: 2,
    balance: 1600
},
{
    clientId: 5,
    bankId: 3,
    balance: 37500
},
{
    clientId: 6,
    bankId: 1,
    balance: 19200
},
{
    clientId: 2,
    bankId: 3,
    balance: 10000
},
{
    clientId: 3,
    bankId: 2,
    balance: 5400
},
{
    clientId: 3,
    bankId: 1,
    balance: 9000
},
{
    clientId: 4,
    bankId: 3,
    balance: 13500
},
{
    clientId: 2,
    bankId: 1,
    balance: 38200
},
{
    clientId: 5,
    bankId: 2,
    balance: 17000
},
{
    clientId: 1,
    bankId: 3,
    balance: 1000
},
{
    clientId: 5,
    bankId: 2,
    balance: 600
},
{
    clientId: 6,
    bankId: 1,
    balance: 16200
},
{
    clientId: 2,
    bankId: 2,
    balance: 10000
}
]
const banks = [{
    id: 1,
    name: 'SANTANDER'
},
{
    id: 2,
    name: 'CHILE'
},
{
    id: 3,
    name: 'ESTADO'
}
];

/*
SECCIÓN PROBLEMAS
- Las siguientes son preguntas básicas de Javascript y manejo de datos. Se evaluará eficiencia, ORDEN y claridad del código entregado.
- Se debe programar un algoritmo para cada método y que este retorne lo requerido.
- Debe usar nombres explicativos para sus variables.
- Usar sintaxis ES6.
*/

// 0 Arreglo con los ids de clientes
function listClientsIds(){
return clients.map(client => client.id);
};
// 1 Arreglo con los ids de clientes ordenados por rut
function listClientsIdsSortByTaxNumber(){
let orderedClientsByID = [];  
orderedClientsByID = clients.sort(function(clientA,clientB){return clientB.taxNumber - clientA.taxNumber});
return orderedClientsByID.map(client => client.id);
};
// 2 Arreglo con los nombres de cliente ordenados de mayor a menor por la suma TOTAL de los saldos de cada cliente en los bancos que participa.
function sortClientsTotalBalances(){
//Arreglo para los balances totales de los clientes
let clientsTotalBalances = [];
clientsTotalBalances = clients.map(client => ({
    id: client.id,
    name: client.name,
    total : 0
  }));
//Calculo para acumular los balances totales de los clientes   
clientsTotalBalances.forEach(item => {
    item.total = accounts.filter((clientAccount) => clientAccount.clientId === item.id)
                         .reduce((total, accounts) => total + accounts.balance,0);
});
//Ordenar los clientes de mayor a menor acorde a su balance total
clientsTotalBalances = clientsTotalBalances.sort(function(clientA,clientB){return clientB.total - clientA.total});
//Devolver el arreglo con solo los nombres de los clientes
return clientsTotalBalances.map(client => client.name); 
};
// 3 Objeto en que las claves sean los nombres de los bancos y los valores un arreglo con los ruts de sus clientes ordenados alfabeticamente por nombre.

function banksClientsTaxNumbers(){

//Eliminar las cuentas de clientes que participan en el mismo banco
let accountsSinRepetidos = accounts.filter((account, index, array) => array.findIndex(a => a.clientId == account.clientId && a.bankId == account.bankId) == index);

let bankClientTN = [];
let bankValue = [];
let bankKey = "";

//Array de clientes ordenados por nombre, para luego obtener sus ruts
let orderedClientsByName = clients.sort(function (a, b) {
    return ('' + a.name).localeCompare(b.name);
})
//Obtencion de nombres para las keys y ruts para los values
banks.forEach(bank => {
    bankKey = bank.name;
    orderedClientsByName.forEach(client=> {
        accountsSinRepetidos.forEach(account=> {
            if (bank.id == account.bankId && client.id == account.clientId) {     
                bankValue.push(client.taxNumber);  
            }
        });
    });
   
    bankClientTN.push(bankKey,bankValue);
    bankValue = [];
});

return bankClientTN;
};
// 4 Arreglo ordenado decrecientemente con los saldos de clientes que tengan más de 25.000 en el Banco SANTANDER
function richClientsBalances(){
  
//Array donde se calcula el balance total que tienen los clientes en los bancos respectivos
let totalClientBalancesPerBank = [{
    clientId: 0,
    bankId: 0,
    balance: 0
}];

let result = [...accounts.reduce((r, o) => {
    const key = o.clientId + '-' + o.bankId;
const item = r.get(key) || Object.assign({}, o, {
    balance: 0,
});
    item.balance += o.balance;
    return r.set(key, item);
}, new Map).values()];

totalClientBalancesPerBank = Array.from(result.values());
//array de los clientes que tienen mas de 25000 en el banco Santander
let richClients = totalClientBalancesPerBank.filter(acc => acc.balance > 25000 && acc.bankId === 1);;  
//ordenado decreciemente
return richClients.sort(function(clientA,clientB){return clientB.balance - clientA.balance});
};
// 5 Arreglo con ids de bancos ordenados crecientemente por la cantidad TOTAL de dinero que administran.
function banksRankingByTotalBalance(){
let bankRanking = banks.map(bank => ({
    id: bank.id,
    totalBalance: 0 
}));  
bankRanking.forEach(item => {
    item.totalBalance = accounts.filter((clientAccount) => clientAccount.bankId === item.id)
                                .reduce((total, accounts) => total + accounts.balance,0);
});
bankRanking = bankRanking.sort(function(bankA,bankB){return bankA.totalBalance - bankB.totalBalance});
return bankRanking.map(bank => bank.id);
};
// 6 Objeto en que las claves sean los nombres de los bancos y los valores el número de clientes que solo tengan cuentas en ese banco.
function banksFidelity(){
//Eliminar las cuentas de clientes que participan en el mismo banco
let accountsSinRepetidos = accounts.filter((account, index, array) => array.findIndex(a => a.clientId == account.clientId && a.bankId == account.bankId) == index);
//KeyValuePair donde las keys son los ids de clientes y los values la cantidad de bancos diferentes donde tiene cuentas
const clientsCounter = {};
for (const client of accountsSinRepetidos) {
    clientsCounter[client.clientId] = clientsCounter[client.clientId] ? clientsCounter[client.clientId] + 1 : 1;  
}

//Ids de los clientes leales a un banco
let loyalClientIds = [];
let i = 0;
for (const [key, value] of Object.entries(clientsCounter)) { 
    if (value === 1){
        loyalClientIds[i] = key;
        i += 1;
    } 
  }

//Bancos con su cantidad de clientes leales al mismo  
let banksWithLoyalClients = [];
let loyalClientsPerBank = [];
let value = 0;
let key = "";
let keyValue = {};
for (let i = 0; i < loyalClientIds.length; i++) {
    for (let j = 0; j < accountsSinRepetidos.length; j++) {
        if (loyalClientIds[i] == accountsSinRepetidos[j].clientId){        
            banksWithLoyalClients[i] = accountsSinRepetidos[j].bankId;
            let bankName = banks.filter(element => element.id == accountsSinRepetidos[j].bankId);
            value = loyalClientsPerBank[accountsSinRepetidos[j].bankId] ? loyalClientsPerBank[accountsSinRepetidos[j].bankId] + 1 : 1; 
            key = bankName[0].name; 
            keyValue = {key: key, value: value};
            loyalClientsPerBank.push(keyValue);             
        } 
    }  
}
//Bancos sin clientes leales
for (let i = 0; i < banks.length; i++) {
    if (banksWithLoyalClients.indexOf(banks[i].id) == -1){
        key = banks[i].name;
        value = 0;
        keyValue = {key: key, value: value};
        loyalClientsPerBank.push(keyValue); 
    }        
}
 return loyalClientsPerBank;
};
// 7 Objeto en que las claves sean los nombres de los bancos y los valores el id de su cliente con menos dinero.
function banksPoorClients(){

//Array donde se calcula el balance total que tienen los clientes en los bancos respectivos
let totalClientBalancesPerBank = [{
    clientId: 0,
    bankId: 0,
    balance: 0
}];

let result = [...accounts.reduce((r, o) => {
    const key = o.clientId + '-' + o.bankId;
const item = r.get(key) || Object.assign({}, o, {
    balance: 0,
});
    item.balance += o.balance;
    return r.set(key, item);
}, new Map).values()];

totalClientBalancesPerBank = Array.from(result.values());

//Array donde se contarán el cliente mas pobre de cada banco
let poorClients = [];
let value = 0;
let key = "";
let keyValue = {};

banks.forEach(bank => {
let poorestClient = Math.max(...totalClientBalancesPerBank.map(o => o.balance));  
totalClientBalancesPerBank.forEach(b=> {
    if (bank.id == b.bankId && poorestClient > b.balance) {     
        poorestClient = b.balance;
        key = bank.name;
        value = b.clientId;
        keyValue = {key: key, value: value}; 
    }
});
poorClients.push(keyValue)  
});
return poorClients;
}
// 8 Agregar nuevo cliente con datos ficticios a "clientes" y agregar una cuenta en el BANCO ESTADO con un saldo de 9000 para este nuevo empleado. 
// Luego devolver el lugar que ocupa este cliente en el ranking de la pregunta 2.
function newClientRanking(){
//Obtengo el banco Estado, para luego poder acceder a su ID
let bankEstadoId = banks.filter(bank => bank.name == "ESTADO")

//Ordenar los clientes por ID, luego obtener el ultimo para luego acceder a su ID
let lastClientId = clients.sort(function(clientA,clientB){return clientA.id - clientB.id}).slice(-1);

//Agrego datos ficticios
clients.push({id: lastClientId[0].id + 1, taxNumber: '83630521', name: "MARIA JULIA GONZALES" });
accounts.push({clientId: 7, bankId: bankEstadoId.id, balance: 9000});

//Nuevo ranking de clientes (de la pregunta 2) para ver luego el lugar que este ocupa
let newRanking = sortClientsTotalBalances();

return newRanking.findIndex(c=> c == "MARIA JULIA GONZALES") + 1;
}




//Impresión de soluciones. No modificar.
//console.log('Pregunta 0');
//console.log(listClientsIds());
//console.log('Pregunta 1');
//console.log(listClientsIdsSortByTaxNumber());
//console.log('Pregunta 2');
//console.log(sortClientsTotalBalances());
//console.log('Pregunta 3');
//console.log(banksClientsTaxNumbers());
//console.log('Pregunta 4');
//console.log(richClientsBalances());
//console.log('Pregunta 5');
//console.log(banksRankingByTotalBalance());
//console.log('Pregunta 6');
//console.log(banksFidelity());
//console.log('Pregunta 7');
//console.log(banksPoorClients());
//console.log('Pregunta 8');
//console.log(newClientRanking());  
