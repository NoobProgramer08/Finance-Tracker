
const route = (event) => {
    event = event || window.event; 
    event.preventDefault();//*Prevent the default loading of the browsers
    const targetPath = event.target.getAttribute("href");//get the value of the href

    window.history.pushState({},"",targetPath);
    handleLocation();//Calls the handle location method
}
const routes = {
    
    "/main":"Habit-Tracker-System/docs/app/Client-DashBoard/pages/mainPage.html",
    "/settask":"Habit-Tracker-System/docs/app/Client-DashBoard/pages/tasks.html",
    "/leaderboard":"Habit-Tracker-System/docs/app/Client-DashBoard/pages/leaderboard.html",
     404:"Habit-Tracker-System/docs/app/Client-DashBoard/pages/404.html",
}

const handleLocation = async() => {
    const path = window.location.pathname;
    const route = routes[path] || routes[404];
    console.log(route);
    const html = await fetch(route).then((data) => data.text());
    const location = document.querySelector(".insert");
    location.innerHTML = html;
    
}


window.onpopstate = handleLocation;
window.route = route;


