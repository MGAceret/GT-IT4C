// src/services/post.services.js
import pool from '../config/db.js';

export const getAllPosts = async () => {
    const [posts] = await pool.query('SELECT * FROM posts');
    return posts;
};