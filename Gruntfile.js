module.exports = function(grunt) {

	grunt.initConfig({
		jshint: {
			src: ['Gruntfile.js', 'Rapidshot/**/*.js', 'Rapidshot/**.js']
		},
		connect: {
		    server: {
			port: 9002
		    }
		}	
	});
	
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-connect');

	grunt.registerTask('default', ['jshint', 'connect']);

};

