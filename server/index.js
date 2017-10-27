const fastify = require('fastify')();
const path = require('path');
const fs = require('fs');
const util = require('util');

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

const rootPath = path.join(__dirname, '../');
const htoocsPath = path.join(rootPath, 'htdocs');
const scoreDataPath = path.join(htoocsPath, 'assets/js/score.json');

// Routing
fastify.register(require('fastify-static'), {
  root: htoocsPath,
});
//
fastify.get('/score', async (request, reply) => {
  const json = await readFile(scoreDataPath);
  reply.type('application/json').code(200);
  return JSON.parse(json);
});
//
fastify.post('/score', async (request, reply) => {
  try {
    const data = await readFile(scoreDataPath);
    const json = JSON.parse(data);
    const postData = request.body;

    const scores = postData.filter((score) => {
      return (score.name != null && score.score != null);
    });
    Array.prototype.push.apply(json, scores);
    await writeFile(scoreDataPath, JSON.stringify(json));

    reply.type('application/json').code(200);
    return { result: 'ok' }

  } catch(e) {
    console.error(e);
    return { result: 'form_data invalid'};
  }
});
// Server Listen
fastify.listen(process.env.NODE_PORT || 3000, err => {
  if (err) throw err;
  console.log(`server listening on ${fastify.server.address().port}`);
});
