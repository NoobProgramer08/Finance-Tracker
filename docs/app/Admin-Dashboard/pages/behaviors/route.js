
"TODO:"
/*
 - Study route handling
 - Study why file path cannot be accessed directly
 */

const route = (event) =>{
    event = event || window.event;
    event.preventDefault();
    window.history.pushState({},"",event.target.href);
    handleLocation();

}

//*The links where the routes brings you
const routes = {
    "/users":"Habit-Tracker-System/docs/app/Admin-Dashboard/pages/accounts.html",
    "/dash":"Habit-Tracker-System/docs/app/Admin-Dashboard/pages/chart.html",
    "/task":"Habit-Tracker-System/docs/app/Admin-Dashboard/pages/taskprogress.html",
    "/progress":"Habit-Tracker-System/docs/app/Admin-Dashboard/pages/userprogress.html"

}

const handleLocation = async() => {
    const path = window.location.pathname;
    const route = routes[path] || routes[404];
    const html = await fetch(route).then((data) => data.text());
    const location = document.getElementById("main");
    location.innerHTML = html;
}
window.onpopstate = handleLocation  ;
window.route = route;


//calls the method by default
handleLocation();





