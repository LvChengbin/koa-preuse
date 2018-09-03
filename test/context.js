const http = require( 'http' );
const Stream = require( 'stream' );

module.exports = () => {
    const socket = new Stream.Duplex();
    const req = new Stream.Readable();

    for( const prop in http.ClientRequest.prototype ) {
        req[ prop ] = http.ClientRequest.prototype[ prop ];
    }
    req.socket = socket;
    req.method = 'GET';
    req.url = 'http://127.0.0.1';
    req.path = '/';
    req.body = {};
    req.headers = {};

    const res = new http.ServerResponse( req );

    socket._read = () => {};
    socket._write = () => {};
    res.assignSocket( socket );
    return [ req, res ];
};
