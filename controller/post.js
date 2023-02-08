const router = require("express").Router();
const User = require("../model/user");
const Post = require("../model/post");
const bcrypt = require("bcrypt");


async function timeLinePosts (req, res) {
    try{

        // const currentUser = await User.findOne({username: req.user.username});
        // currentUser.followings.map((person) => {
        //     const post = await User.find()
        // })
        
        // if(req.query.username){
        //     const posts = await Post.find({username: req.query.username});
        //     const {likes, pictures, ...other} = posts;
        //     return res.status(200).json({
        //         success: true,
        //         result: "other"
        //     })
        // }
        // if(req.query.title){
        //     const posts = await Post.find({firstName: req.query.firstName});
        //     const {likes, pictures, ...other} = posts;
        //     return res.status(200).json({
        //         success: true,
        //         result: other
        //     })
        // }
 
        const posts = await Post.find();
        const {likes, pictures, ...other} = posts;
            // {},{exclude: ["password", "followers", "followings"]})
        // .exclude("password", "followers", "followings")
        // ("-password", "-followers", "-followings");
        // const {password, followers, followings, ...other} = users;
        return res.status(200).json({
            success: true,
            result: other
        })

    }
    catch(error){
        return res.status(500).json({
            success: false,
            reason: error.message
        });
    }
}


async function createPost (req, res) {
    // res.json("User routerrrr");
    try{
        const post = await new Post(req.body);
        post.username = req.user.username;
        post.save();
        res.status(200).json({
            success: true,
            message: "User Account Created Succesfully",
            result: post
        });
    }
    catch(error){
        res.status(500).json({
            success: false,
            reason: error
        });
    }
}

async function deletePost (req, res) {
    try{
        const post = await Post.findById(req.params.postId);
        if(post){
                 if(post.username == req.user.username){
                   
                    post.remove();
                    res.status(200).json({
                        success: true,
                        message: "Post deleted Succesfully"
                    })
                }else{
                    res.status(403).json({
                        success: false,
                        reason: "You can delete only your post"
                    })
                }
        }else{
            res.status(500).json({
                success: false,
                reason: "Post Not Found"
            })
        }
    }
    catch(error){
        res.status(500).json({
            success: false,
            reason: error.message
        });
    }
}

async function updatePost (req, res) {
    try{
        const post = await User.findOne({_id: req.params.postId});
        if(post){
            const {likes, pictures, ...other} = post._doc;
                if(post.username == req.user.username){
                    if(req.body.title){
                        post.title = req.body.title;
                    }
                    if(req.body.detail){
                        post.detail = req.body.detail;
                    }
                    post.save();
                    res.status(200).json({
                        success: true,
                        message: "Post Updated Succesfully",
                        result: other
                    })
                }else{
                    res.status(403).json({
                        success: false,
                        reason: "You can update only your post"
                    })
                }
        }else{
            res.status(500).json({
                success: false,
                reason: "Post Not Found"
            })
        }
    }
    catch(error){
        res.status(500).json({
            success: false,
            reason: error.message
        });
    }
}

async function likePost (req, res) {
    // res.json("User routerrrr");
    try{
        const post = await Post.findOne({_id: req.params.postId});
        const user = await User.findOne({username: req.user.username});
        
        if(post){
            if(post.likes.includes(user._id)){
                await post.updateOne({$pull: {likes: user._id}});
                return res.status(200).json({
                    success: true,
                    message: "You unliked the post"
                });
            }
            else if(!post.likes.includes(user._id)){
                await post.updateOne({$push: {likes: user._id}});
                return res.status(200).json({
                    success: true,
                    message: "You liked the post"
                });
            }
        }
        else if(!post){
            return res.status(404).json({
                success: true,
                message: "the post is not found"
            });
        }
    }
    catch(error){
        res.status(500).json({
            success: false,
            reason: error.message
        });
    }
}

module.exports = { timeLinePosts, createPost, updatePost, deletePost, likePost}