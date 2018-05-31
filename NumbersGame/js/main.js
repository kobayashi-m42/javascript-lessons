(() => {
  const board = document.getElementById('board');
  const SIZE = 3;
  let currentNumber = 0;

  const createPanel = panelNumber => {
    const panel = document.createElement('div');
    panel.className = 'panel hidden';
    panel.textContent = panelNumber;

    panel.addEventListener('click', e => {
      if (e.target.textContent - 0 === currentNumber) {
        e.target.className = 'panel flipped';
        currentNumber += 1;
      }
    });

    return panel;
  };

  for (let i = 0; i < SIZE * SIZE; i += 1) {
    board.appendChild(createPanel(i));
  }
})();
