angular.module('WannaGo').controller('tourController', function ($scope, $rootScope, $http, $localStorage) {

$scope.getAllTrips = function (){
  $http.get("http://localhost:8189/wannago/api/v1/trip")
      .then(function (response) {
         $scope.tripsList = response.data;
         console.log('NEW LOG: ' + $scope.tripsList.toString())
      });
};

$scope.getAllTrips();

});