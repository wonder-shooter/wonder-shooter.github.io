const fastify = require('fastify')();
const path = require('path');

const rootPath = path.join(__dirname, '../');
const htoocsPath = 'htdocs';
const scoreDataPath = 'assets/js/score.json';

// Routing
fastify.register(require('fastify-static'), {
  root: path.join(rootPath, htoocsPath),
});
//
fastify.get('/score', async (request, reply) => {
  reply.type('application/json').code(200);
  return { result: 'ok' }
});
// Server Listen
fastify.listen(process.env.NODE_PORT || 3000, err => {
  if (err) throw err;
  console.log(`server listening on ${fastify.server.address().port}`);
});
