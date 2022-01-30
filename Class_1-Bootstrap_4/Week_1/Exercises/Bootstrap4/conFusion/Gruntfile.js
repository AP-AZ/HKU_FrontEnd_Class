'use strict';

module.exports = function (grunt) {

    require('time-grunt')(grunt);
    require('jit-grunt')(grunt, {
        useminPrepare: 'grunt-usemin'
    });

    grunt.initConfig({

        sass: {
            dist: {
                files:  {'css/styles.css': 'css/styles.css'}
            }
        },

        watch: {
            files: 'css/*.scss',
            watch: ['sass']
        },

        browserSync: {
            dev: {
                bsFiles: {
                    src: ['css/*.css', '*.html', 'js/*.js']
                }
            },
            options: {
                watchTask: true,
                server: {
                    baseDir: './'
                }
            }
        },

        copy: {
            html: {
                files: [{
                    expand: true,
                    dot:true,
                    cwd: './',
                    src: ['*.html'],
                    dest: 'dist'
                }]
            },

            fonts: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: 'node_modules/font-awesome',
                    src: ['fonts/*.*'],
                    dest: 'dist/fonts'
                }]
            }
        },

        clean: {
            build: {
                src: ['dist/']
            }
        },

        imagemin: {
            dynamic: {
                files: [{
                    expand: true,
                    dot: './',
                    src: ['img/*.{png, gif, jpg}'],
                    dest: 'dist/img'
                }]
            }
        },

        useminPrepare: {
            foo: {
                dest: 'dist',
                src: ['contactus.html', 'aboutus.html', 'index.html']
            },
            options: {
                flow: {
                    steps: {
                        css: ['cssmin'],
                        js: ['uglify']
                    },
                    post: {
                        css: [{
                            name: 'cssmin',
                            createConfig: function (context, block) {
                                var generated = context.options.generated;
                                generated.options = {
                                    keepSpecialComments: 0, rebase: false
                                }
                            }
                        }]
                    }
                }
            }
        },

        concat: {
            options: {
                separator: ';'
            },
            dist: {}
        },

        uglify: {
            dist: {}
        },
        cssmin: {
            dist: {}
        },
        filerev: {
            options: {
                encoding: 'utf8',
                algorithm: 'md5',
                length: 20
            },
            release: {
                files: [{
                    src: [
                        'dist/js/*.js',
                        'dist/css/*.css'
                    ]
                }]
                },
            usemin: {
                html: ['dist/contactus.html', 'dist/aboutus.html', 'dist/index.html'],
                options: {
                    assetsDirs: ['dist', 'dist/css', 'dist/js']
                },

            htmlmin: {
                dist: {
                    options: {
                        collapseWhiteSpace: true
                    },
                    files: {
                        'dist/index.html': 'dist/index.html',
                        'dist/contactus.html': 'dist/contactus.html',
                        'dist/aboutus.html': 'dist/aboutus.html'
                    }
                }
            }
            }
        }

    });

    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-browser-sync');

    grunt.registerTask('css', ['sass']);
    grunt.registerTask('default', ['broswerSync', 'watch']);
    grunt.registerTask('build', ['clean', 'copy', 'imagemin', 'useminPrepare', 'concat', 'cssmin', 'uglify','filerev', 'usemin', 'htmlmin']);
}