(() => {
  const open = document.getElementById('open');
  const close = document.getElementById('close');
  const modal = document.getElementById('modal');
  const mask = document.getElementById('mask');

  open.addEventListener('click', () => {
    modal.className = '';
    mask.className = '';
  });

  close.addEventListener('click', () => {
    modal.className = 'hidden';
    mask.className = 'hidden';
  });

  mask.addEventListener('click', () => {
    close.click();
  });
})();
