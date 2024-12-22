const signUpBtn = document.querySelector("#signup");

signUpBtn.addEventListener("click",transferWindow);



function transferWindow(e){
    e.preventDefault();
    window.location = "/Habit-Tracker-System/docs/app/Form/registration.html";

}
