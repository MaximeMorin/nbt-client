module.exports = function (grunt) {
	grunt.loadNpmTasks('grunt-sass');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-uglify');

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
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
					'dev/js/**/*.js'
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
					{expand: true, cwd: 'build', src: ['*.min.js', '*.min.js.map'], dest: 'dist/<%= pkg.version %>/js', filter: 'isFile'},
					{expand: true, cwd: 'dev/libs', src: ['**'], dest: 'dist/<%= pkg.version %>/libs/'},
					{expand: true, cwd: 'dev/fonts', src: ['**'], dest: 'dist/<%= pkg.version %>/fonts/'},
					{expand: true, cwd: 'dev/img', src: ['**'], dest: 'dist/<%= pkg.version %>/img/'}
				]
			}
		},
		clean: ['build', "dist/<%= pkg.version %>"]		
	});

	grunt.registerTask('default', ['clean', 'concat', 'sass', 'uglify' , 'copy']);
};