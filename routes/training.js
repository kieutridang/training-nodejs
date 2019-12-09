var express = require('express');
var router = express.Router();

var taskList = [];

function editTask (tasklist, id) {
  var position = tasklist.findIndex(task => task.taskId == id);
  if(position === -1) {
          return null;
  }
  return position;
}

function deleteTask (tasklist, id) {
  var position = tasklist.findIndex(task => task.taskId == id);
  if(position === -1) {
          return null;
  }
  return tasklist.splice(position,1);
}

/* POST task to array */
router.post('/add-task', function(req, res, next) {
  var item = req.body.item;
  taskList.push({taskName: item, taskId: Date.now(), isDone: 'false'});
  res.redirect('/');
});

/* GET all tasks */
router.get('/get-all-tasks', function(req, res, next) {
  res.send({taskList});
});

/* GET specific task by ID*/
router.get('/search-task-by-id', function(req, res, next) {
  const taskFound = taskList.find( task => task.taskId == req.query.taskId);
  res.send('Task found: ' + taskFound.taskName);
});

/* EDIT task */
router.post('/edit-task', function(req, res, next) {
  var position = editTask(taskList,req.query.taskId);
  taskList[position].taskName = req.body.item;
  res.redirect('/');
});

/* DELETE task*/
router.delete('/delete-task', function(req, res, next) {
  deleteTask(taskList,req.query.taskId);
  res.redirect('/');
});

module.exports = router;