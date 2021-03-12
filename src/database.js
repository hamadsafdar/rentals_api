const mongoose = require('mongoose');
const config = require('./config');

const url = `mongodb+srv://${config.db.user}:${config.db.password}@cluster0.2xbqw.mongodb.net/${config.db.name}?retryWrites=true&w=majority`;

mongoose
	.connect(url, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true
	})
	.then(() => console.log('Database connected'))
	.catch((error) => console.log(error));
