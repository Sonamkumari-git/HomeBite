(function () {
    const token = localStorage.getItem('token');
    
   
    if (!token) {
        alert("Access Denied! Pehle login karein.");
        window.location.href = '/index';
    }
})();
