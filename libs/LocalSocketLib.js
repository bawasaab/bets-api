let $this;
let refreshIntervalIds = [];

module.exports = class LocalSocketLib {

    constructor() {
        console.log('inside LocalSocketLib');
        $this = this;
    }

    connection( socket ) {

        console.log('*******************************************************************');
        console.log('inside socket connect');
        console.log('*******************************************************************');
        $this.socket = socket;
        socket.on( 'disconnect', $this.disconnect );
        socket.on( 'message', $this.message );
        // $this.autoSend( socket );
        socket.on( 'tick', $this.tick );
    }

    disconnect( socket ) {
        console.log('inside disconnect');
    }

    message( socket ) {
        console.log('inside message');
        console.log('message socket details', socket);
    }

    tick( in_data ) {
        console.log('inside tick');
        $this.socket.emit( 'tick', in_data );
    }

    autoSend( socket ) {
        refreshIntervalIds.push( setInterval( () => {
            socket.emit('seconds');
        },1000));
    }
}