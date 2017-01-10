var app = angular.module("app", []);

app.controller("MainCtrl", function($scope){
    $scope.tester = "this means angular is working ...";

    $scope.isArray = function(a) {
        return Array.isArray(a);
    }
    
    $scope.persons = [
        {
            name: "tom",
            place: "toronto"
        },
        {
            name: "dick",
            place: "delhi"
        },
        {
            name: "harry",
            place: "hyderabad"
        },
        [
            {
                name: "amar",
                place: "agra"
            },
            [
                {
                    name: "gyan",
                    place: "darbhanga"
                },
                {
                    name: "chandan",
                    place: "btm layout"
                }
            ],
            {
                name: "akbar",
                place: "aurangabad"
            }
        ],
        {
            name: "vivek",
            place: "patna"
        }
    ]
});
