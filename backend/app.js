import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './Utils/DB.js';
import authRoutes from './Routes/authRoutes.js';
import userRoutes from './Routes/userRoutes.js';
// import job from './Utils/cronJob.js';

dotenv.config();


const app = express();

connectDB();

app.use(cors());
app.use(express.json());


app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

app.use('/', (req, res) => {
    res.send("Welcome to the backend API");
});

// For local development
if (process.env.NODE_ENV !== 'production') {
    const port = process.env.PORT || 3000;
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
}