(() => {
  const pairs = 2;
  const cards = [];

  const createCard = num => {
    const container = document.createElement('div');
    container.className = 'card-container';

    const card = document.createElement('div');
    card.className = 'card';
    card.addEventListener('click', () => {
      card.className = 'card open';
    });

    const inner = `<div class="card-front">${num}</div><div class="card-back">?</div>`;

    card.innerHTML = inner;
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
