(function() {
  'use strict';

  angular
    .module('dmc.factories.project', ['dmc.factories.restangular'])
    .factory('projectFactory', Project);

  Project.$inject = ['baseRestangularFactory', '$q'];

  /**
   * Project Model that provides core
   * @returns {{}}
   * @constructor
   */
  function Project(baseRestangularFactory, $q) {
    Project.projectList = [];
    Project.fetchProjectList = function(payload) {
      var deferred = $q.defer();
      Project.projectList = [];
      var projectRest = baseRestangularFactory.fetchAll('projectData');
      var resp = projectRest.customGET(angular.toJson(payload));
      Project.projectList = [];
      resp.then(function(response) {


        if (response) {
          Project.projectList = response;
          console.log("passed");
        }
        deferred.resolve();
      }, function(response) {
        deferred.reject();
      });
      return deferred.promise;
    };
    return Project;
  }
})();
