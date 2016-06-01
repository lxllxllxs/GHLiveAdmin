/**
 * Created by m on 2016/5/30.
 */
angular.module('managementVideoModule', ['lr.upload'])
    .controller('ManagementVideoCtrl', function ($scope, $state, $stateParams,$http) {

        console.log("vid is "+$stateParams.vid);
        $http.get(server + "videoGet?vid="+$stateParams.vid)
            .success(function (response) {
                $scope.video = response.video;
                $scope.imgUploadData = {
                    vid:$scope.video.vid
                };
            }).error(function (error) {
            console.log(error);
        });


        $scope.saveChange = function(){
            $http.get(server + "videoUpdate?vid="+$stateParams.vid+"&title="+$scope.video.title+"&description="+$scope.video.description)
                .success(function (response) {
                    $scope.video = response.video;
                    layer.msg("保存成功！");

                }).error(function (error) {
                console.log(error);
            });
        }


        $scope.onFileUploadSuccess = function(response){
    	alert(JSON.stringify(response));
            response = response.data;
            if(response.error_type == 0){
                $scope.video = response.video;
            }else{
                alert('Something wrong!');
            }
        }

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