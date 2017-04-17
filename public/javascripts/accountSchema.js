var connMongo = require("./connMongo.js");
var mongoose = connMongo.mongoose;
var connectAccount = connMongo.connectAccount;
var Schema = mongoose.Schema;

var AccountSchema = new Schema({
    account: { type: String },
    password: { type: String },
    email: { type: String },
    phonenumber: { type: String },
    verify:{type: Boolean,default:false}
});

module.exports = connectAccount.model('Account',AccountSchema);