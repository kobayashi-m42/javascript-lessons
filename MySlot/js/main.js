(() => {
  const panels = document.getElementsByClassName('panel');
  const spin = document.getElementById('spin');

  const cards = [
    'seven.png',
    'bell.png',
    'cherry.png',
  ];

  /**
   * スロットの実行
   *
   * @param n
   */
  const runSlot  = (n) => {
    setTimeout(() => {
      panels[n].children[0].src = `img/${cards[Math.floor(Math.random() * cards.length)]}`;
      runSlot(n);
    },50);
  };

  spin.addEventListener('click', () => {
    const panelsLength = panels.length
    for (let i = 0; i < panelsLength; i += 1) {
      runSlot(i);
    }
  });
})();
