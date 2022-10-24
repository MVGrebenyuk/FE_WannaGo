angular.module('WannaGo').controller('lkController', function ($scope, $rootScope, $http, $localStorage) {
    const contextPath = 'http://5.188.140.199:8189/wannago/api/v1';

    $scope.getCurrentUser = function (){
        if ($localStorage.springWebUser) {
            $http.defaults.headers.common.Authorization = 'Bearer ' + $localStorage.springWebUser.token;
        }
            $http.get(contextPath + '/user')
                .then(function successCallback(response) {
                    $scope.user = response.data;
                }, function errorCallback(response) {
                    alert("Зарегистрируйтесь")
                });
    }

    $scope.getTour = function (){
        if ($localStorage.springWebUser) {
            $http.defaults.headers.common.Authorization = 'Bearer ' + $localStorage.springWebUser.token;
        }
        $http.get(contextPath + '/trip/' + $localStorage.tripId)
            .then(function successCallback(response) {
                $scope.trip = response.data;
            }, function errorCallback(response) {
                alert("Не удалось получить тур")
            });
    }


    $scope.getCurrentUser();
});