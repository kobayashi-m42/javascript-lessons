(() => {
  const canvas = document.getElementById('canvas');
  if (!canvas || !canvas.getContext) return;

  const context = canvas.getContext('2d');
  const rand = (min, max) => min + Math.floor(Math.random() * (max - min + 1));

  const balls = [];

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

  const moveBall = () => {
    context.fillStyle = '#ecf0f1';
    context.fillRect(0, 0, canvas.width, canvas.height);

    const ballsCount = balls.length;
    for (let i = 0; i < ballsCount; i += 1) {
      balls[i].draw();
      balls[i].move();
    }

    setTimeout(() => {
      moveBall();
    }, 30);
  };

  canvas.addEventListener('click', () => {
    const x = rand(100, 400);
    const y = rand(100, 200);
    const r = rand(0, 100) < 20 ? rand(50, 80) : rand(10, 35);
    balls.push(new Ball(x, y, r));
  });

  moveBall();
})();
