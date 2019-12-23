const mongoose      = require("mongoose");
const bcrypt        = require("bcrypt");
const jwt           = require("jsonwebtoken");
const User          = require("../models/userModel");

exports.user_signup = (req, res, next) => {
    let status = -1;
    User.find({ email: req.body.email })
        .exec()
        .then(user => {
            if (user.length >= 1) {
                status = 409;
                res.render("auth/register", { status });
            } else {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if (err) {
                        res.render("error/500");
                    } else {
                        const user = new User({
                            _id: new mongoose.Types.ObjectId(),
                            name: req.body.name,
                            email: req.body.email,
                            password: hash,
                            list: []
                        });
                        user.save()
                            .then(result => {
                                return res.redirect("/books");
                            })
                            .catch(err => {
                                console.log(err);
                                res.render("error/500");
                            });
                    }
                });
            }
        })
        .catch(err => {
            res.render("error/500");
        });
};

exports.user_login = (req, res, next) => {
    let status = 0;
    User.find({ email: req.body.email })
        .exec()
        .then(user => {
            if (user.length < 1) {
                status = 1;
                return res.render("auth/login", { status });
            }
            bcrypt.compare(
                req.body.password,
                user[0].password,
                (err, result) => {
                    if (err) {
                        status = 1;
                        return res.render("auth/login", { status });
                    }
                    if (result) {
                        req.session.user = user;
                        console.log("session", req.session.user);
                        return res.redirect("/books");
                    }
                    return res.render("auth/login", { status });
                }
            );
        })
        .catch(err => {
            console.log(err);
            res.render("error/500");
        });
};

exports.user_logout = (req, res, next) => {
    req.session.user = null;

    return res.redirect("/user/login");
};

exports.addlist = (req, res, next) => {
    let info = req.session.user[0];
    User.update({ _id: info._id }, { $addToSet: { list: req.params.bookid } })
        .exec()
        .then(() => {
            return res.redirect("/books");
        })
        .catch(err => {
            res.render("error/500");
        });
};

exports.mylist = (req, res, next) => {
    let info = req.session.user[0];
    User.findById(info._id)
        .select("list")
        .populate("list")
        .exec()
        .then(books => {
            console.log("books", books["list"]);
            return res.render("books/mylist", { books });
        })
        .catch(err => {
            res.render("error/500");
        });
};
