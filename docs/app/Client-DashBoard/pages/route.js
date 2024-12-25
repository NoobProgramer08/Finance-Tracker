const route = (event) => {
    event = event || window.event;
    event.preventDefault();
    window.history.pushState({},"",event.target.href);
    handleLocation();
}
const routes = {
    "/dashboard":"Habit-Tracker-System/docs/app/Client-DashBoard/pages/dashboard.html",
    "/settask":"Habit-Tracker-System/docs/app/Client-DashBoard/pages/tasks.html",
    "/leaderboard":"Habit-Tracker-System/docs/app/Client-DashBoard/pages/leaderboard.html",
}

const handleLocation = async() => {
    const path = window.location.pathname;
    const route = routes[path] || routes[404];
    const html = await fetch(route).then((data) => data.text());
    const location = document.querySelector(".insert");
    location.innerHTML = html;
    
}


window.onpopstate = handleLocation;
window.route = route;

handleLocation();

