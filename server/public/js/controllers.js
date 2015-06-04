var lolStatsControllers = angular.module('lolStatsControllers', []);

lolStatsControllers.controller('ChampionsListCtrl', ['$scope', '$http',
function ($scope, $http) {
    $http.get('champions/champions.json').success(function(data) {
      $scope.champions = data;
    });
  }]);

lolStatsControllers.controller('ChampionDetailCtrl', ['$scope', '$routeParams', '$http',
  function($scope, $routeParams, $http) {
    $http.get('champions/' + $routeParams.championId + '.json').success(function(data) {
      $scope.champion = data;
    });
    
    $http.get('objects/objects.json').success(function(data) {
      $scope.objects = data;
    });
    
    $scope.level = 1;
    $scope.championObjects = new Array(6);
    
    $scope.getStatsByLevel = function (prevLevel, newLevel){
      var levelDifference = newLevel - prevLevel;
      $scope.calculateStatsByLevel(levelDifference);
    };
    
    $scope.calculateStatsByLevel = function (levelDifference) {
      
      
      if (levelDifference > 0) {
    
        $scope.champion.stats.health.value = Math.round(($scope.champion.stats.health.value + $scope.champion.statsPerLevel.health.value * levelDifference)* 1000) / 1000;
        $scope.champion.stats.health.regen = Math.round(($scope.champion.stats.health.regen + $scope.champion.statsPerLevel.health.regen * levelDifference)* 1000) / 1000;
        $scope.champion.stats.mana.value = Math.round(($scope.champion.stats.mana.value + $scope.champion.statsPerLevel.mana.value * levelDifference)* 1000) / 1000;
        $scope.champion.stats.mana.regen = Math.round(($scope.champion.stats.mana.regen + $scope.champion.statsPerLevel.mana.regen * levelDifference)* 1000) / 1000;
        $scope.champion.stats.ad = Math.round(($scope.champion.stats.ad + $scope.champion.statsPerLevel.ad * levelDifference)* 1000) / 1000;
        $scope.champion.stats.ap = Math.round(($scope.champion.stats.ap + $scope.champion.statsPerLevel.ap * levelDifference)* 1000) / 1000;
        $scope.champion.stats.as = Math.round(($scope.champion.stats.as + ($scope.champion.stats.as * ($scope.champion.statsPerLevel.as * levelDifference) / 100))* 1000) / 1000;
        $scope.champion.stats.armor = Math.round(($scope.champion.stats.armor + $scope.champion.statsPerLevel.armor * levelDifference)* 1000) / 1000;
        $scope.champion.stats.mr = Math.round(($scope.champion.stats.mr + $scope.champion.statsPerLevel.mr * levelDifference)* 1000) / 1000;
        $scope.champion.stats.ms = Math.round(($scope.champion.stats.ms + $scope.champion.statsPerLevel.ms * levelDifference)* 1000) / 1000;
        
      } else {
        
        if (levelDifference < 0) {
          
          $scope.champion.stats.health.value = Math.round(($scope.champion.stats.health.value - $scope.champion.statsPerLevel.health.value * Math.abs(levelDifference))* 1000) / 1000;
          $scope.champion.stats.health.regen = Math.round(($scope.champion.stats.health.regen - $scope.champion.statsPerLevel.health.regen * Math.abs(levelDifference))* 1000) / 1000;
          $scope.champion.stats.mana.value = Math.round(($scope.champion.stats.mana.value - $scope.champion.statsPerLevel.mana.value * Math.abs(levelDifference))* 1000) / 1000;
          $scope.champion.stats.mana.regen = Math.round(($scope.champion.stats.mana.regen - $scope.champion.statsPerLevel.mana.regen * Math.abs(levelDifference))* 1000) / 1000;
          $scope.champion.stats.ad = Math.round(($scope.champion.stats.ad - $scope.champion.statsPerLevel.ad * Math.abs(levelDifference))* 1000) / 1000;
          $scope.champion.stats.ap = Math.round(($scope.champion.stats.ap - $scope.champion.statsPerLevel.ap * Math.abs(levelDifference))* 1000) / 1000;
          $scope.champion.stats.as = Math.round(($scope.champion.stats.as - ($scope.champion.stats.as * ($scope.champion.statsPerLevel.as * Math.abs(levelDifference)) / 100))* 1000) / 1000;
          $scope.champion.stats.armor = Math.round(($scope.champion.stats.armor - $scope.champion.statsPerLevel.armor * Math.abs(levelDifference))* 1000) / 1000;
          $scope.champion.stats.mr = Math.round(($scope.champion.stats.mr - $scope.champion.statsPerLevel.mr * Math.abs(levelDifference))* 1000) / 1000;
          $scope.champion.stats.ms = Math.round(($scope.champion.stats.ms - $scope.champion.statsPerLevel.ms * Math.abs(levelDifference))* 1000) / 1000;
 
        } 
      }
    }
    
    
  }]);