var app = angular.module("app", []);

app.controller("MainCtrl", function($scope){
    $scope.address = {
        city: "bangalore",
        state: "karnataka",
        country: "india"
    }

    $scope.changeAddress = function() {
        if ($scope.address.city == "bangalore") {
            $scope.address = {
                city: "patna",
                state: "bihar",
                country: "india"
            }
        } else {
            $scope.address = {
                city: "bangalore",
                state: "karnataka",
                country: "india"
            }
        }
    }

    $scope.changeOneAttr = function() {
        $scope.address.country = "usa";
    }
});

app.directive("box", function(){
    return {
        // scope: true,
        restrict: "EA",
        template: [
            "City = {{ address.city }} <br>",
            "State = {{ address.state }} <br>",
            "Country = {{ address.country }} <br>"
        ],
        controller: function($scope) {
        },
        compile: function(elems, attrs, tfn) {
            return {
                pre: function(scope, elems, attrs) {


                },
                post: function(scope, elems, attrs) {
                    // this will not fire if the address changes in the
                    // parent scope or main controller scope.
                    // attrs.$observe("address", function(address){
                    //     if (address) {
                    //         scope.address = scope.$eval(address)
                    //         console.log('observe firing ...')
                    //     }
                    // });

                    // scope.$watch("address", function(address){
                    //     if (address) {
                    //         scope.address = scope.$eval(attrs.address)
                    //         console.log('watch firing ...')
                    //     }
                    // })

                    console.log(attrs)
                }
            }
        }
    }
});
