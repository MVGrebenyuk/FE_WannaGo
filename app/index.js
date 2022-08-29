(function () {
    angular
        .module('WannaGo', ['ngRoute', 'ngStorage'])
        .config(config)
        .run(run);

    function config($routeProvider) {
        $routeProvider
            .when('/wannago', {
                templateUrl: 'index.html',
                controller: 'mainController'
            })
            .when('/wannago', {
                templateUrl: 'tour-list.html',
                controller: 'mainController'
            })
            .otherwise({
                redirectTo: '/wannago'
            });
    }

    function run($rootScope, $http, $localStorage) {
        if ($localStorage.springWebUser) {
            $http.defaults.headers.common.Authorization = 'Bearer ' + $localStorage.springWebUser.token;
        }
    }
})();

angular.module('WannaGo').controller('mainController', function ($scope, $rootScope, $http, $localStorage) {
    const contextPath = 'http://localhost:8189/wannago/api/v1';

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

    $scope.tryToRegistration = function () {
        $http.post('http://localhost:8189/wannago/registration', $scope.user)
            .then(function successCallback(response) {
                if (response.data.token) {
                    $http.defaults.headers.common.Authorization = 'Bearer ' + response.data.token;
                    $localStorage.springWebUser = {username: $scope.user.login, token: response.data.token};

                    $scope.user.login = null;
                    $scope.user.password = null;
                }
            }, function errorCallback(response) {

            });
    };

    $scope.tryToLogout = function () {
        $scope.clearUser();
        if ($scope.user.login) {
            $scope.user.login = null;
        }
        if ($scope.user.password) {
            $scope.user.password = null;
        }
    };

    $scope.saveImage = function (){
        var image = $scope.myFile.file;
        alert($scope.myFile.file)
        $http.post("http://localhost:8189/wannago/addAvatar", image)
            .then(function successCallback(response) {
                alert(response);
        })
    };

    $scope.clearUser = function () {
        delete $localStorage.springWebUser;
        delete $localStorage.cartName;
        $http.defaults.headers.common.Authorization = '';
        $localStorage.cartName = null;
    };

    $rootScope.isUserLoggedIn = function () {
        if ($localStorage.springWebUser) {
            return true;
        } else {
            return false;
        }
    };

    $scope.showCurrentUserInfo = function () {
        $http.get('http://localhost:8189/wannago/api/v1/profile')
            .then(function successCallback(response) {
                alert('MY NAME IS: ' + response.data.username);
            }, function errorCallback(response) {
                alert('UNAUTHORIZED');
            });
    }
});