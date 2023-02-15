var header = document.querySelector('.service-header')
var body = document.querySelector('.border-right')
// var specs = document.querySelector(' .project-specs')
var image = document.querySelector('.service-image')

function exportPDF() {
const canvas = document.createElement("canvas");
canvas.width = image.width;
canvas.height = image.height;
const context = canvas.getContext("2d");
context.drawImage(image, 0, 0);
const imageDataURL = canvas.toDataURL("image/jpeg");
      // add the header image to the PDF
  pdf.addImage(imageDataURL, 'JPEG', 15, 15, 170, 50);
    // get the content of the HTML element
    const content = document.getElementById("main").innerHTML;
  
    // initialize a new instance of jsPDF
    const pdf = new jsPDF();
  
    // set the content as the HTML content, and pass a callback function
    pdf.fromHTML(content, 15, 15, {
      'width': 170,
      'elementHandlers': {}
    }, function() {
      // save the PDF with a filename
      pdf.save("file.pdf");
    });
  }
