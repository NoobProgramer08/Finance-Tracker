const username = document.querySelector("#name");
const email = document.querySelector("#email");
const pass = document.querySelector("#password");
const agree = document.querySelector("#agree");
const signUp = document.querySelector("#btn-1");
const parentForCheck = document.querySelector("#check-alert");
const overallAlert = document.querySelector("#alert-for-all");
const inputs = document.querySelectorAll("input");


const users = [];


signUp.addEventListener("click", (e) => {
  e.preventDefault();
  const newUser = [
    {
      name: username.value,
      email: email.value,
      password: pass.value,
      agree: agree.checked,
    },
  ];

  if (username.value == "" || email.value == "" || password.value == "") {
    const removeButton = document.createElement("button");
    
    removeButton.innerHTML = "Ok";
    removeButton.className = "btn btn-primary";
    overallAlert.className = "alert alert-primary d-flex gap-3 align-items-center justify-content-center  p-3";
    overallAlert.role = "alert";
    overallAlert.innerHTML = "Please dont leave any blank fields!!";
    overallAlert.appendChild(removeButton);

    removeButton.addEventListener("click", () => {
      removeElements(overallAlert,removeButton);
    });
    $("#alert-for-all").alert();
    return;
  }

  if (!agree.checked) {
    const removeButton = document.createElement("button");

    removeButton.innerHTML = "Ok";
    removeButton.className = "btn btn-danger";
    parentForCheck.className = "alert alert-danger d-flex gap-3 align-items-center justify-content-center p-3";
    parentForCheck.role = "alert";
    parentForCheck.innerHTML = "Please read and agree to the terms and policy!";
    parentForCheck.appendChild(removeButton);
    
    removeButton.addEventListener("click", () => {
      removeElements(parentForCheck,removeButton);
    
    });

    $("#check-alert").alert();
    return;
  }
  registerUser(newUser, e);

});

function registerUser(newUser, e) {
  e.preventDefault();
  users.push(newUser);
  localStorage.setItem("Users",JSON.stringify(users));

  clearInputs();

}

function removeElements(parentElement,removeButton){
  parentElement.value = "";
  parentElement.className = "";
  parentElement.innerHTML = "";
  agree.checked = false;

}
function clearInputs(){
  inputs.forEach(input => input.value = "");
  agree.value = "";


}




