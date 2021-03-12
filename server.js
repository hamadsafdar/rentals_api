require('dotenv').config({ path: './src/.env' }); //should be called immediately
require('./src/database'); // will connect database

const http = require('http');
const app = require('./src');

const server = http.createServer(app);
const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
	console.log('Rentals server is listening on ' + PORT);
});
