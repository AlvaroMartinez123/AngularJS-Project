var db = require('../util/mongodb').db;
var toObjectID = require('../util/mongodb').toObjectID;
var col = db.bind('user');

function create(user, throwError, callback) {
	getByEmail(user.email, function(err, data) {
		if (err) {
			return callback(err);
		}
		if (!data) {
			this.insert(user, callback);			
		} else {
			callback(throwError? user.email + ' email already exists': null);
		}
	}.bind(this));
}
function getByGoogleId(googleId, callback) {
	this.findOne({googleId: googleId}, callback);
}
function getById(userId, callback) {
	this.findById(userId, callback);
}
function getByEmail(email, callback) {
	col.findOne({email: email}, callback);
}
function getAll(callback) {
	this.find().sort({score: -1}, function(err, cursor) {
		if (err) {
			return callback(err);
		}

		cursor.toArray(callback);
	});
}
function getAllScored(callback) {
	this.find({score: {$gt: 0}}).sort({score: -1}, function(err, cursor) {
		if (err) {
			return callback(err);
		}

		cursor.toArray(callback);
	});
}

function delAll(callback) {
	this.remove({}, callback);
}

function delUser(userId, callback) {
	this.removeById(userId, callback);
}
function updateGoogleUser(googleId, update, callback) {
	var query = {
		googleId: googleId
	};
	
	var sort = [
		['googleId', 1]
	];
	col.findAndModify(query, sort, update, {new: true}, callback);
}
function updateUser(userId, update, callback) {
	var query = {
		_id: toObjectID(userId)
	};
	
	var sort = [
		['_id', 1]
	];
	
	col.findAndModify(query, sort, update, {new: true}, callback);
}

col.bind({
	create: create,
	getById: getById,
	getByGoogleId: getByGoogleId,
	getAll: getAll,
	getByEmail: getByEmail,
	getAllScored: getAllScored,
	delAll: delAll,
	delUser: delUser,
	updateUser: updateUser,
	updateGoogleUser: updateGoogleUser
});

module.exports = col;