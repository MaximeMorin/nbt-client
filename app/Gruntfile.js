module.exports = function (grunt) {
	grunt.loadNpmTasks('grunt-sass');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-karma');  

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		karma: {  
			test: {
				options: {
					frameworks: ['jasmine'],
					singleRun: true,
					browsers: ['PhantomJS'],
					files: [
						'dev/libs/angular-1.4.6/angular.js',
						'dev/libs/angular-1.4.6/angular-mocks.js',
						'dev/libs/angular-1.4.6/angular-resource.js',
						'dev/libs/angular-1.4.6/angular-route.js',
						'dev/libs/angular-1.4.6/angular-sanitize.js',
						'dev/js/app.js',
						'dev/js/**/*.js'
					]
				}
			}
		},
		concat: {
			css: {
				src: [
					'dev/sass/*.scss'					
				],
				dest: 'build/<%= pkg.name %>.scss'
			},
			js: {
				src: [
					'dev/js/*.js',
					'dev/js/**/*.js',
					'!dev/js/*.spec.js',
					'!dev/js/**/*.spec.js'
				],
				dest: 'build/<%= pkg.name %>.js'
			}
		},
		sass: {
			options: {
				sourceMap: true,
				outputStyle: 'compressed'
			},
			main: {
				files: {
					'build/<%= pkg.name %>.min.css': 'build/<%= pkg.name %>.scss'
				}
			}
		},
		uglify: {
			options: {
				sourceMap: true				
			},
			main: {
				files: {
					'build/<%= pkg.name %>.min.js': ['build/*.js']
				}
			}		
		},
		copy: {			
			main: {
				files: [
					{expand: true, cwd: 'build', src: ['*.css', '*.css.map'], dest: 'dist/<%= pkg.version %>/css', filter: 'isFile'},
					{expand: true, cwd: 'build', src: ['*.js', '*.js.map'], dest: 'dist/<%= pkg.version %>/js', filter: 'isFile'},
					{expand: true, cwd: 'dev/libs', src: ['**'], dest: 'dist/<%= pkg.version %>/libs/'},
					{expand: true, cwd: 'dev/fonts', src: ['**'], dest: 'dist/<%= pkg.version %>/fonts/'},
					{expand: true, cwd: 'dev/img', src: ['**'], dest: 'dist/<%= pkg.version %>/img/'}
				]
			}
		},
		clean: ['build', "dist/<%= pkg.version %>"]		
	});

	grunt.registerTask('default', ['karma:test', 'clean', 'concat', 'sass', 'uglify' , 'copy']);
};