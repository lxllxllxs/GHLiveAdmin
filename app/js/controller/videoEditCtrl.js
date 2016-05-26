/**
 * Created by m on 2016/5/26.
 */
angular.module('videoEditModule',[])
    .controller('videoEditCtrl',function($scope,$state,$stateParams) {
        $scope.video = $scope.videos[$stateParams.vid];
    });