'use strict';

module.exports = function (grunt) {

    grunt.initConfig({
        develop: {
            server: {
                file: 'app/server.js',
                nodeArgs: [
                    '-r',
                    'dotenv/config',
                    '--inspect'
                ],
                env: {
                    NODE_ENV: 'development'
                }
            }
        },
        watch: {
            options: {
                nospawn: true,
                livereload: 35729
            },
            js: {
                files: [
                    'app/public/dist/**/*.js'
                ],
                options: {
                    reload: true
                }
            },
            views: {
                files: [
                    'app/views/**/*.pug'
                ],
                options: {
                    reload: true
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-develop');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', ['develop:server', 'watch']);
};
