module.exports = function (grunt) {
  grunt.loadNpmTasks('grunt-browserify')
  grunt.loadNpmTasks('grunt-contrib-watch')
  grunt.loadNpmTasks('grunt-contrib-concat')
  grunt.loadNpmTasks('grunt-express-server')
  grunt.loadNpmTasks('grunt-standard')

  grunt.registerTask('serve', [ 'standard', 'browserify', 'express:dev', 'watch'])
  grunt.registerTask('default', 'serve')

  grunt.initConfig({
   express: {
      options: { },
      dev: {
        options: {
          script: './express_server.js'
        }
      }
    },
    standard: {
      options: {
        format: true,
        force: true
      },
      client_application_webapp: {
        src: [
          './client_applicaiton/webapp/*.js'
        ]
      },
    },
    browserify: {
      client_application_webapp: {
        src: './client_application/webapp/main.js',
        dest: '/client_application/build/build.js',
        files: {
          'public/js/build/dashboard.js': [
            './client_application/*', './client_application/source/*.js', './client_application/webapp/*.js'
          ],
        },
        options: {
          transform: ['brfs'],
          browserifyOptions: {
            debug: true
          }
        }
      },
    },
    watch: {
      client_application : {
        files: [ './client_application/*', './client_application/source/*.js', './client_application/webapp/*.js' ],
        tasks: [ 'standard:client_application_webapp' ],
        options: {
          force: true,
          livereload: {
            port: 35729
          }
        }
      }
      // ng_dashboard: {
      //   files: [ './ng-dashboard/*.js',
      //     './ng-dashboard/**/*.js' ],
      //   tasks: [ 'standard:ng_dashboard', 'browserify:ng_dashboard' ],
      //   options: {
      //     force: true,
      //     livereload: {
      //       port: 35729
      //     }
      //   },
      // },
    }
  })
}
