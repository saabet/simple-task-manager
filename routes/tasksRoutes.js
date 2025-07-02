const taskHandler = require('../handlers/taskshandler');

module.exports = [
  {
    method: 'POST',
    path: '/tasks',
    handler: taskHandler.createTask,
  },
  {
    method: 'GET',
    path: '/tasks',
    handler: taskHandler.getAllTasks,
  },
  {
    method: 'GET',
    path: '/tasks/{id}',
    handler: taskHandler.getTaskbyId,
  },
];
