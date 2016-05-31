/**
 * Created by m on 2016/5/30.
 */
angular.module('managementVideoModule', [])
    .controller('ManagementVideoCtrl', function ($scope, $state, $stateParams) {
        $scope.video = $scope.videos[$stateParams.vid];
    });

function uploadCover() {
    $('#video-cover-file').trigger('click');
}

var head_changed_flag = false;
previewVideoCover = function () {
    var file = document.getElementById("video-cover-file").files[0];
    if (file) {
        if (file.type.substring(0, 5) == "image") {
            head_changed_flag = true;
            image_file = file;
            var reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = function (e) {
                var urlData = this.result;
                document.getElementById("video-cover-img").setAttribute("src", urlData);
            }
        }
        else {
            alert("不要调皮!封面只能是图片！");
        }
    }
};