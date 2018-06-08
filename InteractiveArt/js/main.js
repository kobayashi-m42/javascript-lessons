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
      this.color = 'hsla(120, 80%, 40%, 0.8)';
    }

    draw() {
      context.beginPath();
      context.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      context.fillStyle = this.color;
      context.closePath();
      context.fill();
    }
  }

  const ball = new Ball(rand(100, 200), rand(100, 200), rand(10, 50));
  ball.draw();
})();
