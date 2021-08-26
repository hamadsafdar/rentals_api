const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const userRoutes = require('./features/user-management/routes');
const listingRoutes = require('./features/listing');
const blogRoutes = require('./features/blog/routes');
const chatRoutes = require('./features/chat/routes');

const app = express();

//middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));

//routes
app.use('/api/user', userRoutes);
app.use('/api/listing', listingRoutes);
app.use('/api/blog', blogRoutes);
app.use('/api/chat', chatRoutes);

// app.get('/', (req, res) => res.send('Trying to access Rentals FYP'));

module.exports = app;
