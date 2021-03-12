const app = require('express')();
const { json, urlencoded } = require('body-parser');
const morgan = require('morgan');
const userRoutes = require('./features/user-management/routes');

app.use(json());
app.use(urlencoded({ extended: false }));
app.use(morgan('dev'));

app.use('/api/user', userRoutes);

module.exports = app;
