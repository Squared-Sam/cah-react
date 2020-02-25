const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const gameRouter = require('./routes/game');

const app = express();

app.use(logger('dev'));
app.use(cors());
app.use(express.json());
// app.use(express.urlencoded({
//   extended: true
// }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use('/api/', indexRouter);
app.use('/api/users', usersRouter);
app.use('/api/game', gameRouter);

module.exports = app;
