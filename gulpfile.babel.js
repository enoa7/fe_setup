'use strict';

import gulp from 'gulp';
import sass from 'gulp-sass';
import autoprefixer from 'gulp-autoprefixer';
import sourcemaps from 'gulp-sourcemaps';
import browserSync from 'browser-sync';
import plumber from 'gulp-plumber';
import babel from 'babelify';
import browserify from 'browserify';
import source from 'vinyl-source-stream';
import buffer from 'vinyl-buffer';
import gutil from 'gulp-util';
import uglify from 'gulp-uglify';

/** Helper Functions */

// if the environment is 'prod', minify the js. if not leave it as it is
function jsOutput() {
    return gutil.env.env === 'prod' ? uglify() : gutil.noop();
}

function cssOutput() {
    return gutil.env.env === 'prod' ? 'compressed' : 'nested';
}

function onError(err) {
    console.log(err);
    this.emit('end');
}


/** 
 * constants for settings 
 **/

const dirs = {
    src: './src',
    dest: './build',
    prod: '../Assets/Styles/Kendo'
};

const sassInclude = [
    './node_modules/hamburgers/_sass/hamburgers/'
]

const sassPaths = {
    src: `${dirs.src}/sass/main-dev.scss`,
    dest: `${dirs.dest}/styles/`
};

const jsPaths = {
    src: `${dirs.src}/js/main-dev.js`,
    dest: `${dirs.dest}/js/`
}


/** Create a local server via BrowserSync */
const createBrowserSync = browserSync.create();
const reloadBrowserSync = browserSync.reload({ stream: true });

gulp.task('localServer', () => {
    createBrowserSync.init({
        server: './',
        port: 3010
    });
});


/** 
 * gulp tasks for dev 
 **/

// compile sass
gulp.task('styles', () => {
    return gulp.src(sassPaths.src)
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(sass({ outputStyle: cssOutput() }).on('error', sass.logError))
        .pipe(autoprefixer())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(sassPaths.dest))
});

// new js task to compile es6
gulp.task('scripts', () => {
    return browserify({ entries: jsPaths.src, debug: true })
        .transform(babel, { presets: ["es2015"] })
        .bundle()
        .on('error', onError)
        .pipe(source('main.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init('loadMaps: true'))
        .pipe(jsOutput())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(jsPaths.dest))
        .pipe(reloadBrowserSync);
});

// watch css and js changes
gulp.task('watch', () => {
    gulp.watch('src/scss/**/*.scss', ['styles']);
    gulp.watch('src/js/**/*.sj', ['scripts']);
});

gulp.task('default', ['styles', 'scripts', 'watch'], () => {});

gulp.task('serve', ['styles', 'scripts', 'watch', 'localServer'], () => {});

/** 
 * gulp tasks for prod 
 **/

gulp.task('prod', ['styles'], () => {
    return gulp.src('./build/styles/*')
        .pipe(gulp.dest(dirs.prod));
});