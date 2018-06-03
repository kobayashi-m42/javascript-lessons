(() => {
  const higherButton = document.getElementById('higher');
  const lowerButton = document.getElementById('lower');
  const dealerCard = document.getElementById('dealer_card');
  const playerCard = document.getElementById('player_card');
  const wrapper = document.getElementById('wrapper');
  const result = document.getElementById('result');

  const generateRandomNum = () => Math.floor(Math.random() * 13 + 1);

  const initCard = () => {
    dealerCard.textContent = generateRandomNum();
    playerCard.textContent = generateRandomNum();
  };

  initCard();
})();
