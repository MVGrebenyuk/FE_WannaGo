angular.module('WannaGo').controller('tourController', function ($scope, $rootScope, $http, $localStorage) {
    const contextPath = $rootScope.CONSTANTS;

    if ($localStorage.springWebUser) {
        $http.defaults.headers.common.Authorization = 'Bearer ' + $localStorage.springWebUser.token;
    }

    $scope.getAllTrips = function (){
      $http.post(contextPath + '/api/v1/trip/get', $scope.filter)
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
        var roles = $localStorage.userProfile.roles;
       if(roles.name === 'ROLE_ADMIN'){
           return true
       } else {
           return false;
       }
    }

    $scope.deleteTour = function (id){
        $http.delete(contextPath + '/api/v1/trip/' + id +'/delete')
            .then(function (response) {
                window.location.reload();
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
    $scope.getAllTrips();

});