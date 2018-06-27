const fs = require('fs');

class ImageUploader {
  /**
   * サムネイルを作成する
   * 今回は画像のリサイズは行わず、コピーのみ
   *
   * @param file
   */
  static createThumbnail(file) {
    const imageSize = fs.statSync(file.path).size;

    if (imageSize > 51200) {
      fs.copyFileSync(file.path, `./thumbs/${file.filename}`);
    }
  }

  /**
   * 表示画像の一覧を取得する
   *
   * @returns {*}
   */
  static getImages() {
    const images = fs
      .readdirSync('./images', err => {
        if (err) {
          console.log(err);
        }
      })
      .map(filename => {
        let dir = './images/';

        try {
          fs.accessSync(`./thumbs/${filename}`);
          dir = './thumbs/';
        } catch (err) {
          dir = './images/';
        }

        return {
          filename,
          path: dir,
          ctime: fs.statSync(`${dir}${filename}`).ctime
        };
      });

    images.sort((a, b) => b.ctime - a.ctime);
    return images;
  }
}
module.exports = ImageUploader;
