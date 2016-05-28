'use strict';

// Declare app level module which depends on views, and components
var app = angular.module('admin-app', ['ngRoute', 'ngCookies', 'liveAdminModule','managementModule','videoManagementModule','danmuManagementModule','commentManagementModule','videoEditModule','ui.router']);
// app.config(['$routeProvider', function ($routeProvider) {
//
//     $routeProvider
//         .when('/app/liveAdmin', {
//             templateUrl: "template/liveAdmin.tpl.html",
//             controller: "LiveAdminCtrl"
//         })
//         .when('/app/management', {
//             templateUrl: "template/management.tpl.html",
//             controller: "managementCtrl"
//         })
//         .when('/app/management/videoManagement', {
//             templateUrl: "template/videoManagement.tpl.html",
//             controller: "videoManagementCtrl"
//         })
//         .otherwise({redirectTo: '/app/liveAdmin'});
// }]);

app.config(function($stateProvider,$urlRouterProvider) {
    $stateProvider
        .state('liveAdmin',{
            url: '/liveAdmin',
            templateUrl: 'template/liveAdmin.tpl.html',
            controller:'LiveAdminCtrl'
        })
        .state('management',{
            url:'/management',
            abstract:true,
            templateUrl:'template/management.tpl.html',
            controller: 'managementCtrl'
        })
        .state('management.video',{
            url:'/video',
            views:{
                'videoManagement':{
                    templateUrl:'template/videoManagement.tpl.html',
                    controller:'videoManagementCtrl'
                }
            }
        })
        .state('management.danmu',{
            url:'/danmu',
            views:{
                'danmuManagement':{
                    templateUrl:'template/danmuManagement.tpl.html',
                    controller:'videoManagementCtrl'
                }
            }
        })
        .state('management.comment',{
            url:'/comment',
            views:{
                'commentManagement':{
                    templateUrl:'template/commentManagement.tpl.html',
                    controller:'commentManagementCtrl'
                }
            }
        })
        .state('management.video.edit',{
            url: '/edit:vid',
            views:{
                'videoManagement':{
                    templateUrl:'template/videoEdit.tpl.html',
                    controller:'videoEditCtrl'
                }
            }
        });
    $urlRouterProvider.otherwise('liveAdmin');
});


app.run(['$rootScope', '$http', '$cookies', function ($rootScope, $http, $cookies) {
    $rootScope.isLogin = false;
    $http.defaults.headers.post['X-CSRFToken'] = $cookies.csrftoken;
//    var server = "http://192.168.1.122:8080/GuangHuaLive/";
    var server = "http://localhost:8080/GuangHuaLive/";
    if (window.localStorage) {
        console.log("localStorage ", server);
        localStorage.clear();
        localStorage.setItem("serverAddress", server);
    } else {
        console.log("cookie");
        Cookie.write("serverAddress", server);
    }

    layer.ready(function () {

    });

}]);
app.provider('myCSRF', [function () {
    var headerName = 'X-CSRFToken';
    var cookieName = 'csrftoken';
    var allowedMethods = ['GET'];

    this.setHeaderName = function (n) {
        headerName = n;
    }
    this.setCookieName = function (n) {
        cookieName = n;
    }
    this.setAllowedMethods = function (n) {
        allowedMethods = n;
    }
    this.$get = ['$cookies', function ($cookies) {
        return {
            'request': function (config) {
                if (allowedMethods.indexOf(config.method) === -1) {
                    // do something on success
                    config.headers[headerName] = $cookies[cookieName];
                }
                return config;
            }
        }
    }];
}]).config(function ($httpProvider) {
    $httpProvider.interceptors.push('myCSRF');
});
