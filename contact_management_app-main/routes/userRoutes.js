const express = require("express");
// creation of routes 
const router = express.Router();
const validateToken = require("../middleware/validateTokenHnadler");
const {registerUser,
    loginUser,
    currentUser
} = require("../controller/userController");

router.route("/register").post(registerUser);

router.route("/login").post(loginUser);

router.route("/current").get(validateToken,currentUser);


module.exports = router;