(() => {
  const card = document.getElementById('card');

  const flip = () => {
    card.className = card.className === '' ? 'open' : '';
  };

  card.addEventListener('click', () => {
    flip();
  });
})();
