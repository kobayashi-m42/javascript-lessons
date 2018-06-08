(() => {
  const canvas = document.getElementById('canvas');
  if (!canvas || !canvas.getContext) return;

  const context = canvas.getContext('2d');

  const rand = (min, max) => min + Math.floor(Math.random() * (max - min + 1));

  class Ball {
    constructor(x, y, r) {
      this.x = x;
      this.y = y;
      this.r = r;
      this.velocityX = rand(-10, 10);
      this.velocityY = rand(-10, 10);
      this.color = `hsla(${rand(50, 100)}, ${rand(40, 80)}%, ${rand(
        50,
        60
      )}%, ${Math.random()}`;
    }

    draw() {
      context.beginPath();
      context.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      context.fillStyle = this.color;
      context.closePath();
      context.fill();
    }

    move() {
      if (this.x + this.r > canvas.width || this.x - this.r < 0) {
        this.velocityX *= -1;
      }
      if (this.y + this.r > canvas.height || this.y - this.r < 0) {
        this.velocityY *= -1;
      }
      this.x += this.velocityX;
      this.y += this.velocityY;
    }
  }

  const ball = new Ball(rand(100, 200), rand(100, 200), rand(10, 50));
  ball.draw();

  const moveBall = () => {
    context.fillStyle = '#ecf0f1';
    context.fillRect(0, 0, canvas.width, canvas.height);
    ball.draw();
    ball.move();
    setTimeout(() => {
      moveBall();
    }, 30);
  };

  moveBall();
})();
