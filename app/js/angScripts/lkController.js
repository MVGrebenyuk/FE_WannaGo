angular.module('WannaGo').controller('lkController', function ($scope, $rootScope, $http, $localStorage) {
    const contextPath = $rootScope.CONSTANTS;

    if ($localStorage.springWebUser) {
        $http.defaults.headers.common.Authorization = 'Bearer ' + $localStorage.springWebUser.token;
    }

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

    $scope.getCurrentUser = function (){
        if(params['id'] == null) {
            if ($localStorage.springWebUser) {
                $http.defaults.headers.common.Authorization = 'Bearer ' + $localStorage.springWebUser.token;

                $http.get(contextPath + '/api/v1/user')
                    .then(function successCallback(response) {
                        $scope.user = response.data;
                        $localStorage.userProfile = response.data;
                    }, function errorCallback(response) {

                    });
            }
        } else {
            $http.get(contextPath + '/api/v1/user/' + params['id'])
                .then(function successCallback(response) {
                    $scope.user = response.data;
                }, function errorCallback(response) {

                });
        }
    }

    $scope.isCurrentUser = function (userId){
        if(userId == $localStorage.userProfile.id){
            return true;
        } else {
            return false;
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
                    console.log($scope.updateProfileDto)
                    alert($scope.updateProfileDto)
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
                    console.log($scope.updateProfileDto)
                    alert($scope.updateProfileDto)
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
        if(params['id'] == null) {
            $http.get(contextPath + '/api/v1/trip/' + $localStorage.userProfile.id + '/author')
                .then(function (response) {
                    $scope.trips = response.data;
                });
        } else {
            $http.get(contextPath + '/api/v1/trip/' + params['id'] + '/author')
                .then(function (response) {
                    $scope.trips = response.data;
                });
        }
    };

    $scope.getCurrentUser();
    if($localStorage.userProfile) {
        $scope.getAllTrips()
    }
});