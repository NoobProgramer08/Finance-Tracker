const username = document.querySelector("#user");
const password = document.querySelector("#pass");
const button = document.querySelector("#logIn");
const register = document.querySelector("#register");
const forgot = document.querySelector("#forgot");

button.addEventListener("click", validateInput);
register.addEventListener("click", transferRegisterWindow); 

function validateInput() {
  let user = username.value;
  let pass = password.value;
  console.log(findUser(user, pass));
  if (findUser(user, pass)) {
    alert("User found!!");
  } else {
    alert("User not found!!");
  }
}
function transferRegisterWindow() {
  window.location.pathname =
    "/Habit-Tracker-System/Architecture/app/Registration/index.html";
}
function findUser(user, pass) {
  for (let a = 0; a < sampleDate.length; a++) {
    if (sampleDate[a].username == user && sampleDate[a].password == pass) {
      return true;
    }
  }
  return false;
}
