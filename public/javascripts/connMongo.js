var mongoose = require("mongoose");
var CONN_DB_STR = "mongodb://localhost:27017/walkfree"
var connectAccount = mongoose.createConnection(CONN_DB_STR);

connectAccount.on('connected', function () {
    console.log("connected to " + CONN_DB_STR);
})

connectAccount.on('error', function (err) {
    console.log("connected occours error: " + err);
})

connectAccount.on('disconnected',function(){
    console.log("connected disconnected");
})

module.exports.connectAccount = connectAccount;
module.exports.mongoose = mongoose;