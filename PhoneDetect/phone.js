document.onload = function() {
    //detect if the user has a iphone or android phone
    var ua = navigator.userAgent.toLowerCase();
    if (ua.indexOf("iphone") > -1 || ua.indexOf("android") > -1) {
        //if the user has a phone, hide the phone number and show the phone icon
        document.getElementById("phone").innerHTML = ua
    }

}