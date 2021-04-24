let url = 'ws://148.251.21.118:5570';

let $this;

module.exports = class WebSocket {

    constructor() {
        $this = this;
    }

    connection( socket ) {

        socket.on( 'connect', ( result ) => {
            console.log('deep_connect', result);
        } );

        socket.on( 'open', ( result ) => {
            console.log('open', result);
        } );

        socket.on( 'message', ( result ) => {
            console.log('deep_message', result);
        } );

        socket.on( 'error', ( err ) => {
            console.log('deep_error', err.toString());
        } );

        socket.on( 'close', ( result ) => {
            // console.log('close', result.toString());
            console.log('deep_close', result);
        } );
    }
}