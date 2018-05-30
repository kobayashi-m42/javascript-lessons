(() => {
  const target = document.getElementById('target');
  const scoreLabel = document.getElementById('score');
  const missLabel = document.getElementById('miss');

  const currentWord = 'apple';
  let currentLocation = 0;
  let score = 0;
  let miss = 0;

  target.innerText = currentWord;
  scoreLabel.innerText = score;
  missLabel.innerText = miss;

  window.addEventListener('keyup', e => {
    if (
      String.fromCharCode(e.keyCode) ===
      currentWord[currentLocation].toUpperCase()
    ) {
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
    } else {
      miss += 1;
      missLabel.innerText = miss;
    }
  });
})();
