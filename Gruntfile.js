module.exports = function(grunt) {

  // Load grunt tasks
  require('load-grunt-tasks')(grunt);

  // Grunt configuration tasks
  grunt.initConfig({

    // Read the package.json file
    pkg: grunt.file.readJSON('package.json'),

    // Minify the javascript file
    uglify: {
      build: {
        files: {
          'dist/js/app.min.js': 'src/js/app.js',
          'dist/js/model.min.js': 'src/js/model.js',
          'dist/js/mobile.min.js': 'src/js/mobile.js',
          'dist/js/lib/jQuery.min.js': 'src/js/lib/jQuery.js',
          'dist/js/lib/knockout-3.2.0.min.js': 'src/js/lib/knockout-3.2.0.js'
        }
      }
    },

    // Minify the CSS files
    cssmin: {
      target: {
        files: [{
          expand: true,
          cwd: 'src/css/',
          src: ['*.css', '!*.min.css'],
          dest: 'dist/css/',
          ext: '.min.css'
        }]
      }
    }
  });

  // Tell grunt to use the plugins
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');

  // Register the tasks as default actions for the 'grunt' command
  grunt.registerTask('default', ['uglify', 'cssmin']);

};