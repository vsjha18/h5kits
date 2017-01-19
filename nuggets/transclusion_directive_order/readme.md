# what is the order of directive execution in case of transclusion.
With angular 1.5.7 and below this is the outcome

* outer controller executes
* outer pre link executes
* middle controller executes
* middle pre link executes
* inner controller executes
* inner pre link executes
* inner post link executes
* inner controller executes
* inner pre link executes
* inner post link executes
* middle post link executes
* middle controller executes
* middle pre link executes
* inner controller executes
* inner pre link executes
* inner post link executes
* inner controller executes
* inner pre link executes
* inner post link executes
* middle post link executes
* outer post link executes

On Angular 1.5.8 and above this is the outcome:

* outer controller executes
* outer pre link executes
* middle controller executes
* middle pre link executes
* inner controller executes
* inner pre link executes
* inner post link executes
* middle post link executes
* outer post link executes

# A word on transclusion

transcluded stuff basically derives from the controller scope rather than the
directive which has transcluded it better say the parent directive. Hence any thing
set in the parent directive scope is not available in the transcluded stuff. Transclusion
acts like a transparent enclosure from where you can see the world outside while
being inscribed in the parent directive.

# more on scope.

The outer directive is not transcluded by anyone so we can treat it as normal directive
in order to understand child scopes. When you make change in a variable in child scope
which was also defined in the main controller, it doesn't change the value in the main
controller, the changes are only applicable in the directive scope. in case you provide
no definition to the variable which was defined in the main controller, it simply shows the
value set in the main controller. It is python like scoping.

Where as with "scope=false", things are different. changes made by directive are updated
back to the main controller because all are working on the same copy of scope.

# Activities
* Try changing to "scope=false" in the outer and study the impact.
* Try changing to angular version 1.5.7 to study the order in which directives instantiate.
