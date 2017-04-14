var http = require("http");
var express = require('express');
var app = express();
var path = require("path");
var bodyParser = require("body-parser");
var Account = require("./accountSchema.js");
var connectAccount = require("./connMongo.js").connectAccount;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "../../public")));
app.get("/", function (req, res) {
    console.log("tab page");
    res.sendFile(path.join(__dirname, "../html/login.html"));
})
app.post("/register", function (req, res) {
    var accountInfo = new Account({
        account: req.body.account,
        password: req.body.password,
        email: req.body.email,
        phonenumber: req.body.phonenumber
    });
    accountInfo.save(function (err, resp) {
        if (err) {
            console.log(err);
            res.end(JSON.stringify({ status: fasle }));
        } else {
            console.log(resp);
            res.end(JSON.stringify({ status: true }));
        }
    })

});

app.post("/register_verify", function (req, res) {
    var wherestr = { account: req.body.account };
    var outres = res;
    // res.writeHead(200,{'Content-Type':"text/json"})
    Account.find(wherestr, {}, function (err, resp) {
        console.log("数据的长度是: " + resp.length);
        if (resp.length >= 1) {
            console.log(resp);
            res.send({ status: true });
            res.end();
        } else {
            console.log(resp);
            res.send({ status: false });
            res.end();
        }
    })
})

app.post("/login", function (req, res) {
    console.log("account is " + req.body.account + " password is " + req.body.password);
    var wherestr = { account: req.body.account };
    var outres = res;
    Account.find(wherestr, {}, function (err, res) {
        if (err) {
            console.log(err);
            outres.end(JSON.stringify({ status: false }));
        } else {
            console.log(res);
            if (res == null) {
                outres.end(JSON.stringify({ status: false }));
            } else {
                if (req.body.password == res[0].password) {
                    outres.end(JSON.stringify({ status: true }));
                } else {
                    outres.end(JSON.stringify({ status: false }));
                }
            }
        }
    })
})
var server = app.listen(3000);