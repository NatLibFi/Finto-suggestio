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
    'INYSA': 'Ehdottamasi termi löytyy jo YSAsta.',
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
    'INYSA': 'Den föreslagna termen finns redan i Allärs.',
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
            if (data.data.results.length > 0) {
              ctrl.$setValidity('newConcept', false); // set to false if the term can already be found
            } else {
              ctrl.$setValidity('newConcept', true);
            }
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
    return {query: qstring + '*', lang: $scope.language};
  };
    
  $scope.groupList = [];
  $http.get('http://dev.finto.fi/rest/v1/ysa/groups').then(function(response) {
    $scope.groupList = response.data.groups;
  });

  this.addSuggestion = function() {
    var msg_body = FormFormatter.markdown(this.suggestion);
    var msg_title = this.suggestion.preflabelfi ? this.suggestion.preflabelfi : this.suggestion.preflabelsv;
    if ($scope.language === 'sv') {
        msg_title = this.suggestion.preflabelsv ? this.suggestion.preflabelsv : this.suggestion.preflabelfi;
    }
    var msg = {'title': msg_title, 'body': msg_body, 'labels': ['uusi']};
    $http({method: 'POST', url: './post.php', data: msg}).then(function(response) {
      $location.path('/list');
    });
  };
  
  this.getStars = function() {
    if ($scope.suggestionForm.$invalid || (!this.suggestion.preflabelfi && !this.suggestion.preflabelsv)) {
      return 0;
    }
    var stars = 0;
    var required = ['concepttype', 'state', 'date', 'groups', 'name', 'email', 'explanation'];
    for (var prop in this.suggestion) {
      if (required.indexOf(prop) === -1 && this.suggestion[prop] !== '' && stars < 5)
        stars += 1; // one star for each additional field
    }
    return stars; // the compulsory first prefLabel is counted as the first star
  };

  $scope.getNumber = function(num) {
    return new Array(num);   
  };
}])

.directive('uiSelectRequired', function () { 
  return { require: 'ngModel', link: function (scope, elm, attrs, ctrl) { 
    ctrl.$validators.uiSelectRequired = function (modelValue, viewValue) {
            if (scope.suggestionCtrl.suggestion.concepttype !== 'CONCEPT') {
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


'use strict';

angular.module('myApp.list', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/list', {
    templateUrl: 'list/list.html',
    controller: 'ListController',
    controllerAs: 'listCtrl'
  });
}])

.filter('determineType', function() {
  return function(input) {
    for(var i in input) {
      if(input[i].name === 'muutos') {
        return 'Muutosehdotus';
      }
      return 'Käsite-ehdotus';
    }
  };
})

.controller('ListController', ['$http','$scope', function($http, $scope) {
  $scope.suggestions = [];
  $scope.changePage('list');

  $http.get('./list.php').then(function(data){
    var issues = data.data;
    for(var i in issues) {
      $scope.suggestions.push({
        type: issues[i].labels, 
        preflabel: issues[i].title, 
        state: issues[i].labels, 
        date: issues[i].created_at, 
        comments: issues[i].comments,
        href: issues[i].html_url
      });
    }
  },function() {});
}]);

