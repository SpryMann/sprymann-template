const { src, dest } = require("gulp");

const path = require("./../config/path");
const app = require("./../config/app");

const plumber = require("gulp-plumber");
const notify = require("gulp-notify");
const sass = require("gulp-sass")(require("sass"));
const concat = require("gulp-concat");
const autoprefixer = require("gulp-autoprefixer");
const groupCssMediaQueries = require("gulp-group-css-media-queries");
const webpCss = require("gulp-webp-css");

const scssTask = () => {
  return src(path.scss.src, { sourcemaps: app.isDev })
    .pipe(
      plumber({
        errorHandler: notify.onError((error) => ({
          title: "scss",
          message: error.message,
        })),
      })
    )
    .pipe(sass())
    .pipe(webpCss())
    .pipe(concat("main.css"))
    .pipe(autoprefixer({ cascade: false }))
    .pipe(groupCssMediaQueries())
    .pipe(dest(path.scss.dest, { sourcemaps: app.isDev }));
};

module.exports = scssTask;
