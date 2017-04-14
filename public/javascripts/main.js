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
    // console.log("receive the log \n"
    //     + "account: " + req.body.account + "\n"
    //     + "password: " + req.body.password + "\n"
    //     + "email: " + req.body.email + "\n"
    //     + "phonenumber: " + req.body.phonenumber);
    var accountInfo = new Account({
        account: req.body.account,
        password: req.body.password,
        email: req.body.email,
        phonenumber: req.body.phonenumber
    });
    var outres = res;
    accountInfo.save(function (err, res) {
        if (err) {
            console.log(err);
            outres.end(JSON.stringify({ status: fasle }));
            connectAccount.close();
        } else {
            console.log(res);
            outres.end(JSON.stringify({ status: true }));
            connectAccount.close();
        }
    })
    
});

app.post("/login", function (req, res) {
    console.log("account is " + req.body.account + " password is " + req.body.password);
    // MongoClient.connect(DB_CONN_STR, function (err, db) {
    //     if (err) {
    //         console.log(err);
    //     }
    //     console.log("连接成功");
    //     findData(req.body, db, function (result) {
    //         console.log(result);
    //         if (result == null) {
    //             res.end(JSON.stringify({ status: false }));
    //             console.log("账户不存在");
    //             db.close();
    //         } else {
    //             if (result[0].password == req.body.password) {
    //                 res.end(JSON.stringify({ status: true }));
    //                 console.log("账户存在，且密码正确 密码为" + result[0].password);
    //                 db.close();
    //             } else {
    //                 res.end(JSON.stringify({ status: false }));
    //                 console.log("账户存在，但密码不正确");
    //                 db.close();
    //             }
    //         }
    //     })
    // })
    var wherestr = { account: req.body.account };
    var outres = res;
    Account.find(wherestr, {}, function (err, res) {
        if (err) {
            console.log(err);
            outres.end(JSON.stringify({ status: false }));
            connectAccount.close();
        } else {
            console.log(res);
            if (res == null) {
                outres.end(JSON.stringify({ status: false }));
            } else {
                if (req.body.password == res[0].password) {
                    outres.end(JSON.stringify({ status: true }));
                }
            }
        }
    })
})
var server = app.listen(3000);