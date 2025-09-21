// src/services/comment.service.js
import { getPostById } from './post.service.js';
import { getUserById } from './user.service.js'

let nextId = 1;

export const getAllComments = () => {
    return comments;
};

export const getCommentsByPostId = (postId) => {
    return comments.filter(c => c.postId === postId);
};

export const createComment = (postId, commentData) => {
    // Validate whether the post exists
    const post = getPostById(postId);
    if (!post) {
        throw error;
    }

    const user = getUserById(authorId);
    if (!user) {
        throw error;
    }
    
    const newComment = { id: nextId++, postId, ...commentData };
    comments.push(newComment);
    return newComment;
};