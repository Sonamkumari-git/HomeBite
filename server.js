const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path'); // Naya module: Files ka rasta (path) set karne ke liye

// 1. Dotenv ko batana ki .env file 'backend' folder ke andar hai
dotenv.config({ path: './backend/.env' });

// 2. Paths update kar diye gaye hain (taaki backend folder ke andar dekhe)
const connectDB = require('./backend/config/db');
const authRoutes = require('./backend/routes/authRoutes');

// MongoDB se connect karna
connectDB();

const app = express();

// Middlewares
app.use(cors()); // Frontend ko API call karne allow karta hai
app.use(express.json()); // JSON data read karne ke liye

// Frontend ki baaki files (agar koi image ya css ho) ko load karne ke liye
app.use(express.static(__dirname)); 

// Routes
app.use('/api/auth', authRoutes);

// Jab koi localhost:5000 par aayega, toh index.html khulega
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});