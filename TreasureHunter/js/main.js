(() => {
  const boxes = document.getElementsByClassName('box');
  const restart = document.getElementById('btn');

  const contents = ['coin.png', 'empty.png', 'cobra.png'];

  const initBtnEvent = () => {
    const boxLength = boxes.length;
    for (let i = 0; i < boxLength; i += 1) {
      boxes[i].addEventListener('click', e => {
        if (e.target.className.indexOf('shake') === -1) {
          return;
        }

        for (let j = 0; j < boxLength; j += 1) {
          boxes[j].src = `img/${
            contents[Math.floor(Math.random() * contents.length)]
          }`;
          boxes[j].className = 'box disabled';
        }
        e.target.className = 'box';
        restart.className = '';
      });
    }
  };

  initBtnEvent();
})();
