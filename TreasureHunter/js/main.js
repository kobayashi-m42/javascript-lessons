(() => {
  const boxes = document.getElementsByClassName('box');

  const contents = ['coin.png', 'empty.png', 'cobra.png'];

  const initBtnEvent = () => {
    const boxLength = boxes.length;
    for (let i = 0; i < boxLength; i += 1) {
      boxes[i].addEventListener('click', e => {
        for (let j = 0; j < boxLength; j += 1) {
          boxes[j].src = `img/${
            contents[Math.floor(Math.random() * contents.length)]
          }`;
          boxes[j].className = 'box disabled';
        }
        e.target.className = 'box';
      });
    }
  };

  initBtnEvent();
})();
