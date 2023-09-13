const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('json-server/db.json');
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(router);
server.listen(process.env.PORT);