const mongoose  = require("mongoose");
const Book      = require("../models/bookModel");

exports.book_get_all = (req, res, next) => {
    Book.find()
        .select("name editor author image _id")
        .exec()
        .then(books => {
            console.log(books);
            return res.render("books/bookList", { books });
        })
        .catch(err => {
            console.log(err);
            res.render("error/500");
        });
};

exports.book_get_id = (req, res, next) => {
    const id = req.params.bookId;
    Book.findById(id)
        .select("name editor author image")
        .exec()
        .then(book => {
            if (book) {
                return res.render("books/detail", { book });
            } else {
                return res.render("error/404");
            }
        })
        .catch(err => {
            console.log(err);
            res.render("error/500");
        });
};

exports.book_create = (req, res, next) => {
    const book = new Book({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        editor: req.body.editor,
        author: req.body.author,
        image: req.body.image
    });
    book.save()
        .then(result => {
            console.log(result);
            return res.render("books/detail", { book });
        })
        .catch(err => {
            console.log(err);
            res.render("error/500");
        });
};

exports.book_delete = (req, res, next) => {
    const id = req.params.bookId;
    Book.remove({ _id: id })
        .exec()
        .then(result => {
            res.redirect('/');
        })
        .catch(err => {
            res.render("error/500");
        });
};
