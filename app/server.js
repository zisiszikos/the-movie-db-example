'use strict';

var app = require('./worker');
var http = require('http');

app.set('port', process.env.PORT || 3000);
var httpServer = http.createServer(app);

httpServer.listen(app.get('port'), () => {

    if (process.env.NODE_ENV === 'local' ||
        process.env.NODE_ENV === 'development') {
        // eslint-disable-next-line no-console
        console.log('Listening on port ' + app.get('port'));
    }
});
