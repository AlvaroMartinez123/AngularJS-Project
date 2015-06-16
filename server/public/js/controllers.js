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
              $scope.champion.stats[key] = Math.round(($scope.champion.stats[key] - objectValue) * 1000) / 1000;
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
        
        
        angular.forEach($scope.champion.stats, function(value, key){
          
          angular.forEach($scope.champion.statsPerLevel, function(perLevelValue, perLevelKey){
            
            if (perLevelKey === key ){
                if(perLevelKey === "as") {
                  $scope.champion.stats[key] = Math.round(($scope.champion.stats[key] + ($scope.champion.stats[key] * (perLevelValue * levelDifference) / 100)) * 1000) / 1000;  
                } else {
                  $scope.champion.stats[key] = Math.round(($scope.champion.stats[key] + perLevelValue * levelDifference) * 1000) / 1000;  
                }
 
            }
            
          });
          
        });

      } else {
        
        if (levelDifference < 0) {
          
          angular.forEach($scope.champion.stats, function(value, key){
          
            angular.forEach($scope.champion.statsPerLevel, function(perLevelValue, perLevelKey){
              
              if (perLevelKey === key){
                if( perLevelKey === "as"){
                  $scope.champion.stats[key] = Math.round(($scope.champion.stats[key] - ($scope.champion.stats[key] * (perLevelValue * Math.abs(levelDifference)) / 100)) * 1000) / 1000;
                } else {
                  $scope.champion.stats[key] = Math.round(($scope.champion.stats[key] - perLevelValue * Math.abs(levelDifference)) * 1000) / 1000;
                }
              }
              
            });
          
        });
        
        } 
      }
    }
    
    
  }]);