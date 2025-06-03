const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());


app.use('/api/users', authRoutes);
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/income', require('./routes/incomeRoutes'));
app.use('/api/expense', require('./routes/expenseRoutes'));
app.use('/api/auth', require('./routes/authRoutes')); // for register/login
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/income', require('./routes/incomeRoutes'));
app.use('/api/users', require('./routes/userRoutes')); // for admin-only user management
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
