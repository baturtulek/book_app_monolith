const express           = require("express");
const checkAuth         = require("../middleware/check-auth");
const BookController    = require("../controllers/booksController");
const Book              = require("../models/bookModel");
const router            = express.Router();

router.get("/", checkAuth, BookController.book_get_all);

router.get("/detail/:bookId", checkAuth, BookController.book_get_id);

router.get("/add", checkAuth, (req, res) => {
    res.render("books/addbook");
});

router.post("/add", checkAuth, BookController.book_create);

router.get("/delete/:bookId", checkAuth, BookController.book_delete);

// router.delete("/all", (req, res) => {
//     Book.deleteMany({}).then(() => {
//         res.status(200)
//             .json({
//                 message: "jdfsa"
//             })
//             .catch(err => {
//                 res.status(500).json({
//                     error: err
//                 });
//             });
//     });
// });

module.exports = router;
