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
            },
            [
                {
                    name: "pinky",
                    place: "madhubany"
                }
            ]
        ],
        {
            name: "vivek",
            place: "patna"
        }
    ]
});



app.directive("draggable", function($rootScope) {
    return {
        link: function(scope, elements, attrs) {
            console.log("instantiated draggable ...")
            // make draggable true.
            elements.attr("draggable", true);
            // add a class draggable for styling
            elements.addClass("draggable");

            elements.on("dragstart", function(event){
                console.log("dragstart triggered ....")
                var parent = angular.element(this.parentNode);
                var parentScope = parent.scope();

                $rootScope.dndOperation = {};
                $rootScope.dndOperation = {
                    sourceList: parent.scope(),
                    sourceIndex: attrs.index
                }
                elements.css({
                    "opacity": "0.2",
                    "background": "cyan"
                });
                var txData = scope.$eval(attrs.draggable);
                event.originalEvent.dataTransfer.setData("text", JSON.stringify(txData))
            });

            elements.on("dragend", function(event){
                console.log("dragend triggered ....")
                elements.css({
                    "opacity": "1",
                    "background": "white"
                });
            });
        }
    }
})


app.directive("dndList", function($parse, $rootScope){
    return function(scope, elements, attrs) {
        console.log("instantiated dndList ...")
        var dndList = scope.$eval(attrs.dndList);
        var index = scope.$eval(attrs.index)
        elements.on("dragover", function(event){
            /*
                in order for drop event to trigger we must cancel the
                dragover and dragenter events

            */
            elements.css("border", "5px dashed black")
            event.preventDefault();
            return false;
        });

        elements.on("dragend", function(event){
            console.log("dragend triggered in dropzone handler ...")
            elements.css("border", "none")
        });

        elements.on("drop", function(event){
            console.log("second drop triggered .....")
            event.preventDefault();
            event.stopPropagation();
            var parent = angular.element(event.target.parentNode);
            var parentScope = parent.scope()
            console.log(JSON.stringify(dndList));
            // calculate target index;
            // convert from string to object
            var rxData = angular.fromJson(event.originalEvent.dataTransfer.getData("text"))
            dndList.splice(index, 0, rxData)
            scope.$apply()
            console.log($rootScope.dndOperation)
            // console.log(JSON.stringify(rxData))
            return false;
        });
    }
})
