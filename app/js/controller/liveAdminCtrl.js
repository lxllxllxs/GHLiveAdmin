/**
 * Created by HF Q on 2016/5/20.
 */
var server = window.localStorage ? localStorage.getItem("serverAddress") : Cookie.read("serverAddress");
//http://a.hiphotos.baidu.com/baike/w%3D268%3Bg%3D0/sign=2e0420d8a96eddc426e7b3fd01e0d1c0/3bf33a87e950352ae6ac2b355743fbf2b2118b39.jpg
angular.module('liveAdminModule', [])
.controller('LiveAdminCtrl',['$scope','$http','$interval',function($scope,$http,$interval){
    var file;
    $scope.selectFile = function(){
        file=document.getElementById('file').files[0];
    }

    $scope.fileSelected = function(){
        console.log("dd");
        if(file){
            if(file.type.substring(0,5)=="image"){
                head_changed_flag=true;
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
        var title = $scope.title;
        var description = $scope.description;
        console.log(title+" "+description);
        $scope.key = "key获取中...";
        $http.post(server+'liveStart',
            {
                title:title,
                description:description,
                coverImg:file
            },
            {
                headers: { 'Content-Type': 'multipart/form-data; charset=UTF-8'},
                transformRequest:function(data){
                    return $.param(data);
                }
            })
            .success(function(response){
                //alert(JSON.stringify(response));
                $scope.key = response.key;
            });
    }

    $scope.copy = function(){
        layer.msg("已复制至剪切板");
    }

}])