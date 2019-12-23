const mongoose  = require("mongoose");
const Note      = require("../models/noteModel");
const Book      = require("../models/bookModel");

// exports.notes_get_id = (req, res, next) => { kullanmadık silinebilir
//     Note.findById(req.params.noteId)
//         .exec()
//         .then(note => {
//             if (!note) {
//                 res.render("error/404");
//             } else {
//                 res.status(200).json({
//                     note: note
//                 });
//             }
//         })
//         .catch(err => {
//             console.log(err);
//             res.status(500).json({ error: err });
//         });
// };

exports.notes_create = (req, res, next) => {
    let info = req.session.user[0];
    const note = new Note({
        _id: new mongoose.Types.ObjectId(),
        note: req.body.note,
        book: req.params.bookid,
        user: info._id
    });
    return note.save().then(result => {
        console.log(result);
        return res.redirect("/user/mylist");
    });
};

exports.notes_get_book = (req, res, next) => {
    let info = req.session.user[0];
    Note.find({ user: info._id, book: req.params.bookid })
        .select("_id note book")
        .populate({ path: "book", select: "name editor author" })
        .exec()
        .then(docs => {
            if (docs.length > 0) {
                console.log("docs ", docs);
                return res.render("notes/mynotes", { docs });
            } else {
                res.status(204).json();
            }
        })
        .catch(err => {
            console.log(err);
            res.render("error/500");
        });
};

exports.notes_delete = (req, res, next) => {};
