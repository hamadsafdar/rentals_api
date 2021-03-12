const express = require('express');
const bodyparser = require('body-parser');
const morgan = require('morgan');

const app = express();

app.use(bodyparser.json());

app.use(bodyparser.urlencoded({ extended: false }));
app.use(morgan('dev'));
app.get('/test', (req, res) => {
	res.status(200).json({ message: 'Test' });
});

module.exports = app;
