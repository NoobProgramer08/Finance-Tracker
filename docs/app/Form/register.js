const signInBtn = document.querySelector("#signIn");
const submitBtn = document.querySelector("#submit");
const firstname = document.querySelector("#firstname");
const lastname = document.querySelector("#lastname");
const email = document.querySelector("#email");
const password = document.querySelector("#password");
const confirmPass = document.querySelector("#confirmpass");
const userGender = document.querySelector("#gender");
const allInputs = document.querySelectorAll(".input");
let users = []; 
let newUser = {};


//*Events
signInBtn.addEventListener("click",transferToLogin);
submitBtn.addEventListener("click",checkBlanks);

function transferToLogin(e){
    e.preventDefault();
    window.location = "/Habit-Tracker-System/docs/app/Form/login.html";
}

function checkBlanks(e){
    e.preventDefault();    
    let back = false;

    allInputs.forEach(input => {
    
    if(input.value == "" ){
        back = true;         

    }

    });

    if(back){
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Please dont leave blank inputs",
            });
            
        return;
    }
    
    if(confirmPass.value != password.value){
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Password and Confirm Password is not the same",
        });

        return;

    }

    registerUser(e);

}

function registerUser(e){
    e.preventDefault();


    if(localStorage.getItem("User")  != null ){
        let getUsers = localStorage.getItem("User");
        let convertBack = JSON.parse(getUsers);
        users = [];
    
        convertBack.forEach(user =>{
        users.push(user);
        }); 
        
    }

newUser = {
        firstname:firstname.value,
        lastname:lastname.value,
        email:email.value,
        password:password.value,
        gender:userGender.value,
    };

    
    users.push(newUser);
    localStorage.setItem("User",JSON.stringify(users));

    Swal.fire({
        title: "Registration Successfull",
        width: 600,
        padding: "3em",
        color: "#716add",
        background: "#fff url(/images/trees.png)",
        backdrop:`
            rgba(0,0,123,0.4)
            url("/images/nyan-cat.gif")
            left top
            no-repeat
        `
        });
    
    emptyInputs();
}

function emptyInputs(){
    allInputs.forEach(input => {
        input.value = "";
    })
}