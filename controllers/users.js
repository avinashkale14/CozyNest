const User = require("../models/user.js");

module.exports.renderSignupForm = (req, res) => {
    res.render("users/signup.ejs");
};

module.exports.signup = async (req, res, next) => {
    try {

        if (!req.body.username) {
            req.flash("error", "No username was given");
            return res.redirect("/signup");
        }

        if (!req.body.email) {
            req.flash("error", "No email was given");
            return res.redirect("/signup");
        }

        if (!req.body.password) {
            req.flash("error", "No password was given");
            return res.redirect("/signup");
        }

        let { username, email, password } = req.body;
        if (password.length < 6) {
            req.flash("error", "Password must be at least 6 characters long.");
            return res.redirect("/signup");
        }

        const newUser = new User({
            username,
            email
        });

        const registeredUser = await User.register(newUser, password);

        req.login(registeredUser, (err) => {

            if (err) {
                return next(err);
            }

            req.flash("success", "Account created successfully. Welcome to CozyNest! ✨");
            res.redirect("/listings");

        });

    } catch (e) {

        if (e.name === "UserExistsError") {
            req.flash("error", "This username is already registered. Please choose another one.");
        } else {
            req.flash("error", e.message);
        }

        res.redirect("/signup");
    }
};

module.exports.renderLoginForm = (req, res) => {
    res.render("users/login.ejs");
};

module.exports.login = async (req, res) => {
    req.flash("success", "Welcome back to CozyNest! ✨");
    let redirectUrl = res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
};

module.exports.logout = (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        req.flash("success", "You have been logged out successfully.");
        res.redirect("/listings");
    });
};