const check = function() {
    var ua = navigator.userAgent.toLowerCase();
    document.getElementById("phone").innerHTML = ua
    if (navigator.userAgent.match(/Android/i)) {
        console.log('Android');
        document.location.href = "apple.com"
    } else if (navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i)) {
        console.log('iOS');
        document.location.href = "android.com"
    }
    console.log(ua);
}

//check if the user is using a android or an ios phone