/*globals require, process, console*/
var gulp = require('gulp'),
	gutil = require('gulp-util'),
	bower = require('bower'),
	concat = require('gulp-concat'),
	rename = require('gulp-rename'),
	install = require("gulp-install"),
    sass = require('gulp-sass'),
    webserver = require('gulp-webserver'),
	sh = require('shelljs'),
    rimraf = require('rimraf'),
    fs = require('fs'),
    async = require('async'),
    path = require('path'),
    basepath = process.cwd(),
    destpath = path.join(basepath,'dist'),
	runSequence = require('run-sequence'),
	NwBuilder = require('nw-builder'),
	args = require('yargs')
		.alias('r', 'run')
		.alias('w', 'windows')
		.alias('m', 'osx')
		.alias('l', 'linux')
		.alias('x', 'with_x32')
		.alias('v', 'version')
		.alias('b', 'build')
		.alias('s', 'silent')
		.default('run', true)
		.default('windows', false)
		.default('osx', false)
		.default('with_x32', false)
		.default('linux', true)
		.default('version', 'latest')
        .default('build', false)
        .default('silent', false)
        .default('all', false)
		.argv,
    osx = args.osx,
	windows = args.windows,
	linux = args.linux,
	x32 = args.with_x32,
	run = args.run,
	build = args.build,
	silence = args.silent,
	all = args.all,
	version = args.version,
	platforms = [];
	
if(windows || all){
	platforms.push('win64');
	if(x32){
		platforms.push('win32');
	}
}

if(osx || all){
	platforms.push('osx64');
	if(x32){
		platforms.push('osx32');
	}
}

if(linux || all){
	platforms.push('linux64');
	if(x32){
		platforms.push('linux32');
	}
}


gulp.task('default', function(done){'clearDist', runSequence(['concat', 'versioning'], 'collect-dist', 'install-deps', done);});

gulp.task('renewDist', function(done){ runSequence(['concat', 'versioning'], 'collect-dist', done); });

gulp.task('concat', ['services','controller', 'directives','css']);

gulp.task('build', function(done){runSequence('default', 'nw', done);});

gulp.task('serve', function(done){runSequence('default', 'serve_dist', done);});

gulp.task('run',function(done){
        if(build){
            runSequence('default', 'electron', done);
        } else {
            runSequence('nw-run', done);
        }
});


gulp.task('clearDist', function(done){
   rimraf('./dist/*', done); 
});

gulp.task('services', function(done){
    return gulp.src('./src/js/services/*.js')
    .pipe(concat('services.js'))
    .pipe(gulp.dest('./dist/js/'));
    
});

gulp.task('collections', function(done){
    return gulp.src('./src/js/collections/*.js')
    .pipe(concat('collections.js'))
    .pipe(gulp.dest('./dist/js/'));
    
});

gulp.task('modules', function(done){
    return gulp.src('./src/js/modules/*.js')
    .pipe(concat('modules.js'))
    .pipe(gulp.dest('./dist/js/'));
    
});

gulp.task('views', function(done){
    return gulp.src('./src/js/views/*.js')
    .pipe(concat('views.js'))
    .pipe(gulp.dest('./dist/js/'));
});

gulp.task('css', function(){
    return gulp.src('./src/scss/**/**')
        .pipe(concat('app.scss'))
        .pipe(sass())
        .pipe(gulp.dest('./dist/css/'));
});

gulp.task('versioning', function(done){
    var time = new Date().getTime();
    var pkg = require('./src/package.json');
    var outString = "var APPVERSION ='"+pkg.version+"', BUILDNUMBER='"+time+"';";
    fs.writeFileSync('./src/APPINFO.js', outString, 'utf8');
    done();
});

gulp.task('collect-dist', function(done){
    async.parallel([
        function(end){
            gulp.src(['src/*'])
                .pipe(gulp.dest('dist/'))
                .on('end',end);
        },
         function(end){
            gulp.src('src/templates/**/*.html')
                .pipe(gulp.dest('dist/templates/'))
                .on('end', end); 
        }
    ], done);
});

gulp.task('install-deps', function(done){
    process.chdir(destpath);
    var proc_bower = sh.exec('bower install', {async:true,silent:silence});
    if(!silence){ proc_bower.stdout.on('data', console.log); }
    proc_bower.on('exit', function(code, signal){
        var proc_npm = sh.exec('npm install --production', {async:true,silent:silence});
            if(!silence){ proc_npm.stdout.on('data', console.log);}
            proc_npm.on('exit', function(code, signal){process.chdir(basepath);done();});
    });
});
/**
* nwjs controlling via gulp
*/

gulp.task('electron' , function(done){
    var nw = new NwBuilder({
        files: ["LICENCE", "./dist/**/**"],
        platforms: platforms,
        version: version
    });
    nw.build().then(function () {
       console.log('all done!');
       if(run){
           //open new build project here
       }
       done();
    }).catch(function (error) {
        console.error(error);
    });

});


gulp.task('serve_dist', function(done){
    gulp.src('dist/')
        .pipe(webserver({
            livereload: true,
            directoryListing: false,
            open: true,
            fallback: 'index.html'
        })
    ).on('end',done);
});

gulp.task('install', ['git-check'], function() {
  return bower.commands.install()
    .on('log', function(data) {
      gutil.log('bower', gutil.colors.cyan(data.id), data.message);
    });
});

