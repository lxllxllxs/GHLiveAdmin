/**
 * Created by m on 2016/5/25.
 */
angular.module('managementModule',[])
    .controller('managementCtrl',function($scope,$state) {
        $scope.changeState = function (path) {
            $state.go(path);
        };
    });