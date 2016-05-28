/**
 * Created by HF Q on 2016/5/20.
 */
var server = window.localStorage ? localStorage.getItem("serverAddress") : Cookie.read("serverAddress");
var clipboardData = window.clipboardData;
angular.module('liveAdminModule',[])
.controller('LiveAdminCtrl',['$scope','$http','$interval',function($scope,$http,$interval){
    var file;

    $scope.fileSelected = function(){
        console.log("dd");
        file=document.getElementById('file').files[0];
        if(file){
            console.log("ee");
            if(file.type.substring(0,5)=="image"){
                image_file=file;
                var reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = function (e) {
                    var urlData = this.result;
                    document.getElementById("converImg").setAttribute("src",urlData);
                }
            }
            else{
                layer.msg("只能上传图片...年轻人不要调皮！");
            }
        }
    }


    $scope.confirm = function(){
        var coverImg = file;
        var title = $scope.title;
        var description = $scope.description;
        console.log(title+" "+description);
        if (coverImg == undefined) {
            layer.msg("请上传封面图片！");
            return;
        }
        if (!(coverImg.type.substring(0,5)=="image")) {
            layer.msg("只能选择图片作为封面图！");
            return;
        }
        if (title == "" || description=="" || title == undefined || description == undefined){
            layer.msg("请填写直播间标题和简介！");
            return;
        }
        $scope.key = "key获取中...";

        var formData = new FormData();
        formData.append("coverImg",coverImg);
        formData.append("title",title);
        formData.append("description",description);

        $.ajax({
            url: server+"liveStart" ,
            type: 'POST',
            data: formData,
            async: false,
            cache: false,
            contentType: 'multipart/form-data; charset=UTF-8',
            processData: false,
            success: function (response) {
                console.log(response);
                $scope.key = response.key;
            },
            error: function (error) {
                alert(error);
            }
        });

    }


}])