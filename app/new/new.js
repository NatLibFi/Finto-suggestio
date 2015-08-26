'use strict';

angular.module('myApp.new', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/new', {
    templateUrl: 'new/new.html',
    controller: 'SuggestionController'
  });
}])

.controller('SuggestionController', ['$http','$scope','$sce', function($http, $scope, $sce) {
  
  $scope.trustAsHtml = function(value) {
    return $sce.trustAsHtml(value);
  };
    
  $scope.groupList = [];
  $http.get('http://localhost/Skosmos/rest/v1/yso/groups').then(function(response) {
    var groups = response.data.groupHierarchy;
    for (var uri in groups)
      $scope.groupList.push(groups[uri]);
  });

  this.suggestion = {type: 'Lisäys', preflabel: '', state: 'Käsittelyssä', date: Date.now()};

  this.addSuggestion = function() {
    console.log(this.suggestion);
    this.suggestion = {type: 'Lisäys', preflabel: '', state: 'Käsittelyssä', date: Date.now()};
  };
  
  this.getStars = function() {
    var stars = 1; // when the required fields have been filled out
    var required = ['type', 'preflabel', 'state', 'date', 'broader', 'groups', 'name', 'email', 'explanation'];
    for (var prop in this.suggestion) {
      if (required.indexOf(prop) === -1 && this.suggestion[prop] !== '' && stars < 5)
        stars += 1;
    }
    return stars;
  };
}]);
