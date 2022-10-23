angular.module('WannaGo').controller('tourPageController', function ($scope, $rootScope, $http, $localStorage) {
    const contextPath = 'http://localhost:8189/wannago/api/v1';

    var params = window
        .location
        .search
        .replace('?','')
        .split('&')
        .reduce(
            function(p,e){
                var a = e.split('=');
                p[ decodeURIComponent(a[0])] = decodeURIComponent(a[1]);
                return p;
            },
            {}
        );

    $scope.tryToAuth = function () {
        $http.post('http://localhost:8189/wannago/auth', $scope.user)
            .then(function successCallback(response) {
                if (response.data.token) {
                    $http.defaults.headers.common.Authorization = 'Bearer ' + response.data.token;
                    $localStorage.springWebUser = {username: $scope.user.login, token: response.data.token};

                    $scope.user.login = null;
                    $scope.user.password = null;
                }
            }, function errorCallback(response) {

            });
    }

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

    $scope.getTrip = function (){
        if ($localStorage.springWebUser) {
            $http.defaults.headers.common.Authorization = 'Bearer ' + $localStorage.springWebUser.token;
        }
        $http.get(contextPath + '/trip/' + params['tourId'])
            .then(function successCallback(response) {
                $scope.trip = response.data;
                var div = document.getElementById('textDiv');
                var newDiv = document.createElement('div')
                newDiv.innerHTML = $scope.trip.description;
                div.insertAdjacentElement('afterbegin', newDiv)
            }, function errorCallback(response) {
                alert("Зарегистрируйтесь")
            });
    }


    $scope.getCurrentUser();
    $scope.getTrip()

});