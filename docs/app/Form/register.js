const signInBtn = document.querySelector("#signIn");

signInBtn.addEventListener("click",transferWindow);


function transferWindow(e){
    e.preventDefault();
    window.location = "/Habit-Tracker-System/docs/app/Form/login.html";
}