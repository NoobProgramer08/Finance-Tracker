// Get modal elements



document.addEventListener('DOMContentLoaded', ()=>{
    
findUser();
loadModals();
loadMetrics();






})


function logOut(){
    Swal.fire({
        title: "Are you sure?",
        text: "Do you want to exit?!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Confirm"
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: "Success",
            text: "Thank you!!",
            icon: "success"
          }).then((swal) => {
            localStorage.removeItem("LoggedIn");
            window.location = "/Finance-Tracker/docs/app/Form/login.html";
          });
        }
        
        
      });

   

}


function findUser(){
    let userEmail = "", userPass = "",gender = "";
    const userGender = document.querySelector("#userGender");
    const getLoggedIin  = localStorage.getItem("LoggedIn");
    const getUsers = localStorage.getItem("User");
    const parseLoggedIn = JSON.parse(getLoggedIin);
    const parseUsers = JSON.parse(getUsers);

    parseLoggedIn.forEach((user) => {
         userEmail = user.username,
         userPass = user.password,
         gender = user.gender
    });
        
    if(gender == "Male"){
        userGender.src = "assets/icons/user-profile/man.png";


    }else{
        userGender.src = "assets/icons/user-profile/woman.png"
    }



    changeUsername(userEmail,userPass,parseUsers);

}



function changeUsername(email,pass,users){
  
    let firstName = "";

    users.forEach((user) =>{
        if(user.email == email && user.password == pass){
             firstName = user.firstname;

     
    
        }
          
    });

    greetUser(firstName);
    



}

function greetUser(firstname){
    document.querySelector("#firstname").innerHTML = firstname;


}





function loadModals(){
const incomeModal = document.getElementById('incomeModal');
const expenseModal = document.getElementById('expenseModal');
const addIncomeBtn = document.getElementById('addInc');
const addExpenseBtn = document.getElementById('addExp');
const closeBtns = document.querySelectorAll('.close-btn');
const exitButton = document.querySelector("#exit");




exitButton.addEventListener("click",logOut);


// Show modals
addIncomeBtn.onclick = () => {
    incomeModal.style.display = 'block';
    document.getElementById('incomeAmount').focus();
};

addExpenseBtn.onclick = () => {
    expenseModal.style.display = 'block';
    document.getElementById('expenseAmount').focus();
};

// Close modals
closeBtns.forEach(btn => {
    btn.onclick = function() {
        incomeModal.style.display = 'none';
        expenseModal.style.display = 'none';
    };
});

// Close modal when clicking outside
window.onclick = (event) => {
    if (event.target == incomeModal) {
        incomeModal.style.display = 'none';
    }
    if (event.target == expenseModal) {
        expenseModal.style.display = 'none';
    }
};
}
// Handle form submissions
function handleIncome() {
    console.log("Income");
    const budgetEntry = document.querySelector("#budgetEntry");
    const incomeAmount = document.querySelector("#incomeAmount");
    const modal = document.querySelector("#incomeModal");
    let previousTransactions = [];


//*Handles previous income
    if(localStorage.getItem("UserIncome") != null){
       const getItems = localStorage.getItem("UserIncome");
       const convert = JSON.parse(getItems);
      
       convert.forEach((items) => {
          previousTransactions.push(items);
       });


    }

   

    let userEmail = "", userPass = "";
    const getLoggedIin  = localStorage.getItem("LoggedIn");
    const getUsers = localStorage.getItem("User");
    const parseLoggedIn = JSON.parse(getLoggedIin);
    

    //*gtes username and password
    parseLoggedIn.forEach((user) => {
         userEmail = user.username,
        userPass = user.password
    })


    //new balance for UserIncome

    let userBalances = 
        {
            username:userEmail,
            pass:userPass,
            balance:incomeAmount.value,
        };


    let pushIng = [];
    let push = {
        username:userEmail,
        pass:userPass,
        expenses:incomeAmount.value,
        type:"Balance",
    }




    pushIng.push(push);

   if(localStorage.getItem("History") != null){
      const history = localStorage.getItem("History");
      const parsedHist = JSON.parse(history);

      if(parsedHist.length == undefined){
        pushIng.push(parsedHist);
    

    }else{
        parsedHist.forEach((item) => {
            pushIng.push(item);
        });
      }



   }

   const lBudgetEntry = {
    username:userEmail,
    pass:userPass,
    amount:incomeAmount.value
 }

 let latestBudgetEntry = [];

 
latestBudgetEntry.push(lBudgetEntry);

localStorage.setItem("LatestBudget",JSON.stringify(latestBudgetEntry));
const getBudget = localStorage.getItem("LatestBudget");
const parseBudget = JSON.parse(getBudget);
let amount = 0;

parseBudget.forEach((item) => {
    amount = item.amount;

});

 budgetEntry.innerHTML = amount;

   
   

 
 
    localStorage.setItem("History",JSON.stringify(pushIng))

    previousTransactions.push(userBalances);
  
   localStorage.setItem("UserIncome",JSON.stringify(previousTransactions));

   incomeAmount.value = "";
   modal.style.display = "none";
   loadMetrics();
   
}


function handleExpense() {
   
  
    const expenses = document.querySelector("#expenses");
    let totalBudget = 0;
    const modal = document.querySelector("#expenseModal");
    const expenseAmount = document.querySelector("#expenseAmount");

    let previousTransactions = [];



    if(localStorage.getItem("UserExpenses") != null){
       const getItems = localStorage.getItem("UserExpenses");
       const convert = JSON.parse(getItems);

       convert.forEach((items) => {
          previousTransactions.push(items);
       });


    }


    let userEmail = "", userPass = "";
    const getLoggedIin  = localStorage.getItem("LoggedIn");
    const getUsers = localStorage.getItem("User");
    const parseLoggedIn = JSON.parse(getLoggedIin);

 

    parseLoggedIn.forEach((user) => {
         userEmail = user.username,
         userPass = user.password
    });

    const getBalances = localStorage.getItem("UserIncome");
    const parseBalance = JSON.parse(getBalances);

    
    
    parseBalance.forEach((item) => {
        let amount = Number(item.balance);
        
        if(item.username == userEmail && item.pass == userPass ){
            totalBudget += amount;
        }
        
    });
    
    const withDeduction = totalBudget - Number(expenseAmount.value);
    
    


    let updated = [];
    let update = {
        username:userEmail,
        pass:userPass,
        balance:withDeduction
    }


    updated.push(update);

    let toPush = [];
    let pushes = {
        username:userEmail,
        pass:userPass,
        expenses:expenseAmount.value,
        type:"Expenses"
    }
    toPush.push(pushes);

    if(localStorage.getItem("History") != null){
        
        const get = localStorage.getItem("History");
        const parsed = JSON.parse(get);

        if(parsed.length == undefined){
            toPush.push(pushes);
        }else{
            parsed.forEach((item) => {
                toPush.push(item);
            })
        }


    }
      
        localStorage.setItem("History",JSON.stringify(toPush));
        

        

parseBalance.forEach((item) => {

    if(!item.username == userEmail && !item.password == userPass){
        updated.push(item);

    }
        
}); 

localStorage.setItem("UserIncome",JSON.stringify(updated));
        
        


    expenseAmount.value = "";
    modal.style.display = "none";

    loadMetrics();
}

// Handle Enter key press
document.getElementById('incomeAmount').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        handleIncome();
    }
});

document.getElementById('expenseAmount').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        handleExpense();
    }
});



function loadMetrics(){
try{
    const budget = document.querySelector("#budget");  
    const budgetEntry = document.querySelector("#budgetEntry");
    const expenses = document.querySelector("#expenses");
    let totalBudget = 0, totalEntry = 0, totalExpenses = 0;
    let userEmail = "", userPass = "";
    const getLoggedIin  = localStorage.getItem("LoggedIn");
    const getUsers = localStorage.getItem("User");
    const parseLoggedIn = JSON.parse(getLoggedIin);
    const parseUsers = JSON.parse(getUsers);
 


    

    parseLoggedIn.forEach((user) => {
         userEmail = user.username,
         userPass = user.password
    })
    
    if(localStorage.getItem("UserIncome") != null){

        const getBalances = localStorage.getItem("UserIncome");
        const parseBalance = JSON.parse(getBalances);
        let userCount = 0;

    
        parseBalance.forEach((item) => {
            let amount = Number(item.balance);
          
            if(item.username == userEmail && item.pass == userPass ){
                totalBudget += amount;
                userCount++;


            }
            
        });


    budget.innerHTML = "$"+totalBudget;
   
    }

//Amount of budget

const getBudget = localStorage.getItem("LatestBudget");
const parseBudget = JSON.parse(getBudget);
let amount = 0;

parseBudget.forEach((item) => {
    amount = item.amount;

});

        budgetEntry.innerHTML = "$"+amount;

 //Amount of expense

    const user = localStorage.getItem("LatestExpenses");
    const parse = JSON.parse(user);
    let amounts = 0;
        
    parse.forEach((item) => {
        amounts = item.amount; 
        });

        console.log(amount);
        console.log(amounts);
    
        expenses.innerHTML = "$"+amounts;


   
}catch(error){
    console.log(error);
    console.log("error");
}
   
   
}



