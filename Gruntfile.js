'use strict';

module.exports = function (grunt) {
  grunt.initConfig({

    //清空目录
    clean: {
      src: "dist"
    },
    copy: {
      static: {
        expand: true,
        cwd: 'src',
        src: ['**/*'],
        dest: 'dist'
      }
    },
    useminPrepare: {
      html: {
        html: '**/*.html',
        options: {
          root: 'web/src/main/webapp/dist',
          dest: 'web/src/main/webapp/dist'
        }
      },
      js: {
        js: '**/*.js',
        options: {
          root: 'dist',
          dest: 'dist'
        }
      }
    },
    filerev: {
      options: {
        algorithm: 'md5',
        length: 8
      },
      all: {
        src: ['dist/**/*', '!dist/**/*.html']
      }
    },
    usemin: {
      html: ['dist/**/*.html'],
      js: ['dist/**/*.js'],
      css: ['dist/**/*.css'],
      options: {
        base: '//static.pocketdigi.com/medicine/',
        patterns: {
          js: [
            [/([\w+?\/]*[\w+?]\.js)/gm, 'Replacing reference js'],
            [/([\w+?\/]*[\w+?]\.css)/gm, 'Replacing reference css'],
            [/([\w+?\/]*[\w+?]\.jpg)/gm, 'Replacing reference jpg'],
          ]
        },
        assetsDirs: ['dist']
      }

    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-jscs');
  grunt.loadNpmTasks('grunt-mocha-cli');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-filerev');
  grunt.loadNpmTasks('grunt-contrib-concat');

  grunt.loadTasks('tasks');

  grunt.registerTask('default', ['jshint', 'jscs', 'mochacli']);
  grunt.registerTask('test', 'default');
  grunt.registerTask('dev', [
    'clean',
    'copy',
    'useminPrepare',
    'filerev',
    'usemin'
  ]);
};
