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

  class Stage {
    moveBall() {
      Stage.clear();
      const ballsCount = balls.length;
      for (let i = 0; i < ballsCount; i += 1) {
        balls[i].draw();
        balls[i].move();
      }

      setTimeout(() => {
        this.moveBall();
      }, 30);
    }

    static clear() {
      context.fillStyle = '#ecf0f1';
      context.fillRect(0, 0, canvas.width, canvas.height);
    }
  }

  const adjustPosition = (position, r, max) => {
    if (position - r < 0) {
      return r;
    } else if (position + r > max) {
      return max - r;
    }
    return position;
  };

  canvas.addEventListener('click', e => {
    const rect = e.target.getBoundingClientRect();
    let x = e.clientX - rect.left;
    let y = e.clientY - rect.top;
    const r = rand(0, 100) < 20 ? rand(50, 80) : rand(10, 35);

    x = adjustPosition(x, r, canvas.width);
    y = adjustPosition(y, r, canvas.height);

    balls.push(new Ball(x, y, r));
  });

  const stage = new Stage();
  stage.moveBall();
})();
