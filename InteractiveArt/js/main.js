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
      this.color = 'hsla(120, 80%, 40%, 0.8)';
    }

    draw() {
      context.beginPath();
      context.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      context.fillStyle = this.color;
      context.closePath();
      context.fill();
    }

    move() {
      this.x += this.velocityX;
      this.Y += this.velocityY;
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
