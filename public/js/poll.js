(() => {
  const boxList = document.getElementsByClassName('js-box');
  const boxLength = boxList.length;
  const answer = document.getElementById('js-answer');
  const pollBtn = document.getElementById('js-poll-btn');
  const form = document.getElementById('js-form');

  /**
   * 画像のスタイルを取り消す
   */
  const removeClass = () => {
    for (let i = 0; i < boxLength; i += 1) {
      boxList[i].classList.remove('selected');
    }
  };

  for (let i = 0; i < boxLength; i += 1) {
    boxList[i].addEventListener('click', e => {
      removeClass();
      e.target.classList.add('selected');
      answer.value = e.target.dataset.id;
    });
  }

  pollBtn.addEventListener('click', () => {
    if (answer.value === '') {
      alert('Choose One!');
      return;
    }

    form.submit();
  });
})();
