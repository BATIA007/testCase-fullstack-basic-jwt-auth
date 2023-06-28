import { Router } from "express";
import { createComment, getComments } from "../controllers/commnets.js";
import { checkAuth } from "../utils/checkAuth.js";



const router = new Router()

// Create Comment
router.post('/:id', checkAuth, createComment)

// Get Comments
router.get('/:id', getComments)


export default router