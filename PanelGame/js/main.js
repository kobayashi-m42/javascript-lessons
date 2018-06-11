(() => {
  const stage = document.getElementById('stage');
  const dimension = 5;
  const size = Math.floor(stage.width / dimension);
  const answer = [
    Math.floor(Math.random() * dimension),
    Math.floor(Math.random() * dimension)
  ];

  if (typeof stage.getContext === 'undefined') return;

  const context = stage.getContext('2d');

  const draw = () => {
    const offset = 2;
    for (let x = 0; x < dimension; x += 1) {
      for (let y = 0; y < dimension; y += 1) {
        if (answer[0] === x && answer[1] === y) {
          context.fillStyle = 'skyblue';
        } else {
          context.fillStyle = 'lightblue';
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

  draw();
})();
