import dotenv from 'dotenv';
dotenv.config();

export default {
    PORT: process.env.PORT || 3001,
    CORS_ORIGIN: process.env.CORS_ORIGIN || 'http://localhost:3000',
    SECRET: process.env.SECRET
}