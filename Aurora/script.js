if (!window.document.title.includes('app=uxbuilder&type=editor')) {

    var currentRotation = 0;
    var rotationLimit = 5
    var flipped = false;
    var rotationDivision = 5000
    var waveSkew = 0;
    var waveSkewLimit = 1;
    var waveFlipped = false;
    var waveDivision = 25;
    
    const boat = document.querySelector('.boat');
    const wave = document.querySelector('.waves');
    const title = document.querySelector('.hero-title');
    const clouds = document.querySelector('.clouds');
    const hero = document.querySelector('.hero')
    const date = new Date();
    const hour = date.getHours();
    const min = date.getMinutes();
    if (1) {
        clouds.classList.add('night');
    }
    if (hero) {
    hero.addEventListener('mousemove', function(e){
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
        clouds.style.transform = 'translate3D(' + (-mouseXpercentage/waveDivision)+ "px, " + (-mouseYpercentage/waveDivision) + 'px, 0)';
    
        if (currentRotation > rotationLimit){
            flipped = true;
        }
        else if (currentRotation <= -rotationLimit) {
            flipped = false;
        }
        var mouseRotation = ((mouseXpercentage/rotationDivision) + (mouseYpercentage/rotationDivision))/2;
        if (flipped) {
        currentRotation -= mouseRotation
        } else {
            currentRotation += mouseRotation
        }
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
        }
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
    
    
        const div = document.querySelector(".delicacy-container");
        const isMobile = window.innerWidth < 768;
        const numbers = document.querySelectorAll(".delicacy-container > .col");
        
        if (div) {
          const inView = window.innerHeight > numbers[0].getBoundingClientRect().bottom;
        
          if (!inView) {
            window.addEventListener("scroll", () => {
              const elementPosition = numbers[0].getBoundingClientRect();
              const windowHeight = window.innerHeight;
        
              if (
                (elementPosition.bottom < windowHeight &&
                  elementPosition.bottom >= 0) ||
                (isMobile &&
                  elementPosition.top < windowHeight &&
                  elementPosition.top >= 0)
              ) {
                div.classList.remove("out-view");
                div.classList.add("in-view");
              }
            });
          }
          if (inView) {
            div.classList.remove("out-view");
            div.classList.add("in-view");
          }
        }
    
    
    }