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
class="outer">
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

difficult to explain above observation. Following links can help. The only thing I can
say for sure is because the priority of ng-repeat is 1000 which is higher that user space
directives which has a default priority of 0.

[Read This](http://stackoverflow.com/questions/36975189/why-ng-repeat-changes-order-of-link-function-execution)  
[Ref 1](http://stackoverflow.com/questions/16113647/ngrepeat-and-directives-execution-order)  
[Ref 2](http://stackoverflow.com/questions/19270392/what-is-priority-of-ng-repeat-directive-can-you-change-it)  

It seems once the ng-repeat is seen by angular, further dom parsing is paused (since ng-repeat has higher priority) and all the directives till that point is completed first. Then ng-repeat starts and then things
happen as expected.

The confirmation of above behavior is found when we move the ng-repeat to `middle` directive from `outer`
directive, this is the order we get.

```
outer compile fired ...
middle compile fired ...

MAIN CONTROLLER

outer controller fired ...
outer pre link fired
middle controller fired ...
middle pre link fired
middle post link fired ..
outer post link fired ..

inner compile fired ...
inner controller fired ...
inner pre link fired
inner post link fired ..
inner controller fired ...
inner pre link fired
inner post link fired ..
```

Hence we could summarize it like this:
> Dom parsing is paused once ng-repeat is seen. Before starting ng-repeat all the directive
> instantiation and the bare controllers are completed and then angular starts to execute
> ng-repeat. All this happens becuase ng-repeat has a high priority of 1000 and hence happens
> first before the subsequent dom could be parsed.

Extending the above scenario if we have `ng-repeat` in both outer and middle.

```
outer compile fired ...
MAIN CONTROLLER
outer controller fired ...
outer pre link fired
outer post link fired ..

middle compile fired ...

middle controller fired ...
middle pre link fired
middle post link fired ..

middle controller fired ...
middle pre link fired
middle post link fired ..

inner compile fired ...
inner controller fired ...
inner pre link fired
inner post link fired ..
inner controller fired ...
inner pre link fired
inner post link fired ..
inner controller fired ...
inner pre link fired
inner post link fired ..
inner controller fired ...
inner pre link fired
inner post link fired ..
```

# case 4: Directives with transclusion

The order in which directive's link and controller functions are executed, remain same. But the
timing of triggering of compile function changes.

```
outer compile fired ...

MAIN CONTROLLER

outer controller fired ...
outer pre link fired

middle compile fired ...
middle controller fired ...
middle pre link fired

inner compile fired ...
inner controller fired ...
inner pre link fired

inner post link fired ..
middle post link fired ..
outer post link fired ..
```

because of above order it is possible for outer pre link function to change the dom below it.

Also read [this](http://jvandemo.com/the-nitty-gritty-of-compile-and-link-functions-inside-angularjs-directives-part-2-transclusion/), in the older release of Angular, say 1.4.0 , the compile used to trigger together
and in reverse order but now this behavior as explained in the above link doesn't exist.

> There are few mysterious things also happening in case of tranclusion. For example if you invoke the
> transclusion function, it actually causes things to render twice. The reason for this probably that,
> either you should use <ng-transclude> </ng-transclude> or use the transclusion function, but not both.
> Hence be careful in not using both.

Overall the best article on this subject is [this](http://www.jvandemo.com/the-nitty-gritty-of-compile-and-link-functions-inside-angularjs-directives/)
