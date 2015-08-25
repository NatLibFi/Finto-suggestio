'use strict';

var app = angular.module('myApp.change', ['ngRoute']);

app.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/change', {
    templateUrl: 'change/change.html',
    controller: 'ChangeController'
  });
}]);

app.controller('ChangeController', [function() {
    this.suggestion = {type: 'Muutos', preflabel: '', state: 'Käsittelyssä', date: Date.now(), comments: 0};

    this.submitSuggestion = function() {
      var msg_body = '';
      for (var property in this.suggestion) {
        msg_body += '### ' + property + '   \n' + this.suggestion[property] + '  \n';
      }
      console.log(msg_body);
      this.suggestion = {type: 'Muutos', preflabel: '', state: 'Käsittelyssä', date: Date.now(), comments: 0};
    };
}]);

