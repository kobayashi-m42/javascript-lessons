(() => {
  const board = document.getElementById('board');
  const startButton = document.getElementById('btn');

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

  const panels = [];
  for (let i = 0; i < SIZE * SIZE; i += 1) {
    panels.push(createPanel(i));
  }

  while (panels.length) {
    const panel = panels.splice(Math.floor(Math.random() * panels.length), 1);
    board.appendChild(panel[0]);
  }

  startButton.addEventListener('click', () => {
    const hiddnPanels = document.getElementsByClassName('panel');
    const panelsLength = hiddnPanels.length;
    for (let i = 0; i < panelsLength; i += 1) {
      hiddnPanels[i].className = 'panel';
    }
  });
})();
