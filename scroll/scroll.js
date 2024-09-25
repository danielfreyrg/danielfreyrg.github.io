const html = document.documentElement;
const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
const hero = document.querySelector(".hero");
const frameCount = 334;
var test = 0;

const currentFrame = index => (
    `images/${index.toString()}.png`
    // `https://www.apple.com/105/media/us/airpods-pro/2019/1299e2f5_9206_4470_b28e_08307a42f19b/anim/sequence/large/01-hero-lightpass/${index.toString().padStart(4, '0')}.jpg`
  )
  

  const preloadImages = () => {
    for (let i = 1; i < frameCount; i++) {
      const img = new Image();
      img.src = currentFrame(i);
    }
  };

  const img = new Image()
  img.src = currentFrame(1);
  canvas.width=1920;
  canvas.style.width="1920px";
  canvas.height=1080;
  canvas.style.height="1080px";
  img.onload=function(){
    context.drawImage(img, 0, 0);
  }
  
  const updateImage = index => {
    img.src = currentFrame(index);
    context.drawImage(img, 0, 0);
  }
  
  window.addEventListener('scroll', () => {  
    test++;
    //get current scroll position
    var scrollY = window.pageYOffset;
    if (scrollY > 0) {
      hero.style.opacity = 0;
    } 
      else {
      hero.style.opacity = 1;
    }
    if (scrollY > html.scrollHeight*0.78) {
      hero.style.display = "none";
      canvas.style.position = "static";
    } else {
      canvas.style.position = "fixed";
      hero.style.display = "flex";
    }
    const scrollTop = html.scrollTop;
    const maxScrollTop = html.scrollHeight - window.innerHeight;
    const scrollFraction = scrollTop / maxScrollTop;
    const frameIndex = Math.min(
      frameCount - 1,
      Math.ceil(scrollFraction * frameCount)
    );
    if (test%2==0) {
    requestAnimationFrame(() => updateImage(frameIndex + 1))
    }
  });
  
  preloadImages()