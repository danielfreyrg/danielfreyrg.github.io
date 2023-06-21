var currentRotation = 0;
var flipped = false;
const boat = document.querySelector('.boat');
const wave = document.querySelector('.wave');
const title = document.querySelector('.hero-title');
const clouds = document.querySelector('.clouds');

window.addEventListener('scroll', function() {
    


var scrollpercent = (document.body.scrollTop + document.documentElement.scrollTop) / (document.documentElement.scrollHeight - document.documentElement.clientHeight);
if ((scrollpercent * 100) < 50){
if((scrollpercent * 100) + 20 < 58){
title.style.backgroundPosition ='center ' +  ((scrollpercent*100) + 20) + '%';
}
if ((scrollpercent + 54 < 55)){
    boat.style.backgroundPosition = '63% ' + ((scrollpercent * 10) + 54) + '%';

}

if (currentRotation > 10){
    flipped = true;
}
else if (currentRotation <= -10) {
    flipped = false;
}

if (flipped){
    currentRotation -= (scrollpercent/2);
}
else {
    currentRotation += (scrollpercent/2);
}

boat.style.transform = 'rotate(' + (currentRotation) + 'deg)';


}
})
function waitforAll(){
    all = [];
    $('.hero-title').waitForImages(function() {
        if (all.length == 6){
            $('.hero').addClass('loaded');
        }
        else {
            all.push('hero');
        }
    });
    $('.clouds').waitForImages(function() {
        if (all.length == 6){
            $('.hero').addClass('loaded');
        }
        else {
            all.push('clouds');
        }
    }
    );
    $('.wave').waitForImages(function() {
        if (all.length == 6){
            $('.hero').addClass('loaded');
        }
        else {
            all.push('wave');
        }
    }
    );
    $('.boat').waitForImages(function() {
        if (all.length == 6){
            $('.hero').addClass('loaded');
        }
        else {
            all.push('boat');
        }
    }
    );
    $('.hero-title').waitForImages(function() {
        if (all.length == 6){
            $('.hero').addClass('loaded');
        }
        else {
            all.push('hero-title');
        }
    }
    );
}
$('.hero-title').waitForImages(function() {
    $('.hero').addClass('loaded');
});
