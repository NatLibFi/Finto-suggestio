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

  this.suggestion = {type: 'Muutos', preflabel: '', state: 'Käsittelyssä', date: Date.now(), comments: 0};

  this.submitSuggestion = function() {
    var msg_body = '';
    for (var property in this.suggestion) {
      var propval = this.suggestion[property];
      if (propval.originalObject) // if there is an uri available from the autocomplete linking to that
        msg_body += '### ' + property + '   \n' + '[' + propval.originalObject.prefLabel + '](' + propval.originalObject.uri + ')  \n';
      else // the property value is only a string
        msg_body += '### ' + property + '   \n' + propval + '  \n';
    }
    console.log(msg_body);
    this.suggestion = {type: 'Muutos', preflabel: '', state: 'Käsittelyssä', date: Date.now(), comments: 0};
  };
}]);

