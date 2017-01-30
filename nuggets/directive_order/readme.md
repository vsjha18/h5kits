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
