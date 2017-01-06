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
                // event.dataTransfer.set("Text", "this is payload info");
                event.originalEvent.dataTransfer.effectAllowed = "copy";
                event.originalEvent.dataTransfer.setData('test', index);
                scope.updates = "drag has just started"
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
                event.preventDefault();
                /*
                    dragover even keeps firing continiously hence
                    dont dont perform any css manipulation like below.
                    instead use dragenter which is fired just once.
                    elems.css("background", "yellow")

                 */
                return false;
            });
            elems.on("dragenter", function(event){
                elems.css("background", "yellow");
            });

            elems.on("dragleave", function(event){
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
                if (sourceIndex != targetIndex) {
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
