'use strict';

var app = angular.module('myApp.change', ['ngRoute']);

app.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/change', {
    templateUrl: 'change/change.html',
    controller: 'ChangeController'
  });
}]);

app.controller('ChangeController', ['$scope','FormFormatter', function($scope, FormFormatter) {

  $scope.requestFormatter = function(qstring) {
    return {query: qstring + '*'};
  };
  this.labels = {'type': 'Ehdotuksen tyyppi', 'preflabel': 'Päätermi/asiasana', 'state': 'Tila', 'change':'Ehdotettu muutos', 'explanation': 'Perustelut ehdotukselle', 'fromname': 'Ehdottajan nimi', 'fromemail': 'Ehdottajan sähköpostiosoite'};

  this.suggestion = {type: 'Muutos olemassa olevaan käsitteeseen', preflabel: '', state: 'Käsittelyssä'};

  this.submitSuggestion = function() {
    var msg_body = '';
    msg_body = FormFormatter.markdown(this.suggestion);
    console.log(msg_body);
    this.suggestion = {type: 'Muutos olemassa olevaan käsitteeseen', preflabel: '', state: 'Käsittelyssä'};
  };
}]);

