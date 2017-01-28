## Impact of using observe in case of scope.$eval technique in directives.

this technique in not useful in case you are getting the scope attribute
through dom attribute. For example:

```
<myDir data="d">

// In directive
scope.$eval(attrs.data);
```

With above technique when the data changes, there is no change in the attribute
and observe will not fire, simply because in child scope directives attributes
come as string, in simple words it is basically "pass by value" and the effect
which we are looking for is "pass by reference".

## With scope=true

There is not impact on the way *attrs* behave in case of directives with
scope=false; Means.
