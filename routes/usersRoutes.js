const usersHandler = require('../handlers/usersHandler');

module.exports = [
  {
    method: 'POST',
    path: '/users',
    handler: usersHandler.createUser,
  },
  {
    method: 'GET',
    path: '/users/{id}',
    handler: usersHandler.getUser,
  },
];
