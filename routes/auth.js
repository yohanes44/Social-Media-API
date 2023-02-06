const router = require("express").Router();
const passport = require("passport");

router.get("/", (req, res) => {
    res.json("User routerrrr");
})


router.post("/login",  passport.authenticate("local", { failureRedirect: '/loginFailure', failureMessage: true }),(req, res) => {
    // console.log(req.body);
    return res.status(200).json({
        success: true,
        message: "Loged In Succesfully"
    });
})


module.exports = router;