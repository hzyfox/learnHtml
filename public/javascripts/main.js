var http = require("http");
var express = require('express');
var app = express();
var path = require("path");
var cookieParser = require('cookie-parser');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var bodyParser = require("body-parser");
var Account = require("./accountSchema.js");
var connectAccount = require("./connMongo.js").connectAccount;
var sendMail = require("./mail.js");

app.use(cookieParser());
app.use(session({
    secret: '12345',
    name: 'login',
    cookie: { maxAge: 1000 * 60 * 60 * 24 * 7 },
    resave: false,
    saveUninitialized: true,
    store: new MongoStore({   //创建新的mongodb数据库
        url: "mongodb://localhost:27017/session"
    })
}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "../../public")));
app.get("/", function (req, res) {
    if (req.session.user != null) {
        res.redirect("http://localhost:3000/html/user.html");
    } else {
        console.log("tab page");
        res.sendFile(path.join(__dirname, "../html/login.html"));
    }
})
app.get("/login",function(req,res){
    res.redirect("http://localhost:3000/html/login.html");
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
            var mailOptions = {
                from: 'cs.zyhu@qq.com', // 发件地址
                to: '312751750@qq.com', // 收件列表
                subject: 'Hello sir', // 标题
                //text和html两者只支持一种
                html: '<b>Hello world ?</b>' // html 内容
            };
            sendMail(mailOptions);
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
app.post("/changepwd", function (req, res) {
    var wherestr = { account: req.body.account };
    Account.find(wherestr, {}, function (err, resq) {
        if (resq[0].password == req.body.originpwd) {
            //update pwd
            Account.update(wherestr, { password: req.body.newpwd }, function (err, resq) {
                if (err) {
                    console.log(err);
                } else {
                    console.log(resq);
                }
            })
            res.send({ status: true });
        } else {
            res.send({ status: false });
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
                    req.session.user = {
                        account: req.body.account,
                        password: req.body.password
                    }
                    outres.end(JSON.stringify({ status: true }));
                } else {
                    outres.end(JSON.stringify({ status: false }));
                }
            }
        }
    })
})
var server = app.listen(3000);