(() => {
  const stage = document.getElementById('stage');
  let count = 0;
  let dimension;
  let size;
  let answer = [];
  let isPlaying = true;

  if (typeof stage.getContext === 'undefined') return;

  const context = stage.getContext('2d');

  const init = () => {
    dimension = Math.floor(count / 3) + 2;
    size = Math.floor(stage.width / dimension);
    answer = [
      Math.floor(Math.random() * dimension),
      Math.floor(Math.random() * dimension)
    ];
  };

  const draw = () => {
    const offset = 2;
    const hue = Math.random() * 360;
    const baseColor = `hsl(${hue}, 80%, 50%`;
    const lightness = Math.max(75 - count, 53);
    const answerColor = `hsl(${hue}, 80%, ${lightness}%`;

    context.clearRect(0, 0, stage.width, stage.height);

    for (let x = 0; x < dimension; x += 1) {
      for (let y = 0; y < dimension; y += 1) {
        if (answer[0] === x && answer[1] === y) {
          context.fillStyle = answerColor;
        } else {
          context.fillStyle = baseColor;
        }
        context.fillRect(
          size * x + offset,
          size * y + offset,
          size - offset * 2,
          size - offset * 2
        );
      }
    }
  };

  stage.addEventListener('click', e => {
    if (isPlaying === false) {
      return;
    }
    const rect = e.target.getBoundingClientRect();
    const x = e.pageX - rect.left - window.scrollX;
    const y = e.pageY - rect.top - window.scrollY;
    const replay = document.getElementById('replay');

    if (
      answer[0] === Math.floor(x / size) &&
      answer[1] === Math.floor(y / size)
    ) {
      count += 1;
      init();
      draw();
    } else {
      alert(`Your score: ${count}`);
      isPlaying = false;
      replay.className = '';
    }
  });

  init();
  draw();
})();
