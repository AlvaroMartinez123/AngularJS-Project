
var lolStats = angular.module('lolStats', [
  'ngRoute',
  'lolStatsControllers'
]);

lolStats.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/champions', {
        templateUrl: 'partials/champions-list.html',
        controller: 'ChampionsListCtrl'
      }).
      when('/champions/:championId', {
        templateUrl: 'partials/champion-detail.html',
        controller: 'ChampionDetailCtrl'
      }).
      otherwise({
        redirectTo: '/champions'
      });
  }]);