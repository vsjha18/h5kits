## Different ways we can communicate with child scope directives.

# case of scalars.

In case of child scope directives suppose main controller/parent controller
defines a scope var like this.

```
$scope.name = "vivek"
```

* if this is overridden in the directive then parent maintains its own copy and
directive maintains its own copy.

* if directive scope doesn't redefine the same variable then directive gets the same
value as the parent has.

# case of objects.

in the main controller has it like an object assignment.

```
$scope.address = {
    city: "bangalore",
    state: "karnataka",
    country: "india"
}
```

* if the directive simple tweaks one of its attribute like this.

```
$scope.address.city = "patna"
```

then parent data also gets impacted since it is an object a unique copy is maintained
in the runtime and variables are just the labels pointing to it.

* But if we make a new assignment like this.

```
$scope.address = {
    ... a new object
    ...
}

```
in this case again parent controller maintains its own copy and directive maintains
its own copy. Because we have assigned the whole new object.

# passing data through attributes.

While passing data through attributes, unlike the isolate scope directives, value
in not looked up in parent scope and the value is passed as it. In case we have to
pass the object then only way is to use this notation.
```
<div x="{{ someVarInParent }}"></div>
```

In this case, though the data is passed, but it is stringified in the due process
and dual binding is broken.

One hackish way to retain the dual binding is to just pass the scope attribute
and use this notation
```
scope.$eval(attr.someVarInParent)
```

Well but this approach has its own limitations, like using observe becomes
meaningless and you have to device some way to use the observe. More on that
later in some other example.
