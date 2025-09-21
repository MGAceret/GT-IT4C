// src/services.user.service.js
import db from '../config/db.js';
import { ApiError } from '../utils/ApiError.js';

// Creating a User by inserting username and email
export const createUser = async(userData) => {
    const { username, email } = userData;

    try {
        const [insertUser] = await db.query('INSERT INTO users (username, email) VALUES (?, ?)', [username, email]);

    const newUserId = insertUser.insertId;
    return await getUserById(newUserId);

    } catch (error) {
        if (error.code === 'ER_DUP_ENTRY') {
            throw new ApiError(409, 'Username or email already exists.');
        }
        throw error;
    }
};

export const getUserById = async(id) => {
    const [rows] = await db.query('SELECT * FROM users WHERE id = ?', [id]);

    if (rows.length == 0) {
        throw new ApiError(404, 'User not found.');
    }

    return rows[0];
};

export const getAllUsers = async () => {
    const [users] = await db.query('SELECT * FROM users');
    return users;
};