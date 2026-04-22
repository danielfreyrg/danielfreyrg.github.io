
// Initialize Marzipano viewer

// Get the panorama container element
var panoElement = document.getElementById('panorama-360-view');

// Create Marzipano viewer
var viewer = new Marzipano.Viewer(panoElement);

// Example equirectangular image URL (replace with your own 360 image)
var panoImageUrl = "./CAM_20260416115712_0025_D.JPG";

// Create a Marzipano source from the equirectangular image
var source = Marzipano.ImageUrlSource.fromString(panoImageUrl);

// Create a geometry with a single level (equirectangular)
var geometry = new Marzipano.EquirectGeometry([{ width: 4000 }]);

// Default view parameters
var limiter = Marzipano.RectilinearView.limit.traditional(1024, 100*Math.PI/180);
var view = new Marzipano.RectilinearView({ yaw: Math.PI }, limiter);

// Create the scene
var scene = viewer.createScene({
  source: source,
  geometry: geometry,
  view: view,
  pinFirstLevel: true
});

// Display the scene
scene.switchTo();

window.addEventListener('mousemove', (e) => {
  const cursor = document.querySelector('.cursor');
  cursor.style.left = e.clientX + 'px';
  cursor.style.top = e.clientY + 'px';
});