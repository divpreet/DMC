module.exports = function setLocal(grunt) {


    grunt.registerTask("setLocal", "Change the brand for the gui.less files", function() {

 	var replace = {
      setlocal: {
          src: ['./target/dist/app/build/'+grunt.const.appPrefix+'.app.js'],
          overwrite: true,
          replacements: [{
              from: '//@@isLocalForPrototype',                   // string replacement
              to: 'isLocal=true;'
          },{
              from: "xhr.open(method, encodeURI(urlToBeCalled), true);",
              to: "xhr.open('GET', encodeURI(urlToBeCalled), true);"
          }
          ]
        }
    };
    grunt.config.set('replace', replace);
    grunt.task.run('replace');


  });


};
