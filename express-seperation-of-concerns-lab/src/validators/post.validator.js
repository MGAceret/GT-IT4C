import { body } from 'express-validator';

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