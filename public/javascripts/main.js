var http = require("http");
var express = require('express');
var app = express();
var path = require("path");
var bodyParser = require("body-parser");
var MongoClient = require('mongodb').MongoClient;
var DB_CONN_STR = "mongodb://localhost:27017/test";

var insertData = function (data, db, callback) {
    var collection = db.collection('userinfo');
    var info = [{
        account: data.account,
        password: data.password,
        email: data.email,
        phonenumber: data.phonenumber
    }];
    collection.insert(info, function (err, result) {
        if (err) {
            console.log(err);
            return;
        }
        callback(result);
    })
}

var findData = function (data, db, callback) {
    var collection = db.collection('userinfo');
    var whereAccount = { account: data.account };
    collection.find(whereAccount).toArray(function (err, result) {
        if (err) {
            console.log(err);
            return 1;
        }
        callback(result);
    });
}

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "../../public")));
app.get("/", function (req, res) {
    console.log("tab page");
    res.sendFile(path.join(__dirname, "../html/login.html"));
})
app.post("/register", function (req, res) {
    console.log("receive the log \n"
        + "account: " + req.body.account + "\n"
        + "password: " + req.body.password + "\n"
        + "email: " + req.body.email + "\n"
        + "phonenumber: " + req.body.phonenumber);
    MongoClient.connect(DB_CONN_STR, function (err, db) {
        if (err) {
            console.log(err);
        }
        console.log("连接成功\n");
        insertData(req.body, db, function (result) {
            console.log(result);
            db.close();
            res.end(JSON.stringify({ status: true }));
        })
    });

})
app.post("/login", function (req, res) {
    console.log("account is " + req.body.account + " password is " + req.body.password);
    MongoClient.connect(DB_CONN_STR, function (err, db) {
        if (err) {
            console.log(err);
        }
        console.log("连接成功");
        findData(req.body, db, function (result) {
            console.log(result);
            if (result == null) {
                res.end(JSON.stringify({ status: false }));
                console.log("账户不存在");
                db.close();
            } else {
                if (result[0].password == req.body.password) {
                    res.end(JSON.stringify({ status: true }));
                    console.log("账户存在，且密码正确 密码为"+result[0].password);
                    db.close();
                } else {
                    res.end(JSON.stringify({ status: false }));
                    console.log("账户存在，但密码不正确");
                    db.close();
                }
            }
        })
    })
})
var server = app.listen(3000);