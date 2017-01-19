var app = angular.module("app", []);

app.controller("MainCtrl", function($scope){
    $scope.tester = "this means angular is working ...";
    $scope.message = [];
    $scope.name = "name set in main controller"
});

app.directive("outer", function(){
    return {
        scope: true,
        restrict: "A",
        transclude: true,
        template: "<h1> this is outer </h1> name = {{name}}<br> city = {{city }}; to check if this is available in transcluded boxes<ng-transclude><ng-transclude>",
        controller: function($scope) {
            $scope.outerVar = "this is set in outer"
            $scope.message.push("outer controller executes")
            console.log("outer controller")
            $scope.name = "outer controller overrides but no impact on main"
            $scope.city = "bangalore"
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
        template: "<h1> this is middle </h1> name = {{ name }}<br> city = {{ city }}<ng-transclude><ng-transclude>",
        controller: function($scope) {
            $scope.message.push("middle controller executes")
            console.log("middle compile")
            $scope.name = "name set in middle but not impact on outer"
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
        template: "<h1> this is inner</h1> name = {{ name }}<br> city = {{ city}}",
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
