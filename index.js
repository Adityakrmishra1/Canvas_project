var canvas = document.querySelector("canvas");
var c = canvas.getContext("2d");
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;
// event listner for window resinzing
window.addEventListener("resize", function () {
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;
    //calling init function to fill remaning space on resizing;
    init();
});

//mouse object
var mouse = {
    x: undefined,
    y: undefined,
};

// event Listner

window.addEventListener("mousemove", function (e) {
    mouse.x = e.x;
    mouse.y = e.y;
    // console.log(mouse);
});

// color pallet

var color = ["#E7E84C", "#FBFF87", "#FFDF00", "#E8D051", "#FFF249"];
var color2 = ["#fb743e", "#383e56", "#9fb8ad", "#c5d7bd",];

// max radius and min radius
var maxRadius = 40;
var minRadius = 10;

// for rectangle

var maxLength = 20;
var minLength = 1;
var maxWidth = 20;
var minWidth = 1;

//arrays

var circleArray = [];
var RectangleArray = [];

// functions
function Circle(x, y, dx, dy, r) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.r = r;
    this.color3 = color2[Math.floor(Math.random() * color2.length)];
    this.draw = function () {
        c.beginPath();
        c.arc(this.x, this.y, this.r, 0, Math.PI * 2, false);
        c.fillStyle = this.color3;
        c.fill();
    };
    this.update = function () {
        if (this.x + this.r > innerWidth || this.x - this.r < 0) this.dx = -this.dx;
        if (this.y + this.r > innerHeight || this.y - this.r < 0)
            this.dy = -this.dy;

        this.x += this.dx;
        this.y += this.dy;

        // increasing size and decreasing it

        if (Math.abs(mouse.x - this.x) <= 50 && Math.abs(mouse.y - this.y) <= 50) {
            if (this.r < maxRadius) this.r += 1;
        } else if (this.r > minRadius) {
            this.r -= 1;
        }
        this.draw();
    };
}

function Rectangle(x, y, dx, dy, l, r) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.l = l;
    this.r = r;

    this.color4 = color[Math.floor(Math.random() * color.length)];

    this.draw = function () {
        c.fillStyle = this.color4;
        c.fillRect(this.x, this.y, this.l, this.r);
    };
    this.update = function () {
        if (this.x + this.l > innerWidth || this.x - this.l < 0) this.dx = -this.dx;
        if (this.y + this.r > innerHeight || this.y - this.r < 0)
            this.dy = -this.dy;

        this.x += this.dx;
        this.y += this.dy;

        if (Math.abs(mouse.x - this.x) <= 50 && Math.abs(mouse.y - this.y) <= 50) {
            if (this.l < maxLength && this.r < maxWidth) {
                this.l += 1;
                this.r += 1;
            }
        } else if (this.l > minLength && this.r > minWidth) {
            this.r -= 1;
            this.l -= 1;
        }
        this.draw();
    };
}
var circle = new Rectangle(100, 200, 4, 4, 30, 30);

function init() {
    for (var i = 0; i < 1000; i++) {
        var x = Math.random() * innerWidth;
        var y = Math.random() * innerHeight;
        var dx = (Math.random() - 0.5) * 5;
        var dy = (Math.random() - 0.5) * 5;
        var l = Math.random() * 5 + 5;
        var r = Math.random() * 5 + 5;
        RectangleArray.push(new Rectangle(x, y, dx, dy, l, r));
    }
    for (var i = 0; i < 1000; i++) {
        var x = Math.random() * innerWidth;
        var y = Math.random() * innerHeight;
        var r = Math.random() * 15 + 1;
        var dx = (Math.random() - 0.5) * 2;
        var dy = (Math.random() - 0.5) * 2;
        circleArray.push(new Circle(x, y, dx, dy, r));
    }
    animate();
}

function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, innerWidth, innerHeight);
    for (let i = 0; i < RectangleArray.length; i++) {
        RectangleArray[i].update();
    }
    for (let i = 0; i < circleArray.length; i++) {
        circleArray[i].update();
    }
}

init();
