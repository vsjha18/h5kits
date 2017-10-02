
var socket = io.connect("http://localhost:4000");

var start = document.getElementById('start');
var end = document.getElementById('end');
var command = document.getElementById('command');
var output = document.getElementById('output');

console.log(start, end, command, output)

// emit events
start.addEventListener('click', function(e){
    socket.emit("start", command.value);
    output.innerHTML = "";
    console.log("command: " + command.value);
});

document.addEventListener("keypress", function(e) {
    var keycode = (e.keyCode ? e.keyCode : e.which);
    if (keycode == '13') {
        socket.emit("start", command.value);
        output.innerHTML = "";
        console.log("command: " + command.value);
        command.value = "";
    }
})

end.addEventListener('click', function(e){
    socket.emit("end");
    console.log("end button pressed")
});


socket.on("output", function(data){
    output.innerHTML += data;
});