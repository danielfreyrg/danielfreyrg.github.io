var currentRotation = 0;
var rotationLimit = 5
var flipped = false;
var rotationDivision = 1000
var waveSkew = 0;
var waveSkewLimit = 1;
var waveFlipped = false;
var waveDivision = 10000;
const boat = document.querySelector('.boat');
const wave = document.querySelector('.waves');
const title = document.querySelector('.hero-title');
const clouds = document.querySelector('.clouds');
document.querySelector('.hero').addEventListener('mousemove', function(e){
    var mouseXpercentage = Math.round(e.pageX / window.innerWidth * 100);
    var mouseYpercentage = Math.round(e.pageY / window.innerHeight * 100);
	
    if (waveSkew > waveSkewLimit){
        waveFlipped = true;
    }
    else if (waveSkew <= -waveSkewLimit) {
        waveFlipped = false;
    }
    var mouseSkew = ((mouseXpercentage/waveDivision) + (mouseYpercentage/waveDivision))/2;
    if (waveFlipped) {
        waveSkew -= mouseSkew
    } else {
        waveSkew += mouseSkew
    }
    wave.style.transform = 'translate3D(' + (mouseXpercentage/waveDivision)+ "px, " + (mouseYpercentage/waveDivision) + 'px, 0)';

    if (currentRotation > rotationLimit){
        flipped = true;
    }
    else if (currentRotation <= -rotationLimit) {
        flipped = false;
    }
	var mouseRotation = ((mouseXpercentage/rotationDivision) + (mouseYpercentage/rotationDivision))/2;
	console.log(mouseRotation)
	if (flipped) {
    currentRotation -= mouseRotation
	} else {
		currentRotation += mouseRotation
	}
	console.log(currentRotation)
	boat.style.transform = 'rotate(' + (currentRotation) + 'deg)';

})
window.addEventListener('scroll', function() {
    


var scrollpercent = (document.body.scrollTop + document.documentElement.scrollTop) / (document.documentElement.scrollHeight - document.documentElement.clientHeight);
if ((scrollpercent * 100) < 50){
if((scrollpercent * 100) + 20 < 58){
title.style.backgroundPosition ='center ' +  ((scrollpercent*100) + 20) + '%';
}
if ((scrollpercent + 54 < 55)){
    boat.style.backgroundPosition = '63% ' + ((scrollpercent * 20) + 54) + '%';

}

if (currentRotation > rotationLimit){
    flipped = true;
}
else if (currentRotation <= -rotationLimit) {
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



$(document).ready(function() {
    $('.compass').on('mouseenter', function() {
        var randomDegree = Math.random() * (360 - 45) + 45;  // Generate a random degree between 45 and 360
        $('.compass-arrow').css({
            'transition': 'all 0.5s ease',
            'transform': 'rotate(' + randomDegree + 'deg)'
        });
    }).on('mouseleave', function() {
        $('.compass-arrow').css({
            'transition': 'all 0.5s ease',
            'transform': 'rotate(0deg)'
        });
    });
});

