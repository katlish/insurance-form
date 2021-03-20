const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
// routes
const userRoutes = require('./routes/user');

require('dotenv').config();

const app = express();

app.use(
	cors({
		origin: [process.env.ALLOWED_REQUEST_ORIGIN],
		credentials: true,
	}),
);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/user', userRoutes);

app.use((error, req, res, next) => {
	const { statusCode, message, data } = error;
	res.status(statusCode).json({ message, data });
});

mongoose
	.connect(
		process.env.DB_CONNECTION,
		{ useNewUrlParser: true, useUnifiedTopology: true },
	)
	.then((result) => {
		app.listen(process.env.SERVER_PORT, () => console.log('Server is running'));
	})
	.catch((e) => console.log('err', e));
