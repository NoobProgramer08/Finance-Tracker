const nUser = document.querySelector("#newUser").value;
const nPass = document.querySelector("#newPassword").value;
const birthDate = document.querySelector("#bDay").value;
const gmail = document.querySelector("#email").value;
const cpNum = document.querySelector("#phoneNum").value;
const maleCheckbox = document.querySelector("#maleCheck");
const femaleCheckbox = document.querySelector("#femaleCheck");
const rButton = document.querySelector("#register");
var users = [];

rButton.addEventListener("click", addUser);

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

const parsed = JSON.parse(localStorage.getItem("accounts"));

console.log("Parsed" + parsed);
