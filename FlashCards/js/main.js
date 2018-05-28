(() => {
  const card = document.getElementById('card');
  const cardFront = document.getElementById('card-front');
  const cardBack = document.getElementById('card-back');
  const nextBtn = document.getElementById('btn');

  const words = [
    { en: 'read', ja: '読む' },
    { en: 'write', ja: '書く' },
    { en: 'eat', ja: '食べる' },
    { en: 'run', ja: '走る' },
    { en: 'walk', ja: '歩く' }
  ];

  const flip = () => {
    card.className = card.className === '' ? 'open' : '';
  };

  const setCard = () => {
    const wordsNumber = Math.floor(Math.random() * words.length);
    cardFront.innerHTML = words[wordsNumber].en;
    cardBack.innerHTML = words[wordsNumber].ja;
    card.removeEventListener('transitionend', setCard);
  };

  const next = () => {
    if (card.className === 'open') {
      card.addEventListener('transitionend', setCard);
      flip();
    } else {
      setCard();
    }
  };

  card.addEventListener('click', () => {
    flip();
  });

  nextBtn.addEventListener('click', () => {
    next();
  });

  setCard();
})();
