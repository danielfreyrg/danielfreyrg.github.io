var currentRotation = 0;
var flipped = false;
window.addEventListener('scroll', function() {
    
    const boat = document.querySelector('.boat');
    const wave = document.querySelector('.wave');
const title = document.querySelector('.hero-title');
const clouds = document.querySelector('.clouds');


var scrollpercent = (document.body.scrollTop + document.documentElement.scrollTop) / (document.documentElement.scrollHeight - document.documentElement.clientHeight);
if((scrollpercent * 100) + 20 < 60){
title.style.backgroundPosition ='center ' +  ((scrollpercent*100) + 20) + '%';
}
if ((scrollpercent + 54 < 55)){
    boat.style.backgroundPosition = '63% ' + ((scrollpercent * 10) + 54) + '%';

}

//limit rotation between -10 and 10
if ((scrollpercent * 100) < 10){
    flipped = false;

    boat.style.transform = 'rotate(' + ((scrollpercent * 100)) + 'deg)';
    currentRotation = (scrollpercent * 100);
}
else if ((scrollpercent * 100) > 10){
    flipped = true;
    boat.style.transform = 'rotate(' + (currentRotation -(scrollpercent* 100) ) + 'deg)';
}
})