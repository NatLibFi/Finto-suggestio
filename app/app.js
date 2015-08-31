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
    'SUGGESTIONS': 'Ehdotukset',
    'NOTINYSA': 'Asiasanaa ei löytynyt YSAsta.',
    'INYSA': 'Ehdottamasi termi löytyy jo YSAsta.',
    'PREFLABEL': 'Päätermi/asiasana',
    'ALTLABEL': 'Vaihtoehtoiset termit ja ilmaisut',
    'NARROWER': 'Alakäsitteet (RT)',
    'BROADER': 'Yläkäsite YSOssa (LT)',
    'SEARCH': 'Hae käsitettä',
    'RELATED': 'Assosiatiiviset (ST)',
    'GROUP': 'YSA/YSO temaattinen ryhmä',
    'MATCHING': 'Vastaava käsite muussa sanastossa',
    'SCOPENOTE': 'Tarkoitusta täsmentävä selite',
    'EXPLANATION': 'Perustelut ehdotukselle',
    'NEEDEDFOR': 'Minkä aineiston kuvailussa tarvitsisit käsitettä? (esim. nimeke tai URL)',
    'NAME': 'Ehdottajan nimi',
    'ORG': 'Ehdottajan organisaatio',
    'EMAIL': 'Sähköpostiosoite',
    'EMAILINFO' : 'Saat sähköpostiisi tietoa käsittelyn etenemisestä',
    'SUBMIT': 'Lähetä ehdotus'
  });

  $translateProvider.translations('sv', {
    'TITLE': 'Förslag system',
    'SUGGESTIONS': 'Förslag',
    'NOTINYSA': 'Asiasanaa ei löytynyt YSAsta.',
    'INYSA': 'Ehdottamasi termi löytyy jo YSAsta.',
    'PREFLABEL': 'Term/ämnesord',
    'ALTLABEL': 'Vaihtoehtoiset termit ja ilmaisut',
    'NARROWER': 'Underordnade begrepp',
    'BROADER': 'Överordnadt begrepp i ALLFO',
    'SEARCH': 'Sök begrepp',
    'RELATED': 'Assosiatiiviset (ST)',
    'GROUP': 'YSA/YSO temaattinen ryhmä',
    'MATCHING': 'Vastaava käsite muussa sanastossa',
    'SCOPENOTE': 'Tarkoitusta täsmentävä selite',
    'EXPLANATION': 'Perustelut ehdotukselle',
    'NEEDEDFOR': 'Minkä aineiston kuvailussa tarvitsisit käsitettä? (esim. nimeke tai URL)',
    'NAME': 'Ehdottajan nimi',
    'ORG': 'Ehdottajan organisaatio',
    'EMAIL': 'E-postadress',
    'EMAILINFO' : 'Saat sähköpostiisi tietoa käsittelyn etenemisestä',
    'SUBMIT': 'Skicka förslaget'
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
