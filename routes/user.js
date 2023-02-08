const router = require("express").Router();
const User = require("../model/user");
const bcrypt = require("bcrypt");


const { getUser, updateUser, deleteUser, followUser } = require("../controller/user");

// get User
router.get("/", getUser)


//  update user Account
router.put("/:userId", updateUser)

// delete user Account
router.delete("/:userId", deleteUser)

// follow/unFollow user
router.post("/:userId/follow", followUser)



module.exports = router;