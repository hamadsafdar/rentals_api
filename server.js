const http = require('http');
const app = require('./src');

const server = http.createServer(app);

server.listen(3000);

server.on('listening' , () => {console.log('Server is listening')});

