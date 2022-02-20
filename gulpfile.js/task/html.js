const { src, dest } = require("gulp");

const path = require("./../config/path");

const fileInclude = require("gulp-file-include");
const plumber = require("gulp-plumber");
const notify = require("gulp-notify");
const webpHtml = require("gulp-webp-html");

const htmlTask = () => {
  return src(path.html.src)
    .pipe(
      plumber({
        errorHandler: notify.onError((error) => ({
          title: "html",
          message: error.message,
        })),
      })
    )
    .pipe(fileInclude())
    .pipe(webpHtml())
    .pipe(dest(path.html.dest));
};

module.exports = htmlTask;
