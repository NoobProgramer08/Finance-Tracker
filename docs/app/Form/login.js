const signUpBtn = document.querySelector("#signup");
const logInBtn = document.querySelector("#signin");
const email = document.querySelector("#email");
const password = document.querySelector("#password");

signUpBtn.addEventListener("click",transferToRegister);
logInBtn.addEventListener("click",validateAccount);

function transferToRegister(e){
    e.preventDefault();
    window.location = "/Habit-Tracker-System/docs/app/Form/registration.html";

}

function validateAccount(e){
    e.preventDefault();
    let found = false;
   
    const users = localStorage.getItem("User");
    const convert = JSON.parse(users);
    
    if(email.value == "" || password.value == ""){
        Swal.fire({
            icon: "error",
            title: "Oops!!!",
            text: "Please dont leave any blank inputs",
          })
          return;

  }
    convert.forEach(user =>{
     if(user.email == email.value && user.password ==  password.value){        
        found = true;

        Swal.fire({

        title:"You are logged in",
        text:"Successfully logged in!!!",
        icon:"success",
        confirmButton:'Okay',
        confirmButtonText:"Ok",

         })
         
         
       }
     });

     if(!found){
        Swal.fire({
            icon: "error",
            title: "Oops!!!",
            text: "Account not found",
          })


     }
         
      
}

function transferToClient(e){
    e.preventDefault();
    window.location = "/Habit-Tracker-System/docs/app/Client-DashBoard/pages/main.html";
}




