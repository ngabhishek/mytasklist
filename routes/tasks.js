var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('mongodb://127.0.0.1:27017/test', ['tasks']);

//	Find all tasks
router.get('/tasks', function(req, res, next){
	db.tasks.find(function(err, tasks){
		if(err){
			res.send(err);
		}
		res.json(tasks);
	});
});

//	Find task by id
router.get('/task/:id', function(req, res, next){
	db.tasks.findOne({_id : mongojs.ObjectId(req.params.id)}, function(err, task){
		if(err){
			res.send(err);
		}
		res.json(task);
	});
});

//	Save task

router.post('/task', function(req, res, next){
	console.log('creating new task..');
	var task = req.body;
	if(!task.title || !task.status){
		res.status(400);
		res.json({
			'error' : 'Bad data'
		});
	} else {
		db.tasks.save(task, function(err, task){
			if(err){
				res.send(err);
			} res.json(task);
		});
	}
});

router.options('/task', function(req, res, next){
	console.log('optionsssssssssssssss..');
});

router.delete('/task/:id', function(req, res, next){
	//console.log(req.params.id);
	db.tasks.remove({_id: mongojs.ObjectId(req.params.id)}, function(err, task){
		if(err){
			res.send(err);
		}
		res.json(task);
	});
});

module.exports = router;