var express = require('express');
var router = express.Router();
var userManager = require('../manager/user');

router.post('/', newUser);
router.get('/scored', getAllScored);
router.put('/:userId', setUser);
router.get('/:userId', getUser);
router.delete('/:userId', delUser);
router.get('/', getAll);


function newUser(req, res){
	var userId = req.params.userId;
	var name = req.body.name;
	var password = req.body.password;
	var email = req.body.email;
	userManager.create(name, password, email, function(err, result){
		res.json(result);
	});
}

function setUser(req, res, next){
	var userId = req.params.userId;
	var name = req.body.name;
	var password = req.body.password;
	var email = req.body.email;
	var score = req.body.score;
	userManager.setUser(userId, name, password, email, score, function(err, newUser) {
    if (err) {
      return next(err);
    }
     res.json(newUser);
	});
}

function delUser(req, res){
	var userId = req.params.userId;
	userManager.delUser(req.params.userId, function(err, result) {
		if (result === 0) {
			next(new Error(userId + ' not exists'));
		} else {
			res.send('User[' + userId + ' deleted');
		}
	});
}

function getUser(req, res, next) {
  var userId = req.params.userId;
  userManager.getById(userId, function(err, user){
    if(user){
      res.json(user);
    } else {
      next(new Error(new Error(userId + ' not exists')));
    }
  });
}
function getAll(req, res) {
		userManager.getAll(function(err, users) {
		res.json(users);
	});
}
function getAllScored(req, res) {
		userManager.getAllScored(function(err, users) {
		res.json(users);
	});
}

module.exports = router;