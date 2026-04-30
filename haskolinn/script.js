
// Initialize Marzipano viewer
var panoElement = document.getElementById('panorama-360-view');
var viewer = new Marzipano.Viewer(panoElement);

// Shared geometry + limiter settings for every scene
var geometry = new Marzipano.EquirectGeometry([{ width: 4000 }]);
var limiter = Marzipano.RectilinearView.limit.traditional(1024, 100 * Math.PI / 180);

// Scene definitions. Each entry describes one panorama and which hotspots
// should appear in it. A hotspot's `target` is the id of the scene to move to.
var sceneData = [
  {
    id: 'entrance',
    image: './CAM_20260416115712_0025_D.JPG',
    initialYaw: Math.PI,
    hotspots: [
      { yaw: 0,            pitch: 0, target: '500kb', label: '500kb' },
      { yaw: -Math.PI / 2, pitch: 0, target: '700kb', label: '700kb' }
    ]
  },
  {
    id: '700kb',
    image: './haskolinn-360-700kb.jpg',
    initialYaw: 0,
    hotspots: [
      { yaw: Math.PI, pitch: 0, target: 'entrance', label: 'Til baka' },
      { yaw: 0,       pitch: 0, target: 'room2',    label: 'Áfram' }
    ]
  },
  {
    id: '500kb',
    image: './haskolinn-360-500kb.jpg',
    initialYaw: 0,
    hotspots: [
      { yaw: Math.PI, pitch: 0, target: 'entrance', label: 'Til baka' },
      { yaw: 0,       pitch: 0, target: 'room1',    label: 'Í hitt herbergið' }
    ]
  }
];

// Build a hotspot DOM element
function createHotspotElement(label) {
  var element = document.createElement('div');
  element.className = 'hotspot';
  element.style.width = '64px';
  element.style.height = '64px';
  element.style.borderRadius = '50%';
  element.style.background = 'rgba(20, 192, 255, 0.85)';
  element.style.border = '2px solid white';
  element.style.boxShadow = '0 2px 10px rgba(0,0,0,0.3)';
  element.style.display = 'flex';
  element.style.justifyContent = 'center';
  element.style.alignItems = 'center';
  element.style.cursor = 'pointer';
  element.style.color = 'white';
  element.style.fontSize = '2rem';
  element.style.userSelect = 'none';
  element.innerHTML = '<span>&#8594;</span>';
  if (label) element.title = label;
  return element;
}

// Build each scene from sceneData
var scenes = {};
sceneData.forEach(function (data) {
  var source = Marzipano.ImageUrlSource.fromString(data.image);
  var view = new Marzipano.RectilinearView({ yaw: data.initialYaw || 0 }, limiter);

  var marzipanoScene = viewer.createScene({
    source: source,
    geometry: geometry,
    view: view,
    pinFirstLevel: true
  });

  scenes[data.id] = {
    scene: marzipanoScene,
    data: data
  };
});

// Attach hotspots once all scenes exist so they can reference each other
sceneData.forEach(function (data) {
  var marzipanoScene = scenes[data.id].scene;

  data.hotspots.forEach(function (spot) {
    var el = createHotspotElement(spot.label);

    el.addEventListener('click', function () {
      var target = scenes[spot.target];
      if (!target) return;
      target.scene.switchTo({ transitionDuration: 1000 });
    });

    marzipanoScene.hotspotContainer().createHotspot(
      el,
      { yaw: spot.yaw, pitch: spot.pitch }
    );
  });
});

// Show the first scene
scenes[sceneData[0].id].scene.switchTo();

// Custom cursor follow
window.addEventListener('mousemove', function (e) {
  var cursor = document.querySelector('.cursor');
  if (!cursor) return;
  cursor.style.left = e.clientX - 125 + 'px';
  cursor.style.top = e.clientY - 125 + 'px';
});
document.querySelectorAll('.hotspot').forEach(function(hotspot) {
  let cursor = document.querySelector('.cursor');
  hotspot.addEventListener('mouseenter', function() {
    cursor.style.backgroundImage = 'url(./finger.png)';

  });
  hotspot.addEventListener('mouseleave', function() {
    cursor.style.backgroundImage = 'url(./Object.png)';
  });
});
