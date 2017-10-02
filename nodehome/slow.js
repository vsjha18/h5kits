#!/usr/bin/env node

var t = 0;

for(var i=0; i<200; i++) {
    writeLate(i)
}

function writeLate(index) {
    t = Math.random(0,1)*200 + t
    setTimeout(function(){
        console.log(index + ": a quick brown fox jumped over a lazy dog")
    }, t)
}



