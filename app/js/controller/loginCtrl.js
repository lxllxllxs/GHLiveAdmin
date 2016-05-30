/**
 * Created by HF Q on 2016/4/14.
 */
var server = window.localStorage ? localStorage.getItem("serverAddress") : Cookie.read("serverAddress");
angular.module('loginModule', [])
    .controller('LoginCtrl', ['$scope', '$state', '$rootScope', '$http', '$cookieStore', '$cookies', function ($scope,$state, $rootScope, $http, $cookieStore, $cookies) {
        console.log(server);
        //$http.get(server+"userStatusGet")
	     //   .success(function(response){
	     //       if (response.error_type == 0) {
	     //          // $location.path('/app/main');
	     //       } else {
	     //
	     //       }
	     //   })
	     //   .error(function(error){
        //
	     //   })
	        


        $scope.signIn = function () {

            var username = $scope.inputUsername;
            var password = $scope.inputPassword;
            if (username == null || username == "") {
                layer.msg("用户名不能为空");
                return;
            }
            if (password == null || password == "") {
                layer.msg("密码不能为空");
                return;
            }


            $http.post(server + "userLogin",
                {
                    username: username,
                    password: password
                },
                {
                    headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
                    transformRequest: function (data) {
                        return $.param(data);
                    }
                })
                .success(function (response) {
                    console.log(response);
                    if (response.error_type == 0) {
                        //alert(JSON.stringify(response.user));
                        sessionStorage.setItem('user', JSON.stringify(response.user));
                        $rootScope.isLogin = true;
                        if (window.localStorage) {
                            console.log("localStorage ", "login");
                            localStorage.setItem("isLogin", "login");
                            localStorage.setItem("username", response.user.username);
                        } else {
                            console.log("cookie");
                            Cookie.write("isLogin", "login");
                            Cookie.write("username", response.user.username);
                        }
                        document.getElementById('upName').innerHTML = response.user.username;
                        $state.go('liveAdmin');
                    }
                })
                .error(function (error) {
                    console.log(error)
                })

        }


    }]);