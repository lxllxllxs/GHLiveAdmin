/**
 * Created by m on 2016/5/30.
 */
angular.module('managementCommentModule', [])
    .controller('ManagementCommentCtrl', function ($scope, $stateParams,$state,$http) {

        $http.get(server+"/commentListGet?vid="+$stateParams.vid+"&commentedId=0&start="+0+"&limit="+1000)
            .success(function(response){
                console.log(response);
                $scope.comments=[];
                if (response.error_type == 0) {
                    var commentList = response.commentList;
                    total = response.total;
                    for (var i=0;i<commentList.length;i++) {
                        $scope.comments[i]={
                            index: i,
                            cid: commentList[i].cid,
                            commentedId:commentList[i].commentedId,
                            headImg:commentList[i].headImg,
                            message: commentList[i].message,
                            time: commentList[i].time.toString().split('T')[0]+" "+commentList[i].time.toString().split('T')[1],
                            uid:commentList[i].uid,
                            username: commentList[i].username,
                            vid:commentList[i].vid,
                            replys: []}
                    }
                }
            })
            .error(function(error){

            })

        var deleteItem =  function(cid){
            for (var i=0;i<$scope.comments.length;i++){
                if ($scope.comments[i].cid == cid) {
                    for (var j=i;j<$scope.comments.length-1;j++){
                        $scope.comments[j] = $scope.comments[j+1];
                    }
                    $scope.comments[$scope.comments.length-1] = null;
                    $scope.comments.length--;
                    break;
                }
            }
        }


        $scope.deleteComment = function(cid){
            console.log(cid);
            $http.get(server+"commentDelete?cid="+cid)
                .success(function(response){
                    if (response.error_code == 100) {
                        deleteItem(cid);
                        layer.msg("已删除！");
                    }
                })
                .error(function(error){

                })
        }

    });