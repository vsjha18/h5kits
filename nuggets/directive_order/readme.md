# what is the order of directive execution in case of transclusion.
With angular 1.5.7 and below this is the outcome
outer controller executes
outer pre link executes
middle controller executes
middle pre link executes
inner controller executes
inner pre link executes
inner post link executes
inner controller executes
inner pre link executes
inner post link executes
middle post link executes
middle controller executes
middle pre link executes
inner controller executes
inner pre link executes
inner post link executes
inner controller executes
inner pre link executes
inner post link executes
middle post link executes
outer post link executes

On Angular 1.5.8 and above this is the outcome:

outer controller executes
outer pre link executes
middle controller executes
middle pre link executes
inner controller executes
inner pre link executes
inner post link executes
middle post link executes
outer post link executes

# A word on transclusion scope.
