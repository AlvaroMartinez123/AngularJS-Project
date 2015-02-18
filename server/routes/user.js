var express = require('express');
var router = express.Router();
var userManager = require('../manager/user');
var ensureAuth = require('../middleware/sec');
var debug = require('debug')('rapidshot-route-score');


function worker(io) {

	router.post('/', newUser);
	router.post('/google', newGoogleUser);
	router.get('/google/:googleId', getByGoogleId);
	router.get('/email/:email', getByEmail);
	router.get('/scored', getAllScored);
	router.put('/:userId', setUser);
	router.put('/google/:googleId', setGoogleUser);
	router.get('/:userId', getUser);
	router.delete('/:userId', delUser);
	router.get('/', getAll);


	function newUser(req, res, next){
		var userId = req.params.userId;
		var name = req.body.name;
		var password = req.body.password;
		var email = req.body.email;

		userManager.create(name, password, email, function(err, result){
			if (err) {
				return next(err);
			}
			res.json(result);
		});
	}

	function newGoogleUser(req, res, next){
		var userId = req.params.userId;
		var googleId = req.body.googleId;
		var name = req.body.name;
		var email = req.body.email;
		userManager.createGoogleUser(googleId, name, email, function(err, result){
			if (err) {
				return next(err);
			}
			res.json(result);
		});
	}

	function setUser(req, res, next){
		var userId = req.params.userId;
		if(req.body.score != null){ var score = req.body.score;}else{ var score = 0;}
		var user = {
			name : req.body.name,
			password : req.body.password,
			email : req.body.email,
			score : score
		}
		
		userManager.setUser(userId, user, function(err, newUser) {
	    if (err) {
	      return next(err);
	    }
	     res.json(newUser);
	     io.emit('userSetted', user, req.query.socketId);
		});
	}
	function setGoogleUser(req, res, next){
		var googleId = req.params.googleId;
		if(req.body.score != null){ var score = req.body.score;}else{ var score = 0;}
		var googleUser = {
			googleId: googleId,
			name : req.body.name,
			email : req.body.email,
			score : score
		}
		userManager.setGoogleUser(googleId, googleUser, function(err, newGoogleUser) {
	    if (err) {
	      return next(err);
	    }
	     res.json(newGoogleUser);
	     io.emit('userSetted', googleUser, req.query.socketId);
		});
	}

	function delUser(req, res){
		var userId = req.params.userId;
		userManager.delUser(req.params.userId, function(err, result) {
			if (result === 0) {
				next(new Error(userId + ' not exists'));
			} else {
				res.send('User[' + userId + ' deleted');
				io.emit('userDeleted', userId, req.query.socketId);
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
	function getByEmail(req, res, next) {
	  var email = req.params.email;
	  userManager.getByEmail(email, function(err, user){
	    if(user){
	      res.json(user);
	    } else {
	      next(new Error(new Error(email + ' not exists')));
	    }
	  });
	}
	function getByGoogleId(req, res, next) {
	  var googleId = req.params.googleId;
	  userManager.getByGoogleId(googleId, function(err, user){
	    if(user){
	      res.json(user);
	    } else {
	      next(new Error(new Error(email + ' not exists')));
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


	return router;
}

module.exports = worker;