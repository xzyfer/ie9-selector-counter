/* jshint laxcomma: true*/
module.exports = function(grunt) {
    "use strict";

    grunt.initConfig({
        release: {
            options: {
                commitMessage: 'Bump version to <%= version %>'
            }
        }
      , connect: {
            test: {
                options: {
                    port: 9000
                  , base: 'test'
                  , keepalive: true
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-release');
    grunt.loadNpmTasks('grunt-contrib-connect');
};
