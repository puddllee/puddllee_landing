module.exports = function (grunt) {
  'use strict';

  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    htmlhint: {
      build: {
        options: {
          'tag-pair': true,
          'tagname-lowercase': true,
          'attr-lowercase': true,
          'attr-value-double-quotes': true,
          'doctype-first': true,
          'spec-char-escape': true,
          'id-unique': true,
          'head-script-disabled': true,
          'style-disabled': true
        },
        src: ['index.html']
      }
    },

    copy: {
      main: {
        files: [
          // includes files within path
          {
            expand: true,
            src: ['index.html'],
            dest: 'build/',
            filter: 'isFile'
          }
        ]
      }
    },

    concat: {
      options: {
        // define a string to put between each file in the concatenated output
        separator: ';'
      },
      dist: {
        // the files to concatenate
        src: ['assets/**/*.js'],
        // the location of the resulting JS file
        dest: 'build/js/<%= pkg.name %>.js'
      }
    },

    uglify: {
      options: {
        // the banner is inserted at the top of the output
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
      },
      dist: {
        files: {
          'build/js/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
        }
      }
    },

    jshint: {
      // define the files to lint
      files: ['gruntfile.js', 'assets/**/*.js', 'test/**/*.js'],
      // configure JSHint (documented at http://www.jshint.com/docs/)
      options: {
        // more options here if you want to override JSHint defaults
        globals: {
          jQuery: true,
          console: true,
          module: true
        }
      }
    },

    cssc: {
      build: {
        options: {
          consolidateViaDeclarations: true,
          consolidateViaSelectors: true,
          consolidateMediaQueries: true
        },
        files: {
          'build/css/master.css': 'build/css/master.css'
        }
      }
    },

    cssmin: {
      build: {
        src: 'build/css/master.css',
        dest: 'build/css/master.css'
      }
    },

    sass: {
      build: {
        files: {
          'build/css/master.css': 'assets/sass/master.scss'
        }
      }
    },

    watch: {
      handlebars: {
        files: ['templates/**/*.hbs'],
        tasks: ['handlebars']
      },

      html: {
        files: ['index.html'],
        tasks: ['htmlhint', 'copy']
      },

      js: {
        files: ['assets/js/**/*.js'],
        tasks: ['concat', 'uglify', 'jshint']
      },

      css: {
        files: ['assets/sass/**/*.scss'],
        tasks: ['buildcss']
      }
    }
  });

  grunt.registerTask('default', ['sass', 'cssc', 'cssmin', 'concat', 'uglify', 'jshint', 'htmlhint', 'copy']);
  grunt.registerTask('buildcss', ['sass', 'cssc', 'cssmin']);
  grunt.registerTask('buildjs', ['concat', 'uglify', 'jshint']);
  grunt.registerTask('buildhtml', ['htmlhint', 'copy']);
};
