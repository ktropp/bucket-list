var gulp = require('gulp');

//PLUGINS
var gulpLoadPlugins = require('gulp-load-plugins');
var plugins = gulpLoadPlugins();
var path = require('path');
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;

var LessPluginGlob = require('less-plugin-glob');

var less_path = ['app/less/**/*.less'];

var runTimestamp = Math.round(Date.now()/1000);
var fontName = 'iconfont';

gulp.task('browserSync', function() {
    browserSync.init({
        host: 'http://homeserver:3000',
    });

    gulp.watch(less_path, gulp.series('less'));
})

gulp.task('less', function (done) {
    gulp.src('app/less/main.less')
        .pipe(plugins.sourcemaps.init())
        .pipe(plugins.plumber())
        .pipe(plugins.less({
            plugins: [LessPluginGlob],
        }))
        .pipe(plugins.concat('global.css'))
        .pipe(plugins.autoprefixer())
        .pipe(plugins.cleanCss())
        .pipe(plugins.sourcemaps.write())
        .pipe(gulp.dest('app/styles'))
        .pipe(browserSync.stream())

    done();
});

gulp.task('iconfont', function(){
    return gulp.src(['app/icons/*.svg'])
        .pipe(plugins.iconfontCss({
            fontName: fontName,
            path: '_iconfont.less',
            targetPath: '../less/main/iconfont.less',
            fontPath: '../fonts/'
        }))
        .pipe(plugins.iconfont({
            fontName: fontName, // required
            prependUnicode: true, // recommended option
            formats: ['ttf', 'eot', 'woff', 'svg', 'woff2'], // default, 'woff2' and 'svg' are available
            timestamp: runTimestamp, // recommended to get consistent builds when watching files
            normalize:true,
            fontHeight: 1001,
        }))
        .on('glyphs', function(glyphs, options) {
            // CSS templating, e.g.
            //console.log(glyphs, options);
        })
        .pipe(gulp.dest('app/fonts'));
});

gulp.task('build', gulp.parallel('less', 'iconfont'));


gulp.task('watch', gulp.series('less', 'browserSync'));


gulp.task('default', gulp.series('watch'));

//exports.default = watch