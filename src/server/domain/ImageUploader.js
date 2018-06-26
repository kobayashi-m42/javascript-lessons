class ImageUploader {

  /**
   * 表示画像の一覧を取得する
   *
   * @returns {*}
   */
  static getImages() {
    const fs = require('fs');

    const images = fs.readdirSync('./images', (err, filename) => {
      if (err) {
        console.log(err);
      }
    }).map(filename => {
      return {
        filename: filename,
        ctime: fs.statSync(`./images/${filename}`).ctime
      }
    });

    images.sort((a, b) => b.ctime - a.ctime);
    return images;
  }
}
module.exports = ImageUploader;
