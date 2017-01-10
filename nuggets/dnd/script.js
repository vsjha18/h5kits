var app = angular.module("app", []);

app.controller("MainCtrl", function($scope) {
    $scope.tester = "this means angular is working ...";
    $scope.peoples = [
        {
            name: "tom",
            city: "toronto"
        }, {
            name: "dick",
            city: "delhi"
        }, {
            name: "harry",
            city: "hyderabad"
        }
    ]

    $scope.updates = "no updates"
});


app.directive("dndDrag", function(){
    return {
        restrict: "A",
        scope: false,
        link: function(scope, elems, attrs) {
            var index = attrs.dndIndex;
            elems.on("dragstart", function(event){
                var data = scope.$eval(attrs.dndDrag);
                elems.css("border", "1px dashed black");
                // effectAllowed is for browser to show some default animation
                // you still need to implement the copy/move effect.
                event.originalEvent.dataTransfer.effectAllowed = "copy";
                /* for set setData 'test' can be anything for example
                text/html etc. Make sure to use same key to retreive the
                value. Also multiple payload with different keys can be taken
                */
                event.originalEvent.dataTransfer.setData('test', index);
                /* apply is necessay here becuase this function will execute
                after the directive has instantiated. hence angular needs to
                be explicitly told about any dom or data changes
                */

                scope.$apply()
            });

            elems.on("dragend", function(event) {
                elems.css("border", "1px solid black");
            })

            elems.on("")
        }
    }
})

app.directive("dndTarget", function(){
    return {
        restrict:"A",
        scope: true,
        link: function(scope, elems, attrs) {
            var mainList = scope.$eval(attrs.dndIter);
            elems.on("dragover", function(event) {
                /*
                    dragover even keeps firing continiously hence
                    dont dont perform any css manipulation like below.
                    instead use dragenter which is fired just once.
                    elems.css("background", "yellow")

                 */
                event.preventDefault();
                return false;
            });
            elems.on("dragenter", function(event){
                /*
                    difficult to use with list data, since they are side
                    by side.
                */
                elems.css("background", "yellow");
            });

            elems.on("dragleave", function(event){
                /*
                    difficult to use with list data, since they are side
                    by side.
                */
                elems.css("background", "white");
            });

            elems.on("drop", function(event){
                event.preventDefault();
                event.stopPropagation();
                var sourceIndex = event.originalEvent.dataTransfer.getData('test')

                // we now have to perform index swapping
                // mainList.splice(0, 1)

                // some code to look for drop target
                var targetIndex = event.target.getAttribute("dnd-index");
                console.log("source index: " + sourceIndex)
                console.log("target index: " + targetIndex)
                console.log("this is target dom:", event.target)
                if ((sourceIndex != targetIndex) && targetIndex != null) {
                    var temp = mainList[targetIndex]
                    mainList.splice(targetIndex, 1, mainList[sourceIndex]);
                    mainList[sourceIndex] = temp;
                    // mainList.splice(targetIndex, 1, mainList[sourceIndex]);
                    // mainList.splice(sourceIndex - 1, 1)
                    scope.$apply();
                }

                return false;
            })
        }
    }
})
