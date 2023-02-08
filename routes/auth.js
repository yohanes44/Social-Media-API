const router = require("express").Router();
const passport = require("passport");
const { isLogedIn } = require("../authentication");
const {logoutAuthenticator, loginAuthenticator, registerAuthenticator,  loginSuccess,  logoutSuccess, registerUser} = require("../controller/auth");



router.post("/login", loginAuthenticator, passport.authenticate("local", { failureRedirect: '/loginFailure', failureMessage: true }), loginSuccess)


router.post("/logout", logoutAuthenticator, logoutSuccess)


router.post("/register", registerAuthenticator, registerUser)
  
module.exports = router;