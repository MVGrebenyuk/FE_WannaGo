angular.module('WannaGo').controller('tourController', function ($scope, $rootScope, $http, $localStorage) {
    const contextPath = localStorage.CONSTANTS;

    if ($localStorage.springWebUser) {
        $http.defaults.headers.common.Authorization = 'Bearer ' + $localStorage.springWebUser.token;
    }

    $scope.getAllTripsWithFilters = function (){
        let filter = JSON;
        filter.country = document.getElementById('country').value;
        filter.priceMin = document.getElementById('min').value;
        filter.priceMax = document.getElementById('max').value;
        filter.durationMin = document.getElementById('min-duration').value;
        filter.durationMax = document.getElementById('max-duration').value;
        filter.lengthMin = document.getElementById('min-distance').value;
        filter.lengthMax = document.getElementById('max-distance').value;
        $http.post(contextPath + '/api/v1/trip/get', filter)
            .then(function (response) {
                $scope.tripsList = response.data;
            });
    };

    $scope.getAllTrips = function (){
      $http.post(contextPath + '/api/v1/trip/get')
          .then(function (response) {
             $scope.tripsList = response.data;
          });
    };

    $scope.findFilters = function (){
        $http.get(contextPath + '/api/v1/filters')
            .then(function (response) {
                $scope.filterInfo = response.data;
                $localStorage.filterInfo = response.data;
                localStorage.filterInfo = JSON.stringify(response.data);
                $scope.getAllTrips();
            });
    };

    $scope.checkIsFavOrBuy = function (checkBool){
        if(checkBool === false || checkBool === null){
            return false;
        } else {
            return true;
        }
    }

    $scope.isAdmin = function (){
        var retValue = false;
        try {
            var roles = $localStorage.userProfile.roles;
            retValue = roles.some(function (elem) {
                if (elem.name === "ROLE_ADMIN") {
                    return true;
                } else {
                    return false;
                }
            });
        } catch (e) {

        }
        return retValue;
    }

    $scope.deleteTour = function (id){
        $http.delete(contextPath + '/api/v1/trip/' + id +'/delete')
            .then(function (response) {
                $scope.getAllTrips();
            });
    }

    $scope.addToFavorite = function (tripId){
        $http.post(contextPath + '/api/v1/trip/favorites/' + tripId)
            .then(function (response) {
                $scope.getAllTrips();
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
                $scope.getAllTrips();
            });
    }

    $scope.redirect = function (location){
        window.location.href = location;
    }

    $scope.findFilters();

});