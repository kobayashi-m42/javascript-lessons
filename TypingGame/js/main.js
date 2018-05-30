(() => {
  const target = document.getElementById('target');
  const scoreLabel = document.getElementById('score');
  const missLabel = document.getElementById('miss');

  const currentWord = 'apple';
  const score = 0;
  const miss = 0;

  target.innerText = currentWord;
  scoreLabel.innerText = score;
  missLabel.innerText = miss;
})();
