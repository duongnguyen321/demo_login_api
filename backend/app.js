var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const cors = require("cors");
const session = require("express-session");
const passport = require("passport");

var indexRouter = require("./routes/auth");
const GithubPassport = require("./passport/github.passport");
const GooglePassport = require("./passport/google.passport");
const mongoose = require("mongoose");

var app = express();

app.use(
  session({
    secret: "secret",
    cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 },
    resave: false,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());

passport.use("github", GithubPassport);
passport.use("google", GooglePassport);

passport.serializeUser((user, done) => {
  return done(null, user);
});

passport.deserializeUser((user, done) => {
  return done(null, user);
});
// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(cors({ origin: "*" }));

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/auth", indexRouter);

mongoose
  .connect(
    "mongodb+srv://admin:UHdcJpmhGXUNgS2R@template-api-admin.ktzcgxf.mongodb.net/"
  )
  .then(() => {
    console.log("Connected database");
  })
  .catch((err) => {
    console.log("Connected database Fail");
    console.log(err);
  });

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
