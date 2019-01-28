const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const UserSchema = mongoose.Schema({
	username: {
		type: String,
		required: true,
		unique: true
	},
	email: {
		type: String,
		required: true,
		unigue: true
	},
	password: {
		type: String,
		required: true
	},
	firstName: { type: String, default: '' },
	lastName: { type: String, default: '' }
});

UserSchema.methods.serialize = function () {
	return {
		username: this.username || '',
		email: this.email || '',
		firstName: this.firstName || '',
		lastName: this.lastName || ''
	};
};

UserSchema.methods.validatePassword = function (password) {
	return bcrypt.compare(password, this.password);
};

UserSchema.statics.hashPassword = function (password) {
	return bcrypt.hash(password, 8);
};

const User = mongoose.model('User', UserSchema);

module.exports = { User };