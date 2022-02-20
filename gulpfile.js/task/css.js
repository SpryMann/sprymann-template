const { src, dest } = require("gulp");

const path = require("./../config/path");
const app = require("./../config/app");

const plumber = require("gulp-plumber");
const notify = require("gulp-notify");
const concat = require("gulp-concat");
const cssImport = require("gulp-cssimport");
const autoprefixer = require("gulp-autoprefixer");
const groupCssMediaQueries = require("gulp-group-css-media-queries");
const webpCss = require("gulp-webp-css");

const cssTask = () => {
  return src(path.css.src, { sourcemaps: app.isDev })
    .pipe(
      plumber({
        errorHandler: notify.onError((error) => ({
          title: "css",
          message: error.message,
        })),
      })
    )
    .pipe(concat("main.css"))
    .pipe(cssImport())
    .pipe(webpCss())
    .pipe(
      autoprefixer({
        cascade: false,
      })
    )
    .pipe(groupCssMediaQueries())
    .pipe(dest(path.css.dest, { sourcemaps: app.isDev }));
};

module.exports = cssTask;
