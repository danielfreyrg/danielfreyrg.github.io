const html = document.documentElement;
const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
const frameCount = 269;

const currentFrame = index => (
    `318261909_6102800073086326_6342092984673868310_n${index.toString().padStart(3, '0')}.jpg`
  )
  

  const preloadImages = () => {
    for (let i = 1; i < frameCount; i++) {
      const img = new Image();
      img.src = currentFrame(i);
    }
  };

  const img = new Image()
  img.src = currentFrame(1);
  canvas.width=932;
  canvas.style.width="932px";
  canvas.height=1040;
  canvas.style.height="1040px";
  img.onload=function(){
    context.drawImage(img, 0, 0);
  }
  
  const updateImage = index => {
    img.src = currentFrame(index);
    context.drawImage(img, 0, 0);
  }
  
  window.addEventListener('scroll', () => {  
    const scrollTop = html.scrollTop;
    const maxScrollTop = html.scrollHeight - window.innerHeight;
    const scrollFraction = scrollTop / maxScrollTop;
    const frameIndex = Math.min(
      frameCount - 1,
      Math.ceil(scrollFraction * frameCount)
    );
    
    requestAnimationFrame(() => updateImage(frameIndex + 1))
  });
  
  preloadImages()