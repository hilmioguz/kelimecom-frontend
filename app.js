var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var requestIp = require('request-ip');
const passport = require('passport');
const { flash } = require('express-flash-message');
var redis = require("redis");
require("dotenv").config();

const redisClient = redis.createClient({
  host: process.env.NODE_ENV === 'development' ? "kelime.com" : "redisdb",
  port: 6379,
  password: process.env.REDIS_PASSWORD,
  enable_offline_queue: false,
});
let RedisStore = require('connect-redis')(session)

var expressLayouts = require('express-ejs-layouts');
var i18n = require("./i18n");

var index = require('./routes/index');
var app = express();

app.use(session({
  secret: 'ssshhhhhh123',
  resave: false,
  saveUninitialized: false,
  cookie: {expires: true, maxAge: 36000000},
  store: new RedisStore({ client: redisClient }),
}));
// view engine setup
app.set('views', path.join(__dirname, 'views'));
// Set Templating Engine
app.use(expressLayouts)
app.set('layout', './layout')
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(flash({ sessionKeyName: 'flashMessage' }));

// set path for static assets
app.use(express.static(path.join(__dirname, 'public')));
app.enable('trust proxy');
app.use(i18n);
app.use(requestIp.mw({
  attributeName: 'clientIp',
  headerName: 'x-forwarded-for',
  trustProxy: true
}));
// passport middleware
app.use(passport.initialize());
app.use(passport.session());

// passport config
//require('./config/passport')(passport);
require('./services/passport-google')(passport);
// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    memory: process.memoryUsage()
  });
});

// routes
app.use('/', index);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(function(req, res) {
  const ip = req.clientIp;
  res.end(ip);
});

// error handler
app.use(function(err, req, res, next) {
  // render the error page
  res.status(err.status || 500);
  res.render('error', {status:err.status, message:err.message, layout: "empty"});
});


module.exports = app;
