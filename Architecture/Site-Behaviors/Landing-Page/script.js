const toAbout = document.querySelector("#linkToAbout");
const about = document.querySelector(".about-product");

toAbout.addEventListener("click", (e) => {
  e.preventDefault;
  about.focus();
});
