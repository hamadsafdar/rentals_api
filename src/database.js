const mongoose = require('mongoose');
const config = require('./config');

// const url = `mongodb+srv://${config.db.user}:${config.db.password}@cluster0.2xbqw.mongodb.net/${config.db.name}?retryWrites=true&w=majority`;
const url = `mongodb://hamads:iiui@localhost:27017/rentals`;

mongoose
	.connect(url, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true,
		useFindAndModify: false
	})
	.then(() => console.log('Database connected'))
	.catch((error) => console.log(error));
