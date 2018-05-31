(() => {
  const startButton = document.getElementById('btn');

  const SIZE = 3;
  let currentNumber = 0;
  let startTime;
  let timerId;

  const createPanel = panelNumber => {
    const panel = document.createElement('div');
    panel.className = 'panel hidden';
    panel.textContent = panelNumber;

    panel.addEventListener('click', e => {
      if (e.target.textContent - 0 === currentNumber) {
        e.target.className = 'panel flipped';
        currentNumber += 1;
      }
      if (SIZE * SIZE === currentNumber) {
        clearTimeout(timerId);
      }
    });

    return panel;
  };

  const initBoard = () => {
    const board = document.getElementById('board');
    const panels = [];

    while (board.firstChild) {
      board.removeChild(board.firstChild);
    }

    for (let i = 0; i < SIZE * SIZE; i += 1) {
      panels.push(createPanel(i));
    }

    while (panels.length) {
      const panel = panels.splice(Math.floor(Math.random() * panels.length), 1);
      board.appendChild(panel[0]);
    }
  };

  initBoard();

  const runTimer = () => {
    document.getElementById('score').textContent = (
      (Date.now() - startTime) /
      1000
    ).toFixed(2);
    timerId = setTimeout(() => {
      runTimer();
    }, 10);
  };

  startButton.addEventListener('click', () => {
    const hiddenPanels = document.getElementsByClassName('panel');
    const panelsLength = hiddenPanels.length;
    if (typeof timerId !== 'undefined') {
      clearTimeout(timerId);
    }
    currentNumber = 0;

    initBoard();

    for (let i = 0; i < panelsLength; i += 1) {
      hiddenPanels[i].className = 'panel';
    }
    startButton.innerText = 'RESTART?';
    startButton.className = 'restart';
    startTime = Date.now();
    runTimer();
  });
})();
