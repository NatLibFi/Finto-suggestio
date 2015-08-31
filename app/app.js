'use strict';

// Declare app level module which depends on views, and components
var app = angular.module('myApp', [
  'ngRoute',
  'ngCookies',
  'myApp.list',
  'myApp.new',
  'ui.select',
  'angucomplete-alt',
  'pascalprecht.translate',
  'myApp.change'
]);

app.config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/list'});
}]);

app.config(['$translateProvider', function ($translateProvider) {
  $translateProvider.translations('fi', {
    'TITLE': 'Ehdotusjärjestelmä',
    'preflabel': 'Päätermi/asiasana',
    'altlabels': 'Vaihtoehtoiset termit ja ilmaisut',
    'narrowers': 'Alakäsitteet (RT)',
    'broader': 'Yläkäsite YSOssa (LT)',
    'suggestions': 'Ehdotukset',
    'search': 'Hae käsitettä',
    'submit': 'Lähetä ehdotus'
  });

  $translateProvider.translations('sv', {
    'TITLE': 'Förslag system',
    'preflabel': 'Term/ämnesord',
    'narrowers': 'Underordnade begrepp',
    'broader': 'Överordnadt begrepp i ALLFO',
    'suggestions': 'Förslag',
    'search': 'Sök begrepp',
    'submit': 'Skicka förslaget'
  });

  $translateProvider.preferredLanguage('fi');
  $translateProvider.useSanitizeValueStrategy('escape');
  $translateProvider.useCookieStorage();
}]);

app.controller('Ctrl', ['$translate', '$scope', function ($translate, $scope) {
  $scope.changeLanguage = function (langKey) {
    $translate.use(langKey);
    $scope.language = langKey;
  };
  
  $scope.language = $translate.use();
}]);

app.directive('existingConcept', function($http) {
  var toId;
  return {
    restrict: 'A',
    require: 'ngModel',
    link: function(scope, elem, attr, ctrl) { 
      //when the scope changes, check the email.
      scope.$watch(attr.ngModel, function(value) {
        // if there was a previous attempt, stop it.
        if (!value)
          return false;
        if(toId) clearTimeout(toId);

        // start a new attempt with a delay to keep it from
        // getting too "chatty".
        toId = setTimeout(function(){
          var vocab = (attr.inVocab) ? attr.inVocab : 'ysa';
          $http.get('http://api.finto.fi/rest/v1/' + attr.inVocab + '/lookup?label=' + value).then(function(data) {
            //set the validity of the field
            ctrl.$setValidity('existingConcept', true);
          }, function() {
            ctrl.$setValidity('existingConcept', false);
          });
        }, 500);
      });
    }
  };
});

app.directive('newConcept', function($http) {
  var toId;
  return {
    restrict: 'A',
    require: 'ngModel',
    link: function(scope, elem, attr, ctrl) { 
      //when the scope changes, check the email.
      scope.$watch(attr.ngModel, function(value) {
        // if there was a previous attempt, stop it.
        if (!value)
          return false;
        if(toId) clearTimeout(toId);

        // start a new attempt with a delay to keep it from
        // getting too "chatty".
        toId = setTimeout(function(){
          var vocab = (attr.inVocab) ? attr.inVocab : 'ysa';
          $http.get('http://api.finto.fi/rest/v1/' + vocab + '/lookup?label=' + value).then(function(data) {
            ctrl.$setValidity('newConcept', false); // set to false if the term can already be found
          }, function() {
            ctrl.$setValidity('newConcept', true);
          });
        }, 500);
      });
    }
  };
});

app.factory('FormFormatter', [function() {
  return {
    markdown: function(suggestion) { 
      var msg_body = '';
      var labels = {'type': 'Ehdotuksen tyyppi', 'preflabel': 'Päätermi/asiasana', 'state': 'Tila', 'change':'Ehdotettu muutos', 'explanation': 'Perustelut ehdotukselle', 'fromname': 'Ehdottajan nimi', 'fromemail': 'Ehdottajan sähköpostiosoite'};

      for (var property in suggestion) {
        var proplabel = labels[property] ? labels[property] : property;
        var propval = suggestion[property];
        if (propval.originalObject) // if there is an uri available from the autocomplete linking to that
  msg_body += '### ' + proplabel + '   \n\n' + '[' + propval.originalObject.prefLabel + '](' + propval.originalObject.uri + ')  \n\n';
        else // the property value is only a string
  msg_body += '### ' + proplabel + '   \n\n' + propval + '  \n\n';
      }
      return msg_body;  
    }
  };
}]);
