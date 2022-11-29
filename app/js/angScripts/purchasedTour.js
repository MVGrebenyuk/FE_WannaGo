angular.module('WannaGo').controller('purchasedTourPageController', function ($scope, $rootScope, $http, $localStorage) {
    const contextPath = localStorage.CONSTANTS;
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

    console.log('url = ' + localStorage.CONSTANTS)

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
        $http.get(contextPath + '/api/v1/trip/purchased/' + params['tourId'] + '/tour')
            .then(function successCallback(response) {
                if(response.data.isPurchared !== true){
                    window.location.href = './tour-page.html?tourId=' + params['tourId'];
                }
                $scope.trip = response.data;
                var div = document.getElementById('textDiv');
                var newDiv = document.createElement('div')
                newDiv.innerHTML = $scope.trip.description;
                div.insertAdjacentElement('afterbegin', newDiv)
            }, function errorCallback(response) {
                alert("Зарегистрируйтесь")
            });
    }

    $scope.redirectToAuthor = function (authorId){
        console.log(authorId);
        window.location = "./personal-area.html?id=" + authorId;
    }

    $scope.getCurrentUser();
    $scope.getTrip()
});