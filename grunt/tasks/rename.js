module.exports = function rename(grunt) {

    grunt.registerTask("fileReplace", "Change the brand for the gui.less files", function() {
      var prefix, randomNumber;

      function getPrefix2 () {
          var fs = require('fs');
          var fs = require('fs-extra');
          var filename = 'yo.da.json';
          var config = JSON.parse(fs.readFileSync(filename), 'utf8');
          prefix = config.appPrefix;
          randomNumber = config.randomNumber;


      }
    getPrefix2();

    var rename = {
        main: {
            files: [{
                    src: ['./target/dist/app/build/' + prefix + '.app.js'],
                    dest: './target/dist/app/build/' + prefix + '.app-' + randomNumber + '.js'
                },


                {
                    src: ['./target/dist/app/build/BSA/css/' + prefix + '.app.css'],
                    dest: './target/dist/app/build/BSA/css/' + prefix + '.app-' + randomNumber + '.css'
                }, {
                    src: ['./target/dist/app/build/BSA/css/gui.min.css'],
                    dest: './target/dist/app/build/BSA/css/gui.min-' + randomNumber + '.css'
                }, {
                    src: ['./target/dist/app/build/BSA/css/symbols.data.png.css'],
                    dest: './target/dist/app/build/BSA/css/symbols.data.png-' + randomNumber + '.css'
                }, {
                    src: ['./target/dist/app/build/BSA/css/symbols.data.svg.css'],
                    dest: './target/dist/app/build/BSA/css/symbols.data.svg-' + randomNumber + '.css'
                }, {
                    src: ['./target/dist/app/build/BSA/css/symbols.fallback.css'],
                    dest: './target/dist/app/build/BSA/css/symbols.fallback-' + randomNumber + '.css'
                },


                {
                    src: ['./target/dist/app/build/STG/css/' + prefix + '.app.css'],
                    dest: './target/dist/app/build/STG/css/' + prefix + '.app-' + randomNumber + '.css'
                }, {
                    src: ['./target/dist/app/build/STG/css/gui.min.css'],
                    dest: './target/dist/app/build/STG/css/gui.min-' + randomNumber + '.css'
                }, {
                    src: ['./target/dist/app/build/STG/css/symbols.data.png.css'],
                    dest: './target/dist/app/build/STG/css/symbols.data.png-' + randomNumber + '.css'
                }, {
                    src: ['./target/dist/app/build/STG/css/symbols.data.svg.css'],
                    dest: './target/dist/app/build/STG/css/symbols.data.svg-' + randomNumber + '.css'
                }, {
                    src: ['./target/dist/app/build/STG/css/symbols.fallback.css'],
                    dest: './target/dist/app/build/STG/css/symbols.fallback-' + randomNumber + '.css'
                },


                {
                    src: ['./target/dist/app/build/WBC/css/' + prefix + '.app.css'],
                    dest: './target/dist/app/build/WBC/css/' + prefix + '.app-' + randomNumber + '.css'
                }, {
                    src: ['./target/dist/app/build/WBC/css/gui.min.css'],
                    dest: './target/dist/app/build/WBC/css/gui.min-' + randomNumber + '.css'
                }, {
                    src: ['./target/dist/app/build/WBC/css/symbols.data.png.css'],
                    dest: './target/dist/app/build/WBC/css/symbols.data.png-' + randomNumber + '.css'
                }, {
                    src: ['./target/dist/app/build/WBC/css/symbols.data.svg.css'],
                    dest: './target/dist/app/build/WBC/css/symbols.data.svg-' + randomNumber + '.css'
                }, {
                    src: ['./target/dist/app/build/WBC/css/symbols.fallback.css'],
                    dest: './target/dist/app/build/WBC/css/symbols.fallback-' + randomNumber + '.css'
                },


                {
                    src: ['./target/dist/app/build/BOM/css/' + prefix + '.app.css'],
                    dest: './target/dist/app/build/BOM/css/' + prefix + '.app-' + randomNumber + '.css'
                }, {
                    src: ['./target/dist/app/build/BOM/css/gui.min.css'],
                    dest: './target/dist/app/build/BOM/css/gui.min-' + randomNumber + '.css'
                }, {
                    src: ['./target/dist/app/build/BOM/css/symbols.data.png.css'],
                    dest: './target/dist/app/build/BOM/css/symbols.data.png-' + randomNumber + '.css'
                }, {
                    src: ['./target/dist/app/build/BOM/css/symbols.data.svg.css'],
                    dest: './target/dist/app/build/BOM/css/symbols.data.svg-' + randomNumber + '.css'
                }, {
                    src: ['./target/dist/app/build/BOM/css/symbols.fallback.css'],
                    dest: './target/dist/app/build/BOM/css/symbols.fallback-' + randomNumber + '.css'
                }
            ]
        }
    };

    grunt.config.set('rename', rename);
    grunt.task.run('rename');
  });


};
