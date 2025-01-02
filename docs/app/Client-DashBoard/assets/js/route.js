// router.js
const insert = document.querySelector(".content");

const route = (event) => {
    event.preventDefault();
    event = event || window.event;
    const targetPath = event.target.getAttribute("href");
    window.history.pushState({}, "", targetPath);
    handleLocation();
};

const routes = {
    "/home": "Finance-Tracker/docs/app/Client-DashBoard/assets/pages/home.html",
    "/transaction": "Finance-Tracker/docs/app/Client-DashBoard/assets/pages/transaction.html",
    "/history":"Finance-Tracker/docs/app/Admin-Dashboard/assets/pages/history.html",
};

const handleLocation = async () => {
    try {
        const path = window.location.pathname;
        const route = routes[path] || routes[404];
        const content = await fetch(route).then((data) => data.text());
        insert.innerHTML = content;

        // Initialize transaction table if we're on the transaction page
        if (path === '/transaction' && typeof window.initializeDataTable === 'function') {
            window.initializeDataTable();
            console.log("Path");
        }
    } catch (error) {
        console.error('Error handling location:', error);
    }
};

window.onpopstate = route;
window.route = route;

// Initial route handling
