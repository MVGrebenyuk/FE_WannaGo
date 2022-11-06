angular.module('WannaGo').controller('tourController', function ($scope, $rootScope, $http, $localStorage) {
    const contextPath = 'http://5.188.140.199:8189/wannago';

    if ($localStorage.springWebUser) {
        $http.defaults.headers.common.Authorization = 'Bearer ' + $localStorage.springWebUser.token;
    }

    $scope.getAllTrips = function (){
      $http.get(contextPath + '/api/v1/trip')
          .then(function (response) {
             $scope.tripsList = response.data;
          });
    };

    $scope.checkIsFavOrBuy = function (checkBool){
        if(checkBool === false || checkBool === null){
            return false;
        } else {
            return true;
        }
    }

    $scope.addToFavorite = function (tripId){
        $http.post(contextPath + '/api/v1/trip/favorites/' + tripId)
            .then(function (response) {
                alert("DEBUG: Тур добавлен в избранное");
            });
    }

    $scope.delFromFavorites = function (tripId){
        $http.post(contextPath + '/api/v1/trip/favorites/remove' + tripId)
            .then(function (response) {
                alert("DEBUG: Тур удален из избранного");
            });
    }

    $scope.addToPurchased = function (tripId){
        $http.post(contextPath + '/api/v1/trip/purchased/' + tripId)
            .then(function (response) {
                alert("DEBUG: Тур куплен");
            });
    }

    $scope.getAllTrips();

});