'use strict';

angular.module('myApp.list', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/list', {
    templateUrl: 'list/list.html',
    controller: 'ListController',
    controllerAs: 'listCtrl'
  });
}])

.filter('determineType', function() {
  return function(input) {
    for(var i in input) {
      if(input[i].name === 'muutos') {
        return 'Muutosehdotus';
      }
      return 'Käsite-ehdotus';
    }
  };
})

.controller('ListController', ['$http','$scope','$routeParams', function($http, $scope, $routeParams) {
  $scope.suggestions = [];
  $scope.changePage('list');
  $scope.pagetitle = 'LISTHEADING';
  $scope.grateful = $routeParams.submitted !== undefined ? true : false;
  $scope.issuenum = $routeParams.submitted;

  $http.get('./list.php').then(function(data){
    var issues = data.data.splice(0, 15);
    for(var i in issues) {
      $scope.suggestions.push({
        type: issues[i].labels, 
        preflabel: issues[i].title, 
        state: issues[i].labels, 
        date: issues[i].created_at, 
        comments: issues[i].comments,
        href: issues[i].html_url
      });
    }
  },function() {});
}]);

