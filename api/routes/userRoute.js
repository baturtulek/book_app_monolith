const express           = require("express");
const User              = require("../models/userModel");
const checkAuth         = require("../middleware/check-auth");
const UserController    = require("../controllers/userController");
const router            = express.Router();

// router.get("/", (req, res, next) => {
//     // this request for test
//     User.find()
//         .exec()
//         .then(docs => {
//             const response = {
//                 user: docs
//             };
//             res.status(200).json(response);
//         })
//         .catch(err => {
//             console.log(err);
//             res.status(500).json({
//                 error: err
//             });
//         });
// });

router.get("/", (req, res) => {
    res.render("auth/login");
});

router.get("/login", (req, res) => {
    res.render("auth/login");
});

router.get("/register", (req, res) => {
    let status = 0;
    res.render("auth/register", { status });
});

router.post("/login", UserController.user_login);

router.post("/register", UserController.user_signup);

router.get("/logout", UserController.user_logout);

router.get("/addlist/:bookid", checkAuth, UserController.addlist);

router.get("/mylist", checkAuth, UserController.mylist);

router.delete("/all", (req, res) => {
    User.deleteMany({}).then(() => {
        res.status(200).json({
            message: "jdfsa"
        });
    });
});

module.exports = router;
