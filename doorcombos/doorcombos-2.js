var doorInfo = [
    { name: "H5111", src: "H5111.png" },
    { name: "H3010", src: "H3010-1.png" },
    { name: "H5110", src: "H5110.png" },
    { name: "H4030", src: "H4030.png" },
    { name: "H2030", src: "H2030-2.png" },
    { name: "H5102", src: "H5102.png" },
    { name: "H1000", src: "H1000-1.png" },
    { name: "H5101", src: "H5101.png" },
    { name: "H4021", src: "H4021.png" },
    { name: "H4040", src: "H4040.png" },
    { name: "H1060", src: "H1060-1.png" },
    { name: "SV5510", src: "SV5510.png" },
    { name: "H2000", src: "H2000-2.png" },
    { name: "H5150", src: "H5150.png" },
    { name: "SV5512", src: "SV5512.png" },
    { name: "H3000", src: "H3000-1.png" },
    { name: "H3050", src: "H3050.png" },
    { name: "H3040", src: "H3040.png" },
    { name: "H5155", src: "H5155.png" },
    { name: "H3020", src: "H3020-1.png" },
    { name: "H4050 lóðrétt rásun", src: "H4050_lodrett_rasun.png" },
    { name: "H1010", src: "H1010-1.png" },
    { name: "H2020", src: "H2020-2.png" },
    { name: "SV5500", src: "SV5500.png" },
    { name: "SV5514", src: "SV5514.png" },
    { name: "H5130", src: "H5130.png" },
    { name: "H2025", src: "H2025-1.png" },
    { name: "H4020", src: "H4020-1.png" },
    { name: "H5131", src: "H5131.png" },
    { name: "H5100", src: "H5100-1.png" },
    { name: "H3030", src: "H3030.png" },
    { name: "H4011", src: "H4011.png" },
    { name: "H1050", src: "H1050-1.png" },
    { name: "H5122", src: "H5122.png" },
    { name: "H1070", src: "H1070-1.png" },
    { name: "H5121", src: "H5121.png" },
    { name: "H2040", src: "H2040-1.png" },
    { name: "H5040", src: "H5040.png" },
    { name: "H5120", src: "H5120.png" },
    { name: "H4000", src: "H4000.png" },
  ];
  var frameInfo = [
    { name: "K03", src: "K03-2.png", TopMargin: 18, LeftMargin: 18, Height: 620, Width: 273 },
    { name: "K23", src: "K23-2.png", TopMargin: 82, LeftMargin: 18, Height: 600, Width: 266 },
    { name: "K07", src: "K07-2.png", TopMargin: 18, LeftMargin: 18, Height: 612, Width: 270 },
    { name: "K05", src: "K05-2.png", TopMargin: 18, LeftMargin: 18, Height: 620, Width: 270 },
    { name: "K21", src: "K21-2.png", TopMargin: 18, LeftMargin: 118, Height: 606, Width: 260 },
    { name: "K02", src: "K02-2.png", TopMargin: 16, LeftMargin: 15, Height: 492, Width: 215 },
    { name: "K24", src: "K24-3.png", TopMargin: 50, LeftMargin: 12, Height: 370, Width: 166 },
    { name: "K20", src: "K20-3.png", TopMargin: 18, LeftMargin: 120, Height: 606, Width: 266 },
    { name: "K22", src: "K22-2.png", TopMargin: 18, LeftMargin: 18, Height: 606, Width: 265 },
    { name: "K06", src: "K06-2.png", TopMargin: 18, LeftMargin: 18, Height: 615, Width: 270 },
    { name: "K13", src: "K13-2.png", TopMargin: 18, LeftMargin: 118, Height: 606, Width: 266 },
    { name: "K08", src: "K08-2.png", TopMargin: 18, LeftMargin: 18, Height: 606, Width: 266 },
    { name: "K10", src: "K10-2.png", TopMargin: 18, LeftMargin: 18, Height: 606, Width: 266 },
    { name: "K09", src: "K09-4.png", TopMargin: 18, LeftMargin: 18, Height: 606, Width: 266 },
    { name: "K14", src: "K14-2.png", TopMargin: 18, LeftMargin: 118, Height: 600, Width: 266 },
  ];
const sleep = (time) => {
  return new Promise((resolve) => setTimeout(resolve, Math.ceil(time * 1000)));
};
const currenturl = window.location.href;
const siteArr = currenturl.split("/");
var currentLocation = siteArr[siteArr.length - 2];

if (currentLocation == "image-testing") {
  const doorButton = document.getElementById("show-door");
  const doorModal = document.getElementById("door-modal");
  doorButton.addEventListener("click", async function () {
    doorModal.style.display = "block";
    await sleep(0.25); //wait 0.25 seconds so the two events don't fire at once
    window.addEventListener(
      "click",
      function close(event) {
        doorModal.style.display = "none";
      },
      { once: true }
    );
  });
  const frameselector = document.getElementsByClassName("wpcf7-select")[1];
  const doorselector = document.getElementsByClassName("wpcf7-select")[0];


  function dynamicSort(property) {
    var sortOrder = 1;
    if (property[0] === "-") {
      sortOrder = -1;
      property = property.substr(1);
    }
    return function (a, b) {
      /* next line works with strings and numbers,
       * and you may want to customize it to your needs
       */
      var result =
        a[property] < b[property] ? -1 : a[property] > b[property] ? 1 : 0;
      return result * sortOrder;
    };
  }
  doorInfo.sort(dynamicSort("name"));
  frameInfo.sort(dynamicSort("name"));
  var doorimg = document.getElementById("door");
  var frameimg = document.getElementById("frame");

  for (var i = 0; i < doorInfo.length; i++) {
    doorselector.innerHTML +=
      "<option value='" +
      doorInfo[i].src +
      "'>" +
      doorInfo[i].name +
      "</option>";
  }
  for (var i = 0; i < frameInfo.length; i++) {
    frameselector.innerHTML +=
      "<option value='" +
      frameInfo[i].src +
      "'>" +
      frameInfo[i].name +
      "</option>";
  }
  const findFrame = (name) => {
    for (var i = 0; i < frameInfo.length; i++) {
      if (frameInfo[i].src == name) {
        return frameInfo[i];
      }
    }
    return {name: '', src: '', TopMargin: 50, LeftMargin: 300, Width: 0, Height: 0}
  };

  const findDoor = (name) => {
    for (var i = 0; i < doorInfo.length; i++) {
      if (doorInfo[i].src == name) {
        return doorInfo[i];
      }
    }
    return { name: "", src: "" }
  };
  const changeDoor = () => {
    var door = findDoor(doorselector.value);
    var doorimg = document.getElementById("door");
    var frame = findFrame(frameselector.value);
    if (door == undefined || (door == undefined && frame == undefined)) {
      return;
    }
    doorimg.src =
      "https://dev.starkup.ee/kambar/wp-content/uploads/2022/05/" + door.src;
      if (frame.name !== ''){
    doorimg.style.top = 50 + frame.TopMargin + "px";
    doorimg.style.left = 300 + frame.LeftMargin + "px";
    doorimg.style.height = frame.Height + "px";
    doorimg.style.width = frame.Width + 2 + "px";
      }

    document.getElementById("doorcombo-title").innerHTML =
      "<h3> Hurð: " + door.name + ", karmur: " + frame.name + "</h3>";
  };
  const changeFrame = () => {
    var frame = findFrame(frameselector.value);
    var door = findDoor(doorselector.value);
    if (frame == undefined || (door == undefined && frame == undefined)) {
                return;
      }
    frameimg.src =
      "https://dev.starkup.ee/kambar/wp-content/uploads/2022/05/" + frame.src;
      if (door.name !== ''){
    doorimg.style.top = 50 + frame.TopMargin + "px";
    doorimg.style.left = 300 + frame.LeftMargin + "px";
    doorimg.style.height = frame.Height + "px";
    doorimg.style.width = frame.Width + 2 + "px";
      }
    document.getElementById("doorcombo-title").innerHTML =
      "<h3> Hurð: " + door.name + ", karmur: " + frame.name + "</h3>";
  };
  frameselector.addEventListener("change", changeFrame);
  doorselector.addEventListener("change", changeDoor);
}
