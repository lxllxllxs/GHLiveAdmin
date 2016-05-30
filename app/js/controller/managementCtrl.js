/**
 * Created by m on 2016/5/25.
 */
angular.module('managementModule',[])
    .controller('ManagementCtrl', function ($scope, $state) {
        $scope.changeState = function (path) {
            $state.go(path);
        };

        $scope.edit = function () {
            // Here we show off go's ability to navigate to a relative state. Using '^' to go upwards
            // and '.' to go down, you can navigate to any relative state (ancestor or descendant).
            // Here we are going down to the child state 'edit' (full name of 'contacts.detail.item.edit')
            $state.go('.edit');
        };

        $scope.deleteVideo = function (vid) {

        };


        $scope.videos = [
            {
                vid: "1",
                title: "测试人员的故事1",
                description: "lalalaaaaaaaaaaaaalaaa",
                formatTime: "2016年5月1日",
                coverImg: "img/test_video.png"
            },
            {
                vid: "2",
                title: "测试人员的故事2",
                description: "lalalaaaaaaaaaaaaalaaa",
                formatTime: "2016年5月1日",
                coverImg: "img/test_video.png"
            },
            {
                vid: "3",
                title: "测试人员的故事3",
                description: "lalalaaaaaaaaaaaaalaaa",
                formatTime: "2016年5月1日",
                coverImg: "img/test_video.png"
            },
            {
                vid: "4",
                title: "测试人员的故事4",
                description: "lalalaaaaaaaaaaaaalaaa",
                formatTime: "2016年5月1日",
                coverImg: "img/test_video.png"
            }
        ];
    });