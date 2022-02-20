const { watch, series, parallel } = require("gulp");
const browserSync = require("browser-sync").create();

const path = require("./config/path");
const app = require("./config/app");

const clean = require("./task/clean");
const pug = require("./task/pug");
const scss = require("./task/scss");
const js = require("./task/js");
const images = require("./task/images");
const font = require("./task/font");

const watcher = () => {
  watch(path.pug.watch, pug).on("all", browserSync.reload);
  watch(path.scss.watch, scss).on("all", browserSync.reload);
  watch(path.js.watch, js).on("all", browserSync.reload);
  watch(path.images.watch, images).on("all", browserSync.reload);
  watch(path.font.watch, font).on("all", browserSync.reload);
};

const server = () => {
  browserSync.init({
    server: {
      baseDir: path.root,
    },
  });
};

const build = series(clean, parallel(pug, scss, js, images, font));

const dev = series(build, parallel(watcher, server));

exports.pug = pug;
exports.scss = scss;
exports.js = js;
exports.images = images;
exports.font = font;
exports.watch = watcher;
exports.clean = clean;
exports.dev = dev;
exports.build = build;
exports.default = app.isProd ? build : dev;
