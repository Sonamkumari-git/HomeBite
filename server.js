const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path'); 

// 1. Dotenv ko batana ki .env file 'backend' folder ke andar hai
dotenv.config({ path: './backend/.env' });

// 2. Paths update kar diye gaye hain (taaki backend folder ke andar dekhe)
const connectDB = require('./backend/config/db');
const authRoutes = require('./backend/routes/authRoutes');

// MongoDB se connect karna
connectDB();

const app = express();

// Middlewares
app.use(cors()); 
app.use(express.json()); 

// Frontend ki files ab 'public' folder se load hongi
app.use(express.static(path.join(__dirname, 'public'))); 

// Routes
app.use('/api/auth', authRoutes);

// Jab koi localhost:5000 par aayega, toh public folder ka index.html khulega
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
