// plugins
var gulp = require('gulp');
var webServer = require('gulp-webserver');;

// Add livereload
gulp.task('webserver', function() {
    gulp.src(source)
        .pipe(webServer({
            host:             'localhost',
            port:             '8000',
            open:             true,
            livereload:       true
        }));
});

// Default task
gulp.task('default', ['webserver']);