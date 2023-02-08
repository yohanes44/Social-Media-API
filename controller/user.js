const router = require("express").Router();
const User = require("../model/user");
const Post = require("../model/post");
const bcrypt = require("bcrypt");



async function getUser (req, res) {
    try{
        if(req.query.username){
            const users = await User.find({username: req.query.username});
            const {password, followers, followings, ...other} = users;
            return res.status(200).json({
                success: true,
                result: other
            })
        }
        if(req.query.firstName){
            const users = await User.find({firstName: req.query.firstName});
            const {password, followers, followings, ...other} = users;
            return res.status(200).json({
                success: true,
                result: other
            })
        }
        if(req.query.lastName){
            const users = await User.find({lastName: req.query.lastName});
            const {password, followers, followings, ...other} = users;
            return res.status(200).json({
                success: true,
                result: other
            })
        }
        const users = await User.find();
            // {},{exclude: ["password", "followers", "followings"]})
        // .exclude("password", "followers", "followings")
        // ("-password", "-followers", "-followings");
        // const {password, followers, followings, ...other} = users;
        return res.status(200).json({
            success: true,
            result: users
        })

    }
    catch(error){
        return res.status(500).json({
            success: false,
            reason: error.message
        });
    }
}


async function updateUser (req, res) {
    try{
        const user = await User.findOne({_id: req.params.userId});
        if(user){
            const {password, followings, followers, profilePicture, coverPicture, pictures, ...other} = user._doc;
                if(user.username == req.user.username){
                    if(req.body.username){
                        user.username = req.body.username;
                        req.user.username = req.body.username;
                    }
                    if(req.body.firstName){
                        user.firstName = req.body.firstName;
                    }
                    if(req.body.lastName){
                        user.lastName = req.body.lastName;
                    }
                    if(req.body.password){
                        const salt = await bcrypt.genSalt(10);
                        user.password = await bcrypt.hash(req.body.password, salt);
                    }
                    user.save();
                    res.status(200).json({
                        success: true,
                        message: "User Account Updated Succesfully",
                        result: other
                    })
                }else{
                    res.status(403).json({
                        success: false,
                        reason: "You can update only your account"
                    })
                }
        }else{
            res.status(500).json({
                success: false,
                reason: "User Not Found"
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

async function deleteUser (req, res) {
    try{
        const user = await User.findById(req.params.userId);
        if(user){
                 if(user.username == req.user.username){
                   
                    user.remove();
                    res.status(200).json({
                        success: true,
                        message: "User Account deleted Succesfully"
                    })
                }else{
                    res.status(403).json({
                        success: false,
                        reason: "You can delete only your account"
                    })
                }
        }else{
            res.status(500).json({
                success: false,
                reason: "User Not Found"
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

async function followUser (req, res) {
    try{
       const currentUser = await User.findOne({username: req.user.username});
       const followUser = await User.findById(req.params.userId);

       if(followUser.followers.includes(currentUser._id)){
            await followUser.updateOne({$pull: { followers: currentUser._id}})
            await currentUser.updateOne({$pull: { followings: followUser._id}})
            return res.status(200).json({
                success: true,
                message: "You unfollowed the User"
            })
       }
       else if(!followUser.followers.includes(currentUser._id)){
        await followUser.updateOne({$push: { followers: currentUser._id}})
        await currentUser.updateOne({$push: { followings: followUser._id}})
        return res.status(200).json({
            success: true,
            message: "You followed the User"
        })
      }

    }
    catch(error){
        return res.status(500).json({
            success: false,
            reason: error.message
        });
    }
}



module.exports = { getUser, updateUser, deleteUser, followUser}