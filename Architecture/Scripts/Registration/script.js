const nUser = document.querySelector("#newUser").value;
const nPass = document.querySelector("#newPassword").value;
const birthDate = document.querySelector("#bDay").value;
const gmail = document.querySelector("#email").value;
const cpNum = document.querySelector("#phoneNum").value;
const maleCheckbox = document.querySelector("#maleCheck");
const femaleCheckbox = document.querySelector("#femaleCheck");
const rButton = document.querySelector("#register");
const alreadyHave = document.querySelector("#haveAccount");
var users = [];

rButton.addEventListener("click", addUser);
alreadyHave.addEventListener("click", toForm);

function addUser(e) {
  e.preventDefault();
  registerUser(users);
}

function registerUser(users) {
  users.push({
    username: nUser,
    password: nPass,
    birthDate: birthDate,
    email: gmail,
    celnumber: cpNum,
  });

  localStorage.setItem("accounts", users);
}
function toForm() {
  window.location.pathname =
    "/Habit-Tracker-System/Architecture/app/Form/index.html";
}
