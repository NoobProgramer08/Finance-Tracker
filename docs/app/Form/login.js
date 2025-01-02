const signUpBtn = document.querySelector("#signup");
const logInBtn = document.querySelector("#signin");
const email = document.querySelector("#email");
const password = document.querySelector("#password");
const userImage = document.querySelector("#userprofile");


signUpBtn.addEventListener("click",transferToRegister);
logInBtn.addEventListener("click",validateAccount);

function transferToRegister(e){
    e.preventDefault();
    window.location = "/Finance-Tracker/docs/app/Form/registration.html";

}

function validateAccount(e){
    e.preventDefault();
    let found = false;

    const users = localStorage.getItem("User");
    const convert = JSON.parse(users);

    if(email.value === "ADMIN" && password.value === "pass"){
        transferToAdmin(e);
    
    }
    
    if(email.value == "" || password.value == ""){
        Swal.fire({
            icon: "error",
            title: "Oops!!!",
        
        })
        return;
}
    convert.forEach(user =>{
    if(user.email == email.value && user.password ==  password.value){        
        found = true;
        gender = user.gender;
        
        Swal.fire({

        title:"You are logged in",
        text:"Successfully logged in!!!",
        icon:"success",
        confirmButton:'Okay',
        confirmButtonText:"Ok",

        }).then((response) => {
            if(response.isConfirmed){
                transferToClient(e);
            
            }
        }); 
    }
    });

    if(!found){
        Swal.fire({
            icon: "error",
            title: "Oops!!!",
            text: "Account not found Please Register",
            confirmButton:"Okay"
        })
    }    
}

function transferToClient(e){
    e.preventDefault();
    window.location = "/Finance-Tracker/docs/app/Client-DashBoard/main.html";
}
function transferToAdmin(e){
    e.preventDefault();
    window.location = "/Finance-Tracker/docs/app/Admin-Dashboard/main.html";
}



