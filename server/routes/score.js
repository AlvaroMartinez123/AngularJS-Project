var express = require('express');
var router = express.Router();

var scores = {};
var numScores = 0;

router.post('/', newScore);
router.put('/:scoreId', updateScore);
router.get('/:scoreId', getScore);
router.delete('/:scoreId', delScore);
router.get('/', getAll);

router.param('scoreId', checkScoreExists);

function newScore(req, res){
  var score ={
    _id: String(numScores),
    player:"",
    score: 0
  };
  
  scores[score._id] = score;
	numScores++;
  
	res.json(score);
  
}

function updateScore(req, res){
 var update={ 
   _id: req.params.scoreId,
   player: req.body.player,
   score: req.body.score
  };
  
  scores[req.params.scoreId] = update;
	
	res.json(update);
  
}

function delScore(req, res){
  	delete scores[req.params.scoreId];
	
    res.send(req.params.scoreId);
}

function getScore(req, res) {
	res.json(req.score);
}

function getAll(req, res) {
	res.json(scores);
}

function checkScoreExists (req, res, next, scoreId) {
	if (scores[scoreId]) {
		req.score = scores[scoreId];
		next();
	} else {
		next(new Error(scoreId + ' not exists'));
	}
}

module.exports = router;