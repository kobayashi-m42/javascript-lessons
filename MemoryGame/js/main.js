(() => {
  const pairs = 2;
  const cards = [];

  let flipCount = 0;
  let firstCard = null;
  let secondCard = null;

  const judgeNumber = () => {
    if (
      firstCard.children[0].textContent !== secondCard.children[0].textContent
    ) {
      firstCard.className = 'card';
      secondCard.className = 'card';
    }
    secondCard.removeEventListener('transitionend', judgeNumber);
    firstCard = null;
    secondCard = null;
  };

  const flipCard = card => {
    if (firstCard !== null && secondCard !== null) {
      return;
    }

    const openCard = card;
    openCard.className = 'card open';

    flipCount += 1;

    if (flipCount % 2 === 1) {
      firstCard = openCard;
    } else {
      secondCard = openCard;
      secondCard.addEventListener('transitionend', judgeNumber);
    }
  };

  const createCard = num => {
    const container = document.createElement('div');
    container.className = 'card-container';

    const card = document.createElement('div');
    card.className = 'card';

    const inner = `<div class="card-front">${num}</div><div class="card-back">?</div>`;
    card.innerHTML = inner;

    card.addEventListener('click', () => {
      flipCard(card);
    });

    container.appendChild(card);

    return container;
  };

  const initCard = () => {
    for (let i = 1; i <= pairs; i += 1) {
      cards.push(createCard(i));
      cards.push(createCard(i));
    }

    while (cards.length) {
      const card = cards.splice(
        Math.fround(Math.random() * cards.length),
        1
      )[0];
      document.getElementById('stage').appendChild(card);
    }
  };

  initCard();
})();
