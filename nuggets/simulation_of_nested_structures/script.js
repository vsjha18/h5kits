var app = angular.module("app", []);

app.controller("MainCtrl", function($scope){
    $scope.tester = "this means angular is working ...";
    $scope.swapProject = function() {
        $scope.project = {
            "modules": [
                {
                    "name": "project after swapping"
                }
            ]
        }
    }
    $scope.project = {
        "modules": [
            {
                "name": "mod1.py",
                "blocks": [
                    {
                        "name": "block_11",
                        "steps": [
                            {
                                "name": "step 1"
                            },
                            {
                                "name": "step 2"
                            },
                            {
                                "name": "step 3"
                            }
                        ]
                    },
                    {
                        "name": "block_21",
                        "steps": [
                            {
                                "name": "step 1"
                            },
                            {
                                "name": "step 2"
                            }
                        ]
                    }
                ]
            },
            {
                "name": "mod2.py",
                "blocks": [
                    {
                        "name": "block 12",
                        "steps": [
                            {
                                "name": "step 1"
                            },
                            {
                                "name": "step 2"
                            },
                            {
                                "name": "step 3"
                            }
                        ]
                    }
                ]
            }
        ]

    }
});


app.directive("module", function(){
    return {
        restrict: "E",
        scope: false,
        templateUrl: "module",
        controllerAs: "moduleVm",
        controller: function($scope) {
            console.log("controller for module triggered ...")
            var self = this;
            self.addBlock = function() {
                self.module.blocks.push({
                    "name": "added from button"
                })
            }
        },
        link: function(scope, elems, attrs) {
            console.log("linker for module triggered ...")
            scope.moduleVm.index = attrs.index
            scope.moduleVm.module = scope.project.modules[attrs.index];
            scope.moduleVm.name = scope.moduleVm.module.name;
        }
    }
});

app.directive("block", function(){
    return {
        restrict: "E",
        scope: false,
        templateUrl: "block",
        controllerAs: "blockVm",
        "require": "^module",
        controller: function($scope) {
            console.log("controller for block triggered ...")
            var self = this;
            self.addBlock = function() {
                self.module.blocks.push({
                    "name": "added from button"
                })
            }
        },
        link: function(scope, elems, attrs, ctrl) {
            console.log("linker for block triggered ...")
            scope.blockVm.index = attrs.index;
            scope.blockVm.module = ctrl.module;
            scope.blockVm.block = scope.blockVm.module.blocks[scope.blockVm.index];
            scope.blockVm.name = scope.blockVm.block.name;
        }
    }
});
