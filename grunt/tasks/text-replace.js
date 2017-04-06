module.exports = function textReplace(grunt) {


    grunt.registerTask("textReplace", "Change the brand for the gui.less files", function() {

      var prefix, prevNumber;
      var randomVersion = ((new Date()).valueOf().toString());

      function getPrefix () {
          var fs = require('fs');
          var fs = require('fs-extra');
          var filename = 'yo.da.json';
          var config = JSON.parse(fs.readFileSync(filename), 'utf8');
          prefix = config.appPrefix;
          prevNumber = config.randomNumber;
      }

    getPrefix();
 var replace = {

     overwrite: {
         src: ['./yo.da.json'],
         overwrite: true,
         replacements: [{
             from: '"randomNumber": '+prevNumber, // string replacement
             to: '"randomNumber": '+randomVersion
         }]
       },

       app: {
          src: ['./target/dist/app/build/'+prefix+ '.app.js'], // source files array (supports minimatch)
          //dest: 'target/dist/app/test',
          overwrite: true,
          replacements: [{
              from: '/css/symbols.data.svg.css', // string replacement
              to: '/css/symbols.data.svg-' + randomVersion +  '.css'
          },{
              from: '/css/symbols.data.png.css', // string replacement
              to: '/css/symbols.data.svg-' + randomVersion +  '.css'
          },{
              from: '/css/symbols.fallback.css', // string replacement
              to: '/css/symbols.fallback.svg-' + randomVersion +  '.css'
          },{
              from: '/css/' +prefix+ '.app.css', // string replacement
              to: '/css/' +prefix+ '.app-' + randomVersion +  '.css'
          }]
        },
      example: {
          src: ['./target/dist/index.html'],
          overwrite: true,
          replacements: [{
              from: 'app/build/'+prefix+ '.app.js', // string replacement
              to: 'app/build/'+prefix+ '.app-' + randomVersion +  '.js'
          }]
        }


    };
    grunt.config.set('replace', replace);
    grunt.task.run('replace');


  });


};
