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
    $scope.groupList = response.data.groups;
  });

  this.suggestion = {type: 'Lisäys', preflabel: '', state: 'Käsittelyssä', date: Date.now()};

  this.addSuggestion = function() {
    console.log(this.suggestion);
    this.suggestion = {type: 'Lisäys', preflabel: '', state: 'Käsittelyssä', date: Date.now()};
  };
  
  this.getStars = function() {
    if ($scope.suggestionForm.$invalid)
      return 0;
    var stars = 1; // when the required fields have been filled out
    var required = ['type', 'preflabel', 'state', 'date', 'broader', 'groups', 'name', 'email', 'explanation'];
    for (var prop in this.suggestion) {
      if (required.indexOf(prop) === -1 && this.suggestion[prop] !== '' && stars < 5)
        stars += 1;
    }
    return stars;
  };
}])

.directive('uiSelectRequired', function () { 
  return { require: 'ngModel', link: function (scope, elm, attrs, ctrl) { 
    ctrl.$validators.uiSelectRequired = function (modelValue, viewValue) {
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
