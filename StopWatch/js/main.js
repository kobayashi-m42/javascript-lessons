(() => {
  const timer = document.getElementById('timer');
  const start = document.getElementById('start');
  const stop = document.getElementById('stop');
  const reset = document.getElementById('reset');

  let startTime;
  let elapsedTime = 0;
  let timerId;
  let timeToAdd = 0;

  let isRunning = false;

  const zeroPadding = (value, digit) => `000${value}`.slice(-digit);

  const updateTimerText = () => {
    const m = Math.floor(elapsedTime / 60000);
    const s = Math.floor((elapsedTime % 60000) / 1000);
    const ms = elapsedTime % 1000;
    timer.textContent = `${zeroPadding(m, 2)}:${zeroPadding(
      s,
      2
    )}.${zeroPadding(ms, 3)}`;
  };

  const countUp = () => {
    timerId = setTimeout(() => {
      elapsedTime = Date.now() - startTime + timeToAdd;
      updateTimerText(elapsedTime);
      countUp();
    }, 10);
  };

  start.addEventListener('click', () => {
    if (isRunning === true) return;
    isRunning = true;
    startTime = Date.now();
    countUp();
  });

  stop.addEventListener('click', () => {
    if (isRunning === false) return;
    isRunning = false;
    clearTimeout(timerId);
    timeToAdd += Date.now() - startTime;
  });

  reset.addEventListener('click', () => {
    if (isRunning === true) return;
    elapsedTime = 0;
    timeToAdd = 0;
    updateTimerText();
  });
})();
