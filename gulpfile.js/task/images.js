const { src, dest } = require("gulp");

const path = require("./../config/path");
const app = require("./../config/app");

const plumber = require("gulp-plumber");
const notify = require("gulp-notify");
const imageMin = require("gulp-imagemin");
const newer = require("gulp-newer");
const webp = require("gulp-webp");
const gulpIf = require("gulp-if");

const imagesTask = () => {
  return src(path.images.src)
    .pipe(
      plumber({
        errorHandler: notify.onError((error) => ({
          title: "images",
          message: error.message,
        })),
      })
    )
    .pipe(newer(path.images.dest))
    .pipe(webp())
    .pipe(dest(path.images.dest))
    .pipe(src(path.images.src))
    .pipe(newer(path.images.dest))
    .pipe(gulpIf(app.isProd, imageMin(app.imagemin)))
    .pipe(dest(path.images.dest));
};

module.exports = imagesTask;
