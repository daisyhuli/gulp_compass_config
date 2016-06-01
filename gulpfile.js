// Load plugins
var gulp = require('gulp'),
    autoprefixer = require('gulp-autoprefixer'),
    cssnano = require('gulp-cssnano'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache'),
    livereload = require('gulp-livereload'),
    del = require('del');
    rev = require('gulp-rev-append'); //给页面的引用添加版本号，清除页面引用缓存
    compass = require('gulp-compass');
    plumber = require('gulp-plumber'); //处理所有错误的通用方法,不会退出gulp
    path = require('path'); //Load config without config.rb  需引入

// HTML处理
gulp.task('html', function() {
    return gulp.src('src/*.html')
        .pipe(rev())
        .pipe(gulp.dest('dist/'))
        .pipe(notify({ message: 'Html task complete' }));
});


// //Load config from config.rb

// //Compass
gulp.task('compass', function() {
    gulp.src('src/styles/*.scss')
        .pipe(plumber())
        .pipe(compass({
            config_file: './config.rb',
            css: 'dist/styles',
            sass: 'src/styles',
            comments: true
        }))
        .pipe(autoprefixer({
            browsers: ['last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1'],
            cascade: true,
            remove:true
        }))
        .pipe(gulp.dest('dist/styles'))
         .pipe(rename({ suffix: '.min' }))
        .pipe(cssnano())
        .pipe(gulp.dest('dist/styles'))
        .pipe(notify({ message: 'Styles task complete' }));
});

// // Load config without config.rb 项目不必有config配置文件,自己配置
// gulp.task('compass', function() {
//     gulp.src('src/styles/*.scss')
//         .pipe(compass({
//             project: path.join(__dirname, '/'),
//             css: 'dist/styles',
//             sass: 'src/styles',
//             image: 'src/images',
//             comments:true
//         }))
//         .pipe(autoprefixer({
//             browsers: ['last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1'],
//             cascade: true,
//             remove:true
//         }))
//         .pipe(gulp.dest('dist/styles'))
//         .pipe(rename({ suffix: '.min' }))
//         .pipe(cssnano())
//         .pipe(gulp.dest('dist/styles'))
//         .pipe(notify({ message: 'Styles task complete' }));
// });


// // Scripts
gulp.task('scripts', function() {
    return gulp.src('src/scripts/**/*.js')
        // .pipe(jshint('.jshintrc'))
        // .pipe(jshint.reporter('default'))
        // .pipe(concat('main.js'))
        .pipe(gulp.dest('dist/scripts'))
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(gulp.dest('dist/scripts'))
        .pipe(notify({ message: 'Scripts task complete' }));
});

// Images
gulp.task('images', function() {
    return gulp.src('src/images/**/*')
        .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
        .pipe(gulp.dest('dist/images'))
        .pipe(notify({ message: 'Images task complete' }));
});

// // Clean
gulp.task('clean', function() {
    return del(['dist/','dist/styles', 'dist/scripts', 'dist/images']);
});
//
// // Default task
gulp.task('default', ['clean'], function() {
    gulp.start('html','compass', 'scripts', 'images');
});

// Watch
gulp.task('watch', function() {

    // // Watch html files
    gulp.watch('src/*.html', ['html']);

    // Watch .scss files
    gulp.watch('src/styles/**/*.scss', ['compass']);

    // // Watch .js files
    gulp.watch('src/scripts/**/*.js', ['scripts']);

    // // Watch image files
    gulp.watch('src/images/**/*', ['images']);

    // Create LiveReload server
    livereload.listen();

    // Watch any files in dist/, reload on change
    gulp.watch(['dist/**']).on('change', livereload.changed);

});
