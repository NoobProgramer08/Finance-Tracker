// metrics.js
function initializeMetrics() {
    // Reset counters each time we initialize
    let activeUsers = 0;
    let inactiveUsers = 0;
    let totalUsers = 0;
    
    // Get elements - add null checks
    const activeUser = document.querySelector("#activeValue");
    const inactiveUser = document.querySelector("#inactiveValue");
    const totalUser = document.querySelector("#totalUsers");
    
    // If elements don't exist, return early
    if (!activeUser || !inactiveUser || !totalUser) return;
    
    function checkUsers() {
        // Reset counters before counting
        activeUsers = 0;
        inactiveUsers = 0;
        totalUsers = 0;
        
        const users = localStorage.getItem("User");
        if (!users) return; // Safety check for no users
        
        const convertData = JSON.parse(users);
        
        convertData.forEach(data => {
            if (data.status === "Active") {
                activeUsers++;
            }
            if (data.status === "Inactive") {
                inactiveUsers++;
            }
            totalUsers++;
        });
        
        changeMetricValues(activeUsers, inactiveUsers, totalUsers);
    }
    
    function changeMetricValues(active, inactive, total) {
        if (activeUser) activeUser.innerHTML = active;
        if (inactiveUser) inactiveUser.innerHTML = inactive;
        if (totalUser) totalUser.innerHTML = total;
    }
    
    // Run initial check
    checkUsers();
}

// Make function globally available
window.initializeMetrics = initializeMetrics;

// Initialize on page load if we're on metrics page
document.addEventListener('DOMContentLoaded', () => {
    if (window.location.pathname === '/metric') {
        initializeMetrics();
    }

    initializeMetrics();


});