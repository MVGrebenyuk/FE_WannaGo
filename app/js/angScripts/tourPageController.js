angular.module('WannaGo').controller('tourPageController', function ($scope, $rootScope, $http, $localStorage) {
    const contextPath = $rootScope.CONSTANTS;

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
        $http.post(contextPath + '/auth', $scope.user)
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

            $http.get(contextPath + '/api/v1/user')
                .then(function successCallback(response) {
                    $scope.user = response.data;
                }, function errorCallback(response) {

                });
        }
    }

    $scope.getTrip = function (){
        if ($localStorage.springWebUser) {
            $http.defaults.headers.common.Authorization = 'Bearer ' + $localStorage.springWebUser.token;
        }
        $http.get(contextPath + '/api/v1/trip/' + params['tourId'])
            .then(function successCallback(response) {
                console.log(response.data)
                if(response.data.isPurchared === true){
                    window.location.href = "./touring-buy.html?tourId=" + params['tourId'];
                }
                $scope.trip = response.data;
                var div = document.getElementById('textDiv');
                var newDiv = document.createElement('div')
                newDiv.innerHTML = $scope.trip.shortTitle;
                div.insertAdjacentElement('afterbegin', newDiv)
            }, function errorCallback(response) {
                alert("Зарегистрируйтесь")
            });
    }

    $scope.redirect = function (authorId){
        console.log(authorId);
        window.location = "./personal-area.html?id=" + authorId;
    }

    $scope.getCurrentUser();
    $scope.getTrip()
});