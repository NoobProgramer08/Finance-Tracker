

loadTable();
function loadTable(){
const getLoggedIn = localStorage.getItem("LoggedIn");
const expenses = localStorage.getItem("History");
const current = localStorage.getItem("UserIncome");
const spends = document.querySelector("#spend");
const saves = document.querySelector("#savings");
const balances = document.querySelector("#balance");
const canvas = document.querySelector("#myCanvas");
const bar = document.querySelector("#myLineChart")
const parseUser = JSON.parse(getLoggedIn);
const parsedExpenses = JSON.parse(expenses);
const parsedCurrent = JSON.parse(current);
let totalSaved = 0,  totalSpend = 0, balance = 0;



let spend = [] , saved = [];
let username = "", pass = "";

parseUser.forEach((user) => {
    username = user.username;
    pass = user.password;
});



parsedExpenses.forEach((item) => {
    if(item.username == username && item.pass == pass){
        if(item.type == "Balance"){
          saved.push(item);

        }
        if(item.type == "Expenses"){
          spend.push(item);

        }


    }

});

saved.forEach((item) => {
    totalSaved += Number(item.expenses);

});
spend.forEach((item) => {
    totalSpend += Number(item.expenses);
});
parsedCurrent.forEach((item) => {
     if(item.username == username && item.pass == pass){
         balance += Number(item.balance);
     
     }
   
});
console.log(balance);
spends.innerHTML = totalSpend;
saves.innerHTML = totalSaved;

if(balance == 0){
  balances.innerHTML = "0";
}else{
  balances.innerHTML = balance;
}


const data = {
  
  labels: [
   
    'Total Expenses',
    'Total Saved',
    'Total Remaining Balance'
  ],
  datasets: [{
    label: 'Amount',
    data: [totalSpend,totalSaved,balance],
    backgroundColor: [
      'rgb(255, 99, 132)',
      'rgb(54, 162, 235)',
      'rgb(0,255,127)'
     
    ],
    hoverOffset: 4
  }]
};


const myChart = new Chart(canvas, {
    type: 'doughnut',
    data:data
  });






}
