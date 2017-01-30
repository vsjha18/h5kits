# case 1: Nested directive without transclusion.

code in the view

```html
<outer></outer>
```

*above outer directive contains middle and middle contains inner*

this is the order:
```
outer compile fired ...
middle compile fired ...
inner compile fired ...

MAIN CONTROLLER

outer controller fired ...
outer pre link fired
middle controller fired ...
middle pre link fired
inner controller fired ...
inner pre link fired

inner post link fired ..
middle post link fired ..
outer post link fired ..
```

# case 2: With siblings

In this case the code is same as above but the outer template looks like this. And
as usual middle contains the inner.

```html
<div class="outer">
    <middle></middle>
    <middle></middle>
</div>
```

```
outer compile fired ...
middle compile fired ...
inner compile fired ...
middle compile fired ...
inner compile fired ...

MAIN CONTROLLER

outer controller fired ...

outer pre link fired
middle controller fired ...
middle pre link fired
inner controller fired ...
inner pre link fired

inner post link fired ..
middle post link fired ..

middle controller fired ...
middle pre link fired
inner controller fired ...
inner pre link fired

inner post link fired ..
middle post link fired ..

outer post link fired ..
```

> From the above two example it seems that angular instantiates the directives
> as they appear in the template. It's a tree like parsing with the depth first
> approach.

# case 3: With ng-repeat in the template

This is the template of the `outer` used in this example

```html
<div class="outer">
    <middle ng-repeat="l in list track by $index"></middle>
</div>
```

also the controller has this code

```javascript
app.controller("MainCtrl", function($scope){
    console.log("MAIN CONTROLLER");
    $scope.list = [1, 2];
});
```

above code is just make the iteration possible.

```
outer compile fired ...

MAIN CONTROLLER

outer controller fired ...
outer pre link fired
outer post link fired ..

middle compile fired ...
inner compile fired ...

middle controller fired ...
middle pre link fired
inner controller fired ...
inner pre link fired

inner post link fired ..
middle post link fired ..

middle controller fired ...
middle pre link fired
inner controller fired ...
inner pre link fired

inner post link fired ..
middle post link fired ..
```

difficult to explain above observation. At least it is not where documented on the web.

[Ref 1](http://stackoverflow.com/questions/16113647/ngrepeat-and-directives-execution-order)  
[Ref 2](http://stackoverflow.com/questions/19270392/what-is-priority-of-ng-repeat-directive-can-you-change-it)
