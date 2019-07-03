const path = require('path');
const express = require('express');
const app = express();


//settings
app.set('port', process.env.PORT || 3000);

//static files
app.use(express.static(path.join(__dirname,'public')));

app.get('/',(req,res) => {
    res.render('index.html');
})

const server = app.listen(app.get('port'),() =>{
    console.log("server on port", app.get('port'));
});

const SocketIO = require('socket.io');
const io = SocketIO.listen(server); 

//websocket
io.on('connection',(socket) => {
    console.log("new conection :D!", socket.id);

    socket.on('chat:message',(data) => {
        io.sockets.emit('chat:message',data);
    });

    socket.on('chat:typing', (data) =>{
        socket.broadcast.emit('chat:typing', data);
    });
});