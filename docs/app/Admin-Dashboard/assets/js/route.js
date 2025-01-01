const insert = document.querySelector(".content");

const route = ((event) => {
    event.preventDefault();
    event = event||window.event;
    const targetPath = event.target.getAttribute("href");
    window.history.pushState({},"",targetPath);
    handleLocation();

});

const routes = {
    "/metric":"Habit-Tracker-System/docs/app/Admin-Dashboard/assets/pages/metrics.html",
    "/users":"Habit-Tracker-System/docs/app/Admin-Dashboard/assets/pages/users.html",

}
const handleLocation =  async() => {
    const path = window.location.pathname;
    const route = routes[path] || routes[404];
    const content = await fetch(route).then((data) => data.text());
    insert.innerHTML = content;
}


window.onpopstate = route;
window.route = route;
