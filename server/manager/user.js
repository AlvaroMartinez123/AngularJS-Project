var daoUser = require('../dao/user');

function create(name, password, email, callback) {

	var user = {
		name: name,
		password: password,
		email: email,
		score: Number(0)
	};

	daoUser.create(user, callback);

}

function getById(userId, callback) {
	daoUser.getById(userId, callback);
}
function getByEmail(email, callback) {
	daoUser.getByEmail(email, callback);
}
function getAll(callback) {
	daoUser.getAll(callback);
}
function getAllScored(callback) {
	daoUser.getAllScored(callback);
}
function delUser(userId, callback) {
	daoUser.delUser(userId, callback);
}

function setUser(userId, user, callback) {
  var points = Number(user.score);
	var update = {
		$set: {
      name:user.name,
      password:user.password,
      email:user.email,
      score:points
    }
	};
	
	if (checkValidScore(points)) {
		daoUser.updateUser(userId, update, callback);
	} else {
		callback(new Error('Invalid points [' + points + ']'));
	}
}

function checkValidScore(points) {
	return isInteger(points) && points >= 0;
}

function isInteger(x) {
	return (typeof x === 'number') && (x % 1 === 0);
}


module.exports = {
	create: create,
	getById: getById,
	getAll: getAll,
	getByEmail: getByEmail,
	getAllScored: getAllScored,
	delUser: delUser,
	setUser: setUser
};