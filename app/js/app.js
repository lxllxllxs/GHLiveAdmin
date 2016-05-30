'use strict';

// Declare app level module which depends on views, and components
var app = angular.module('admin-app', ['ngRoute', 'ngCookies', 'liveAdminModule', 'managementModule', 'managementVideoModule', 'managementCommentModule', 'managementDanmuModule', 'ui.router']);
app.config(function($stateProvider,$urlRouterProvider) {
    $stateProvider
        .state('liveAdmin',{
            url: '/liveAdmin',
            views: {
                'liveAdmin': {
                    templateUrl: 'template/liveAdmin.tpl.html',
                    controller: 'LiveAdminCtrl'
                }
            }
        })
        .state('management',{
            url:'/management',
            views:{
                'management': {
                    templateUrl: 'template/management.tpl.html',
                    controller: 'ManagementCtrl'
                }
            }
        })
        .state('management.video', {
            url: '/video:vid',
            views:{
                'management': {
                    templateUrl: 'template/management-video.tpl.html',
                    controller: 'ManagementVideoCtrl'
                }

            }
        })
        .state('management.video.comment', {
            url: "/comment",
            views:{
                'commentManagement':{
                    templateUrl: 'template/management-video-comment.tpl.html',
                    controller: 'ManagementCommentCtrl'
                }
            }
        })
        .state('management.video.danmu', {
            url: "/danmu",
            views:{
                'danmuManagement': {
                    templateUrl: 'template/management-video-danmu.tpl.html',
                    controller: 'ManagementDanmuCtrl'
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
