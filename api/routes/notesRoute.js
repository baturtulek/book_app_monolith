const express           = require("express");
const Note              = require("../models/noteModel");
const NotesController   = require("../controllers/notesController");
const checkAuth         = require("../middleware/check-auth");
const router            = express.Router();

//router.get("/detail/:noteId", checkAuth, NotesController.notes_get_id);

router.get("/add/:bookid", (req, res) => {
    res.render("notes/addnote", { req });
});

router.post("/add/:bookid", checkAuth, NotesController.notes_create);

router.get("/note/:bookid", checkAuth, NotesController.notes_get_book);

router.delete("/", checkAuth, NotesController.notes_delete);

router.delete("/all", (req, res) => {
    Note.deleteMany({}).then(() => {
        res.status(200).json({
            message: "jdfsa"
        });
    });
});

module.exports = router;
