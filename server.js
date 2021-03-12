require('dotenv').config({ path: './src/.env' }); //should be called immediately
require('./src/database'); // will connect database
const http = require('http');
const app = require('./src');

const server = http.createServer(app);

server.listen(3000, () => {
	console.log('Rentals server is listening on 3000');
});
