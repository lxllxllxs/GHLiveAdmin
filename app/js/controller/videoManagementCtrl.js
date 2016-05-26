/**
 * Created by m on 2016/5/25.
 */
angular.module('videoManagementModule',[])
.controller('videoManagementCtrl',function($scope,$state) {
    $scope.changeState = function (path) {
        $state.go(path);
    };
});