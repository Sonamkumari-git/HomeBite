(function () {
    const token = localStorage.getItem('token');
    
    // Agar token nahi mila, toh seedha login page par redirect karo
    if (!token) {
        alert("Access Denied! Pehle login karein.");
        window.location.href = '/index'; // .html lagane ki zaroorat nahi hai
    }
})();
