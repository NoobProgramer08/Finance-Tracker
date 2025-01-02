// route.js
const insert = document.querySelector(".content");

const route = (event) => {
    event.preventDefault();
    event = event || window.event;
    const targetPath = event.target.getAttribute("href");
    window.history.pushState({}, "", targetPath);
    handleLocation();
};

const routes = {
    "/metric": "Finance-Tracker/docs/app/Admin-Dashboard/assets/pages/metrics.html",
    "/users": "Finance-Tracker/docs/app/Admin-Dashboard/assets/pages/users.html",
    404: ""
};

const handleLocation = async () => {
    const path = window.location.pathname;
    const route = routes[path] || routes[404];
    const content = await fetch(route).then((data) => data.text());
    insert.innerHTML = content;
    
    // Initialize appropriate functionality based on path
    if (path === '/users') {
        setTimeout(() => {
            if (window.initializeDataTable) {
                window.initializeDataTable();
            }
        }, 100);
    } else if (path === '/metric') {
        setTimeout(() => {
            if (window.initializeMetrics) {
                window.initializeMetrics();
            }
        }, 100);
    }
};

window.onpopstate = route;
window.route = route;