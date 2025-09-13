// src/controllers/post.controller.js
import * as postService from '../services/post.service.js';
import { ApiResponse } from '../utils/ApiResponse.js';

export const getAllPosts = async (req, res) => {
    try {
        const posts = await postService.getAllPosts();
        res.json(posts);
    } catch (error) {
        res.status(500).json ({ message: 'Error retrieving posts', error: error.message });
    }
};

export const getPostById = async (req, res) => {
    try {
    const postId = parseInt(req.params.id, 10);
    const post = await postService.getPostById(postId);
    res.json(post);
    } catch (error) {
        res.status(500).json ({ message: 'Error retrieving posts', error: error.message });
    }
};

export const createPost = async (req, res) => {
    try {
        const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { title, content } = req.body;
    const newPost = await postService.createPost({ title, content });
    res.status(201).json(newPost);
    } catch (error) {
        res.status(500).json ({ message: 'Error retrieving posts', error: error.message });
    }
};

export const updatePost = async (req, res) => {
    // Check for validation errors first
    try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // If data is valid, proceed with update logic
    const postId = parseInt(req.params.id, 10);
    const post = postService.updatePost(postId, req.body);
    if (!post) {
        return res.status(404).json({ message: 'Post not found.' });
    }
    res.json(post);
    } catch (error) {
        res.status(500).json ({ message: 'Error retrieving posts', error: error.message });
    }
};

export const partiallyUpdatePost = async (req, res) => {
    try { 
    const postId = parseInt(req.params.id, 10);
    // req.body will contain the fields to update, e.g., { title: "New Title" }
    const post = postService.partiallyUpdatePost(postId, req.body);
    if (!post) {
        return res.status(404).json({ message: 'Post not found.' });
    }
    res.json(post);
    } catch (error) {
        res.status(500).json ({ message: 'Error retrieving posts', error: error.message });        
    }
};

export const deletePost = async (req, res) => {
    try {
    const postId = parseInt(req.params.id, 10);
    const success = postService.deletePost(postId);
    if (!success) {
        return res.status(404).json({ message: 'Post not found.' });
    }
    res.status(204).send();
    } catch (error) {
        res.status(500).json ({ message: 'Error retrieving posts', error: error.message });
    }
};