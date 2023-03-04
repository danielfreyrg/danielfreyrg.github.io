var modal = document.getElementById('modal');
function openModal() {
  modal.style.display = 'block';
}

//allow dragging of modal
var dragItem = document.getElementById('modal');
var container = document.getElementById('modal');
dragItem.addEventListener('mousedown', dragStart, false);
window.addEventListener('mouseup', dragEnd, false);
var active = false;
var currentX;
var currentY;
var initialX;
var initialY;
var xOffset = 0;
var yOffset = 0;
function dragStart(e) {
    initialX = e.clientX - xOffset;
    initialY = e.clientY - yOffset;
    if (e.target === dragItem) {
        active = true;
    }
    }
function dragEnd(e) {
    initialX = currentX;
    initialY = currentY;
    active = false;
}
function drag(e) {
    if (active) {
        e.preventDefault();
        currentX = e.clientX - initialX;
        currentY = e.clientY - initialY;
        xOffset = currentX;
        yOffset = currentY;
        setTranslate(currentX, currentY, dragItem);
    }
}
window.addEventListener('mousemove', drag, false);
function setTranslate(xPos, yPos, el) {
    el.style.transform = "translate3d(" + xPos + "px, " + yPos + "px, 0)";
}
//close modal if you click outside of it
window.onclick = function(event) {
    if (event.target != modal && event.target != document.getElementById('openModal')) {
        modal.style.display = "none";
    }
}