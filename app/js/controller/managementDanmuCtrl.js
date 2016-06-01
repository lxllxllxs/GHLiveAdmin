/**
 * Created by m on 2016/5/30.
 */
angular.module('managementDanmuModule', [])
    .controller('ManagementDanmuCtrl', function ($scope, $state,$stateParams,$http) {
        console.log($stateParams.vid)

        $http.get(server+"demooListGet?vid="+$stateParams.vid+"&time=0").success(function(response){
               console.log(response);
            var danmuList=[];
            for (var i=0;i<response.demooList.length;i++){
                var temp = {did:0,username:"",time:"",message:""};
                temp.did = response.demooList[i].did;
                temp.username = response.demooList[i].username;
                temp.time = response.demooList[i].time;

                var content =  JSON.parse(response.demooList[i].message);
                temp.message = content.text;
                danmuList[i] = temp;

            }
            $scope.danmus = danmuList;
            console.log(danmuList);

        }).error(function(error){

        })


       var deleteItem =  function(did){
           for (var i=0;i<$scope.danmus.length;i++){
               if ($scope.danmus[i].did == did) {
                   for (var j=i;j<$scope.danmus.length-1;j++){
                       $scope.danmus[j] = $scope.danmus[j+1];
                   }
                   $scope.danmus[$scope.danmus.length-1] = null;
                   $scope.danmus.length--;
                   break;
               }
           }
       }

       $scope.deleteDanmu = function(did){
           console.log(did);
           $http.get(server+"demooDelete?did="+did)
               .success(function(response){
                    if (response.error_code == 100) {
                        deleteItem(did);
                        layer.msg("已删除！");
                    }
               })
               .error(function(error){

               })

       }

    });