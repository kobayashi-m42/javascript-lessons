(() => {
  const bingo = [];

  /**
   * ビンゴの数値を初期化する
   */
  const initBingoNumber = () => {
    for (let row = 0; row < 5; row += 1) {
      const nums = [];
      for (let col = 0; col < 5; col += 1) {
        const num = Math.floor(Math.random() * 15 + 1) + row * 15;
        nums.push(num);
      }
      bingo[row] = nums;
    }
    bingo[2][2] = 'FREE';
  };

  /**
   * ビンゴを画面に表示する
   */
  const display = () => {
    const tbody = document.querySelector('tbody');

    for (let col = 0; col < 5; col += 1) {
      const tr = document.createElement('tr');

      for (let row = 0; row < 5; row += 1) {
        const td = document.createElement('td');
        td.textContent = bingo[row][col];
        tr.appendChild(td);
      }

      tbody.appendChild(tr);
    }
  };

  initBingoNumber();
  display();
})();
