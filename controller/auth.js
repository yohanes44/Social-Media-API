const router = require("express").Router();
const User = require("../model/user");
const bcrypt = require("bcrypt");



async function loginSuccess (req, res){
    return res.status(200).json({
        success: true,
        message: "Loged In Succesfully"
    });
}


async function logoutAuthenticator (req, res, next) {
    const logenIn = req.isAuthenticated();
    if(logenIn){
        req.logout((err) => {
            if(err) {
                return err
            }
        });
        return next();
    }
    else if(!logenIn){
        return res.status(500).json({
            success: false,
            message: "You need to login first"
        })
    }

}

async function loginAuthenticator (req, res, next) {
    const logenIn = req.isAuthenticated();
    if(!logenIn){
        return next();
    }
    else if(logenIn){
        return res.status(500).json({
            success: false,
            message: "You are Loged In Already"
        })
    }

}


async function registerAuthenticator (req, res, next) {
    const logenIn = req.isAuthenticated();
    if(!logenIn){
        return next();
    }
    else if(logenIn){
        return res.status(500).json({
            success: false,
            message: "You need to logout first"
        })
    }

}

async function logoutSuccess (req, res) {
    return res.status(200).json({
        success: true,
        message: "LogedOut Succesfully"
    })
}


async function registerUser (req, res) {
    try{
        const user = await new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            username: req.body.username,
            password: req.body.password
        })

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(req.body.password, salt);

        await user.save();
        const {password, ...other} = user._doc
        res.status(200).json({
            success: true,
            message: "User Account Created Succesfully",
            result: user
        });
    }
    catch(error){
        return res.status(500).json({
            success: false,
            reason: error.message
        });
    }
}


module.exports = { loginSuccess, logoutAuthenticator, loginAuthenticator, registerAuthenticator, logoutSuccess, registerUser}