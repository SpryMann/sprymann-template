const { src, dest } = require("gulp");

const path = require("./../config/path");
const app = require("./../config/app");

const plumber = require("gulp-plumber");
const notify = require("gulp-notify");
const newer = require("gulp-newer");
const fonter = require("gulp-fonter-unx");
const ttf2woff2 = require("gulp-ttf2woff2");

const fontTask = () => {
  return src(path.font.src)
    .pipe(
      plumber({
        errorHandler: notify.onError((error) => ({
          title: "font",
          message: error.message,
        })),
      })
    )
    .pipe(newer(path.font.dest))
    .pipe(fonter(app.fonter))
    .pipe(dest(path.font.dest))
    .pipe(ttf2woff2())
    .pipe(dest(path.font.dest));
};

module.exports = fontTask;
