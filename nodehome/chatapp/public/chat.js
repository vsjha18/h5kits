
var socket = io.connect("http://vivejha-ci:4000");

var message = document.getElementById('message');
var handle = document.getElementById('handle');
var btn = document.getElementById('send');
var output = document.getElementById('output');
var feedback = document.getElementById('feedback');


// emit events
//

btn.addEventListener('click', function(e){
    socket.emit("chat", {
        message: message.value,
        handle: handle.value
    });
    console.log(message.value, handle.value)
});

message.addEventListener('keypress', function(e){
    socket.emit("typing", handle.value);
});

socket.on("chat", function(data){
    output.innerHTML += '<p><strong>' + data.handle + ":" +  "</strong>" + data.message + "</p>";
    feedback.innerHTML = ""

})

socket.on("typing", function(data){
    feedback .innerHTML = "<p><em>" + data + ' is typing a message ...' + "</em></p>"
});
console.log(message, handle, send, output)
