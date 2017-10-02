var express = require('express');
var socket = require('socket.io');
var spawn = require("child_process").spawn;

var app = express();
var server = app.listen(4000, function(){
    console.log('server finally started ...')
});

app.use(express.static('public'))

var io = socket(server);

io.on("connection", function(s){
    console.log("connection made to client:", s.id)
    s.on("start", function(command){
        // we have to run the command.
        if (command != "") {
            console.log("command: " + command)
            var command = command.split(" ");
            var baseCommand = command[0];
            var predicate = command.slice(1, command.length);
            try {
                var child = spawn(baseCommand, predicate);
                child.stdout.on("data", function(data){
                    s.emit("output", data.toString('utf8'));
                })
            } catch(err) {
                s.emit("output", "enter a valid command pls");
            }

        } else {
            s.emit("output", "empty command");
        }

    })
    // s.on("wcommand", function(){
    //     // send to just one
    //     s.emit("wcommand", Math.random(0, 10)*10)
    //     console.log("received wcommand event")
    // });
    // // send to all, excluding the sender.
    // s.on("chat", function(data) {
    //     io.sockets.emit("chat", data);
    //     console.log(data);
    // })

    // // send to including the sender.
    // s.on("typing", function(data){
    //     s.broadcast.emit("typing", data);
    // })
});
