const User = require("./model/user");



const express = require("express");
const app = express();


const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const session = require("express-session");
const bcrypt = require("bcrypt");

function authenticate(app){
    app.use(session({
        secret: 'John-Social_Media-API',
        resave: false,
        saveUninitialized: true
    }))


    app.use(passport.initialize());
    app.use(passport.session())

    passport.use(new localStrategy(async (username, password, done) => {
        try{
            const user = await User.findOne({username: username});
            if(user){
                console.log("user found");
                const passwordMatch = await bcrypt.compare(password, user.password);

                if(passwordMatch){
                     console.log("User found, password matched");
                    return done(null, user);
                }
                if(!passwordMatch){
                    // console.log("user found,  password not matched");
                    // console.log(passwordMatch);
                    // console.log(user.password, password);
                    return done(null, false);
                }
            }
            else if(!user){
                // console.log("user not found");
                return done(null, false);
            }
        }catch(error){
            //  console.log(error);
            return done(error);
        }
   
    }))


    passport.serializeUser(function(user, cb) {
        return cb(null, user);
    });

    passport.deserializeUser(function(user, cb) {
        return cb(null, user);
    });


}


function isLogedIn(req, res, next){
    const logedIn = req.isAuthenticated();
    console.log("logedIn == ", logedIn);
    if(logedIn){
        return next();
    }
    else if(!logedIn){
        return res.status(403).json({
            success: false,
            reason: "You need to login first"
        });
    }   
}

module.exports = { authenticate, isLogedIn}