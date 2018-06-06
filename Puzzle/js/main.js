(() => {
  const canvas = document.getElementById('stage');

  if (!canvas.getContext) {
    alert('Canvas not supported ...');
    return;
  }

  const tiles = [];

  const ROW_COUNT = 4;
  const COLUMN_COUNT = 4;
  const PIC_WIDTH = 280;
  const PIC_HEIGHT = 280;
  const TILE_WIDTH = PIC_WIDTH / COLUMN_COUNT;
  const TILE_HEIGHT = PIC_HEIGHT / ROW_COUNT;

  const context = canvas.getContext('2d');
  const IMAGE_URL = 'img/15puzzle.png';
  const image = document.createElement('img');
  image.src = IMAGE_URL;

  /**
   * タイルを配列に格納する
   */
  const initTiles = () => {
    for (let row = 0; row < ROW_COUNT; row += 1) {
      tiles[row] = [];
      for (let col = 0; col < COLUMN_COUNT; col += 1) {
        tiles[row][col] = row * COLUMN_COUNT + col;
      }
    }
    tiles[ROW_COUNT - 1][COLUMN_COUNT - 1] = -1;
  };

  /**
   * パズルを画面に表示する
   */
  const drawPuzzle = () => {
    for (let row = 0; row < ROW_COUNT; row += 1) {
      for (let col = 0; col < COLUMN_COUNT; col += 1) {
        const dx = col * TILE_WIDTH;
        const dy = row * TILE_HEIGHT;

        if (tiles[row][col] === -1) {
          context.fillStyle = '#eeeeee';
          context.fillRect(dx, dy, TILE_WIDTH, TILE_HEIGHT);
        } else {
          const sx = (tiles[row][col] % COLUMN_COUNT) * TILE_WIDTH;
          const sy = Math.floor(tiles[row][col] / COLUMN_COUNT) * TILE_HEIGHT;
          context.drawImage(
            image,
            sx,
            sy,
            TILE_WIDTH,
            TILE_HEIGHT,
            dx,
            dy,
            TILE_WIDTH,
            TILE_HEIGHT
          );
        }
      }
    }
  };

  image.addEventListener('load', () => {
    initTiles();
    drawPuzzle();
  });
})();
