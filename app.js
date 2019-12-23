require("dotenv").config();
const express           = require("express");
const morgan            = require("morgan");
const mongoose          = require("mongoose");
const bookRoutes        = require("./api/routes/booksRoute");
const noteRoutes        = require("./api/routes/notesRoute");
const userRoutes        = require("./api/routes/userRoute");
const expressValidator  = require("express-validator");
const expressSession    = require("express-session");
const app               = express();

mongoose
    .connect(process.env.DB_CONNECTION, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    })
    .then(() => {
        console.log("Connected to Database");
    })
    .catch(err => {
        console.log("Database Connection Error! ", err);
    });

app.set("views", "views");
app.set("view engine", "ejs");

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(expressSession({ secret: "max", saveUninitialized: false, resave: false }));

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method === "OPTIONS") {
        res.header("Access-Control-Allow", "PUT, POST, PATCH, DELETE, GET");
        return res.status(200).json({});
    }
    next();
});

app.use((req, res, next) => {
    res.locals.session = req.session;
    next();
  });

app.get('/', (req, res) => {
    if (req.session.user) return res.redirect('/books');
    return res.redirect('/user');
});

app.use("/books", bookRoutes);
app.use("/notes", noteRoutes);
app.use("/user", userRoutes);

app.use((req, res, next) => {
    const error = new Error("Not Found");
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;