const check = function() {
    var ua = navigator.userAgent.toLowerCase();
    document.getElementById("phone").innerHTML = ua
    if (navigator.userAgent.match(/Android/i)) {
        console.log('Android');
        document.location.href = "https://www.android.com"
    } else if (navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i)) {
        console.log('iOS');
        document.location.href = "https://www.apple.com"
    }
}