const app = require('express')();
const { json, urlencoded } = require('body-parser');
const morgan = require('morgan');
const userRoutes = require('./features/user-management/routes');
const listingRoutes = require('./features/listing');
const cors = require('cors');

app.use(cors());
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(morgan('dev'));

app.use('/api/user', userRoutes);
app.use('/api/listing', listingRoutes);

app.get('/', (req, res) => res.send('Trying to access Rentals FYP'));

module.exports = app;
