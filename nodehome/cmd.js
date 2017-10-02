// var exec = require('child_process').exec
// var child;
// var command = "./slow.js"

// child = exec(command, function(error, stdout, stdin){
//     if (error) console.log(error)
//     console.log(stdout)
// })

var spawn = require("child_process").spawn;
var child = spawn("top");

child.stdout.on("data", function(data){
    console.log(data.toString('utf8'));
})

console.log("end of this file ...")
