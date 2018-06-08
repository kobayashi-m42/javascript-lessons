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
  const UDLR = [[0, 1], [0, -1], [-1, 0], [1, 0]];
  const moveCount = 40;

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

  /**
   * 空白のタイルを移動し、パズルをシャッフルする
   *
   * @param count
   */
  const moveBlank = count => {
    let blankRow = ROW_COUNT - 1;
    let blankCol = COLUMN_COUNT - 1;
    let movedCount = count;

    while (movedCount >= 0) {
      const targetPosition = Math.floor(Math.random() * UDLR.length);
      const targetRow = blankRow + UDLR[targetPosition][1];
      const targetCol = blankCol + UDLR[targetPosition][0];
      // console.log(`${targetRow}:${targetCol}`);

      if (
        targetRow >= 0 &&
        targetRow < ROW_COUNT &&
        targetCol >= 0 &&
        targetCol < COLUMN_COUNT
      ) {
        tiles[blankRow][blankCol] = tiles[targetRow][targetCol];
        tiles[targetRow][targetCol] = -1;
        blankRow = targetRow;
        blankCol = targetCol;

        movedCount -= 1;
      }
    }
  };

  image.addEventListener('load', () => {
    initTiles();
    moveBlank(moveCount);
    drawPuzzle();
  });

  const isClearedPuzzle = () => {
    for (let row = 0; row < ROW_COUNT; row += 1) {
      for (let col = 0; col < COLUMN_COUNT; col += 1) {
        if (row === ROW_COUNT - 1 && col === COLUMN_COUNT - 1) {
          return true;
        }
        if (tiles[row][col] !== row * COLUMN_COUNT + col) {
          return false;
        }
      }
    }
    return false;
  };

  canvas.addEventListener('click', e => {
    const rect = e.target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const row = Math.floor(y / TILE_HEIGHT);
    const col = Math.floor(x / TILE_WIDTH);

    if (tiles[row][col] === -1) {
      return;
    }

    let targetRow;
    let targetCol;
    for (let i = 0; i < UDLR.length; i += 1) {
      targetRow = row + UDLR[i][1];
      targetCol = col + UDLR[i][0];

      if (
        targetRow >= 0 &&
        targetRow < ROW_COUNT &&
        targetCol >= 0 &&
        targetCol < COLUMN_COUNT
      ) {
        if (tiles[targetRow][targetCol] === -1) {
          tiles[targetRow][targetCol] = tiles[row][col];
          tiles[row][col] = -1;
          drawPuzzle();
          if (isClearedPuzzle()) {
            alert('Game Clear');
            break;
          }
        }
      }
    }
  });
})();
