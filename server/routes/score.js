var express = require('express');
var router = express.Router();
var scoreManager = require('../manager/score');

router.post('/', newScore);
router.put('/:scoreId', setScore);
router.get('/:scoreId', getScore);
router.delete('/:scoreId', delScore);
router.get('/', getAll);

function newScore(req, res){
  scoreManager.create(function(err, result){
    res.json(result);
  });
}

function setScore(req, res, next){
	var scoreId = req.params.scoreId;
	var player = req.body.player;
	var score = req.body.score;
	scoreManager.setScore(scoreId, player, score, function(err, newScore) {
    if (err) {
      return next(err);
    }
     res.json(newScore);
	});
}

function delScore(req, res){
	var scoreId = req.params.scoreId;
	scoreManager.delScore(req.params.scoreId, function(err, result) {
		if (result === 0) {
			next(new Error(scoreId + ' not exists'));
		} else {
			res.send('Score[' + scoreId + ' deleted');
		}
	});
}

function getScore(req, res, next) {
  var scoreId = req.params.scoreId;
  scoreManager.getById(scoreId, function(err, score){
    if(score){
      res.json(score);
    } else {
      next(new Error(new Error(scoreId + ' not exists')));
    }
  });
}
function getAll(req, res) {
		scoreManager.getAll(function(err, scores) {
		res.json(scores);
	});
}

module.exports = router;