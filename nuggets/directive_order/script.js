var app = angular.module("app", []);

app.controller("MainCtrl", function($scope){
    console.log("MAIN CONTROLLER");
    $scope.list = [1, 2];
});

app.directive("outer", function(){
    return {
        restrict: "EA",
        // transclude: true,
        template: '<div class="outer"><middle ng-repeat="l in list track by $index"></middle></div>',
        // template: '<div class="outer"><ng-transclude></ng-transclude></div>',
        controller: function($scope) {
            console.log("outer controller fired ...")
        },
        compile: function() {
            console.log("outer compile fired ...");
            return {
                pre: function(scope, iElems, a, c, tfn) {
                    console.log("outer pre link fired")
                },
                post: function(){
                    console.log("outer post link fired ..")
                }
            }
        }
    }
})

app.directive("middle", function(){
    return {
        restrict: "EA",
        // transclude: true,
        template: '<div class="middle"><inner ng-repeat="l in list track by $index"></inner></div>',
        // template: '<div class="middle"><ng-transclude></ng-transclude></div>',
        controller: function($scope) {
            console.log("middle controller fired ...")
        },
        compile: function() {
            console.log("middle compile fired ...");
            return {
                pre: function() {
                    console.log("middle pre link fired")
                },
                post: function(){
                    console.log("middle post link fired ..")
                }
            }
        }
    }
})

app.directive("inner", function(){
    return {
        restrict: "EA",
        template: '<div class="inner"></div>',
        controller: function($scope) {
            console.log("inner controller fired ...")
        },
        compile: function() {
            console.log("inner compile fired ...");
            return {
                pre: function() {
                    console.log("inner pre link fired")
                },
                post: function(){
                    console.log("inner post link fired ..")
                }
            }
        }
    }
})
