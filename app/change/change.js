'use strict';

var app = angular.module('myApp.change', ['ngRoute']);

app.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/change', {
    templateUrl: 'change/change.html',
    controller: 'ChangeController'
  });
}]);

app.controller('ChangeController', ['$scope', function($scope) {

  $scope.requestFormatter = function(qstring) {
    return {query: qstring + '*'};
  };
  this.labels = {'type': 'Muutos', 'preflabel': 'Päätermi/asiasana', 'state': 'Tila', 'change':'Ehdotettu muutos', 'explanation': 'Perustelut ehdotukselle', 'fromname': 'Ehdottajan nimi', 'fromemail': 'Ehdottajan sähköpostiosoite'};

  this.suggestion = {type: 'Muutos', preflabel: '', state: 'Käsittelyssä'};

  this.submitSuggestion = function() {
    var msg_body = '';
    for (var property in this.suggestion) {
      var proplabel = this.labels[property] ? this.labels[property] : property;
      var propval = this.suggestion[property];
      if (propval.originalObject) // if there is an uri available from the autocomplete linking to that
        msg_body += '### ' + proplabel + '   \n' + '[' + propval.originalObject.prefLabel + '](' + propval.originalObject.uri + ')  \n';
      else // the property value is only a string
        msg_body += '### ' + proplabel + '   \n' + propval + '  \n';
    }
    console.log(msg_body);
    this.suggestion = {type: 'Muutos', preflabel: '', state: 'Käsittelyssä'};
  };
}]);

