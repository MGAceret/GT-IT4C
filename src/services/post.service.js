// src/services/post.service.js
import pool from '../config/db.js';
import { ApiError } from '../utils/ApiError.js';

export const getAllPosts = async () => {
    const [posts] = await pool.query(`
        SELECT 
            p.id,
            p.title,
            p.content,
            u.username AS authorUsername,
            u.email AS authorEmail
        FROM 
            posts p
        JOIN
            users u ON p.authorId = u.id;
        `);
    return posts;
};

export const getPostById = async (id) => {
    const [rows] = await pool.query(`
        SELECT 
            p.id,
            p.title,
            p.content,
            u.username AS authorUsername,
            u.email AS authorEmail
        FROM 
            posts p 
        JOIN
            users u ON p.authorId = u.id;            
        WHERE 
            id = ?
        
        `, [id]);
    return rows[0] || null;
};

export const createPost = async (postData, authorId) => {
    const { title, content } = postData;
    try {
        const [result] = await pool.query(
            'INSERT INTO posts (title, content, authorId) VALUES (?, ?, ?)',
                [title, content, authorId]
        );
        const newPostId = result.insertId;
        return getPostById(newPostId);
    } catch(error) {
        if (error.code === 'ER_NO_REFERENCED_ROW_2') {
            throw new ApiError(400, 'Invalid author ID. User does not exist.');
        }
        throw error;
    }
};

export const updatePost = async (id, postData) => {
    const { title, content } = postData;
    const [result] = await pool.query(
        'UPDATE posts SET title = ?, content = ? WHERE id = ?',
        [title, content, id]
    );
    if (result.affectedRows === 0) {
        return null;
    }
    return getPostById(id);
};

export const partiallyUpdatePost = async (id, updates) => {
    const fields = Object.keys(updates);
    const values = Object.values(updates);

    if (fields.length === 0) {
        return getPostById(id);
    }
        
    const setClause = fields.map(field => `${field} = ?`).join(', ');
        
    const [result] = await pool.query(
        `UPDATE posts SET ${setClause} WHERE id = ?`,
        [...values, id]
    );

    if (result.affectedRows === 0) {
        return null;
    }
    return getPostById(id);
};

export const deletePOst = async (id) => {
    const [result] = await pool.query('DELETE FROM posts where id = ?', [id]);
    return result.affectedRows > 0;
};