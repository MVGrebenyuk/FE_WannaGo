angular.module('WannaGo').controller('tourController', function ($scope, $rootScope, $http, $localStorage) {
    const contextPath = 'http://localhost:8189/wannago';

$scope.getAllTrips = function (){
  $http.get(contextPath + '/api/v1/trip')
      .then(function (response) {
         $scope.tripsList = response.data;
      });
};

    $scope.getAllTrips();

});