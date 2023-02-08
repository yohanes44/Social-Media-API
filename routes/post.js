const router = require("express").Router();
const User = require("../model/user");
const Post = require("../model/post");
const bcrypt = require("bcrypt");


const { timeLinePosts, createPost, updatePost, deletePost, likePost} = require("../controller/post");


//  time line post
router.get("/", timeLinePosts)


// create post
router.post("/", createPost)

// delete post
router.delete("/:postId", deletePost)


// update a post
router.put("/:postId", updatePost)


// like/unLike a post
router.post("/:postId/like", likePost)

module.exports = router;