
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
    image: './haskolinn-scene1.jpg',
    initialYaw: Math.PI,
    hotspots: [
      { yaw: 0,            pitch: 0, target: 'scene2', label: 'scene2' },
      { yaw: -Math.PI / 2, pitch: 0, target: 'scene3', label: 'scene3' }
    ]
  },
  {
    id: 'scene2',
    image: './haskolinn-scene2.jpg',
    initialYaw: 0,
    hotspots: [
      { yaw: Math.PI, pitch: 0, target: 'entrance', label: 'Til baka' },
      { yaw: 0,       pitch: 0, target: 'scene3',    label: 'scene3' }
    ]
  },
  {
    id: 'scene3',
    image: './haskolinn-scene3.jpg',
    initialYaw: 0,
    hotspots: [
      { yaw: Math.PI, pitch: 0, target: 'entrance', label: 'Til baka' },
      { yaw: 0,       pitch: 0, target: 'scene2',    label: 'scene2' }
    ]
  }
];

// Build a hotspot DOM element
function createHotspotElement(label) {
  var element = document.createElement('div');
  element.className = 'hotspot';
  element.style.width = '50px';
  element.style.height = '50px';
  element.style.borderRadius = '50%';
  element.style.background = '#10099F';
  element.style.border = '2px solid white';
  element.style.boxShadow = '0 2px 10px rgba(0,0,0,0.3)';
  element.style.display = 'flex';
  element.style.justifyContent = 'center';
  element.style.alignItems = 'center';
  element.style.cursor = 'pointer';
  element.style.color = 'white';
  element.style.fontSize = '2rem';
  element.style.userSelect = 'none';
  element.style.display = 'flex';
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
  // cursor.style.left = e.clientX - (this.window.innerWidth < 1100 ? 50 : 125) + 'px';
  // cursor.style.top = e.clientY - (this.window.innerWidth < 1100 ? 50 : 125) + 'px';
  cursor.style.left = e.clientX  - 30 + 'px';
  cursor.style.top = e.clientY + 'px';
});
document.querySelectorAll('.hotspot').forEach(function(hotspot) {
  let cursor = document.querySelector('.cursor');
  hotspot.addEventListener('mouseenter', function() {
    cursor.style.backgroundImage = 'url(./HI_Hendi_02.png)';

  });
  hotspot.addEventListener('mouseleave', function() {
    cursor.style.backgroundImage = 'url(./HI_Hendi_01.png)';
  });
});
