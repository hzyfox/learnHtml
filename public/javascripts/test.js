var http = require("http");
var express = require('express');
var app = express();
var path = require("path");
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "../../public")));
app.get("/", function (req, res) {
    console.log("tab page");
    res.sendFile(path.join(__dirname, "../html/login.html"));
})
app.get("/register", function (req, res) {
    console.log("receive register");
    res.sendFile(path.join(__dirname, "../html/register.html"));
})
app.post("/login", function (req, res) {
    console.log("account is "+req.body.account+" password is "+req.body.password);
    res.end("account is " + req.body.account + " password is " + req.body.password);
})
var server = app.listen(3000);