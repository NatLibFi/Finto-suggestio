'use strict';

angular.module('myApp.list', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/list', {
    templateUrl: 'list/list.html',
    controller: 'ListCtrl'
  });
}])

.controller('ListCtrl', ['$http','$scope', function($http, $scope) {
  this.suggestions = [];
  $http.get('https://api.github.com/repos/NatLibFi/Skosmos/issues?state=open').then(function(data){
    var issues = data.data;
    for(var i in issues) {
      if ($scope.data) {
        $scope.data.suggestions.push({
          type: 'Lisäys', 
          preflabel: issues[i].title, 
          state: 'Käsittelyssä', 
          date: issues[i].created_at, 
          comments: issues[i].comments,
          href: issues[i].html_url
        });
      }
    }
  },function() {});
}]);

var stubSuggestions = [
  { type: 'Lisäys', preflabel: 'matkustustase', state: 'Käsittelyssä', date: '3.8.2014', comments: 0},
  { type: 'Lisäys', preflabel: 'työllisyysturva', state: 'Käsittelyssä', date: '3.8.2014', comments: 1},
  { type: 'Lisäys', preflabel: 'hybridiammatit', state: 'Käsittelyssä', date: '3.8.2014', comments: 2},
  { type: 'Lisäys', preflabel: 'y-sukupolvi', state: 'Käsittelyssä', date: '3.8.2014', comments: 0},
  { type: 'Lisäys', preflabel: 'klusterianalyysi', state: 'Käsittelyssä', date: '3.8.2014', comments: 0},
  { type: 'Lisäys', preflabel: 'osaamisenhallinta', state: 'Käsittelyssä', date: '3.8.2014', comments: 0},
  { type: 'Lisäys', preflabel: 'minäpystyvyys', state: 'Käsittelyssä', date: '3.8.2014', comments: 4},
  { type: 'Lisäys', preflabel: 'puunmukailu', state: 'Käsittelyssä', date: '3.8.2014', comments: 2}
];

