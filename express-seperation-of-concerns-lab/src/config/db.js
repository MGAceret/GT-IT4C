// Example src/config/db.js
import dotenv from 'dotenv';
import mysql from 'mysql2/promise';

dotenv.config();

// Connection pool
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

export const testConnection = async () => {
    try {
        await pool.getConnection();
        console.log('Successfully connected to the MySQL database.');
    } catch (error) {
        console.error('Unable to connect to the datbase:', error);
    }
};

export default pool;