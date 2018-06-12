(() => {
  const btn = document.getElementById('btn');

  btn.addEventListener('click', e => {
    e.target.textContent = 'hit!';
  });
  btn.addEventListener('mousedown', e => {
    e.target.className = 'pushed';
  });
  btn.addEventListener('mouseup', e => {
    e.target.className = '';
  });
})();
