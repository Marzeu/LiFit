const jsonServer = require('json-server');
const path = require('path');

const router = jsonServer.router(path.join(__dirname, './database/db.json'))
const server = jsonServer.create();

const middlewares = jsonServer.defaults();

const port = process.env.PORT || 8080;

server.use(middlewares);
server.use(router);

server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`)
});