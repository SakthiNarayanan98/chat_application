const http = require('http');
const { Server } = require('socket.io');
const app = require('./app');

const server = http.createServer(app);
const io = new Server(server);

server.listen(3000, () => console.log('Server running on port 3000'));
