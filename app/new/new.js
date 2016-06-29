'use strict';

angular.module('myApp.new', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/new', {
    templateUrl: 'new/new.html',
    controller: 'SuggestionController',
    controllerAs: 'suggestionCtrl'
  });
}])

.controller('SuggestionController', ['$http','$location','$scope','$sce','FormFormatter' , function($http, $location, $scope, $sce, FormFormatter) {
  
  $scope.trustAsHtml = function(value) {
    return $sce.trustAsHtml(value);
  };

  $scope.requestFormatter = function(qstring) {
    return {query: qstring + '*'};
  };
    
  $scope.groupList = [];
  $http.get('http://dev.finto.fi/rest/v1/ysa/groups').then(function(response) {
    $scope.groupList = response.data.groups;
  });

  //this.suggestion = {state: 'Käsittelyssä'};

  this.addSuggestion = function() {
    var msg_body = FormFormatter.markdown(this.suggestion);
    var msg_title = this.suggestion.preflabelfi;
    var msg = {'title': msg_title, 'body': msg_body, 'labels': ['uusi']};
    $http({method: 'POST', url: './post.php', data: msg}).then(function(response) {
      $location.path('/list');
    });
  };
  
  this.getStars = function() {
    if ($scope.suggestionForm.$invalid)
      return 0;
    var stars = 1; // when the required fields have been filled out
    var required = ['type', 'preflabelfi', 'state', 'date', 'groups', 'name', 'email', 'explanation'];
    for (var prop in this.suggestion) {
      if (required.indexOf(prop) === -1 && this.suggestion[prop] !== '' && stars < 5)
        stars += 1;
    }
    return stars;
  };

  $scope.getNumber = function(num) {
    return new Array(num);   
  };
}])

.directive('uiSelectRequired', function () { 
  return { require: 'ngModel', link: function (scope, elm, attrs, ctrl) { 
    ctrl.$validators.uiSelectRequired = function (modelValue, viewValue) {
            if (scope.suggestionCtrl.suggestion.concepttype !== 'Käsite') {
                return true;
            }
            var determineVal;
            if (angular.isArray(modelValue)) {
                determineVal = modelValue;
            } else if (angular.isArray(viewValue)) {
                determineVal = viewValue;
            } else {
                return false;
            }

            return determineVal.length > 0;
        };
    }
  };
}); 
