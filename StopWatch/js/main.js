(() => {
  const timer = document.getElementById('timer');
  const start = document.getElementById('start');

  let startTime;

  const zeroPadding = (value, digit) => `000${value}`.slice(-digit);

  const updateTimerText = elapsedTime => {
    const m = Math.floor(elapsedTime / 60000);
    const s = Math.floor((elapsedTime % 60000) / 1000);
    const ms = elapsedTime % 1000;
    timer.textContent = `${zeroPadding(m, 2)}:${zeroPadding(
      s,
      2
    )}.${zeroPadding(ms, 3)}`;
  };

  const countUp = () => {
    setTimeout(() => {
      const elapsedTime = Date.now() - startTime;
      updateTimerText(elapsedTime);
      countUp();
    }, 10);
  };

  start.addEventListener('click', () => {
    startTime = Date.now();
    countUp();
  });
})();
