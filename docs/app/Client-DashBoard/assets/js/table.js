

function readTable(){

const table = document.querySelector(".datas");
const expenses = localStorage.getItem("History");
const convertExpenses = JSON.parse(expenses);


const loggedHistory = localStorage.getItem("LoggedIn")
const parse = JSON.parse(loggedHistory);

let username = "", pass = "";

parse.forEach((element) => {
    username = element.username;
    pass = element.password;
})

convertExpenses.forEach((data) =>{

    if(data.username  == username && data.pass == pass){
        let newData1 =  document.createElement("td");
        let newData2 =  document.createElement("td");
        let newData3 =  document.createElement("td");
        const row = document.createElement("tr");
        
        newData1.innerHTML = "01/03/2005";
        newData2.innerHTML = data.expenses;
        newData3.innerHTML = data.type;
        
        row.appendChild(newData1);
        row.appendChild(newData2);
        row.appendChild(newData3);
    
        table.appendChild(row);
    

    }
});

convertSavings.forEach((data) =>{


 if(data.username  == username && data.pass == pass){
    let newData1 =  document.createElement("td");
    let newData2 =  document.createElement("td");
    let newData3 =  document.createElement("td");
 
    const row = document.createElement("tr");
    
    newData1.innerHTML = "01/03/2005";
    newData2.innerHTML = data.balance;
    newData3.innerHTML = "Savings";
    
    row.appendChild(newData1);
    row.appendChild(newData2);
    row.appendChild(newData3);

    table.appendChild(row);




 }

   
});







}
