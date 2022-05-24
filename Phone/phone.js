const check = function() {
    var ua = navigator.userAgent.toLowerCase();
    if (navigator.userAgent.match(/android/i)) {
        document.location.href = "https://www.android.com"
    } else if (navigator.userAgent.match(/iphone/i) || navigator.userAgent.match(/ipad/i)) {
        document.location.href = "https://www.apple.com"
    }
}