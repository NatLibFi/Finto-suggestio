'use strict';

angular.module('suggestio.help', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/help', {
    templateUrl: 'help/help.html',
    controller: 'HelpController',
    controllerAs: 'helpCtrl'
  });
}])

.controller('HelpController', ['$http','$scope','$routeParams', function($http, $scope, $routeParams) {
  $scope.changePage('help');
}]);

