(() => {
  const openMenu = document.getElementById('open_menu');
  const closeMenu = document.getElementById('close_menu');
  const menu = document.getElementById('menu');

  openMenu.addEventListener('click', () => {
    menu.classList.add('shown');
  });

  closeMenu.addEventListener('click', () => {
    menu.classList.remove('shown');
  });
})();
