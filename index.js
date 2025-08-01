import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import userRouter from './routes/userRouter.js';


dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());


app.use('/users', userRouter);

const PORT = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI).then(() => {
    console.log('Connected to MongoDB');

    // ✅ Only start server after DB is connected
    app.listen(PORT, () => {
        console.log(`Server is running on http://127.0.0.1:${PORT}`);
    });

}).catch(err => {
    console.error('MongoDB connection failed:', err);
});