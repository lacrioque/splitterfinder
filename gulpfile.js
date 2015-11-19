/*globals require, process, console*/
var gulp = require('gulp'),
	gutil = require('gulp-util'),
	bower = require('bower'),
	concat = require('gulp-concat'),
	rename = require('gulp-rename'),
	sh = require('shelljs'),
    fs = require('fs'),
    path = require('path'),
	runSequence = require('run-sequence'),
	NwBuilder = require('nw-builder'),
	args = require('yargs')
		.alias('r', 'run')
		.alias('win', 'windows')
		.alias('mac', 'osx')
		.alias('l', 'linux')
		.alias('x32', 'with_x32')
		.alias('v', 'version')
		.default('run', true)
		.default('windows', false)
		.default('osx', false)
		.default('with_x32', false)
		.default('linux', true)
		.default('version', 'latest')
		.argv;

gulp.task('default', function(done){runSequence(['concat', 'versioning'], 'collect-dist', done);});

gulp.task('concat', ['services','controller']);

gulp.task('run', function(done){runSequence('default', 'nw', done);});

gulp.task('services', function(done){
    return gulp.src('./src/js/services/*.js')
    .pipe(concat('all_services.js'))
    .pipe(gulp.dest('./src/js/'));
    
});

gulp.task('controller', function(done){
    return gulp.src('./src/js/controller/*.js')
    .pipe(concat('all_controller.js'))
    .pipe(gulp.dest('./src/js/'));
    
});

gulp.task('versioning', function(done){
    var time = new Date().getTime();
    var pkg = require('./package.json');
    var outString = "var APPVERSION ='"+pkg.version+"', BUILDNUMBER='"+time+"';";
    fs.writeFileSync('./src/APPINFO.js', outString, 'utf8');
    done();
});

/**
* nwjs controlling via gulp
*/
var osx = args.osx,
	windows = args.windows,
	linux = args.linux,
	x32 = args.with_x32,
	run = args.run,
	platforms = [];
	
if(windows){
	platforms.push('win64');
	if(x32){
		platforms.push('win32');
	}
}

if(osx){
	platforms.push('osx64');
	if(x32){
		platforms.push('osx32');
	}
}

if(linux){
	platforms.push('linux64');
	if(x32){
		platforms.push('linux32');
	}
}

var nw = new NwBuilder({
	files: "dist/**/**",
	platforms: platforms
});

gul.task('nw' , function(done){
	// Build returns a promise
	nw.build().then(function () {
	   console.log('all done!');
	   if(run){
		   //open new build project here
	   }
	   done();
	}).catch(function (error) {
		console.error(error);
	});
})

gulp.task('collect-dist', function(done){
    gulp.src(['src/*'])
    .pipe(gulp.dest('dist/'));
    gulp.src('src/templates/**/*.html')
    .pipe(gulp.dest('dist/templates/'));
    gulp.src('src/lib/**/*.*')
    .pipe(gulp.dest('dist/lib/'))
    .on('end', done);
    gulp.src(['src/js/*.js'])
    .pipe(gulp.dest('dist/js/'));
});


gulp.task('install', ['git-check'], function() {
  return bower.commands.install()
    .on('log', function(data) {
      gutil.log('bower', gutil.colors.cyan(data.id), data.message);
    });
});

