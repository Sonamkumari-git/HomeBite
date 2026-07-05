(function () {
    const token = localStorage.getItem('token');
    
    // Agar token pehle se maujood hai, toh seedha profile par bhej do
    if (token) {
        window.location.href = '/profile'; 
    }
})();
