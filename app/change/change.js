'use strict';

var app = angular.module('myApp.change', ['ngRoute']);

app.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/change', {
    templateUrl: 'change/change.html',
    controller: 'ChangeController',
    controllerAs: 'changeCtrl'
  });
}]);

app.controller('ChangeController', ['$scope','$http','$location','FormFormatter', function($scope, $http, $location, FormFormatter) {
  $scope.requestFormatter = function(qstring) {
    return {query: qstring + '*', lang: $scope.language, vocab: 'ysa allars'};
  };
  this.labels = {'type': 'Ehdotuksen tyyppi', 'preflabel': 'Päätermi/asiasana', 'state': 'Tila', 'change':'Ehdotettu muutos', 'explanation': 'Perustelut ehdotukselle', 'fromname': 'Ehdottajan nimi', 'fromemail': 'Ehdottajan sähköpostiosoite'};

  this.suggestion = {type: 'Muutos olemassa olevaan käsitteeseen', preflabel: '', state: 'Käsittelyssä'};

  this.submitSuggestion = function() {
    var msg_body = FormFormatter.markdown(this.suggestion);
    var msg_title = this.suggestion.preflabel.title;
    var msg = {'title': msg_title, 'body': msg_body, 'labels': ['muutos']};
    $http({method: 'POST', url: '../post.php', data: msg}).then(function(response) {
      $location.path('/list');
    });
  };
}]);

