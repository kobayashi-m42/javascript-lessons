(() => {
  const files = [
    'img/food0.jpg',
    'img/food1.jpg',
    'img/food2.jpg',
    'img/food3.jpg'
  ];
  const filesLength = files.length;

  let currentNumber = 0;

  const prev = document.getElementById('prev');
  const next = document.getElementById('next');
  const target = document.getElementById('target');
  const thumbnails = document.getElementById('thumbnails');
  const play = document.getElementById('play');
  const pause = document.getElementById('pause');

  let timerID;

  /**
   * リストクリック時の処理
   *
   * @param e
   */
  const listClickEvent = e => {
    target.src = e.currentTarget.children[0].src;
    thumbnails.children[currentNumber].className = '';
    e.currentTarget.className = 'current';
    currentNumber = e.currentTarget.dataset.index;
  };

  /**
   * サムネイルを作成する
   */
  const createThumbnails = () => {
    for (let i = 0; i < filesLength; i += 1) {
      const li = document.createElement('li');
      li.dataset.index = i;
      li.addEventListener('click', e => {
        listClickEvent(e);
      });
      const img = document.createElement('img');
      img.src = files[i];
      li.appendChild(img);
      thumbnails.appendChild(li);
    }
  };

  const playSideshow = () => {
    timerID = setTimeout(() => {
      next.click();
      playSideshow();
    }, 1500);
  };

  createThumbnails();

  thumbnails.children[currentNumber].className = 'current';

  prev.addEventListener('click', () => {
    thumbnails.children[currentNumber].className = '';
    currentNumber -= 1;
    if (currentNumber < 0) {
      currentNumber = filesLength - 1;
    }
    target.src = files[currentNumber];
    thumbnails.children[currentNumber].className = 'current';
  });

  next.addEventListener('click', () => {
    thumbnails.children[currentNumber].className = '';
    currentNumber += 1;
    if (currentNumber > filesLength - 1) {
      currentNumber = 0;
    }
    target.src = files[currentNumber];
    thumbnails.children[currentNumber].className = 'current';
  });

  play.addEventListener('click', () => {
    playSideshow();
    play.className = 'hidden';
    pause.className = '';
  });

  pause.addEventListener('click', () => {
    clearTimeout(timerID);
    play.className = '';
    pause.className = 'hidden';
  });
})();
