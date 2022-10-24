angular.module('WannaGo').controller('lkController', function ($scope, $rootScope, $http, $localStorage) {
    const contextPath = 'http://localhost:8189/wannago';

    $scope.getCurrentUser = function (){
        if ($localStorage.springWebUser) {
            $http.defaults.headers.common.Authorization = 'Bearer ' + $localStorage.springWebUser.token;

            $http.get(contextPath + '/api/v1/user')
                .then(function successCallback(response) {
                    $scope.user = response.data;
                }, function errorCallback(response) {

                });
        } else {
            window.location.href = './index.html'
        }
    }

    $scope.updateProfile = function (){
        var formData = new FormData();
        formData.append("file", document.getElementById("file-uploader").files[0]);

        var xhr = new XMLHttpRequest();
        xhr.open("POST", contextPath + "/api/v1/trip/image");
        xhr.send(formData);


        xhr.onload = function() {
            console.log(xhr.response)
            if (xhr.status != 200) { // анализируем HTTP-статус ответа, если статус не 200, то произошла ошибка
                $scope.updateProfileDto.avatar = $localStorage.userProfile.avatar;
                $http.post(contextPath + '/api/v1/profile/update', $scope.updateProfileDto)
                    .then(function successCallback(response) {

                    }, function errorCallback(response) {
                        alert("Ошибка при обновлении профиля")
                    });
            } else { // если всё прошло гладко, выводим результат
                $scope.updateProfileDto.avatar = xhr.response;
                $http.post(contextPath + '/api/v1/profile/update', $scope.updateProfileDto)
                    .then(function successCallback(response) {

                    }, function errorCallback(response) {
                        alert("Ошибка при обновлении профиля")
                    });
            }
        };
    }

    $scope.getCurrentUser();
});