const canvas = document.getElementById('myCanvas');  
const ctx = canvas.getContext('2d');  
  
class Ball {  
    constructor(x, y, radius, dx, dy, color) {  
        this.x = x;  
        this.y = y;  
        this.radius = radius;  
        this.dx = dx;  
        this.dy = dy;  
        this.color = color;
    }  
  
    draw() {  
        ctx.beginPath();  
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);  
        ctx.fillStyle = this.color;  
        ctx.fill();  
        ctx.closePath();  
    }  
  
    update() {  
        this.x += this.dx;  
        this.y += this.dy;  
  
        // 边界碰撞检测  
        if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {  
            this.dx = -this.dx;  
        }  
        if (this.y + this.radius > canvas.height || this.y - this.radius < 0) {  
            this.dy = -this.dy;  
        }  
    }  
}  
  
const ball1 = new Ball(10, 10, 5, 1, -1,"#f9ed69");  
 
function animate() {  

    requestAnimationFrame(animate);  

    ctx.clearRect(0, 0, canvas.width, canvas.height);  
  
    ball1.update();  

    ball1.draw();  

}  
  
animate();