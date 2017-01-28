var app = angular.module("app", []);

app.controller("MainCtrl", function($scope){
    $scope.tester = "this means angular is working ...";
    $scope.message = [];
});

app.directive("outer", function(){
    return {
        scope: true,
        restrict: "A",
        transclude: true,
        template: "<h1> this is outer</h1> <ng-transclude><ng-transclude>",
        controller: function($scope) {
            $scope.message.push("outer controller executes")
            console.log("outer controller")
        },
        compile: function(elems, attrs, tfn) {
            console.log("outer compile");
            return {
                pre: function(scope, elems, attrs) {
                    scope.message.push("outer pre link executes")
                    console.log("outer pre")
                },
                post: function(scope, elems, attrs) {
                    scope.message.push("outer post link executes")
                    console.log("outer post")
                }
            }
        }
    }
});


app.directive("middle", function(){
    return {
        scope: true,
        restrict: "A",
        transclude: true,
        template: "<h1> this is middle </h1><ng-transclude><ng-transclude>",
        controller: function($scope) {
            $scope.message.push("middle controller executes")
            console.log("middle controller")
        },
        compile: function(elems, attrs, tfn) {
            return {
                pre: function(scope, elems, attrs) {
                    scope.message.push("middle pre link executes")
                    console.log("middle pre")
                },
                post: function(scope, elems, attrs) {
                    scope.message.push("middle post link executes")
                    console.log("middle post")
                }
            }
        }
    }
})

app.directive("inner", function(){
    return {
        scope: true,
        restrict: "A",
        template: "<h1> this is inner </h1>",
        controller: function($scope) {
            $scope.message.push("inner controller executes");
            console.log("inner controller")
        },
        compile: function(elems, attrs, tfn) {
            return {
                pre: function(scope, elems, attrs) {
                    scope.message.push("inner pre link executes");
                    console.log("inner pre")
                },
                post: function(scope, elems, attrs) {
                    scope.message.push("inner post link executes");
                    console.log("inner post")
                }
            }
        }
    }
})
