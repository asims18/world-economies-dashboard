// Server File
const http = require('http');
const app = require('./server/app');
const port = process.env.PORT || 3000;
const server = http.createServer(app);
server.listen(port, () => console.log(`API running on localhost:${port}`));

