import { Router } from "express";
import { checkAuth } from "../utils/checkAuth.js";
import { createPost, getMyPosts, getPost, getPosts, removePost, updatePost } from "../controllers/post.js";


const router = new Router()


// CREATE
router.post('/', checkAuth, createPost)

// GET ALL POST
router.get('/', getPosts)

// GET POST
router.get('/:id', getPost)

// GET MY POSTS
router.get('/user/me', checkAuth, getMyPosts)

// REMOVE POST
router.delete('/:id', checkAuth, removePost)

// UPDATE POST
router.put('/:id', checkAuth, updatePost)

export default router