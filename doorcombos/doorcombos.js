var filesdict = {
    "H5111": "H5111.png",
    "H3010-1": "H3010-1.png",
    "H5110": "H5110.png",
    "H4030": "H4030.png",
    "K03-2": "K03-2.png",
    "H2030-2": "H2030-2.png",
    "K23-2": "K23-2.png",
    "K07-2": "K07-2.png",
    "H5102": "H5102.png",
    "H1000-1": "H1000-1.png",
    "K05-2": "K05-2.png",
    "K21-2": "K21-2.png",
    "H5101": "H5101.png",
    "H4021": "H4021.png",
    "K02-2": "K02-2.png",
    "K24-3": "K24-3.png",
    "H4040": "H4040.png",
    "K20-3": "K20-3.png",
    "K22-2": "K22-2.png",
    "H1060-1": "H1060-1.png",
    "K06-2": "K06-2.png",
    "SV5510": "SV5510.png",
    "K13-2": "K13-2.png",
    "H2000-2": "H2000-2.png",
    "H5150": "H5150.png",
    "SV5512": "SV5512.png",
    "H3000-1": "H3000-1.png",
    "K08-2": "K08-2.png",
    "H3050": "H3050.png",
    "H3040": "H3040.png",
    "H5155": "H5155.png",
    "H3020-1": "H3020-1.png",
    "H4050_lodrett_rasun": "H4050_lodrett_rasun.png",
    "H1010-1": "H1010-1.png",
    "H2020-2": "H2020-2.png",
    "SV5500": "SV5500.png",
    "SV5514": "SV5514.png",
    "H5130": "H5130.png",
    "K10-2": "K10-2.png",
    "H2025-1": "H2025-1.png",
    "H4020-1": "H4020-1.png",
    "H5131": "H5131.png",
    "H5100-1": "H5100-1.png",
    "H3030": "H3030.png",
    "H4011": "H4011.png",
    "H1050-1": "H1050-1.png",
    "H5122": "H5122.png",
    "K09-4": "K09-4.png",
    "H1070-1": "H1070-1.png",
    "H5121": "H5121.png",
    "H2040-1": "H2040-1.png",
    "K14-2": "K14-2.png",
    "H5040": "H5040.png",
    "H5120": "H5120.png",
    "H4000": "H4000.png",
};
var info = [{ "name": 'K03', "src": "images/K03-2.png", "T": 18, "L": 18, "H": 620, "W": 273 },
    { 'name': 'K23', "src": "images/K23-2.png", "T": 18, "L": 18, "H": 600, "W": 266 },
    { 'name': 'K07', "src": "images/K07-2.png", "T": 18, "L": 18, "H": 612, "W": 270 },
    { 'name': 'K05', "src": "images/K05-2.png", "T": 18, "L": 18, "H": 620, "W": 270 },
    { 'name': 'K21', "src": "images/K21-2.png", "T": 18, "L": 118, "H": 606, "W": 260 },
    { 'name': 'K02', "src": "images/K02-2.png", "T": 18, "L": 15, "H": 490, "W": 215 },
    { 'name': 'K24', "src": "images/K24-3.png", "T": 50, "L": 12, "H": 370, "W": 166 },
    { 'name': 'K20', "src": "images/K20-3.png", "T": 18, "L": 120, "H": 606, "W": 266 },
    { 'name': 'K22', "src": "images/K22-2.png", "T": 18, "L": 20, "H": 606, "W": 265 },
    { 'name': 'K06', "src": "images/K06-2.png", "T": 18, "L": 18, "H": 615, "W": 270 },
    { 'name': 'K13', "src": "images/K13-2.png", "T": 18, "L": 118, "H": 606, "W": 266 },
    { 'name': 'K08', "src": "images/K08-2.png", "T": 18, "L": 18, "H": 606, "W": 266 },
    { 'name': 'K10', "src": "images/K10-2.png", "T": 18, "L": 18, "H": 606, "W": 266 },
    { 'name': 'K09', "src": "images/K09-4.png", "T": 18, "L": 18, "H": 606, "W": 266 },
    { 'name': 'K14', "src": "images/K14-2.png", "T": 18, "L": 118, "H": 600, "W": 266 }
];

for (var i = 0; i < Object.keys(filesdict).length; i++) {
    var key = Object.keys(filesdict)[i];
    var value = filesdict[key];
    if (key[0] == "H" || key[0] == "S") {
        var doorselector = document.getElementById("doorselect");
        doorselector.innerHTML +=
            "<option value='" + value + "'>" + key + "</option>";
    } else {
        // var outerselector = document.getElementById("outerselect");
        // outerselector.innerHTML +=
        //     "<option value='" + value + "'>" + key + "</option>";
    }
}
for (var i = 0; i < info.length; i++) {
    var outerselector = document.getElementById("outerselect");
    outerselector.innerHTML +=
        "<option value='" + info[i].name + "'>" + info[i].name + "</option>";
}
const findOuter = (name) => {
    for (var i = 0; i < info.length; i++) {
        if (info[i].name == name) {
            return info[i];
        }
    }
}
const changeDoor = () => {
    var door = document.getElementById("doorselect").value;
    var doorimg = document.getElementById("door");
    var SelectedOuter = document.getElementById("outerselect").value;
    var outer = findOuter(SelectedOuter);
    doorimg.src = "images/" + door;
    doorimg.style.top = 200 + outer.T + "px";
    doorimg.style.left = 200 + outer.L + "px";
    doorimg.style.height = outer.H + "px";
    doorimg.style.width = outer.W + "px";
}
const changeOuter = () => {
    var SelectedOuter = document.getElementById("outerselect").value;
    var outer = findOuter(SelectedOuter);
    console.log(outer);
    var outerimg = document.getElementById("outer");
    outerimg.src = outer.src;
    var doorimg = document.getElementById("door");
    doorimg.style.top = 200 + outer.T + "px";
    doorimg.style.left = 200 + outer.L + "px";
    doorimg.style.height = outer.H + "px";
    doorimg.style.width = outer.W + "px";

}
document.getElementById('outerselect').addEventListener('change', changeOuter);
document.getElementById('doorselect').addEventListener('change', changeDoor);