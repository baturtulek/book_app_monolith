const mongoose = require("mongoose");

const booksSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {
        type: String,
        required: true
    },
    editor: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    image: {
        type: String
    }
});

module.exports = mongoose.model("Book", booksSchema);
