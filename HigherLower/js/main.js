(() => {
  const higherButton = document.getElementById('higher');
  const lowerButton = document.getElementById('lower');
  const dealerCard = document.getElementById('dealer_card');
  const playerCard = document.getElementById('player_card');
  const wrapper = document.getElementById('wrapper');
  const result = document.getElementById('result');

  let dealerValue;
  let playerValue;

  const generateRandomNum = () => Math.floor(Math.random() * 13 + 1);

  const prepareGame = () => {
    dealerValue = generateRandomNum();
    dealerCard.textContent = dealerValue;
    playerValue = generateRandomNum();
    playerCard.textContent = playerValue;
    wrapper.removeEventListener('transitionend', prepareGame);
  };

  const judgeGuess = guess => {
    if (
      (guess === 'higher' && dealerValue < playerValue) ||
      (guess === 'lower' && dealerValue > playerValue)
    ) {
      return 'You win!';
    }
    return 'You lose...';
  };

  const displayResult = guess => {
    result.classList.remove('hidden');
    wrapper.classList.add('open');

    let resultText;
    if (dealerValue === playerValue) {
      resultText = 'draw';
    } else {
      resultText = judgeGuess(guess);
    }
    result.textContent = resultText;
  };

  prepareGame();

  higherButton.addEventListener('click', () => {
    displayResult('higher');
  });

  lowerButton.addEventListener('click', () => {
    displayResult('lower');
  });

  dealerCard.addEventListener('click', () => {
    result.classList.add('hidden');
    wrapper.classList.remove('open');
    wrapper.addEventListener('transitionend', prepareGame);
  });
})();
