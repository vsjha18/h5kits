var canvas = document.querySelector("canvas");
console.log(canvas)

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext('2d');

// c.fillStyle = "red";
// c.fillRect(200, 200, 100, 100);

// c.beginPath();
// c.moveTo(50, 300);
// c.lineTo(500, 300);
// c.strokeStyle = "red"
// c.lineWidth = 10;
// c.stroke()

// c.beginPath();
// c.arc(400, 300, 30, 0, Math.PI * 2, false);
// c.lineWidth = 2;
// c.stroke()
// var count = 10;
// function draw() {
//     for(var i=0; i < count; i++) {
//         c.beginPath();
//         c.arc(Math.random() * canvas.width, Math.random() * canvas.height, 50, 0, Math.PI * 2, false);
//         c.lineWidth = 1;
//         c.strokeStyle = "#3498db"
//         c.stroke()
//     }
// }
var colors = ['#e74c3c', '#2ecc71', '#3498db', '#9b59b6', '#f1c40f', '#2c3e50'];



var Circle = function(x,y,r) {
    var self = this;
    var random_color = colors[Math.floor(Math.random() * colors.length)];
    c.beginPath();
    self.x = x || Math.random() * canvas.width;
    self.y = y || Math.random() * canvas.height;
    self.r = r || 50;
    c.arc(self.x, self.y, self.r, 0, Math.PI * 2, false);
    c.lineWidth = 10;
    c.strokeStyle = random_color;
    c.stroke()
    return self;
}

new Circle(100, 100, 50);
// var animate = function() {
//     requestAnimationFrame(animate);
//     c.clearRect(0, 0, canvas.width, canvas.height)
//     for (var x = 100; x < 500; x++) {
//         new Circle(x, 100);
//     }
// }

// animate();