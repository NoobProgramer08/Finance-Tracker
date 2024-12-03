const route = (event) =>{
    event = event || window.event;
    event.preventDefault();
    console.log(event);
    console.log( window.history.pushState({},"",event.target.href));
    handleLocation();

}




const routes = {
    "/userm":"account.html",
    "/dash":"index.html",

}

const handleLocation = async() =>{
    const path = window.location.pathname;
    console.log("Path:"+path);
    const route = routes[path] || routes[404];
    console.log("Handle Location Route:"+route);
    const html = await fetch(route).then((data) => data.text());
    document.getElementById("main").innerHTML = html;
}
window.onpopstate = handleLocation;
window.route = route;

handleLocation();



