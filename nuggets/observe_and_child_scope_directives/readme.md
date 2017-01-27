## Impact of using observe in case of scope.$eval technique in directives.

this technique in not useful in case you are getting the scope attribute
through dom attribute. For example:

```
<myDir data="d">

// In directive
scope.$eval(attrs.data);
```

With above technique when the data changes, there is not change in the attribute
and observe will not fire, simple because in child scope directives attributes
come as string, in simple words it is basically "pass by value" and the effect
which we are looking for is "pass by reference".
