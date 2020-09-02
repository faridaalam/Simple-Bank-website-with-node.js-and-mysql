var mongoose = require('mongoose');
var Schema = mongoose.Schema;

userSchema = new Schema( {
	
	unique_id: Number,
	username: String,
	password: String,
	passwordConf: String,
	address1: String,
	address2: String
}),
User = mongoose.model('User', userSchema);

module.exports = User;
