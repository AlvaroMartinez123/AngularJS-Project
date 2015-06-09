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
    
    $scope.$watch('level', function (newLevel, prevLevel) {
        if(newLevel <= 18){
          var levelDifference = newLevel - prevLevel;
          $scope.calculateStatsByLevel(levelDifference);
        }
    });
    
    $scope.getStatsByObject = function (newObject, prevObject) {
        
        if (prevObject !== ""){
          prevObject = angular.fromJson(prevObject);
          $scope.calculateStatsByObject(newObject, prevObject);
        } else {
          $scope.calculateStatsByObject(newObject);
        } 

    };
    
    
    
    $scope.calculateStatsByObject = function (newObject, prevObject){
      
      if(!prevObject) {
        
        angular.forEach($scope.champion.stats, function(value, key){
          
          angular.forEach(newObject.stats, function(objectValue, objectKey){
            if (objectKey === key){
              $scope.champion.stats[key] = $scope.champion.stats[key] + objectValue;
            }
          });
          
        });
      } else {
        angular.forEach($scope.champion.stats, function(value, key){
          
          angular.forEach(prevObject.stats, function(objectValue, objectKey){
            if (objectKey === key){
              $scope.champion.stats[key] = $scope.champion.stats[key] - objectValue;
            }
          });
          angular.forEach(newObject.stats, function(objectValue, objectKey){
            if (objectKey === key){
              $scope.champion.stats[key] = $scope.champion.stats[key] + objectValue;
            }
          });
        });
      }
    };
  
    
    $scope.calculateStatsByLevel = function (levelDifference) {
      
      
      if (levelDifference > 0) {
        
    
        $scope.champion.stats.health = Math.round(($scope.champion.stats.health + $scope.champion.statsPerLevel.health * levelDifference)* 1000) / 1000;
        $scope.champion.stats.healthRegen = Math.round(($scope.champion.stats.healthRegen + $scope.champion.statsPerLevel.healthRegen * levelDifference)* 1000) / 1000;
        $scope.champion.stats.mana = Math.round(($scope.champion.stats.mana + $scope.champion.statsPerLevel.mana * levelDifference)* 1000) / 1000;
        $scope.champion.stats.manaRegen = Math.round(($scope.champion.stats.manaRegen + $scope.champion.statsPerLevel.manaRegen * levelDifference)* 1000) / 1000;
        $scope.champion.stats.ad = Math.round(($scope.champion.stats.ad + $scope.champion.statsPerLevel.ad * levelDifference)* 1000) / 1000;
        $scope.champion.stats.ap = Math.round(($scope.champion.stats.ap + $scope.champion.statsPerLevel.ap * levelDifference)* 1000) / 1000;
        $scope.champion.stats.as = Math.round(($scope.champion.stats.as + ($scope.champion.stats.as * ($scope.champion.statsPerLevel.as * levelDifference) / 100))* 1000) / 1000;
        $scope.champion.stats.armor = Math.round(($scope.champion.stats.armor + $scope.champion.statsPerLevel.armor * levelDifference)* 1000) / 1000;
        $scope.champion.stats.mr = Math.round(($scope.champion.stats.mr + $scope.champion.statsPerLevel.mr * levelDifference)* 1000) / 1000;
        $scope.champion.stats.ms = Math.round(($scope.champion.stats.ms + $scope.champion.statsPerLevel.ms * levelDifference)* 1000) / 1000;
        
      } else {
        
        if (levelDifference < 0) {
          
          $scope.champion.stats.health = Math.round(($scope.champion.stats.health - $scope.champion.statsPerLevel.health * Math.abs(levelDifference))* 1000) / 1000;
          $scope.champion.stats.healthRegen = Math.round(($scope.champion.stats.healthRegen - $scope.champion.statsPerLevel.healthRegen * Math.abs(levelDifference))* 1000) / 1000;
          $scope.champion.stats.mana = Math.round(($scope.champion.stats.mana - $scope.champion.statsPerLevel.mana * Math.abs(levelDifference))* 1000) / 1000;
          $scope.champion.stats.manaRegen = Math.round(($scope.champion.stats.manaRegen - $scope.champion.statsPerLevel.manaRegen * Math.abs(levelDifference))* 1000) / 1000;
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