'use strict';

const mongoose = require("mongoose"),
		Schema = mongoose.Schema,
		bcrypt = require('bcrypt-nodejs'),
		crypto = require('crypto');

const UserSchema = new Schema({
	email: {
		type: String,
		unique: true,
		lowercase: true
	},
	displayName: String,
	avatar: String,
	password: {
		type: String,
		select: false // evita enviar la contraseña al cliente cuando se hace un select
	},
	signupDate: {
		type: Date,
		default: Date.now()
	},
	lastLoging: Date
});

// funciones que se ejecutan antes o despues de que se guarda un dato en mongo
UserSchema.pre('save', (next) => {
	let user = this;

	if (!user.isModified('password')) return next();

	bcrypt.getSalt(10, (err, salt) => {
		if (err) return next(err);

		bcrypt.hash(user.password, salt, null, (err, hash) => {
			if (err) return next(err);

			user.password = hash;
			next();
		});
	});
});

UserSchema.methods.gravatar = function() {
	if (!this.email) return 'https://gravatar.com/avatar/?s=2006d=retro';

	const md5 = crypto.createHash('md5').update(this.email).digest('hex');

	return `https://gravatar.com/avatar/${md5}?s=2006d=retro`;
}

module.exports = mongoose.model('User', UserSchema);