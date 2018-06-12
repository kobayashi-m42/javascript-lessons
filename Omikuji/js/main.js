(() => {
  const btn = document.getElementById('btn');

  btn.addEventListener('click', e => {
    const results = ['大吉', '中吉', '凶', '末吉'];
    const number = Math.floor(Math.random() * results.length);
    e.target.textContent = results[number];
  });
  btn.addEventListener('mousedown', e => {
    e.target.className = 'pushed';
  });
  btn.addEventListener('mouseup', e => {
    e.target.className = '';
  });
})();
