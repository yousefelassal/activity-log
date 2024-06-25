import dotenv from 'dotenv';
dotenv.config();

export default {
    PORT: process.env.PORT || 3000,
    CORS_ORIGIN: process.env.CORS_ORIGIN || 'http://localhost:5173',
}