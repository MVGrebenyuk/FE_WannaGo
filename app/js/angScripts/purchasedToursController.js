angular.module('WannaGo').controller('purchasedTourController', function ($scope, $rootScope, $http, $localStorage) {
    const contextPath = 'http://localhost:8189/wannago';

    if ($localStorage.springWebUser) {
        $http.defaults.headers.common.Authorization = 'Bearer ' + $localStorage.springWebUser.token;
    }

    $scope.getAllTrips = function (){
        $http.get(contextPath + '/api/v1/trip/purchased')
            .then(function (response) {
                $scope.tripsList = response.data;
            });
    };

    $scope.addToFavorite = function (tripId){
        $http.post(contextPath + '/api/v1/trip/favorites/' + tripId)
            .then(function (response) {
                alert("DEBUG: Тур добавлен в избранное");
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