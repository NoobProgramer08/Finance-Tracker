const signUpBtn = document.querySelector("#signup");
const logInBtn = document.querySelector("#signin");
const email = document.querySelector("#email");
const password = document.querySelector("#password");
const userImage = document.querySelector("#userprofile");
let gender = "";

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

    console.log(convert);
    
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
    window.location = "/Habit-Tracker-System/docs/app/Client-DashBoard/pages/main.html";
}
function transferToAdmin(e){
    e.preventDefault();
    window.location = "/Habit-Tracker-System/docs/app/Admin-Dashboard/index.html";
}



