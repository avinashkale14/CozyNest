const express = require("express");

const router = express.Router();

const wrapAsync = require("../utils/wrapAsync");

const passport = require("passport");

const {
    saveRedirectUrl,
    isLoggedIn
} = require("../middleware.js");

const userController = require("../controllers/users.js");


// ===============================
// SIGN UP
// ===============================

router.route("/signup")

    .get(userController.renderSignupForm)

    .post(
        wrapAsync(userController.signup)
    );


// ===============================
// LOGIN
// ===============================

router.route("/login")

    .get(
        userController.renderLoginForm
    )

    .post(
        saveRedirectUrl,

        passport.authenticate(
            "local",
            {
                failureRedirect: "/login",
                failureFlash: true
            }
        ),

        userController.login
    );


// ===============================
// PROFILE
// ===============================

router.get(
    "/profile",
    isLoggedIn,
    wrapAsync(userController.renderProfile)
);


// ===============================
// LOGOUT
// ===============================

router.get(
    "/logout",
    userController.logout
);


module.exports = router;