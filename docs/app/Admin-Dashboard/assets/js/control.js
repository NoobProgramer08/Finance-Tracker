const logOut = document.querySelector("#logOut");

logOut.addEventListener("click",logAdminOut);


function logAdminOut(e){
    e.preventDefault();
    Swal.fire({
        title: "Do you wanna proceed?",
        icon: "success",
        draggable: true,
        showCancelButton:true,
        text: "Please dont leave any blank inputs",
        confirmButtonText:"Yes log me out",
        cancelButtonText:"Cancel"
        }).then((response) => {
        if(response.isConfirmed){
            window.location = "/Finance-Tracker/docs/app/Form/login.html";
        }else{
            return;
        }
    });
    
}



