require('dotenv').config();
const Hapi = require('@hapi/hapi');
const tasksRoutes = require('./routes/tasksRoutes');
const usersRoutes = require('./routes/usersRoutes');
const { response_fail } = require('./utils/responseFormatter');
require('./db/database');

const init = async () => {
  const server = Hapi.server({
    port: process.env.PORT || 3000,
    host: process.env.NODE_ENV !== 'production' ? 'localhost' : '0.0.0.0',
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

  server.route([...tasksRoutes, ...usersRoutes]);
  server.ext('onPreResponse', (request, h) => {
    const response = request.response;
    if (response.isBoom && response.output.statusCode === 404) {
      return response_fail(h, 'Endpoint not found.', 404);
    }
  });

  await server.start();
  console.log(`Server running at: ${server.info.uri}`);
};

process.on('unhandledRejection', (err) => {
  console.log(err);
  process.exit(1);
});
init();
