require('dotenv').config({ path: './src/.env' }); //should be called immediately
require('./src/database'); // will connect database

const http = require('http');
const app = require('./src');
const { Server } = require('socket.io');
const { chat } = require('./src/features');

app.get('/', (req, res) => {
	res.sendFile(__dirname + '/index.html');
});

const server = http.createServer(app);
const io = new Server(server);
const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
	console.log('Rentals server is listening on ' + PORT);
});

io.on('connection', (socket) => {});

chat.initListeners(io);
