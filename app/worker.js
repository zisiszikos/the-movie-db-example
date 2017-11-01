const express = require('express');

const compress = require('compression');
const lusca = require('lusca');
const session = require('express-session');
const RedisStore = require('connect-redis')(session);
const bodyParser = require('body-parser');
const favicon = require('serve-favicon');
const path = require('path');
const morgan = require('morgan');
const api = require('./routes/api');
const webpackAssets = require('../webpack-assets.json');

const app = express();

app.use(morgan('tiny'));

app.set('views', path.join(__dirname, 'views'));
app.set('jsonp callback', true);
app.set('etag', 'strong');
app.set('x-powered-by', false);

app.use(bodyParser.urlencoded({
    extended: true
}));

let sessionOptions = {
    secret: 'R78o&0%L7lFcn2^V',
    key: 'themoviedb',
    resave: true,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        secure: 'auto',
        maxAge: 60 * 60 * 1000,
        sameSite: true
    }
};

if (process.env.REDIS_HOST &&
    process.env.REDIS_PORT &&
    process.env.REDIS_PASS) {
    sessionOptions.store = new RedisStore({
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT,
        pass: process.env.REDIS_PASS
    });
}

app.use(session(sessionOptions));

app.use(lusca.csrf());
app.use(lusca.csp({
    policy: {
        'default-src': '\'self\'',
        'style-src': '\'self\' fonts.googleapis.com',
        'font-src': '\'self\' fonts.gstatic.com',
        'img-src': '\'self\' image.tmdb.org img.youtube.com',
        'frame-src': '\'self\' *.youtube.com',
        'connect-src': '\'self\' ws://127.0.0.1:35729'
    }
}));
app.use(lusca.xframe('SAMEORIGIN'));
app.use(lusca.xssProtection());
app.use(lusca.nosniff());
app.use(lusca.referrerPolicy('same-origin'));

app.use(compress({
    level: 9
}));

var oneDay = 86400000;
app.use(express.static(path.join(__dirname, '/public'), {
    maxAge: oneDay
}));

app.use(favicon(__dirname + '/public/favicon.ico'));

app.set('view engine', 'pug');

app.use('/api', api);

app.use(/\/(.+)/, (req, res, next) => {

    next(new Error());
});

app.use('/', (req, res) => {

    res.render('index', {
        title: 'The Movie DB',
        bundle: webpackAssets.bundle,
        csrfToken: res.locals._csrf
    });
});

// eslint-disable-next-line no-unused-vars
app.use('/api', (err, req, res, next) => {

    if (!err) {
        err = new Error('Unkown error');
    }

    if (req.app.get('env') !== 'production') {
        // eslint-disable-next-line no-console
        console.error(err);
    }

    let statusCode = err.errorCode ||
        err.statusCode ||
        err.status ||
        res.statusCode ||
        500;

    res.status(statusCode).json({
        statusCode: statusCode,
        name: err.name || 'Error',
        message: err.message || 'Unkown error'
    });
});

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {

    res.render('error', {
        title: 'The Movie DB'
    });
});

module.exports = app;
