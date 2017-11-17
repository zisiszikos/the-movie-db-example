const app = require('./worker');
const http = require('http');

app.set('port', process.env.PORT || 3000);
const httpServer = http.createServer(app);

const startServer = () => {
    return new Promise(resolve => {
        httpServer.listen(app.get('port'), () => {
            if (process.env.NODE_ENV === 'local' || process.env.NODE_ENV === 'development') {
                // eslint-disable-next-line no-console
                console.log('Listening on port ' + app.get('port'));
            }
            resolve();
        });
    });
};

const stopServer = () => {
    return new Promise(resolve => {
        httpServer.close(resolve);
    });
};

module.exports.startServer = startServer;
module.exports.stopServer = stopServer;

if (!module.parent) {
    startServer();
}
