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
    'CHANGEHEADING': 'Ehdota muutosta YSA/YSO -käsitteeseen',
    'CHANGESUGGESTION': 'Ehdota muutosta käsitteeseen',
    'SUGGESTIONS': 'Tee ehdotus',
    'LIST': 'Selaa ehdotuksia',
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
    'ISSUELINK': 'Hae ja kommentoi ehdotuksia GitHubissa',
    'OTHER': 'Muu',
    'VOCAB': 'Sanasto (LCSH,Wikipedia, etc.)',
    'TERMURI': 'URI tai Termi',
    'FINTOLINK': 'Selaa ehdotuksia Fintossa',
    'QA': 'Ehdotuksen lähetys ei onnistu, jos pakollisissa kentissä on puutteita.',
    'THANKS': 'Kiitos ehdotuksestasi! Voit seurata käsittelyn etenemistä ehdotuksen omalla ',
    'ISSUEPAGE': 'GitHub-sivulla',
    'HELP': 'Näytä ohje',
    'HELPCONTENT': 'Oheisella lomakkeella voit ehdottaa sekä uusia käsitteitä että muutoksia YSAan ja YSOon. Sanastotyön helpottamiseksi ehdotukselta vaaditaan tiettyä minimitasoa. Minimitaso täyttyy kun lomakkeen pakolliset kentät on täytetty. Tällöin ehdotus saa yhden tähden laatuluokituksen ja ehdotuksen voi lähettää. Jokaisesta täytetystä lisäkentästä ehdotus saa yhden laatutähden lisää. Huolellisesti valmisteltu ehdotus on nopeampi käsitellä ja ottaa mukaan sanastoon. Ehdotusten käsittelyyn voi osallistua kommentoimalla niitä GitHubissa ja antamalla käsittelyä helpottavia tarkennuksia/lisätietoja.',
    'HELPCONTENT2': 'Kun ehdotus uuden termin ottamisesta sanastoon on lähetetty, tarkastetaan ehdotus ylläpidon toimesta. Ehdotus hylätään vain jos ehdotuksessa on asiattomuuksia tai jos sitä ei ole luotu lomakkeen kautta. Muutosehdotuksia ei tarvitse erikseen vahvistaa. Hyväksytyt uudet käsite-ehdotukset siirretään Finton ehdotukset sisältävään "sanastoon" YSEen koneellisesti noin kerran päivässä. Uusi ehdotus näkyy Fintossa yleensä tarkastuksesta seuraavana päivänä.',
    'HELPCONTENT3': 'Ehdotuksia käsitellään sanastoryhmän kokouksissa. Kun ehdotus päätetään ottaa sanastoon, poistetaan ehdotus YSEstä ja ehdotuksen GitHub-issue suljetaan. Tämän jälkeen ehdotus lisätään sanastoon uutena käsitteenä ja sitä voi käyttää kuvailussa.',
    'HELPCONTENT4': 'Voit lähettää palautetta ja kehitysehdotuksia osoitteeseen: finto-posti(ät)helsinki.fi',
    'CLOSE': 'Sulje',
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
    'OTHER': 'Annan',
    'VOCAB': 'Vokabulär (LCSH,Wikipedia, etc.)',
    'TERMURI': 'URI eller Term',
    'FINTOLINK': 'Sök förslagen i Finto',
    'QA': 'Du kan skicka förslaget när du har givit all obligatorisk information.',
    'THANKS': 'Tack för förslaget! Du kan följa behandlingen av förslaget på sin egen ',
    'ISSUEPAGE': 'GitHub sida',
    'HELP': 'Visa hjälp',
    'HELPCONTENT': 'Oheisella lomakkeella voit ehdottaa sekä uusia käsitteitä että muutoksia YSAan ja YSOon. Sanastotyön helpottamiseksi ehdotukselta vaaditaan tiettyä minimitasoa. Minimitaso täyttyy kun lomakkeen pakolliset kentät on täytetty. Tällöin ehdotus saa yhden tähden laatuluokituksen ja ehdotuksen voi lähettää. Jokaisesta täytetystä lisäkentästä ehdotus saa yhden laatutähden lisää. Huolellisesti valmisteltu ehdotus on nopeampi käsitellä ja ottaa mukaan sanastoon. Ehdotusten käsittelyyn voi osallistua kommentoimalla niitä GitHubissa ja antamalla käsittelyä helpottavia tarkennuksia/lisätietoja.',
    'HELPCONTENT2': 'Kun ehdotus uuden termin ottamisesta sanastoon on lähetetty, tarkastetaan ehdotus ylläpidon toimesta. Ehdotus hylätään vain jos ehdotuksessa on asiattomuuksia tai jos sitä ei ole luotu lomakkeen kautta. Muutosehdotuksia ei tarvitse erikseen vahvistaa. Hyväksytyt uudet käsite-ehdotukset siirretään Finton ehdotukset sisältävään "sanastoon" YSEen koneellisesti noin kerran päivässä. Uusi ehdotus näkyy Fintossa yleensä tarkastuksesta seuraavana päivänä.',
    'HELPCONTENT3': 'Ehdotuksia käsitellään sanastoryhmän kokouksissa. Kun ehdotus päätetään ottaa sanastoon, poistetaan ehdotus YSEstä ja ehdotuksen GitHub-issue suljetaan. Tämän jälkeen ehdotus lisätään sanastoon uutena käsitteenä ja sitä voi käyttää kuvailussa.',
    'HELPCONTENT4': 'Voit lähettää palautetta ja kehitysehdotuksia osoitteeseen: finto-posti(ät)helsinki.fi',
    'CLOSE': 'Stäng',
    'GEO': 'Geografisk plats'
  });

  $translateProvider.preferredLanguage('fi');
  $translateProvider.useSanitizeValueStrategy('escape');
  $translateProvider.useCookieStorage();
}]);

app.controller('Ctrl', ['$translate', '$scope', function ($translate, $scope) {
  $scope.showhelp = false;
  $scope.changeLanguage = function (langKey) {
    $translate.use(langKey);
    $scope.language = langKey;
  };
  $scope.changePage = function (page) {
    var titles = {'list': 'LISTHEADING', 'new': 'NEWHEADING', 'change': 'CHANGEHEADING'};
    $scope.currentpage = page;
    $scope.pagetitle = titles[page];
  };
  $scope.toggleHelp = function () {
    $scope.showhelp = $scope.showhelp ? false : true;
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
      var labels = {'type': 'Ehdotuksen tyyppi', 'preflabelfi': 'Ehdotettu termi suomeksi', 'preflabelsv': 'Ehdotettu termi ruotsiksi', 'preflabelen': 'Ehdotettu termi englanniksi', 'state': 'Tila', 'change':'Ehdotettu muutos', 'scopenote': 'Tarkoitusta täsmentävä selite', 'explanation': 'Perustelut ehdotukselle', 'broader': 'Ehdotettu yläkäsite YSOssa (LT)', 'groups': 'Ehdotetut temaattiset ryhmät (YSA-ryhmät)','name': 'Ehdottajan nimi', 'email': 'Ehdottajan sähköpostiosoite', 'altlabel': 'Vaihtoehtoiset termit ja ilmaisut', 'narrower': 'Alakäsitteet (RT)', 'related': 'Assosiatiiviset (ST)', 'fromname': 'Ehdottaja', 'fromorg': 'Ehdottajan organisaatio', 'org': 'Ehdottajan organisaatio', 'fromemail': 'Ehdottajan sähköpostiosoite','neededfor': 'Aineisto jonka kuvailussa käsitettä tarvitaan (esim. nimeke tai URL)', 'concepttype': 'Käsitteen tyyppi'};
      var propertyMd = '';
      var priorityMd = '';
      var contactMd = '';

      for (var property in suggestion) {
        var proplabel = labels[property] ? labels[property] : property;
        var propval = suggestion[property];
        if(propval === '') { continue; }
        // an array of property values
        if (Object.prototype.toString.call(propval) === '[object Array]') {
          var valuemd = '';
          for (var i in propval) {
            if(property === 'groups') {
                valuemd += '[' + propval[i].prefLabel + '](' + propval[i].uri + ') \n';
            } else if(propval[i].originalObject) {
                valuemd += '[' + propval[i].originalObject.prefLabel + '](' + propval[i].originalObject.uri + ') \n';   
            } else if(propval[i].vocab || propval[i].value) {
                var match = (propval[i].value.indexOf('http:') !== -1) ? '<' + propval[i].value + '>' : propval[i].value;
                valuemd += propval[i].vocab + ' : ' + match + ' \n';   
            }
          }
          if (valuemd !== '') {
              propertyMd += '#### ' + proplabel + '   \n\n' + valuemd + '\n';
          }
        } else if (propval.originalObject) { // if there is an uri available add a link
            propertyMd += '#### ' + proplabel + '   \n\n' + 
              '[' + propval.originalObject.prefLabel + '](' + propval.originalObject.uri + ') \n\n';
        } else if (property.indexOf('preflabel') !== -1 || property === 'concepttype') { // placing prefLabels and type at the top
            priorityMd += '#### ' + proplabel + '   \n\n' + propval + ' \n\n';
        } else if (property === 'name' || property === 'email' || property === 'org') { // placing contact info at the bottom in a condensed format
            contactMd += '**' + proplabel + ':** ' + propval + ' \n';
        } else {
            propertyMd += '#### ' + proplabel + '   \n\n' + propval + ' \n\n';
        }
      }
      if (contactMd.substring(contactMd.length-1) === '\n') {
        contactMd = contactMd.substring(0, contactMd.length-1);
      }
      return priorityMd + propertyMd + contactMd;  
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
  $scope.changePage('new');
  this.suggestion = {'broader': [], 'narrower': [], 'related': [], 'exactMatch': []};
  
  $scope.trustAsHtml = function(value) {
    return $sce.trustAsHtml(value);
  };

  $scope.requestFormatter = function(qstring) {
    return {query: qstring + '*', lang: $scope.language};
  };
    
  $scope.groupList = [];
  $http.get('http://dev.finto.fi/rest/v1/yso/groups?lang=' + $scope.language).then(function(response) {
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
      // making sure there is no crap before the actual json response
      var number = JSON.parse(response.data.substring(response.data.indexOf('{'))).number;
      $location.path('/list').search({submitted: number});
    });
  };
  
  this.getStars = function() {
    if ($scope.suggestionForm.$invalid || (!this.suggestion.preflabelfi && !this.suggestion.preflabelsv)) {
      return 0;
    }
    var stars = 0;
    var required = ['concepttype', 'state', 'date', 'groups', 'name', 'email', 'explanation', 'neededfor'];
    for (var prop in this.suggestion) {
      if (required.indexOf(prop) === -1 && this.suggestion[prop] !== '' && this.suggestion[prop].length > 0 && stars < 5) {
        stars += 1; // one star for each additional field
      }
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
  $scope.changePage('change');
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

.controller('ListController', ['$http','$scope','$routeParams', function($http, $scope, $routeParams) {
  $scope.suggestions = [];
  $scope.changePage('list');
  $scope.pagetitle = 'LISTHEADING';
  $scope.grateful = $routeParams.submitted !== undefined ? true : false;
  $scope.issuenum = $routeParams.submitted;

  $http.get('./list.php').then(function(data){
    var issues = data.data.splice(0, 15);
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

