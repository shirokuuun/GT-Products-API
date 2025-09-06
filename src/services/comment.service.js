let comments = [
  {
    id: 1,
    text: "First text",
    postId: 1,
  },
  {
    id: 2,
    text: "Second text",
    postId: 2,
  },
];
let nextId = 3;
import { getPostById } from "./post.service.js";

export const getAllComments = () => {
  return comments;
};

export const getCommentsByPostId = (postId) => {
  return comments.filter((c) => c.postId === postId);
};

export const createComment = (postId, commentData) => {
  const post = getPostById(postId);
  if (!post) {
    return null;
  }
  const newComment = { id: nextId++, postId, ...commentData };
  comments.push(newComment);
  return newComment;
};

export const updateComment = (id, commentData) => {
  const commentIndex = comments.findIndex((c) => c.id === id);
  if (commentIndex === -1) {
    return null;
  }
  comments[commentIndex] = { ...comments[commentIndex], ...commentData };
  return comments[commentIndex];
};

export const deleteComment = (id) => {
  const commentIndex = comments.findIndex((c) => c.id === id);
  if (commentIndex === -1) {
    return false;
  }
  comments.splice(commentIndex, 1);
  return true;
};
