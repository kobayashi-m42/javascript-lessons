(() => {
  const menuItems = document.getElementsByClassName('menu_item');
  const contents = document.getElementsByClassName('content');

  /**
   * タブメニューを初期化
   */
  const initMenu = () => {
    for (let i = 0; i < menuItems.length; i += 1) {
      menuItems[i].className = 'menu_item';
    }
  };

  /**
   * コンテンツを初期化
   */
  const initContents = () => {
    for (let i = 0; i < contents.length; i += 1) {
      contents[i].className = 'content';
    }
  };

  /**
   * タブ押下時のイベント作成
   * @param e
   */
  const createTabEvent = e => {
    e.preventDefault();
    initMenu();
    initContents();
    e.target.className = 'menu_item active';
    document.getElementById(e.target.dataset.id).className = 'content active';
  };

  for (let i = 0; i < menuItems.length; i += 1) {
    menuItems[i].addEventListener('click', e => {
      createTabEvent(e);
    });
  }
})();
