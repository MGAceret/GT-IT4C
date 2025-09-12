// src/routes/post.routes.js
import { Router } from 'express';
import * as postController from '../controllers/post.controller.js';
// *** IMPORT THE COMMENT CONTROLLER ***
import * as commentController from '../controllers/comment.controller.js';
// Import Express Validator
import  { body } from 'express-validator'

const router = Router();

// Validation rules for creating a post
const createPostRules = [
    body('title')
        .trim() // Sanitizer to remove leading/trailing whitespace
        .notEmpty().withMessage('Title is required.')
        .isString().withMessage('Title must be a string.'),
    body('content')
        .trim()
        .notEmpty().withMessage('Content is required.')
        .isString().withMessage('Content must be a string.')
];



/*
// --- Post Routes ---
router.get('/', postController.getAllPosts);
router.post('/', postController.createPost);
router.get('/:id', postController.getPostById);
router.put('/:id', postController.updatePost);
router.patch('/:id', postController.partiallyUpdatePost); // From Challenge 1
router.delete('/:id', postController.deletePost);

// --- Nested Comment Routes ---
// GET /posts/:postId/comments
router.get('/:postId/comments', commentController.getCommentsByPostId);
// POST /posts/:postId/comments
router.post('/:postId/comments', commentController.createCommentForPost);
*/

// Apply the rules as middleware to the POST route
router.post('/', createPostRules, postController.createPost);

router.get('/', postController.getAllPosts);
router.get('/:id', postController.getPostById);
router.put('/:id', postController.updatePost); // We will update this later
router.delete('/:id', postController.deletePost);

export default router;