const getStarted = document.querySelector("#getStarted");

getStarted.addEventListener("click", transferToForm);

function transferToForm() {
  window.location.pathname =
    "/Habit-Tracker-System/Architecture/app/Form/index.html";
}
