/* eslint-disable linebreak-style */
/* eslint-disable function-paren-newline */
/* eslint-disable arrow-parens */
/* eslint-disable import/no-extraneous-dependencies */
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const target = path.resolve(__dirname, 'src/public/images');
const destination = path.resolve(__dirname, 'dist/images');

if (!fs.existsSync(destination)) {
  fs.mkdirSync(destination);
}

fs.readdirSync(target)
  .forEach(image => {
    sharp(`${target}/${image}`)
      .resize(800)
      .png({ quality: 30 })
      .toFile(path.resolve(
        __dirname,
        `${destination}/${image.split('.').slice(0, -1).join('.')}-large.png`),
      );

    sharp(`${target}/${image}`)
      .resize(480)
      .png({ quality: 50 })
      .toFile(path.resolve(
        __dirname,
        `${destination}/${image.split('.').slice(0, -1).join('.')}-small.png`),
      );
  });
