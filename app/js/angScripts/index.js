(function () {
    angular
        .module('WannaGo', ['ngRoute', 'ngStorage'])
        .config(config)
        .run(run);

    function config($routeProvider) {
        $routeProvider
            .when('/wannago', {
                templateUrl: '../../index.html',
                controller: 'mainController'
            })
            .when('/personal', {
                templateUrl: '../../personal-area.html',
                controller: 'lkController'
            })
            .otherwise({
                redirectTo: '/'
            });
    }

    function run($rootScope, $http, $localStorage) {
        if ($localStorage.springWebUser) {
            $http.defaults.headers.common.Authorization = 'Bearer ' + $localStorage.springWebUser.token;
        }
    }
})();

angular.module('WannaGo').controller('mainController', function ($scope, $rootScope, $http, $localStorage) {
    const contextPath = 'http://5.188.140.199:8189/wannago';

    $scope.tryToAuth = function () {
        $http.post(contextPath + '/auth', $scope.user)
            .then(function successCallback(response) {
                if (response.data.token) {
                    $http.defaults.headers.common.Authorization = 'Bearer ' + response.data.token;
                    $localStorage.springWebUser = {username: $scope.user.login, token: response.data.token};
                    $scope.user.login = null;
                    $scope.user.password = null;

                    $scope.getCurrentUser()
                }
            }, function errorCallback(response) {
            });
    }

    $scope.tryToAuthForReg = function () {
        $http.post(contextPath + '/auth', $scope.user)
            .then(function successCallback(response) {
                if (response.data.token) {
                    $http.defaults.headers.common.Authorization = 'Bearer ' + response.data.token;
                    $localStorage.springWebUser = {username: $scope.user.login, token: response.data.token};
                    $scope.user.login = null;
                    $scope.user.password = null;
                    window.location.href = './personal-account.html'
                    $scope.getCurrentUser()
                }
            }, function errorCallback(response) {
            });
    }

    $scope.registration = function (){
        $http.post(contextPath + '/api/v1/profile/register', $scope.registrationDto)
            .then(function successCallback(response) {
               $scope.user = {login: $scope.registrationDto.login, password : $scope.registrationDto.password};
               $scope.tryToAuthForReg();
            }, function errorCallback(response) {
                alert("Ошибка при регистрации")
            });
    }

    $scope.tryToRegistration = function () {
        $http.post(contextPath + '/api/v1/registration', $scope.user)
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
        window.location.href = './index.html';
    };

    $scope.clearUser = function () {
        delete $localStorage.springWebUser;
        delete $localStorage.cartName;
        delete $localStorage.userProfile;
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
        $http.get(contextPath + '/api/v1/profile')
            .then(function successCallback(response) {
                alert('MY NAME IS: ' + response.data.username);
            }, function errorCallback(response) {
                alert('UNAUTHORIZED');
            });
    }

    $scope.simpleTest = function () {
            var formData = new FormData();
            formData.append("file", document.getElementById("file-uploader").files[0]);

            var xhr = new XMLHttpRequest();
            xhr.open("POST", contextPath + '/api/v1/trip/image');
            xhr.send(formData);

        xhr.onload = function() {
            console.log(xhr.response)
            if (xhr.status != 200) { // анализируем HTTP-статус ответа, если статус не 200, то произошла ошибка
                alert(`Ошибка ${xhr.status}: ${xhr.statusText}`); // Например, 404: Not Found
            } else { // если всё прошло гладко, выводим результат
                $scope.trip.description = tinyMCE.activeEditor.getContent();
                $scope.trip.image = xhr.response;
                    $http.post(contextPath + '/api/v1/trip', $scope.trip)
                        .then(function successCallback(response) {
                            alert('Trip created ' + response.data.username);
                        }, function errorCallback(response) {
                            alert('Trip not created');
                        });
            }
        };
    }

    $scope.getCurrentUser = function (){
            $http.get(contextPath + '/api/v1/user')
                .then(function successCallback(response) {
                    $localStorage.userProfile = response.data;
                    $scope.profile = response.data;
                }, function errorCallback(response) {

                });
    }


    $scope.closeModalWindow = function () {
        console.log($rootScope.isUserLoggedIn == false);
        if ($rootScope.isUserLoggedIn == true) {
            $("#myModal").modal("show");
        } else {
            $("#myModal").modal("hide");
        }
    }

    if($localStorage.userProfile){
        $scope.profile =  $localStorage.userProfile;
    } else {
        $scope.getCurrentUser();
    }
});