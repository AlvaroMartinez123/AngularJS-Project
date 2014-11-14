var daoScore = require('../dao/score');

function create(callback) {

	var score = {
		player: "",
		score: 0
	};

	daoScore.create(score, callback);

}

function getById(scoreId, callback) {
	daoScore.getById(scoreId, callback);
}

function getAll(callback) {
	daoScore.getAll(callback);
}

function delScore(scoreId, callback) {
	daoScore.delScore(scoreId, callback);
}

function setScore(scoreId, player, score, callback) {
	
	var update = {
		$set: {}
	};
	
	update.$set[player] = player;
	update.$set[score] = score;
  
	if (checkValidScore(score)) {
		daoScore.updateScore(scoreId, update, callback);
	} else {
		callback('Invalid points[' + score + ']');
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
	delScore: delScore,
	setScore: setScore
};