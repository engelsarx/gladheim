// --- Minificar imagenes => OK
// --- Compilar SASS y recarga navegador => OK
// --- Minificar y concatenar JS y mostrar errores y recarga navegador => OK
// --- Sincronizar y recargar navegadores => OK
// --- Tarea de desarrollo y tarea distribucion
// --- Inyectar dependencias => OK

// Sprite SVG
// https://github.com/addyosmani/critical

var gulp = require('gulp');
var imagemin = require('gulp-imagemin');
var changed = require('gulp-changed');
var newer = require('gulp-newer');
var sass = require('gulp-ruby-sass');
var postcss = require('gulp-postcss');
var assets = require('postcss-assets');
var autoprefixer = require('autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var mqpacker = require('css-mqpacker');
var cssnano = require('cssnano');
var useref = require('gulp-useref');
var gutil = require('gulp-util');
var gulpIf = require('gulp-if');
var plumber = require('gulp-plumber');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');
var rename = require("gulp-rename");
var replace = require('gulp-replace');
var runSequence = require('run-sequence');
var browserSync = require('browser-sync').create();
var clean = require('gulp-clean');
var iconfont = require('gulp-iconfont');
var iconfontCss = require('gulp-iconfont-css');
var critical = require('critical').stream;
var sprity = require('sprity');
var kit = require('gulp-kit');
var html = kit('dev/kit/*.kit');
var removeEmptyLines = require('gulp-remove-empty-lines');
var $ = require('gulp-load-plugins')();

var runTimestamp = Math.round(Date.now() / 1000);

var config = {
  base: './',
  ext: 'html',
  env: {
    server: './dev',
    serverDist: './dist'
  }
};

var paths = {
  dev: {
    root: 'dev/',
    rootFiles: 'dev/index.html',
    files: 'dev/*.' + config.ext,
    kitfiles: 'dev/kit/**/*.kit',
    extras: [
      '.htaccess',
      'crossdomain.xml',
      'humans.txt',
      'manifest.appcache',
      'robots.txt',
      'favicon.ico',
      'README.md'
    ],
    images: 'dev/images/',
    imagesFiles: 'dev/images/**/*.+(png|jpg|gif|svg)',
    css: 'dev/css/',
    scss: 'dev/scss',
    scssIndex: 'dev/scss/styles.scss',
    scssFiles: 'dev/scss/**/*.scss',
    fonts: 'dev/fonts/**/*',
    js: 'dev/js',
    jsFiles: [
      'dev/js/**/*.js',
      '!./dev/js/lib/**/*.js'
    ],
    jsLibs: [
      'node_modules/jquery/dist/jquery.js',
      // 'node_modules/mustache/mustache.js',
      'node_modules/slick-carousel/slick/slick.js'
    ],
    jsLibFolder: 'dev/js/lib',
    svgIcons: 'dev/images/assets/icons/*.svg',
    svgScss: '../scss/config/_icons.scss',
    svgFonts: '../fonts/',
    svgFontsDev: 'dev/fonts/',
    criticalFiles: 'dev/*.html',
    cssFiles: 'dev/css/styles.css',
    spritesFiles: 'dev/images/assets/sprites/*.{svg,png,jpg}',
    spritesCss: '_sprites.scss',
    spritesImagesDev: 'dev/images/',
    spritesScssDev: 'dev/scss/config/',
  },
  dist: {
    root: 'dist/',
    images: 'dist/images/',
    fonts: 'dist/fonts',
    css: 'dist/css',
    js: 'dist/js',
    jsLibFolder: 'dist/js/lib',
  }
}

var sassPaths = [
  'bower_components/normalize.scss/sass',
  'dev/js/lib/foundation-sites/scss',
  'dev/js/lib/motion-ui/src'
];

gulp.task('sass', function () {

  var postCssOpts = [
    assets({ loadPaths: [paths.dev.images] }),
    autoprefixer({
      browsers: [
        'last 2 versions',
        'safari 5',
        'ie 9',
        'opera 12.1',
        'ios 6',
        'android 4'
      ]
    }),
    mqpacker,
    cssnano
  ];

  return gulp.src('dev/scss/app.scss')
    .pipe($.sass({
      includePaths: sassPaths,
      outputStyle: 'compressed' // if css compressed **file size**
    })
      .on('error', $.sass.logError))
    .pipe(postcss(postCssOpts))
    // .pipe($.autoprefixer({
    //   browsers: ['last 2 versions', 'ie >= 9']
    // }))
    .pipe(gulp.dest(paths.dev.css))
    .pipe(browserSync.reload({
      stream: true
    }));
});

// BROWSERSYNC
gulp.task('browserSync', function () {
  browserSync.init({
    server: {
      baseDir: config.env.server
    }
  });
});

// BROWSERSYNC - DIST
gulp.task('serve', function () {
  browserSync.init({
    server: {
      baseDir: config.env.serverDist
    }
  });
});

// SCSS
function handleErrors() {
  var gutil = require('gulp-util');
  var args = Array.prototype.slice.call(arguments);

  gutil.log(gutil.colors.white.bgRed.underline.bold('Gulp error:'));
  gutil.log(gutil.colors.red(args));

  // continue with gulp tasks
  this.emit('end');
}

gulp.task('scss', function () {

  var postCssOpts = [
    assets({ loadPaths: [paths.dev.images] }),
    autoprefixer({
      browsers: [
        'last 2 versions',
        'safari 5',
        'ie 9',
        'opera 12.1',
        'ios 6',
        'android 4'
      ]
    }),
    mqpacker,
    cssnano
  ];

  return sass(paths.dev.scssIndex, {
    noCache: true,
    compass: false,
    sourcemap: true,
    style: 'nested',
    precision: 6,
    cacheLocation: config.base,
  })
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(postcss(postCssOpts))
    .pipe(sourcemaps.write('.', { includeContent: false, sourceRoot: paths.dev.scss }))
    .on('error', handleErrors)
    .pipe(gulp.dest(paths.dev.css))
    .pipe(browserSync.reload({
      stream: true
    }));
});

// IMAGES
gulp.task('images', function () {
  gulp.src(paths.dev.imagesFiles)
    .pipe(changed(paths.dist.images))
    .pipe(imagemin())
    .pipe(gulp.dest(paths.dist.images));
});

// html
gulp.task('html', function () {
  return gulp.src(paths.dev.files)
    .pipe(changed(paths.dist.root))
    .pipe(gulp.dest(paths.dist.root))
    .pipe(browserSync.reload({
      stream: true
    }));
});

gulp.task('kit', function () {
  return gulp.src('dev/kit/*.kit')
    .pipe(kit({ compilePartials: true }))
    .pipe(removeEmptyLines({
      removeComments: false,
      removeSpaces: false
    }))
    .pipe(gulp.dest('dev/'));
});

// JSHINT
gulp.task('jshint', function () {
  return gulp.src(paths.dev.jsFiles)
    .pipe(jshint())
    .pipe(jshint.reporter(stylish))
    .pipe(browserSync.reload({
      stream: true
    }));
});

// CLEAN
gulp.task('clean', function () {
  return gulp.src(paths.dist.root, { read: false })
    .pipe(clean());
});

// IMPORT LIBARIES
gulp.task('copy-libs', function () {
  gulp.src(paths.dev.jsLibs)
    .pipe(gulp.dest(paths.dev.jsLibFolder));
});

// USEREF
uglyOptions = {
  beautify: true,
  comments: true,
  sourceMap: false,
  mangle: false
};

gulp.task('useref', function () {
  return gulp.src('dev/*.html')
    .pipe(useref())
    .pipe(gulpIf('*.js', uglify(uglyOptions).on('error', gutil.log)))
    .pipe(gulp.dest('dist'));
});

// COPY
gulp.task('copy', function () {
  // gulp.src(paths.dev.root + '*.*', {
  //   base: paths.dev.root
  // })
  //   .pipe(gulp.dest(paths.dist.root));

  gulp.src(paths.dev.fonts)
    .pipe(changed(paths.dist.fonts))
    .pipe(gulp.dest(paths.dist.fonts));
});
gulp.task('copy-css', function () {
  gulp.src('dev/css/styles.css')
    .pipe(gulp.dest('dist/css'));
});

// ICONS SVG
var myFontName = 'bbcicons-font';
gulp.task('iconfont', function () {
  return gulp.src([paths.dev.svgIcons])
    .pipe(iconfontCss({
      fontName: myFontName,
      targetPath: paths.dev.svgScss,
      fontPath: paths.dev.svgFonts,
      firstGlyph: 0xB001,
      cssClass: 'bbc-icon'
    }))
    .pipe(iconfont({
      fontName: myFontName,
      prependUnicode: true,
      formats: ['ttf', 'eot', 'woff', 'woff2', 'svg'],
      timestamp: runTimestamp,
    }))
    /*.on('glyphs', function(glyphs, options) {
      console.log(glyphs, options);
    })*/
    .pipe(gulp.dest(paths.dev.svgFontsDev))
    .pipe(browserSync.reload({
      stream: true
    }));
});

// CRITICAL
gulp.task('critical', function () {
  return gulp.src([paths.dev.criticalFiles])
    .pipe(critical({
      inline: true, //true generates HTML, false generate CSS
      base: paths.dev.root,
      html: '',
      css: paths.dev.cssFiles,
      minify: true,
      timeout: 30000,
      ignore: ['@charset']
    }))
    .pipe(gulp.dest(paths.dist.root))
});

// Sprite
gulp.task('sprites', function () {
  return sprity.src({
    src: paths.dev.spritesFiles,
    style: paths.dev.spritesCss,
    prefix: 'bbc-sprite',
    //processor: 'sass',
  })
    .on('error', handleErrors)
    .pipe(gulpIf('*.png', gulp.dest(paths.dev.spritesImagesDev), gulp.dest(paths.dev.spritesScssDev)))
});

// WATCH
gulp.task('watch', ['browserSync'], function () {
  gulp.watch(paths.dev.files, browserSync.reload);
  gulp.watch(paths.dev.svgIcons, ['iconfont']);
  // gulp.watch(paths.dev.spritesFiles, ['sprites']);
  gulp.watch('dev/scss/**/*.scss', ['sass']);
  gulp.watch(paths.dev.kitfiles, ['kit']);
  gulp.watch(paths.dev.jsFiles, ['jshint']);
});

// DEV
gulp.task('dev', function (callback) {
  runSequence(
    ['copy-libs', 'sass', 'browserSync', 'watch', 'kit'],
    callback
  );
});

// BUILD
gulp.task('build', function (callback) {
  runSequence(
    'clean',
    'copy',
    'images',
    ['useref'],
    'serve',
    ['serve'],
    ['serve'],
    ['serve'],
    ['serve'],
    ['serve'],
    callback
  );
});

gulp.task('default', ['dev']);
