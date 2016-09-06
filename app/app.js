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
    'NEWSUGGESTION': 'Ehdota uutta käsitettä',
    'NEWHEADING': 'Ehdota uutta käsitettä YSAan ja YSOon',
    'CHANGEHEADING': 'Ehdota muutosta olemassa olevaan käsitteeseen YSAssa ja YSOssa',
    'CHANGESUGGESTION': 'Ehdota muutosta olemassa olevaan käsitteeseen',
    'SUGGESTIONS': 'Tee ehdotus',
    'LIST': 'Uusimmat ehdotukset',
    'LISTHEADING': 'YSAn ja YSOn uusimmat käsite-ehdotukset',
    'NOTINYSA': 'Asiasanaa ei löytynyt YSAsta.',
    'TERMFOUND': 'Ehdottamasi termi löytyy jo sanastosta',
    'PREFLABEL': 'Päätermi/asiasana',
    'ALTLABEL': 'Vaihtoehtoiset termit ja ilmaisut',
    'NARROWER': 'Alakäsitteet (ST)',
    'BROADER': 'Yläkäsite YSOssa (LT)',
    'SEARCH': 'Hae käsitettä',
    'RELATED': 'Assosiatiiviset (RT)',
    'GROUP': 'YSA/YSO temaattinen ryhmä',
    'MATCHING': 'Vastaava käsite muussa sanastossa',
    'SCOPENOTE': 'Tarkoitusta täsmentävä selite',
    'EXPLANATION': 'Perustelut ehdotukselle',
    'NEEDEDFOR': 'Minkä aineiston kuvailussa tarvitsisit käsitettä? (esim. nimeke tai URL)',
    'NAME': 'Ehdottajan nimi',
    'ORG': 'Ehdottajan organisaatio',
    'EMAIL': 'Sähköpostiosoite',
    'EMAILINFO' : 'Saat sähköpostiisi tietoa käsittelyn etenemisestä',
    'QUALITY' : 'Ehdotuksen laatu',
    'REQUIRED' : 'merkityt kohdat ovat pakollisia',
    'SUBMIT': 'Lähetä ehdotus',
    'CHANGE': 'Ehdotettu muutos',
    'TYPE': 'Tyyppi',
    'CONCEPT': 'Käsite',
    'STATE': 'Tila',
    'DATE': 'Päivämäärä',
    'COMMENTS': 'Kommentit',
    'PREFFI': 'Päätermi/asiasana: *',
    'PREFSV': 'Termi ruotsiksi',
    'PREFEN': 'Termi englanniksi',
    'CHOOSEGROUP': 'Valitse ryhmä(t) listalta',
    'ISSUELINK': 'Selaa ja kommentoi ehdotuksia GitHubissa',
    'GEO': 'Maantieteellinen paikka'
  });

  $translateProvider.translations('sv', {
    'TITLE': 'Förslagssystem',
    'NEWSUGGESTION': 'Föreslå ett nytt begrepp',
    'NEWHEADING': 'Föreslå ett nytt begrepp till Allärs och ALLFO',
    'CHANGEHEADING': 'Föreslå en ändring av ett begrepp som redan finns i Allärs och ALLFO',
    'CHANGESUGGESTION': 'Föreslå en ändring av ett begrepp',
    'SUGGESTIONS': 'Föreslå',
    'LIST': 'Nyaste förslag',
    'LISTHEADING': 'Nyaste förslag till Allärs och ALLFO',
    'NOTINYSA': 'Ämnesordet finns inte i Allärs.',
    'TERMFOUND': 'Den föreslagna termen finns redan i',
    'PREFLABEL': 'Term/ämnesord',
    'ALTLABEL': 'Alternativa termer och uttryck',
    'NARROWER': 'Underordnade begrepp',
    'BROADER': 'Överordnat begrepp i ALLFO',
    'SEARCH': 'Sök begrepp',
    'RELATED': 'Associativa (RT)',
    'GROUP': 'Tematisk grupp i Allärs/ALLFO',
    'MATCHING': 'Motsvarande begrepp i annan terminologi',
    'SCOPENOTE': 'Förklaring som preciserar betydelsen',
    'EXPLANATION': 'Motiveringar för förslaget',
    'NEEDEDFOR': 'I beskrivningen av vilket material behöver du begreppet (t.ex. titel eller URL)',
    'NAME': 'Förslagsställarens namn',  
    'ORG': 'Förslagsställarens organisation',
    'EMAIL': 'E-postadress',
    'EMAILINFO' : 'Du får information om hur behandlingen av förslaget framskrider till din e-post',
    'QUALITY' : 'Förslagets kvalitet',
    'REQUIRED' : 'obligatorisk information',
    'SUBMIT': 'Skicka förslaget',
    'CHANGE': 'Förslag till ändring',
    'TYPE': 'Typ',
    'CONCEPT': 'Begrepp',
    'STATE': 'Status',
    'DATE': 'Datum',
    'COMMENTS': 'Kommentarer',
    'PREFFI': 'Term/ämnesord på finska',
    'PREFSV': 'Term/ämnesord på svenska: *',
    'PREFEN': 'Term/ämnesord på engelska',
    'CHOOSEGROUP': 'Välj grupp(er) ur listan',
    'ISSUELINK': 'Sök och kommentera förslagen på GitHub',
    'GEO': 'Geografisk plats'
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
  $scope.changePage = function (page) {
    $scope.currentpage = page;
  };
  
  $scope.language = $translate.use();
}]);

app.directive('existingConcept', function($http) {
  var toId;
  return {
    restrict: 'A',
    require: 'ngModel',
    link: function(scope, elem, attr, ctrl) { 
      scope.$watch(attr.ngModel, function(value) {
        // if there was a previous attempt, stop it.
        if (!value)
          return false;
        if(toId) clearTimeout(toId);

        // start a new attempt with a delay to keep it from
        // getting too "chatty".
        toId = setTimeout(function(){
          var vocab = (attr.inVocab) ? attr.inVocab : 'ysa';
          $http.get('http://dev.finto.fi/rest/v1/' + attr.inVocab + '/lookup?label=' + value).then(function(data) {
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
      scope.$watch(attr.ngModel, function(value) {
        // if there was a previous attempt, stop it.
        if (!value)
          return false;
        if(toId) clearTimeout(toId);

        // start a new attempt with a delay to keep it from
        // getting too "chatty".
        toId = setTimeout(function(){
          var vocab = (attr.inVocab) ? attr.inVocab : 'ysa';
          $http.get('http://dev.finto.fi/rest/v1/search?query=' + value + '&vocab=yse+' + vocab).then(function(data) {
            scope.existingConcept = undefined;
            if (data.data.results.length > 0) {
              scope.existingConcept = data.data.results[0];
              ctrl.$setValidity('pref' + ctrl.language, false); // set to false if the term can already be found
            } else {
              ctrl.$setValidity('pref' + ctrl.language, true);
            }
          }, function() {
            ctrl.$setValidity('pref' + ctrl.language, true);
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
      var labels = {'type': 'Ehdotuksen tyyppi', 'preflabelfi': 'Ehdotettu termi suomeksi', 'preflabelsv': 'Ehdotettu termi ruotsiksi', 'preflabelen': 'Ehdotettu termi englanniksi', 'state': 'Tila', 'change':'Ehdotettu muutos', 'scopenote': 'Tarkoitusta täsmentävä selite', 'explanation': 'Perustelut ehdotukselle', 'broader': 'Ehdotettu yläkäsite YSOssa (LT)', 'groups': 'Ehdotetut temaattiset ryhmät (YSA-ryhmät)','name': 'Ehdottajan nimi', 'email': 'Ehdottajan sähköpostiosoite', 'altlabel': 'Vaihtoehtoiset termit ja ilmaisut', 'narrower': 'Alakäsitteet (RT)', 'related': 'Assosiatiiviset (ST)', 'fromname': 'Ehdottajan nimi', 'fromorg': 'Ehdottajan organisaatio', 'org': 'Ehdottajan organisaatio', 'fromemail': 'Ehdottajan sähköpostiosoite','neededfor': 'Aineisto jonka kuvailussa käsitettä tarvitaan (esim. nimeke tai URL)', 'concepttype': 'Käsitteen tyyppi'};

      for (var property in suggestion) {
        var proplabel = labels[property] ? labels[property] : property;
        var propval = suggestion[property];
        var groups = '';
        if (Object.prototype.toString.call(propval) === '[object Array]') {
          for (var i in propval) {
            groups += '[' + propval[i].prefLabel + '](' + propval[i].uri + ')  \n\n';
          }
          msg_body += '#### ' + proplabel + '   \n\n' + groups;
        } else if (propval.originalObject) // if there is an uri available from the autocomplete linking to that
  msg_body += '#### ' + proplabel + '   \n\n' + '[' + propval.originalObject.prefLabel + '](' + propval.originalObject.uri + ')  \n\n';
        else if (propval !== '')// the property value is only a string
  msg_body += '#### ' + proplabel + '   \n\n' + propval + '  \n\n';
      }
      return msg_body;  
    }
  };
}]);
