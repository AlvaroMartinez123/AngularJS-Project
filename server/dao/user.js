var db = require('../util/mongodb').db;
var toObjectID = require('../util/mongodb').toObjectID;
var col = db.bind('user');

function create(user, callback) {
	this.insert(user, callback);
}

function getById(userId, callback) {
	this.findById(userId, callback);
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
	this.find({score: {$exists: true}}).sort({score: -1}, function(err, cursor) {
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
	getAll: getAll,
	getAllScored: getAllScored,
	delAll: delAll,
	delUser: delUser,
	updateUser: updateUser
});

module.exports = col;