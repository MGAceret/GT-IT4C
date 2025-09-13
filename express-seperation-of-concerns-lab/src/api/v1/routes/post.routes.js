// src/api/v1/routes/post.routes.js
import { Router } from 'express';
import * as postController from '../controllers/post.controller.js';
import * as commentController from '../controllers/comment.controller.js';
import { updatePost } from '../../../services/post.service.js';
import { createPostRules, updatePostRules } from '../validators/post.validator.js';

const router = Router();

// Apply the rules as middleware to the POST route
router.post('/', createPostRules, postController.createPost);

router.get('/', postController.getAllPosts);
router.get('/:id', postController.getPostById);
/*router.put('/:id', postController.updatePost); */
router.put('/:id', updatePostRules, postController.updatePost);
router.delete('/:id', postController.deletePost);

export default router;