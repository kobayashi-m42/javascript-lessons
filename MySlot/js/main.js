(() => {
  const panels = document.getElementsByClassName('panel');
  const spin = document.getElementById('spin');

  const cards = [
    'seven.png',
    'bell.png',
    'cherry.png',
  ];

  const timers = [];
  const panelsLength = panels.length;

  /**
   * スロットの実行
   *
   * @param n
   */
  const runSlot = (n) => {
    timers[n] = setTimeout(() => {
      panels[n].children[0].src = `img/${cards[Math.floor(Math.random() * cards.length)]}`;
      runSlot(n);
    }, 50);
  };

  /**
   * パネルの停止
   */
  const stopPanel = () => {
    for (let i = 0; i < panelsLength; i += 1) {
      panels[i].children[1].addEventListener('click', (e) => {
        clearTimeout(timers[e.target.dataset.index]);
      });
    }
  };

  stopPanel();

  spin.addEventListener('click', () => {
    for (let i = 0; i < panelsLength; i += 1) {
      runSlot(i);
    }
  });
})();
