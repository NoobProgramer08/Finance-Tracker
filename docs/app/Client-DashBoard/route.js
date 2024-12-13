const route = (event) => {
    event = event || window.event;
    event.preventDefault();
    console.log("route");
    window.history.pushState({},"",event.target.href);
    handleLocation();
}
const routes = {
    "/dashboard":"Habit-Tracker-System/docs/app/Client-DashBoard/pages/dashboard.html"
}

const handleLocation = async() =>{
    const path = window.location.pathname;
    const route = routes[path] || routes[404];
    console.log(route);
    const html = await fetch(route).then((data) => data.text());
    const location = document.querySelector(".insert");
    location.innerHTML = html;
}

window.onpopstate = handleLocation;
window.route = route;


