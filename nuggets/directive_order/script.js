var app = angular.module("app", []);

app.controller("MainCtrl", function($scope){
    console.log("MAIN CONTROLLER");
});

app.directive("outer", function(){
    return {
        restrict: "EA",
        template: '<div class="outer"><middle></middle><middle></middle></div>',
        controller: function($scope) {
            console.log("outer controller fired ...")
        },
        compile: function() {
            console.log("outer compile fired ...");
            return {
                pre: function() {
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
        template: '<div class="middle"><inner></inner></div>',
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
