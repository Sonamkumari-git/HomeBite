const { Cashfree } = require('cashfree-pg');

Cashfree.XClientId = process.env.CASHFREE_APP_ID;
Cashfree.XClientSecret = process.env.CASHFREE_SECRET_KEY;
// Agar environment SANDBOX hai to test mode, warna production
Cashfree.XEnvironment = process.env.CASHFREE_ENVIRONMENT === 'PRODUCTION' 
    ? Cashfree.Environment.PRODUCTION 
    : Cashfree.Environment.SANDBOX;

module.exports = Cashfree;
