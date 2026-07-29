let bird=document.getElementById("bird");

let x=-200;

let y=150;

let score=0;

function move(){

x+=5;

bird.style.left=x+"px";

bird.style.top=y+"px";

if(x>window.innerWidth){

x=-200;

y=Math.random()*250+80;

}

requestAnimationFrame(move);

}

move();