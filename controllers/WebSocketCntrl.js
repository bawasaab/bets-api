let url = 'ws://148.251.21.118:5570';

let $this;
let $ws;

module.exports = class WebSocketCntrl {

    constructor( ws ) {
        $this = this;
        $ws = ws;
    }

    open() {

        console.log('inside WebSocket connection');

        // $ws.on( 'open', ( result ) => {
        //     console.log('open', result);
        // } );

        $ws.on( 'connect', ( result ) => {
            console.log('deep_connect', result);
        } );

        $ws.on( 'message', ( result ) => {
            console.log('deep_message', result);
            $ws.emit( 'tick', result );
        } );

        $ws.on( 'error', ( err ) => {
            console.log('deep_error', err.toString());
        } );

        $ws.on( 'close', ( result ) => {
            console.log('deep_close', result);
        } );
    }
}