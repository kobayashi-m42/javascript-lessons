(() => {
  const words = ['apple', 'imagine', 'supply', 'fun', 'happy', 'air', 'sky'];

  const target = document.getElementById('target');
  const scoreLabel = document.getElementById('score');
  const missLabel = document.getElementById('miss');
  const timerLabel = document.getElementById('timer');

  let currentWord;
  let currentLocation;
  let score;
  let miss;
  let timer;
  let isStarted = false;

  const init = () => {
    currentWord = 'click to start';
    currentLocation = 0;
    score = 0;
    miss = 0;
    timer = 10;
    isStarted = false;
    target.innerText = currentWord;
    scoreLabel.innerText = score;
    missLabel.innerText = miss;
    timerLabel.innerText = timer;
  };

  const configureTarget = () => {
    currentWord = words[Math.floor(Math.random() * words.length)];
    target.innerText = currentWord;
    currentLocation = 0;
  };

  const updateTimer = () => {
    setTimeout(() => {
      timer -= 1;
      timerLabel.innerText = timer;
      if (timer <= 0) {
        const accuracy =
          score + miss === 0
            ? '0.00'
            : (score / (score + miss) * 100).toFixed(2);

        alert(`${score} letters, ${miss} miss! ${accuracy} % accuracy`);
        init();
        return;
      }
      updateTimer();
    }, 1000);
  };

  window.addEventListener('click', () => {
    if (isStarted) {
      return;
    }
    isStarted = true;
    configureTarget();
    updateTimer();
  });

  window.addEventListener('keyup', e => {
    if (
      String.fromCharCode(e.keyCode) ===
      currentWord[currentLocation].toUpperCase()
    ) {
      if (!isStarted) {
        return;
      }
      currentLocation += 1;

      let placeholder = '';
      for (let i = 0; i < currentLocation; i += 1) {
        placeholder += '_';
      }
      target.innerText = `${placeholder}${currentWord.substring(
        currentLocation
      )}`;
      score += 1;

      scoreLabel.innerText = score;

      if (currentWord.length === currentLocation) {
        configureTarget();
      }
    } else {
      miss += 1;
      missLabel.innerText = miss;
    }
  });

  init();
})();
