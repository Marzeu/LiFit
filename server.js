const jsonServer = require('json-server');
const path = require('path');
// const bodyParser = require('body-parser');

const router = jsonServer.router(path.join(__dirname, './database/db.json'))
const server = jsonServer.create();

const middlewares = jsonServer.defaults();

const port = process.env.PORT || 8080;

server.use(middlewares);
server.use(router);

// server.use(jsonServer.bodyParser)
// server.use((req, res, next) => {
//   if (req.method === 'POST') {
//     req.body.createdAt = Date.now()
//   }
//   // Continue to JSON Server router
//   next()
// })

server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`)
});