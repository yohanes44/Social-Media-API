const router = require("express").Router();


router.get("/", (req, res) => {
    res.json("User routerrrr");
})

module.exports = router;