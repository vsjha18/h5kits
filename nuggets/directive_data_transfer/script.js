var app = angular.module("app", []);

app.controller("MainCtrl", function($scope){
    $scope.tester = "this means angular is working ...";
    $scope.name = "vivek";
    $scope.address = {
        city: "bangalore",
        state: "karnataka",
        country: "india"
    }

    $scope.employee = {
        name: "vivek jha",
        id: 100,
        gender: "male"
    }
});

app.directive("box", function(){
    return {
        scope: true,
        restrict: "EA",
        template: [
            "Name = {{ name }} <br>",
            "City = {{ address.city }} <br>",
            "State = {{ address.state }} <br>",
            "Country = {{ address.country }} <br>",
            "<hr>",
            "employee = {{ employee}} <br>",
            "type of employee is: {{ typeEmployee }}"
        ],
        controller: function($scope) {
            // in this case address will be different in directive and main controller.
            $scope.address = {
                city: "patna",
                state: "bihar",
                country: "india"
            }

            // if you comment code above and write like this
            // $scope.address.state = "uttar pradesh"

            // in this case change will be updated to parent since we are simply
            // updating the object which was assigned in the main controller. And
            // as we know objects are passed by reference.

        },
        compile: function(elems, attrs, tfn) {
            return {
                pre: function(scope, elems, attrs) {


                },
                post: function(scope, elems, attrs) {
                    scope.employee = attrs.employee;
                    scope.typeEmployee = typeof scope.employee;
                }
            }
        }
    }
});
