// src/routes/post.routes.js
import { Router } from 'express';
import { body } from 'express-validator';
import * as postController from '../controllers/post.controller.js';
// *** IMPORT THE COMMENT CONTROLLER ***
import * as commentController from '../controllers/comment.controller.js';
import { updatePost } from '../services/post.service.js';

const router = Router();
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

// Validation rules for creating a post
const createPostRules = [
    body('title')
        .isString().withMessage('Title must be a string.')
        .trim()
        .notEmpty().withMessage('Title is required.')
        .isLength({min: 5, max: 100}).withMessage('The Title must be between 5 and 100 characcters.'),
    body('content')
        .isString().withMessage('Content must be a string.')
        .trim()
        .notEmpty().withMessage('Content is required.')
];

const updatePostRules = [
    body('title')
        .optional() // This field is not required
        .trim()
        .notEmpty().withMessage('Title cannot be empty.')
        .isString().withMessage('Title must be a string.'),
    body('content')
        .optional()
        .trim()
        .notEmpty().withMessage('Content cannot be empty.')
        .isString().withMessage('Content must be a string.')
];


// Apply the rules as middleware to the POST route
router.post('/', createPostRules, postController.createPost);

router.get('/', postController.getAllPosts);
router.get('/:id', postController.getPostById);
/*router.put('/:id', postController.updatePost); */
router.put('/:id', updatePostRules, postController.updatePost);
router.delete('/:id', postController.deletePost);

export default router;