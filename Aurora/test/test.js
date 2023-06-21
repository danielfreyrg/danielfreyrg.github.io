
$(function() {
  
    var $plane = $('.plane'); // Cache your elements!
    var $window = $(window);
    var scrollDir;
    var prevScrollTop = $window.scrollTop();
    var rotation = 0;
    var changingValue = 20;
    
    $(window).scroll(function(e) { 
  
        var delta = $window.scrollTop() - prevScrollTop;
       
        delta = delta / Math.abs(delta);
      
        if ( delta >= 0 )
          rotation += changingValue; // whatever value you need;
        else 
          rotation -= changingValue; // whatever value you need;
      
        if ( rotation >= 180 )
          rotation = 180;
        else if ( rotation <= 0 )
          rotation = 0;
      
        $plane.css({transform: 'rotate('+ rotation +'deg)'}); 
      
        prevScrollTop = $window.scrollTop();
      
    });
    
  });
  