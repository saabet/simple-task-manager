const taskHandler = require('../handlers/tasksHandler');

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
  {
    method: 'PUT',
    path: '/tasks/{id}',
    handler: taskHandler.updateTask,
  },
  {
    method: 'DELETE',
    path: '/tasks/{id}',
    handler: taskHandler.deleteTask,
  },
];
