// src/routes/post.routes.js
import { Router } from 'express';
import * as postController from '../controllers/post.controller.js';
import * as commentController from '../controllers/comment.controller.js';
import { updatePost } from '../services/post.service.js';
import { createPostRules, updatePostRules } from '../validators/post.validator.js';
import { validatePost  } from '../middleware/validator.middleware.js';


const router = Router();

router.post('/', validatePost, postController.createPost);
router.put('/:id', validatePost, postController.updatePost);
router.patch('/:id', postController.partiallyUpdatePost);

router.post('/', createPostRules, postController.createPost);

router.get('/', postController.getAllPosts);
router.get('/:id', postController.getPostById);
router.put('/:id', updatePostRules, postController.updatePost);
router.delete('/:id', postController.deletePost);

export default router;