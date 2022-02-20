const { src, dest } = require("gulp");

const path = require("./../config/path");
const app = require("./../config/app");

const plumber = require("gulp-plumber");
const notify = require("gulp-notify");
const pug = require("gulp-pug");
const webpHtml = require("gulp-webp-html");

const pugTask = () => {
  return src(path.pug.src)
    .pipe(
      plumber({
        errorHandler: notify.onError((error) => ({
          title: "pug",
          message: error.message,
        })),
      })
    )
    .pipe(pug(app.pug))
    .pipe(webpHtml())
    .pipe(dest(path.pug.dest));
};

module.exports = pugTask;
