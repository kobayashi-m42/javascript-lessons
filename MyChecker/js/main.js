(() => {
  const cards = document.getElementById('cards');
  const check = document.getElementById('check');
  const retry = document.getElementById('retry');

  check.addEventListener('click', () => {
    cards.className = 'move';
  });

  retry.addEventListener('click', () => {
    cards.className = '';
  });
})();
