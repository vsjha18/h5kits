var app = angular.module("app", []);

app.controller("MainCtrl", function($scope){
    $scope.tester = "this means angular is working ...";
    $scope.bigBoxClick = function() {
        alert("big box is clicked ....")
    }

    $scope.smallBoxClick = function(e) {
        console.log(e)
        e.stopPropagation();
        alert("small box was cliked ...")
    }
});
