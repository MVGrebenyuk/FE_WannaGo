angular.module('WannaGo').controller('lkController', function ($scope, $rootScope, $http, $localStorage) {
    const contextPath = 'http://5.188.140.199:8189/wannago';

    $scope.getCurrentUser = function (){
        if ($localStorage.springWebUser) {
            $http.defaults.headers.common.Authorization = 'Bearer ' + $localStorage.springWebUser.token;

            $http.get(contextPath + '/api/v1/user')
                .then(function successCallback(response) {
                    $scope.user = response.data;
                    $localStorage.userProfile = response.data;
                }, function errorCallback(response) {

                });
        }
    }

    $scope.getCurrentUserForRegister = function (){
        if ($localStorage.springWebUser) {
            $http.defaults.headers.common.Authorization = 'Bearer ' + $localStorage.springWebUser.token;

            $http.get(contextPath + '/api/v1/user')
                .then(function successCallback(response) {
                    $scope.user = response.data;
                    $localStorage.userProfile = response.data;
                    $scope.getAllTrips()
                    window.location.href = './personal-area.html'
                }, function errorCallback(response) {

                });
        }
    }

    $scope.updateProfile = function (){
        if(document.getElementById("file-uploader").files[0]){
            var formData = new FormData();
            formData.append("file", document.getElementById("file-uploader").files[0]);

            var xhr = new XMLHttpRequest();
            xhr.open("POST", contextPath + "/api/v1/trip/image");
            xhr.send(formData);


            xhr.timeout = 3000;
            xhr.onload = function() {
                console.log(xhr.response)
                if (xhr.status != 200) { // если фото не загрузилось
                    $scope.updateProfileDto.avatar = $localStorage.userProfile.avatar;
                    $http.post(contextPath + '/api/v1/profile/update', $scope.updateProfileDto)
                        .then(function successCallback(response) {
                            delete $localStorage.userProfile;
                            $scope.getCurrentUserForRegister();
                        }, function errorCallback(response) {
                            alert("Ошибка при обновлении профиля")
                        });
                } else { // если фото загрузилось
                    if($scope.updateProfileDto){
                        $scope.updateProfileDto.avatar = xhr.response;
                    } else {
                        $scope.updateProfileDto = {}
                        $scope.updateProfileDto.avatar = xhr.response;
                    }
                    $http.post(contextPath + '/api/v1/profile/update', $scope.updateProfileDto)
                        .then(function successCallback(response) {
                            delete $localStorage.userProfile;
                            $scope.getCurrentUserForRegister();
                        }, function errorCallback(response) {
                            alert("Ошибка при обновлении профиля")
                        });
                }
            };
        } else {
            $scope.updateProfileDto.avatar = $localStorage.userProfile.avatar;
            $http.post(contextPath + '/api/v1/profile/update', $scope.updateProfileDto)
                .then(function successCallback(response) {
                    delete $localStorage.userProfile;
                    $scope.getCurrentUserForRegister();
                }, function errorCallback(response) {
                    alert("Ошибка при обновлении профиля")
                });
        }
    }

    $scope.getAllTrips = function (){
        $http.get(contextPath + '/api/v1/trip/' + $localStorage.userProfile.id + '/author')
            .then(function (response) {
                $scope.trips = response.data;
            });
    };

    $scope.getCurrentUser();
    if($localStorage.userProfile) {
        $scope.getAllTrips()
    }
});