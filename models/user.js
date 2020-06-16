var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');

var userschema = new Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    email: {type: String, required: true},
    password:{type: String, required: true},
    contactNo: {type: String , required: true},
    isAdmin: { type: Boolean, default: false }

});

var adminschema = new Schema({
    email: {type: String, required: true},
    password:{type: String, required: true},
});

adminschema.methods.encryptPassword = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(5),null);
};

adminschema.methods.validPassword = function (password) {
    return bcrypt.compareSync(password,this.password);
};

userschema.methods.encryptPassword = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(5),null);
};

userschema.methods.validPassword = function (password) {
  return bcrypt.compareSync(password,this.password);
};





//var User =
module.exports = mongoose.model('User',userschema);
module.exports = mongoose.model('Admin',adminschema);



module.exports.createUser = function (newUser, callback) {
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(newUser.password, salt, function(err, hash) {
            newUser.password = hash;
            newUser.save(callback);
        });
    });
};