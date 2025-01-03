
const insert = document.querySelector(".content");

const route = (event) => {
    event.preventDefault();
    event = event || window.event;
    const targetPath = event.target.getAttribute("href");
    window.history.pushState({}, "", targetPath);
    handleLocation();
};

const routes = {
    "/home": "/Finance-Tracker/docs/app/Client-DashBoard/assets/pages/home.html",
    "/analytics":"/Finance-Tracker/docs/app/Client-DashBoard/assets/pages/analytics.html",
    "/history": "/Finance-Tracker/docs/app/Client-DashBoard/assets/pages/history.html",
};

const handleLocation = async () => {
    try {
        const path = window.location.pathname;
        const route = routes[path];
        
        if (!route) {
            console.error('Route not found:', path);
            return;
        }

        const response = await fetch(route);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const html = await response.text();
        
        // Create a temporary container
        const temp = document.createElement('div');
        temp.innerHTML = html;
        
        // Extract the content from the body
        const bodyContent = temp.querySelector('body')?.innerHTML || html;
        insert.innerHTML = bodyContent;

        // Re-initialize page-specific functionality
    
        if (path === '/home' && typeof window.loadMetrics === 'function') {
        
            window.findUser();
            window.loadModals();
            window.loadMetrics();
        }
        if(path === '/history'){
            window.readTable();
        }
        if(path === "/analytics"){
            window.loadTable();
        }
        
        
    } catch (error) {
        console.error('Error handling location:', error);
    }
    window.loadMetrics();
};

window.onpopstate = handleLocation;
window.route = route;

// Initial route handling
handleLocation();