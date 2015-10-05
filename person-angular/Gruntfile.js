// Gruntfile.js
module.exports = function(grunt) {

  grunt.initConfig({
	// Project settings
	jshint: {
		options: {
			jshintrc: '.jshintrc',
			reporter: require('jshint-stylish')
		},
		all: ['app/js/**/*.js'] 
    },
    // Watches files for changes and runs tasks based on the changed files
    watch: {
      js: {
        files: ['app/js/**/*.js'],
        tasks: ['jshint']
      }
    },
	// configure nodemon
    nodemon: {
      dev: {
        script: 'scripts/server.js'
      }
    },
	concurrent: {
      options: {
        logConcurrentOutput: true
      }, 
      tasks: ['nodemon', 'watch']
    }   

  });
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-concurrent');
  grunt.loadNpmTasks('grunt-contrib-jshint');

  grunt.registerTask('default', ['jshint', 'concurrent']);


  

};
