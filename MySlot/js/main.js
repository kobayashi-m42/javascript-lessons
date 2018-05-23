(() => {
  const panels = document.getElementsByClassName('panel');
  const spin = document.getElementById('spin');

  const cards = ['seven.png', 'bell.png', 'cherry.png'];

  const timers = [];
  const panelsLength = panels.length;
  let stopCount = 0;

  /**
   * スロットの実行
   *
   * @param n
   */
  const runSlot = n => {
    timers[n] = setTimeout(() => {
      panels[n].children[0].src = `img/${
        cards[Math.floor(Math.random() * cards.length)]
      }`;
      runSlot(n);
    }, 50);
  };

  /**
   * 結果を判定
   */
  const checkResults = () => {
    const img0 = panels[0].children[0];
    const img1 = panels[1].children[0];
    const img2 = panels[2].children[0];

    if (img0.src !== img1.src && img0.src !== img2.src) {
      img0.className = 'unmatched';
    }
    if (img1.src !== img0.src && img1.src !== img2.src) {
      img1.className = 'unmatched';
    }
    if (img2.src !== img0.src && img2.src !== img1.src) {
      img2.className = 'unmatched';
    }
  };

  /**
   * パネルの停止
   *
   * @param e
   */
  const stopPanel = e => {
    if (e.target.className.indexOf('inactive') !== -1) {
      return;
    }
    clearTimeout(timers[e.target.dataset.index]);
    panels[e.target.dataset.index].children[1].className = 'stop inactive';
    stopCount += 1;
    if (stopCount === panelsLength) {
      stopCount = 0;
      checkResults();
      spin.className = '';
    }
  };

  /**
   * パネル押下時のイベント作成
   */
  const createPanelEvent = () => {
    for (let i = 0; i < panelsLength; i += 1) {
      panels[i].children[1].addEventListener('click', e => {
        stopPanel(e);
      });
    }
  };

  createPanelEvent();

  spin.addEventListener('click', e => {
    if (e.target.className.indexOf('inactive') !== -1) {
      return;
    }
    for (let i = 0; i < panelsLength; i += 1) {
      e.target.className = 'inactive';
      runSlot(i);
      panels[i].children[0].className = '';
      panels[i].children[1].className = 'stop';
    }
  });
})();
