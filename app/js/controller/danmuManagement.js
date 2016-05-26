/**
 * Created by m on 2016/5/25.
 */
angular.module('danmuManagementModule',[])
    .controller('danmuManagementCtrl',function($scope,$state) {
        $scope.changeState = function (path) {
            $state.go(path);
        };
    });