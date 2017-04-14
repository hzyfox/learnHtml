var connMongo = require("./connMongo.js");
var mongoose = connMongo.mongoose;
var connectAccount = connMongo.connectAccount;
var Schema = mongoose.Schema;

var AccountSchema = new Schema({
    account: { type: String },
    password: { type: String },
    emial: { type: String },
    phonenumber: { type: String }
});

module.exports = mongoose.model('Account',AccountSchema);