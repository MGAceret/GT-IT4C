// src/controllers/post.controller.js
import * as postService from '../services/post.services.js';

export const getAllPosts = async (req, res) => {
    try {
        const posts = await postSerice.getAllPosts();
        res.json(posts);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving posts', error: error.message });
    }
};

export const getPostById = asyncHandler(async (req, res) => {
    const postId = parseInt(req.params.id, 10);
    const post = await postService.getPostById(postId);

    return res
        .status(200)
        .json(new ApiResponse(200, post, "Post retrieved successfully"));
});

export const createPost = async (req, res) => {
    try {
        const newPost = await postService.createPost(req.body);
        return res
            .status(201)
            .json(new ApiResponse(201, newPost, "Post created successfully"))
    } catch (error) {
        res.status(500).json ({ message: 'Error retrieving posts', error: error.message });
    }
};

export const updatePost = async (req, res) => {
    try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

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