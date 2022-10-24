angular.module('WannaGo').controller('tourController', function ($scope, $rootScope, $http, $localStorage) {
    const contextPath = 'http://localhost:8189/wannago/api/v1';

$scope.getAllTrips = function (){
  $http.get("http://5.188.140.199:8189/wannago/api/v1/trip")
      .then(function (response) {
         $scope.tripsList = response.data;
         console.log('NEW LOG: ' + $scope.tripsList.toString())
      });
};

    $scope.getCurrentUser = function (){
        if ($localStorage.springWebUser) {
            $http.defaults.headers.common.Authorization = 'Bearer ' + $localStorage.springWebUser.token;
        }
        if(!$localStorage.user) {
            $http.get(contextPath + '/user')
                .then(function successCallback(response) {
                    $scope.user = response.data;
                }, function errorCallback(response) {
                    alert("Зарегистрируйтесь")
                });
        } else {
            $scope.user = $localStorage.user;
        }
    }

    $scope.getAllTrips();
    $scope.getCurrentUser();

});