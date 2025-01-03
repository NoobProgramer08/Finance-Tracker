const signUpBtn = document.querySelector("#signup");
const logInBtn = document.querySelector("#signin");
const email = document.querySelector("#email");
const password = document.querySelector("#password");
const userImage = document.querySelector("#userprofile");
let gender = "";


signUpBtn.addEventListener("click",transferToRegister);
logInBtn.addEventListener("click",validateAccount);


console.log(window.location.pathname);
function transferToRegister(e){
    e.preventDefault();
    window.location = "/Finance-Tracker/docs/app/Form/registration.html";

}

function validateAccount(e){
    e.preventDefault();
    let found = false, inactive = false;
    

    const users = localStorage.getItem("User");
    const convert = JSON.parse(users);

    if(email.value == "ADMIN" && password.value == "pass"){
        Swal.fire({
            icon: "success",
            title: "Welcome Admin!!!",
            text: "You can now manage users!",
            confirmButton:"Okay"
        }).then((response) => {
            if(response.isConfirmed){
                transferToAdmin(e);

            }
        })
       
        return;
    }

    
    if(email.value == "" || password.value == ""){
        Swal.fire({
            icon: "error",
            title: "Oops!!!",
            text: "Account not found!",
        
        })
        return;
}
    
    convert.forEach((user) => {
        if(user.email == email.value && user.password ==  password.value){      
            if(user.status == "Inactive"){
                inactive = true;
    
             }

        }
    });

    if(inactive){
        console.log(inactive);
        Swal.fire({
            icon: "error",
            title: "Oops!!!",
            text: "Account Inactive Please contact the admin",
            confirmButton:"Okay"
        }).then((response) => {
            if(response.isConfirmed){
                return;
            }
        });

    }else{
        convert.forEach(user =>{
    
            if(user.email == email.value && user.password ==  password.value){        
               found = true;
               gender = user.gender;
        
                
            }
        
            });
            if(found){
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
        
            }else{
                Swal.fire({
                    icon: "error",
                    title: "Oops!!!",
                    text: "Account not found Please Register",
                    confirmButton:"Okay"
                })
        
            }
        
         

    }


   

   

    

   
}

function transferToClient(e){
    let loggedIn = [{
        username:email.value,
        password:password.value,
        gender:gender
    }];
    e.preventDefault();
    localStorage.setItem("LoggedIn",JSON.stringify(loggedIn));
    window.location = "/Finance-Tracker/docs/app/Client-DashBoard/main.html";

}
function transferToAdmin(e){
    e.preventDefault();
    window.location = "/Finance-Tracker/docs/app/Admin-Dashboard/main.html";
}



