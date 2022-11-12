angular.module('WannaGo').controller('favoritesTourController', function ($scope, $rootScope, $http, $localStorage) {
    const contextPath = $rootScope.CONSTANTS;

    if ($localStorage.springWebUser) {
        $http.defaults.headers.common.Authorization = 'Bearer ' + $localStorage.springWebUser.token;
    }

    $scope.getAllTrips = function (){
        $http.get(contextPath + '/api/v1/trip/favorites')
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

    $scope.delFromFavorites = function (tripId){
        $http.post(contextPath + '/api/v1/trip/favorites/' + tripId + '/remove')
            .then(function (response) {
                $scope.getAllTrips();
            });
    }

    $scope.addToPurchased = function (tripId){
        $http.post(contextPath + '/api/v1/trip/purchased/' + tripId)
            .then(function (response) {
                alert("DEBUG: Тур куплен");
            });
    }

    $scope.checkIsFavOrBuy = function (checkBool){
        if(checkBool === false || checkBool === null){
            return false;
        } else {
            return true;
        }
    }


    $scope.getAllTrips();

});