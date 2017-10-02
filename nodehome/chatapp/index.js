var express = require('express');
var socket = require('socket.io');

var app = express();
var server = app.listen(4000, function(){
    console.log('server finally started ...')
});

app.use(express.static('public'))

var io = socket(server);

io.on("connection", function(s){
    console.log("connection made:", s.id)

    s.on("chat", function(data) {
        io.sockets.emit("chat", data);
        console.log(data);
    })

    s.on("typing", function(data){
        s.broadcast.emit("typing", data);
    })
})

