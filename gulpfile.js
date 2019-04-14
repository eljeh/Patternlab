/******************************************************
 * PATTERN LAB NODE
 * EDITION-NODE-GULP
 * The gulp wrapper around patternlab-node core, providing tasks to interact with the core library and move supporting frontend assets.
******************************************************/
var sass_config = {
  sass_paths: {
    src: './source/assets/scss/*.{scss,sass}',
    dest: './public/assets/css/'
  }
};

var js_config = {
  js_paths: {
    src: './source/assets/js/**/*.js',
    dest: './public/assets/js/'
  }
};

var gulp = require('gulp'),
  path = require('path'),
  browserSync = require('browser-sync').create(),
  argv = require('minimist')(process.argv.slice(2)),
  chalk = require('chalk'),
  sass = require('gulp-sass'),
  autoprefixer = require('gulp-autoprefixer'),
  csso = require('gulp-csso'),
  uglify = require('gulp-uglify'),
  rename = require("gulp-rename");

/**
 * Normalize all paths to be plain, paths with no leading './',
 * relative to the process root, and with backslashes converted to
 * forward slashes. Should work regardless of how the path was
 * written. Accepts any number of parameters, and passes them along to
 * path.resolve().
 *
 * This is intended to avoid all known limitations of gulp.watch().
 *
 * @param {...string} pathFragment - A directory, filename, or glob.
*/
function normalizePath() {
  return path
    .relative(
      process.cwd(),
      path.resolve.apply(this, arguments)
    )
    .replace(/\\/g, "/");
}

/******************************************************
 * PATTERN LAB CONFIGURATION - API with core library
******************************************************/
//read all paths from our namespaced config file
var config = require('./patternlab-config.json'),
  patternlab = require('patternlab-node')(config);

function paths() {
  return config.paths;
}

function getConfiguredCleanOption() {
  return config.cleanPublic;
}

/**
 * Performs the actual build step. Accomodates both async and sync
 * versions of Pattern Lab.
 * @param {function} done - Gulp done callback
 */
function build(done) {
  var buildResult = patternlab.build(() => { }, getConfiguredCleanOption());

  // handle async version of Pattern Lab
  if (buildResult instanceof Promise) {
    return buildResult.then(done);
  }

  // handle sync version of Pattern Lab
  done();
  return null;
}

/******************************************************
 * COPY TASKS - stream assets from source to destination
******************************************************/
// JS copy
gulp.task('pl-copy:js', function () {
  return gulp.src('**/*.js', { cwd: normalizePath(paths().source.js) })
    .pipe(gulp.dest(normalizePath(paths().public.js)));
});

// Images copy
gulp.task('pl-copy:img', function () {
  return gulp.src('**/*.*', { cwd: normalizePath(paths().source.images) })
    .pipe(gulp.dest(normalizePath(paths().public.images)))
  //    .pipe(gulp.dest('../../Bwalk.Umbraco.PublicWeb/assets/images/'));
});

// Favicon copy
gulp.task('pl-copy:favicon', function () {
  return gulp.src('./assets/images/favicon.ico', { cwd: normalizePath(paths().source.root) })
    .pipe(gulp.dest(normalizePath(paths().public.root)));
});

// Fonts copy
gulp.task('pl-copy:font', function () {
  return gulp.src(['!(**-old)/*.*', '*'], { cwd: normalizePath(paths().source.fonts) })
    .pipe(gulp.dest(normalizePath(paths().public.fonts)))
  //    .pipe(gulp.dest('../../Bwalk.Umbraco.PublicWeb/assets/fonts/'));
});

// Vendor Copy
gulp.task('pl-copy:vendor', function () {
  return gulp.src('!(**flaticon)/*.*', { cwd: normalizePath(paths().source.vendor) })
    .pipe(gulp.dest(normalizePath(paths().public.vendor)))
  //    .pipe(gulp.dest('../../Bwalk.Umbraco.PublicWeb/assets/vendor/'));
});

// Flaticon Copy
gulp.task('pl-copy:flaticon', function () {
  return gulp.src(['flaticon/*.*', '!flaticon/*.css', '!flaticon/*.scss', '!flaticon/*.html'], { cwd: normalizePath(paths().source.vendor) })
    .pipe(gulp.dest(normalizePath(paths().public.css)))
  //        .pipe(gulp.dest('../../Bwalk.Umbraco.PublicWeb/assets/css/'));
});

// CSS Copy
gulp.task('pl-copy:css', function () {
  return gulp.src(normalizePath(paths().source.css) + '/*.css')
    .pipe(gulp.dest(normalizePath(paths().public.css)))
    .pipe(browserSync.stream());
});

// Styleguide Copy everything but css
gulp.task('pl-copy:styleguide', function () {
  return gulp.src(normalizePath(paths().source.styleguide) + '/**/!(*.css)')
    .pipe(gulp.dest(normalizePath(paths().public.root)))
    .pipe(browserSync.stream());
});

// Styleguide Copy and flatten css
gulp.task('pl-copy:styleguide-css', function () {
  return gulp.src(normalizePath(paths().source.styleguide) + '/**/*.css')
    .pipe(gulp.dest(function (file) {
      //flatten anything inside the styleguide into a single output dir per http://stackoverflow.com/a/34317320/1790362
      file.path = path.join(file.base, path.basename(file.path));
      return normalizePath(path.join(paths().public.styleguide, '/css'));
    }))
    .pipe(browserSync.stream());
});

// NEW WORKING SASS Compiling
gulp.task('sass', function () {
  return gulp.src(sass_config.sass_paths.src)
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(sass_config.sass_paths.dest));
});

// Set the browser that you want to support
var AUTOPREFIXER_BROWSERS = [
  'ie >= 10',
  'ie_mob >= 10',
  'ff >= 30',
  'chrome >= 34',
  'safari >= 7',
  'opera >= 23',
  'ios >= 7',
  'android >= 4.4',
  'bb >= 10'
];

gulp.task('minify-css', function () {
  return gulp.src('./public/assets/css/*.css')
    .pipe(autoprefixer({ browsers: AUTOPREFIXER_BROWSERS }))
    .pipe(csso())
    .pipe(rename({ suffix: '.min' }))
  //    .pipe(gulp.dest('../../Bwalk.Umbraco.PublicWeb/assets/css/'));
});

gulp.task('minify-js', function () {
  return gulp.src([
    './source/assets/js/polyfill.js',
    './source/assets/js/carousel.js',
    './source/assets/js/domAdapter.js',
    './source/assets/js/utility.js',
    './source/assets/js/processWebPSupport.js',
    './source/assets/js/alert.js',
    './source/assets/js/form.js',
    './source/assets/js/contact.js',
    './source/assets/js/progressTracker.js',
    './source/assets/js/opportunity.js',
    './source/assets/js/validationRules.js',
    './source/assets/js/mapStyle.js'])
    .pipe(uglify())
    .pipe(rename({ suffix: '.min' }))
  //    .pipe(gulp.dest('../../Bwalk.Umbraco.PublicWeb/assets/js/'));
});

gulp.task('nomin-css', function () {
  return gulp.src('./public/assets/css/*.css')
    .pipe(autoprefixer({ browsers: AUTOPREFIXER_BROWSERS }))
    .pipe(rename({ suffix: '.min' }))
  //    .pipe(gulp.dest('../../Bwalk.Umbraco.PublicWeb/assets/css/'));
});

gulp.task('nomin-js', function () {
  return gulp.src([
    './source/assets/js/polyfill.js',
    './source/assets/js/carousel.js',
    './source/assets/js/domAdapter.js',
    './source/assets/js/utility.js',
    './source/assets/js/processWebPSupport.js',
    './source/assets/js/alert.js',
    './source/assets/js/form.js',
    './source/assets/js/contact.js',
    './source/assets/js/progressTracker.js',
    './source/assets/js/opportunity.js',
    './source/assets/js/validationRules.js',
    './source/assets/js/mapStyle.js'])
    .pipe(rename({ suffix: '.min' }))
  //    .pipe(gulp.dest('../../Bwalk.Umbraco.PublicWeb/assets/js/'));
});

gulp.task('pl-assets', 
  gulp.series(
    'pl-copy:js',
    'pl-copy:img',
    'pl-copy:vendor',
    'pl-copy:flaticon',
    'pl-copy:font',
    'pl-copy:css',
    'pl-copy:styleguide',
    'pl-copy:styleguide-css',
    'sass',
    'minify-css',
    'minify-js'
  )
);

gulp.task('pl-no-min',
  gulp.series(
    'pl-copy:js',
    'pl-copy:img',
    'pl-copy:vendor',
    'pl-copy:flaticon',
    'pl-copy:font',
    'pl-copy:css',
    'pl-copy:styleguide',
    'pl-copy:styleguide-css',
    'sass',
    'nomin-css',
    'nomin-js'
  )
);

gulp.task('patternlab:version', function (done) {
  patternlab.version();
  done();
});

gulp.task('patternlab:help', function (done) {
  patternlab.help();
  done();
});

gulp.task('patternlab:patternsonly', function (done) {
  patternlab.patternsonly(done, getConfiguredCleanOption());
});

gulp.task('patternlab:liststarterkits', function (done) {
  patternlab.liststarterkits();
  done();
});

gulp.task('patternlab:loadstarterkit', function (done) {
  patternlab.loadstarterkit(argv.kit, argv.clean);
  done();
});

gulp.task('patternlab:build', gulp.series('pl-assets', build));

gulp.task('patternlab:no-min', gulp.series('pl-no-min', build));

gulp.task('patternlab:installplugin', function (done) {
  patternlab.installplugin(argv.plugin);
  done();
});

/******************************************************
 * SERVER AND WATCH TASKS
******************************************************/
// watch task utility functions
function getSupportedTemplateExtensions() {
  var engines = require('./node_modules/patternlab-node/core/lib/pattern_engines');
  return engines.getSupportedFileExtensions();
}
function getTemplateWatches() {
  return getSupportedTemplateExtensions().map(function (dotExtension) {
    return normalizePath(paths().source.patterns, '**', '*' + dotExtension);
  });
}

/**
 * Reloads BrowserSync.
 * Note: Exits more reliably when used with a done callback.
 */
function reload(done) {
  browserSync.reload();
  done();
}

/**
 * Reloads BrowserSync, with CSS injection.
 * Note: Exits more reliably when used with a done callback.
 */
function reloadCSS(done) {
  browserSync.reload('*.css');
  done();
}

function watch() {
  var watchers = [
    {
      name: 'Sass',
      paths: [normalizePath(paths().source.css, '**', '*.scss')],
      config: { awaitWriteFinish: true },
      tasks: gulp.series('sass', reloadCSS)
    },
    {
      name: 'CSS',
      paths: [normalizePath(paths().source.css, '**', '*.css')],
      config: { awaitWriteFinish: true },
      tasks: gulp.series('pl-copy:css', reloadCSS)
    },
    {
      name: 'Styleguide Files',
      paths: [normalizePath(paths().source.styleguide, '**', '*')],
      config: { awaitWriteFinish: true },
      tasks: gulp.series('pl-copy:styleguide', 'pl-copy:styleguide-css', reloadCSS)
    },
    {
      name: 'Source Files',
      paths: [
        normalizePath(paths().source.patterns, '**', '*.json'),
        normalizePath(paths().source.patterns, '**', '*.md'),
        normalizePath(paths().source.data, '**', '*.json'),
        normalizePath(paths().source.fonts, '**', '*'),
        normalizePath(paths().source.images, '**', '*'),
        normalizePath(paths().source.js, '**', '*'),
        normalizePath(paths().source.meta, '**', '*'),
        normalizePath(paths().source.annotations, '**', '*')
      ].concat(getTemplateWatches()),
      config: { awaitWriteFinish: true },
      tasks: gulp.series(build, reload)
    }
  ];

  watchers.forEach(watcher => {
    console.log('\n' + chalk.bold('Watching ' + watcher.name + ':'));
    watcher.paths.forEach(p => console.log('  ' + p));
    gulp.watch(watcher.paths, watcher.config, watcher.tasks);
  });
  console.log();
}

gulp.task('patternlab:connect', gulp.series(function (done) {
  browserSync.init({
    server: {
      baseDir: normalizePath(paths().public.root)
    },
    snippetOptions: {
      // Ignore all HTML files within the templates folder
      blacklist: ['/index.html', '/', '/?*']
    },
    notify: {
      styles: [
        'display: none',
        'padding: 15px',
        'font-family: sans-serif',
        'position: fixed',
        'font-size: 1em',
        'z-index: 9999',
        'bottom: 0px',
        'right: 0px',
        'border-top-left-radius: 5px',
        'background-color: #1B2032',
        'opacity: 0.4',
        'margin: 0',
        'color: white',
        'text-align: center'
      ]
    }
  }, function () {
    done();
  });
}));

/******************************************************
 * COMPOUND TASKS
******************************************************/
gulp.task('default', gulp.series('patternlab:build'));
gulp.task('patternlab:watch', gulp.series('patternlab:build', watch));
gulp.task('patternlab:serve', gulp.series('patternlab:build', 'patternlab:connect', watch));
