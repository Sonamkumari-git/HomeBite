const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path'); 


dotenv.config({ path: './backend/.env' });


const connectDB = require('./backend/config/db');
const authRoutes = require('./backend/routes/authRoutes');
const contactRoutes = require('./backend/routes/contactRoutes');
const userRoutes = require('./backend/routes/userRoutes'); 


const orderRoutes = require('./backend/routes/orderRoutes');


connectDB();

const app = express();


app.use(cors()); 
app.use(express.json()); 


app.use(express.static(path.join(__dirname, 'public'), { extensions: ['html'] }));


app.use('/api/auth', authRoutes);
app.use('/api/contact', contactRoutes); 
app.use('/api/users', userRoutes); 


app.use('/api/orders', orderRoutes); 


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
