function exportPDF() {
    var logo = document.querySelector('.header_logo');
    var header = document.querySelector('.service-header');
    var image = document.querySelector('.service-image');
    var projectData;
    if (!image) {
      image = document.querySelector('.project-image');
      header = document.querySelector('.project-header');
      projectData = document.querySelector('.project-specs');
    }
    var imageStyle = getComputedStyle(image);
    var backgroundImage = imageStyle.getPropertyValue('background-image');
    var imageUrl = backgroundImage.match(/url\("?(.+?)"?\)/)[1];
    var heading = document.querySelector('.col-inner.dark h1');
    var headingInfo = document.querySelectorAll('.col-inner.dark p');
    var projectInfo = document.querySelector('.col.border-right');



  
    // create a new image element and set its source to the logo URL
    const logoImg = new Image();
    logoImg.src = logo.src;
    logoImg.onload = function() {
      // create a new canvas element and draw the logo onto it
      const logoCanvas = document.createElement('canvas');
      logoCanvas.width = logoImg.width;
      logoCanvas.height = logoImg.height;
      const logoContext = logoCanvas.getContext('2d');
      logoContext.drawImage(logoImg, 0, 0);
      const logoDataURL = logoCanvas.toDataURL('image/png');
  
      // create a new image element and set its source to the image URL
      const img = new Image();
      img.src = imageUrl;
      img.onload = function() {

        // create a new instance of jsPDF
        const pdf =  new jsPDF({ encoding: "UTF-16" });
  
        // add the logo to the PDF
        pdf.addImage(logoDataURL, 'JPEG', 15, 15, logoImg.width/16, logoImg.height/16);

        // set the font to Arial, bold, size 16 for the heading
        pdf.setFontSize(25);
  
        // add the heading to the PDF
        pdf.text(15, 40, heading.textContent);
  
        // add a red divider line after the heading
        pdf.setDrawColor(197, 17, 50);
        pdf.setLineWidth(1);
        pdf.line(15, 43, 50, 43);
  
        // set the font back to normal
        pdf.setFontSize(16);

        pdf.fromHTML(headingInfo[0].outerHTML, 15, 50, {
            width: 170,
            elementHandlers: {}
          });
          pdf.fromHTML(headingInfo[1].outerHTML, 15, 70, {
            width: 170,
            elementHandlers: {}
          });
  
        // add the project info to the PDF
        pdf.fromHTML(projectInfo.outerHTML, 15, 90, {
          width: 170,
          elementHandlers: {}
        });
  
        if (projectData) {
          pdf.fromHTML(projectData.outerHTML, 15, 160, {
            width: 170,
            elementHandlers: {}
          });
        }
 
          
  

        var filename = heading.innerHTML;
        pdf.save(filename + '.pdf');
        };
        };
        };
