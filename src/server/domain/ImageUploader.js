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
      fs.copyFileSync(file.path, `./public/thumbs/${file.filename}`);
    }
  }

  /**
   * 表示画像の一覧を取得する
   *
   * @returns {*}
   */
  static getImages() {
    /**
     * 表示用のオブジェクトを作成する
     *
     * @param filename
     * @returns {{filename: *, path: string, ctime: *}}
     */
    const generateObj = filename => {
      let dir = './public/images/';

      try {
        fs.accessSync(`./public/thumbs/${filename}`);
        dir = './public/thumbs/';
      } catch (err) {
        dir = './public/images/';
      }

      return {
        filename,
        path: dir,
        ctime: fs.statSync(`${dir}${filename}`).ctime
      };
    };

    let images = fs.readdirSync('./public/images', err => {
      if (err) {
        console.log(err);
      }
    });
    images = images.map(filename => generateObj(filename));

    images.sort((a, b) => b.ctime - a.ctime);
    return images;
  }
}
module.exports = ImageUploader;
