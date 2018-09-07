var gulp = require('gulp');
var ts = require("gulp-typescript"); //
var tsProject = ts.createProject("tsconfig.json");
var sourcemaps = require('gulp-sourcemaps'); //
var clean = require('gulp-clean'); //
var uglify = require('gulp-uglify'); //
var minify = require('gulp-minify'); //
var inject = require('gulp-inject'); //
var strip = require('gulp-strip-comments');
var rename = require("gulp-rename");
var concat = require("gulp-concat");
var series = require('stream-series');
var angularFilesort = require('gulp-angular-filesort');
var gulpStreamToPromise = require('gulp-stream-to-promise');
var pug = require('gulp-pug');
var p;
var op = process.argv.indexOf("--option");// Option position
var option = process.argv[op + 1];

/*
 *
 *
 * Constant
 *
 *
 *
 */

const tsRoot = 'src/**/*.ts';
const rootDest = 'public/';
const mainFile = rootDest + 'index.html';

/*
 *
 *
 * Functions
 *
 *
 *
 */

const injectCss = function () {
    //folder = getFolder(arg.enviroment);
    // Rewrite dependency file paths in index.html
    var bootstrap = gulp.src([rootDest + 'vendors/css/bootstrap/*.css'/* , '!public/vendors/css/bootstrap/mdb.css' */], {
        read: false
    });
    var angular = gulp.src([rootDest + 'vendors/css/angular/*.css'], {
        read: false
    });
    var sources = gulp.src([rootDest + 'vendors/css/*.css'/* , '!public/vendors/css/compiled.min.css' */], {
        read: false
    });
    //console.log(sources);
    return gulp.src(mainFile)
        .pipe(inject(series( /*vendors, jquery,*/ bootstrap, angular, /* plugin,*/ sources), {
            relative: true
        }))
        .pipe(gulp.dest('./public/'));
}

const injectJS = function () {

    var angular1 = gulp.src([rootDest + 'js/angular/*.js'])
        .pipe(sourcemaps.init())
        .pipe(concat('all.js'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(rootDest + 'js/angular'))

    var p = gulpStreamToPromise(angular1).then(function () {
        angular = gulp.src([rootDest + 'js/angular/all.js'])
            .pipe(minify())
            .pipe(gulp.dest(rootDest + 'js/'));
        var promise = gulpStreamToPromise(angular).then(function () {
            //folder = getFolder(arg.enviroment);
            // Rewrite dependency file paths in index.html
            var dep = gulp.src([rootDest + 'vendors/js/dep/*.js'], {
                read: false
            });

            var jquery = gulp.src([rootDest + 'vendors/js/jquery/*.js'], {
                read: false
            });

            var bootstrap = gulp.src([rootDest + 'vendors/js/bootstrap/*.js'], {
                read: false
            });

            var plugin = gulp.src([rootDest + 'vendors/js/plugins/*.js'], {
                read: false
            });

            var sources = gulp.src([rootDest + 'js/*.js', '!public/js/mainClasses.js', '!public/js/all-min.js'], {
                read: false
            });
             var directives = gulp.src(['./public/js/directives/**/*.js'], {
               read: false
            }); 
            //console.log(sources);
            return gulp.src(mainFile)
                .pipe(inject(series(dep, jquery, bootstrap, plugin, sources , directives ), {
                    relative: true
                }))
                .pipe(gulp.dest(rootDest));
        })
    })

}

/*
 *
 *
 * Task
 *
 *
 */

//funcion maestra para crear los archivos necesarios para cada controlador
// gulp newController --option controlador
gulp.task('newController', function () {
    //console.log(option);
    var originFiles = 'gulp_src_files/';
    var destinyController = 'src/controllers/';
    var destinyView = 'includes/';
    //console.log(originFiles + 'controller.ts');
    try{
        //create template controller
        var g = gulp.src([originFiles + 'controller.ts.file'])
            .pipe(concat(option + '.controller.ts'))
            .pipe(gulp.dest(destinyController));
        //create template view
        g = gulp.src([originFiles + 'template.pug.file'])
            .pipe(concat(option + '.pug'))
            .pipe(gulp.dest(destinyView));
    }catch (e) {
        console.log(e)
    }



})



//PUG

//limpia los archivos previamente generados en la carpeta includes
gulp.task('cleanhtml', function () {
    //folder = getFolder(arg.enviroment);
    // Clear folder
    return gulp.src([rootDest + 'includes/**/*.html', rootDest + '*.html'], {
            read: false
        })
        .pipe(clean());
});
//copila los .pug y genera los .html
gulp.task('pug-html', ["cleanhtml"], function () {
    gulp.src(['includes/**/*.pug'])
        .pipe(pug())
        .pipe(gulp.dest(rootDest + 'includes'));

    var index = gulp.src(['./index.pug'])
        .pipe(pug())
        .pipe(gulp.dest(rootDest));
    p = gulpStreamToPromise(index)
});
//injecta los css al index.html
//injecta los js al index.html
gulp.task('inject-css-js-pug', ["pug-html"],function() {
    p.then(function(){
        injectCss();
        injectJS();
    })
});
//pug task
//copila los .pug y genera los .html
gulp.task('pug', ["inject-css-js-pug"], function () {
    console.log('pug complete!!')
});


//DEPLOY


//limpia los archivos previamente generados en la carpeta dist
gulp.task('cleanjs', function () {
    //folder = getFolder(arg.enviroment);
    // Clear folder
    return gulp.src([rootDest + 'js/**/*.js', rootDest + 'js/**/*.map'], {
            read: false
        })
        .pipe(clean());
});
//copila los .ts de la carpeta src y los js son generados en la carpeta dist
gulp.task('tojs', ["cleanjs", "pug-html"], function () {
    try {
        //folder = getFolder(arg.enviroment);
        // Generate and uglify .js with sourceMaps // or tsProject.src()
        var tsResult = gulp.src(tsRoot)
            .pipe(sourcemaps.init())
            .pipe(tsProject())
            .on('error', function (err) {
                console.log(err.toString());
                console.log(err);
            })
            //.pipe(uglify())
            /*.pipe(sourcemaps.write('.', {
                sourceRoot: './',
                includeContent: false
            })); // Path is referenced to the current destination gulp */

        return tsResult.pipe(gulp.dest(rootDest + 'js/'));
    } catch (error) {
        console.log("Error en transcompilacion");
        console.log(error);
        return true;
    }
});
//injecta los css al index.html
gulp.task('inject-css', ["tojs"], injectCss);
//injecta los js al index.html
gulp.task('inject', ['inject-css'], injectJS);

//observable de cada cambio realizado en el proyecto
gulp.task('w', function () {
    //observara cada cambio realizado en todo el proyecto
    gulp.watch([tsRoot], ['inject']);
    gulp.watch(['includes/**/*.pug'], ['inject']);
    gulp.watch(['index.pug'], ['inject']);
});