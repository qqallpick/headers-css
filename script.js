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
        if (this.x + this.radius >= canvas.width){
            this.dx = -this.dx; 
            this.x = canvas.width -this.radius;
        }
        if( this.x - this.radius <= 0){
            this.dx = -this.dx;  
            this.x = this.radius;
        }  
        if (this.y + this.radius >= canvas.height){
            this.dy = -this.dy;  
            this.y = canvas.height -this.radius;
        }
         if(this.y - this.radius <= 0) {  
            this.dy = -this.dy;  
            this.y = this.radius;
        }  
    }  

collideWith(otherBall) {  
    const dx = this.x - otherBall.x;  
    const dy = this.y - otherBall.y;  
    const distance = Math.sqrt(dx * dx + dy * dy);  
  
    if (distance <= this.radius + otherBall.radius) {  
        // 计算重叠量（如果需要更精确的物理效果）  
        const overlap = (this.radius + otherBall.radius) - distance;  
  
        // 标准化方向向量  
        const nx = dx / distance;  
        const ny = dy / distance;  
  
        // 计算碰撞后的速度  
        // 假设碰撞是弹性的，因此系数恢复(coefficient of restitution)为1  
        const vxA = this.dx; // Ball A的速度x分量  
        const vyA = this.dy; // Ball A的速度y分量  
        const vxB = otherBall.dx; // Ball B的速度x分量  
        const vyB = otherBall.dy; // Ball B的速度y分量  
  
        // 计算碰撞后的速度分量  
        const vxAf = vxA - (1 * nx * (nx * vxA + ny * vyA - nx * vxB - ny * vyB));  
        const vyAf = vyA - (1 * ny * (nx * vxA + ny * vyA - nx * vxB - ny * vyB));  
        const vxBf = vxB - (1 * nx * (nx * vxA + ny * vyA - nx * vxB - ny * vyB));  
        const vyBf = vyB - (1 * ny * (nx * vxA + ny * vyA - nx * vxB - ny * vyB));  
  
        // 更新小球的速度  
        this.dx = vxAf;  
        this.dy = vyAf;  
        otherBall.dx = vxBf;  
        otherBall.dy = vyBf;  
  
        // 为了防止小球“卡住”在彼此内部，可以稍微移动它们  
        // 这里我们简单地沿碰撞法线方向移动它们  
        this.x -= nx * overlap * 1;  
        this.y -= ny * overlap * 1;  
        otherBall.x += nx * overlap * 1;  
        otherBall.y += ny * overlap * 1;  
    }  
}  

}  
  
const ball1 = new Ball(10, 10, 5, 0.3, -0.5,"#f9ed69");  
const ball2 = new Ball(210, 10, 3, 0.7, -0.6,"#f08a5d");  
function animate() {  

    requestAnimationFrame(animate);  

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ball1.collideWith(ball2);
    ball2.collideWith(ball1);
    ball1.update();  
    ball2.update();
    ball1.draw();   
    ball2.draw();
}  
  
animate();