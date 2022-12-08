import express from "express";
import { getFeedPosts, getUserPosts, likePost } from "../controllers/posts.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();


/* LEER POSTS */
router.get("/", auth, getFeedPosts);
router.get("/:userId/posts", auth, getUserPosts);


/* ACTUALIZAR POST */

router.patch("/:id/like", auth, likePost);


export default router;