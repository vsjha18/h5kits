# Handling situations when ng-click is applied on container div and contained div too.

In such cases, when inner div, i.e. the contained div is clicked it will cause both
the `ng-clicks` to be triggered. To avoid such problem do this.

```html
<div class="big-box" ng-click="bigBoxClick()">
    <div class="box" ng-click="smallBoxClick($event)"></div>
</div>
```

And in the controller
```javascript
$scope.smallBoxClick = function(e) {
    console.log(e)
    e.stopPropagation();
    alert("small box was cliked ...")
}
```
